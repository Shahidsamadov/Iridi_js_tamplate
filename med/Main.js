var mc3;
var sm;
var askModule;

IR.AddListener(IR.EVENT_START,0,function()
{
   var that = this;
   mc3 = new Crestron("Crestron");
   sm = new ScreenManager();
   this.mc3 = mc3;
   this.sm = sm;
   //define pages and popups
   var pageMain = new Page("Main");                 
   var popupWaitConnection = new Popup("WaitConnection")
   var popupVolume = new Popup("Volume");
   var popupWait = new Popup("Wait");
   var popupBusy = new Popup("Busy");
   var popupLocalWait = new Popup("LocalWait");
   var popupFlat = new Popup("Flat");
   var popupRelaxMediaChoose = new Popup("RelaxMediaChoose");
   var popupHamamMediaChoose = new Popup("HamamMediaChoose");
   var popupSaunaMediaChoose = new Popup("SaunaMediaChoose");
   var popupBasseynMediaChoose = new Popup("BasseynMediaChoose");
   var popupKuhnyaMediaChoose = new Popup("KuhnyaMediaChoose");
   var popupTerrasaMediaChoose = new Popup("TerrasaMediaChoose");
   var popupCinemaMediaChoose = new Popup("CinemaMediaChoose");
   var popupRelaxMediaSettings = new Popup("RelaxMediaSettings");
   var popupHamamMediaSettings = new Popup("HamamMediaSettings");
   var popupSaunaMediaSettings = new Popup("SaunaMediaSettings");
   var popupBasseynMediaSettings = new Popup("BasseynMediaSettings");
   var popupKuhnyaMediaSettings = new Popup("KuhnyaMediaSettings");
   var popupTerrasaMediaSettings = new Popup("TerrasaMediaSettings");
   var popupCinemaMediaSettings = new Popup("CinemaMediaSettings");
   var popupRoomListMedia = new Popup("RoomListMedia");
   var popupCamera1 = new Popup("camera1");
   var popupCamera2 = new Popup("camera2");
   var popupCamera3 = new Popup("camera3");                        
   var popupCamera4 = new Popup("camera4");
   var popupCamera5 = new Popup("camera5");
   var popupCamera6 = new Popup("camera6");
   var popupFM = new Popup("FM");
   var popupFMAskBack = new Popup("FMAskBack");
   var popupFMAsk1 = new Popup("FMAsk1");
   var popupFMAsk2 = new Popup("FMAsk2");
   var popupFMAsk3 = new Popup("FMAsk3");
   var popupFMAsk4 = new Popup("FMAsk4");
   var popupFMAsk5 = new Popup("FMAsk5");
   var popupFMAsk6 = new Popup("FMAsk6"); 
   var popupNetRadio = new Popup("NetRadio");
   var popupAirPort = new Popup("AirPort");
   var popupHumax = new Popup("Humax");
   var popupXBMC = new Popup("XBMC");
   var popupAppleTV = new Popup("AppleTV");
   var popupBluRay = new Popup("BluRay");
   var popupKaraoke = new Popup("Karaoke");
   var popupParty = new Popup("Party");
   var popupRoomListMedia = new Popup("RoomListMedia");
   var popupAsk = new Popup("Ask");
   var popupInfo = new Popup("Info");
   var popupRebootModem = new Popup("RebootModem");
   
   //UI
   sm.addPage(pageMain);
   sm.addPopup(popupFlat);
   //MediaChoose
   sm.addPopup(popupRelaxMediaChoose);
   sm.addPopup(popupHamamMediaChoose);
   sm.addPopup(popupSaunaMediaChoose);
   sm.addPopup(popupBasseynMediaChoose);
   sm.addPopup(popupKuhnyaMediaChoose);
   sm.addPopup(popupTerrasaMediaChoose);
   sm.addPopup(popupCinemaMediaChoose);
   //MediaSettings
   sm.addPopup(popupRelaxMediaSettings);
   sm.addPopup(popupHamamMediaSettings);
   sm.addPopup(popupSaunaMediaSettings);
   sm.addPopup(popupBasseynMediaSettings);
   sm.addPopup(popupKuhnyaMediaSettings);
   sm.addPopup(popupTerrasaMediaSettings);
   sm.addPopup(popupCinemaMediaSettings);
   //DEVICE
   sm.addPopup(popupFM);
   sm.addPopup(popupFMAskBack);
   sm.addPopup(popupFMAsk1);
   sm.addPopup(popupFMAsk2);
   sm.addPopup(popupFMAsk3);
   sm.addPopup(popupFMAsk4);
   sm.addPopup(popupFMAsk5);
   sm.addPopup(popupFMAsk6);
   sm.addPopup(popupNetRadio);
   sm.addPopup(popupAirPort);
   sm.addPopup(popupHumax);
   sm.addPopup(popupXBMC);
   sm.addPopup(popupAppleTV);
   sm.addPopup(popupBluRay);
   sm.addPopup(popupKaraoke);
   //Reboot Modem
   sm.addPopup(popupRebootModem);
   //Party
   sm.addPopup(popupParty);
   //Camera
   sm.addPopup(popupCamera1);
   sm.addPopup(popupCamera2);
   sm.addPopup(popupCamera3);
   sm.addPopup(popupCamera4);
   sm.addPopup(popupCamera5);
   sm.addPopup(popupCamera6);
   //RoomList
   sm.addPopup(popupRoomListMedia);
   //KIOSK
   sm.addPopup(popupAsk);
   sm.addPopup(popupInfo);
   sm.addPopup(popupVolume);
   sm.addPopup(popupLocalWait);
   sm.addPopup(popupWait);
   sm.addPopup(popupBusy);
   sm.addPopup(popupWaitConnection);
   //sm open first
   sm.openPage(pageMain);
   sm.openPopup(popupFlat);
   
   //START
   askModule = new AskModule(mc3, sm);
   askModule.setItems(popupAsk, "Question", "Answer1", "Answer2");
   
   infoModule = new InfoModule(mc3, sm);
   infoModule.setItems(popupInfo, "Information", "btnOK");
   
   var busy = new BusyModule(mc3.device, sm);
   busy.setBusyPopupSignal("[Busy]Popup_Busy_IsOn");
   busy.setBusyPopup(popupBusy);
   busy.finishSet();
   
   var volumeDisplay = new VolumeDisplayModule(mc3, sm);
   volumeDisplay.setItems(popupVolume, "sliderVolume", "txtVolume");
   volumeDisplay.addRoom("relax", "[Relax]Volume_Lvl", "[Relax]Volume_Up", "[Relax]Volume_Down", "[Relax]Mute_Toggle");
   volumeDisplay.addRoom("hamam", "[Hamam]Volume_Lvl", "[Hamam]Volume_Up", "[Hamam]Volume_Down", "[Hamam]Mute_Toggle");
   volumeDisplay.addRoom("sauna", "[Sauna]Volume_Lvl", "[Sauna]Volume_Up", "[Sauna]Volume_Down", "[Sauna]Mute_Toggle");
   volumeDisplay.addRoom("basseyn", "[Basseyn]Volume_Lvl", "[Basseyn]Volume_Up", "[Basseyn]Volume_Down", "[Basseyn]Mute_Toggle");
   volumeDisplay.addRoom("kuhnya", "[Kuhnya]Volume_Lvl", "[Kuhnya]Volume_Up", "[Kuhnya]Volume_Down", "[Kuhnya]Mute_Toggle");
   volumeDisplay.addRoom("terrasa", "[Terrasa]Volume_Lvl", "[Terrasa]Volume_Up", "[Terrasa]Volume_Down", "[Terrasa]Mute_Toggle");
   volumeDisplay.addRoom("cinema", "[Cinema]Volume_Lvl", "[Cinema]Volume_Up", "[Cinema]Volume_Down", "[Cinema]Mute_Toggle");
   volumeDisplay.finishSet();
   
   var rightBar = new RightBarModule(mc3, sm);
   rightBar.setItems(pageMain, "btnVolumeUp", "btnVolumeDown", "btnVolumeMute", "btnRoomMedia", "btnPower", "btnSettings", popupFlat, "port_main_back", "roomName", "mute_state");
   //Relax
   rightBar.addPopup([popupRelaxMediaChoose],
   function() {volumeDisplay.displayRoom("relax");volumeDisplay.show();volumeDisplay.volumeUpPress();}, 
   function() {volumeDisplay.displayRoom("relax");volumeDisplay.hide();volumeDisplay.volumeUpRelease();}, 
   function() {volumeDisplay.displayRoom("relax");volumeDisplay.show();volumeDisplay.volumeDownPress();}, 
   function() {volumeDisplay.displayRoom("relax");volumeDisplay.hide();volumeDisplay.volumeDownRelease();}, 
   function() {volumeDisplay.displayRoom("relax");volumeDisplay.show();volumeDisplay.volumeMutePress();}, 
   function() {volumeDisplay.displayRoom("relax");volumeDisplay.hide();volumeDisplay.volumeMuteRelease();}, 
   function() {}, 
   function() {mc3.pulse("[Relax]Active_Source");}, 
   function() {}, 
   function() {askModule.setState("Выключить мультимедиа в комнате отдыха?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Relax][No]Choose");}, function() {askModule.hide();});
   askModule.show();}, 
   function() {}, 
   function() {sm.closeAllPopups();popupRelaxMediaSettings.backPopup=popupRelaxMediaChoose;sm.openPopup(popupRelaxMediaSettings);}, 
   true, true, true, true, true, true, "[Relax]InUse", "r1select", popupFlat, "Комната отдыха", "[Relax]Mute_IsOn");
   //Hamam
   rightBar.addPopup([popupHamamMediaChoose],
   function() {volumeDisplay.displayRoom("hamam");volumeDisplay.show();volumeDisplay.volumeUpPress();}, 
   function() {volumeDisplay.displayRoom("hamam");volumeDisplay.hide();volumeDisplay.volumeUpRelease();}, 
   function() {volumeDisplay.displayRoom("hamam");volumeDisplay.show();volumeDisplay.volumeDownPress();}, 
   function() {volumeDisplay.displayRoom("hamam");volumeDisplay.hide();volumeDisplay.volumeDownRelease();}, 
   function() {volumeDisplay.displayRoom("hamam");volumeDisplay.show();volumeDisplay.volumeMutePress();}, 
   function() {volumeDisplay.displayRoom("hamam");volumeDisplay.hide();volumeDisplay.volumeMuteRelease();}, 
   function() {}, 
   function() {mc3.pulse("[Hamam]Active_Source");}, 
   function() {}, 
   function() {askModule.setState("Выключить мультимедиа в хамаме?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Hamam][No]Choose");}, function() {askModule.hide();});
   askModule.show();}, 
   function() {}, 
   function() {sm.closeAllPopups();popupHamamMediaSettings.backPopup=popupHamamMediaChoose;sm.openPopup(popupHamamMediaSettings);}, 
   true, true, true, true, true, true, "[Hamam]InUse", "r2select", popupFlat, "Хамам", "[Hamam]Mute_IsOn");
   //Sauna
   rightBar.addPopup([popupSaunaMediaChoose],
   function() {volumeDisplay.displayRoom("sauna");volumeDisplay.show();volumeDisplay.volumeUpPress();}, 
   function() {volumeDisplay.displayRoom("sauna");volumeDisplay.hide();volumeDisplay.volumeUpRelease();}, 
   function() {volumeDisplay.displayRoom("sauna");volumeDisplay.show();volumeDisplay.volumeDownPress();}, 
   function() {volumeDisplay.displayRoom("sauna");volumeDisplay.hide();volumeDisplay.volumeDownRelease();}, 
   function() {volumeDisplay.displayRoom("sauna");volumeDisplay.show();volumeDisplay.volumeMutePress();}, 
   function() {volumeDisplay.displayRoom("sauna");volumeDisplay.hide();volumeDisplay.volumeMuteRelease();}, 
   function() {}, 
   function() {mc3.pulse("[Sauna]Active_Source");}, 
   function() {}, 
   function() {askModule.setState("Выключить мультимедиа в сауне?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Sauna][No]Choose");}, function() {askModule.hide();});
   askModule.show();}, 
   function() {}, 
   function() {sm.closeAllPopups();popupSaunaMediaSettings.backPopup=popupSaunaMediaChoose;sm.openPopup(popupSaunaMediaSettings);}, 
   true, true, true, true, true, true, "[Sauna]InUse", "r3select", popupFlat, "Сауна", "[Sauna]Mute_IsOn");
   //Basseyn
   rightBar.addPopup([popupBasseynMediaChoose],
   function() {volumeDisplay.displayRoom("basseyn");volumeDisplay.show();volumeDisplay.volumeUpPress();}, 
   function() {volumeDisplay.displayRoom("basseyn");volumeDisplay.hide();volumeDisplay.volumeUpRelease();}, 
   function() {volumeDisplay.displayRoom("basseyn");volumeDisplay.show();volumeDisplay.volumeDownPress();}, 
   function() {volumeDisplay.displayRoom("basseyn");volumeDisplay.hide();volumeDisplay.volumeDownRelease();}, 
   function() {volumeDisplay.displayRoom("basseyn");volumeDisplay.show();volumeDisplay.volumeMutePress();}, 
   function() {volumeDisplay.displayRoom("basseyn");volumeDisplay.hide();volumeDisplay.volumeMuteRelease();}, 
   function() {}, 
   function() {mc3.pulse("[Basseyn]Active_Source");}, 
   function() {}, 
   function() {askModule.setState("Выключить мультимедиа в бассейне?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Basseyn][No]Choose");}, function() {askModule.hide();});
   askModule.show();}, 
   function() {}, 
   function() {sm.closeAllPopups();popupBasseynMediaSettings.backPopup=popupBasseynMediaChoose;sm.openPopup(popupBasseynMediaSettings);}, 
   true, true, true, true, true, true, "[Basseyn]InUse", "r4select", popupFlat, "Бассейн", "[Basseyn]Mute_IsOn");
   //Kuhnya
   rightBar.addPopup([popupKuhnyaMediaChoose],
   function() {volumeDisplay.displayRoom("kuhnya");volumeDisplay.show();volumeDisplay.volumeUpPress();}, 
   function() {volumeDisplay.displayRoom("kuhnya");volumeDisplay.hide();volumeDisplay.volumeUpRelease();}, 
   function() {volumeDisplay.displayRoom("kuhnya");volumeDisplay.show();volumeDisplay.volumeDownPress();}, 
   function() {volumeDisplay.displayRoom("kuhnya");volumeDisplay.hide();volumeDisplay.volumeDownRelease();}, 
   function() {volumeDisplay.displayRoom("kuhnya");volumeDisplay.show();volumeDisplay.volumeMutePress();}, 
   function() {volumeDisplay.displayRoom("kuhnya");volumeDisplay.hide();volumeDisplay.volumeMuteRelease();}, 
   function() {}, 
   function() {mc3.pulse("[Kuhnya]Active_Source");}, 
   function() {}, 
   function() {askModule.setState("Выключить мультимедиа на кухне?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Kuhnya][No]Choose");}, function() {askModule.hide();});
   askModule.show();}, 
   function() {}, 
   function() {sm.closeAllPopups();popupKuhnyaMediaSettings.backPopup=popupKuhnyaMediaChoose;sm.openPopup(popupKuhnyaMediaSettings);}, 
   true, true, true, true, true, true, "[Kuhnya]InUse", "r5select", popupFlat, "Кухня", "[Kuhnya]Mute_IsOn");
   //Terrasa
   rightBar.addPopup([popupTerrasaMediaChoose],
   function() {volumeDisplay.displayRoom("terrasa");volumeDisplay.show();volumeDisplay.volumeUpPress();}, 
   function() {volumeDisplay.displayRoom("terrasa");volumeDisplay.hide();volumeDisplay.volumeUpRelease();}, 
   function() {volumeDisplay.displayRoom("terrasa");volumeDisplay.show();volumeDisplay.volumeDownPress();}, 
   function() {volumeDisplay.displayRoom("terrasa");volumeDisplay.hide();volumeDisplay.volumeDownRelease();}, 
   function() {volumeDisplay.displayRoom("terrasa");volumeDisplay.show();volumeDisplay.volumeMutePress();}, 
   function() {volumeDisplay.displayRoom("terrasa");volumeDisplay.hide();volumeDisplay.volumeMuteRelease();}, 
   function() {}, 
   function() {mc3.pulse("[Terrasa]Active_Source");}, 
   function() {}, 
   function() {askModule.setState("Выключить мультимедиа на террасе?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Terrasa][No]Choose");}, function() {askModule.hide();});
   askModule.show();}, 
   function() {}, 
   function() {sm.closeAllPopups();popupTerrasaMediaSettings.backPopup=popupTerrasaMediaChoose;sm.openPopup(popupTerrasaMediaSettings);}, 
   true, true, true, true, true, true, "[Terrasa]InUse", "r6select", popupFlat, "Терраса", "[Terrasa]Mute_IsOn");
   //Cinema
   rightBar.addPopup([popupCinemaMediaChoose],
   function() {volumeDisplay.displayRoom("cinema");volumeDisplay.show();volumeDisplay.volumeUpPress();}, 
   function() {volumeDisplay.displayRoom("cinema");volumeDisplay.hide();volumeDisplay.volumeUpRelease();}, 
   function() {volumeDisplay.displayRoom("cinema");volumeDisplay.show();volumeDisplay.volumeDownPress();}, 
   function() {volumeDisplay.displayRoom("cinema");volumeDisplay.hide();volumeDisplay.volumeDownRelease();}, 
   function() {volumeDisplay.displayRoom("cinema");volumeDisplay.show();volumeDisplay.volumeMutePress();}, 
   function() {volumeDisplay.displayRoom("cinema");volumeDisplay.hide();volumeDisplay.volumeMuteRelease();}, 
   function() {}, 
   function() {mc3.pulse("[Cinema]Active_Source");}, 
   function() {}, 
   function() {askModule.setState("Выключить мультимедиа в гостиной?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Cinema][No]Choose");}, function() {askModule.hide();});
   askModule.show();}, 
   function() {}, 
   function() {sm.closeAllPopups();popupCinemaMediaSettings.backPopup=popupCinemaMediaChoose;sm.openPopup(popupCinemaMediaSettings);}, 
   true, true, true, true, true, true, "[Cinema]InUse", "r7select", popupFlat, "Гостиная", "[Cinema]Mute_IsOn");
   //PARTY
   rightBar.addPopup([popupParty],
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   function() {}, 
   function() {mc3.pulse("[Party]ActiveSource");}, 
   function() {}, 
   function() {
   askModule.setState("Вы действительно хотите выключить режим \"Party\"?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Party]AllOff")}, function() {askModule.hide();});
   askModule.show();}, 
   function() {}, 
   function() {}, 
   false, false, false, true, true, false, "[Party]IsOn", 0, 0, "Режим \"Party\"", 0);
   rightBar.unselect();
   rightBar.followSMUpdates();
   rightBar.finishSet();
   
   var wait = new WaitModule(mc3, sm);
   wait.setSelectRoomObject(rightBar, ["[Relax]Busy", "[Hamam]Busy", "[Sauna]Busy", "[Basseyn]Busy", "[Kuhnya]Busy", "[Terrasa]Busy", "[Cinema]Busy"]);
   wait.setWaitPopupSignal("[Wait]IsOn");
   wait.setWaitBarSignal(["[Relax]BusyBar","[Hamam]BusyBar","[Sauna]BusyBar","[Basseyn]BusyBar","[Kuhnya]BusyBar","[Terrasa]BusyBar","[Cinema]BusyBar"]);
   wait.setWaitPopup(popupWait);
   wait.setSliderItem("level");
   wait.finishSet();
   
   //party
   var party = new PartyModule(mc3, popupParty);
   party.addLine("[Party][Relax]InUse", "m1", "l1", "p1", "mu1");
   party.addLine("[Party][Hamam]InUse", "m2", "l2", "p2", "mu2");
   party.addLine("[Party][Sauna]InUse", "m3", "l3", "p3", "mu3");
   party.addLine("[Party][Basseyn]InUse", "m4", "l4", "p4", "mu4");
   party.addLine("[Party][Kuhnya]InUse", "m5", "l5", "p5", "mu5");
   party.addLine("[Party][Terrasa]InUse", "m6", "l6", "p6", "mu6");
   party.addLine("[Party][Cinema]InUse", "m7", "l7", "p7", "mu7");
   party.finishSet();
   party.setStartValue();
   
   //device
   var fmAsk = new LocalAskModule(mc3, sm);
   fmAsk.setItems(popupFMAskBack);
   fmAsk.addShowSignal("[FM]Fav1_AskShow", "[FM]Fav1_AskOk", "Заменить", popupFMAsk1, "Answer1");
   fmAsk.addShowSignal("[FM]Fav2_AskShow", "[FM]Fav2_AskOk", "Заменить", popupFMAsk2, "Answer1");
   fmAsk.addShowSignal("[FM]Fav3_AskShow", "[FM]Fav3_AskOk", "Заменить", popupFMAsk3, "Answer1");
   fmAsk.addShowSignal("[FM]Fav4_AskShow", "[FM]Fav4_AskOk", "Заменить", popupFMAsk4, "Answer1");
   fmAsk.addShowSignal("[FM]Fav5_AskShow", "[FM]Fav5_AskOk", "Заменить", popupFMAsk5, "Answer1");
   fmAsk.addShowSignal("[FM]Fav6_AskShow", "[FM]Fav6_AskOk", "Заменить", popupFMAsk6, "Answer1");
   
   var radio = new RadioModule(mc3, sm);
   radio.addStation("Дорожное радио", "87.50 МГц", "doroj_500.png", "doroj_500m.png", "doroj_500mm.png", "[FM]Freq1", "[FM]Freq1_fb");
   radio.addStation("Retro FM", "88.00 МГц", "088_00.png", "088_00m.png", "088_00mm.png", "[FM]Freq2", "[FM]Freq2_fb");
   radio.addStation("Авторадио", "88.40 МГц", "088_40.png", "088_40m.png", "088_40mm.png", "[FM]Freq3", "[FM]Freq3_fb");
   radio.addStation("Юмор ФМ", "88.90 МГц", "088_90.png", "088_90m.png", "088_90mm.png", "[FM]Freq4", "[FM]Freq4_fb");
   radio.addStation("Вести ФМ", "89.30 МГц", "089_30.png", "089_30m.png", "089_30mm.png", "[FM]Freq5", "[FM]Freq5_fb");
   radio.addStation("Радио Зенит", "89.70 МГц", "089_70.png", "089_70m.png", "089_70mm.png", "[FM]Freq6", "[FM]Freq6_fb");
   radio.addStation("Эрмитаж", "90.10 МГц", "090_10.png", "090_10m.png", "090_10mm.png", "[FM]Freq7", "[FM]Freq7_fb");
   radio.addStation("Для двоих", "90.60 МГц", "090_60.png", "090_60m.png", "090_60mm.png", "[FM]Freq8", "[FM]Freq8_fb");
   radio.addStation("Кекс ФМ", "91.10 МГц", "091_10.png", "091_10m.png", "091_10mm.png", "[FM]Freq9", "[FM]Freq9_fb");
   radio.addStation("Эхо Москвы", "91.50 МГц", "091_50.png", "091_50m.png", "091_50mm.png", "[FM]Freq10", "[FM]Freq10_fb");
   radio.addStation("NRJ", "95.00 МГц", "095_00.png", "095_00m.png", "095_00mm.png", "[FM]Freq11", "[FM]Freq11_fb");
   radio.addStation("Нева FM", "95.90 МГц", "095_90.png", "095_90m.png", "095_90mm.png", "[FM]Freq12", "[FM]Freq12_fb");
   radio.addStation("Радио Дача", "97.00 МГц", "097_00.png", "097_00m.png", "097_00mm.png", "[FM]Freq13", "[FM]Freq13_fb");
   radio.addStation("Европа+", "100.50 МГц", "100_50.png", "100_50m.png", "100_50mm.png", "[FM]Freq14", "[FM]Freq14_fb");
   radio.addStation("Питер FM", "100.90 МГц", "100_90.png", "100_90m.png", "100_90mm.png", "[FM]Freq15", "[FM]Freq15_fb");
   radio.addStation("Эльдорадио", "101.40 МГц", "101_40.png", "101_40m.png", "101_40mm.png", "[FM]Freq16", "[FM]Freq16_fb");
   radio.addStation("Радио Рокс", "102.00 МГц", "102_00.png", "102_00m.png", "102_00mm.png", "[FM]Freq17", "[FM]Freq17_fb");
   radio.addStation("Радио Metro", "102.40 МГц", "102_40.png", "102_40m.png", "102_40mm.png", "[FM]Freq18", "[FM]Freq18_fb");
   radio.addStation("Maximum", "102.80 МГц", "102_80.png", "102_80m.png", "102_80mm.png", "[FM]Freq19", "[FM]Freq19_fb");
   radio.addStation("DFM", "103.40 МГц", "103_40.png", "103_40m.png", "103_40mm.png", "[FM]Freq20", "[FM]Freq20_fb");
   radio.addStation("Детское Радио", "103.70 МГц", "103_70.png", "103_70m.png", "103_70mm.png", "[FM]Freq21", "[FM]Freq21_fb");
   radio.addStation("НАШЕ Радио", "104.00 МГц", "104_00.png", "104_00m.png", "104_00mm.png", "[FM]Freq22", "[FM]Freq22_fb");
   radio.addStation("Радио Шансон", "104.40 МГц", "104_40.png", "104_40m.png", "104_40mm.png", "[FM]Freq23", "[FM]Freq23_fb");
   radio.addStation("Радио Балтика", "104.80 МГц", "104_80.png", "104_80m.png", "104_80mm.png", "[FM]Freq24", "[FM]Freq24_fb");
   radio.addStation("Love Радио", "105.30 МГц", "105_30.png", "105_30m.png", "105_30mm.png", "[FM]Freq25", "[FM]Freq25_fb");
   radio.addStation("Monte Carlo", "105.90 МГц", "105_90.png", "105_90m.png", "105_90mm.png", "[FM]Freq26", "[FM]Freq26_fb");
   radio.addStation("Радио Рекорд", "106.30 МГц", "106_30.png", "106_30m.png", "106_30mm.png", "[FM]Freq27", "[FM]Freq27_fb");
   radio.addStation("Радио Маяк", "107.00 МГц", "107_00.png", "107_00m.png", "107_00mm.png", "[FM]Freq28", "[FM]Freq28_fb");
   radio.addStation("Бизнес-FM", "107.40 МГц", "107_40.png", "107_40m.png", "107_40mm.png", "[FM]Freq29", "[FM]Freq29_fb");
   radio.addStation("Русское радио", "107.80 МГц", "107_80.png", "107_80m.png", "107_80mm.png", "[FM]Freq30", "[FM]Freq30_fb");
   radio.setItems(popupFM, popupFlat, "btnBack", "btnClose", "title 1", "listRadio", "RadioItem", "nameRadio", "freqRadio", "imgRadio", "Media_FMNum_fb");
   radio.setFavItems("fav1", "fav2", "fav3", "fav4", "fav5", "fav6");
   radio.setFavSignals("[FM]Loaded1_Pic", "[FM]Loaded2_Pic", "[FM]Loaded3_Pic", "[FM]Loaded4_Pic", "[FM]Loaded5_Pic", "[FM]Loaded6_Pic");
   radio.buildList();
   radio.finishSet();
   
   var netradio = new NetRadioModule(mc3, sm);
   netradio.setItems(popupNetRadio, popupFlat, "btnBack", "btnClose", "listRadio", "NetRadioItem", "labelMenu", "labelTitle", "labelStatus");
   netradio.setSignals("[NetRadio]Line1", "[NetRadio]Line2", "[NetRadio]Line3", "[NetRadio]Line4", "[NetRadio]Line5", "[NetRadio]Line6", "[NetRadio]Line7", "[NetRadio]Line8", "[NetRadio]Line9", "[NetRadio]Line1_txt", "[NetRadio]Line2_txt", "[NetRadio]Line3_txt", "[NetRadio]Line4_txt", "[NetRadio]Line5_txt", "[NetRadio]Line6_txt", "[NetRadio]Line7_txt", "[NetRadio]Line8_txt", "[NetRadio]Line9_txt", "[NetRadio]PageHeader_txt", "[NetRadio]Station_txt", "[NetRadio]Status_txt");
   netradio.buildList();
   netradio.finishSet();
   
   var airport = new SimpleSourceModule(sm);
   airport.setItems(popupAirPort, popupFlat, "btnBack", "btnClose");
   airport.finishSet();
   
   var karaoke = new SimpleSourceModule(sm);
   karaoke.setItems(popupKaraoke, popupFlat, "btnBack", "btnClose");
   karaoke.finishSet();
   
   var humax = new SimpleSourceModule(sm);
   humax.setItems(popupHumax, popupFlat, "btnBack", "btnClose");
   humax.finishSet();
   
   var xbmc = new XBMCModule(mc3, sm);
   xbmc.setItems(popupXBMC, popupFlat, "joystickNavigation", "title 1", "btnBack", "btnClose");
   xbmc.setCmd("[XBMC]Select", "[XBMC]Up", "[XBMC]Down", "[XBMC]Left", "[XBMC]Right");
   xbmc.finishSet();
   
   var appletv = new AppleTVModule(mc3, sm);
   appletv.setItems(popupAppleTV, popupFlat, "joystickNavigation", "btnBack", "btnClose");
   appletv.setCmd("[AppleTV]Select", "[AppleTV]Hold", "[AppleTV]Up", "[AppleTV]Down", "[AppleTV]Left", "[AppleTV]Right");
   appletv.finishSet();
   
   var bluray = new SimpleSourceModule(sm);
   bluray.setItems(popupBluRay, popupFlat, "btnBack", "btnClose");
   bluray.finishSet();
   
   var relaxMediaPageOpen = new MediaPageOpenModule(mc3.device, sm, popupRelaxMediaChoose);
   relaxMediaPageOpen.addPopup(popupFM, "[Relax]Popup_FM_Open");
   relaxMediaPageOpen.addPopup(popupNetRadio, "[Relax]Popup_NetRadio_Open");
   relaxMediaPageOpen.addPopup(popupAirPort, "[Relax]Popup_AirPort_Open");
   relaxMediaPageOpen.addPopup(popupRelaxMediaSettings, "impossible_signal");
   relaxMediaPageOpen.setOffSignal("[Relax]Source_Changed");
   relaxMediaPageOpen.setFinish();
   
   var hamamMediaPageOpen = new MediaPageOpenModule(mc3.device, sm, popupHamamMediaChoose);
   hamamMediaPageOpen.addPopup(popupFM, "[Hamam]Popup_FM_Open");
   hamamMediaPageOpen.addPopup(popupNetRadio, "[Hamam]Popup_NetRadio_Open");
   hamamMediaPageOpen.addPopup(popupAirPort, "[Hamam]Popup_AirPort_Open");
   hamamMediaPageOpen.addPopup(popupHamamMediaSettings, "impossible_signal");
   hamamMediaPageOpen.setOffSignal("[Hamam]Source_Changed");
   hamamMediaPageOpen.setFinish();
   
   var saunaMediaPageOpen = new MediaPageOpenModule(mc3.device, sm, popupSaunaMediaChoose);
   saunaMediaPageOpen.addPopup(popupFM, "[Sauna]Popup_FM_Open");
   saunaMediaPageOpen.addPopup(popupNetRadio, "[Sauna]Popup_NetRadio_Open");
   saunaMediaPageOpen.addPopup(popupAirPort, "[Sauna]Popup_AirPort_Open");
   saunaMediaPageOpen.addPopup(popupSaunaMediaSettings, "impossible_signal");
   saunaMediaPageOpen.setOffSignal("[Sauna]Source_Changed");
   saunaMediaPageOpen.setFinish();
   
   var basseynMediaPageOpen = new MediaPageOpenModule(mc3.device, sm, popupBasseynMediaChoose);
   basseynMediaPageOpen.addPopup(popupFM, "[Basseyn]Popup_FM_Open");
   basseynMediaPageOpen.addPopup(popupNetRadio, "[Basseyn]Popup_NetRadio_Open");
   basseynMediaPageOpen.addPopup(popupAirPort, "[Basseyn]Popup_AirPort_Open");
   basseynMediaPageOpen.addPopup(popupBasseynMediaSettings, "impossible_signal");
   basseynMediaPageOpen.setOffSignal("[Basseyn]Source_Changed");
   basseynMediaPageOpen.setFinish();
   
   var kuhnyaMediaPageOpen = new MediaPageOpenModule(mc3.device, sm, popupKuhnyaMediaChoose);
   kuhnyaMediaPageOpen.addPopup(popupFM, "[Kuhnya]Popup_FM_Open");
   kuhnyaMediaPageOpen.addPopup(popupNetRadio, "[Kuhnya]Popup_NetRadio_Open");
   kuhnyaMediaPageOpen.addPopup(popupAirPort, "[Kuhnya]Popup_AirPort_Open");
   kuhnyaMediaPageOpen.addPopup(popupKuhnyaMediaSettings, "impossible_signal");
   kuhnyaMediaPageOpen.setOffSignal("[Kuhnya]Source_Changed");
   kuhnyaMediaPageOpen.setFinish();
   
   var terrasaMediaPageOpen = new MediaPageOpenModule(mc3.device, sm, popupTerrasaMediaChoose);
   terrasaMediaPageOpen.addPopup(popupFM, "[Terrasa]Popup_FM_Open");
   terrasaMediaPageOpen.addPopup(popupNetRadio, "[Terrasa]Popup_NetRadio_Open");
   terrasaMediaPageOpen.addPopup(popupAirPort, "[Terrasa]Popup_AirPort_Open");
   terrasaMediaPageOpen.addPopup(popupTerrasaMediaSettings, "impossible_signal");
   terrasaMediaPageOpen.setOffSignal("[Terrasa]Source_Changed");
   terrasaMediaPageOpen.setFinish();
   
   var cinemaMediaPageOpen = new MediaPageOpenModule(mc3.device, sm, popupCinemaMediaChoose);
   cinemaMediaPageOpen.addPopup(popupFM, "[Cinema]Popup_FM_Open");
   cinemaMediaPageOpen.addPopup(popupNetRadio, "[Cinema]Popup_NetRadio_Open");
   cinemaMediaPageOpen.addPopup(popupAirPort, "[Cinema]Popup_AirPort_Open");
   cinemaMediaPageOpen.addPopup(popupHumax, "[Cinema]Popup_Humax_Open");
   cinemaMediaPageOpen.addPopup(popupXBMC, "[Cinema]Popup_XBMC_Open");
   cinemaMediaPageOpen.addPopup(popupAppleTV, "[Cinema]Popup_AppleTV_Open");
   cinemaMediaPageOpen.addPopup(popupBluRay, "[Cinema]Popup_BluRay_Open");
   cinemaMediaPageOpen.addPopup(popupKaraoke, "[Cinema]Popup_Karaoke_Open");
   cinemaMediaPageOpen.addPopup(popupCinemaMediaSettings, "impossible_signal");
   cinemaMediaPageOpen.setOffSignal("[Cinema]Source_Changed");
   cinemaMediaPageOpen.setFinish();
   
   var partyMediaPageOpen = new MediaPageOpenModule(mc3.device, sm, popupParty);
   partyMediaPageOpen.addPopup(popupAirPort, "[Party]Popup_AirPort_Open");
   partyMediaPageOpen.addPopup(popupNetRadio, "[Party]Popup_NetRadio_Open");
   partyMediaPageOpen.addPopup(popupFM, "[Party]Popup_FM_Open");
   partyMediaPageOpen.setOffSignal("[Party]AllOff");
   partyMediaPageOpen.setFinish(); 
     
   new WaitConnection(mc3.device, mc3.getConnectionStatus(), sm, popupWaitConnection, popupFlat);
   
   
   
   
   
   
   /*************UNDER CONSTRUCTION****************/
   
   
  
   
   
   /*************UNDER CONSTRUCTION****************/
   /*************UNDER CONSTRUCTION****************/
   /*************UNDER CONSTRUCTION****************/
      
   //roomlist
   var mediaRoomList = new RoomListModule(mc3, sm);
   mediaRoomList.setImages("media_on.png", "media_off.png");
   mediaRoomList.setItems(popupRoomListMedia, "list", "[All]Busy");
   mediaRoomList.addRoom("Комната отдыха", popupRelaxMediaChoose, "[Relax]InUse", "[Relax][No]Choose", "Выключить мультимедиа в помещении \"Комната отдыха\"?", "RoomListItemBtn", false);
   mediaRoomList.addRoom("Хамам", popupHamamMediaChoose, "[Hamam]InUse", "[Hamam][No]Choose", "Выключить мультимедиа в помещении \"Хамам\"?", "RoomListItemBtn", false);
   mediaRoomList.addRoom("Сауна", popupSaunaMediaChoose, "[Sauna]InUse", "[Sauna][No]Choose", "Выключить мультимедиа в помещении \"Сауна\"?", "RoomListItemBtn", false);
   mediaRoomList.addRoom("Бассейн", popupBasseynMediaChoose, "[Basseyn]InUse", "[Basseyn][No]Choose", "Выключить мультимедиа в помещении \"Бассейн\"?", "RoomListItemBtn", false);
   mediaRoomList.addRoom("Кухня", popupKuhnyaMediaChoose, "[Kuhnya]InUse", "[Kuhnya][No]Choose", "Выключить мультимедиа в помещении \"Кухня\"?", "RoomListItemBtn", false);
   mediaRoomList.addRoom("Терраса", popupTerrasaMediaChoose, "[Terrasa]InUse", "[Terrasa][No]Choose", "Выключить мультимедиа в помещении \"Терраса\"?", "RoomListItemBtn", false);
   mediaRoomList.addRoom("Гостиная", popupCinemaMediaChoose, "[Cinema]InUse", "[Cinema][No]Choose", "Выключить мультимедиа в помещении \"Гостиная\"?", "RoomListItemBtn", false);
   mediaRoomList.addRoom("Режим \"Party\"", popupParty, "[Party]IsOn", "[Party]AllOff", "Выключить режим \"Party\"?", "RoomListItemBtn", false);
   mediaRoomList.addRoom("Выключить мультимедиа", 0, "[All]IsOn", "[AllOff]Do", "Выключить мультимедиа?", "RoomListItemBtn", true);
   mediaRoomList.setAskModule(askModule);
   mediaRoomList.setInfoModule(infoModule);
   mediaRoomList.buildList();
   mediaRoomList.setAllRoomsState(false);
   mediaRoomList.listenFb();
   
   /*************UNDER CONSTRUCTION****************/
   /*************UNDER CONSTRUCTION****************/
   /*************UNDER CONSTRUCTION****************/
   /*************UNDER CONSTRUCTION****************/
   
   //define button press
   //FLAT POPUP
   popupFlat.addListener("netReboot", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupRebootModem);
   });
   
   popupRebootModem.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);
   });
   
   
   popupFlat.addListener("relaxBtn", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupRelaxMediaChoose);
   });
   popupFlat.addListener("hamamBtn", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupHamamMediaChoose);
   });
   popupFlat.addListener("saunaBtn", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupSaunaMediaChoose);
   });
   popupFlat.addListener("basseynBtn", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupBasseynMediaChoose);
   });
   popupFlat.addListener("kuhnyaBtn", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupKuhnyaMediaChoose);
   });
   popupFlat.addListener("terrasaBtn", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupTerrasaMediaChoose);
   });
   popupFlat.addListener("cinemaBtn", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupCinemaMediaChoose);
   });
   //MEDIACHOOSE POPUPS
   popupRelaxMediaChoose.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupRelaxMediaChoose.addListener("party", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      popupParty.backPopup = popupRelaxMediaChoose;
      that.sm.openPopup(popupParty);
   });
   popupHamamMediaChoose.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupHamamMediaChoose.addListener("party", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      popupParty.backPopup = popupHamamMediaChoose;
      that.sm.openPopup(popupParty);
   });
   popupSaunaMediaChoose.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupSaunaMediaChoose.addListener("party", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      popupParty.backPopup = popupSaunaMediaChoose;
      that.sm.openPopup(popupParty);
   });
   popupBasseynMediaChoose.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupBasseynMediaChoose.addListener("party", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      popupParty.backPopup = popupBasseynMediaChoose;
      that.sm.openPopup(popupParty);
   });
   popupKuhnyaMediaChoose.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupKuhnyaMediaChoose.addListener("party", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      popupParty.backPopup = popupKuhnyaMediaChoose;
      that.sm.openPopup(popupParty);
   });
   popupTerrasaMediaChoose.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupTerrasaMediaChoose.addListener("party", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      popupParty.backPopup = popupTerrasaMediaChoose;
      that.sm.openPopup(popupParty);
   });
   popupCinemaMediaChoose.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupCinemaMediaChoose.addListener("party", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      popupParty.backPopup = popupCinemaMediaChoose;
      that.sm.openPopup(popupParty);
   });
   //MEDIASETTINGS POPUPS
   popupRelaxMediaSettings.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupRelaxMediaSettings.addListener("btnBack", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupRelaxMediaSettings.backPopup);   
   });
   popupHamamMediaSettings.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupHamamMediaSettings.addListener("btnBack", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupHamamMediaSettings.backPopup);   
   });
   popupSaunaMediaSettings.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupSaunaMediaSettings.addListener("btnBack", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupSaunaMediaSettings.backPopup);   
   });
   popupBasseynMediaSettings.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupBasseynMediaSettings.addListener("btnBack", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupBasseynMediaSettings.backPopup);   
   });
   popupKuhnyaMediaSettings.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupKuhnyaMediaSettings.addListener("btnBack", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupKuhnyaMediaSettings.backPopup);   
   });
   popupTerrasaMediaSettings.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupTerrasaMediaSettings.addListener("btnBack", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupTerrasaMediaSettings.backPopup);   
   });
   popupCinemaMediaSettings.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);   
   });
   popupCinemaMediaSettings.addListener("btnBack", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupCinemaMediaSettings.backPopup);   
   });
   //MAIN PAGE
   IR.SetInterval(10000, function() {
      that.mc3.getValue("[Relax]InUse");
      that.mc3.getValue("[Hamam]InUse");
      that.mc3.getValue("[Sauna]InUse");
      that.mc3.getValue("[Basseyn]InUse");
      that.mc3.getValue("[Kuhnya]InUse");
      that.mc3.getValue("[Terrasa]InUse");
      that.mc3.getValue("[Cinema]InUse");
      that.mc3.getValue("[Party]InUse");
      that.mc3.getValue("[All]InUse");
   });
   pageMain.addListener("btnRooms", IR.EVENT_ITEM_RELEASE, function() {
      that.mc3.getValue("[Relax]InUse");
      that.mc3.getValue("[Hamam]InUse");
      that.mc3.getValue("[Sauna]InUse");
      that.mc3.getValue("[Basseyn]InUse");
      that.mc3.getValue("[Kuhnya]InUse");
      that.mc3.getValue("[Terrasa]InUse");
      that.mc3.getValue("[Cinema]InUse");
      that.mc3.getValue("[Party]InUse");
      that.mc3.getValue("[All]InUse");
      that.sm.closeAllPopups();
      that.sm.openPopup(popupRoomListMedia);
   });
   pageMain.addListener("btnCamera", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera1);
   });
   //CAMERA
   //1
   popupCamera1.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupFlat);
   });
   popupCamera1.addListener("camera2", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera2);
   });
   popupCamera1.addListener("camera3", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera3);
   });
   popupCamera1.addListener("camera4", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera4);
   });
   popupCamera1.addListener("camera5", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera5);
   });
   popupCamera1.addListener("camera6", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera6);
   });
   //2
   popupCamera2.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupFlat);
   });
   popupCamera2.addListener("camera1", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera1);
   });
   popupCamera2.addListener("camera3", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera3);
   });
   popupCamera2.addListener("camera4", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera4);
   });
   popupCamera2.addListener("camera5", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera5);
   });
   popupCamera2.addListener("camera6", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera6);
   });
   //3
   popupCamera3.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupFlat);
   });
   popupCamera3.addListener("camera1", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera1);
   });
   popupCamera3.addListener("camera2", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera2);
   });
   popupCamera3.addListener("camera4", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera4);
   });
   popupCamera3.addListener("camera5", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera5);
   });
   popupCamera3.addListener("camera6", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera6);
   });
   //4
   popupCamera4.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupFlat);
   });
   popupCamera4.addListener("camera1", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera1);
   });
   popupCamera4.addListener("camera2", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera2);
   });
   popupCamera4.addListener("camera3", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera3);
   });
   popupCamera4.addListener("camera5", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera5);
   });
   popupCamera4.addListener("camera6", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera6);
   });
   //5
   popupCamera5.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupFlat);
   });
   popupCamera5.addListener("camera1", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera1);
   });
   popupCamera5.addListener("camera2", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera2);
   });
   popupCamera5.addListener("camera3", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera3);
   });
   popupCamera5.addListener("camera4", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera4);
   });
   popupCamera5.addListener("camera6", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera6);
   });
   //6
   popupCamera6.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupFlat);
   });
   popupCamera6.addListener("camera1", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera1);
   });
   popupCamera6.addListener("camera2", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera2);
   });
   popupCamera6.addListener("camera3", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera3);
   });
   popupCamera6.addListener("camera4", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera4);
   });
   popupCamera6.addListener("camera5", IR.EVENT_ITEM_RELEASE, function() {
      sm.closeAllPopups();
      sm.openPopup(popupCamera5);
   });
   ///
   pageMain.addListener("btnParty", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      popupParty.backPopup = popupFlat;
      that.sm.openPopup(popupParty);
   });
   pageMain.addListener("btnAllMute", IR.EVENT_ITEM_RELEASE, function() {
      if (mc3.getValue("[All]Busy") == 1) {
         infoModule.setState("Подождите, в данный момент уже идёт работа с оборудованием", "ОК", function() {infoModule.hide();});
         infoModule.show();
      } else if (mc3.getValue("[All]IsOn") == 1 && mc3.getValue("[AllMute]IsOn") == 0) {
         askModule.setState("Выключить звук?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[AllMute]Do");}, function() {askModule.hide();});
         askModule.show();
      } else if (mc3.getValue("[All]IsOn") == 0) {
         infoModule.setState("Система мультимедиа выключена", "OK", function() {infoModule.hide();});
         infoModule.show();
      } else if (mc3.getValue("[AllMute]IsOn") == 1) {
         infoModule.setState("Звук уже выключен", "OK", function() {infoModule.hide();});
         infoModule.show();
      }
   });
   pageMain.addListener("btnAllOff", IR.EVENT_ITEM_RELEASE, function() {
      if (mc3.getValue("[All]Busy") == 1) {
         infoModule.setState("Подождите, в данный момент уже идёт работа с оборудованием", "ОК", function() {infoModule.hide();});
         infoModule.show();
      } else if (mc3.getValue("[All]IsOn") == 1) {
         askModule.setState("Выключить всё?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[AllOff]Do");}, function() {askModule.hide();});
         askModule.show();
      } else if (mc3.getValue("[All]IsOn") == 0) {
         infoModule.setState("Система мультимедиа уже выключена", "OK", function() {infoModule.hide();});
         infoModule.show();
      }
   });
   pageMain.addListenerToPage(IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);
   });
   //Party
   popupParty.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);
   });
   popupParty.addListener("btnBack", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupParty.backPopup);
   });
   //RoomListMedia
   popupRoomListMedia.addListener("btnClose", IR.EVENT_ITEM_RELEASE, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(popupFlat);
   });
});

function rebootCinema() {
   askModule.setState("Выполнить перезагрузку?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Cinema]Reset");}, function() {askModule.hide();});
   askModule.show();
}

function rebootRelax() {
   askModule.setState("Выполнить перезагрузку?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Relax]Reset");}, function() {askModule.hide();});
   askModule.show();
}

function rebootHamam() {
   askModule.setState("Выполнить перезагрузку?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Hamam]Reset");}, function() {askModule.hide();});
   askModule.show();
}

function rebootSauna() {
   askModule.setState("Выполнить перезагрузку?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Sauna]Reset");}, function() {askModule.hide();});
   askModule.show();
}

function rebootBasseyn() {
   askModule.setState("Выполнить перезагрузку?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Basseyn]Reset");}, function() {askModule.hide();});
   askModule.show();
}

function rebootKuhnya() {
   askModule.setState("Выполнить перезагрузку?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Kuhnya]Reset");}, function() {askModule.hide();});
   askModule.show();
}

function rebootTerrasa() {
   askModule.setState("Выполнить перезагрузку?", "Да", "Нет", function() {askModule.hide();mc3.pulse("[Terrasa]Reset");}, function() {askModule.hide();});
   askModule.show();
}