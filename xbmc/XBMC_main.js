
var page;
var audio;
var video;
var photo;
var remote;
var tvshows;
var config = {};

var xbmc;
var serverName;

var gui = {
   server:           "XBMC_ServerSelect",
   serverList:       "XBMC_ServerSelect.ServerList",
   serverEdit:       "XBMC_ServerSelect.Edit",
   serverAdd:        "XBMC_ServerSelect.Add",
   
   settings:         "XBMC_ServerSettings",
   settingsName:     "XBMC_ServerSettings.name",
   settingsHost:     "XBMC_ServerSettings.host",
   settingsPort:     "XBMC_ServerSettings.port",   
   settingsSave:     "XBMC_ServerSettings.Save",   
   settingsDelete:   "XBMC_ServerSettings.Delete",
   
   serverName:       "XBMC_Main.ServerName",
   
   audio:            "XBMC_Audio_Source",
   audioType:        "XBMC_Audio_Source.ContentType",
   audioContent:     "XBMC_Audio_Source.ContentList",
   audioFilter:      "XBMC_Audio_Source_Searching.Filter",
   audioBack:        "XBMC_Audio_Source.Back",
   audioPlaylist:    "XBMC_Audio_Playlist.QueueList",
   audioAdd:         "XBMC_Audio_Source.Add",
   audioReplace:     "XBMC_Audio_Source.Replace",
   audioClear:       "XBMC_Clear_Playlist.Clear",
   audioRefresh:     "XBMC_Audio_Playlist.Refresh",
   audioPlay:        "XBMC_Audio_Main.Play",
   audioNext:        "XBMC_Audio_Main.Next",
   audioPrev:        "XBMC_Audio_Main.Prev",
   audioTrack:       "XBMC_Audio_Main.Track",
   audioArtist:      "XBMC_Audio_Main.Artist",
   audioCover:       "XBMC_Audio_Main.Cover",
   audioPercent:     "XBMC_Audio_Main.Percent",
   audioVolume:      "XBMC_Audio_Main.Volume",
   audioPlus:        "XBMC_Audio_Main.Plus",
   audioMinus:       "XBMC_Audio_Main.Minus",
   audioMute:        "XBMC_Audio_Main.Mute",
   audioTimeLeft:    "XBMC_Audio_Main.TimeLeft",
   audioTimeLine:    "XBMC_Audio_Main.TimeLine",
   audioShuffle:     "XBMC_Audio_Playlist.Shuffle",
   audioRepeat:      "XBMC_Audio_Playlist.Repeat",
   
   audioSelect:         "XBMC_AudioSelect",
   audioSelectAlbum:    "XBMC_AudioSelect.Album",
   audioSelectArtist:   "XBMC_AudioSelect.Artist",
   audioSelectGenre:    "XBMC_AudioSelect.Genre",
   audioSelectFolder:   "XBMC_AudioSelect.Folder",
   
   photo:            "XBMC_Photo_Source",
   photoType:        "XBMC_Photo_Source.ContentType",
   photoContent:     "XBMC_Photo_Source.ContentList",
   photoFilter:      "XBMC_Photo_Source_Searching.Filter",
   photoBack:        "XBMC_Photo_Source.Back",   
   photoPlay:        "XBMC_Photo_Main.Play",
   photoNext:        "XBMC_Photo_Main.Next",
   photoPrev:        "XBMC_Photo_Main.Prev",
   photoZoom:        "XBMC_Photo_Main.Zoom",
   photoPlus:        "XBMC_Photo_Main.Plus",
   photoMinus:       "XBMC_Photo_Main.Minus",
   photoTrack:       "XBMC_Photo_Main.Track",
   photoCover:       "XBMC_Photo_Main.Cover",
   
   remote:           "XBMC_Remote",
   remoteLeft:       "XBMC_Remote.Left",
   remoteRight:      "XBMC_Remote.Right",
   remoteUp:         "XBMC_Remote.Up",
   remoteDown:       "XBMC_Remote.Down",
   remoteOk:         "XBMC_Remote.Ok",
   remoteHome:       "XBMC_Remote.Home",
   remoteBack:       "XBMC_Remote.Back",
   remotePlay:       "XBMC_Remote.Play",
   remotePause:      "XBMC_Remote.Pause",
   remoteStop:       "XBMC_Remote.Stop",
   remoteNext:       "XBMC_Remote.Next",
   remotePrev:       "XBMC_Remote.Prev",
   remoteFast:       "XBMC_Remote.Fast",
   remoteSlow:       "XBMC_Remote.Slow",
   remoteOff:        "XBMC_Power.Off",
   remotePercent:    "XBMC_Remote.Percent",
   remoteVolume:     "XBMC_Remote.Volume",
   remotePlus:       "XBMC_Remote.Plus",
   remoteMinus:      "XBMC_Remote.Minus",
   remoteMute:       "XBMC_Remote.Mute",
   
   video:            "XBMC_Video_Source",
   videoType:        "XBMC_Video_Source.ContentType",
   videoContent:     "XBMC_Video_Source.ContentList",
   videoFilter:      "XBMC_Video_Source_Searching.Filter",
   videoBack:        "XBMC_Video_Source.Back",   
   videoPlay:        "XBMC_Video_Main.Play",
   videoPause:       "XBMC_Video_Main.Pause",
   videoStop:        "XBMC_Video_Main.Stop",
   videoNext:        "XBMC_Video_Main.Next",
   videoPrev:        "XBMC_Video_Main.Prev",
   videoFast:        "XBMC_Video_Main.Fast",
   videoSlow:        "XBMC_Video_Main.Slow",
   videoTrack:       "XBMC_Video_Main.Track",
   videoCover:       "XBMC_Video_Main.Cover",
   videoPercent:     "XBMC_Video_Main.Percent",
   videoVolume:      "XBMC_Video_Main.Volume",
   videoPlus:        "XBMC_Video_Main.Plus",
   videoMinus:       "XBMC_Video_Main.Minus",
   videoMute:        "XBMC_Video_Main.Mute",
   videoTimeLeft:    "XBMC_Video_Main.TimeLeft",
   videoTimeLine:    "XBMC_Video_Main.TimeLine",
   
   videoSelect:      "XBMC_VideoSelect",
   videoSelectTitle: "XBMC_VideoSelect.Title",   
   videoSelectGenre: "XBMC_VideoSelect.Genre",   
   videoSelectFolder: "XBMC_VideoSelect.Folder",   
   
   tvshows:          "XBMC_TVShow_Source",
   tvshowsType:      "XBMC_TVShow_Source.ContentType",
   tvshowsContent:   "XBMC_TVShow_Source.ContentList",
   tvshowsFilter:    "XBMC_Show_Source_Searching.Filter",
   tvshowsBack:      "XBMC_TVShow_Source.Back",   
   tvshowsPlay:      "XBMC_TVShow_Main.Play",
   tvshowsPause:     "XBMC_TVShow_Main.Pause",
   tvshowsStop:      "XBMC_TVShow_Main.Stop",
   tvshowsNext:      "XBMC_TVShow_Main.Next",
   tvshowsPrev:      "XBMC_TVShow_Main.Prev",
   tvshowsFast:      "XBMC_TVShow_Main.Fast",
   tvshowsSlow:      "XBMC_TVShow_Main.Slow",
   tvshowsTrack:     "XBMC_TVShow_Main.Track",
   tvshowsCover:     "XBMC_TVShow_Main.Cover",
   tvshowsPercent:   "XBMC_TVShow_Main.Percent",
   tvshowsVolume:    "XBMC_TVShow_Main.Volume",
   tvshowsPlus:      "XBMC_TVShow_Main.Plus",
   tvshowsMinus:     "XBMC_TVShow_Main.Minus",
   tvshowsMute:      "XBMC_TVShow_Main.Mute",
   tvshowsTimeLeft:  "XBMC_TVShow_Main.TimeLeft",
   tvshowsTimeLine:  "XBMC_TVShow_Main.TimeLine",
   
   tvshowsSelect:      "XBMC_TVShowsSelect",
   tvshowsSelectTitle: "XBMC_TVShowsSelect.Title",   
   tvshowsSelectEpisode: "XBMC_TVShowsSelect.Episode",   
   tvshowsSelectGenre: "XBMC_TVShowsSelect.Genre",   
   tvshowsSelectFolder: "XBMC_TVShowsSelect.Folder",      

   movieInfo:        "XBMC_Movie_Info_List",
   search:           "XBMC_ABCSearch",
   wait:             "XBMC_Wait"
};

