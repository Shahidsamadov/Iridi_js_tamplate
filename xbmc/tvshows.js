//---------------------------------------------------------
// Объект TVShows
//---------------------------------------------------------
function TVShows(gui)
{
   var content = [];
   var history = [];
   var duration;
   var position;
   var speed;
   var tvshowid;
   
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
      tvshow:  {method: "VideoLibrary.GetTVShows", id: "tvshowid", name: "Shows"},
      season:  {method: "VideoLibrary.GetSeasons", id: "season",   name: "Seasons"},
      episode: {method: "VideoLibrary.GetEpisodes",id: "episodeid",name: "Episodes"},
      genre:   {method: "VideoLibrary.GetGenres",  id: "genreid",  name: "Genres"},
      source:  {method: "Files.GetSources",        id: "file",     name: "Folders"},
      file:    {method: "Files.GetDirectory",      id: "file",     name: "Files"},
   };
   
   var icon_map = {
      back: GetItem(gui.iconMap).GetState(9).Image,
      tvshow: GetItem(gui.iconMap).GetState(3).Image,
      genre: GetItem(gui.iconMap).GetState(10).Image,
      source:  GetItem(gui.iconMap).GetState(11).Image,   
   };
   
   // Конструктор
   Init();
  
   //---------------------------------------------------------
   // Начальная инициализация
   //---------------------------------------------------------
   function Init()
   {
      var popup = IR.GetPopup(gui.tvshows);
      IR.AddListener(IR.EVENT_ITEM_SHOW, popup, function()
      {
         UpdateVolume();
      });
      
      name = GetItem(gui.tvshowsType);
      
      // Список контента
      list = GetItem(gui.tvshowsContent);
      IR.AddListener(IR.EVENT_ITEM_SELECT, list, function(item, subItem)
      {
         switch(content[item].type)
         {
         case "tvshow":
            tvshowid = content[item].id;
            UpdateContent("season", {tvshowid: tvshowid, properties: ["season", "thumbnail"]});
            break;
         case "season":
            UpdateContent("episode", {tvshowid: tvshowid, season: content[item].id, properties: ["thumbnail", "firstaired"]});
            break;
         case "episode":
            if(subItem == 9)
               xbmc.Request("Player.Open", {item: {episodeid: content[item].id}});
            else
               ShowInfo(content[item].id);
            break;
         case "genre":
            UpdateContent("tvshow", {filter: {genreid: content[item].id}, properties: ["thumbnail", "year", "genre"]});
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
      IR.AddListener(IR.EVENT_ITEM_CHANGE, GetItem(gui.tvshowsFilter), function()
      {
         list.Filter = GetItem(gui.tvshowsFilter).Text; 
      });      
      
      // Кнопка назад
      back = GetItem(gui.tvshowsBack);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, back, function()
      {
         if(history.length > 1)
         {
            history.pop();
            var prev = history.pop();
            UpdateContent(prev.type, prev.filter);
         }   
      });
      
      // Кнопка Play
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsPlay), function()
      {
         if(speed == 0) xbmc.Request("Player.PlayPause", {playerid: 1});
      });
      // Кнопка Pause
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsPause), function()
      {
         if(speed != 0) xbmc.Request("Player.PlayPause", {playerid: 1});
      });
      // Кнопка Stop
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsStop), function()
      {
         xbmc.Request("Player.Stop", {playerid: 1});
      });
      // Кнопка Next
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsNext), function()
      {
         xbmc.Request("Player.GoTo", {playerid : 1, to: "next"});                  
      });
      // Кнопка Previous
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsPrev), function()
      {
         xbmc.Request("Player.GoTo", {playerid : 1, to: "previous"});         
         
      });
      // Кнопка Fast
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsFast), function()
      {
         xbmc.Request("Player.SetSpeed", {playerid: 1, speed: "increment"});
      });
      // Кнопка Slow
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsSlow), function()
      {
         xbmc.Request("Player.SetSpeed", {playerid: 1, speed: "decrement"});
      });
      
      // Информация о фильме
      track = GetItem(gui.tvshowsTrack);
      art = GetItem(gui.tvshowsCover);
      
      // Уровень громкости звука
      percent = GetItem(gui.tvshowsPercent);
      volume = GetItem(gui.tvshowsVolume);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, volume, function()
      {
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsPlus), function()
      {
         volume.Value += 5;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      IR.AddListener(IR.EVENT_ITEM_HOLD, GetItem(gui.tvshowsPlus), function()
      {
         volume.Value += 3;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsMinus), function()
      {
         volume.Value -= 5;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });	
      IR.AddListener(IR.EVENT_ITEM_HOLD, GetItem(gui.tvshowsMinus), function()
      {
         volume.Value -= 3;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      mute = GetItem(gui.tvshowsMute);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, mute, function()
      {
         xbmc.Request("Application.SetMute", {mute: "toggle"});
         UpdateVolume();
      });
      
      var stream = GetItem(gui.tvshowsStream);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, stream, function()
      {
         xbmc.Request("Player.SetAudioStream", {"playerid" : 1, "stream": "next"});
         
         xbmc.Request("Player.GetProperties", {"playerid" : 1, properties: ["currentaudiostream"]}
         , function(response)
         {
            if(response.result)
               debug(response.result.currentaudiostream.name);
         });
      });
      
      var subtitle = GetItem(gui.tvshowsSubtitle);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, subtitle, function()
      {
         xbmc.Request("Player.SetSubtitle", {"playerid" : 1, "subtitle": "next"});
         
         xbmc.Request("Player.GetProperties", {"playerid" : 1, properties: ["currentsubtitle"]}
         , function(response)
         {
            if(response.result)
               debug(response.result.currentsubtitle.name);
         });
      });
      
      // Позиция воспроизведения
      timeleft = GetItem(gui.tvshowsTimeLeft);
      timeline = GetItem(gui.tvshowsTimeLine);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, timeline, function()
      {
         position = timeline.Value / 100 * duration;
         xbmc.Request("Player.Seek", {"playerid" : 1, "value": timeline.Value});
      });	
            
      // Выбор типа контента
      popup = IR.GetPopup(gui.tvshowsSelect);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsSelectTitle), function()
      {
         history = [];
         UpdateContent("tvshow", {properties: ["thumbnail", "year", "genre"]});
      });	
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsSelectEpisode), function()
      {
         history = [];
         UpdateContent("episode", {properties: ["thumbnail", "firstaired"]});
      });
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsSelectGenre), function()
      {
         history = [];
         UpdateContent("genre", {type: "tvshow"});
      });	      
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tvshowsSelectFolder), function()
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

   function SetContentIcon(type)
   {
      back.GetState(0).Image = icon_map[type];
   }
      
   function CreateEmptyItem(text)
   {      
      list.Template = "XBMC_EmtyTemplate";
      list.CreateItem(0, 2, {Text: text});
      list.Enable = false; 
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
            
      if(history.length > 0)
         SetContentIcon('back');   
      else
         SetContentIcon(type);
      
      //back.Visible = history.length;
      // Запоминаем историю команд
      history.push({"type": type, "filter": filter});
            
      // Запрос к библиотеке
      xbmc.Request(map[type].method, filter, function(response)
      {
         // Заполняем список
         content.length = 0;
         list.Clear();
         list.Enable = 1;
         
         var result = map[type].id;
         
         if(response.result == undefined)
         {
            CreateEmptyItem(ITEM_NOT_EXIST);
            // Скрываем окно ожидания
            page.HidePopup(gui.wait);
            return;
         }
         
         var items = response.result[type + "s"];
         if(items)
         {
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
               case "tvshow":
                  list.CreateItem(i, 6, {Text: "" + items[i].year});
                  list.CreateItem(i, 7, {Text: items[i].genre});
                  if(items[i].thumbnail)
                     list.CreateItem(i, 2, {Image: config.http + items[i].thumbnail.replace(/%/g, "%25")});
                  break;
               case "episode": 
                  list.CreateItem(i, 8, {Text: items[i].firstaired});
                  if(items[i].thumbnail)
                     list.CreateItem(i, 2, {Image: config.http + items[i].thumbnail.replace(/%/g, "%25")});
                  list.CreateItem(i, 9, {Visible: true, Enable: true}); 
                    
                  break;
               case "genre": 
                  break;
               case "source": 
                  list.CreateItem(i, 2, {Image: icon_map.source});   
                  break;
               case "directory": 
                  list.CreateItem(i, 2, {Image: icon_map.source});   
                  break;                  
                default:
                  if(items[i].thumbnail)
                     list.CreateItem(i, 2, {Image: config.http + items[i].thumbnail.replace(/%/g, "%25")});
                  break;
               }
            }
         } else
         {
            CreateEmptyItem(LIST_IS_EMPTY);
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
            track.Text = (response.result.item.title) ? response.result.item.title : "";
            art.GetState(0).Image = (response.result.item.thumbnail) ? config.http + response.result.item.thumbnail.replace(/%/g, "%25") : "";
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
   // Окно информации о эпизоде
   //---------------------------------------------------------
   function ShowInfo(id)
   {
      page.ShowPopup(gui.movieInfo);
      // Запрашиваем данные
      xbmc.Request("VideoLibrary.GetEpisodeDetails", {episodeid: id, 
      properties: ["plot", "title", "firstaired", "director", "writer", "runtime", "rating", "thumbnail"]}, 
      function(response)
      {
         var details = response.result.episodedetails;
         GetItem(gui.movieInfoTitle).Text = details.title;
         GetItem(gui.movieInfoDirector).Text = details.director;
         GetItem(gui.movieInfoWriter).Text = details.writer;
         GetItem(gui.movieInfoRuntime).Text = details.runtime;
         GetItem(gui.movieInfoYear).Text = details.firstaired.toString();
         GetItem(gui.movieInfoRating).Text = details.rating.toString();
         GetItem(gui.movieInfoDesc).Text = details.plot;
         // Картинка
         if(details.thumbnail)
            GetItem(gui.movieInfoCover).GetState(0).Image = config.http + details.thumbnail.replace(/%/g, "%25");
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
		UpdateContent("tvshow", {properties: ["thumbnail", "year", "genre"]});
      xbmc.Request("Player.GetActivePlayers", {}, function(response)
      {
         for(var i = 0; i < response.result.length; ++i)
            if(response.result[i].playerid == 1)
               UpdatePlayer();
      });
      UpdateVolume();
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
      time /= 1000;	// переводим в секунды
      if(speed)
      {
         if(position < duration)
         {
            // Текущая позиция воспроизведения
            position += time * speed;
            timeline.Value = position * 100 / duration;
            
            date.setTime(position * 1000);
            timeleft.Text = "" + date.getUTCHours() + ((date.getUTCMinutes() < 10) ? ":0" : ":") + date.getUTCMinutes() + ((date.getUTCSeconds() < 10) ? ":0" : ":") + date.getUTCSeconds(); 
         } else
            timeleft.Text = "-:--:--";     
      }
   }

};