IR.AddListener(IR.EVENT_START,0,function()
{
   var mc3 = new Crestron("Crestron");		
   var sm = new SM(mc3);
   sm.rotate(true);
   sm.addPage("Main");
   sm.addPopup("PopupMediaLiving");
   sm.addPopup("PopupMediaWC");
   sm.addPopup("PopupMediaDI");
   sm.addPopup("PopupMediaCinema");	
   sm.addPopup("PopupParty");
   sm.addPopup("PopupSettingsCinema");
   sm.addPopup("PopupSettingsDI");
   sm.addPopup("PopupSettingsLiving");
   sm.addPopup("PopupSettingsWC");
   sm.addPopup("PopupApple");
   sm.addPopup("PopupAppleTV");
   sm.addPopup("PopupBluRay");
   sm.addPopup("PopupFM");
   sm.addPopup("PopupWWW");
   sm.addPopup("PopupWWWFav");
   sm.addPopup("PopupHumax");
   sm.addPopup("PopupTV");
   sm.addPopup("PopupSmartTV");
   sm.addPopup("PopupAsk");
   sm.addPopup("PopupVolume");
   sm.addPopup("PopupBusy");
   sm.addPopup("PopupBusyRoom");
   sm.addPopup("PopupWait");
   sm.addPopup("ArcamReboot");
   
   new WaitConnection(mc3.device, mc3.getConnectionStatus(), sm, "PopupWaitConnection");
   
   //FM
   var radio = new FMList(mc3, "FM_CMD", "FM_FB");
   radio.setItems("PopupFM", "listRadio", "nameRadio", "freqRadio", "imgRadio");
   radio.add("Дорожное радио", "87.50 МГц", "087_50.png", "087_50m.png", "087_50mm.png");
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
   radio.add("Nostalgia FM", "98.60 МГц", "098_60.png", "098_60m.png", "098_60mm.png");
   radio.add("Радио России", "99.00 МГц", "099_00.png", "099_00m.png", "099_00mm.png");
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
   
   //FMV
   var radioV = new FMList(mc3, "FM_CMD", "FM_FB");
   radioV.setItems("PopupFMV", "listRadio", "nameRadio", "freqRadio", "imgRadio");
   radioV.add("Дорожное радио", "87.50 МГц", "087_50.png", "087_50m.png", "087_50mm.png");
   radioV.add("Retro FM", "88.00 МГц", "088_00.png", "088_00m.png", "088_00mm.png");
   radioV.add("Авторадио", "88.40 МГц", "088_40.png", "088_40m.png", "088_40mm.png");
   radioV.add("Юмор ФМ", "88.90 МГц", "088_90.png", "088_90m.png", "088_90mm.png");
   radioV.add("Вести ФМ", "89.30 МГц", "089_30.png", "089_30m.png", "089_30mm.png");
   radioV.add("Радио Зенит", "89.70 МГц", "089_70.png", "089_70m.png", "089_70mm.png");
   radioV.add("Радио Эрмитаж", "90.10 МГц", "090_10.png", "090_10m.png", "090_10mm.png");
   radioV.add("Радио для двоих", "90.60 МГц", "090_60.png", "090_60m.png", "090_60mm.png");
   radioV.add("Кекс FM", "91.10 МГц", "091_10.png", "091_10m.png", "091_10mm.png");
   radioV.add("Эхо Москвы", "91.50 МГц", "091_50.png", "091_50m.png", "091_50mm.png");
   radioV.add("NRJ", "95.00 МГц", "095_00.png", "095_00m.png", "095_00mm.png");
   radioV.add("Нева FM", "95.90 МГц", "095_90.png", "095_90m.png", "095_90mm.png");
   radioV.add("Радио Дача", "97.00 МГц", "097_00.png", "097_00m.png", "097_00mm.png");
   radioV.add("Nostalgia FM", "98.60 МГц", "098_60.png", "098_60m.png", "098_60mm.png");
   radioV.add("Радио России", "99.00 МГц", "099_00.png", "099_00m.png", "099_00mm.png");
   radioV.add("Европа Плюс", "100.50 МГц", "100_50.png", "100_50m.png", "100_50mm.png");
   radioV.add("Питер FM", "100.90 МГц", "100_90.png", "100_90m.png", "100_90mm.png");
   radioV.add("Эльдорадио", "101.40 МГц", "101_40.png", "101_40m.png", "101_40mm.png");
   radioV.add("Страна FM", "102.00 МГц", "102_00.png", "102_00m.png", "102_00mm.png");
   radioV.add("Radio Metro", "102.40 МГц", "102_40.png", "102_40m.png", "102_40mm.png");
   radioV.add("Maximum", "102.80 МГц", "102_80.png", "102_80m.png", "102_80mm.png");
   radioV.add("DFM", "103.40 МГц", "103_40.png", "103_40m.png", "103_40mm.png");
   radioV.add("Детское Радио", "103.70 МГц", "103_70.png", "103_70m.png", "103_70mm.png");
   radioV.add("НАШЕ Радио", "104.00 МГц", "104_00.png", "104_00m.png", "104_00mm.png");
   radioV.add("Радио Шансон", "104.40 МГц", "104_40.png", "104_40m.png", "104_40mm.png");
   radioV.add("Радио Балтика", "104.80 МГц", "104_80.png", "104_80m.png", "104_80mm.png");
   radioV.add("Love Радио", "105.30 МГц", "105_30.png", "105_30m.png", "105_30mm.png");
   radioV.add("Monte Carlo", "105.90 МГц", "105_90.png", "105_90m.png", "105_90mm.png");
   radioV.add("Радио Рекорд", "106.30 МГц", "106_30.png", "106_30m.png", "106_30mm.png");
   radioV.add("Радио Маяк", "107.00 МГц", "107_00.png", "107_00m.png", "107_00mm.png");
   radioV.add("Бизнес-FM", "107.40 МГц", "107_40.png", "107_40m.png", "107_40mm.png");
   radioV.add("Русское радио", "107.80 МГц", "107_80.png", "107_80m.png", "107_80mm.png");
   radioV.build();
   radioV.listen(); 
   
   var fav1Item = new FMFavItem(mc3, "FM_Fav1#", "PopupFM", "fav1");
   var fav2Item = new FMFavItem(mc3, "FM_Fav2#", "PopupFM", "fav2");
   var fav3Item = new FMFavItem(mc3, "FM_Fav3#", "PopupFM", "fav3");
   var fav4Item = new FMFavItem(mc3, "FM_Fav4#", "PopupFM", "fav4");
   var fav5Item = new FMFavItem(mc3, "FM_Fav5#", "PopupFM", "fav5");
   var fav6Item = new FMFavItem(mc3, "FM_Fav6#", "PopupFM", "fav6");
   var fav1ItemV = new FMFavItem(mc3, "FM_Fav1#", "PopupFMV", "fav1");
   var fav2ItemV = new FMFavItem(mc3, "FM_Fav2#", "PopupFMV", "fav2");
   var fav3ItemV = new FMFavItem(mc3, "FM_Fav3#", "PopupFMV", "fav3");
   var fav4ItemV = new FMFavItem(mc3, "FM_Fav4#", "PopupFMV", "fav4");
   var fav5ItemV = new FMFavItem(mc3, "FM_Fav5#", "PopupFMV", "fav5");
   var fav6ItemV = new FMFavItem(mc3, "FM_Fav6#", "PopupFMV", "fav6");
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, mc3.device, function(name, value) {
      if (name == "Artwork") {
         IR.GetItem("PopupApple").GetItem("img").GetState(0).Image = value;
         IR.GetItem("PopupAppleV").GetItem("img").GetState(0).Image = value;
      }
   });
   
   var TV_MoveControl = new MoveControl("PopupTV", "joy", mc3, 100, 120);
   TV_MoveControl.setCMD("[Dev][TV]Up", "[Dev][TV]Dn", "[Dev][TV]Left", "[Dev][TV]Right", "[Dev][TV]Enter");
   TV_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   var TV_MoveControlV = new MoveControl("PopupTVV", "joy", mc3, 100, 120);
   TV_MoveControlV.setCMD("[Dev][TV]Up", "[Dev][TV]Dn", "[Dev][TV]Left", "[Dev][TV]Right", "[Dev][TV]Enter");
   TV_MoveControlV.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   
   var Humax_MoveControl = new MoveControl("PopupHumax", "joy", mc3, 100, 120);
   Humax_MoveControl.setCMD("[UI][IPD1]Humax_Up", "[UI][IPD1]Humax_Down", "[UI][IPD1]Humax_Left", "[UI][IPD1]Humax_Right", "[UI][IPD1]Humax_Enter");
   Humax_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   var Humax_MoveControlV = new MoveControl("PopupHumaxV", "joy", mc3, 100, 120);
   Humax_MoveControlV.setCMD("[UI][IPD1]Humax_Up", "[UI][IPD1]Humax_Down", "[UI][IPD1]Humax_Left", "[UI][IPD1]Humax_Right", "[UI][IPD1]Humax_Enter");
   Humax_MoveControlV.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   
   var AppleTV_MoveControl = new MoveControl("PopupAppleTV", "joy", mc3, 100, 120);
   AppleTV_MoveControl.setCMD("[UI][IPD1]AppleTV_Up", "[UI][IPD1]AppleTV_Down", "[UI][IPD1]AppleTV_Left", "[UI][IPD1]AppleTV_Right", "[UI][IPD1]AppleTV_Enter");
   AppleTV_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   var AppleTV_MoveControlV = new MoveControl("PopupAppleTVV", "joy", mc3, 100, 120);
   AppleTV_MoveControlV.setCMD("[UI][IPD1]AppleTV_Up", "[UI][IPD1]AppleTV_Down", "[UI][IPD1]AppleTV_Left", "[UI][IPD1]AppleTV_Right", "[UI][IPD1]AppleTV_Enter");
   AppleTV_MoveControlV.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   
   var BluRay_MoveControl = new MoveControl("PopupBluRay", "joy", mc3, 100, 120);
   BluRay_MoveControl.setCMD("[Dev][BluRay]Up_Osc", "[Dev][BluRay]Down_Osc", "[Dev][BluRay]Left_Osc", "[Dev][BluRay]Right_Osc", "[Dev][BluRay]Key_Ok");
   BluRay_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   var BluRay_MoveControlV = new MoveControl("PopupBluRayV", "joy", mc3, 100, 120);
   BluRay_MoveControlV.setCMD("[Dev][BluRay]Up_Osc", "[Dev][BluRay]Down_Osc", "[Dev][BluRay]Left_Osc", "[Dev][BluRay]Right_Osc", "[Dev][BluRay]Key_Ok");
   BluRay_MoveControlV.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");

   var SmartTV_MoveControl = new MoveControl("PopupSmartTV", "joy", mc3, 100, 120);
   SmartTV_MoveControl.setCMD("[UI][IPD1]SmartTV_Up", "[UI][IPD1]SmartTV_Down", "[UI][IPD1]SmartTV_Left", "[UI][IPD1]SmartTV_Right", "[UI][IPD1]SmartTV_OK");
   SmartTV_MoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   var SmartTV_MoveControlV = new MoveControl("PopupSmartTVV", "joy", mc3, 100, 120);
   SmartTV_MoveControlV.setCMD("[UI][IPD1]SmartTV_Up", "[UI][IPD1]SmartTV_Down", "[UI][IPD1]SmartTV_Left", "[UI][IPD1]SmartTV_Right", "[UI][IPD1]SmartTV_OK");
   SmartTV_MoveControlV.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");

});

IR.AddListener(IR.EVENT_APP_ENTER_BACKGROUND,0,function()
{
   IR.Exit();
});                                      