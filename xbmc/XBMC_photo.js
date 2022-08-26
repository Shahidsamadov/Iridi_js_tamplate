//---------------------------------------------------------
// Объект Photo
//---------------------------------------------------------
function Photo(gui)
{
   var content = [];
   var history = [];
   var directory;
   var speed;
   var slideshow;
   var delay = 0;
   
   var list;
   var back;
   var track;
   var art;
   var play;
   
   // Карта различных типов контента
   var map = {
      source:  {method: "Files.GetSources",        id: "file"},
      file:    {method: "Files.GetDirectory",      id: "file"},
   };
   
   // Конструктор
   Init();
  
   //---------------------------------------------------------
   // Начальная инициализация
   //---------------------------------------------------------
   function Init()
   {
      name = GetItem(gui.photoType);
      
      // Список контента
      list = GetItem(gui.photoContent);
      IR.AddListener(IR.EVENT_ITEM_SELECT, list, function(item, subItem)
      {
         switch(content[item].type)
         {
         case "source":
            UpdateContent("file", {directory: content[item].id, media: "pictures"});
            break;
         case "file":
            xbmc.Request("Player.Open", {item: {file: content[item].id}});
            UpdatePlayer();
            break;              
         case "directory":
            UpdateContent("file", {directory: content[item].id, media: "pictures"});
            //xbmc.Request("Player.Open", {item: {path: content[item].id}});
            break;              
         }
      });
      
      // Фильтр списка
      IR.AddListener(IR.EVENT_ITEM_CHANGE, GetItem(gui.photoFilter), function()
      {
         list.Filter = GetItem(gui.photoFilter).Text; 
      });      
      
      // Кнопка назад
      back = GetItem(gui.photoBack);
      IR.AddListener(IR.EVENT_ITEM_PRESS, back, function()
      {
         if(history.length > 1)
         {
            history.pop();
            var prev = history.pop();
            UpdateContent(prev.type, prev.filter);
         }   
      });
      
      // Кнопка Play
      play = GetItem(gui.photoPlay);
      IR.AddListener(IR.EVENT_ITEM_PRESS, play, function()
      {
         if(slideshow)
            xbmc.Request("Player.PlayPause", {playerid: 2});
         else if(directory) 
         {
            var random = (IR.GetVariable("UI.Photo.Random.Value") != 0);
            xbmc.Request("Player.Open", {item: {path: directory, random: random}});
         }
         UpdatePlayer();
      });
      // Кнопка Next
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.photoNext), function()
      {
         xbmc.Request("Player.GoTo", {playerid : 2, to: "next"}); 
      });
      // Кнопка Previous
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.photoPrev), function()
      {
         xbmc.Request("Player.GoTo", {playerid : 2, to: "previous"});                  
      });
      // Кнопка Zoom
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.photoZoom), function()
      {
         //xbmc.Request("Player.Zoom", {playerid: 2, value: 10});
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.photoPlus), function()
      {
         xbmc.Request("Player.Zoom", {playerid: 2, zoom: "in"});
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.photoMinus), function()
      {
         xbmc.Request("Player.Zoom", {playerid: 2, zoom: "out"});
      });
      
      // Информация
      track = GetItem(gui.photoTrack);
      art = GetItem(gui.photoCover);
      
      // Обработка cобытий
      xbmc.AddListener(xbmc.EVENT_NOTIFY, Notify);
      xbmc.AddListener(xbmc.EVENT_ONLINE, Online);
      xbmc.AddListener(xbmc.EVENT_OFFLINE, Offline);
      IR.AddListener(IR.EVENT_WORK, 0, Work);      
   }

   //---------------------------------------------------------
   // Обновить список содержимого
   //---------------------------------------------------------
   function UpdateContent(type, filter)
   {
      // Запоминаем историю команд
      back.Visible = history.length;
      history.push({"type": type, "filter": filter});
            
      // Запоминаем каталог
      directory = filter.directory;
            
      // Запрос к библиотеке
      xbmc.Request(map[type].method, filter, function(response)
      {
         // Заполняем список
         content.length = 0;
         list.Clear();
         
         var items = response.result[type + "s"];
         if(items)
            for(var i = 0; i < items.length; ++i)
            {
               var atype = items[i].filetype;
               if(atype == undefined) atype = type;
               content[i] = {type: atype, id: items[i].file};
               if(atype != "file") 
                  list.CreateItem(i, 3, {Image: "Folder.png"});   
               list.CreateItem(i, 4, {Text: items[i].label});
               list.CreateItem(i, 0, {Name: items[i].label});
            }
      
      });          

   }
   this.UpdateContent = UpdateContent;
         
   //---------------------------------------------------------
   // Обновить плеер
   //---------------------------------------------------------
   function UpdatePlayer()
   {
      // Текущая картинка
      xbmc.Request("Player.GetItem", {playerid: 2, properties: ["thumbnail"]}, function(response)
      {
         if(response.result)
         {
            track.Text = response.result.item.label;
            art.GetState(0).Image = config.http + response.result.item.thumbnail.replace(/%/g, "%25");
         } else {
            art.GetState(0).Image = "";
            track.Text = "";
         }
      });   
      
      // Размер плейлиста
      xbmc.Request("Playlist.GetProperties", {playlistid: 2, properties: ["size"]}, function(response)
      {
         slideshow = (response.result.size > 1);
      });
      
      // Запрашиваем данные о состоянии плеера
      xbmc.Request("Player.GetProperties", {"playerid" : 2, properties: ["speed"]}, function(response)
      {
         if(response.result)
            speed = response.result.speed;
         else
            speed = 0;
         play.Value = (speed && slideshow);
      });
   }
   
   //---------------------------------------------------------
   // Уведомления о событиях
   //---------------------------------------------------------
   function Notify(response)
   {
      try {
         if(response.method.indexOf("Player.") >= 0 &&
            response.params.data.player.playerid == 2)
         {
            switch(response.method)
            {
            case "Player.OnPlay":
               UpdatePlayer();
               break;
            case "Player.OnPause":
            case "Player.OnStop":
               speed = 0;
               break;
            }
         }
      } catch(error) {}      
   }
   
   //---------------------------------------------------------
   // Действия при соединении
   //---------------------------------------------------------
   function Online()
   {
      UpdateContent("source", {media: "pictures"});
      xbmc.Request("Player.GetActivePlayers", {}, function(response)
      {
         for(var i = 0; i < response.result.length; ++i)
            if(response.result[i].playerid == 2)
               UpdatePlayer();
      });
   }
   
   //---------------------------------------------------------
   // Действия при потере соединения
   //---------------------------------------------------------
   function Offline()
   {
      list.Clear();
      content.lenght = 0;
      history.length = 0;
      track.Text = "";
      art.GetState(0).Image = "";
      speed = 0;
   }          
   
   //---------------------------------------------------------
   // Действия каждый цикл 
   //---------------------------------------------------------
   function Work(time)
   {
      delay -= time;
      if(delay <= 0 && speed && slideshow)
      {
         delay = 5000; // 5 sec
         UpdatePlayer();
      }
   }   
   
};
