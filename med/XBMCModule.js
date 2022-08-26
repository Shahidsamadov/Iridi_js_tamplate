var XBMCModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;
this.setFinished = false;

this.center;
this.up;
this.down;
this.left;
this.right;

this.popupXBMC;
this.popupFlat;
this.joystickNavigationH;
this.joystickNavigationV;
this.xbmcNumTitleH;
this.xbmcNumTitleV;
this.btnBackH;
this.btnBackV;
this.btnCloseH;
this.btnCloseV;

this.deltaX = 84;
this.deltaY = 84;
this.startX;
this.startY;
this.lastSendX;
this.lastSendY;

this.finishSet = function() {
   this.setFinished = true;
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupXBMC.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupXBMC.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
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
         that.sendCMD(that.center);
      }   
   });
   IR.AddListener(IR.EVENT_TOUCH_UP, this.joystickNavigationV, function() {
      IR.Log("touch upV");
      if (Math.abs(that.startX - that.joystickNavigationV.ValueX) < that.deltaX && Math.abs(that.startY - that.joystickNavigationV.ValueY) < that.deltaY) {
         that.sendCMD(that.center);
      }   
   });
   IR.AddListener(IR.EVENT_TOUCH_MOVE, this.joystickNavigationH, function() {
      IR.Log("touch moveH");
      if ((that.lastSendX - that.joystickNavigationH.ValueX) < 0 && Math.abs(that.lastSendX - that.joystickNavigationH.ValueX) > that.deltaX) {
         that.sendCMD(that.right);
         that.lastSendX = that.joystickNavigationH.ValueX;
         that.lastSendY = that.joystickNavigationH.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      } else if ((that.lastSendX - that.joystickNavigationH.ValueX) > 0 && Math.abs(that.lastSendX - that.joystickNavigationH.ValueX) > that.deltaX) {
         that.sendCMD(that.left);
         that.lastSendX = that.joystickNavigationH.ValueX;
         that.lastSendY = that.joystickNavigationH.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      } else if ((that.lastSendY - that.joystickNavigationH.ValueY) < 0 && Math.abs(that.lastSendY - that.joystickNavigationH.ValueY) > that.deltaY) {
         that.sendCMD(that.down);
         that.lastSendX = that.joystickNavigationH.ValueX;
         that.lastSendY = that.joystickNavigationH.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      } else if ((that.lastSendY - that.joystickNavigationH.ValueY) > 0 && Math.abs(that.lastSendY - that.joystickNavigationH.ValueY) > that.deltaY) {
         that.sendCMD(that.up);
         that.lastSendX = that.joystickNavigationH.ValueX;
         that.lastSendY = that.joystickNavigationH.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      }   
   });
   IR.AddListener(IR.EVENT_TOUCH_MOVE, this.joystickNavigationV, function() {
      IR.Log("touch moveV");
      if ((that.lastSendX - that.joystickNavigationV.ValueX) < 0 && Math.abs(that.lastSendX - that.joystickNavigationV.ValueX) > that.deltaX) {
         that.sendCMD(that.right);
         that.lastSendX = that.joystickNavigationV.ValueX;
         that.lastSendY = that.joystickNavigationV.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      } else if ((that.lastSendX - that.joystickNavigationV.ValueX) > 0 && Math.abs(that.lastSendX - that.joystickNavigationV.ValueX) > that.deltaX) {
         that.sendCMD(that.left);
         that.lastSendX = that.joystickNavigationV.ValueX;
         that.lastSendY = that.joystickNavigationV.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      } else if ((that.lastSendY - that.joystickNavigationV.ValueY) < 0 && Math.abs(that.lastSendY - that.joystickNavigationV.ValueY) > that.deltaY) {
         that.sendCMD(that.down);
         that.lastSendX = that.joystickNavigationV.ValueX;
         that.lastSendY = that.joystickNavigationV.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      } else if ((that.lastSendY - that.joystickNavigationV.ValueY) > 0 && Math.abs(that.lastSendY - that.joystickNavigationV.ValueY) > that.deltaY) {
         that.sendCMD(that.up);
         that.lastSendX = that.joystickNavigationV.ValueX;
         that.lastSendY = that.joystickNavigationV.ValueY;
         that.startX = -that.deltaX*2;
         that.startY = -that.deltaY*2;
      }   
   });
}

this.setItems = function(popupXBMC, popupFlat, joystickNavigation, xbmcNumTitle, btnBack, btnClose) {
   this.popupXBMC = popupXBMC;
   this.popupFlat = popupFlat;
   this.joystickNavigationH = this.popupXBMC.itemH.GetItem(joystickNavigation);
   this.joystickNavigationV = this.popupXBMC.itemV.GetItem(joystickNavigation);
   this.xbmcNumTitleH = this.popupXBMC.itemH.GetItem(xbmcNumTitle);
   this.xbmcNumTitleV = this.popupXBMC.itemV.GetItem(xbmcNumTitle);
   this.btnBackH = this.popupXBMC.itemH.GetItem(btnBack);
   this.btnBackV = this.popupXBMC.itemV.GetItem(btnBack);
   this.btnCloseH = this.popupXBMC.itemH.GetItem(btnClose);
   this.btnCloseV = this.popupXBMC.itemV.GetItem(btnClose);
}

this.setCmd = function(center, up, down, left, right) {
   this.center = center;
   this.up = up;
   this.down = down;
   this.left = left;
   this.right = right;
}

this.sendCMD = function(cmd) {
   IR.Log("xbmc cmd send");
   this.crestron.pulse(cmd);   
}
   
}