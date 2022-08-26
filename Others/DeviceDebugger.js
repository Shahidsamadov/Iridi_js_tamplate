var DeviceDebugger = function(device, tag) {
   var that = this;
   this.device = device;
   this.tag = tag;
   IR.AddListener(IR.EVENT_CHANNEL_SET, IR.GetDevice("Global Cache"), function(name, value) {
      IR.Log(tag + ": " + name + ", " + value);
   });
}