//---------------------------------------------------------
// Действия при старте
//---------------------------------------------------------
IR.AddListener(IR.EVENT_START, 0, function()
{
   // Инициализация меню серверов //////////////////////////////////////////////////////
    page = IR.GetPage("XBMC_Background");
   serverName = GetItem(gui.serverName);
   
   // Список серверов
    config.list = GetItem(gui.serverList);
   config.select = undefined;
   config.index = 0;
   config.servers = [];
    IR.AddListener(IR.EVENT_ITEM_SELECT, config.list, function(item, subItem)
    {
      // Выбор сервера
      SelectServer(item);
      IR.HidePopup(gui.serverSelect);
    });
   LoadServers();

   // Редактирование сервера
   button = GetItem(gui.serverEdit);
    IR.AddListener(IR.EVENT_ITEM_PRESS, button, function()
   {
      if(config.select != undefined)
      {
         var server = config.servers[config.select].split(':');
         GetItem(gui.settingsName).Text = server[0];
         GetItem(gui.settingsHost).Text = server[1];
         GetItem(gui.settingsPort).Text = server[2];         
      }
   });   
   
   // Добавление сервера
    IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.serverEdit), function()
   {
      config.select = undefined;
      GetItem(gui.settingsName).Text = "XBMC";
      GetItem(gui.settingsHost).Text = "127.0.0.1";
      GetItem(gui.settingsPort).Text = "9090";
   });   
   
   // Сохранение сервера
   GetItem(gui.settingsName).Text = "XBMC";
   GetItem(gui.settingsHost).Text = "127.0.0.1";
   GetItem(gui.settingsPort).Text = "9090";
    IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.settingsSave), function()
   {
      var server = IR.GetVariable("UI.XBMC_ServerSettings.name.Text") + ':' + IR.GetVariable("UI.XBMC_ServerSettings.host.Text") + ':' + IR.GetVariable("UI.XBMC_ServerSettings.port.Text");
      if(config.select != undefined)
         config.servers[config.select] = server
      else
         config.servers.push(server);
      var index = config.index;
      SaveServers();
      LoadServers();
      SelectServer(index);
      //IR.HidePopup("ServerSettings");
   });
   
   // Удаление сервера
    IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.settingsDelete), function()
   {
      if(config.select != undefined)
      {
         config.servers.splice(config.select, 1);
         xbmc.Disconnect();
         SaveServers();
         LoadServers();
      }
   });     
   
    // Создаем устройство XBMC
    xbmc  = new XBMC();
    
    // Действия при соединении
   xbmc.AddListener(xbmc.EVENT_ONLINE, function()
    {
      serverName.Text = config.name;
    });

   // Действия при потере соединения
   xbmc.AddListener(xbmc.EVENT_OFFLINE, function()
    {
      serverName.Text = "Offline";
    });

   // Попапы
   audio = new Audio(gui);  
   video = new Video(gui);  
   photo = new Photo(gui);  
   remote = new Remote(gui);  
   tvshows = new TVShows(gui);  

   // Соединяемся с первым сервером
   SelectServer(0);    
});

