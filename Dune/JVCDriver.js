var JVCDriver = function() {
   var that = this;
   
   this.powerOn = function() {
      IR.SetTimeout(0, function() {IR.GetDevice("PR").Disconnect();});
      IR.SetTimeout(100, function() {IR.GetDevice("PR").Connect();});
      IR.SetTimeout(200, function() {IR.GetDevice("PR").Send(["PJREQ"]);});
      IR.SetTimeout(300, function() {IR.GetDevice("PR").Send([0x21,0x89,0x01,0x50,0x57,0x31,0x0A]);});
      IR.SetTimeout(500, function() {IR.GetDevice("PR").Disconnect();});
      IR.SetTimeout(600, function() {IR.GetDevice("PR").Connect();});
      IR.SetTimeout(700, function() {IR.GetDevice("PR").Send(["PJREQ"]);});
      IR.SetTimeout(800, function() {IR.GetDevice("PR").Send([0x21,0x89,0x01,0x50,0x57,0x31,0x0A]);});
      IR.SetTimeout(10500, function() {IR.GetDevice("PR").Disconnect();});
      IR.SetTimeout(10600, function() {IR.GetDevice("PR").Connect();});
      IR.SetTimeout(10700, function() {IR.GetDevice("PR").Send(["PJREQ"]);});
      IR.SetTimeout(10800, function() {IR.GetDevice("PR").Send([0x21,0x89,0x01,0x50,0x57,0x31,0x0A]);});
      IR.SetTimeout(20500, function() {IR.GetDevice("PR").Disconnect();});
      IR.SetTimeout(20600, function() {IR.GetDevice("PR").Connect();});
      IR.SetTimeout(20700, function() {IR.GetDevice("PR").Send(["PJREQ"]);});
      IR.SetTimeout(20800, function() {IR.GetDevice("PR").Send([0x21,0x89,0x01,0x50,0x57,0x31,0x0A]);});
   }
   
   this.powerOff = function() {
      IR.SetTimeout(0, function() {IR.GetDevice("PR").Disconnect();});
      IR.SetTimeout(100, function() {IR.GetDevice("PR").Connect();});
      IR.SetTimeout(200, function() {IR.GetDevice("PR").Send(["PJREQ"]);});
      IR.SetTimeout(300, function() {IR.GetDevice("PR").Send([0x21,0x89,0x01,0x50,0x57,0x30,0x0A]);});
      IR.SetTimeout(500, function() {IR.GetDevice("PR").Disconnect();});
      IR.SetTimeout(600, function() {IR.GetDevice("PR").Connect();});
      IR.SetTimeout(700, function() {IR.GetDevice("PR").Send(["PJREQ"]);});
      IR.SetTimeout(800, function() {IR.GetDevice("PR").Send([0x21,0x89,0x01,0x50,0x57,0x30,0x0A]);});
      IR.SetTimeout(10500, function() {IR.GetDevice("PR").Disconnect();});
      IR.SetTimeout(10600, function() {IR.GetDevice("PR").Connect();});
      IR.SetTimeout(10700, function() {IR.GetDevice("PR").Send(["PJREQ"]);});
      IR.SetTimeout(10800, function() {IR.GetDevice("PR").Send([0x21,0x89,0x01,0x50,0x57,0x30,0x0A]);});
      IR.SetTimeout(20500, function() {IR.GetDevice("PR").Disconnect();});
      IR.SetTimeout(20600, function() {IR.GetDevice("PR").Connect();});
      IR.SetTimeout(20700, function() {IR.GetDevice("PR").Send(["PJREQ"]);});
      IR.SetTimeout(20800, function() {IR.GetDevice("PR").Send([0x21,0x89,0x01,0x50,0x57,0x30,0x0A]);});
   }
   
   this.aspect = function() {
      IR.SetTimeout(0, function() {IR.GetDevice("PR").Disconnect();});
      IR.SetTimeout(100, function() {IR.GetDevice("PR").Connect();});
      IR.SetTimeout(200, function() {IR.GetDevice("PR").Send(["PJREQ"]);});
      IR.SetTimeout(300, function() {IR.GetDevice("PR").Send([0x21,0x89,0x01,0x52,0x43,0x37,0x33,0x37,0x37,0x0A]);});
   }
   
   this.on3d_auto = function() {
      IR.SetTimeout(0, function() {IR.GetDevice("PR").Disconnect();});
      IR.SetTimeout(100, function() {IR.GetDevice("PR").Connect();});
      IR.SetTimeout(200, function() {IR.GetDevice("PR").Send(["PJREQ"]);});
      IR.SetTimeout(300, function() {IR.GetDevice("PR").Send([0x21,0x89,0x01,0x49,0x53,0x33,0x44,0x31,0x0A]);});
   }
   
   this.on3d_off = function() {
      IR.SetTimeout(0, function() {IR.GetDevice("PR").Disconnect();});
      IR.SetTimeout(100, function() {IR.GetDevice("PR").Connect();});
      IR.SetTimeout(200, function() {IR.GetDevice("PR").Send(["PJREQ"]);});
      IR.SetTimeout(300, function() {IR.GetDevice("PR").Send([0x21,0x89,0x01,0x49,0x53,0x33,0x44,0x30,0x0A]);});
   }
   
   /*IR.AddListener(IR.EVENT_RECEIVE_TEXT, IR.GetDevice("PR"), function(text) {
      IR.Log("from pr: " + text);
   });*/
}