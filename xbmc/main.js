
var page;
var audio;
var video;
var photo;
var remote;
var tvshows;
var config = {};

var xbmc;
var serverName;
var LIST_IS_EMPTY = "List is empty";
var ITEM_NOT_EXIST = "Item Not Exist";

var gui = {
   //
   tryagain_btn:     "XBMC_Disconnect.Try",
   // 
   main_page:        "XBMC_Main",
   // disconnect popup
   disconnect_popup: "XBMC_Disconnect",
   // popup which blocks control element when data is loading
   wait:             "XBMC_Wait",
   // popup which hide interface
   hide_popup:       "XBMC_Hide",
   
   server:           "XBMC_ServerSelect",
   serverList:       "XBMC_ServerSelect.ServerList",
   serverList_2:       "XBMC_Disconnect.ServerList",
   serverEdit:       "XBMC_ServerSelect.Edit",
   serverAdd:        "XBMC_ServerSelect.Add",
   
   settings:         "XBMC_ServerSettings",
   settingsName:     "XBMC_ServerSettings.name",
   settingsHost:     "XBMC_ServerSettings.host",
   settingsPort:     "XBMC_ServerSettings.port",   
   settingsSave:     "XBMC_ServerSettings.Save",   
   settingsDelete:   "XBMC_ServerSettings.Delete",
   
   // webserver
   webserverLogin:   "XBMC_ServerSettings.EditBox_http_login",
   webserverPwd:     "XBMC_ServerSettings.EditBox_http_pas",
   webserverPort:    "XBMC_ServerSettings.EditBox_http_port",
   
   serverName:       "XBMC_Audio.ServerName",
   
   audio:            "XBMC_Audio",
   audioType:        "XBMC_Audio.ContentType",
   audioContent:     "XBMC_Audio.ContentList",
   audioFilter:      "XBMC_Audio.Filter",
   audioBack:        "XBMC_Audio.Back",
   audioPlaylist:    "XBMC_Audio.QueueList",
   audioAdd:         "XBMC_Audio.Add",
   audioReplace:     "XBMC_Audio.Replace",
   audioClear:       "XBMC_ClearPlaylist.Clear",
   audioRefresh:     "XBMC_Audio.Refresh",
   audioPlay:        "XBMC_Audio.Play",
   audioNext:        "XBMC_Audio.Next",
   audioPrev:        "XBMC_Audio.Prev",
   audioTrack:       "XBMC_Audio.Track",
   audioArtist:      "XBMC_Audio.Artist",
   audioCover:       "XBMC_Audio.Cover",
   audioPercent:     "XBMC_Audio.Percent",
   audioVolume:      "XBMC_Audio.Volume",
   audioPlus:        "XBMC_Audio.Plus",
   audioMinus:       "XBMC_Audio.Minus",
   audioMute:        "XBMC_Audio.Mute",
   audioTimeLeft:    "XBMC_Audio.TimeLeft",
   audioTimePast:    "XBMC_Audio.TimePast",
   audioTimeLine:    "XBMC_Audio.TimeLine",
   audioShuffle:     "XBMC_Audio.Shuffle",
   audioRepeat:      "XBMC_Audio.Repeat",
   audioAlbum:       "XBMC_Audio.Album",     
   audiohideSearch:  "XBMC_Audio.SearchingHide",
   audioclearSearch: "XBMC_Audio.Clear 1",   
   
   audioSelect:         "XBMC_AudioSelect",
   audioSelectAlbum:    "XBMC_AudioSelect.Album",
   audioSelectArtist:   "XBMC_AudioSelect.Artist",
   audioSelectGenre:    "XBMC_AudioSelect.Genre",
   audioSelectFolder:   "XBMC_AudioSelect.Folder",
   
   photo:            "XBMC_Photo",
   photoType:        "XBMC_Photo.ContentType",
   photoContent:     "XBMC_Photo.ContentList",
   photoFilter:      "XBMC_Photo.Filter",
   photoBack:        "XBMC_Photo.Back",   
   photoPlay:        "XBMC_Photo.Play",
   photoNext:        "XBMC_Photo.Next",
   photoPrev:        "XBMC_Photo.Prev",
   photoZoom:        "XBMC_Photo.Zoom",
   photoRandom:      "XBMC_Photo.Random",
   photoPlus:        "XBMC_Photo.Plus",
   photoMinus:       "XBMC_Photo.Minus",
   photoTrack:       "XBMC_Photo.Track",
   photoCover:       "XBMC_Photo.Cover",
   
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
   remoteStream:     "XBMC_Remote.AudioStream",
   remoteSubtitle:   "XBMC_Remote.Subtitle",
   
   video:            "XBMC_Video",
   videoType:        "XBMC_Video.ContentType",
   videoContent:     "XBMC_Video.ContentList",
   videoFilter:      "XBMC_Video.Filter",
   videoBack:        "XBMC_Video.Back",   
   videoPlay:        "XBMC_Video.Play",
   videoPause:       "XBMC_Video.Play",
   videoStop:        "XBMC_Video.Stop",
   videoNext:        "XBMC_Video.Next",
   videoPrev:        "XBMC_Video.Prev",
   videoFast:        "XBMC_Video.Fast",
   videoSlow:        "XBMC_Video.Slow",
   videoTrack:       "XBMC_Video.Track",
   videoCover:       "XBMC_Video.Cover",
   videoVolume:      "XBMC_Video.Volume",
   videoPlus:        "XBMC_Video.Plus",
   videoMinus:       "XBMC_Video.Minus",
   videoMute:        "XBMC_Video.Mute",
   videoTimeLeft:    "XBMC_Video.TimeLeft",
   videoTimePast:    "XBMC_Video.TimePast",
   videoTimeLine:    "XBMC_Video.TimeLine",
   videoStream:      "XBMC_Video.AudioStream",
   videoSubtitle:    "XBMC_Video.Subtitle",
   videoDirector:    "XBMC_Video.Director",
   videohideSearch:  "XBMC_Video.SearchingHide",
   videoclearSearch: "XBMC_Video.Clear 1",
   
   videoSelect:      "XBMC_VideoSelect",
   videoSelectTitle: "XBMC_VideoSelect.Title",   
   videoSelectGenre: "XBMC_VideoSelect.Genre",   
   videoSelectFolder: "XBMC_VideoSelect.Folder",   
   
   tvshows:            "XBMC_TVShows",
   tvshowsType:        "XBMC_TVShows.ContentType",
   tvshowsContent:     "XBMC_TVShows.ContentList",
   tvshowsFilter:      "XBMC_TVShows.Filter",
   tvshowsBack:        "XBMC_TVShows.Back",   
   tvshowsPlay:        "XBMC_TVShows.Play",
   tvshowsPause:       "XBMC_TVShows.Pause",
   tvshowsStop:        "XBMC_TVShows.Stop",
   tvshowsNext:        "XBMC_TVShows.Next",
   tvshowsPrev:        "XBMC_TVShows.Prev",
   tvshowsFast:        "XBMC_TVShows.Fast",
   tvshowsSlow:        "XBMC_TVShows.Slow",
   tvshowsTrack:       "XBMC_TVShows.Track",
   tvshowsCover:       "XBMC_TVShows.Cover",
   tvshowsPercent:     "XBMC_TVShows.Percent",
   tvshowsVolume:      "XBMC_TVShows.Volume",
   tvshowsPlus:        "XBMC_TVShows.Plus",
   tvshowsMinus:       "XBMC_TVShows.Minus",
   tvshowsMute:        "XBMC_TVShows.Mute",
   tvshowsTimeLeft:    "XBMC_TVShows.TimeLeft",
   tvshowsTimePast:    "XBMC_TVShows.TimePast",
   tvshowsTimeLine:    "XBMC_TVShows.TimeLine",
   tvshowsStream:      "XBMC_TVShows.AudioStream",
   tvshowsSubtitle:    "XBMC_TVShows.Subtitle",
   tvshowsDirector:    "XBMC_TVShows.Director",
   tvshowshideSearch:  "XBMC_TVShows.SearchingHide",
   tvshowsclearSearch: "XBMC_TVShows.Clear 1",
      
   tvshowsSelect:      "XBMC_TVShowsSelect",
   tvshowsSelectTitle: "XBMC_TVShowsSelect.Title",   
   tvshowsSelectEpisode: "XBMC_TVShowsSelect.Episode",   
   tvshowsSelectGenre: "XBMC_TVShowsSelect.Genre",   
   tvshowsSelectFolder: "XBMC_TVShowsSelect.Folder",

   movieInfo:           "XBMC_MovieInfo",
   movieInfoTitle:      "XBMC_MovieInfo.Name",
   movieInfoDirector:   "XBMC_MovieInfo.Director",
   movieInfoWriter:     "XBMC_MovieInfo.Writer",
   movieInfoStudio:     "XBMC_MovieInfo.Studio",
   movieInfoGenre:      "XBMC_MovieInfo.Genre",
   movieInfoRuntime:    "XBMC_MovieInfo.Runtime",
   movieInfoYear:       "XBMC_MovieInfo.Year",
   movieInfoTagline:    "XBMC_MovieInfo.Tagline",
   movieInfoRating:     "XBMC_MovieInfo.Rating",
   movieInfoCover:      "XBMC_MovieInfo.Cover",
   movieInfoDesc:       "XBMC_MovieInfo.Description",
   movieInfoReplace:       "XBMC_MovieInfo.Replace",
   
   iconMap:          "XBMC_Audio.icon_map",
   
   search:           "XBMC_ABCSearch",
   
   contentCol1:      0x0080FFFF,
   contentCol0:      0x1D2128FF,
   playlistCol1:     0x0080FFFF,
   playlistCol0:     0x1D2128FF    
};

