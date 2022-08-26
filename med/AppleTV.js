var AppleTVManager = function(device, screenManager, popupAppleTV, joystickNavigation, cmdA, popupKuhnyaMedia, popupGostinayaMedia, popupSpalnyaMedia, popupParty) {
   var that = this;
   
   this.deltaX = 84;
   this.deltaY = 84;
   this.startX;
   this.startY;
   this.lastSendX;
   this.lastSendY;
      
   this.device = device;
   this.screenManager = screenManager;
   this.popupAppleTV = popupAppleTV;
   this.joystickNavigationH = this.popupAppleTV.itemH.GetItem(joystickNavigation);
   this.joystickNavigationV = this.popupAppleTV.itemV.GetItem(joystickNavigation);
   this.cmdA = cmdA;
   this.popupKuhnyaMedia = popupKuhnyaMedia;
   this.popupGostinayaMedia = popupGostinayaMedia;
   this.popupSpalnyaMedia = popupSpalnyaMedia;
   this.popupParty = popupParty;
   this.lastCMD;
   
   this.deviceMedia;
   this.backPopup;
   
   this.open = function(deviceMedia, backPopup) {
      this.deviceMedia = deviceMedia;
      this.sendAppleTVOnCMD();   
   }
   
   this.back = function() {
      this.screenManager.closeAllPopups();
      this.screenManager.openPopup(this.backPopup);
   }
   
   this.sendAppleTVOnCMD = function() {
      this.device.Set(this.deviceMedia.cmdA[9], true);
      IR.SetTimeout(10, sendAppleTVOnCMDFinish);   
   }
   function sendAppleTVOnCMDFinish() {
      that.device.Set(that.deviceMedia.cmdA[9], false);
   }
   
   this.sendCMD = function(cmd) {
      this.device.Set(this.cmdA[cmd], true);
      this.lastCMD = cmd;
      IR.SetTimeout(10, sendCMDFinish);   
   }
   function sendCMDFinish() {
      that.device.Set(that.cmdA[that.lastCMD], false);
   }
   
   //GESTURE
   IR.AddListener(IR.EVENT_TOUCH_DOWN, this.joystickNavigationH, function() {
      that.startX = that.joystickNavigationH.ValueX;
      that.startY = that.joystickNavigationH.ValueY;
      that.lastSendX = that.startX;
      that.lastSendY = that.startY;   
   });
   IR.AddListener(IR.EVENT_TOUCH_DOWN, this.joystickNavigationV, function() {
      that.startX = that.joystickNavigationV.ValueX;
      that.startY = that.joystickNavigationV.ValueY;
      that.lastSendX = that.startX;
      that.lastSendY = that.startY;   
   });
   IR.AddListener(IR.EVENT_TOUCH_UP, this.joystickNavigationH, function() {
      if (Math.abs(that.startX - that.joystickNavigationH.ValueX) < that.deltaX && Math.abs(that.startY - that.joystickNavigationH.ValueY) < that.deltaY) {
         that.sendCMD(4);
      }   
   });
   IR.AddListener(IR.EVENT_TOUCH_UP, this.joystickNavigationV, function() {
      if (Math.abs(that.startX - that.joystickNavigationV.ValueX) < that.deltaX && Math.abs(that.startY - that.joystickNavigationV.ValueY) < that.deltaY) {
         that.sendCMD(4);
      }   
   });
   IR.AddListener(IR.EVENT_TOUCH_MOVE, this.joystickNavigationH, function() {
      if ((that.lastSendX - that.joystickNavigationH.ValueX) < 0 && Math.abs(that.lastSendX - that.joystickNavigationH.ValueX) > that.deltaX) {
         that.sendCMD(3);
         that.lastSendX = that.joystickNavigationH.ValueX;
         that.lastSendY = that.joystickNavigationH.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      } else if ((that.lastSendX - that.joystickNavigationH.ValueX) > 0 && Math.abs(that.lastSendX - that.joystickNavigationH.ValueX) > that.deltaX) {
         that.sendCMD(2);
         that.lastSendX = that.joystickNavigationH.ValueX;
         that.lastSendY = that.joystickNavigationH.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      } else if ((that.lastSendY - that.joystickNavigationH.ValueY) < 0 && Math.abs(that.lastSendY - that.joystickNavigationH.ValueY) > that.deltaY) {
         that.sendCMD(1);
         that.lastSendX = that.joystickNavigationH.ValueX;
         that.lastSendY = that.joystickNavigationH.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      } else if ((that.lastSendY - that.joystickNavigationH.ValueY) > 0 && Math.abs(that.lastSendY - that.joystickNavigationH.ValueY) > that.deltaY) {
         that.sendCMD(0);
         that.lastSendX = that.joystickNavigationH.ValueX;
         that.lastSendY = that.joystickNavigationH.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      }   
   });
   IR.AddListener(IR.EVENT_TOUCH_MOVE, this.joystickNavigationV, function() {
      if ((that.lastSendX - that.joystickNavigationV.ValueX) < 0 && Math.abs(that.lastSendX - that.joystickNavigationV.ValueX) > that.deltaX) {
         that.sendCMD(3);
         that.lastSendX = that.joystickNavigationV.ValueX;
         that.lastSendY = that.joystickNavigationV.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      } else if ((that.lastSendX - that.joystickNavigationV.ValueX) > 0 && Math.abs(that.lastSendX - that.joystickNavigationV.ValueX) > that.deltaX) {
         that.sendCMD(2);
         that.lastSendX = that.joystickNavigationV.ValueX;
         that.lastSendY = that.joystickNavigationV.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      } else if ((that.lastSendY - that.joystickNavigationV.ValueY) < 0 && Math.abs(that.lastSendY - that.joystickNavigationV.ValueY) > that.deltaY) {
         that.sendCMD(1);
         that.lastSendX = that.joystickNavigationV.ValueX;
         that.lastSendY = that.joystickNavigationV.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      } else if ((that.lastSendY - that.joystickNavigationV.ValueY) > 0 && Math.abs(that.lastSendY - that.joystickNavigationV.ValueY) > that.deltaY) {
         that.sendCMD(0);
         that.lastSendX = that.joystickNavigationV.ValueX;
         that.lastSendY = that.joystickNavigationV.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      }   
   });
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function (name,value) {
      if (value) {
         switch(name) {
         case "kuhnyaOpenAppleTV":
            if (that.popupKuhnyaMedia.isOpened) {
               that.backPopup = that.popupKuhnyaMedia; 
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupAppleTV);     
            }       
         break;
         case "gostOpenAppleTV":
            if (that.popupGostinayaMedia.isOpened) {
               that.backPopup = that.popupGostinayaMedia; 
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupAppleTV);
            }          
         break;
         case "spalnyaOpenAppleTV":
            if (that.popupSpalnyaMedia.isOpened) {
               that.backPopup = that.popupSpalnyaMedia; 
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupAppleTV);
            }          
         break;
         case "partyOpenSrc5Page":
            if (that.popupParty.isOpened) {
               that.backPopup = that.popupParty; 
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupAppleTV);
            }          
         break;
         }
      } 
   });
}