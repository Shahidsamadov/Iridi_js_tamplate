var XBMCManager = function(device, screenManager, popupXBMC, joystickNavigation, cmdA, popupKuhnyaMedia, popupGostinayaMedia, popupSpalnyaMedia, popupParty) {
   var that = this;
   
   this.deltaX = 84;
   this.deltaY = 84;
   this.startX;
   this.startY;
   this.lastSendX;
   this.lastSendY;
      
   this.device = device;
   this.screenManager = screenManager;
   this.popupXBMC = popupXBMC;
   this.joystickNavigationH = this.popupXBMC.itemH.GetItem(joystickNavigation);
   this.joystickNavigationV = this.popupXBMC.itemV.GetItem(joystickNavigation);
   this.cmdA = cmdA;
   this.popupKuhnyaMedia = popupKuhnyaMedia;
   this.popupGostinayaMedia = popupGostinayaMedia;
   this.popupSpalnyaMedia = popupSpalnyaMedia;
   this.popupParty = popupParty;
   this.lastCMD;
   
   this.deviceMedia;
   this.backPopup;
   
   this.open = function(deviceMedia) {
      this.deviceMedia = deviceMedia;
      this.sendXBMCOnCMD();
   }
   
   this.back = function() {
      this.screenManager.closeAllPopups();
      this.screenManager.openPopup(this.backPopup);
   }
   
   this.sendXBMCOnCMD = function() {
      this.device.Set(this.deviceMedia.cmdA[8], true);
      IR.SetTimeout(10, sendXBMCOnCMDFinish);   
   }
   function sendXBMCOnCMDFinish() {
      that.device.Set(that.deviceMedia.cmdA[8], false);
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
      IR.Log("touch downH");
      that.startX = that.joystickNavigationH.ValueX;
      that.startY = that.joystickNavigationH.ValueY;
      that.lastSendX = that.startX;
      that.lastSendY = that.startY;   
   });
   IR.AddListener(IR.EVENT_TOUCH_DOWN, this.joystickNavigationV, function() {
      IR.Log("touch downV");
      that.startX = that.joystickNavigationV.ValueX;
      that.startY = that.joystickNavigationV.ValueY;
      that.lastSendX = that.startX;
      that.lastSendY = that.startY;   
   });
   IR.AddListener(IR.EVENT_TOUCH_UP, this.joystickNavigationH, function() {
      IR.Log("touch upH");
      if (Math.abs(that.startX - that.joystickNavigationH.ValueX) < that.deltaX && Math.abs(that.startY - that.joystickNavigationH.ValueY) < that.deltaY) {
         that.sendCMD(4);
      }   
   });
   IR.AddListener(IR.EVENT_TOUCH_UP, this.joystickNavigationV, function() {
      IR.Log("touch upV");
      if (Math.abs(that.startX - that.joystickNavigationV.ValueX) < that.deltaX && Math.abs(that.startY - that.joystickNavigationV.ValueY) < that.deltaY) {
         that.sendCMD(4);
      }   
   });
   IR.AddListener(IR.EVENT_TOUCH_MOVE, this.joystickNavigationH, function() {
      IR.Log("touch moveH");
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
      IR.Log("touch moveV");
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
         case "kuhnyaOpenXBMC":
            if (that.popupKuhnyaMedia.isOpened) {
               that.backPopup = that.popupKuhnyaMedia; 
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupXBMC);     
            }       
         break;
         case "gostOpenXBMC":
            if (that.popupGostinayaMedia.isOpened) {
               that.backPopup = that.popupGostinayaMedia; 
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupXBMC);
            }          
         break;
         case "spalnyaOpenXBMC":
            if (that.popupSpalnyaMedia.isOpened) {
               that.backPopup = that.popupSpalnyaMedia; 
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupXBMC);
            }          
         break;
         case "partyOpenSrc4Page":
            if (that.popupParty.isOpened) {
               that.backPopup = that.popupParty; 
               that.screenManager.closeAllPopups();
               that.screenManager.openPopup(that.popupXBMC);
            }          
         break;
         }
      } 
   });
}