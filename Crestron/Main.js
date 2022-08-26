IR.AddListener(IR.EVENT_START,0,function()
{
   var mc3 = new Crestron("Crestron");
   var sm = new SM(mc3);     
   sm.addPopup("PopupFlat");
   sm.addPopup("PopupRoomTheater");
   sm.addPopup("PopupRoomDinning");
   sm.addPopup("PopupRoomKitchen");
   sm.addPopup("PopupRoomWC");
   sm.addPopup("PopupParty");
   sm.addPopup("PopupFM");
   sm.addPopup("PopupNetradio");
   sm.addPopup("PopupHumax");
   sm.addPopup("PopupXBMC");
   sm.addPopup("PopupAppleTV");
   sm.addPopup("PopupAppleMusic");
   sm.addPopup("PopupBluray");
   sm.addPopup("PopupXBOX");
   sm.addPopup("PopupKaraoke");
   sm.addPopup("PopupSmartTV");
   sm.addPopup("PopupCCTV");
   sm.addPopup("PopupSettingsTheater");
   sm.addPopup("PopupSettingsDinning");
   sm.addPopup("PopupSettingsKitchen");
   sm.addPopup("PopupSettingsWC");
   sm.addPopup("PopupVolume");
   sm.addPopup("PopupInfo");
   sm.addPopup("PopupAsk");
   sm.addPopup("PopupWait");
   sm.addPopup("PopupBusyRoom");
   sm.addPopup("PopupBusy");
   
   new WaitConnection(mc3, mc3.getConnectionStatus(), sm, "PopupWaitConnection");
   
   //Sources
   //SmartTV
   var smartTV_MoveControl = new MoveControl("PopupSmartTV", "joy", mc3, 100, 120);
   smartTV_MoveControl.setCMD("TV_Up", "TV_Down", "TV_Left", "TV_Right", "TV_Enter");
   smartTV_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   //AppleTV
   var appleTV_MoveControl = new MoveControl("PopupAppleTV", "joy", mc3, 80, 80);
   appleTV_MoveControl.setCMD("AppleTV_Up", "AppleTV_Down", "AppleTV_Left", "AppleTV_Right", "AppleTV_Central");
   appleTV_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   //XBMC
   var XBMC_MoveControl = new MoveControl("PopupXBMC", "joy", mc3, 100, 120);
   XBMC_MoveControl.setCMD("XBMC_Up", "XBMC_Down", "XBMC_Left", "XBMC_Right", "XBMC_Central");
   XBMC_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   //Humax
   var Humax_MoveControl = new MoveControl("PopupHumax", "joy", mc3, 80, 80);
   Humax_MoveControl.setCMD("Humax_Up", "Humax_Down", "Humax_Left", "Humax_Right", "Humax_Enter");
   Humax_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   //Bluray
   var Bluray_MoveControl = new MoveControl("PopupBluray", "joy", mc3, 100, 120);
   Bluray_MoveControl.setCMD("BR_Up", "BR_Down", "BR_Left", "BR_Right", "BR_Enter");
   Bluray_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   //Karaoke
   var Karaoke_MoveControl = new MoveControl("PopupKaraoke", "joy", mc3, 100, 120);
   Karaoke_MoveControl.setCMD("KR_Up", "KR_Down", "KR_Left", "KR_Right", "KR_Enter");
   Karaoke_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");  
   //internet connection
   //var Internet_Connection = new IntCon(mc3);
   //FM
   var radio = new FMList(mc3, "FM_CMD", "FM_FB");
   radio.setItems("PopupFM", "listRadio", "nameRadio", "freqRadio", "imgRadio");
   radio.add("Дорожное радио", "87.50 МГц", "87_50.png", "87_50m.png", "87_50mm.png");
   radio.add("Retro FM", "88.00 МГц", "088_00.png", "088_00m.png", "088_00mm.png");
   radio.add("Авторадио", "88.40 МГц", "088_40.png", "088_40m.png", "088_40mm.png");
   radio.add("Юмор ФМ", "88.90 МГц", "088_90.png", "088_90m.png", "088_90mm.png");
   radio.add("Вести ФМ", "89.30 МГц", "089_30.png", "089_30m.png", "089_30mm.png");
   radio.add("Радио Зенит", "89.70 МГц", "089_70.png", "089_70m.png", "089_70mm.png");
   radio.add("Радио Эрмитаж", "90.10 МГц", "090_10.png", "090_10m.png", "090_10mm.png");
   radio.add("Радио для двоих", "90.60 МГц", "090_60.png", "090_60m.png", "090_60mm.png");
   radio.add("Кекс FM", "91.10 МГц", "091_10.png", "091_10m.png", "091_10mm.png");
   radio.add("Эхо Москвы", "91.50 МГц", "091_50.png", "091_50m.png", "091_50mm.png");
   radio.add("NRJ", "95.00 МГц", "095_00.png", "095_00m.png", "095_00mm.png");
   radio.add("Нева FM", "95.90 МГц", "095_90.png", "095_90m.png", "095_90mm.png");
   radio.add("Радио Дача", "97.00 МГц", "097_00.png", "097_00m.png", "097_00mm.png");
   radio.add("Радио Ваня", "100.10 МГц", "100_10.png", "100_10m.png", "100_10mm.png");
   radio.add("Европа Плюс", "100.50 МГц", "100_50.png", "100_50m.png", "100_50mm.png");
   radio.add("Питер FM", "100.90 МГц", "100_90.png", "100_90m.png", "100_90mm.png");
   radio.add("Эльдорадио", "101.40 МГц", "101_40.png", "101_40m.png", "101_40mm.png");
   radio.add("Страна FM", "102.00 МГц", "102_00.png", "102_00m.png", "102_00mm.png");
   radio.add("Radio Metro", "102.40 МГц", "102_40.png", "102_40m.png", "102_40mm.png");
   radio.add("Maximum", "102.80 МГц", "102_80.png", "102_80m.png", "102_80mm.png");
   radio.add("DFM", "103.40 МГц", "103_40.png", "103_40m.png", "103_40mm.png");
   radio.add("Детское Радио", "103.70 МГц", "103_70.png", "103_70m.png", "103_70mm.png");
   radio.add("НАШЕ Радио", "104.00 МГц", "104_00.png", "104_00m.png", "104_00mm.png");
   radio.add("Радио Шансон", "104.40 МГц", "104_40.png", "104_40m.png", "104_40mm.png");
   radio.add("Радио Балтика", "104.80 МГц", "104_80.png", "104_80m.png", "104_80mm.png");
   radio.add("Love Радио", "105.30 МГц", "105_30.png", "105_30m.png", "105_30mm.png");
   radio.add("Monte Carlo", "105.90 МГц", "105_90.png", "105_90m.png", "105_90mm.png");
   radio.add("Радио Рекорд", "106.30 МГц", "106_30.png", "106_30m.png", "106_30mm.png");
   radio.add("Радио Маяк", "107.00 МГц", "107_00.png", "107_00m.png", "107_00mm.png");
   radio.add("Бизнес-FM", "107.40 МГц", "107_40.png", "107_40m.png", "107_40mm.png");
   radio.add("Русское радио", "107.80 МГц", "107_80.png", "107_80m.png", "107_80mm.png");
   radio.build();
   radio.listen(); 

});
