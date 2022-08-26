//---------------------------------------------------------
// Объект Audio
//---------------------------------------------------------
function Audio(gui)
{
   var content = [];
   var history = [];
   var select = [];
   var duration;
   var position;
   
   var list;
   var name;
   var back;
   var type;
   var playlist;
   var play;
   var track;
   var artist;
   var art;
   var current;
   var volume;
   var percent;
   var mute;
   var shuffle;
   var repeat;
   var timeline;
   var timeleft;
   var letters = [];
   
   var date = new Date();
   var mode = ["off", "all", "one"];

   // Карта различных типов контента
   var map = {
      artist:     {method: "AudioLibrary.GetArtists", id: "artistid",   name: "Artists"},
      album:      {method: "AudioLibrary.GetAlbums",  id: "albumid",    name: "Albums"},
      genre:      {method: "AudioLibrary.GetGenres",  id: "genreid",    name: "Genres"},
      song:       {method: "AudioLibrary.GetSongs",   id: "songid",     name: "Songs"},
      source:     {method: "Files.GetSources",        id: "file",       name: "Folders"},
      file:       {method: "Files.GetDirectory",      id: "file",       name: "Files"},
      directory:  {method: "Files.GetDirectory",      id: "directory",  name: "Files"},
   };
   
   // Конструктор
   Init();
  
   //---------------------------------------------------------
   // Начальная инициализация
   //---------------------------------------------------------
   function Init()
   {
      var popup = IR.GetPopup(gui.audio);
      IR.AddListener(IR.EVENT_ITEM_SHOW, popup, function()
      {
         UpdateVolume();
      });
      name = GetItem(gui.audioType);
      
      // Список контента
      list = GetItem(gui.audioContent);
      
      IR.AddListener(IR.EVENT_ITEM_SELECT, list, function (item, subItem)
      {
         if(item > 60000)
         {
            // Окно поиска
            page.ShowPopup(gui.search);
         } else if(subItem == 6)
         {
            // Пометить
            select[item] ^= 1;
            list.CreateItem(item, 0, {FillColor: (select[item] ? 0x0080FFB0 : 0)});      
            list.CreateItem(item, 6, {Value: select[item]});      
         } else {
            // Выбрать
            switch(content[item].type)
            {
            case "artist":
               UpdateContent("album", {filter: {artistid: content[item].id}, properties: ["artist", "thumbnail", "year"]});
               break;
            case "album":
               UpdateContent("song", {filter: {albumid: content[item].id}, properties: ["artist", "thumbnail", "duration"]});
               break;
            case "genre":
               UpdateContent("artist", {filter: {genreid: content[item].id}});
               break;
            case "song":
               select[item] ^= 1;
               list.CreateItem(item, 0, {FillColor: (select[item] ? 0x0080FFB0 : 0)});      
               list.CreateItem(item, 6, {Value: select[item]});      
               break;
            case "source":
               UpdateContent("file", {directory: content[item].id, media: "music"});
               break;
            case "file":
               select[item] ^= 1;
               list.CreateItem(item, 0, {FillColor: (select[item] ? 0x0080FFB0 : 0)});
               list.CreateItem(item, 6, {Value: select[item]});      
               break;
            case "directory":
               UpdateContent("file", {directory: content[item].id, media: "music"});
               break;              
            }
         }
      });
            
      // Фильтр списка
      IR.AddListener(IR.EVENT_ITEM_CHANGE, GetItem(gui.audioFilter), function()
      {
         list.Filter = GetItem(gui.audioFilter).Text; 
      });
      
      // Кнопка назад
      back = GetItem(gui.audioBack);
      IR.AddListener(IR.EVENT_ITEM_PRESS, back, function()
      {
         if(history.length > 1)
         {
            history.pop();
            var prev = history.pop();
            UpdateContent(prev.type, prev.filter);
         }   
      });
      
      // Плейлист
      playlist = GetItem(gui.audioPlaylist);
      IR.AddListener(IR.EVENT_ITEM_SELECT, playlist, function(item, subItem)
      {
         // Воспроизвести
         xbmc.Request("Player.Open", {"item": {playlistid: 0, position: item}});
      });      
      
      // Кнопка добавить
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.audioAdd), AddToPlaylist);

      // Кнопка заменить
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.audioReplace), function()
      {
         xbmc.Request("Playlist.Clear", {playlistid: 0});
         AddToPlaylist();
      });

      // Кнопка очистить
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.audioClear), function()
      {
         xbmc.Request("Playlist.Clear", {playlistid: 0});
         UpdatePlayList();
      });

      // Кнопка обновить
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.audioRefresh), function()
      {
         UpdatePlayList();
      });
      
      // Кнопка Play
      play = GetItem(gui.audioPlay);
      IR.AddListener(IR.EVENT_ITEM_PRESS, play, function()
      {
         xbmc.Request("Player.PlayPause", {"playerid" : 0}, function(result)
         {
            if(result.error) xbmc.Request("Player.Open", {"item": {playlistid: 0, position: 0}});
         });
      });
      
      // Кнопка Next
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.audioNext), function()
      {
         if((current+1) < playlist.ItemsCount)
            xbmc.Request("Player.GoTo", {"playerid" : 0, to: "next"});
      });
      
      // Кнопка Previous
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.audioPrev), function()
      {
         xbmc.Request("Player.GoTo", {"playerid" : 0, to: "previous"});
      });
      
      // Информация о композиции
      track = GetItem(gui.audioTrack);
      artist = GetItem(gui.audioArtist);
      art = GetItem(gui.audioCover);
      
      // Уровень громкости звука
      percent = GetItem(gui.audioPercent);
      volume = GetItem(gui.audioVolume);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, volume, function()
      {
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.audioPlus), function()
      {
         volume.Value += 5;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      IR.AddListener(IR.EVENT_ITEM_HOLD, GetItem(gui.audioPlus), function()
      {
         volume.Value += 3;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.audioMinus), function()
      {
         volume.Value -= 5;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });    
      IR.AddListener(IR.EVENT_ITEM_HOLD, GetItem(gui.audioMinus), function()
      {
         volume.Value -= 3;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      mute = GetItem(gui.audioMute);
      IR.AddListener(IR.EVENT_ITEM_PRESS, mute, function()
      {
         xbmc.Request("Application.SetMute", {mute: "toggle"});
         UpdateVolume();
      });
      
      // Позиция воспроизведения
      timeleft = GetItem(gui.audioTimeLeft);
      timeline = GetItem(gui.audioTimeLine);
      IR.AddListener(IR.EVENT_ITEM_PRESS, timeline, function()
      {
         position = timeline.Value / 100 * duration;
         xbmc.Request("Player.Seek", {"playerid" : 0, "value": timeline.Value});
      });    
      
      // Режимы воспроизведения
      shuffle = GetItem(gui.audioShuffle);
      IR.AddListener(IR.EVENT_ITEM_PRESS, shuffle, function()
      {
         xbmc.Request(shuffle.Value ? "Player.Shuffle" : "Player.UnShuffle", {playerid: 0});
         UpdatePlayList();
      });
      repeat = GetItem(gui.audioRepeat);
      IR.AddListener(IR.EVENT_ITEM_PRESS, repeat, function()
      {
         repeat.State = (repeat.State + 1) % 3;
         xbmc.Request("Player.Repeat", {playerid: 0, state: mode[repeat.State]});
      });      
      
      // Выбор типа контента
      //popup = IR.GetPopup("AudioSelect");
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.audioSelectAlbum), function()
      {
         history = [];
         UpdateContent("album", {properties: ["artist", "thumbnail", "year"]});
      });    
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.audioSelectArtist), function()
      {
         history = [];
         UpdateContent("artist", {});
      });    
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.audioSelectGenre), function()
      {
         history = [];
         UpdateContent("genre", {});
      });    
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.audioSelectFolder), function()
      {
         history = [];
         UpdateContent("source", {media: "music"});
      });    

      // Всплывающее окно поиска
      var popup = IR.GetPopup(gui.search);
      for(var i = 64; i < 91; i++)
      {
         var item = popup.GetItem(String.fromCharCode(i));
         letters[i] = item;
         IR.AddListener(IR.EVENT_ITEM_PRESS, item, function()
         {
            list.SetPosition(60000 + this.Text.charCodeAt(0));
            page.HidePopup(gui.search);
         }, item);
      }
      
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

      // Отключаем все буквы поиска
      for(var i = 64; i < 91; i++)
         letters[i].Enable = false;
               
      // Добавляем сортировку результатов
      filter.sort = {method: "label"};
               
      // Запрос к библиотеке
      xbmc.Request(map[type].method, filter, function(response)
      {
         try {
            // Заполняем список
            content.length = 0;
            select.length = 0;
            list.Clear();
            
            var result = map[type].id;
            var items = response.result[type + "s"];
            if(items)
            {        
               // Нужны ли буквы поиска
               var find = false;
               switch(type)
               {
               case "artist":
               case "album":
               case "genre":
                  find = true;
                  break;
               }
               
               var last;
               for(var i = 0; i < items.length; ++i)
               {
                  // Определяем тип содержимого
                  var atype = items[i].filetype;
                  if(atype == undefined) atype = type;
                  content[i] = {type: atype, id: items[i][result]};
                  
                  var label = items[i].label;
                  // Буква поиска
                  if(find)
                  {
                     var letter = label.charAt(0).toUpperCase();
                     var code = letter.charCodeAt(0);
                     if(i == 0 && (code < 65 || code > 90))
                     {
                        letters[64].Enable = true;
                        list.CreateItem(60064, 7, {Visible: true, Enable: true, Text: "@"});
                        list.CreateItem(60064, 0, {Name: "@"});
                        list.CreateItem(60064, 6, {Visible: false, Enable: false});                     
                     } else
                     if(last != letter && code >= 65 && code < 91)
                     {
                        letters[code].Enable = true;
                        last = code + 60000;
                        list.CreateItem(last, 7, {Visible: true, Enable: true, Text: letter});
                        list.CreateItem(last, 0, {Name: letter});
                        list.CreateItem(last, 6, {Visible: false, Enable: false});
                     }
                  }
                  
                  // Добавляем элемент списка
                  list.CreateItem(i, 2, {Text: label});
                  list.CreateItem(i, 0, {Name: label});
                  
                  switch(atype)
                  {
                  case "artist": 
                     list.CreateItem(i, 4, {Image: "Artist.png"}); 
                     break;
                  case "album": 
                     list.CreateItem(i, 4, {Image: "Albums.png"});   
                     list.CreateItem(i, 3, {Text: items[i].artist});
                     if(items[i].year)
                        list.CreateItem(i, 5, {Text: ""+items[i].year});
                     break;
                  case "genre": 
                     list.CreateItem(i, 4, {Image: "Genres2.png"});   
                     break;
                  case "source": 
                     list.CreateItem(i, 4, {Image: "Folder.png"});   
                     list.CreateItem(i, 6, {Visible: false, Enable: false});
                     break;
                  case "directory": 
                     list.CreateItem(i, 4, {Image: "Folder.png"});   
                     break;
                  case "song": 
                     list.CreateItem(i, 3, {Text: items[i].artist});                  
                     date.setTime(items[i].duration * 1000);
                     list.CreateItem(i, 5, {Text: "" + date.getUTCMinutes() + ((date.getUTCSeconds() < 10) ? ":0" : ":") + date.getUTCSeconds()});
                     break;
                  }
                  if(items[i].thumbnail)
                     list.CreateItem(i, 4, {Image: config.http + items[i].thumbnail.replace(/%/g, "%25")});
               }
            }
         } catch(error) { IR.Log("UpdateContent::Exception catch!"); }
         // Скрываем окно ожидания
         page.HidePopup(gui.wait);
      });    
   }
      
   //---------------------------------------------------------
   // Добавить выделенные в плейлист
   //---------------------------------------------------------
   function AddToPlaylist()
   {
      for(var i = 0; i < select.length; ++i)
      {
         if(select[i])
         {
            var item = {};
            item[map[content[i].type].id] = content[i].id;
            xbmc.Request("Playlist.Add", {playlistid: 0, item: item});
            // Снимем выделение
            list.CreateItem(i, 0, {FillColor: 0});
            list.CreateItem(i, 6, {Value: 0});                  
         }
      }
      select.length = 0;
      UpdatePlayList();
   }

   //---------------------------------------------------------
   // Обновить плейлист
   //---------------------------------------------------------
   function UpdatePlayList()
   {
      // Показываем окно ожидания
      page.ShowPopup(gui.wait);
      playlist.Clear();
      current = 0;
      // Запрашиваем элементы плейлиста
      xbmc.Request("Playlist.GetItems", {playlistid: 0, properties: ["artist", "thumbnail", "duration"], limits: {start: 0, end: 100}}, UpdatePlayListCallback);
   }
   
   //---------------------------------------------------------
   // Обновление плейлиста
   //---------------------------------------------------------
   function UpdatePlayListCallback(response)
   {
      // Заполняем список
      var items = response.result.items;
      var limits = response.result.limits;
      if(items !== undefined)
      {
         var id = limits.start;
         for(var i = 0; i < items.length; ++i)
         {
            playlist.CreateItem(id, 2, {Text: items[i].label});    
            playlist.CreateItem(id, 3, {Text: items[i].artist});
            date.setTime(items[i].duration * 1000);
            playlist.CreateItem(id, 5, {Text: "" + date.getUTCMinutes() + ((date.getUTCSeconds() < 10) ? ":0" : ":") + date.getUTCSeconds()});               
            if(items[i].thumbnail)
               playlist.CreateItem(id, 4, {Image: config.http + items[i].thumbnail.replace(/%/g, "%25")});
            ++id;
         }
      }
      
      // Запрашиваем остальное
      if(limits && limits.end < limits.total)
         xbmc.Request("Playlist.GetItems", {playlistid: 0, properties: ["artist", "thumbnail", "duration"], limits: {start: limits.end, end: limits.end+100}}, UpdatePlayListCallback);
      else 
         page.HidePopup(gui.wait);            
   }
   
   
   //---------------------------------------------------------
   // Обновить плеер
   //---------------------------------------------------------
   function UpdatePlayer()
   {
      // Запрашиваем данные о текущем треке
      xbmc.Request("Player.GetItem", {"playerid" : 0, properties: ["duration", "album", "artist", "title", "thumbnail"]}, function(response)
      {
         if(response.result)
         {
            artist.Text = response.result.item.artist;
            track.Text = response.result.item.title;
            art.GetState(0).Image = config.http + response.result.item.thumbnail.replace(/%/g, "%25");
         }
      });
    
      // Запрашиваем данные о состоянии плеера
      xbmc.Request("Player.GetProperties", {"playerid" : 0, properties: ["time", "totaltime", "speed", "position", "repeat", "shuffled"]}, function(response)
      {
         if(response.result)
         {
            var time = response.result.time;
            timeleft.Text = "" + time.hours + ((time.minutes < 10) ? ":0" : ":") + time.minutes + ((time.seconds < 10) ? ":0" : ":") + time.seconds;
            position = time.hours * 3600 + time.minutes * 60 + time.seconds;
            timeline.Value = position * 100 / duration;
            time = response.result.totaltime;
            duration = time.hours * 3600 + time.minutes * 60 + time.seconds;
            play.Value = response.result.speed;
            repeat.State = (response.result.repeat == "off") ? 0 : ((response.result.repeat == "all") ? 1 : 2);
            shuffle.Value = response.result.shuffled ? 1 : 0;
            if(playlist.ItemsCount)
            {
               playlist.CreateItem(current, 0, {FillColor: 0});
               current = response.result.position;
               playlist.CreateItem(current, 0, {FillColor: 0x0080FFB0});
            }
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
   // Уведомления о событиях
   //---------------------------------------------------------
   function Notify(response)
   {
      try 
      {   
         // Плеер
         if(response.method.indexOf("Player.") >= 0 && 
            response.params.data.player.playerid == 0)
         {
            switch(response.method)
            {
            case "Player.OnPlay":
               play.Value = 1;
               IR.SetTimeout(500, UpdatePlayer);
               break;
            case "Player.OnPause":
            case "Player.OnStop":
               play.Value = 0;
               break;
            case "Player.OnSeek":
               var time = response.params.data.player.time;
               position = time.hours * 3600 + time.minutes * 60 + time.seconds;
               timeline.Value = position * 100 / duration;
               break;
            }
         } else
         // Плейлист
         if(response.method.indexOf("Playlist.") >= 0 && 
            response.params.data.playlistid == 0)
         {
            switch(response.method)
            {
            case "Playlist.OnClear":
               playlist.Clear();
               current = 0;
               break;
            case "Playlist.OnAdd":
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
      UpdateContent("artist", {});
        UpdatePlayList();
      UpdateVolume();
      xbmc.Request("Player.GetActivePlayers", {}, function(response)
      {
         for(var i = 0; i < response.result.length; ++i)
            if(response.result[i].playerid == 0)
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
      select.length = 0;
      playlist.Clear();
      artist.Text = "";
      track.Text = "";
      art.GetState(0).Image = "";
      play.Value = 0;
   } 
   
   //---------------------------------------------------------
   // Действия каждый цикл 
   //---------------------------------------------------------
   function Work(time)
   {
      time /= 1000;    // переводим в секунды
      if(play.Value)
      {
         // Текущая позиция воспроизведения
         position += time;
         timeline.Value = position * 100 / duration;
         
         date.setTime(position * 1000);
         timeleft.Text = "" + date.getUTCHours() + ((date.getUTCMinutes() < 10) ? ":0" : ":") + date.getUTCMinutes() + ((date.getUTCSeconds() < 10) ? ":0" : ":") + date.getUTCSeconds();      
      }
   }

};
