function SaunaVoltage(crestron, signal) {
   var that = this;
   this.device = crestron.device;
   this.signal = signal;
   
   IR.AddListener(IR.EVENT_TAG_CHANGE, this.device, function(name, value) {
      if (name == that.signal) {
         IR.GetPopup("PopupSPA").GetItem("voltage").Text = "Напряжение " + value + "В";
      }
   }); 
}