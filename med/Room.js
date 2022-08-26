var rooms = []; //global list of rooms

//Class Room
var Room = function(name, tokenA) {
   rooms.push(this);
   var that = this;
   this.name = name;
   this.tokenA = tokenA;
   this.deviceA = [];
   
   this.addDevice = function(device) {
      this.deviceA.push(device);
   }
   
   this.setState = function(type, value) {
      IR.Log("setState: type" + type + ",value"+value+",token " + this.tokenA[type]);
      IR.SetVariable(this.tokenA[type], value);   
   }
   
   this.updateState = function() {
      var lightState = false;
      var loadState = false;
      var mediaState = false;
      for(var i=0; i<this.deviceA.length; i++) {
         if (this.deviceA[i].isOn) {
            if (this.deviceA[i].type == 0 || this.deviceA[i].type == 1 || this.deviceA[i].type == 2 || this.deviceA[i].type == 3 || this.deviceA[i].type == 4 ||  this.deviceA[i].type == 5)
               lightState = true;
            if (this.deviceA[i].type == 6 || this.deviceA[i].type == 7 || this.deviceA[i].type == 8 || this.deviceA[i].type == 9)
               loadState = true;
            if (this.deviceA[i].type == 10 || this.deviceA[i].type == 11 || this.deviceA[i].type == 12)
               mediaState = true;
         }   
      }
      this.setState(0, lightState);
      this.setState(1, loadState);
      this.setState(2, mediaState);   
   }
}