var KODI_MODULE = function(kodi, crestron, gui, id) {
   var that = this;
   var kodi = kodi;
   var crestron = crestron;
   
   var gui = gui;
   var id = id;
   
   var map = {
      artist:     {method: "AudioLibrary.GetArtists", id: "artistid",   name: "Artists"},
      album:      {method: "AudioLibrary.GetAlbums",  id: "albumid",    name: "Albums"},
      genre:      {method: "AudioLibrary.GetGenres",  id: "genreid",    name: "Genres"},
      song:       {method: "AudioLibrary.GetSongs",   id: "songid",     name: "Songs"},
      source:     {method: "Files.GetSources",        id: "file",       name: "Folders"},
      file:       {method: "Files.GetDirectory",      id: "file",       name: "Files"},
      directory:  {method: "Files.GetDirectory",      id: "directory",  name: "Files"},
   };
   
   var justStarted = 0;
   var justStarted_lastSeconds;
   var isPlay = false;
   var isShuffle = false;
   var isRepeat = "off";
   
   var history = [];
   var content = [];
   var select = [];
   
   var current = 0;
   
   IR.SetInterval(1000, function() {
      updatePlayer();
   });
   
   kodi.AddListener(kodi.EVENT_ONLINE, function() {
      updatePlayer();
      updateContent("artist", {});
      updatePlaylist();
      IR.Log("online");
      IR.Log("id:"+id);
   });
   
   kodi.AddListener(kodi.EVENT_OFFLINE, function() {
      IR.Log("offline");
   });
   
   kodi.AddListener(kodi.EVENT_NOTIFY, function(response) {
      if (response.method.indexOf("Player.") >= 0) {
         switch (response.method) {
            case "Player.OnPlay":
               isPlay = true;
               break;
            case "Player.OnPause":
            case "Player.OnStop":
               isPlay = false;
               break;
         }
      } else if (response.method.indexOf("Playlist.") >= 0 && response.params.data.playlistid == 0) {
         switch (response.method) {
         case "Playlist.OnClear":
            gui.playlistList.Clear();
            current = 0;
            break;
         case "Playlist.OnAdd":
            break
         }
      }
   });
   
   function updatePlayer() {
      kodi.Request("Player.GetItem", {"playerid" : 0, properties: ["duration", "album", "artist", "title", "thumbnail"]}, function(response) {
         gui.mainArtist.Text = response.result.item.artist==undefined?"":response.result.item.artist;
         gui.mainTitle.Text = response.result.item.title==undefined?"":response.result.item.title;
         gui.mainCover.GetState(0).Image = "http://" + kodi.ip + ":8080/image/" + response.result.item.thumbnail.replace(/%/g, "%25");
      });
      kodi.Request("Player.GetProperties", {"playerid": 0, properties: ["time", "totaltime", "speed", "position", "repeat", "shuffled"]}, function(response) {
         isShuffle = response.result.shuffled;
         isRepeat = response.result.repeat; 
         var totaltime = response.result.totaltime;
         var duration = totaltime.hours * 3600 + totaltime.minutes * 60 + totaltime.seconds;
         var time = response.result.time;
         var position = time.hours * 3600 + time.minutes * 60 + time.seconds;
         if (justStarted < 3) {
            if (justStarted == 1)
               justStarted_lastSeconds = time.seconds;
            else if (justStarted != 0) {
               if (time.seconds != justStarted_lastSeconds) {
                  isPlay = true;   
               } else {
                  isPlay = false;
               }
            }
            justStarted++;
         }
         gui.mainTimeLeft.Text = "" + time.hours + ((time.minutes < 10) ? ":0" : ":") + time.minutes + ((time.seconds < 10) ? ":0" : ":") + time.seconds;
         gui.mainTimeLine.Value = position * 100 / duration;
         gui.mainPlay.Value = isPlay;
         gui.mainShuffle.Value = isShuffle;
         gui.mainRepeat.State = isRepeat=="off" ? 0 : isRepeat=="all" ? 1 : isRepeat=="one" ? 2 : 0;
         
         gui.playlistRepeat.State = isRepeat=="off" ? 0 : isRepeat=="all" ? 1 : isRepeat=="one" ? 2 : 0;
         gui.playlistShuffle.Value = isShuffle;
         
         if (gui.playlistList.ItemsCount) {
            gui.playlistList.CreateItem(current, 0, {FillColor: 0});
            if (response.result.position != -1) {
               current = response.result.position;
               gui.playlistList.CreateItem(current, 0, {FillColor: 0x0080FFB0});
            }
         }
      });
   }
   
   function updateContent(type, filter) {
      gui.browseList.Template = gui.browseListTemplate;
      gui.browseList.Clear();
      content = []; 
      //история
      //gui.browseBack.Visible = history.length;
      history.push({"type": type, "filter": filter});
      //запрос
      var qtype = type;
      var method = map[qtype].method;
      filter.sort = {method: "label"};
      kodi.Request(method, filter, function(response) {
         var result = map[qtype].id;
         var items = response.result[qtype + "s"];
         var listLine = 0;
         var lastLetter = "";
         if (items) {
            for (var i=0; i<items.length; i++) {
               //добавляем букву если надо
               if (items[i].label.charAt(0).toUpperCase() != lastLetter) {
                  content[listLine] = {type: "letter", id: items[i].label.charAt(0).toUpperCase()};
                  addLetter(gui.browseList, listLine, items[i].label.charAt(0).toUpperCase()); 
                  listLine++;
                  lastLetter = items[i].label.charAt(0).toUpperCase();  
               }
               //настраиваем и добавляем элемент списка в соответствии с типом
               content[listLine] = {type: qtype, id: items[i][result]};
               switch(qtype) {
               case "artist":
                  gui.browseList.CreateItem(listLine, 3, {Text: items[i].label});
                  gui.browseList.CreateItem(listLine, 4, {Visible: false});
                  gui.browseList.CreateItem(listLine, 5, {Visible: false}); 
                  gui.browseList.CreateItem(listLine, 2, {Image: "Artist.png"});
                  gui.browseList.CreateItem(listLine, 6, {Visible: true});
                  gui.browseList.CreateItem(listLine, 7, {Visible: false});
                  listLine++;
                  break;
               case "album":
                  gui.browseList.CreateItem(listLine, 3, {Text: items[i].label});
                  gui.browseList.CreateItem(listLine, 4, {Visible: false});
                  gui.browseList.CreateItem(listLine, 5, {Visible: false});
                  var thumbnail = "http://" + kodi.ip + ":8080/image/" + items[i].thumbnail.replace(/%/g, "%25");
                  gui.browseList.CreateItem(listLine, 2, {Image: thumbnail.length > 33 ? thumbnail : "Albums.png"});
                  gui.browseList.CreateItem(listLine, 6, {Visible: true});
                  gui.browseList.CreateItem(listLine, 7, {Visible: false});
                  listLine++;
                  break;
               case "genre":
                  gui.browseList.CreateItem(listLine, 3, {Text: items[i].label});
                  gui.browseList.CreateItem(listLine, 4, {Visible: false});
                  gui.browseList.CreateItem(listLine, 5, {Visible: false});
                  gui.browseList.CreateItem(listLine, 2, {Image: "Genres2.png"});
                  gui.browseList.CreateItem(listLine, 6, {Visible: true});
                  gui.browseList.CreateItem(listLine, 7, {Visible: false});
                  listLine++;
                  break;
               case "song":
                  gui.browseList.CreateItem(listLine, 3, {Text: items[i].label});
                  gui.browseList.CreateItem(listLine, 4, {Text: items[i].artist.toString()});
                  var duration = new Date();
                  duration.setTime(items[i].duration * 1000);
                  gui.browseList.CreateItem(listLine, 5, {Text: duration.getUTCMinutes() + ((duration.getUTCSeconds() < 10) ? ":0" : ":") + duration.getUTCSeconds()});
                  var thumbnail = "http://" + kodi.ip + ":8080/image/" + items[i].thumbnail.replace(/%/g, "%25");
                  gui.browseList.CreateItem(listLine, 2, {Image: thumbnail.length > 33 ? thumbnail : "64x64_black_music_g.png"});
                  gui.browseList.CreateItem(listLine, 6, {Visible: true});
                  gui.browseList.CreateItem(listLine, 7, {Visible: false});
                  listLine++;
                  break;
               }    
            }   
         }
         updateABCL();
      });     
   }
   
   function addLetter(list, i, letter) {
      list.CreateItem(i, 3, {Visible: false});
      list.CreateItem(i, 4, {Visible: false});
      list.CreateItem(i, 5, {Visible: false});
      list.CreateItem(i, 2, {Visible: false});
      list.CreateItem(i, 6, {Visible: false});
      list.CreateItem(i, 7, {Visible: true});
      list.CreateItem(i, 7, {Text: letter});
   }
   
   function updateABCL() {
      gui.ABCLList.Template = gui.ABCLListTemplate;
      gui.ABCLList.Clear();
      var listLine = 0;
      for (var i=0; i<content.length; i++) {
         if (content[i].type == "letter") {
            gui.ABCLList.CreateItem(listLine, 2, {Text: content[i].id});
            listLine++;  
         }
      }
   }
   
   function playSingleSong(item) {
      kodi.Request("Player.Stop", {playerid: 0});
      kodi.Request("Playlist.Clear", {playlistid: 0});
      kodi.Request("Playlist.Add", {playlistid: 0, item: item});
      kodi.Request("Player.PlayPause", {"playerid" : 0}, function(result) {
         if (result.error)
            kodi.Request("Player.Open", {"item": {playlistid: 0, position: 0}}, updatePlaylist);
         else
            updatePlaylist();
      });   
   }
   
   function addToPlaylist() {
      for (var i=0; i<select.length; i++) {
         if (select[i]) {
            var item = {};
            item[map[content[i].type].id] = content[i].id;
            kodi.Request("Playlist.Add", {playlistid: 0, item: item});
            gui.browseList.CreateItem(i, 0, {FillColor: 0});
            gui.browseList.CreateItem(i, 6, {Value: 0});
         }
      }
      select.length = 0;
      updatePlaylist();
   }
   
   function updatePlaylist() {
      gui.playlistList.Clear();
      current = 0;
      kodi.Request("Playlist.GetItems", {playlistid: 0, properties: ["artist", "thumbnail", "duration"], limits: {start: 0, end:100}}, updatePlaylistCallback);      
   }
   
   function updatePlaylistCallback(response) {
      gui.playlistList.Template = gui.playlistListTemplate;
      var items = response.result.items;
      var limits = response.result.limits;
      if (items !== undefined) {
         var id = limits.start;
         for (var i=0; i<items.length; i++) {              
            var thumbnail = "http://" + kodi.ip + ":8080/image/" + items[i].thumbnail.replace(/%/g, "%25");            
            gui.playlistList.CreateItem(id, 2, {Image: thumbnail.length > 33 ? thumbnail : "64x64_black_music_g.png"});
            gui.playlistList.CreateItem(id, 3, {Text: items[i].label});
            gui.playlistList.CreateItem(id, 4, {Text: items[i].artist.toString()});
            var duration = new Date();
            duration.setTime(items[i].duration * 1000);
            gui.playlistList.CreateItem(id, 5, {Text: duration.getUTCMinutes() + ((duration.getUTCSeconds() < 10) ? ":0" : ":") + duration.getUTCSeconds()});
            id++;
         }
      }
   }
   
   //list press
   IR.AddListener(IR.EVENT_ITEM_SELECT, gui.browseList, function (item, subItem) {
      if (subItem == 6) {
         select[item] ^= 1;
         gui.browseList.CreateItem(item, 0, {FillColor: (select[item] ? 0x0080FFB0 : 0)});      
         gui.browseList.CreateItem(item, 6, {Value: select[item]}); 
      } else {
         switch(content[item].type) {
         case "artist":
            updateContent("album", {filter: {artistid: content[item].id}, properties: ["artist", "thumbnail", "year"]});
            break;
         case "album":
            updateContent("song", {filter: {albumid: content[item].id}, properties: ["artist", "thumbnail", "duration"]}); 
            break;
         case "genre":
            updateContent("artist", {filter: {genreid: content[item].id}});
            break;
         case "song":
            var songid = {}
            songid[map[content[item].type].id] = content[item].id;
            playSingleSong(songid);
            break;
         case "letter":
            crestron.pulse("Source_XBMCA_ABCL_set");
            break;
         }
      }
   });
   
   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, gui.ABCLList, function (item, subItem, event_type, object) {
      if (event_type == 12) {
         var letter = "";
         if (object.Name == "letter") {
            letter = object.Text;
         } else if (object.Name == "letter_bg") {
            letter = object.Parent.GetItem("letter").Text;
         }
         var index = 0;
         for (var i=0; i<content.length; i++) {
            if (content[i].type == "letter" && content[i].id == letter)
               index = i;   
         }
         gui.browseList.SetPosition(index);
         crestron.pulse("Source_XBMCA_ABCL_reset");
      }
   });
   
   IR.AddListener(IR.EVENT_ITEM_SELECT, gui.playlistList, function(item, subItem) {
      kodi.Request("Player.Open", {"item": {playlistid: 0, position: item}}, function() {
         updatePlayer();
      });
   });
   
   //buttons
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.mainPlay, function() {
      kodi.Request("Player.PlayPause", {"playerid" : 0}, function(result) {
         if (result.error) kodi.Request("Player.Open", {"item": {playlistid: 0, position: 0}});
      });
      updatePlayer();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.mainStop, function() {
      kodi.Request("Player.Stop", {playerid: 0});
      updatePlayer();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.mainPrev, function() {
      kodi.Request("Player.GoTo", {"playerid" : 0, to: "previous"});
      updatePlayer();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.mainNext, function() {
      if ((current+1)<gui.playlistList.ItemsCount) {
         kodi.Request("Player.GoTo", {"playerid" : 0, to: "next"});
         updatePlayer();
      }
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.mainTimeLine, function() {
      kodi.Request("Player.Seek", {"playerid" : 0, "value" : gui.mainTimeLine.Value});
      updatePlayer();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, gui.mainTimeLine, function() {
      kodi.Request("Player.Seek", {"playerid" : 0, "value" : gui.mainTimeLine.Value});
      updatePlayer();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.mainRepeat, function() {
      kodi.Request("Player.SetRepeat", {playerid: 0, repeat: isRepeat=="off" ? "all" : isRepeat=="all" ? "one" : "off"});
      updatePlayer();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.mainShuffle, function() {
      kodi.Request("Player.SetShuffle", {playerid: 0, shuffle: isShuffle ? false : true});
      updatePlayer();
      updatePlaylist();
   });
   ///
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.browseGenres, function() {
      history = [];
      updateContent("genre", {});
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.browseArtists, function() {
      history = [];
      updateContent("artist", {});
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.browseAlbums, function() {
      history = [];
      updateContent("album", {properties: ["artist", "thumbnail", "year"]});
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.browseSongs, function() {
      history = [];
      updateContent("song", {properties: ["artist", "thumbnail", "duration"]});
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.browseBack, function() {
      if (history.length > 1) {
         history.pop();
         var prev = history.pop();
         updateContent(prev.type, prev.filter);
      }
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.browseAdd, addToPlaylist);
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.browseReplace, function() {
      kodi.Request("Playlist.Clear", {playlistid: 0});
      addToPlaylist();
   });
   ///
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.playlistClear, function() {
      kodi.Request("Playlist.Clear", {playlistid: 0});
      updatePlaylist();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.playlistRefresh, function() {
      updatePlaylist();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.playlistRepeat, function() {
      kodi.Request("Player.SetRepeat", {playerid: 0, repeat: isRepeat=="off" ? "all" : isRepeat=="all" ? "one" : "off"});
      updatePlayer();
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, gui.playlistShuffle, function() {
      kodi.Request("Player.SetShuffle", {playerid: 0, shuffle: isShuffle ? false : true});
      updatePlayer();
      updatePlaylist();
   });
}