var SourceSelector = function(switchLogic) {
   var that = this;
   this.switchLogic = switchLogic;
   
   this.selectSATTV = function() {
      IR.Log("SAT TV select");
      var satTV_IsOn = IR.GetVariable("Global.SourceSAT_TV");
      var mediaplayerTV_IsOn = IR.GetVariable("Global.SourceMediaplayer_TV");
      var blurayTV_IsOn = IR.GetVariable("Global.SourceBluray_TV");
      var smartTVTV_IsOn = IR.GetVariable("Global.SourceSmartTV_TV");
      var satPR_IsOn = IR.GetVariable("Global.SourceSAT_PR");
      var mediaplayerPR_IsOn = IR.GetVariable("Global.SourceMediaplayer_PR");
      var blurayPR_IsOn = IR.GetVariable("Global.SourceBluray_PR");
      var fmAU_IsOn = IR.GetVariable("Global.SourceFM_AU");
      var btAU_IsOn = IR.GetVariable("Global.SourceBT_AU");
      if (satTV_IsOn == 1) {
         IR.Log("TV>TV | SAT>SAT");
         this.switchLogic.TVtoTV_SATtoSAT();
      } else if (mediaplayerTV_IsOn == 1) {
         IR.Log("TV>TV | MediaPlayer>SAT");
         this.switchLogic.TVtoTV_MediaplayertoSAT();
      } else if (blurayTV_IsOn == 1) {
         IR.Log("TV>TV | Bluray>SAT");
         this.switchLogic.TVtoTV_BluraytoSAT();
      } else if (smartTVTV_IsOn == 1) {
         IR.Log("TV>TV | SmartTV>SAT");
         this.switchLogic.TVtoTV_SmartTVtoSAT();
      } else if (satPR_IsOn == 1) {
         IR.Log("PR>TV | SAT>SAT");
         this.switchLogic.PRtoTV_SATtoSAT();
      } else if (mediaplayerPR_IsOn == 1) {
         IR.Log("PR>TV | Mediaplayer>SAT");
         this.switchLogic.PRtoTV_MediaplayertoSAT();
      } else if (blurayPR_IsOn == 1) {
         IR.Log("PR>TV | Bluray>SAT");
         this.switchLogic.PRtoTV_BluraytoSAT();
      } else if (fmAU_IsOn == 1) {
         IR.Log("AUtoTV | FM>SAT");
         this.switchLogic.AUtoTV_FMtoSAT();
      } else if (btAU_IsOn == 1) {
         IR.Log("AUtoTV | BT>SAT");
         this.switchLogic.AUtoTV_BTtoSAT();
      } else {
         IR.Log("NO>TV | No>SAT");
         this.switchLogic.NOtoTV_NOtoSAT();
      }
   }
   
   this.selectMediaplayerTV = function() {
      IR.Log("Mediaplayer TV select");
      var satTV_IsOn = IR.GetVariable("Global.SourceSAT_TV");
      var mediaplayerTV_IsOn = IR.GetVariable("Global.SourceMediaplayer_TV");
      var blurayTV_IsOn = IR.GetVariable("Global.SourceBluray_TV");
      var smartTVTV_IsOn = IR.GetVariable("Global.SourceSmartTV_TV");
      var satPR_IsOn = IR.GetVariable("Global.SourceSAT_PR");
      var mediaplayerPR_IsOn = IR.GetVariable("Global.SourceMediaplayer_PR");
      var blurayPR_IsOn = IR.GetVariable("Global.SourceBluray_PR");
      var fmAU_IsOn = IR.GetVariable("Global.SourceFM_AU");
      var btAU_IsOn = IR.GetVariable("Global.SourceBT_AU");
      if (satTV_IsOn == 1) {
         IR.Log("TV>TV | SAT>MediaPlayer");
         this.switchLogic.TVtoTV_SATtoMediaplayer();
      } else if (mediaplayerTV_IsOn == 1) {
         IR.Log("TV>TV | MediaPlayer>MediaPlayer");
         this.switchLogic.TVtoTV_MediaplayertoMediaplayer();
      } else if (blurayTV_IsOn == 1) {
         IR.Log("TV>TV | Bluray>Mediaplayer");
         this.switchLogic.TVtoTV_BluraytoMediaplayer();
      } else if (smartTVTV_IsOn == 1) {
         IR.Log("TV>TV | SmartTV>Mediaplayer");
         this.switchLogic.TVtoTV_SmartTVtoMediaplayer();
      } else if (satPR_IsOn == 1) {
         IR.Log("PR>TV | SAT>Mediaplayer");
         this.switchLogic.PRtoTV_SATtoMediaplayer();
      } else if (mediaplayerPR_IsOn == 1) {
         IR.Log("PR>TV | Mediaplayer>Mediaplayer");
         this.switchLogic.PRtoTV_MediaplayertoMediaplayer();
      } else if (blurayPR_IsOn == 1) {
         IR.Log("PR>TV | Bluray>Mediaplayer");
         this.switchLogic.PRtoTV_BluraytoMediaplayer();
      } else if (fmAU_IsOn == 1) {
         IR.Log("AU>TV | FM>Mediaplayer");
         this.switchLogic.AUtoTV_FMtoMediaplayer();
      } else if (btAU_IsOn == 1) {        
         IR.Log("AU>TV | BT>Mediaplayer"); 
         this.switchLogic.AUtoTV_BTtoMediaplayer();      
      } else {
         IR.Log("NO>TV | No>Mediaplayer");
         this.switchLogic.NOtoTV_NOtoMediaplayer();
      }
   }
   
   this.selectBlurayTV = function() {
      IR.Log("Bluray TV select");
      var satTV_IsOn = IR.GetVariable("Global.SourceSAT_TV");
      var mediaplayerTV_IsOn = IR.GetVariable("Global.SourceMediaplayer_TV");
      var blurayTV_IsOn = IR.GetVariable("Global.SourceBluray_TV");
      var smartTVTV_IsOn = IR.GetVariable("Global.SourceSmartTV_TV");
      var satPR_IsOn = IR.GetVariable("Global.SourceSAT_PR");
      var mediaplayerPR_IsOn = IR.GetVariable("Global.SourceMediaplayer_PR");
      var blurayPR_IsOn = IR.GetVariable("Global.SourceBluray_PR");
      var fmAU_IsOn = IR.GetVariable("Global.SourceFM_AU");
      var btAU_IsOn = IR.GetVariable("Global.SourceBT_AU");
      if (satTV_IsOn == 1) {
         IR.Log("TV>TV | SAT>Bluray");
         this.switchLogic.TVtoTV_SATtoBluray();
      } else if (mediaplayerTV_IsOn == 1) {
         IR.Log("TV>TV | MediaPlayer>Bluray");
         this.switchLogic.TVtoTV_MediaplayertoBluray();
      } else if (blurayTV_IsOn == 1) {
         IR.Log("TV>TV | Bluray>Bluray");
         this.switchLogic.TVtoTV_BluraytoBluray();
      } else if (smartTVTV_IsOn == 1) {
         IR.Log("TV>TV | SmartTV>Bluray");
         this.switchLogic.TVtoTV_SmartTVtoBluray();
      } else if (satPR_IsOn == 1) {
         IR.Log("PR>TV | SAT>Bluray");
         this.switchLogic.PRtoTV_SATtoBluray();
      } else if (mediaplayerPR_IsOn == 1) {
         IR.Log("PR>TV | Mediaplayer>Bluray");
         this.switchLogic.PRtoTV_MediaplayertoBluray();
      } else if (blurayPR_IsOn == 1) {
         IR.Log("PR>TV | Bluray>Bluray");
         this.switchLogic.PRtoTV_BluraytoBluray();
      } else if (fmAU_IsOn == 1) {
         IR.Log("AU>TV | FM>Bluray");
         this.switchLogic.AUtoTV_FMtoBluray();
      } else if (btAU_IsOn == 1) {
         IR.Log("AU>TV | BT>Bluray");
         this.switchLogic.AUtoTV_BTtoBluray();
      } else {
         IR.Log("NO>TV | No>Bluray");
         this.switchLogic.NOtoTV_NOtoBluray();
      }   
   }
   
   this.selectSmartTVTV = function() {
      IR.Log("SmartTV TV select");
      var satTV_IsOn = IR.GetVariable("Global.SourceSAT_TV");
      var mediaplayerTV_IsOn = IR.GetVariable("Global.SourceMediaplayer_TV");
      var blurayTV_IsOn = IR.GetVariable("Global.SourceBluray_TV");
      var smartTVTV_IsOn = IR.GetVariable("Global.SourceSmartTV_TV");
      var satPR_IsOn = IR.GetVariable("Global.SourceSAT_PR");
      var mediaplayerPR_IsOn = IR.GetVariable("Global.SourceMediaplayer_PR");
      var blurayPR_IsOn = IR.GetVariable("Global.SourceBluray_PR");
      var fmAU_IsOn = IR.GetVariable("Global.SourceFM_AU");
      var btAU_IsOn = IR.GetVariable("Global.SourceBT_AU");
      if (satTV_IsOn == 1) {
         IR.Log("TV>TV | SAT>SmartTV");
         this.switchLogic.TVtoTV_SATtoSmartTV();
      } else if (mediaplayerTV_IsOn == 1) {
         IR.Log("TV>TV | MediaPlayer>SmartTV");
         this.switchLogic.TVtoTV_MediaplayertoSmartTV();
      } else if (blurayTV_IsOn == 1) {
         IR.Log("TV>TV | Bluray>SmartTV");
         this.switchLogic.TVtoTV_BluraytoSmartTV();
      } else if (smartTVTV_IsOn == 1) {
         IR.Log("TV>TV | SmartTV>SmartTV");
         this.switchLogic.TVtoTV_SmartTVtoSmartTV();
      } else if (satPR_IsOn == 1) {
         IR.Log("PR>TV | SAT>SmartTV");
         this.switchLogic.PRtoTV_SATtoSmartTV();
      } else if (mediaplayerPR_IsOn == 1) {
         IR.Log("PR>TV | Mediaplayer>SmartTV");
         this.switchLogic.PRtoTV_MediaplayertoSmartTV();
      } else if (blurayPR_IsOn == 1) {
         IR.Log("PR>TV | Bluray>SmartTV");
         this.switchLogic.PRtoTV_BluraytoSmartTV();
      } else if (fmAU_IsOn == 1) {
         IR.Log("AU>TV | FM>SmartTV");
         this.switchLogic.AUtoTV_FMtoSmartTV();
      } else if (btAU_IsOn == 1) {
         IR.Log("AU>TV | BT>SmartTV");
         this.switchLogic.AUtoTV_BTtoSmartTV();
      } else {
         IR.Log("NO>TV | No>SmartTV");
         this.switchLogic.NOtoTV_NOtoSmartTV();
      }   
   }
   
   this.selectSATPR = function() {
      IR.Log("SAT PR select");
      var satTV_IsOn = IR.GetVariable("Global.SourceSAT_TV");
      var mediaplayerTV_IsOn = IR.GetVariable("Global.SourceMediaplayer_TV");
      var blurayTV_IsOn = IR.GetVariable("Global.SourceBluray_TV");
      var smartTVTV_IsOn = IR.GetVariable("Global.SourceSmartTV_TV");
      var satPR_IsOn = IR.GetVariable("Global.SourceSAT_PR");
      var mediaplayerPR_IsOn = IR.GetVariable("Global.SourceMediaplayer_PR");
      var blurayPR_IsOn = IR.GetVariable("Global.SourceBluray_PR");
      var fmAU_IsOn = IR.GetVariable("Global.SourceFM_AU");
      var btAU_IsOn = IR.GetVariable("Global.SourceBT_AU");
      if (satTV_IsOn == 1) {
         IR.Log("TV>PR | SAT>SAT");                 
         this.switchLogic.TVtoPR_SATtoSAT();
      } else if (mediaplayerTV_IsOn == 1) {
         IR.Log("TV>PR | MediaPlayer>SAT");
         this.switchLogic.TVtoPR_MediaplayertoSAT();
      } else if (blurayTV_IsOn == 1) {
         IR.Log("TV>PR | Bluray>SAT");
         this.switchLogic.TVtoPR_BluraytoSAT();
      } else if (smartTVTV_IsOn == 1) {
         IR.Log("TV>PR | SmartTV>SAT");
         this.switchLogic.TVtoPR_SmartTVtoSAT();
      } else if (satPR_IsOn == 1) {
         IR.Log("PR>PR | SAT>SAT");                 
         this.switchLogic.PRtoPR_SATtoSAT();
      } else if (mediaplayerPR_IsOn == 1) {
         IR.Log("PR>PR | Mediaplayer>SAT");
         this.switchLogic.PRtoPR_MediaplayertoSAT();
      } else if (blurayPR_IsOn == 1) {      
         IR.Log("PR>PR | Bluray>SAT");      
         this.switchLogic.PRtoPR_BluraytoSAT();
      } else if (fmAU_IsOn == 1) {
         IR.Log("AU>PR | FM>SAT");
         this.switchLogic.AUtoPR_FMtoSAT();
      } else if (btAU_IsOn == 1) {
         IR.Log("AU>PR | BT>SAT");
         this.switchLogic.AUtoPR_BTtoSAT();
      } else {
         IR.Log("NO>PR | No>SAT");
         this.switchLogic.NOtoPR_NOtoSAT();
      }   
   }
   
   this.selectMediaplayerPR = function() {
      IR.Log("Mediaplayer PR select");
      var satTV_IsOn = IR.GetVariable("Global.SourceSAT_TV");
      var mediaplayerTV_IsOn = IR.GetVariable("Global.SourceMediaplayer_TV");
      var blurayTV_IsOn = IR.GetVariable("Global.SourceBluray_TV");
      var smartTVTV_IsOn = IR.GetVariable("Global.SourceSmartTV_TV");
      var satPR_IsOn = IR.GetVariable("Global.SourceSAT_PR");
      var mediaplayerPR_IsOn = IR.GetVariable("Global.SourceMediaplayer_PR");
      var blurayPR_IsOn = IR.GetVariable("Global.SourceBluray_PR");
      var fmAU_IsOn = IR.GetVariable("Global.SourceFM_AU");
      var btAU_IsOn = IR.GetVariable("Global.SourceBT_AU");
      if (satTV_IsOn == 1) {
         IR.Log("TV>PR | SAT>MediaPlayer");
         this.switchLogic.TVtoPR_SATtoMediaplayer();
      } else if (mediaplayerTV_IsOn == 1) {
         IR.Log("TV>PR | MediaPlayer>MediaPlayer"); 
         this.switchLogic.TVtoPR_MediaplayertoMediaplayer();
      } else if (blurayTV_IsOn == 1) {
         IR.Log("TV>PR | Bluray>Mediaplayer");
         this.switchLogic.TVtoPR_BluraytoMediaplayer();
      } else if (smartTVTV_IsOn == 1) {
         IR.Log("TV>PR | SmartTV>Mediaplayer");
         this.switchLogic.TVtoPR_SmartTVtoMediaplayer();
      } else if (satPR_IsOn == 1) {
         IR.Log("PR>PR | SAT>Mediaplayer");
         this.switchLogic.PRtoPR_SATtoMediaplayer();
      } else if (mediaplayerPR_IsOn == 1) {
         IR.Log("PR>PR | Mediaplayer>Mediaplayer");
         this.switchLogic.PRtoPR_MediaplayertoMediaplayer();
      } else if (blurayPR_IsOn == 1) {
         IR.Log("PR>PR | Bluray>Mediaplayer");
         this.switchLogic.PRtoPR_BluraytoMediaplayer();
      } else if (fmAU_IsOn == 1) {
         IR.Log("AU>PR | FM>Mediaplayer");
         this.switchLogic.AUtoPR_FMtoMediaplayer();
      } else if (btAU_IsOn == 1) {
         IR.Log("BT>PR | BT>Mediaplayer");
         this.switchLogic.AUtoPR_BTtoMediaplayer();
      } else {
         IR.Log("NO>PR | No>Mediaplayer");
         this.switchLogic.NOtoPR_NOtoMediaplayer();
      }   
   }
   
   this.selectBlurayPR = function() {
      IR.Log("Bluray PR select");
      var satTV_IsOn = IR.GetVariable("Global.SourceSAT_TV");
      var mediaplayerTV_IsOn = IR.GetVariable("Global.SourceMediaplayer_TV");
      var blurayTV_IsOn = IR.GetVariable("Global.SourceBluray_TV");
      var smartTVTV_IsOn = IR.GetVariable("Global.SourceSmartTV_TV");
      var satPR_IsOn = IR.GetVariable("Global.SourceSAT_PR");
      var mediaplayerPR_IsOn = IR.GetVariable("Global.SourceMediaplayer_PR");
      var blurayPR_IsOn = IR.GetVariable("Global.SourceBluray_PR");
      var fmAU_IsOn = IR.GetVariable("Global.SourceFM_AU");
      var btAU_IsOn = IR.GetVariable("Global.SourceBT_AU");
      if (satTV_IsOn == 1) {
         IR.Log("TV>PR | SAT>Bluray");
         this.switchLogic.TVtoPR_SATtoBluray();
      } else if (mediaplayerTV_IsOn == 1) {
         IR.Log("TV>PR | MediaPlayer>Bluray");
         this.switchLogic.TVtoPR_MediaplayertoBluray();
      } else if (blurayTV_IsOn == 1) {
         IR.Log("TV>PR | Bluray>Bluray");
         this.switchLogic.TVtoPR_BluraytoBluray();
      } else if (smartTVTV_IsOn == 1) {
         IR.Log("TV>PR | SmartTV>Bluray");
         this.switchLogic.TVtoPR_SmartTVtoBluray();
      } else if (satPR_IsOn == 1) {
         IR.Log("PR>PR | SAT>Bluray");
         this.switchLogic.PRtoPR_SATtoBluray();
      } else if (mediaplayerPR_IsOn == 1) {
         IR.Log("PR>PR | Mediaplayer>Bluray");
         this.switchLogic.PRtoPR_MediaplayertoBluray();
      } else if (blurayPR_IsOn == 1) {
         IR.Log("PR>PR | Bluray>Bluray");
         this.switchLogic.PRtoPR_BluraytoBluray();
      } else if (fmAU_IsOn == 1) {
         IR.Log("AU>PR | FM>Bluray");
         this.switchLogic.AUtoPR_FMtoBluray();
      } else if (btAU_IsOn == 1) {
         IR.Log("AU>PR | BT>Bluray");
         this.switchLogic.AUtoPR_BTtoBluray();
      } else {
         IR.Log("NO>PR | No>Bluray");
         this.switchLogic.NOtoPR_NOtoBluray();
      }   
   }
   
   this.selectFMAU = function() {
      IR.Log("FM AU select");
      var satTV_IsOn = IR.GetVariable("Global.SourceSAT_TV");
      var mediaplayerTV_IsOn = IR.GetVariable("Global.SourceMediaplayer_TV");
      var blurayTV_IsOn = IR.GetVariable("Global.SourceBluray_TV");
      var smartTVTV_IsOn = IR.GetVariable("Global.SourceSmartTV_TV");
      var satPR_IsOn = IR.GetVariable("Global.SourceSAT_PR");
      var mediaplayerPR_IsOn = IR.GetVariable("Global.SourceMediaplayer_PR");
      var blurayPR_IsOn = IR.GetVariable("Global.SourceBluray_PR");
      var fmAU_IsOn = IR.GetVariable("Global.SourceFM_AU");
      var btAU_IsOn = IR.GetVariable("Global.SourceBT_AU");
      if (satTV_IsOn == 1) {
         IR.Log("TV>AU | SAT>FM");
         this.switchLogic.TVtoAU_SATtoFM();
      } else if (mediaplayerTV_IsOn == 1) {
         IR.Log("TV>AU | MediaPlayer>FM");
         this.switchLogic.TVtoAU_MediaplayertoFM();
      } else if (blurayTV_IsOn == 1) {
         IR.Log("TV>AU | Bluray>FM");
         this.switchLogic.TVtoAU_BluraytoFM();
      } else if (smartTVTV_IsOn == 1) {
         IR.Log("TV>AU | SmartTV>FM");
         this.switchLogic.TVtoAU_SmartTVtoFM();
      } else if (satPR_IsOn == 1) {
         IR.Log("PR>AU | SAT>FM");
         this.switchLogic.PRtoAU_SATtoFM();
      } else if (mediaplayerPR_IsOn == 1) {
         IR.Log("PR>AU | Mediaplayer>FM");
         this.switchLogic.PRtoAU_MediaplayertoFM();
      } else if (blurayPR_IsOn == 1) {
         IR.Log("PR>AU | Bluray>FM");
         this.switchLogic.PRtoAU_BluraytoFM();
      } else if (fmAU_IsOn == 1) {
         IR.Log("AU>AU | FM>FM");
         this.switchLogic.AUtoAU_FMtoFM();
      } else if (btAU_IsOn == 1) {
         IR.Log("AU>AU | BT>FM");
         this.switchLogic.AUtoAU_BTtoFM();
      } else {
         IR.Log("NO>AU | No>FM");
         this.switchLogic.NOtoAU_NOtoFM();
      }   
   }
   
   this.selectBTAU = function() {
      IR.Log("BT AU select");
      var satTV_IsOn = IR.GetVariable("Global.SourceSAT_TV");
      var mediaplayerTV_IsOn = IR.GetVariable("Global.SourceMediaplayer_TV");
      var blurayTV_IsOn = IR.GetVariable("Global.SourceBluray_TV");
      var smartTVTV_IsOn = IR.GetVariable("Global.SourceSmartTV_TV");
      var satPR_IsOn = IR.GetVariable("Global.SourceSAT_PR");
      var mediaplayerPR_IsOn = IR.GetVariable("Global.SourceMediaplayer_PR");
      var blurayPR_IsOn = IR.GetVariable("Global.SourceBluray_PR");
      var fmAU_IsOn = IR.GetVariable("Global.SourceFM_AU");
      var btAU_IsOn = IR.GetVariable("Global.SourceBT_AU");
      if (satTV_IsOn == 1) {
         IR.Log("TV>AU | SAT>BT");
         this.switchLogic.TVtoAU_SATtoBT();
      } else if (mediaplayerTV_IsOn == 1) {
         IR.Log("TV>AU | MediaPlayer>BT");
         this.switchLogic.TVtoAU_MediaplayertoBT();
      } else if (blurayTV_IsOn == 1) {
         IR.Log("TV>AU | Bluray>BT");
         this.switchLogic.TVtoAU_BluraytoBT();
      } else if (smartTVTV_IsOn == 1) {
         IR.Log("TV>AU | SmartTV>BT");
         this.switchLogic.TVtoAU_SmartTVtoBT();
      } else if (satPR_IsOn == 1) {
         IR.Log("PR>AU | SAT>BT");
         this.switchLogic.PRtoAU_SATtoBT();
      } else if (mediaplayerPR_IsOn == 1) {
         IR.Log("PR>AU | Mediaplayer>BT");
         this.switchLogic.PRtoAU_MediaplayertoBT();
      } else if (blurayPR_IsOn == 1) {
         IR.Log("PR>AU | Bluray>BT");
         this.switchLogic.PRtoAU_BluraytoBT();
      } else if (fmAU_IsOn == 1) {
         IR.Log("AU>AU | FM>BT");
         this.switchLogic.AUtoAU_FMtoBT();
      } else if (btAU_IsOn == 1) {
         IR.Log("AU>AU | BT>BT");
         this.switchLogic.AUtoAU_BTtoBT();
      } else {
         IR.Log("NO>AU | No>BT");
         this.switchLogic.NOtoAU_NOtoBT();
      }   
   }
   
   this.selectOff = function() {
      IR.Log("Off select");
      var satTV_IsOn = IR.GetVariable("Global.SourceSAT_TV");
      var mediaplayerTV_IsOn = IR.GetVariable("Global.SourceMediaplayer_TV");
      var blurayTV_IsOn = IR.GetVariable("Global.SourceBluray_TV");
      var smartTVTV_IsOn = IR.GetVariable("Global.SourceSmartTV_TV");
      var satPR_IsOn = IR.GetVariable("Global.SourceSAT_PR");
      var mediaplayerPR_IsOn = IR.GetVariable("Global.SourceMediaplayer_PR");
      var blurayPR_IsOn = IR.GetVariable("Global.SourceBluray_PR");
      var fmAU_IsOn = IR.GetVariable("Global.SourceFM_AU");
      var btAU_IsOn = IR.GetVariable("Global.SourceBT_AU");
      if (satTV_IsOn == 1) {
         IR.Log("TV>NO | SAT>No");
         this.switchLogic.TVtoNO_SATtoNO();
      } else if (mediaplayerTV_IsOn == 1) {
         IR.Log("TV>NO | MediaPlayer>No"); 
         this.switchLogic.TVtoNO_MediaplayertoNO();
      } else if (blurayTV_IsOn == 1) {
         IR.Log("TV>NO | Bluray>No");      
         this.switchLogic.TVtoNO_BluraytoNO();
      } else if (smartTVTV_IsOn == 1) {
         IR.Log("TV>NO | SmartTV>No"); 
         this.switchLogic.TVtoNO_SmartTVtoNO();
      } else if (satPR_IsOn == 1) {
         IR.Log("PR>NO | SAT>No");      
         this.switchLogic.PRtoNO_SATtoNO();
      } else if (mediaplayerPR_IsOn == 1) {
         IR.Log("PR>NO | Mediaplayer>No"); 
         this.switchLogic.PRtoNO_MediaplayertoNO();
      } else if (blurayPR_IsOn == 1) {
         IR.Log("PR>NO | Bluray>No");      
         this.switchLogic.PRtoNO_BluraytoNO();
      } else if (fmAU_IsOn == 1) {
         IR.Log("AU>NO | FM>No");
         this.switchLogic.AUtoNO_FMtoNO();
      } else if (btAU_IsOn == 1) {
         IR.Log("AU>NO | BT>No");         
         this.switchLogic.AUtoNO_BTtoNO();
      } else {
         IR.Log("NO>NO | No>No");
      }
   } 
   
}