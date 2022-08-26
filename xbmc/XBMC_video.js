//---------------------------------------------------------
// Объект Video
//---------------------------------------------------------
function Video(gui)
{
   var content = [];
   var history = [];
   var duration;
   var position;
   var speed;
   
   var list;
   var name;
   var back;
   var type;
   var track;
   var art;
   var volume;
   var percent;
   var mute;
   var timeline;
   var timeleft;
  
   var date = new Date(); 

   // Карта различных типов контента
   var map = {
      movie:   {method: "VideoLibrary.GetMovies",  id: "movieid", name: "Movies"},
      genre:   {method: "VideoLibrary.GetGenres",  id: "genreid", name: "Genres"},
      source:  {method: "Files.GetSources",        id: "file",    name: "Folders"},
      file:    {method: "Files.GetDirectory",      id: "file",    name: "Files"},
   };
   
   // Конструктор
   Init();
  
   //---------------------------------------------------------
   // Начальная инициализация
   //---------------------------------------------------------
   function Init()
   {
      // Основное окно
      var popup = IR.GetPopup(gui.video);
      IR.AddListener(IR.EVENT_ITEM_SHOW, popup, function()
      {
         UpdateVolume();
      });
      
      name = GetItem(gui.videoType);
      
      // Список контента
      list = GetItem(gui.videoContent);
      IR.AddListener(IR.EVENT_ITEM_SELECT, list, function(item, subItem)
      {
         switch(content[item].type)
         {
         case "movie":
            if(subItem == 9)
               xbmc.Request("Player.Open", {item: {movieid: content[item].id}});
            else
               ShowInfo(content[item].id);
            break;
         case "genre":
            UpdateContent("movie", {filter: {genreid: content[item].id}, properties: ["thumbnail", "year", "director", "genre", "runtime"]});
            break;
         case "source":
            UpdateContent("file", {directory: content[item].id, media: "video"});
            break;
         case "file":
            xbmc.Request("Player.Open", {item: {file: content[item].id}});
            break;              
         case "directory":
            UpdateContent("file", {directory: content[item].id, media: "video"});
            break;              
         }
      });
      
      // Фильтр списка
      IR.AddListener(IR.EVENT_ITEM_CHANGE, GetItem(gui.videoFilter), function()
      {
         list.Filter = GetItem(gui.videoFilter).Text; 
      });
            
      // Кнопка назад
      back = GetItem(gui.videoBack);
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
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.videoPlay), function()
      {
         if(speed == 0) xbmc.Request("Player.PlayPause", {playerid: 1});
      });
      // Кнопка Pause
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.videoPause), function()
      {
         if(speed != 0) xbmc.Request("Player.PlayPause", {playerid: 1});
      });
      // Кнопка Stop
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.videoStop), function()
      {
         xbmc.Request("Player.Stop", {playerid: 1});
      });
      // Кнопка Next
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.videoNext), function()
      {
         xbmc.Request("Player.GoTo", {playerid : 1, to: "next"});         
      });
      // Кнопка Previous
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.videoPrev), function()
      {
         xbmc.Request("Player.GoTo", {playerid : 1, to: "previous"});         
      });
      // Кнопка Fast
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.videoFast), function()
      {
         xbmc.Request("Player.Seek", {playerid: 1, value: "smallforward"});
      });
      // Кнопка Slow
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.videoSlow), function()
      {
         xbmc.Request("Player.Seek", {playerid: 1, value: "smallbackward"});
      });
      
      // Информация о фильме
      track = GetItem(gui.videoTrack);
      art = GetItem(gui.videoCover);
      
      // Уровень громкости звука
      percent = GetItem(gui.videoPercent);
      volume = GetItem(gui.videoVolume);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, volume, function()
      {
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.videoPlus), function()
      {
         volume.Value += 5;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      IR.AddListener(IR.EVENT_ITEM_HOLD, GetItem(gui.videoPlus), function()
      {
         volume.Value += 3;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.videoMinus), function()
      {
         volume.Value -= 5;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });    
      IR.AddListener(IR.EVENT_ITEM_HOLD, GetItem(gui.videoMinus), function()
      {
         volume.Value -= 3;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      mute = GetItem(gui.videoMute);
      IR.AddListener(IR.EVENT_ITEM_PRESS, mute, function()
      {
         xbmc.Request("Application.SetMute", {mute: "toggle"});
         UpdateVolume();
      });
      
      // Позиция воспроизведения
      timeleft = GetItem(gui.videoTimeLeft);
      timeline = GetItem(gui.videoTimeLine);
      IR.AddListener(IR.EVENT_ITEM_PRESS, timeline, function()
      {
         position = timeline.Value / 100 * duration;
         xbmc.Request("Player.Seek", {"playerid" : 1, "value": timeline.Value});
      });    
            
      // Выбор типа контента
      popup = IR.GetPopup(gui.videoSelect);
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.videoSelectTitle), function()
      {
         history = [];
         UpdateContent("movie", {properties: ["thumbnail", "year", "director", "genre", "runtime"]});
      });    
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.videoSelectGenre), function()
      {
         history = [];
         UpdateContent("genre", {type: "movie"});
      });    
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.videoSelectFolder), function()
      {
         history = [];
         UpdateContent("source", {media: "video"});
      });          
            
      // Обработка cобытий
      xbmc.AddListener(xbmc.EVENT_NOTIFY, Notify);
      xbmc.AddListener(xbmc.EVENT_ONLINE, Online);
      xbmc.AddListener(xbmc.EVENT_OFFLINE, Offline);
      IR.AddListener(IR.EVENT_WORK, 0, Work);
   }

   //---------------------------------------------------------
   // Обновить список содержимого
   //---------------------------------------------------------
   function UpdateContent(ntype, filter)
   {
      // Показываем окно ожидания
      page.ShowPopup(gui.wait);
      
      // Тип содержимого
      type = ntype;
      name.Text = map[type].name;
      
      // Запоминаем историю команд
      back.Visible = history.length;
      history.push({"type": type, "filter": filter});
            
      // Запрос к библиотеке
      xbmc.Request(map[type].method, filter, function(response)
      {
         // Заполняем список
         content.length = 0;
         list.Clear();
         
         var result = map[type].id;
         var items = response.result[type + "s"];
         if(items)
            for(var i = 0; i < items.length; ++i)
            {
               var atype = items[i].filetype;
               if(atype == undefined) atype = type;
               content[i] = {type: atype, id: items[i][result]};
               var label = items[i].label;
               list.CreateItem(i, 0, {Name: label});
               list.CreateItem(i, 3, {Text: label});
               
               switch(atype)
               {
               case "movie":
                  list.CreateItem(i, 6, {Text: "" + items[i].year});
                  list.CreateItem(i, 7, {Text: items[i].director});
                  list.CreateItem(i, 8, {Text: items[i].genre});
                  break;
               case "genre": 
                  list.CreateItem(i, 2, {Image: "Folder.png"});   
                  list.CreateItem(i, 9, {Visible: false, Enable: false});   
                  break;
               case "source": 
                  list.CreateItem(i, 2, {Image: "Folder.png"});   
                  list.CreateItem(i, 9, {Visible: false, Enable: false});   
                  break;
               case "directory": 
                  list.CreateItem(i, 2, {Image: "Folder.png"});   
                  list.CreateItem(i, 9, {Visible: false, Enable: false});   
                  break;                  
               }
               if(items[i].thumbnail)
                  list.CreateItem(i, 2, {Image: config.http + items[i].thumbnail.replace(/%/g, "%25")});
            }
         // Скрываем окно ожидания
         page.HidePopup(gui.wait);      
      });    
   }
   this.UpdateContent = UpdateContent;
         
   //---------------------------------------------------------
   // Обновить плеер
   //---------------------------------------------------------
   function UpdatePlayer()
   {
      // Запрашиваем данные о текущем фильме
      xbmc.Request("Player.GetItem", {"playerid" : 1, properties: ["duration", "title", "thumbnail", "director", "genre"]}, function(response)
      {
         if(response.result)
         {
            track.Text = response.result.item.title;
            art.GetState(0).Image = config.http + response.result.item.thumbnail.replace(/%/g, "%25");
         } else {
            art.GetState(0).Image = "";
            track.Text = "";
         }
      });
      
      // Запрашиваем данные о состоянии плеера
      xbmc.Request("Player.GetProperties", {"playerid" : 1, properties: ["time", "totaltime", "speed", "position", "repeat", "shuffled"]}, function(response)
      {
         if(response.result)
         {
            var time = response.result.time;
            timeleft.Text = "" + time.hours + ((time.minutes < 10) ? ":0" : ":") + time.minutes + ((time.seconds < 10) ? ":0" : ":") + time.seconds;
            position = time.hours * 3600 + time.minutes * 60 + time.seconds;
            timeline.Value = position * 100 / duration;
            time = response.result.totaltime;
            duration = time.hours * 3600 + time.minutes * 60 + time.seconds;
            speed = response.result.speed;   
         }
      });  
   }
   
   //---------------------------------------------------------
   // Обновить громкость звука
   //---------------------------------------------------------
   function UpdateVolume()
   {
      // Запрашиваем данные
      xbmc.Request("Application.GetProperties", {properties: ["volume", "muted"]}, function(response)
      {
         percent.Text = response.result.volume + '%';
         volume.Value = response.result.volume;
         mute.Value =  response.result.muted ^ 1;
      });  
   }

   //---------------------------------------------------------
   // Окно информации о фильме
   //---------------------------------------------------------
   function ShowInfo(id)
   {
      page.ShowPopup(gui.movieInfo);
      // Запрашиваем данные
      xbmc.Request("VideoLibrary.GetMovieDetails", {movieid: id, 
      properties: ["plot", "title", "genre", "year", "director", "writer", "studio", "runtime", "tagline", "mpaa", "thumbnail"]}, 
      function(response)
      {
         var details = response.result.moviedetails;
         var popup = IR.GetPopup(gui.movieInfo);
         IR.SetVariable("UI.XMBC_Movie_Info_part1.Name.Text",        details.title);
         IR.SetVariable("UI.XMBC_Movie_Info_part1.Director.Text",    details.director);
         IR.SetVariable("UI.XMBC_Movie_Info_part1.Writer.Text",      details.writer);
         IR.SetVariable("UI.XMBC_Movie_Info_part1.Studio.Text",      details.studio);
         IR.SetVariable("UI.XMBC_Movie_Info_part1.Runtime.Text",     details.runtime);
         IR.SetVariable("UI.XMBC_Movie_Info_part1.Genre.Text",       details.genre);
         IR.SetVariable("UI.XMBC_Movie_Info_part1.Year.Text",        details.year.toString());
         IR.SetVariable("UI.XMBC_Movie_Info_part1.Tagline.Text",     details.tagline);
         IR.SetVariable("UI.XMBC_Movie_Info_part1.Rating.Text",      details.mpaa);
         IR.GetItem("XMBC_Movie_Info_part1").GetItem("Description").CreateItem(0, 0, {Text: details.plot});
         IR.GetItem("XMBC_Movie_Info_part1").GetItem("Description").SetPosition(0);
         // Картинка
         if(details.thumbnail)
            IR.GetItem("XMBC_Movie_Info_part1").GetItem("Cover").GetState(0).Image = config.http + details.thumbnail.replace(/%/g, "%25");
      });        
   }
   
   //---------------------------------------------------------
   // Уведомления о событиях
   //---------------------------------------------------------
   function Notify(response)
   {
      try {     
         if(response.method.indexOf("Player.") >= 0 &&
            response.params.data.player.playerid == 1)
         {
            switch(response.method)
            {
            case "Player.OnPlay":
            case "Player.OnResume":
               UpdatePlayer();
               break;
            case "Player.OnPause":
            case "Player.OnStop":
               speed = 0;
               break;
            case "Player.OnSeek":
               var time = response.params.data.player.time;
               position = time.hours * 3600 + time.minutes * 60 + time.seconds;
               timeline.Value = position * 100 / duration;
               break;
            case "Player.OnSpeedChanged":
               speed = response.params.data.player.speed;
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
        UpdateContent("movie", {properties: ["thumbnail", "year", "director", "genre", "runtime"]});      
      UpdateVolume();
      xbmc.Request("Player.GetActivePlayers", {}, function(response)
      {
         for(var i = 0; i < response.result.length; ++i)
            if(response.result[i].playerid == 1)
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
      time /= 1000;    // переводим в секунды
      if(speed)
      {
         // Текущая позиция воспроизведения
         position += time * speed;
         timeline.Value = position * 100 / duration;
         
         date.setTime(position * 1000);
         timeleft.Text = "" + date.getUTCHours() + ((date.getUTCMinutes() < 10) ? ":0" : ":") + date.getUTCMinutes() + ((date.getUTCSeconds() < 10) ? ":0" : ":") + date.getUTCSeconds();      
      }
   }

};
