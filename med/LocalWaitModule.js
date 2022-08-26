var LocalWaitModule  = function(device, screenManager) {
var that = this;
this.device = device;
this.screenManager = screenManager;
this.busyPopupSignal;
this.busyPopup;
this.setFinished = false;

this.whenShowArray = [];

this.setBusyPopupSignal = function(busyPopupSignal) {
   this.busyPopupSignal = busyPopupSignal;
}

this.setBusyPopup = function(busyPopup) {
   this.busyPopup = busyPopup;
}

this.setWhenToShowPopups = function(popups) {
   this.whenShowArray = popups;
}

this.finishSet = function() {
   setFinished = true;
}
//
this.showBusyPopup = function() {
   IR.ClearInterval(this.hidePopupTimeoutID);
   this.screenManager.openPopup(this.busyPopup);
   this.hidePopupTimeoutID = IR.SetTimeout(20000, function() {
      that.screenManager.closePopup(that.busyPopup);
   });
}

this.hideBusyPopup = function() {
   this.screenManager.closePopup(this.busyPopup);
}

IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function (name,value) {
   if (setFinished = true) {
   if (name == that.busyPopupSignal) {
      if (value == true) {
         var popupOpened = false;
         for (var i=0; i<that.whenShowArray.length; i++) {
            if (that.screenManager.isPopupOpen(that.whenShowArray[i].name))
               popupOpened = true;
         }
         if (popupOpened == true)
            that.showBusyPopup();   
      } else {
         that.hideBusyPopup();
      }
   }
   }         
});

}