function ConnectionSwitch(settings) {
   var that = this;
   this.type = IR.GetVariable("Global.lastConnectionType"); //false = local | true = global
   this.settings = settings;
   this.funcLocal = settings.funcLocal;
   this.funcGlobal = settings.funcGlobal;
   
   this.ssid = settings.ssid;
   
   this.intervalID = null;
   
   this.setType = function(type) {
      this.type = type;
      IR.SetVariable("Global.lastConnectionType", this.type);
      this.print();
      this.installType();   
   }
   
   this.installType = function() {
      //IR.Log("install connection type: "+this.type);
      if (!this.type) {
         this.funcLocal();
      } else {
         this.funcGlobal();
      }
   }
   
   this.print = function() {
      /*if (this.type) IR.Log("CS: " + "global");
      else IR.Log("CS: " + "local");*/
   }
   
   this.setTypeAuto = function() {
      if (this.intervalID != null)
         IR.ClearInterval(this.intervalID);
      this.intervalID = IR.SetInterval(1000, function() {
      if (IR.GetVariable("System.Net.SSID") == that.ssid) {
         that.setType(false);
      } else {
         that.setType(true);
      }
      });
   }
   
   this.setTypeOut = function() {
      if (this.intervalID != null)
         IR.ClearInterval(this.intervalID);
      this.setType(true);
   }
   
   this.setTypeIn = function() {
      if (this.intervalID != null)
         IR.ClearInterval(this.intervalID);
      this.setType(false);
   }
   
   this.setType(this.type);
}