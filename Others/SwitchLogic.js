var SwitchLogic = function(DuneHD, OnkyoReceiver, GlobalCache, JVC) {
   var that = this;
   this.DuneHD = DuneHD;
   this.OnkyoReceiver = OnkyoReceiver;
   this.GlobalCache = GlobalCache;
   this.JVC = JVC;
   var input_NO = "INPUT SELECTION AUX1(AUX)";
   var input_SAT = "INPUT SELECTION CBL/SAT";
   var input_MEDIAPLAYER = "INPUT SELECTION VCR/DVR";
   var input_BLURAY = "INPUT SELECTION DVD";
   var input_SMARTTV = "INPUT SELECTION CD";
   var input_NVIDIA = "INPUT SELECTION NVIDIA";
   var input_FM = "INPUT SELECTION FM";
   var input_BT = "INPUT SELECTION BT";
   var waitDiscrete = 100;
   
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
   
   this.setSATTV_IsOn = function() {
      IR.SetVariable("Global.SourceSAT_TV", 1);
      IR.SetVariable("Global.SourceMediaplayer_TV", 0);
      IR.SetVariable("Global.SourceBluray_TV", 0);
      IR.SetVariable("Global.SourceSmartTV_TV", 0);
      IR.SetVariable("Global.SourceSAT_PR", 0);
      IR.SetVariable("Global.SourceMediaplayer_PR", 0);
      IR.SetVariable("Global.SourceBluray_PR", 0);
      IR.SetVariable("Global.SourceFM_AU", 0);
      IR.SetVariable("Global.SourceBT_AU", 0);
      IR.SetVariable("Global.SourceNvidiaShield_TV", 0);
      IR.SetVariable("Global.SourceNvidiaShield_PR", 0);
      
      IR.SetVariable("Global.SAT_InUse", 1);
      IR.SetVariable("Global.Mediaplayer_InUse", 0);
      IR.SetVariable("Global.Bluray_InUse", 0);
      IR.SetVariable("Global.SmartTV_InUse", 0);
      IR.SetVariable("Global.FM_InUse", 0);
      IR.SetVariable("Global.BT_InUse", 0);
      IR.SetVariable("Global.NvidiaShield_InUse", 0);
            
      IR.SetVariable("Global.TV_InUse", 1);
      IR.SetVariable("Global.PR_InUse", 0);
      IR.SetVariable("Global.AU_InUse", 0);
      IR.SetVariable("Global.System_InUse", 1);
      IR.SetVariable("Global.System_NotInUse", 0);
      
      IR.SetVariable("Global.Popup_SAT_SelectP1", 1);
      IR.SetVariable("Global.Popup_SAT_SelectP2", 0);
      IR.SetVariable("Global.Popup_SAT_SelectP3", 0);
   }
   this.setMediaplayerTV_IsOn = function() {
      IR.SetVariable("Global.SourceSAT_TV", 0);
      IR.SetVariable("Global.SourceMediaplayer_TV", 1);
      IR.SetVariable("Global.SourceBluray_TV", 0);
      IR.SetVariable("Global.SourceSmartTV_TV", 0);
      IR.SetVariable("Global.SourceSAT_PR", 0);
      IR.SetVariable("Global.SourceMediaplayer_PR", 0);
      IR.SetVariable("Global.SourceBluray_PR", 0); 
      IR.SetVariable("Global.SourceFM_AU", 0);
      IR.SetVariable("Global.SourceBT_AU", 0);
      IR.SetVariable("Global.SourceNvidiaShield_TV", 0);
      IR.SetVariable("Global.SourceNvidiaShield_PR", 0);
      
      IR.SetVariable("Global.SAT_InUse", 0);
      IR.SetVariable("Global.Mediaplayer_InUse", 1);
      IR.SetVariable("Global.Bluray_InUse", 0); 
      IR.SetVariable("Global.SmartTV_InUse", 0);  
      IR.SetVariable("Global.FM_InUse", 0);
      IR.SetVariable("Global.BT_InUse", 0);
      IR.SetVariable("Global.NvidiaShield_InUse", 0);
      
      IR.SetVariable("Global.TV_InUse", 1);
      IR.SetVariable("Global.PR_InUse", 0);
      IR.SetVariable("Global.AU_InUse", 0);
      IR.SetVariable("Global.System_InUse", 1);
      IR.SetVariable("Global.System_NotInUse", 0);
      
      IR.SetVariable("Global.Popup_Mediaplayer_SelectP1", 1);
      IR.SetVariable("Global.Popup_Mediaplayer_SelectP2", 0);   
   }
   this.setBlurayTV_IsOn = function() {
      IR.SetVariable("Global.SourceSAT_TV", 0);
      IR.SetVariable("Global.SourceMediaplayer_TV", 0);
      IR.SetVariable("Global.SourceBluray_TV", 1);
      IR.SetVariable("Global.SourceSmartTV_TV", 0);
      IR.SetVariable("Global.SourceSAT_PR", 0);
      IR.SetVariable("Global.SourceMediaplayer_PR", 0);
      IR.SetVariable("Global.SourceBluray_PR", 0); 
      IR.SetVariable("Global.SourceFM_AU", 0);
      IR.SetVariable("Global.SourceBT_AU", 0);
      IR.SetVariable("Global.SourceNvidiaShield_TV", 0);
      IR.SetVariable("Global.SourceNvidiaShield_PR", 0);
      
      IR.SetVariable("Global.SAT_InUse", 0);
      IR.SetVariable("Global.Mediaplayer_InUse", 0);
      IR.SetVariable("Global.Bluray_InUse", 1); 
      IR.SetVariable("Global.SmartTV_InUse", 0); 
      IR.SetVariable("Global.FM_InUse", 0);
      IR.SetVariable("Global.BT_InUse", 0);
      IR.SetVariable("Global.NvidiaShield_InUse", 0);
      
      IR.SetVariable("Global.TV_InUse", 1);
      IR.SetVariable("Global.PR_InUse", 0);   
      IR.SetVariable("Global.AU_InUse", 0);
      IR.SetVariable("Global.System_InUse", 1);
      IR.SetVariable("Global.System_NotInUse", 0);
      
      IR.SetVariable("Global.Popup_Bluray_SelectP1", 1);
      IR.SetVariable("Global.Popup_Bluray_SelectP2", 0);   
   }
   this.setSmartTV_IsOn = function() {
      IR.SetVariable("Global.SourceSAT_TV", 0);
      IR.SetVariable("Global.SourceMediaplayer_TV", 0);
      IR.SetVariable("Global.SourceBluray_TV", 0);
      IR.SetVariable("Global.SourceSmartTV_TV", 1);
      IR.SetVariable("Global.SourceSAT_PR", 0);
      IR.SetVariable("Global.SourceMediaplayer_PR", 0);
      IR.SetVariable("Global.SourceBluray_PR", 0);  
      IR.SetVariable("Global.SourceFM_AU", 0);
      IR.SetVariable("Global.SourceBT_AU", 0);
      IR.SetVariable("Global.SourceNvidiaShield_TV", 0);
      IR.SetVariable("Global.SourceNvidiaShield_PR", 0);
      
      IR.SetVariable("Global.SAT_InUse", 0);
      IR.SetVariable("Global.Mediaplayer_InUse", 0);
      IR.SetVariable("Global.Bluray_InUse", 0); 
      IR.SetVariable("Global.SmartTV_InUse", 1);  
      IR.SetVariable("Global.FM_InUse", 0);
      IR.SetVariable("Global.BT_InUse", 0);
      IR.SetVariable("Global.NvidiaShield_InUse", 0);
      
      IR.SetVariable("Global.TV_InUse", 1);
      IR.SetVariable("Global.PR_InUse", 0);     
      IR.SetVariable("Global.AU_InUse", 0);
      IR.SetVariable("Global.System_InUse", 1);
      IR.SetVariable("Global.System_NotInUse", 0); 
      
      IR.SetVariable("Global.Popup_SmartTV_SelectP1", 1);
      IR.SetVariable("Global.Popup_SmartTV_SelectP2", 0);  
   }
   this.setNvidiaShieldTV_IsOn = function() {
      IR.SetVariable("Global.SourceSAT_TV", 0);
      IR.SetVariable("Global.SourceMediaplayer_TV", 0);
      IR.SetVariable("Global.SourceBluray_TV", 0);
      IR.SetVariable("Global.SourceSmartTV_TV", 0);
      IR.SetVariable("Global.SourceSAT_PR", 0);
      IR.SetVariable("Global.SourceMediaplayer_PR", 0);
      IR.SetVariable("Global.SourceBluray_PR", 0);  
      IR.SetVariable("Global.SourceFM_AU", 0);
      IR.SetVariable("Global.SourceBT_AU", 0);
      IR.SetVariable("Global.SourceNvidiaShield_TV", 1);
      IR.SetVariable("Global.SourceNvidiaShield_PR", 0);
      
      IR.SetVariable("Global.SAT_InUse", 0);
      IR.SetVariable("Global.Mediaplayer_InUse", 0);
      IR.SetVariable("Global.Bluray_InUse", 0); 
      IR.SetVariable("Global.SmartTV_InUse", 0);  
      IR.SetVariable("Global.FM_InUse", 0);
      IR.SetVariable("Global.BT_InUse", 0);
      IR.SetVariable("Global.NvidiaShield_InUse", 1);
      
      IR.SetVariable("Global.TV_InUse", 1);
      IR.SetVariable("Global.PR_InUse", 0);     
      IR.SetVariable("Global.AU_InUse", 0);
      IR.SetVariable("Global.System_InUse", 1);
      IR.SetVariable("Global.System_NotInUse", 0); 
      
      IR.SetVariable("Global.Popup_NvidiaShield_SelectP1", 1);
      IR.SetVariable("Global.Popup_NvidiaShield_SelectP2", 0);  
   }
   this.setSATPR_IsOn = function() {
      IR.SetVariable("Global.SourceSAT_TV", 0);
      IR.SetVariable("Global.SourceMediaplayer_TV", 0);
      IR.SetVariable("Global.SourceBluray_TV", 0);
      IR.SetVariable("Global.SourceSmartTV_TV", 0);
      IR.SetVariable("Global.SourceSAT_PR", 1);
      IR.SetVariable("Global.SourceMediaplayer_PR", 0);
      IR.SetVariable("Global.SourceBluray_PR", 0);  
      IR.SetVariable("Global.SourceFM_AU", 0);
      IR.SetVariable("Global.SourceBT_AU", 0);
      IR.SetVariable("Global.SourceNvidiaShield_TV", 0);
      IR.SetVariable("Global.SourceNvidiaShield_PR", 0);
      
      IR.SetVariable("Global.SAT_InUse", 1);
      IR.SetVariable("Global.Mediaplayer_InUse", 0);
      IR.SetVariable("Global.Bluray_InUse", 0);
      IR.SetVariable("Global.SmartTV_InUse", 0);     
      IR.SetVariable("Global.FM_InUse", 0);
      IR.SetVariable("Global.BT_InUse", 0);
      IR.SetVariable("Global.NvidiaShield_InUse", 0);
      
      IR.SetVariable("Global.TV_InUse", 0);
      IR.SetVariable("Global.PR_InUse", 1);       
      IR.SetVariable("Global.AU_InUse", 0);
      IR.SetVariable("Global.System_InUse", 1);
      IR.SetVariable("Global.System_NotInUse", 0);
      
      IR.SetVariable("Global.Popup_SAT_SelectP1", 1);
      IR.SetVariable("Global.Popup_SAT_SelectP2", 0);
      IR.SetVariable("Global.Popup_SAT_SelectP3", 0);   
   }
   this.setMediaplayerPR_IsOn = function() {
      IR.SetVariable("Global.SourceSAT_TV", 0);
      IR.SetVariable("Global.SourceMediaplayer_TV", 0);
      IR.SetVariable("Global.SourceBluray_TV", 0);
      IR.SetVariable("Global.SourceSmartTV_TV", 0);
      IR.SetVariable("Global.SourceSAT_PR", 0);
      IR.SetVariable("Global.SourceMediaplayer_PR", 1);
      IR.SetVariable("Global.SourceBluray_PR", 0);    
      IR.SetVariable("Global.SourceFM_AU", 0);
      IR.SetVariable("Global.SourceBT_AU", 0);
      IR.SetVariable("Global.SourceNvidiaShield_TV", 0);
      IR.SetVariable("Global.SourceNvidiaShield_PR", 0);
      
      IR.SetVariable("Global.SAT_InUse", 0);
      IR.SetVariable("Global.Mediaplayer_InUse", 1);
      IR.SetVariable("Global.Bluray_InUse", 0); 
      IR.SetVariable("Global.SmartTV_InUse", 0);     
      IR.SetVariable("Global.FM_InUse", 0);
      IR.SetVariable("Global.BT_InUse", 0);
      IR.SetVariable("Global.NvidiaShield_InUse", 0);
   
      IR.SetVariable("Global.TV_InUse", 0);
      IR.SetVariable("Global.PR_InUse", 1);      
      IR.SetVariable("Global.AU_InUse", 0);
      IR.SetVariable("Global.System_InUse", 1);
      IR.SetVariable("Global.System_NotInUse", 0);
      
      IR.SetVariable("Global.Popup_Mediaplayer_SelectP1", 1);
      IR.SetVariable("Global.Popup_Mediaplayer_SelectP2", 0);
   }
   this.setBlurayPR_IsOn = function() {
      IR.SetVariable("Global.SourceSAT_TV", 0);
      IR.SetVariable("Global.SourceMediaplayer_TV", 0);
      IR.SetVariable("Global.SourceBluray_TV", 0);
      IR.SetVariable("Global.SourceSmartTV_TV", 0);
      IR.SetVariable("Global.SourceSAT_PR", 0);
      IR.SetVariable("Global.SourceMediaplayer_PR", 0);
      IR.SetVariable("Global.SourceBluray_PR", 1);    
      IR.SetVariable("Global.SourceFM_AU", 0);
      IR.SetVariable("Global.SourceBT_AU", 0);
      IR.SetVariable("Global.SourceNvidiaShield_TV", 0);
      IR.SetVariable("Global.SourceNvidiaShield_PR", 0);
      
      IR.SetVariable("Global.SAT_InUse", 0);
      IR.SetVariable("Global.Mediaplayer_InUse", 0);
      IR.SetVariable("Global.Bluray_InUse", 1); 
      IR.SetVariable("Global.SmartTV_InUse", 0);  
      IR.SetVariable("Global.FM_InUse", 0);
      IR.SetVariable("Global.BT_InUse", 0);
      IR.SetVariable("Global.NvidiaShield_InUse", 0);
   
      IR.SetVariable("Global.TV_InUse", 0);
      IR.SetVariable("Global.PR_InUse", 1);      
      IR.SetVariable("Global.AU_InUse", 0);
      IR.SetVariable("Global.System_InUse", 1);
      IR.SetVariable("Global.System_NotInUse", 0);
      
      IR.SetVariable("Global.Popup_Bluray_SelectP1", 1);
      IR.SetVariable("Global.Popup_Bluray_SelectP2", 0);
   }
   this.setNvidiaShieldPR_IsOn = function() {
      IR.SetVariable("Global.SourceSAT_TV", 0);
      IR.SetVariable("Global.SourceMediaplayer_TV", 0);
      IR.SetVariable("Global.SourceBluray_TV", 0);
      IR.SetVariable("Global.SourceSmartTV_TV", 0);
      IR.SetVariable("Global.SourceSAT_PR", 0);
      IR.SetVariable("Global.SourceMediaplayer_PR", 0);
      IR.SetVariable("Global.SourceBluray_PR", 0);  
      IR.SetVariable("Global.SourceFM_AU", 0);
      IR.SetVariable("Global.SourceBT_AU", 0);
      IR.SetVariable("Global.SourceNvidiaShield_TV", 0);
      IR.SetVariable("Global.SourceNvidiaShield_PR", 1);
      
      IR.SetVariable("Global.SAT_InUse", 0);
      IR.SetVariable("Global.Mediaplayer_InUse", 0);
      IR.SetVariable("Global.Bluray_InUse", 0); 
      IR.SetVariable("Global.SmartTV_InUse", 0);  
      IR.SetVariable("Global.FM_InUse", 0);
      IR.SetVariable("Global.BT_InUse", 0);
      IR.SetVariable("Global.NvidiaShield_InUse", 1);
      
      IR.SetVariable("Global.TV_InUse", 0);
      IR.SetVariable("Global.PR_InUse", 1);     
      IR.SetVariable("Global.AU_InUse", 0);
      IR.SetVariable("Global.System_InUse", 1);
      IR.SetVariable("Global.System_NotInUse", 0); 
      
      IR.SetVariable("Global.Popup_NvidiaShield_SelectP1", 1);
      IR.SetVariable("Global.Popup_NvidiaShield_SelectP2", 0);  
   }
   this.setFMAU_IsOn = function() {
      IR.SetVariable("Global.SourceSAT_TV", 0);
      IR.SetVariable("Global.SourceMediaplayer_TV", 0);
      IR.SetVariable("Global.SourceBluray_TV", 0);
      IR.SetVariable("Global.SourceSmartTV_TV", 0);
      IR.SetVariable("Global.SourceSAT_PR", 0);
      IR.SetVariable("Global.SourceMediaplayer_PR", 0);
      IR.SetVariable("Global.SourceBluray_PR", 0);    
      IR.SetVariable("Global.SourceFM_AU", 1);
      IR.SetVariable("Global.SourceBT_AU", 0);
      IR.SetVariable("Global.SourceNvidiaShield_TV", 0);
      IR.SetVariable("Global.SourceNvidiaShield_PR", 0);
      
      IR.SetVariable("Global.SAT_InUse", 0);
      IR.SetVariable("Global.Mediaplayer_InUse", 0);
      IR.SetVariable("Global.Bluray_InUse", 0); 
      IR.SetVariable("Global.SmartTV_InUse", 0);  
      IR.SetVariable("Global.FM_InUse", 1);
      IR.SetVariable("Global.BT_InUse", 0);
      IR.SetVariable("Global.NvidiaShield_InUse", 0);
   
      IR.SetVariable("Global.TV_InUse", 0);
      IR.SetVariable("Global.PR_InUse", 0);      
      IR.SetVariable("Global.AU_InUse", 1);
      IR.SetVariable("Global.System_InUse", 1);
      IR.SetVariable("Global.System_NotInUse", 0);
   }
   this.setBTAU_IsOn = function() {
      IR.SetVariable("Global.SourceSAT_TV", 0);
      IR.SetVariable("Global.SourceMediaplayer_TV", 0);
      IR.SetVariable("Global.SourceBluray_TV", 0);
      IR.SetVariable("Global.SourceSmartTV_TV", 0);
      IR.SetVariable("Global.SourceSAT_PR", 0);
      IR.SetVariable("Global.SourceMediaplayer_PR", 0);
      IR.SetVariable("Global.SourceBluray_PR", 0);    
      IR.SetVariable("Global.SourceFM_AU", 0);
      IR.SetVariable("Global.SourceBT_AU", 1);
      IR.SetVariable("Global.SourceNvidiaShield_TV", 0);
      IR.SetVariable("Global.SourceNvidiaShield_PR", 0);
      
      IR.SetVariable("Global.SAT_InUse", 0);
      IR.SetVariable("Global.Mediaplayer_InUse", 0);
      IR.SetVariable("Global.Bluray_InUse", 0); 
      IR.SetVariable("Global.SmartTV_InUse", 0);  
      IR.SetVariable("Global.FM_InUse", 0);
      IR.SetVariable("Global.BT_InUse", 1);
      IR.SetVariable("Global.NvidiaShield_InUse", 0);
   
      IR.SetVariable("Global.TV_InUse", 0);
      IR.SetVariable("Global.PR_InUse", 0);      
      IR.SetVariable("Global.AU_InUse", 1);
      IR.SetVariable("Global.System_InUse", 1);
      IR.SetVariable("Global.System_NotInUse", 0);
   }
   this.setNo_IsOn = function() {
      IR.SetVariable("Global.SourceSAT_TV", 0);
      IR.SetVariable("Global.SourceMediaplayer_TV", 0);
      IR.SetVariable("Global.SourceBluray_TV", 0);
      IR.SetVariable("Global.SourceSmartTV_TV", 0);
      IR.SetVariable("Global.SourceSAT_PR", 0);
      IR.SetVariable("Global.SourceMediaplayer_PR", 0);
      IR.SetVariable("Global.SourceBluray_PR", 0);     
      IR.SetVariable("Global.SourceFM_AU", 0);
      IR.SetVariable("Global.SourceBT_AU", 0);
      IR.SetVariable("Global.SourceNvidiaShield_TV", 0);
      IR.SetVariable("Global.SourceNvidiaShield_PR", 0);
      
      IR.SetVariable("Global.SAT_InUse", 0);
      IR.SetVariable("Global.Mediaplayer_InUse", 0);
      IR.SetVariable("Global.Bluray_InUse", 0); 
      IR.SetVariable("Global.SmartTV_InUse", 0);  
      IR.SetVariable("Global.FM_InUse", 0);
      IR.SetVariable("Global.BT_InUse", 0);
      IR.SetVariable("Global.NvidiaShield_InUse", 0);
   
      IR.SetVariable("Global.TV_InUse", 0);
      IR.SetVariable("Global.PR_InUse", 0);    
      IR.SetVariable("Global.AU_InUse", 0);
      IR.SetVariable("Global.System_InUse", 0);
      IR.SetVariable("Global.System_NotInUse", 1);
   }
   
   //GROUP TV SAT
   this.TVtoTV_SATtoSAT = function() {
      IR.HideAllPopups();
      IR.ShowPopup("PopupSAT");
   }
   this.TVtoTV_MediaplayertoSAT = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATTV_IsOn();});
   }
   this.TVtoTV_BluraytoSAT = function() {
      var tf = 20000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=18000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATTV_IsOn();});
   }
   this.TVtoTV_SmartTVtoSAT = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_Exit", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATTV_IsOn();});
   }
   this.TVtoTV_NvidiaShieldtoSAT = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATTV_IsOn();});
   }
   this.PRtoTV_SATtoSAT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=10000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATTV_IsOn();});      
   }
   this.PRtoTV_MediaplayertoSAT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=7000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATTV_IsOn();}); 
   }
   this.PRtoTV_BluraytoSAT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=7000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATTV_IsOn();});
   }
   this.PRtoTV_NvidiaShieldtoSAT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=7000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATTV_IsOn();});
   }
   this.AUtoTV_FMtoSAT = function() {
      var tf = 13000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=3000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATTV_IsOn();});      
   }
   this.AUtoTV_BTtoSAT = function() {
      var tf = 5000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATTV_IsOn();});
   }
   this.NOtoTV_NOtoSAT = function() {
      var tf = 13000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_Info", "");}); 
      t += 2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");}); 
      t += 1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER ON", "");});
      t += 1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t += 8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t += 1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t += 2000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATTV_IsOn();});
   }
      
   //GROUP TV MEDIAPLAYER
   this.TVtoTV_SATtoMediaplayer = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerTV_IsOn();});
   }
   this.TVtoTV_MediaplayertoMediaplayer = function() {
      IR.HideAllPopups();
      IR.ShowPopup("PopupMediaplayer");
   }
   this.TVtoTV_BluraytoMediaplayer = function() {
      var tf = 20000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=18000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerTV_IsOn();});
   }
   this.TVtoTV_SmartTVtoMediaplayer = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_Exit", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerTV_IsOn();});
   }
   this.TVtoTV_NvidiaShieldtoMediaplayer = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerTV_IsOn();});
   }
   this.PRtoTV_SATtoMediaplayer = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=7000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerTV_IsOn();});      
   }
   this.PRtoTV_MediaplayertoMediaplayer = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=10000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerTV_IsOn();}); 
   }
   this.PRtoTV_BluraytoMediaplayer = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=7000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerTV_IsOn();});
   }
   this.PRtoTV_NvidiaShieldtoMediaplayer = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=7000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerTV_IsOn();});
   }
   this.AUtoTV_FMtoMediaplayer = function() {
      var tf = 13000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=3000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerTV_IsOn();});
   }
   this.AUtoTV_BTtoMediaplayer = function() {
      var tf = 5000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerTV_IsOn();});
   }
   this.NOtoTV_NOtoMediaplayer = function() {
      var tf = 13000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_Info", "");}); 
      t += 1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});     
      t += 1000;  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER ON", "");});
      t += 1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t += 8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t += 1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t += 2000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerTV_IsOn();});
   }
   
   //Group TV BLURAY
   this.TVtoTV_SATtoBluray = function() {
      var tf = 31000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=29000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayTV_IsOn();});
   }
   this.TVtoTV_BluraytoBluray = function() {
      IR.HideAllPopups();
      IR.ShowPopup("PopupBluray");
   }
   this.TVtoTV_MediaplayertoBluray = function() {
      var tf = 31000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=29000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayTV_IsOn();});
   }
   this.TVtoTV_SmartTVtoBluray = function() {
      var tf = 30000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_Exit", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=28000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayTV_IsOn();});
   }
   this.TVtoTV_NvidiaShieldtoBluray = function() {
      var tf = 30000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=28000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayTV_IsOn();});
   }
   this.PRtoTV_SATtoBluray = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=7000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayTV_IsOn();});      
   }
   this.PRtoTV_BluraytoBluray = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=10000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayTV_IsOn();}); 
   }
   this.PRtoTV_MediaplayertoBluray = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=7000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayTV_IsOn();});
   }
   this.PRtoTV_NvidiaShieldtoBluray = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=7000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayTV_IsOn();});
   }
   this.AUtoTV_FMtoBluray = function() {
      var tf = 32000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=22000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayTV_IsOn();});
   }
   this.AUtoTV_BTtoBluray = function() {
      var tf = 30000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=29000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayTV_IsOn();});
   }
   this.NOtoTV_NOtoBluray = function() {
      var tf = 30000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_Info", "");});       
      t += 2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});       
      t += 1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER ON", "");});
      t += 1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t += 8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t += 20000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayTV_IsOn();});
   }

   //Group TV NVIDIA
   this.TVtoTV_SATtoNvidiaShield = function() {
      var tf = 31000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=29000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldTV_IsOn();});
   }
   this.TVtoTV_BluraytoBluray = function() {
      IR.HideAllPopups();
      IR.ShowPopup("PopupBluray");
   }
   this.TVtoTV_MediaplayertoBluray = function() {
      var tf = 31000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=29000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldTV_IsOn();});
   }
   this.TVtoTV_SmartTVtoNvidiaShield = function() {
      var tf = 30000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_Exit", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=28000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldTV_IsOn();});
   }
   this.TVtoTV_NvidiaShieldtoNvidiaShield = function() {
      var tf = 30000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=28000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldTV_IsOn();});
   }
   this.PRtoTV_SATtoNvidiaShield = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=7000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldTV_IsOn();});      
   }
   this.PRtoTV_BluraytoNvidiaShield = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=10000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldTV_IsOn();}); 
   }
   this.PRtoTV_MediaplayertoNvidiaShield = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=7000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldTV_IsOn();});
   }
   this.AUtoTV_FMtoNvidiaShield = function() {
      var tf = 32000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=22000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldTV_IsOn();});
   }
   this.AUtoTV_BTtoNvidiaShield = function() {
      var tf = 30000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=29000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldTV_IsOn();});
   }
   this.NOtoTV_NOtoNvidiaShield = function() {
      var tf = 30000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_Info", "");});       
      t += 2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});       
      t += 1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER ON", "");});
      t += 1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t += 8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t += 20000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldTV_IsOn();});
   }
   
   //Group TV SMARTTV
   this.TVtoTV_SmartTVtoSmartTV = function() {
      IR.HideAllPopups();
      IR.ShowPopup("PopupSmartTV");
   }
   this.TVtoTV_MediaplayertoSmartTV = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_SmartTV", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SMARTTV, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSmartTV");});
      IR.SetTimeout(t, function() {that.setSmartTV_IsOn();});
   }
   this.TVtoTV_BluraytoSmartTV = function() {
      var tf = 20000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_SmartTV", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SMARTTV, "");});
      t+=18000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSmartTV");});
      IR.SetTimeout(t, function() {that.setSmartTV_IsOn();});
   }
   this.TVtoTV_NvidiaShieldtoSmartTV = function() {
      var tf = 20000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_SmartTV", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SMARTTV, "");});
      t+=18000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSmartTV");});
      IR.SetTimeout(t, function() {that.setSmartTV_IsOn();});
   }
   this.TVtoTV_SATtoSmartTV = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_SmartTV", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SMARTTV, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSmartTV");});
      IR.SetTimeout(t, function() {that.setSmartTV_IsOn();});
   }
   this.PRtoTV_SATtoSmartTV = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SMARTTV, "");});
      t+=8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=5000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_SmartTV", "");});
      t+=41000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSmartTV");});
      IR.SetTimeout(t, function() {that.setSmartTV_IsOn();}); 
   }
   this.PRtoTV_MediaplayertoSmartTV = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SMARTTV, "");});
      t+=8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=5000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_SmartTV", "");});
      t+=41000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSmartTV");});
      IR.SetTimeout(t, function() {that.setSmartTV_IsOn();}); 
   }
   this.PRtoTV_BluraytoSmartTV = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SMARTTV, "");});
      t+=8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=5000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_SmartTV", "");});
      t+=41000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSmartTV");});
      IR.SetTimeout(t, function() {that.setSmartTV_IsOn();});
   }
   this.PRtoTV_BluraytoSmartTV = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SMARTTV, "");});
      t+=8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=5000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_SmartTV", "");});
      t+=41000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSmartTV");});
      IR.SetTimeout(t, function() {that.setSmartTV_IsOn();});
   }
   this.AUtoTV_FMtoSmartTV = function() {
      var tf = 13000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SMARTTV, "");});
      t+=9000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=3000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_SmartTV", "");});
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSmartTV");});
      IR.SetTimeout(t, function() {that.setSmartTV_IsOn();});
   }
   this.AUtoTV_BTtoSmartTV = function() {
      var tf = 5000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SMARTTV, "");});
      t+=5000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_SmartTV", "");});
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSmartTV");});
      IR.SetTimeout(t, function() {that.setSmartTV_IsOn();});
   }
   this.NOtoTV_NOtoSmartTV = function() {
      var tf = 14000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_Info", "");});       
      t += 2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});       
      t += 1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER ON", "");});
      t += 9000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t += 1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SMARTTV, "");});
      t += 1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_SmartTV", "");});
      t += 2000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSmartTV");});
      IR.SetTimeout(t, function() {that.setSmartTV_IsOn();});
   }
   
   //Group PR SAT
   this.PRtoPR_SATtoSAT = function() {
      IR.HideAllPopups();
      IR.ShowPopup("PopupSAT");
   }
   this.PRtoPR_MediaplayertoSAT = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATPR_IsOn();});
   }
   this.PRtoPR_BluraytoSAT = function() {
      var tf = 21000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=19000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATPR_IsOn();});
   }
   this.PRtoPR_NvidiaShieldtoSAT = function() {
      var tf = 21000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=19000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATPR_IsOn();});
   }
   this.TVtoPR_SmartTVtoSAT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATPR_IsOn();}); 
   }
   this.TVtoPR_SATtoSAT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=56000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATPR_IsOn();});      
   }
   this.TVtoPR_MediaplayertoSAT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATPR_IsOn();}); 
   }
   this.TVtoPR_BluraytoSAT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATPR_IsOn();});
   }
   this.TVtoPR_NvidiaShieldtoSAT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATPR_IsOn();});
   }
   this.AUtoPR_FMtoSAT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=55000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATPR_IsOn();});
   }
   this.AUtoPR_BTtoSAT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATPR_IsOn();});
   }
   this.NOtoPR_NOtoSAT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER ON", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_SAT, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATPR_IsOn();});
   }
   
   //Group PR MEDIAPLAYER
   this.PRtoPR_MediaplayertoMediaplayer = function() {
      IR.HideAllPopups();
      IR.ShowPopup("PopupMediaplayer");
   }
   this.PRtoPR_SATtoMediaplayer = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerPR_IsOn();});
   }
   this.PRtoPR_BluraytoMediaplayer = function() {
      var tf = 21000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=19000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerPR_IsOn();});
   }
   this.PRtoPR_NvidiaShieldtoMediaplayer = function() {
      var tf = 21000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=19000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerPR_IsOn();});
   }
   this.TVtoPR_SmartTVtoMediaplayer = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerPR_IsOn();}); 
   }
   this.TVtoPR_MediaplayertoMediaplayer = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=56000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerPR_IsOn();});      
   }
   this.TVtoPR_SATtoMediaplayer = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=53000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerPR_IsOn();}); 
   }
   this.TVtoPR_BluraytoMediaplayer = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=53000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerPR_IsOn();});
   }
   this.TVtoPR_NvidiaShieldtoMediaplayer = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=53000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerPR_IsOn();});
   }
   this.AUtoPR_FMtoMediaplayer = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=55000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerPR_IsOn();});
   }
   this.AUtoPR_BTtoMediaplayer = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerPR_IsOn();});
   }
   this.NOtoPR_NOtoMediaplayer = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER ON", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("Power", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_MEDIAPLAYER, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupMediaplayer");});
      IR.SetTimeout(t, function() {that.setMediaplayerPR_IsOn();});
   }
   
   //Group PR BLURAY
   this.PRtoPR_BluraytoBluray = function() {
      IR.HideAllPopups();
      IR.ShowPopup("PopupBluray");
   }
   this.PRtoPR_SATtoBluray = function() {
      var tf = 31000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=29000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayPR_IsOn();});
   }
   this.PRtoPR_MediaplayertoBluray = function() {
      var tf = 31000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=29000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayPR_IsOn();});
   }
   this.PRtoPR_NvidiaShieldtoBluray = function() {
      var tf = 31000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=29000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayPR_IsOn();});
   }
   this.TVtoPR_SmartTVtoBluray = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayPR_IsOn();}); 
   }
   this.TVtoPR_BluraytoBluray = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=56000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayPR_IsOn();});      
   }
   this.TVtoPR_SATtoBluray = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=53000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayPR_IsOn();}); 
   }
   this.TVtoPR_NvidiaShieldtoBluray = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=53000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayPR_IsOn();}); 
   }
   this.TVtoPR_MediaplayertoBluray = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=53000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayPR_IsOn();});
   }
   this.AUtoPR_FMtoBluray = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=55000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayPR_IsOn();});
   }
   this.AUtoPR_BTtoBluray = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayPR_IsOn();});
   }
   this.NOtoPR_NOtoBluray = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER ON", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BLURAY, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBluray");});
      IR.SetTimeout(t, function() {that.setBlurayPR_IsOn();});
   }
   //Group PR NVIDIA
   this.PRtoPR_BluraytoBluray = function() {
      IR.HideAllPopups();
      IR.ShowPopup("PopupBluray");
   }
   this.PRtoPR_SATtoNvidiaShield = function() {
      var tf = 31000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NVIDIA, "");});
      t+=29000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldPR_IsOn();});
   }
   this.PRtoPR_MediaplayertoNvidiaShield = function() {
      var tf = 31000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NVIDIA, "");});
      t+=29000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldPR_IsOn();});
   }
   this.TVtoPR_SmartTVtoNvidiaShield = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NVIDIA, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldPR_IsOn();}); 
   }
   this.TVtoPR_BluraytoNvidiaShield = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=56000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldPR_IsOn();});      
   }
   this.TVtoPR_SATtoNvidiaShield = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NVIDIA, "");});
      t+=53000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldPR_IsOn();}); 
   }
   this.TVtoPR_MediaplayertoNvidiaShield = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NVIDIA, "");});
      t+=53000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldPR_IsOn();});
   }
   this.AUtoPR_FMtoNvidiaShield = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NVIDIA, "");});
      t+=55000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldPR_IsOn();});
   }
   this.AUtoPR_BTtoNvidiaShield = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NVIDIA, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldPR_IsOn();});
   }
   this.NOtoPR_NOtoNvidiaShield = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOn();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_DOWN", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER ON", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NVIDIA, "");});
      t+=54000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupNvidia");});
      IR.SetTimeout(t, function() {that.setNvidiaShieldPR_IsOn();});
   }
   /////
   /*****/
   //GROUP AU FM
   this.AUtoAU_FMtoFM = function() {
      IR.HideAllPopups();
      IR.ShowPopup("PopupFM");
   }
   this.TVtoAU_SATtoFM = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_FM, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupFM");});
      IR.SetTimeout(t, function() {that.setFMAU_IsOn();});
   }
   this.TVtoAU_MediaplayertoFM = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_FM, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupFM");});
      IR.SetTimeout(t, function() {that.setFMAU_IsOn();});
   }
   this.TVtoAU_BluraytoFM = function() {
      var tf = 21000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_FM, "");});
      t+=19000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupFM");});
      IR.SetTimeout(t, function() {that.setFMAU_IsOn();});
   }
   this.TVtoAU_NvidiaShieldtoFM = function() {
      var tf = 21000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_FM, "");});
      t+=19000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupFM");});
      IR.SetTimeout(t, function() {that.setFMAU_IsOn();});
   }
   this.TVtoAU_SmartTVtoFM = function() {
      var tf = 5000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_FM, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupFM");});
      IR.SetTimeout(t, function() {that.setFMAU_IsOn();});
   }
   this.PRtoAU_SATtoFM = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_FM, "");});
      t+=55000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupFM");});
      IR.SetTimeout(t, function() {that.setFMAU_IsOn();}); 
   }
   this.PRtoAU_MediaplayertoFM = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_FM, "");});
      t+=55000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupFM");});
      IR.SetTimeout(t, function() {that.setFMAU_IsOn();}); 
   }
   this.PRtoAU_BluraytoFM = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_FM, "");});
      t+=55000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupFM");});
      IR.SetTimeout(t, function() {that.setFMAU_IsOn();}); 
   }
   this.PRtoAU_NvidiaShieldtoFM = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_FM, "");});
      t+=55000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupFM");});
      IR.SetTimeout(t, function() {that.setFMAU_IsOn();}); 
   }
   this.AUtoAU_BTtoFM = function() {
      var tf = 5000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_FM, "");});
      t+=4000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupFM");});
      IR.SetTimeout(t, function() {that.setFMAU_IsOn();});
   }
   this.NOtoAU_NOtoFM = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER ON", "");});
      t+=3000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_FM, "");});
      t+=3000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupFM");});
      IR.SetTimeout(t, function() {that.setFMAU_IsOn();});
   }    
   
   //GROUP AU BT
   this.AUtoAU_BTtoBT = function() {
      IR.HideAllPopups();
      IR.ShowPopup("PopupBT");
   }
   this.TVtoAU_SATtoBT = function() {
      var tf = 4000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BT, "");});
      t+=3000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBT");});
      IR.SetTimeout(t, function() {that.setBTAU_IsOn();});
   }
   this.TVtoAU_MediaplayertoBT = function() {
      var tf = 4000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BT, "");});
      t+=3000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBT");});
      IR.SetTimeout(t, function() {that.setBTAU_IsOn();});
   }
   this.TVtoAU_BluraytoBT = function() {
      var tf = 20000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BT, "");});
      t+=19000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBT");});
      IR.SetTimeout(t, function() {that.setBTAU_IsOn();});
   }
   this.TVtoAU_NvidiaShieldtoBT = function() {
      var tf = 20000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BT, "");});
      t+=19000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBT");});
      IR.SetTimeout(t, function() {that.setBTAU_IsOn();});
   }
   this.TVtoAU_SmartTVtoBT = function() {
      var tf = 6000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_Exit", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BT, "");});
      t+=5000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBT");});
      IR.SetTimeout(t, function() {that.setBTAU_IsOn();});
   }
   this.PRtoAU_SATtoBT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BT, "");});
      t+=8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBT");});
      IR.SetTimeout(t, function() {that.setBTAU_IsOn();}); 
   }
   this.PRtoAU_MediaplayertoBT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BT, "");});
      t+=8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBT");});
      IR.SetTimeout(t, function() {that.setBTAU_IsOn();}); 
   }
   this.PRtoAU_BluraytoBT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BT, "");});
      t+=8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBT");});
      IR.SetTimeout(t, function() {that.setBTAU_IsOn();}); 
   }
   this.PRtoAU_BluraytoBT = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BT, "");});
      t+=8000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=46000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBT");});
      IR.SetTimeout(t, function() {that.setBTAU_IsOn();}); 
   }
   this.AUtoAU_FMtoBT = function() {
      var tf = 13000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BT, "");});
      t+=9000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=3000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBT");});
      IR.SetTimeout(t, function() {that.setBTAU_IsOn();});
   }
   this.NOtoAU_NOtoBT = function() {
      var tf = 14000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOn", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER ON", "");});
      t+=3000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_BT, "");});
      t+=7000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_HDMI1", "");});
      t+=3000;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupBT");});
      IR.SetTimeout(t, function() {that.setBTAU_IsOn();});
   }   
   /*****/
   /////
   
   //Group NO
   this.PRtoNO_BluraytoNO = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NO, "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=3000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER OFF", "");});
      t+=52000;
      IR.SetTimeout(t, function() {openMainPopup();});
      IR.SetTimeout(t, function() {that.setNo_IsOn();});
   }
   this.PRtoNO_NvidiaShieldtoNO = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NO, "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=3000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER OFF", "");});
      t+=52000;
      IR.SetTimeout(t, function() {openMainPopup();});
      IR.SetTimeout(t, function() {that.setNo_IsOn();});
   }
   this.PRtoNO_SATtoNO = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NO, "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t+=3000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER OFF", "");});
      t+=52000;
      IR.SetTimeout(t, function() {openMainPopup();});
      IR.SetTimeout(t, function() {that.setNo_IsOn();});
   }
   this.PRtoNO_MediaplayertoNO = function() {
      var tf = 60000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.JVC.powerOff();});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("Screen_UP", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NO, "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=3000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER OFF", "");});
      t+=52000;
      IR.SetTimeout(t, function() {openMainPopup();});
      IR.SetTimeout(t, function() {that.setNo_IsOn();});
   }
   this.TVtoNO_SATtoNO = function() {
      var tf = 8000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t += 2000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NO, "");});
      t += 2000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("SAT_PowerToggle", "");});
      t += 3000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER OFF", "");});
      t += 3000;
      IR.SetTimeout(t, function() {openMainPopup();});
      IR.SetTimeout(t, function() {that.setNo_IsOn();});
   }
   this.TVtoNO_MediaplayertoNO = function() {
      var tf = 8000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NO, "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.DuneHD.Set("standby", "");});
      t+=3000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER OFF", "");});
      t+=3000;
      IR.SetTimeout(t, function() {openMainPopup();});
      IR.SetTimeout(t, function() {that.setNo_IsOn();});
   }
   this.TVtoNO_BluraytoNO = function() {
      var tf = 22000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NO, "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("BR_PowerToggle", "");});
      t+=3000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER OFF", "");});
      t+=17000;
      IR.SetTimeout(t, function() {openMainPopup();});
      IR.SetTimeout(t, function() {that.setNo_IsOn();});
   }
   this.TVtoNO_BluraytoNO = function() {
      var tf = 22000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NO, "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.GlobalCache.Set("NV_PowerOff", "");});
      t+=3000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER OFF", "");});
      t+=17000;
      IR.SetTimeout(t, function() {openMainPopup();});
      IR.SetTimeout(t, function() {that.setNo_IsOn();});
   }
   this.TVtoNO_SmartTVtoNO = function() {
      var tf = 7000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t += 1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NO, "");});
      t += 3000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER OFF", "");});
      t += 3000;
      IR.SetTimeout(t, function() {openMainPopup();});
      IR.SetTimeout(t, function() {that.setNo_IsOn();});
   }
   this.AUtoNO_FMtoNO = function() {
      var tf = 7000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NO, "");});
      t+=4000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER OFF", "");});
      t+=3000;
      IR.SetTimeout(t, function() {openMainPopup();});
      IR.SetTimeout(t, function() {that.setNo_IsOn();});      
   }
   this.AUtoNO_BTtoNO = function() {
      var tf = 8000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});     
      IR.SetTimeout(t, function() {that.GlobalCache.Set("LG_PowerOff", "");});
      t+=1000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set(input_NO, "");});
      t+=4000;
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("Select Zone 1", "");});  
      IR.SetTimeout(t, function() {that.OnkyoReceiver.Set("POWER OFF", "");});
      t+=3000;
      IR.SetTimeout(t, function() {openMainPopup();});
      IR.SetTimeout(t, function() {that.setNo_IsOn();});
   }
   
   
   
   
   
   this.TVtoPR_PrototoType = function() {
      //Wait
      var tf = 12000;
      var tc = 0;
      var intID = IR.SetInterval(waitDiscrete, function() {
         tc += waitDiscrete;
         var level = (tc/tf)*100;
         IR.GetItem("PopupWait").GetItem("level").Value = level;
         level = level.toFixed();
         var txt = level + "%";
         IR.GetItem("PopupWait").GetItem("txt").Text = txt;
         if (tc >= tf)
            IR.ClearInterval(intID);
      });
      var t = 0;
      //
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupWait")});
      //Do stepper here
      IR.SetTimeout(t, function() {IR.HideAllPopups();});
      IR.SetTimeout(t, function() {IR.ShowPopup("PopupSAT");});
      IR.SetTimeout(t, function() {that.setSATTV_IsOn();});
      IR.SetTimeout(t, function() {IR.HidePopup("PopupWait")});
   }
   
}