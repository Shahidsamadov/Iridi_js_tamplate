IR.AddListener(IR.EVENT_START,0,function()
{            
   IR.Log("program started");
   IR.ShowPage("Main");
      
   //Запускаем драйвера устройств
   //var DuneHD = new DuneHDModule("Dune HD Version 3");
   var OnkyoReceiver = new OnkyoDevice("Onkyo");
   var oRadio = new OnkyoRadio();
   oRadio.setDriverModule(OnkyoReceiver);
   OnkyoReceiver.setRadioModule(oRadio);  
   var GlobalCache = IR.GetDevice("Global Cache");
   var jvc = new JVCDriver();
   
   //Запускаем selector'ы & switchLogic
   var swLogic = new SwitchLogic(IR.GetDevice("Dune HD Version 3"), OnkyoReceiver.device, GlobalCache, jvc);
   var outputSelect = new OutputSelector();
   outputSelect.readFromMemory();
   var sourceSelect = new SourceSelector(swLogic);
   
   //PageMain
   //TV
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainUp").GetItem("tv"), function() {
      outputSelect.setTV();
   });
   //Projector
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainUp").GetItem("proj"), function() {
      outputSelect.setProjector();
   });
   //AU
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainUp").GetItem("au"), function() {
      outputSelect.setAU();
   });
   //Screen
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainUp").GetItem("screen"), function() {
      IR.Log("Screen Release");
      IR.HideAllPopups();
      IR.ShowPopup("PopupScreen");
   });
   
   //PopupMainTV
   //Sat
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainTV").GetItem("sat"), function() {
      sourceSelect.selectSATTV();   
   });
   //Mediaplayer
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainTV").GetItem("mediaplayer"), function() {
      sourceSelect.selectMediaplayerTV();
   });
   //Bluray 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainTV").GetItem("bluray"), function() {
      sourceSelect.selectBlurayTV();
   });
   //SmartTV
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainTV").GetItem("smarttv"), function() {
      sourceSelect.selectSmartTVTV();
   });
   
   //PopupMainPR
   //Sat
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainProj").GetItem("sat"), function() {
      sourceSelect.selectSATPR();
   });
   //Mediaplayer
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainProj").GetItem("mediaplayer"), function() {
      sourceSelect.selectMediaplayerPR();
   });
   //Bluray
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainProj").GetItem("bluray"), function() {
      sourceSelect.selectBlurayPR();
   });
   
   //PopupMainAU
   //FM
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainAU").GetItem("fm"), function() {
      sourceSelect.selectFMAU();
   });
   //BT
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMainAU").GetItem("bt"), function() {
      sourceSelect.selectBTAU();
   });
   
   //PopupScreen
   //Back
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupScreen").GetItem("back"), function() {
      IR.Log("back");
      openMainPopup();
   });
   
   function openMainPopup() {
      if (IR.GetVariable("Global.OutputTVStatus") == 1) {
         IR.HideAllPopups();
         IR.ShowPopup("PopupMainUp");
         IR.ShowPopup("PopupMainTV");
      } else if (IR.GetVariable("Global.OutputProjectorStatus") == 1) {
         IR.HideAllPopups();         
         IR.ShowPopup("PopupMainUp");
         IR.ShowPopup("PopupMainProj");      
      } else if (IR.GetVariable("Global.OutputAUStatus") == 1) {
         IR.HideAllPopups();
         IR.ShowPopup("PopupMainUp");
         IR.ShowPopup("PopupMainAU");
      }         
   }
   
   //SourcePopups
   ///SAT
   var satMoveControl = new MoveControl("PopupSAT", "joy", "Global Cache");
   satMoveControl.setCMD("SAT_Up", "SAT_Down", "SAT_Left", "SAT_Right", "SAT_OK");               
   satMoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSAT").GetItem("back"), function() {
      IR.Log("back");
      openMainPopup();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSAT").GetItem("set"), function() {
      openActualSettings();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSAT").GetItem("main"), function() {
      IR.SetVariable("Global.Popup_SAT_SelectP1", 1);
      IR.SetVariable("Global.Popup_SAT_SelectP2", 0);
      IR.SetVariable("Global.Popup_SAT_SelectP3", 0);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSAT").GetItem("keypad"), function() {
      IR.SetVariable("Global.Popup_SAT_SelectP1", 0);
      IR.SetVariable("Global.Popup_SAT_SelectP2", 1);
      IR.SetVariable("Global.Popup_SAT_SelectP3", 0);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSAT").GetItem("add"), function() {
      IR.SetVariable("Global.Popup_SAT_SelectP1", 0);
      IR.SetVariable("Global.Popup_SAT_SelectP2", 0);
      IR.SetVariable("Global.Popup_SAT_SelectP3", 1);
   });
   ///Mediaplayer
   var mediaplayerMoveControl = new MoveControl("PopupMediaplayer", "joy", "Dune HD Version 3");
   mediaplayerMoveControl.setCMD("Up", "Down", "Left", "Right", "Enter");  
   mediaplayerMoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
  
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMediaplayer").GetItem("back"), function() {
      IR.Log("back");
      openMainPopup();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMediaplayer").GetItem("set"), function() {
      openActualSettings();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMediaplayer").GetItem("main"), function() {
      IR.SetVariable("Global.Popup_Mediaplayer_SelectP1", 1);
      IR.SetVariable("Global.Popup_Mediaplayer_SelectP2", 0);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupMediaplayer").GetItem("add"), function() {
      IR.SetVariable("Global.Popup_Mediaplayer_SelectP1", 0);
      IR.SetVariable("Global.Popup_Mediaplayer_SelectP2", 1);
   });
   ///Bluray
   var blurayMoveControl = new MoveControl("PopupBluray", "joy", "Global Cache");
   blurayMoveControl.setCMD("BR_Up", "BR_Down", "BR_Left", "BR_Right", "BR_Enter");               
   blurayMoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupBluray").GetItem("back"), function() {
      IR.Log("back");
      openMainPopup();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupBluray").GetItem("set"), function() {
      openActualSettings();   
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupBluray").GetItem("main"), function() {
      IR.SetVariable("Global.Popup_Bluray_SelectP1", 1);
      IR.SetVariable("Global.Popup_Bluray_SelectP2", 0);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupBluray").GetItem("add"), function() {
      IR.SetVariable("Global.Popup_Bluray_SelectP1", 0);
      IR.SetVariable("Global.Popup_Bluray_SelectP2", 1);
   });
   ///SmartTV
   var smarttvMoveControl = new MoveControl("PopupSmartTV", "joy", "Global Cache");
   smarttvMoveControl.setCMD("LG_Up", "LG_Down", "LG_Left", "LG_Right", "LG_OK");               
   smarttvMoveControl.setVisualizeItems("visual_up", "visual_down", "visual_left", "visual_right", "visual_press");
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSmartTV").GetItem("back"), function() {
      IR.Log("back");
      openMainPopup();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSmartTV").GetItem("set"), function() {
      openActualSettings();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSmartTV").GetItem("main"), function() {
      IR.SetVariable("Global.Popup_SmartTV_SelectP1", 1);
      IR.SetVariable("Global.Popup_SmartTV_SelectP2", 0);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSmartTV").GetItem("add"), function() {
      IR.SetVariable("Global.Popup_SmartTV_SelectP1", 0);
      IR.SetVariable("Global.Popup_SmartTV_SelectP2", 1);
   });
   ///FM
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupFM").GetItem("back"), function() {
      IR.Log("back");
      openMainPopup();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupFM").GetItem("set"), function() {
      openActualSettings();
   });  
   ///BT              
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupBT").GetItem("back"), function() {
      IR.Log("back");
      openMainPopup();
   });                     
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupBT").GetItem("set"), function() {
      openActualSettings();
   });
   
   //Settings  
   function openActualSettings() {
      IR.SetVariable("Global.Popup_Settings_SelectP1", 1);
      IR.SetVariable("Global.Popup_Settings_SelectP2", 0); 
      IR.SetVariable("Global.Popup_Settings_SelectP2_TV", 0);
      IR.SetVariable("Global.Popup_Settings_SelectP2_PR", 0);
      IR.SetVariable("Global.Popup_Settings_SelectP3", 0);
      IR.HideAllPopups();
      IR.ShowPopup("PopupSettings");
   }
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("PopupSettings").GetItem("update"), function() {
      
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("PopupSettings").GetItem("p1"), function() {
      IR.SetVariable("Global.Popup_Settings_SelectP1", 1);
      IR.SetVariable("Global.Popup_Settings_SelectP2", 0);  
      IR.SetVariable("Global.Popup_Settings_SelectP2_TV", 0);
      IR.SetVariable("Global.Popup_Settings_SelectP2_PR", 0);
      IR.SetVariable("Global.Popup_Settings_SelectP3", 0);   
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("PopupSettings").GetItem("p21"), function() {
      IR.SetVariable("Global.Popup_Settings_SelectP1", 0);
      IR.SetVariable("Global.Popup_Settings_SelectP2", 1);
      IR.SetVariable("Global.Popup_Settings_SelectP2_TV", 1);
      IR.SetVariable("Global.Popup_Settings_SelectP2_PR", 0);
      IR.SetVariable("Global.Popup_Settings_SelectP3", 0);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("PopupSettings").GetItem("p22"), function() {
      IR.SetVariable("Global.Popup_Settings_SelectP1", 0);
      IR.SetVariable("Global.Popup_Settings_SelectP2", 1);
      IR.SetVariable("Global.Popup_Settings_SelectP2_TV", 0);
      IR.SetVariable("Global.Popup_Settings_SelectP2_PR", 1);
      IR.SetVariable("Global.Popup_Settings_SelectP3", 0);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("PopupSettings").GetItem("p3"), function() {
      IR.SetVariable("Global.Popup_Settings_SelectP1", 0);
      IR.SetVariable("Global.Popup_Settings_SelectP2", 0);  
      IR.SetVariable("Global.Popup_Settings_SelectP2_TV", 0);
      IR.SetVariable("Global.Popup_Settings_SelectP2_PR", 0);
      IR.SetVariable("Global.Popup_Settings_SelectP3", 1);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("PopupSettings").GetItem("back"), function() {
      openActiveSource();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSettings").GetItem("aspect"), function() {
      jvc.aspect();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSettings").GetItem("dauto"), function() {
      jvc.on3d_auto();
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSettings").GetItem("doff"), function() {
      jvc.on3d_off();
   });
   
   
   //BottomPanel
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("Main").GetItem("btnPower"), function() {
      IR.ShowPopup("PopupPowerOff");
   });
   var up_osc_id, down_osc_id;
   var interval = 250;
   IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetItem("Main").GetItem("btnVolumeDown"), function() {
      volume_down();
      down_osc_id = IR.SetInterval(interval, volume_down);
   });
   IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetItem("Main").GetItem("btnVolumeUp"), function() {
      volume_up();
      up_osc_id = IR.SetInterval(interval, volume_up);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("Main").GetItem("btnVolumeDown"), function() {
      IR.ClearInterval(down_osc_id);
      IR.ClearInterval(up_osc_id);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("Main").GetItem("btnVolumeUp"), function() {
      IR.ClearInterval(down_osc_id);
      IR.ClearInterval(up_osc_id);
   });
   
   function volume_up() {
      IR.SetTimeout(0, function() {OnkyoReceiver.device.Set("Select Zone 1", "");});  
      IR.SetTimeout(0, function() {OnkyoReceiver.device.Set("VOLUME UP", "");});
   }
   
   function volume_down() {
      IR.SetTimeout(0, function() {OnkyoReceiver.device.Set("Select Zone 1", "");});  
      IR.SetTimeout(0, function() {OnkyoReceiver.device.Set("VOLUME DOWN", "");});
   }
   
   //PowerOff Popup
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupPowerOff").GetItem("yes"), function() {
      sourceSelect.selectOff();      
   });
   
   function syncSource() {
      IR.HidePopup("PopupSyncAsk");
      if (IR.GetVariable("Global.SAT_InUse") == 1) {
         IR.GetDevice("Global Cache").Set("SAT_PowerToggle", "");   
      } else if (IR.GetVariable("Global.Mediaplayer_InUse") == 1) {
         IR.GetDevice("Dune HD Version 3").Set("Power", "");
      } else if (IR.GetVariable("Global.Bluray_InUse") == 1) {
         GlobalCache.Set("BR_PowerToggle", "");
      } else if (IR.GetVariable("Global.SmartTV_InUse") == 1) {
         GlobalCache.Set("LG_SmartTV", "");
      }
   }
   
   //SyncAsk Popup
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup("PopupSyncAsk").GetItem("yes"), function() {
      syncSource();
   });
     
   function openActiveSource() {
      if (IR.GetVariable("Global.SourceSAT_TV") == 1) {
         IR.HideAllPopups();
         IR.ShowPopup("PopupSAT");
      } else if (IR.GetVariable("Global.SourceMediaplayer_TV") == 1) {
         IR.HideAllPopups();
         IR.ShowPopup("PopupMediaplayer");
      } else if (IR.GetVariable("Global.SourceBluray_TV") == 1) {
         IR.HideAllPopups();
         IR.ShowPopup("PopupBluray");
      } else if (IR.GetVariable("Global.SourceSmartTV_TV") == 1) {
         IR.HideAllPopups();
         IR.ShowPopup("PopupSmartTV");
      } else if (IR.GetVariable("Global.SourceSAT_PR") == 1) {
         IR.HideAllPopups();
         IR.ShowPopup("PopupSAT");
      } else if (IR.GetVariable("Global.SourceMediaplayer_PR") == 1) {
         IR.HideAllPopups();
         IR.ShowPopup("PopupMediaplayer");
      } else if (IR.GetVariable("Global.SourceBluray_PR") == 1) {
         IR.HideAllPopups();
         IR.ShowPopup("PopupBluray");
      } else if (IR.GetVariable("Global.SourceFM_AU") == 1) {
         IR.HideAllPopups();
         IR.ShowPopup("PopupFM");      
      } else if (IR.GetVariable("Global.SourceBT_AU") == 1) {
         IR.HideAllPopups();     
         IR.ShowPopup("PopupBT"); 
      } else { 
         openMainPopup();
      }
   }
});


function parse_url(url) {
    var pattern = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
    var matches =  url.match(pattern);
    return {
        scheme: matches[2],
        authority: matches[4],
        path: matches[5],
        query: matches[7],
        fragment: matches[9]
    };
}
function HTTPUpdate(url)
{
   var parsed_url = parse_url(url);
   var downloader = IR.DownLoadProject(
                     {
                        type:parsed_url.scheme,
                        host:parsed_url.authority,
                        path:parsed_url.path + '?' + parsed_url.query,
                     });
}
function Update_by_press()
{
      HTTPUpdate('http://linkplay.ru/simagino/main.irpz');
}