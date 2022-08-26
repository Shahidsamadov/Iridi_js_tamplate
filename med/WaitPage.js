var WaitSwitch = function(device, screenManager, popupWait, label, level, roomSelect, fbA, popupA, devA) {
   var that = this;

   this.device = device;
   this.screenManager = screenManager;
   this.popupWait = popupWait;
   this.labelH = this.popupWait.itemH.GetItem(label);
   this.levelH = this.popupWait.itemH.GetItem(level);
   this.labelV = this.popupWait.itemV.GetItem(label);
   this.levelV = this.popupWait.itemV.GetItem(level);
   this.roomSelect = roomSelect;
   this.fbA = fbA;
   this.popupA = popupA;
   this.devA = devA;
   this.isShowInfo = false;

   this.type;
   this.txt;
   this.opened;
   this.isWait;
   this.autocloseID;
   
   this.requestFB = false;
   this.closeListenerFuncA = [];
   
   this.gostinayaSourceBusy = false;
   this.kuhnyaSourceBusy = false;
   this.spalnyaSourceBusy = false;

   this.addCloseListener = function(func) {
      this.closeListenerFuncA.push(func);
   }
   
   this.showInfo = function(txt, duration) {
      this.isShowInfo = true;
      this.labelH.Text = txt;
      this.labelV.Text = txt;
      this.levelH.Visible = false;
      this.levelH.Value = 0;
      this.levelV.Visible = false;
      this.levelV.Value = 0;
      this.screenManager.openPopup(this.popupWait);
      IR.SetTimeout(duration, showInfoAutoClose);
   }
   function showInfoAutoClose() {
      that.screenManager.closePopup(that.popupWait);
      that.isShowInfo = false;
   }

   this.open = function(type, txt) { //type 0 - waitThis, type 1 - waitAnother
      this.opened = true;
      this.type = type;
      this.txt = txt;
      this.labelH.Text = this.txt;
      this.labelV.Text = this.txt;
      if (!type) {
         this.levelH.Visible = true;
         this.levelH.Value = 0;
         this.levelV.Visible = true;
         this.levelV.Value = 0;
      }
      else {
         this.levelH.Visible = false;
         this.levelV.Visible = false;
      }
      this.screenManager.openPopup(this.popupWait);
      this.autoClose();
   }
   
   this.close = function() {
      this.screenManager.closePopup(this.popupWait);
      this.opened = false;
      IR.ClearInterval(this.autocloseID);
      this.isWait = false;
      for (var i=0; i<this.closeListenerFuncA.length; i++) {
         this.closeListenerFuncA[i]();   
      }
   }
   
   this.autoClose = function() {
      this.autocloseID = IR.SetTimeout(10000, autoCloseFinish);
   }
   function autoCloseFinish() {
      that.close();
   }
   
   function updateListenerFunc() {
      if (!that.opened)
         if (that.popupA[5].isOpened || that.popupA[6].isOpened || that.popupA[7].isOpened || (that.popupA[0].isOpened && that.roomSelect.selected == 0) || (that.popupA[0].isOpened && that.roomSelect.selected == 2) || (that.popupA[0].isOpened && that.roomSelect.selected == 3))
            if (that.isWait)
               that.open(that.type, that.txt);   
   }
   this.screenManager.addUpdateListener(updateListenerFunc);
   this.roomSelect.addUpdateListener(updateListenerFunc);
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function(name, value) {
      //GOSTINAYA
      if (!that.isShowInfo) {
      if (name == that.fbA[0]) {
         if (value) {
            that.isWait = true;
            that.type = false;
            that.txt = "Подождите, идёт переключение источников...";
            if (that.popupA[5].isOpened || (that.popupA[0].isOpened && that.roomSelect.selected == 0)) {
               that.open(that.type, that.txt);
            }
         } else {
            that.isWait = false;
            that.close();
         }
      } else if (name == that.fbA[1]) {
         if (value) {
            that.type = true;
            that.txt = "Идёт переключение в другой комнате...";
            if (that.popupA[5].isOpened) {
               that.open(that.type, that.txt);
            }
            that.gostinayaSourceBusy = true;
         } else {
            that.close();
         }
      } else if(name == that.fbA[2]) {
         if (value) {
            that.type = true;
            that.txt = "Источник занят в другой комнате...";
            if (that.popupA[5].isOpened) {
               that.open(that.type, that.txt);
            }
            that.gostinayaSourceBusy = true;
         } else
            that.close();   
      } else if (name == that.fbA[3] && that.opened && !that.type) {
         that.levelH.Value = value;
         that.levelV.Value = value;
      }
      //KUHNYA
      if (name == that.fbA[4]) {
         if (value) {
            that.isWait = true;
            that.type = false;
            that.txt = "Подождите, идёт переключение источников...";
            if (that.popupA[6].isOpened || (that.popupA[0].isOpened && that.roomSelect.selected == 2)) {
               that.open(that.type, that.txt);
            }
         } else {
            that.isWait = false;
            that.close();
         }
      } else if (name == that.fbA[5]) {
         if (value) {
            that.type = true;
            that.txt = "Идёт переключение в другой комнате...";
            if (that.popupA[6].isOpened) {
               that.open(that.type, that.txt);
            }
            that.kuhnyaSourceBusy = true;
         } else {
            that.close();
         }
      } else if(name == that.fbA[6]) {
         if (value) {
            that.type = true;
            that.txt = "Источник занят в другой комнате...";
            if (that.popupA[6].isOpened) {
               that.open(that.type, that.txt);
            }
            that.kuhnyaSourceBusy = true;
         } else
            that.close();   
      } else if (name == that.fbA[7] && that.opened && !that.type) {
         that.levelH.Value = value;
         that.levelV.Value = value;
      }
      //SPALNYA
      if (name == that.fbA[8]) {
         if (value) {
            that.isWait = true;
            that.type = false;
            that.txt = "Подождите, идёт переключение источников...";
            if (that.popupA[7].isOpened || (that.popupA[0].isOpened && that.roomSelect.selected == 3)) {
               that.open(that.type, that.txt);
            }
         } else {
            that.isWait = false;
            that.close();
         }
      } else if (name == that.fbA[9]) {
         if (value) {
            that.type = true;
            that.txt = "Идёт переключение в другой комнате...";
            if (that.popupA[7].isOpened) {
               that.open(that.type, that.txt);
            }
            that.spalnyaSourceBusy = true;
         } else {
            that.close();
         }
      } else if(name == that.fbA[10]) {
         if (value) {
            that.type = true;
            that.txt = "Источник занят в другой комнате...";
            if (that.popupA[7].isOpened) {
               that.open(that.type, that.txt);
            }
            that.spalnyaSourceBusy = true;
         } else {
            that.close();
         }   
      } else if (name == that.fbA[11] && that.opened && !that.type) {
         that.levelH.Value = value; 
         that.levelV.Value = value; 
      }  
      that.requestFB = false;
      } 
   });
      
}