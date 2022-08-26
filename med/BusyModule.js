var BusyModule  = function(device, screenManager) {
var that = this;
this.device = device;
this.screenManager = screenManager;
this.busyPopupSignal;
this.busyPopup;
this.setFinished = false;

this.setBusyPopupSignal = function(busyPopupSignal) {
   this.busyPopupSignal = busyPopupSignal;
}

this.setBusyPopup = function(busyPopup) {
   this.busyPopup = busyPopup;
   this.busyPopup.addListenerToPopup(IR.EVENT_ITEM_RELEASE, function() {
      that.hideBusyPopup();
      IR.ClearInterval(that.hidePopupTimeoutID);
   });
}

this.finishSet = function() {
   setFinished = true;
}
//
this.showBusyPopup = function() {
   IR.ClearInterval(this.hidePopupTimeoutID);
   this.screenManager.openPopup(this.busyPopup);
   this.hidePopupTimeoutID = IR.SetTimeout(6000, function() {
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
         that.showBusyPopup();   
      }/* else {
         that.hideBusyPopup();
      }*/
   }
   }         
});

}