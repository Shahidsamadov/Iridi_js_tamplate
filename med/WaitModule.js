var WaitModule = function(crestron, screenManager) {
var that = this;
this.setFinished = false;
this.waitPopupSignal;
this.waitPopup;
this.waitBarSignal;
this.sliderItemH;
this.sliderItemV;   
this.labelItemH;
this.labelItemV;
this.crestron = crestron;
this.device = this.crestron.device;
this.screenManager = screenManager;
this.hidePopupTimeoutID;
this.messageArray = [];
this.signalArray = [];
this.selectRoomObject;
this.arrayBusyIsOn = [];
this.selectedID;
this.waitArray = [];

this.setWaitPopupSignal = function(waitPopupSignal) {
   this.waitPopupSignal = waitPopupSignal;
}

this.setWaitBarSignal = function(waitArray) {
   this.waitArray.push(0);
   for (var i=0; i<waitArray.length; i++) {
      this.waitArray.push(waitArray[i]);
   }
}

this.setWaitPopup = function(waitPopup) {
   this.waitPopup = waitPopup;
}

this.setSliderItem = function(sliderItem) {
   this.sliderItemH = this.waitPopup.itemH.GetItem(sliderItem);
   this.sliderItemV = this.waitPopup.itemV.GetItem(sliderItem);
}

this.setLabelItem = function(labelItem) {
   this.labelItemH = this.waitPopup.itemH.GetItem(labelItem);
   this.labelItemV = this.waitPopup.itemV.GetItem(labelItem);
}

this.addWaitMessage = function(signal, message) {
   this.messageArray.push(message);
   this.signalArray.push(signal);   
}

this.finishSet = function() {
   setFinished = true;
}
///
this.showWaitPopup_block = false;
this.showWaitPopup = function() {
   if (this.showWaitPopup_block == false) {
      this.showWaitPopup_block = true;
      IR.ClearInterval(that.hidePopupTimeoutID);
      if (that.screenManager.isPopupOpen(that.waitPopup.name) == false) {
         that.screenManager.openPopup(that.waitPopup);
      }
      that.hidePopupTimeoutID = IR.SetTimeout(200000, function() {
         that.screenManager.closePopup(that.waitPopup);
      });
      this.showWaitPopup_block = false;
   }
}

this.hideWaitPopup = function() {
   IR.ClearInterval(that.hidePopupTimeoutID);
   if (that.screenManager.isPopupOpen(that.waitPopup.name) == true)
      this.screenManager.closePopup(this.waitPopup);
}

this.setSliderValue = function(value) {
   this.sliderItemH.Value = value;
   this.sliderItemV.Value = value;
}

this.setText = function(text) {
   this.labelItemH.Text = text;
   this.labelItemV.Text = text;   
}

IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function (name,value) {
   if (setFinished == true) {
   for (var i=1; i<that.arrayBusyIsOn.length; i++) {
      if (name == that.arrayBusyIsOn[i]) {
         if (value == true) {
            if (that.selectedID == i) {
               that.showWaitPopup();
            }
         } else {
            if (that.selectedID == i && that.screenManager.isPopupOpen(that.waitPopup.name)) {
               that.hideWaitPopup();
            }
         }
      }   
   }
   for (var i=0; i<that.waitArray.length; i++) {
      if (name == that.waitArray[i]) {
         if (that.selectedID == i) {
            that.setSliderValue(value);
         }
      }
   }   
   }         
});

//new
this.setSelectRoomObject = function(object, arrayBusyIsOn) {
   this.selectRoomObject = object;
   this.arrayBusyIsOn.push(0);
   for (var i=0; i<arrayBusyIsOn.length; i++) {
      this.arrayBusyIsOn.push(arrayBusyIsOn[i]);
   }
   this.selectRoomObject.addSelectIDListener(function() {
      that.selectedID = that.selectRoomObject.selectedID;
      if (that.selectedID > 0 && that.selectedID < that.arrayBusyIsOn.length) {
         if (that.crestron.getValue(that.arrayBusyIsOn[that.selectedID]) == true) {
            that.showWaitPopup();   
         }
      }   
   });   
}

}