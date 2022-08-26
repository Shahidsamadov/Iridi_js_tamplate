var GC_RepeatIR = function(time_ms, deviceName, signalName, popupName, itemName) {
   var that = this;
   this.time_ms = time_ms;
   this.deviceName = deviceName;
   this.signalName = signalName;
   this.popupName = popupName;
   this.itemName = itemName;
   
   this.interval_id;
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, IR.GetPopup(this.popupName).GetItem(this.itemName), function() {
      that.interval_id = IR.SetInterval(that.time_ms, function() {that.sendCMD();});
   });
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetPopup(this.popupName).GetItem(this.itemName), function() {
      that.sendCMD();
      IR.ClearInterval(interval_id);      
   });
   
   this.sendCMD = function() {
      IR.Log("send cmd \""+that.signalName+"\", to device \""+ that.deviceName);
      IR.GetDevice(that.deviceName).Set(that.signalName, "");
   }
   
}