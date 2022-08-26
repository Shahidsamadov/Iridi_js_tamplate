//---------------------------------------------------------
// Объект Video
//---------------------------------------------------------
function Video(gui)
{
   var content = [];
   var history = [];
   var duration = 0;
   var position = 0;
   var speed = 0;
   
   var list;
   var name;
   var back;
   var type;
   var track;
   var art;
   var volume;
   var mute;
   var timeline;
   var timeleft;
   var timepast;
   var play;
  
   var date = new Date(); 

   // Карта различных типов контента
   var map = {
      movie:   {method: "VideoLibrary.GetMovies",  id: "movieid", name: "Movies"},
      genre:   {method: "VideoLibrary.GetGenres",  id: "genreid", name: "Genres"},
      source:  {method: "Files.GetSources",        id: "file",    name: "Folders"},
      file:    {method: "Files.GetDirectory",      id: "file",    name: "Files"},
   };
   
   var icon_map = {
      back: GetItem(gui.iconMap).GetState(9).Image,
      movie: GetItem(gui.iconMap).GetState(2).Image,
      genre: GetItem(gui.iconMap).GetState(10).Image,
      source: GetItem(gui.iconMap).GetState(11).Image   
   };
   // список комманд для субтитров
   //subtitle_t = ["previous", "next", "off", "on"];
   
   // Конструктор
   Init();
  
   //---------------------------------------------------------
   // Начальная инициализация
   //---------------------------------------------------------
   function Init()
   {
      // Основное окно
      var popup = IR.GetPopup(gui.video);
      var current_item;
      list = GetItem(gui.videoContent);
      name = GetItem(gui.videoType);
      
      IR.AddListener(IR.EVENT_ITEM_SHOW, popup, function()
      {
         UpdateVolume();
         UpdatePlayer();                
         IR.AddListener(IR.EVENT_WORK, 0, Work);
      });
      
      IR.AddListener(IR.EVENT_ITEM_HIDE, popup, function()
      {
        IR.RemoveListener(IR.EVENT_WORK, 0, Work);
      });
      
      // Список контента
      IR.AddListener(IR.EVENT_ITEM_SELECT, list, function(item, subItem)
      {
         switch(content[item].type){
            case "movie":                                                       // выбран фильм
               for(var i = 0; i < list.ItemsCount; i++)                         // чистим список
                  list.CreateItem(i, 0, {FillColor: gui.contentCol0});  
                                                                                // выделяем список   
               list.CreateItem(item, 0, {FillColor: gui.contentCol1});
               
               current_item = item;                                             // сохраняем № элемента
               
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
      
      function play_video(){
         xbmc.Request("Player.Open", {item: {movieid: content[current_item].id}});
      }
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.movieInfoReplace), play_video);

      // Фильтр списка
      function new_filter(){
         list.Filter = GetItem(gui.videoFilter).Text;
         
         var clear = GetItem(gui.videoclearSearch); 
         if(list.Filter == "") clear.Visible = clear.Enable = 0;
         else clear.Visible = clear.Enable = 1;
      }
      IR.AddListener(IR.EVENT_ITEM_CHANGE, GetItem(gui.videoFilter), new_filter); 
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.videoclearSearch), new_filter); 
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.videohideSearch), new_filter); 
            
      // Кнопка назад
      back = GetItem(gui.videoBack);
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
      play = GetItem(gui.videoPlay);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, play, function()
      {
         xbmc.Request("Player.PlayPause", {playerid: 1});
      });
      // Кнопка Stop
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.videoStop), function()
      {
         xbmc.Request("Player.Stop", {playerid: 1});

      });
      // Кнопка Next
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.videoNext), function()
      {
         xbmc.Request("Player.GoTo", {playerid : 1, to: "next"});         
      });
      // Кнопка Previous
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.videoPrev), function()
      {
         xbmc.Request("Player.GoTo", {playerid : 1, to: "previous"});         
      });
      // Кнопка Fast
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.videoFast), function()
      {
         xbmc.Request("Player.SetSpeed", {playerid: 1, speed: "increment"});
      });
      // Кнопка Slow
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.videoSlow), function()
      {
         xbmc.Request("Player.SetSpeed", {playerid: 1, speed: "decrement"});
      });
      
      // Информация о фильме
      track = GetItem(gui.videoTrack);
      art = GetItem(gui.videoCover);
      
      // Уровень громкости звука
      volume = GetItem(gui.videoVolume);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, volume, SetVolume);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.videoPlus), function()
      {
         volume.Value += 5;
         SetVolume();
      });
      IR.AddListener(IR.EVENT_ITEM_HOLD, GetItem(gui.videoPlus), function()
      {
         volume.Value += 3;
         SetVolume();
      });
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.videoMinus), function()
      {
         volume.Value -= 5;
         SetVolume();
      });    
      IR.AddListener(IR.EVENT_ITEM_HOLD, GetItem(gui.videoMinus), function()
      {
         volume.Value -= 3;
         SetVolume();
      });
      
      function SetVolume(){     
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      }
      mute = GetItem(gui.videoMute);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, mute, function()
      {
         xbmc.Request("Application.SetMute", {mute: "toggle"});
         UpdateVolume();
      });
      
      var stream = GetItem(gui.videoStream);
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
      
      var subtitle = GetItem(gui.videoSubtitle);
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
      timeleft = GetItem(gui.videoTimeLeft);
      timepast = GetItem(gui.videoTimePast);
      timeline = GetItem(gui.videoTimeLine);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, timeline, function()
      {
         SetTimeLine();
         IR.AddListener(IR.EVENT_WORK, 0, Work);
      });    
      IR.AddListener(IR.EVENT_ITEM_PRESS, timeline, function()
      {
         IR.RemoveListener(IR.EVENT_WORK, 0, Work);
         SetTimeLine();
      });    
      
      function SetTimeLine(){
         position = timeline.Value / 100 * duration;
         xbmc.Request("Player.Seek", {"playerid" : 1, "value": timeline.Value});
      }
            
      // Выбор типа контента
      popup = IR.GetPopup(gui.videoSelect);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.videoSelectTitle), function()
      {
         history = [];
         UpdateContent("movie", {properties: ["thumbnail", "year", "director", "genre", "runtime"]});
      });    
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.videoSelectGenre), function()
      {
         history = [];
         UpdateContent("genre", {type: "movie"});
      });    
      IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.videoSelectFolder), function()
      {
         history = [];
         UpdateContent("source", {media: "video"});
      });          
            
      // Обработка cобытий
      xbmc.AddListener(xbmc.EVENT_NOTIFY, Notify);
      xbmc.AddListener(xbmc.EVENT_ONLINE, Online);
      xbmc.AddListener(xbmc.EVENT_OFFLINE, Offline);
   }
   
   /*
      Ставим иконку около списка выбора в зависимости от типа
      возможно нужно использовать map => icon_image['artist'] = "Metro_XBMC_Retina_Artist.png"
   */
   function SetContentIcon(type)
   {
      back.GetState(0).Image = icon_map[type];
   }

   /*
      Создание пустого листа, на который нельзя нажать
   */      
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
      
      // Запоминаем историю команд
      if(history.length > 0)
         SetContentIcon('back');   
      else
         SetContentIcon(type);
         
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
            HideWaitPopup();
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
              
               switch(atype)
               {
               case "movie":
                  list.Template = "XBMC_VideoListTemplate";
                  list.CreateItem(i, 6, {Text: "" + items[i].year});
                  list.CreateItem(i, 4, {Text: items[i].director.toString()});
                  list.CreateItem(i, 5, {Text: items[i].genre.toString()});
                  list.CreateItem(i, 1, {Image: icon_map.movie});
                  break;
               case "genre": 
                  list.Template = "XBMC_FolderTemplate";
                  list.CreateItem(i, 1, {Image: icon_map.genre});   
  
                  break;
               case "source": 
                  list.Template = "XBMC_FolderTemplate";
                  list.CreateItem(i, 1, {Image: icon_map.source});   

                  break;
               case "directory": 
                  list.Template = "XBMC_FolderTemplate";
                  list.CreateItem(i, 1, {Image: icon_map.source});   

                  break;                  
               }                       
               
               list.CreateItem(i, 0, {Name: label});
               list.CreateItem(i, 2, {Text: label});
               
               if(items[i].thumbnail)
                  list.CreateItem(i, 1, {Image: config.http + items[i].thumbnail.replace(/%/g, "%25")});
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
            track.Text = (response.result.item.title) ? response.result.item.title : (response.result.item.label) ? response.result.item.label : "";
            art.GetState(0).Image = (response.result.item.thumbnail) ? config.http + response.result.item.thumbnail.replace(/%/g, "%25") : "";
            play.Value = 1;
         } else {
            ClearInformation();
         }
      });
      
      // Запрашиваем данные о состоянии плеера
      xbmc.Request("Player.GetProperties", {"playerid" : 1
      , properties: ["time", "totaltime", "speed", "position", "repeat", "shuffled"]}
      , function(response)
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
         GetItem(gui.movieInfoTitle).Text = details.title;
         GetItem(gui.movieInfoDirector).Text = details.director;
         GetItem(gui.movieInfoWriter).Text = details.writer;
         GetItem(gui.movieInfoStudio).Text = details.studio;
         GetItem(gui.movieInfoRuntime).Text = details.runtime;
         GetItem(gui.movieInfoGenre).Text = details.genre;
         GetItem(gui.movieInfoYear).Text = details.year.toString();
         GetItem(gui.movieInfoTagline).Text = details.tagline;
         GetItem(gui.movieInfoRating).Text = details.mpaa;
         //GetItem(gui.movieInfoDesc).Text = details.plot;     превышение строки

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
         if(response.method == "Player.OnStop") // не проверяем playerid TODO
         {
            speed = 0;
            IR.Log(response.method);
         }     
         else if(response.method.indexOf("Player.") >= 0 && response.params.data.player.playerid == 1)
         {
            
            switch(response.method)
            {
            case "Player.OnPlay":
               UpdatePlayer();
               speed = 1;
               play.Value = 1;
               break;
            case "Player.OnStop":  
               ClearInformation(); 
            case "Player.OnPause":
               speed = 0;
               play.Value = 0;
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
         } else if(response.method == "Application.OnVolumeChanged")
         {
            volume.Value = response.params.data.volume;
            mute.Value =  response.params.data.muted ^ 1;
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
      UpdatePlayer();
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
      speed = 0;
      page.ShowPopup("XBMC_Disconnect");
   }    
   
   //---------------------------------------------------------
   // Действия каждый цикл 
   //---------------------------------------------------------
   function Work(time)
   {
      if(play.Value)
      {
         time /= 1000;
         // Текущая позиция воспроизведения
         if(duration && position < duration)
         {
            position += time * speed;
            timeline.Value = position * 100 / duration;
            
            //date.setTime(position * 1000);
            timeleft.Text = "" + CreateDataString(position); //date.getUTCHours() + ((date.getUTCMinutes() < 10) ? ":0" : ":") + date.getUTCMinutes() + ((date.getUTCSeconds() < 10) ? ":0" : ":") + date.getUTCSeconds();
            //date.setTime((duration - position) * 1000);
            timepast.Text = "-"  + CreateDataString(duration - position); //date.getUTCHours() + ((date.getUTCMinutes() < 10) ? ":0" : ":") + date.getUTCMinutes() + ((date.getUTCSeconds() < 10) ? ":0" : ":") + date.getUTCSeconds();
         } else {
            //debug('Work speed ' + speed + ' position=' + position + ' duration=' + duration)
            ClearInformation();
         }      
      }
   }
   
   function ClearInformation(){
         art.GetState(0).Image = "";
         timeleft.Text = timepast.Text = "--:--:--";
         timeline.Value = play.Value = 0;;
         track.Text = ''
   }
};
