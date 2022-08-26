var HumaxManager = function(device, screenManager, popupHumax, popupKuhnyaMedia, popupGostinayaMedia, popupSpalnyaMedia, popupParty) {
   var that = this;
   this.device = device;
   this.screenManager = screenManager;
   this.popupHumax = popupHumax;
   this.popupKuhnyaMedia = popupKuhnyaMedia;
   this.popupGostinayaMedia = popupGostinayaMedia;
   this.popupSpalnyaMedia = popupSpalnyaMedia;
   this.popupParty = popupParty;
   
   this.deviceMedia;
   this.backPopup;
   
   this.open = function(deviceMedia) {
      this.deviceMedia = deviceMedia;
      this.sendHumaxOnCMD();
   }
   
   this.back = function() {
      this.screenManager.closeAllPopups();
      this.screenManager.openPopup(this.backPopup);
   }
   
   this.sendHumaxOnCMD = function() {
      this.device.Set(this.deviceMedia.cmdA[7], true);
      IR.SetTimeout(10, sendHumaxOnCMDFinish);   
   }
   function sendHumaxOnCMDFinish() {
      that.device.Set(that.deviceMedia.cmdA[7], false);
   }
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function (name,value) {
      if (value) {
         switch(name) {
         case "kuhnyaOpenHumax":
            if (that.popupKuhnyaMedia.isOpened) {
               that.backPopup = that.popupKuhnyaMedia; 
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupHumax);     
            }       
         break;
         case "gostOpenHumax":
            if (that.popupGostinayaMedia.isOpened) {
               that.backPopup = that.popupGostinayaMedia; 
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupHumax);
            }          
         break;
         case "spalnyaOpenHumax":
            if (that.popupSpalnyaMedia.isOpened) {
               that.backPopup = that.popupSpalnyaMedia; 
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupHumax);
            }          
         break;
         case "partyOpenSrc3Page":
            if (that.popupParty.isOpened) {
               that.backPopup = that.popupParty; 
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupHumax);
            }          
         break;
         }
      }  
   });
   
}