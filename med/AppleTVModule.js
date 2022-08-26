var AppleTVModule = function(crestron, sm) {
var that = this;
this.crestron = crestron;
this.sm = sm;
this.setFinished = false;

this.center;
this.hold;
this.up;
this.down;
this.left;
this.right;

this.popupAppleTV;
this.popupFlat;
this.joystickNavigationH;
this.joystickNavigationV;
this.btnBackH;
this.btnBackV;
this.btnCloseH;
this.btnCloseV;

this.deltaX = 64;
this.deltaY = 64;
this.startX;
this.startY;
this.lastSendX;
this.lastSendY;

this.touchDown = false;
this.touchDownX;
this.touchDownY; 
this.holdID;
this.holdSended = false;

this.finishSet = function() {
   this.setFinished = true;
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupAppleTV.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseH, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnBackV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupAppleTV.backPopup);
   });
   IR.AddListener(IR.EVENT_ITEM_RELEASE, this.btnCloseV, function() {
      that.sm.closeAllPopups();
      that.sm.openPopup(that.popupFlat);
   });
   //GESTURE
   IR.AddListener(IR.EVENT_TOUCH_DOWN, this.joystickNavigationH, function() {
      IR.Log("touch downH");
      that.touchDown = true;
      that.touchDownX = that.joystickNavigationH.ValueX;
      that.touchDownY = that.joystickNavigationH.ValueY;
      that.startX = that.joystickNavigationH.ValueX;
      that.startY = that.joystickNavigationH.ValueY;
      that.lastSendX = that.startX;
      that.lastSendY = that.startY;
      
      IR.ClearInterval(that.holdID);
      IR.Log("Set Interval");
      that.holdSended = false;
      IR.SetTimeout(2000, function() {
         if (that.touchDown == true) {
            that.holdSended = true;
            that.sendCMD(that.hold);
         }   
      });   
   });
   IR.AddListener(IR.EVENT_TOUCH_DOWN, this.joystickNavigationV, function() {
      IR.Log("touch downV");
      that.touchDown = true;
      that.touchDownX = that.joystickNavigationV.ValueX;
      that.touchDownY = that.joystickNavigationV.ValueY;
      that.startX = that.joystickNavigationV.ValueX;
      that.startY = that.joystickNavigationV.ValueY;
      that.lastSendX = that.startX;
      that.lastSendY = that.startY;
      
      IR.ClearInterval(that.holdID);
      IR.Log("Set Interval");
      that.holdSended = false;
      IR.SetTimeout(2000, function() {
         if (that.touchDown == true) {
            that.holdSended = true;
            that.sendCMD(that.hold);
         }   
      });   
   });
   IR.AddListener(IR.EVENT_TOUCH_UP, this.joystickNavigationH, function() {
      IR.Log("touch upH");
      that.touchDown = false;
      if (that.holdSended == false) {
         if (Math.abs(that.startX - that.joystickNavigationH.ValueX) < that.deltaX/2 && Math.abs(that.startY - that.joystickNavigationH.ValueY) < that.deltaY/2) {
            that.sendCMD(that.center);
         }
      }   
   });
   IR.AddListener(IR.EVENT_TOUCH_UP, this.joystickNavigationV, function() {
      IR.Log("touch upV");
      that.touchDown = false;
      if (that.holdSended == false) {
         if (Math.abs(that.startX - that.joystickNavigationV.ValueX) < that.deltaX/2 && Math.abs(that.startY - that.joystickNavigationV.ValueY) < that.deltaY/2) {
            that.sendCMD(that.center);
         } 
      }  
   });
   IR.AddListener(IR.EVENT_TOUCH_MOVE, this.joystickNavigationH, function() {
      IR.Log("touch moveH");
      if ((that.joystickNavigationH.ValueX > that.touchDownX + 10 || that.joystickNavigationH.ValueX < that.touchDownX - 10) || (that.joystickNavigationH.ValueY > that.touchDownY + 10 || that.joystickNavigationH.ValueY < that.touchDownY - 10)) {
         IR.Log("TOUCH DOWN FALSE");
         that.touchDown = false;
      }
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
      if ((that.joystickNavigationV.ValueX > that.touchDownX + 10 || that.joystickNavigationV.ValueX < that.touchDownX - 10) || (that.joystickNavigationV.ValueY > that.touchDownY + 10 || that.joystickNavigationV.ValueY < that.touchDownY - 10)) {
         IR.Log("TOUCH DOWN FALSE");
         that.touchDown = false;
      }
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

this.setItems = function(popupAppleTV, popupFlat, joystickNavigation, btnBack, btnClose) {
   this.popupAppleTV = popupAppleTV;
   this.popupFlat = popupFlat;
   this.joystickNavigationH = this.popupAppleTV.itemH.GetItem(joystickNavigation);
   this.joystickNavigationV = this.popupAppleTV.itemV.GetItem(joystickNavigation);
   this.btnBackH = this.popupAppleTV.itemH.GetItem(btnBack);
   this.btnBackV = this.popupAppleTV.itemV.GetItem(btnBack);
   this.btnCloseH = this.popupAppleTV.itemH.GetItem(btnClose);
   this.btnCloseV = this.popupAppleTV.itemV.GetItem(btnClose);
}

this.setCmd = function(center, hold, up, down, left, right) {
   this.center = center;
   this.hold = hold;
   this.up = up;
   this.down = down;
   this.left = left;
   this.right = right;
}

this.sendCMD = function(cmd) {
   IR.Log("appletv cmd send");
   this.crestron.pulse(cmd);   
}
   
}