//---------------------------------------------------------
// Действия при старте
//---------------------------------------------------------
IR.AddListener(IR.EVENT_START, 0, function()
{
   // Инициализация меню серверов //////////////////////////////////////////////////////
	page = IR.GetPage("XBMC_Main");
   serverName = GetItem(gui.serverName);
   
   IR.SetVariable("Global.Menu", 1);
   
   // Список серверов
	config.list = GetItem(gui.serverList);
   config.list_2 = GetItem(gui.serverList_2);
   config.select = undefined;
   config.index = 0;
   config.servers = [];
   config.add = false;
   
	IR.AddListener(IR.EVENT_ITEM_SELECT, config.list, function(item, sub)
	{      
      select_servers(item, sub)
	});
   LoadServers();
   
   IR.AddListener(IR.EVENT_ITEM_SELECT, config.list_2, function(item, sub)
	{      
      select_servers(item, sub)
	});
   LoadServers();
   
   function select_servers(item, sub){
         var server = config.servers[item].split(':');
         TestConnect(item, server[1], parseInt(server[2]));
         config.list.CreateItem(item, 6, {Visible: 1});
         config.list.CreateItem(item, 4, {Visible: 0});
         
         config.list_2.CreateItem(item, 6, {Visible: 1});
         config.list_2.CreateItem(item, 4, {Visible: 0});
         // Выбор сервера
         SelectServer(item);
   }

   // Редактирование сервера
   var edit = GetItem(gui.serverEdit);
	IR.AddListener(IR.EVENT_ITEM_RELEASE, edit, function()
   {
      if(config.select != undefined)
      {
         var server = config.servers[config.select].split(':');
         GetItem(gui.settingsName).Text = server[0];
         GetItem(gui.settingsHost).Text = server[1];
         GetItem(gui.settingsPort).Text = server[2];
         
         GetItem(gui.webserverLogin).Text = (server[3] == undefined) ? "xbmc" : server[3];
         GetItem(gui.webserverPwd).Text = (server[4] == undefined) ? "" : server[4];
         GetItem(gui.webserverPort).Text = (server[5] == undefined) ? "8080" : server[5];
         config.add = false;         
      }
   });   
   
   // Добавление сервера
   var add = GetItem(gui.serverAdd);
	IR.AddListener(IR.EVENT_ITEM_RELEASE, add, function()
   {
      //config.select = undefined;
      GetItem(gui.settingsName).Text = "XBMC";
      GetItem(gui.settingsHost).Text = "127.0.0.1";
      GetItem(gui.settingsPort).Text = "9090";
      
      GetItem(gui.webserverLogin).Text = "xbmc";
      GetItem(gui.webserverPwd).Text = "";
      GetItem(gui.webserverPort).Text = "8080";
      config.add = true;
   });   
   
	IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.settingsSave), function()
   {
      //var server = IR.GetVariable("UI.XBMC_ServerSettings.name.Text") + ':' + IR.GetVariable("UI.XBMC_ServerSettings.host.Text") + ':' + IR.GetVariable("UI.XBMC_ServerSettings.port.Text");
      var server = GetItem(gui.settingsName).Text + ':' + GetItem(gui.settingsHost).Text + ':' + GetItem(gui.settingsPort).Text;
      server += ':' + GetItem(gui.webserverLogin).Text + ':' + GetItem(gui.webserverPwd).Text + ':' + GetItem(gui.webserverPort).Text;      
      if(config.add == false)
         config.servers[config.select] = server
      else
         config.servers.push(server);
         
      var index = config.index;
      SaveServers();
      LoadServers();
      SelectServer(index);
      page.HidePopup(gui.hide_popup);
      //IR.HidePopup("ServerSettings");
   });
   
   // Удаление сервера
	IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.settingsDelete), function()
   {
      if(config.select != undefined)
      {
         config.servers.splice(config.select, 1);
         xbmc.Disconnect();
         SaveServers();
         LoadServers();
      }
      page.HidePopup(gui.hide_popup);
   });
   
   // переподключение     
	IR.AddListener(IR.EVENT_ITEM_RELEASE, GetItem(gui.tryagain_btn), function()
   {
      if(config.select != undefined)
         SelectServer(config.select);
      page.HidePopup(gui.hide_popup);
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
      IR.GetItem(gui.main_page).ShowPopup(gui.disconnect_popup);
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
   config.list_2.Clear();
   var value = IR.GetVariable("Global.XbmcMediaServers");
   if(value)
   {
      config.servers = value.split(',');
      for(var i = 0; i < config.servers.length; ++i){
         config.list.CreateItem(i, 1, {Text: config.servers[i].split(':')[0]});
         config.list_2.CreateItem(i, 1, {Text: config.servers[i].split(':')[0]});
      }
   }
}

//---------------------------------------------------------
// Сохранить список серверов
//---------------------------------------------------------
function SaveServers()
{
   var value = config.servers.length ? config.servers[0] : "";
   for(var i = 1; i < config.servers.length; ++i)
       { value += ',' + config.servers[i]; }       
   IR.SetVariable("Global.XbmcMediaServers", value);
}

//---------------------------------------------------------
// Выбрать текущий сервер
//---------------------------------------------------------
function SelectServer(index)
{
   if(index < config.servers.length)
   {
      // получаем сервер из списка
      var server = config.servers[index];
      // меняем параметры подключения и переподключаемся
      xbmc.SetParameters(server);
      xbmc.Connect();
      // меняем тескт статуса подключения
      serverName.Text = "Connecting..";
      // делаем предыдущий сервер неактивным в листе
      config.list.CreateItem(config.index, 0, {FillColor: gui.contentCol0});
      config.list_2.CreateItem(config.index, 0, {FillColor: gui.contentCol0});
      server = server.split(':');
      // запоминаем индекс текущего сервера
      config.index = index;
      config.select = index;
      // запоминаем параеметры сервера      
      config.name = server[0];
      config.host = server[1];
      config.port = server[2];
      
      config.login = server[3];
      config.pwd = server[4];
      config.wport = server[5];
      
      var auth = config.login;
      
      if(auth != '' && config.pwd != '')
         auth += ':' + config.pwd;
         
      if(auth != '')
         auth += '@';
      
      config.http = "http://" + auth + config.host + ":" + config.wport + "/image/";
      // выделяем текущий сервер на листе      
      config.list.CreateItem(index, 0, {FillColor: gui.contentCol1});
      config.list_2.CreateItem(index, 0, {FillColor: gui.contentCol1});    
   }
}

// callback функция проверки онлайна
function CheckOnline()
{
   //debug('CheckOnline ' + this.device);
   //debug(this.device.GetFeedback("Online"));
   var status = (this.device.GetFeedback("Online")) ? 1 : 0;
   config.list.CreateItem(this.index, 4, {Value: status});
   config.list_2.CreateItem(this.index, 4, {Value: status});
    
   this.device.Disconnect();
   // TODO - нужно удалять этот девайс
}

/* 
   проверка онлайна
   на входе :  index - индекс проверяемого сервера
               host - адрес сервер
               port - порт
*/
function TestConnect(index, host, port)
{
   var device = IR.CreateDevice(IR.DEVICE_CUSTOM_TCP, "TestXBMC" + index, host, port);
   device.Connect();
   this.device = device;
   this.index = index;
   
   debug('TestConnect ' + host + ' ' + port);
   IR.AddListener(IR.EVENT_ONLINE, device, function()
	{ 
      //debug('Test online');
      // выставляем отметку что устройство онлайн
      config.list.CreateItem(index, 4, {Value : 1, Visible: 1});  
      config.list.CreateItem(index, 6, {Visible: 0});
      
      config.list_2.CreateItem(index, 4, {Value : 1, Visible: 1});  
      config.list_2.CreateItem(index, 6, {Visible: 0});
	}, this);

	//------------------------------------------------------
	// Событие: соединение потеряно
	//------------------------------------------------------
	IR.AddListener(IR.EVENT_OFFLINE, device, function()
	{ 
      //debug('Test offline');
      // выставляем отметку что устройство оффлайн
      config.list.CreateItem(index, 4, {Value : 0,Visible: 1});  
      config.list.CreateItem(index, 6, {Visible: 0});
      
      
      config.list_2.CreateItem(index, 4, {Value : 0,Visible: 1});  
      config.list_2.CreateItem(index, 6, {Visible: 0});
	}, this);                                            
   
   // на проверку подключения даем 5 секунд   
   IR.SetTimeout(5000, CheckOnline, this);  
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

/*
   Создание строки с датой вида h:mm:ss
   time - в секундах
*/ 
function CreateDataString(time)
{
   var date = new Date();
   date.setTime(time * 1000);                      
   return "" + date.getUTCHours() + ((date.getUTCMinutes() < 10) ? ":0" : ":") + date.getUTCMinutes() + ((date.getUTCSeconds() < 10) ? ":0" : ":") + date.getUTCSeconds();
}

function debug(text)
{
   IR.Log(" === " + text);
}

function printObject(object, intent)
{
   if(intent == undefined) intent = ' ';
   
   if(object == null || typeof object != 'object')
   {
      debug(typeof object);
      return;
   }
      
   for(key in object)
   {
      IR.Log(intent + key + "===" + object[key]);
      if(typeof object[key] == 'object')
          printObject(object[key], intent + intent);
   }         
}

function printXML(object)
{
   IR.Log(object.printXML());
}