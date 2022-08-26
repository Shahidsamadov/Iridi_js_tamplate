var Wait2 = function(device, screenManager, popupWait, popupWaitLabel, popupWaitLevel, popupKuhnyaMedia, popupGostinayaMedia, popupSpalnyaMedia, roomSelect, mediaPageNameA) {
   var that = this;
   
   this.device = device;
   this.screenManager = screenManager;
   this.roomSelect = roomSelect;
   this.mediaPageNameA = mediaPageNameA;
   //wait
   this.popupWait = popupWait;
   this.labelH = this.popupWait.itemH.GetItem(popupWaitLabel);
   this.levelH = this.popupWait.itemH.GetItem(popupWaitLevel);
   this.labelV = this.popupWait.itemV.GetItem(popupWaitLabel);
   this.levelV = this.popupWait.itemV.GetItem(popupWaitLevel);
   //
   this.autocloseID;
   this.showRoomID = 0;
   this.isShowInfo = false;
   this.isShowTopInfo = false;
   this.isShowWait = false;
   this.lastInfoText = "";
   //
   function upd() {
      if (that.showRoomID != 0 && that.isOnMediaPage() && !that.popupWait.isOpened)
         that.showWait(that.showRoomID);   
   }
   this.screenManager.addUpdateListener(upd);
   this.roomSelect.addUpdateListener(upd);
   
   this.isOnMediaPage = function() {
      var isOnMedia = false;
      for (var i=0; i<that.screenManager.popupsArray.length; i++) {
         for (var j=0; j<that.mediaPageNameA.length; j++) {
            if (that.mediaPageNameA[j] == that.screenManager.popupsArray[i].name)
            if (that.screenManager.popupsArray[i].isOpened)
               isOnMedia = true;    
         }  
      }
      if (that.roomSelect.selected > -1)
         isOnMedia = true;
      return isOnMedia;
   }
   
   this.showWait = function(showRoomID) {
      this.showRoomID = showRoomID;
      if (this.isOnMediaPage() && !this.isShowTopInfo) {
         this.isShowWait = true;
         this.labelH.Text = "Подождите, идёт переключение источников...";
         this.labelV.Text = "Подождите, идёт переключение источников...";
         this.levelH.Visible = true;
         this.levelV.Visible = true;
         this.levelH.Value = 0;
         this.levelV.Value = 0;
         this.screenManager.openPopup(popupWait);
         IR.ClearInterval(this.autocloseID);
         this.autocloseID = IR.SetTimeout(30000, autoClose);
      }
   }
   function autoClose() {
      that.hideWait();
   }
   
   this.hideWait = function() {
      this.screenManager.closePopup(popupWait);
      this.isShowWait = false;
      this.isShowInfo = false;
      this.isShowTopInfo = false;
      this.showRoomID = 0;
   }
   
   function tryShowInfo() {
      that.showInfo(that.lastInfoText);
   }
   this.showInfo = function(text, duration) {
      IR.Log("show Info: " + text);
      IR.Log(this.isOnMediaPage());
      IR.Log(this.showRoomID);
      if (this.isOnMediaPage() && !this.isShowWait) {
         if (that.isShowInfo) {
            that.lastInfoText = text;
            IR.SetTimeout(duration, tryShowInfo);
         } else {
            that.isShowInfo = true;
            this.labelH.Text = text;
            this.labelV.Text = text;
            this.levelH.Visible = false;
            this.levelV.Visible = false;
            this.levelH.Value = 0;
            this.levelV.Value = 0;
            this.screenManager.openPopup(popupWait);
            this.autocloseID = IR.SetTimeout(duration, autoClose);
         }   
      }
   }
   
   this.showTopInfo = function(text, duration) {
      that.isShowTopInfo = true;
      this.labelH.Text = text;
      this.labelV.Text = text;
      this.levelH.Visible = false;
      this.levelV.Visible = false;
      this.levelH.Value = 0;
      this.levelV.Value = 0;
      this.screenManager.openPopup(popupWait);
      this.autocloseID = IR.SetTimeout(duration, autoClose);
   }
   
   //PARTY INFO
   this.showTopInfo2 = function(text) {
      if (that.screenManager.isPopupOpen("Party")) {
         IR.ClearInterval(this.autocloseID);
         that.isShowTopInfo = true;
         this.labelH.Text = text;
         this.labelV.Text = text;
         this.levelH.Visible = false;
         this.levelV.Visible = false;
         this.levelH.Value = 0;
         this.levelV.Value = 0;
         this.screenManager.openPopup(popupWait);
         this.autocloseID = IR.SetTimeout(60000, autoClose);
      }
   }
   this.hideTopInfo2 = function() {
      if (that.screenManager.isPopupOpen("Party"))
         this.hideWait();
   }
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function (name,value) {
      //BUSY BAR
      switch (name) {
      case "gostinayaBusyBar":
         if (that.showRoomID == 1) {
            that.levelH.Value = value;
            that.levelV.Value = value;
         }
      break;
      case "kuhnyaBusyBar":
         if (that.showRoomID == 2) {
            that.levelH.Value = value;
            that.levelV.Value = value;
         }
      break;
      case "spalnyaBusyBar":
         if (that.showRoomID == 3) {
            that.levelH.Value = value;
            that.levelV.Value = value;
         }
      break;
      case "balkonBusyBar":
         if (that.showRoomID == 4) {
            that.levelH.Value = value;
            that.levelV.Value = value;
         }
      break;
      case "vannayaBusyBar":
         if (that.showRoomID == 5) {
            that.levelH.Value = value;
            that.levelV.Value = value;
         }
      break;
      case "sanuzelBusyBar":
         if (that.showRoomID == 6) {
            that.levelH.Value = value;
            that.levelV.Value = value;
         }
      break;
      }
      
      //WAIT PAGE
      switch (name) {
      case "gostinayaBusyThis":
         if (value)
            that.showWait(1);
         else if (!that.isShowTopInfo) that.hideWait();
      break;
      case "gostinayaBusyAnother":
         if (value && that.screenManager.isPopupOpen("GostinayaMedia"))
            that.showInfo("В данный момент уже идёт переключение", 5000);
      break;
      case "gostinayaBusySource":
         if (value && that.screenManager.isPopupOpen("GostinayaMedia"))
            that.showInfo("Источник занят в другой комнате", 5000);
      break;
      //
      case "kuhnyaBusyThis":
         if (value)
            that.showWait(2);
         else if (!that.isShowTopInfo) that.hideWait();
      break;
      case "kuhnyaBusyAnother":
         if (value && that.screenManager.isPopupOpen("KuhnyaMedia"))
            that.showInfo("В данный момент уже идёт переключение", 5000);
      break;
      case "kuhnyaBusySource":
         if (value && that.screenManager.isPopupOpen("KuhnyaMedia"))
            that.showInfo("Источник занят в другой комнате", 5000);
      break;
      //
      case "spalnyaBusyThis":
         if (value)
            that.showWait(3);
         else if (!that.isShowTopInfo) that.hideWait();
      break;
      case "spalnyaBusyAnother":
         if (value && that.screenManager.isPopupOpen("SpalnyaMedia"))
            that.showInfo("В данный момент уже идёт переключение", 5000);
      break;
      case "spalnyaBusySource":
         if (value && that.screenManager.isPopupOpen("SpalnyaMedia"))
            that.showInfo("Источник занят в другой комнате", 5000);
      break;
      //
      case "balkonBusy":
         if (value)
            that.showWait(4);
         else if (!that.isShowTopInfo) that.hideWait();
      break;
      case "vannayaBusy":
         if (value)
            that.showWait(5);
         else if (!that.isShowTopInfo) that.hideWait();
      break;
      case "sanuzelBusy":
         if (value)
            that.showWait(6);
         else if (!that.isShowTopInfo) that.hideWait();
      break;
      }         
   });

}