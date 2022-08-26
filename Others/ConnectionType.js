function ConnectionType(device, localssid, itemPage, itemLOCAL, itemGLOBAL, itemNET) {
   var that = this;
   this.type = "local";     //"local" | "global"
   this.device = device;
   this.localssid = localssid;
   this.itemLOCAL = itemLOCAL;
   this.itemGLOBAL = itemGLOBAL;
   this.itemNET = itemNET;
   this.itemPage = itemPage;
   this.itemLOCALObject = IR.GetPage(this.itemPage).GetItem(this.itemLOCAL);
   this.itemGLOBALObject = IR.GetPage(this.itemPage).GetItem(this.itemGLOBAL);
   this.itemNETObject = IR.GetPage(this.itemPage).GetItem(this.itemNET);
   this.setType = function(type) {
      this.type = type;
      //IR.Log("Connection type: " + this.type);
      this.installType();
   }
   this.installType = function() {
      if (this.type == "local") {
         this.itemLOCALObject.Visible = true;
         this.itemGLOBALObject.Visible = false;
         this.itemNETObject.GetState(0).Text = IR.GetVariable("System.Net.SSID");
         this.device.SetParameters({Host: '192.168.11.6', Port: '41794', NetID: '9',  TelnetPort: '41795', TelnetLogin: '', TelnetPassword: '', TelnetSSL: 0});
      } else {
         this.itemLOCALObject.Visible = false;
         this.itemGLOBALObject.Visible = true;
         this.itemNETObject.GetState(0).Text = "Мобильная сеть"; 
         this.device.SetParameters({Host: '192.168.11.6', Port: '41794', NetID: '9',  TelnetPort: '41795', TelnetLogin: '', TelnetPassword: '', TelnetSSL: 0});
      }
   }
   IR.SetInterval(5000, function() {
      if (IR.GetVariable("System.Net.SSID") == that.localssid) {
         that.setType("local");
      } else {
         that.setType("global");
      }
   });
   this.itemLOCALObject.Visible = false;
   this.itemGLOBALObject.Visible = false;
   this.itemNETObject.GetState(0).Text = "";
}