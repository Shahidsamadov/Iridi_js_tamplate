var MediaPageOpenModule = function(device, sm, roomMediaPopup) {
var that = this;
this.device = device;
this.sm = sm;
this.roomMediaPopup = roomMediaPopup;
this.setFinished = false;

this.popupArray = [];
this.signalArray = [];

this.addPopup = function(popup, signal) {
   this.popupArray.push(popup);
   this.signalArray.push(signal);
}

this.setOffSignal = function(offSignal) {
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function (name,value) {
      if (name == offSignal && that.setFinished == true) {
         for (var i=0; i<that.popupArray.length; i++) {
            if (that.sm.isPopupOpen(that.popupArray[i].name) && that.popupArray[i].backPopup.name == that.roomMediaPopup.name) {
               that.sm.closeAllPopups();
               that.sm.openPopup(that.roomMediaPopup);   
            }
         }   
      }
   });
}

this.setFinish = function() {
   this.setFinished = true;
}

IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function (name,value) {
   if (that.setFinished == true) {
   for (var i=0; i<that.signalArray.length; i++) {
      if (name == that.signalArray[i] && value == true) {
         that.popupArray[i].backPopup = that.roomMediaPopup;
         that.sm.closeAllPopups();
         that.sm.openPopup(that.popupArray[i]);   
      }   
   }
   }
});

}