//---------------------------------------------------------
// Обновить список серверов
//---------------------------------------------------------
function LoadServers()
{
   config.select = undefined;
   config.index = 0;
   config.list.Clear();
   var value = IR.GetVariable("Global.XbmcMediaServers");
   if(value)
   {
      config.servers = value.split(',');
      for(var i = 0; i < config.servers.length; ++i)
         config.list.CreateItem(i, 1, {Text: config.servers[i].split(':')[0]});
   }
}

//---------------------------------------------------------
// Сохранить список серверов
//---------------------------------------------------------
function SaveServers()
{
   var value = config.servers.length ? config.servers[0] : "";
   for(var i = 1; i < config.servers.length; ++i)
      value += ',' + config.servers[i];
   IR.SetVariable("Global.XbmcMediaServers", value);
}

//---------------------------------------------------------
// Выбрать текущий сервер
//---------------------------------------------------------
function SelectServer(index)
{
   if(index < config.servers.length)
   {
      var server = config.servers[index];
      xbmc.SetParameters(server);
      xbmc.Connect();
      serverName.Text = "Connecting..";
      
      config.list.CreateItem(config.index, 0, {FillColor: 0});
      
      server = server.split(':');
      config.index = index;
      config.select = index;
      config.name = server[0];
      config.host = server[1];
      config.port = server[2];
      config.http = "http://" + config.host + ":8080/image/";
      
      config.list.CreateItem(index, 0, {FillColor: 0x0080FFB0});      
   }
}

   //---------------------------------------------------------
   // Find ui item
   //---------------------------------------------------------
   function GetItem(path)
   {
      path = path.split('.');
      
      // Find parent
      var parent = IR.GetItem(path[0]);
      
      // Find child
      return parent.GetItem(path[1]);
   } 
