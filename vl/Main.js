IR.AddListener(IR.EVENT_START,0,function()
{
   var mc3 = new Crestron("Crestron");		
   var sm = new SM(mc3);
   sm.setRotate(false);
   sm.setCheckInterval(5000);
   sm.addPage("Main");
   //Billiard
   sm.addPopup("PopupBilliardMedia");
   sm.addPopup("PopupBilliardLight");
   sm.addPopup("PopupBilliardLight1");
   sm.addPopup("PopupBilliardLight2");
   sm.addPopup("PopupBilliardScene");
   sm.addPopup("PopupBilliardSet");
   //Wash
   sm.addPopup("PopupWashMedia");
   sm.addPopup("PopupWashLight");
   //Sport
   sm.addPopup("PopupSportMedia");
   sm.addPopup("PopupSportLight");
   sm.addPopup("PopupSportSet");
   //Cinema
   sm.addPopup("PopupCinemaMedia");
   sm.addPopup("PopupCinemaLight");
   sm.addPopup("PopupCinemaSet");
   sm.addPopup("PopupCinemaSet1");
   sm.addPopup("PopupCinemaSet2");
   //Living
   sm.addPopup("PopupLivingMedia");
   sm.addPopup("PopupLivingSet");
   //Son
   sm.addPopup("PopupSonMedia");
   sm.addPopup("PopupSonSet");
   //Bed
   sm.addPopup("PopupBedMedia");
   sm.addPopup("PopupBedSet");
   //Pool
   sm.addPopup("PopupPoolMedia");
   sm.addPopup("PopupPoolLight");
   sm.addPopup("PopupPoolLight1");
   sm.addPopup("PopupPoolLight2");
   sm.addPopup("PopupPoolLight3");
   sm.addPopup("PopupPoolScene");
   sm.addPopup("PopupPoolSet");
   sm.addPopup("PopupPoolLoad");
   //Barbeku
   sm.addPopup("PopupBarbekuMedia");
   sm.addPopup("PopupBarbekuSet");
   //Playground
   sm.addPopup("PopupPlaygroundMedia");
   sm.addPopup("PopupPlaygroundSet");
   //Source
   sm.addPopup("PopupFM");
   sm.addPopup("PopupWWW");
   sm.addPopup("PopupXBMCA1");
   sm.addPopup("PopupXBMCA2");
   sm.addPopup("PopupNTV");
   sm.addPopup("PopupDream");
   sm.addPopup("PopupMibox");
   sm.addPopup("PopupXBMC");
   sm.addPopup("PopupBluRay");
   sm.addPopup("PopupAppleTV");
   sm.addPopup("PopupAppleTVA");
   sm.addPopup("PopupPS");
   sm.addPopup("PopupVinil");
   //Top
   sm.addPopup("PopupMediaButtons");
   sm.addPopup("PopupAsk");
   sm.addPopup("PopupWait");
   sm.addPopup("PopupBusy");
   sm.addPopup("PopupMenu");
   
   //Source FM
   var FMList = IR.GetPopup("PopupFM").GetItem("list");
   FMList.Template = "FMItem";
   FMList.CreateItem(0, 1, {Text: "Дорожное радио"});
   FMList.CreateItem(0, 2, {Image: "doroj_500m.png"});
   FMList.CreateItem(1, 1, {Text: "Retro FM"});
   FMList.CreateItem(1, 2, {Image: "088_00m.png"});
   FMList.CreateItem(2, 1, {Text: "Авторадио"});
   FMList.CreateItem(2, 2, {Image: "088_40m.png"});
   FMList.CreateItem(3, 1, {Text: "Юмор FM"});
   FMList.CreateItem(3, 2, {Image: "088_90m.png"});
   FMList.CreateItem(4, 1, {Text: "Вести FM"});
   FMList.CreateItem(4, 2, {Image: "089_30m.png"});
   FMList.CreateItem(5, 1, {Text: "Радио Зенит"});
   FMList.CreateItem(5, 2, {Image: "089_70m.png"});
   FMList.CreateItem(6, 1, {Text: "Эрмитаж"});
   FMList.CreateItem(6, 2, {Image: "090_10m.png"});
   FMList.CreateItem(7, 1, {Text: "Для двоих"});
   FMList.CreateItem(7, 2, {Image: "090_60m.png"});
   FMList.CreateItem(8, 1, {Text: "Кекс FM"});
   FMList.CreateItem(8, 2, {Image: "091_10m.png"});
   FMList.CreateItem(9, 1, {Text: "Эхо Москвы"});
   FMList.CreateItem(9, 2, {Image: "091_50m.png"});
   FMList.CreateItem(10, 1, {Text: "NRJ"});
   FMList.CreateItem(10, 2, {Image: "095_00m.png"});
   FMList.CreateItem(11, 1, {Text: "Нева FM"});
   FMList.CreateItem(11, 2, {Image: "095_90m.png"});
   FMList.CreateItem(12, 1, {Text: "Радио Дача"});
   FMList.CreateItem(12, 2, {Image: "097_00m.png"});
   FMList.CreateItem(13, 1, {Text: "Радио Ваня"});
   FMList.CreateItem(13, 2, {Image: "vanya.png"});
   FMList.CreateItem(14, 1, {Text: "Европа+"});
   FMList.CreateItem(14, 2, {Image: "100_50m.png"});
   FMList.CreateItem(15, 1, {Text: "Питер FM"});
   FMList.CreateItem(15, 2, {Image: "100_90m.png"});
   FMList.CreateItem(16, 1, {Text: "Эльдорадио"});
   FMList.CreateItem(16, 2, {Image: "101_40m.png"});
   FMList.CreateItem(17, 1, {Text: "Радио Рокс"});
   FMList.CreateItem(17, 2, {Image: "102_00m.png"});
   FMList.CreateItem(18, 1, {Text: "Радио Metro"});
   FMList.CreateItem(18, 2, {Image: "102_40m.png"});
   FMList.CreateItem(19, 1, {Text: "Maximum"});
   FMList.CreateItem(19, 2, {Image: "102_80m.png"});
   FMList.CreateItem(20, 1, {Text: "DFM"});
   FMList.CreateItem(20, 2, {Image: "103_40m.png"});
   FMList.CreateItem(21, 1, {Text: "Детское радио"});
   FMList.CreateItem(21, 2, {Image: "103_70m.png"});
   FMList.CreateItem(22, 1, {Text: "НАШЕ Радио"});
   FMList.CreateItem(22, 2, {Image: "104_00m.png"});
   FMList.CreateItem(23, 1, {Text: "Радио Шансон"});
   FMList.CreateItem(23, 2, {Image: "104_40m.png"});
   FMList.CreateItem(24, 1, {Text: "Радио Балтика"});
   FMList.CreateItem(24, 2, {Image: "104_80m.png"});
   FMList.CreateItem(25, 1, {Text: "Love Радио"});
   FMList.CreateItem(25, 2, {Image: "105_30m.png"});
   FMList.CreateItem(26, 1, {Text: "Monte Carlo"});
   FMList.CreateItem(26, 2, {Image: "105_90m.png"});
   FMList.CreateItem(27, 1, {Text: "Радио Рекорд"});
   FMList.CreateItem(27, 2, {Image: "106_30m.png"});
   FMList.CreateItem(28, 1, {Text: "Радио Маяк"});
   FMList.CreateItem(28, 2, {Image: "107_00m.png"});
   FMList.CreateItem(29, 1, {Text: "Бизнес-FM"});
   FMList.CreateItem(29, 2, {Image: "107_40m.png"});
   FMList.CreateItem(30, 1, {Text: "Русское радио"});
   FMList.CreateItem(30, 2, {Image: "107_80m.png"});
   IR.AddListener(IR.EVENT_ITEM_SELECT, FMList, function(item, subItem) {
      mc3.pulse("Source_FM_Item"+(item+1));
   });
   new CrestronString2(mc3.device, "Source_FM_Station$", "PopupFM", "name");
   
   //Source Kodi
   var kodiA1gui = {
      mainPlay: IR.GetPopup("PopupXBMCA1").GetItem("Play"), 
      mainStop: IR.GetPopup("PopupXBMCA1").GetItem("Stop"), 
      mainPrev: IR.GetPopup("PopupXBMCA1").GetItem("Prev"),
      mainNext: IR.GetPopup("PopupXBMCA1").GetItem("Next"),
      mainTimeLine: IR.GetPopup("PopupXBMCA1").GetItem("TimeLine"),
      mainTimeLeft: IR.GetPopup("PopupXBMCA1").GetItem("TimeLeft"),
      mainRepeat: IR.GetPopup("PopupXBMCA1").GetItem("Repeat"),
      mainShuffle: IR.GetPopup("PopupXBMCA1").GetItem("Shuffle"),
      mainArtist: IR.GetPopup("PopupXBMCA1").GetItem("Artist"),
      mainTitle: IR.GetPopup("PopupXBMCA1").GetItem("Title"),
      mainCover: IR.GetPopup("PopupXBMCA1").GetItem("Cover"),
      browseList: IR.GetPopup("PopupXBMCA1").GetItem("list"),
      browseListTemplate: "XBMCA1BrowseItem",
      browseBack: IR.GetPopup("PopupXBMCA1").GetItem("Back"),
      browseGenres: IR.GetPopup("PopupXBMCA1").GetItem("Genres"),
      browseArtists: IR.GetPopup("PopupXBMCA1").GetItem("Artists"),
      browseAlbums: IR.GetPopup("PopupXBMCA1").GetItem("Albums"),
      browseSongs: IR.GetPopup("PopupXBMCA1").GetItem("Songs"),
      browseAdd: IR.GetPopup("PopupXBMCA1").GetItem("Add"),
      browseReplace: IR.GetPopup("PopupXBMCA1").GetItem("Replace"),
      playlistList: IR.GetPopup("PopupXBMCA1").GetItem("playlist"),
      playlistListTemplate: "XBMCA1PlaylistItem",
      playlistShuffle: IR.GetPopup("PopupXBMCA1").GetItem("Shuffle2"),
      playlistRepeat: IR.GetPopup("PopupXBMCA1").GetItem("Repeat2"),
      playlistClear: IR.GetPopup("PopupXBMCA1").GetItem("Clear"),
      playlistRefresh: IR.GetPopup("PopupXBMCA1").GetItem("Refresh"),
      ABCLList: IR.GetPopup("PopupXBMCA1").GetItem("abcllist"),
      ABCLListTemplate: "XBMCA1ABCLItem",
      nav_main: IR.GetPopup("PopupXBMCA1").GetItem("nav_main"),
      nav_browse: IR.GetPopup("PopupXBMCA1").GetItem("nav_browse"),
      nav_playlist: IR.GetPopup("PopupXBMCA1").GetItem("nav_playlist")
   }
   
   var kodiA2gui = {
      mainPlay: IR.GetPopup("PopupXBMCA2").GetItem("Play"), 
      mainStop: IR.GetPopup("PopupXBMCA2").GetItem("Stop"), 
      mainPrev: IR.GetPopup("PopupXBMCA2").GetItem("Prev"),
      mainNext: IR.GetPopup("PopupXBMCA2").GetItem("Next"),
      mainTimeLine: IR.GetPopup("PopupXBMCA2").GetItem("TimeLine"),
      mainTimeLeft: IR.GetPopup("PopupXBMCA2").GetItem("TimeLeft"),
      mainRepeat: IR.GetPopup("PopupXBMCA2").GetItem("Repeat"),
      mainShuffle: IR.GetPopup("PopupXBMCA2").GetItem("Shuffle"),
      mainArtist: IR.GetPopup("PopupXBMCA2").GetItem("Artist"),
      mainTitle: IR.GetPopup("PopupXBMCA2").GetItem("Title"),
      mainCover: IR.GetPopup("PopupXBMCA2").GetItem("Cover"),
      browseList: IR.GetPopup("PopupXBMCA2").GetItem("list"),
      browseListTemplate: "XBMCA2BrowseItem",
      browseBack: IR.GetPopup("PopupXBMCA2").GetItem("Back"),
      browseGenres: IR.GetPopup("PopupXBMCA2").GetItem("Genres"),
      browseArtists: IR.GetPopup("PopupXBMCA2").GetItem("Artists"),
      browseAlbums: IR.GetPopup("PopupXBMCA2").GetItem("Albums"),
      browseSongs: IR.GetPopup("PopupXBMCA2").GetItem("Songs"),
      browseAdd: IR.GetPopup("PopupXBMCA2").GetItem("Add"),
      browseReplace: IR.GetPopup("PopupXBMCA2").GetItem("Replace"),
      playlistList: IR.GetPopup("PopupXBMCA2").GetItem("playlist"),
      playlistListTemplate: "XBMCA2PlaylistItem",
      playlistShuffle: IR.GetPopup("PopupXBMCA2").GetItem("Shuffle2"),
      playlistRepeat: IR.GetPopup("PopupXBMCA2").GetItem("Repeat2"),
      playlistClear: IR.GetPopup("PopupXBMCA2").GetItem("Clear"),
      playlistRefresh: IR.GetPopup("PopupXBMCA2").GetItem("Refresh"),
      ABCLList: IR.GetPopup("PopupXBMCA2").GetItem("abcllist"),
      ABCLListTemplate: "XBMCA2ABCLItem",
      nav_main: IR.GetPopup("PopupXBMCA2").GetItem("nav_main"),
      nav_browse: IR.GetPopup("PopupXBMCA2").GetItem("nav_browse"),
      nav_playlist: IR.GetPopup("PopupXBMCA2").GetItem("nav_playlist")
   }
   
   var kodiA1Driver = new KODI();
   kodiA1Driver.SetParameters("kodi:192.168.10.30:9090");
   var kodiA1Module = new KODI_MODULE(kodiA1Driver, mc3, kodiA1gui, 1);
   IR.AddListener(IR.EVENT_ITEM_SHOW, IR.GetItem("PopupXBMCA1"), function() {
      kodiA1Driver.Connect();
   });
   IR.AddListener(IR.EVENT_ITEM_HIDE, IR.GetItem("PopupXBMCA1"), function() {
      kodiA1Driver.Disconnect();
   });
   
   var kodiA2Driver = new KODI();
   kodiA2Driver.SetParameters("kodi:192.168.10.31:9090");
   var kodiA2Module = new KODI_MODULE(kodiA2Driver, mc3, kodiA2gui, 2);
   IR.AddListener(IR.EVENT_ITEM_SHOW, IR.GetItem("PopupXBMCA2"), function() {
      kodiA2Driver.Connect();
   });
   IR.AddListener(IR.EVENT_ITEM_HIDE, IR.GetItem("PopupXBMCA2"), function() {
      kodiA2Driver.Disconnect();
   });
   
   //Source NTV
   var NTV_MoveControl = new MoveControl("PopupNTV", "joy", mc3, 100, 120);
   NTV_MoveControl.setCMD("Source_NTV_Up", "Source_NTV_Down", "Source_NTV_Left", "Source_NTV_Right", "Source_NTV_OK");
   NTV_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   
   //Source Dream
   new CrestronString(mc3.device, "Source_Dream_ch$", "PopupDream", "channel");
   new CrestronString(mc3.device, "Source_Dream_cat$", "PopupDream", "category");
   
   //Source XBMC
   var XBMC_MoveControl = new MoveControl("PopupXBMC", "joy", mc3, 100, 120);
   XBMC_MoveControl.setCMD("Source_XBMC_Up", "Source_XBMC_Down", "Source_XBMC_Left", "Source_XBMC_Right", "Source_XBMC_OK");
   XBMC_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   
   //Source BluRay
   var BluRay_MoveControl = new MoveControl("PopupBluRay", "joy", mc3, 100, 120);
   BluRay_MoveControl.setCMD("Source_BluRay_Up", "Source_BluRay_Down", "Source_BluRay_Left", "Source_BluRay_Right", "Source_BluRay_OK");
   BluRay_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   
   //Source AppleTV
   var AppleTV_MoveControl = new MoveControl("PopupAppleTV", "joy", mc3, 100, 120);
   AppleTV_MoveControl.setCMD("Source_AppleTV_Up", "Source_AppleTV_Down", "Source_AppleTV_Left", "Source_AppleTV_Right", "Source_AppleTV_OK");
   AppleTV_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   
});