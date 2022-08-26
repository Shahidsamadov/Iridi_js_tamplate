/**
 * Драйвер IntesisBox
 * @param in_authorizationStatus
 */
function driverIntesisBox(in_gui) {
	this.updateInterval = 10000;
	this.gui = in_gui;
	//this.device;
	this.thermostats = {};
	this.keyOfID = 1;
	this.keyArray = [];
	this.updTimer = 0;
	this.needUpdateMode = {};
	this.isTagsCreated = false;
	this.thermostatIDArray = [];

}
/**
 * Старт обновления данных от драйвера
 */
driverIntesisBox.prototype.startUpdateInterval = function (device) {
	//IR.Log("_startUpdateInterval " + this.updTimer);
	if (!this.updTimer) {
		this.updTimer = IR.SetInterval(this.updateInterval, function () {
			this.getDeviceStatus(device);
         this.getDeviceLimits(device);
		}, this);
      this.getDeviceStatus(device);
      this.getDeviceLimits(device);
   }
};   

driverIntesisBox.prototype.createTag = function (in_ID) {
	var l_sID = in_ID;
	this.keyArray.push({Key: this.keyOfID, ID: l_sID})
   
   this.device = IR.GetDevice("IntesisBox driver " + l_sID);

	this.device.SetFeedback("Name " + l_sID, "AC");
   this.device.SetFeedback("Power " + l_sID, "OFF");
   this.device.SetFeedback("PowerValue " + l_sID, "0");
   this.device.SetFeedback("Mode " + l_sID, "AUTO");
   this.device.SetFeedback("Fan " + l_sID, "AUTO");
   this.device.SetFeedback("Vertical Position " + l_sID, "AUTO");
   this.device.SetFeedback("Horizontal Position " + l_sID, "AUTO");
   this.device.SetFeedback("AC Temperature " + l_sID, "25");
   this.device.SetFeedback("AC Temperature Min " + l_sID, "18");
   this.device.SetFeedback("AC Temperature Max " + l_sID, "30");
   this.device.SetFeedback("Room Temperature " + l_sID, "25");
   this.device.SetFeedback("Offline " + l_sID, "OFFLINE");
   
   //IR.Log("l_sID "+l_sID);
   if(l_sID == "001DC9A188CF")
      this.device.SetFeedback("Mode " + l_sID, "COOL");   

	this.needUpdateMode[l_sID] = true;
	this.keyOfID++;
	this.isTagsCreated = true;
};


/**
 * A function of analyze of data
 * @param in_text - data
 * @private
 */


driverIntesisBox.prototype.getSubDevicesForDisable = function(){
	var l_aArray = [];
	var l_aID = this.gui.IntesisBoxIDsValue;
	if(!l_aID)
		return 0;
	var l_bExist = false;
	for (var i = 0; i < l_aID.length; i++){
		l_bExist = false;
		for (var j = 0; j < this.thermostatIDArray.length; j++){
			var l_sID = l_aID[i].ID;
			if (l_sID == this.thermostatIDArray[j]){
				l_bExist = true;
				break;
			}
		}
		if (!l_bExist){
			l_aArray.push(l_aID[i].ID);
		}
	}
	return l_aArray;
};


/**
 * A function for instalation of new temperature
 * @param in_id - string
 * @param in_value - string
 */

driverIntesisBox.prototype.getIDByKey = function (in_nKey) {
	var l_sID = "";
	for (var i = 0; i < this.keyArray.length; i++) {
		if (in_nKey == this.keyArray[i].Key) {
			l_sID = this.keyArray[i].ID;
			break;
		}
	}
	return l_sID;
};

driverIntesisBox.prototype.setAction = function (device,action,value) {
   //IR.Log("action "+action);
   //IR.Log("value "+value);
   //IR.Log(device.Name);
   var l_oPopup = IR.GetPopup("Remote"+(device.Name).slice("IntesisBox driver ".length,))
   //IR.Log(l_oPopup.Name);
   l_oPopup.GetItem("CoverLoading").Visible = true;
   l_oPopup.GetItem("ActionLoading").Visible = true;
   IR.ClearInterval(this.gui.CONNECTION);      
   /*this.gui.CONNECTION = IR.SetTimeout(5000,function(){
      l_oPopup.GetItem("Cover").Visible = true;
      l_oPopup.GetItem("Cover Offline").Text = "";
      l_oPopup.GetItem("btnRefresh").Visible = true;
      l_oPopup.GetItem("Power").Visible = false;
      l_oPopup.GetItem("CoverLoading").Visible = false;
      l_oPopup.GetItem("ActionLoading").Visible = false;
      device.Send(['LIMITS:'+ action +'\r\n'])
   });*/
   //IR.Log("> SET,1:"+ action +","+ value);
   device.Send(['SET,1:'+ action + ','+ value +'\r\n']);     
};

driverIntesisBox.prototype.setLimit = function(device,action,range){
   this.gui.l_oPopup.GetItem("CoverLoading").Visible = true;
   this.gui.l_oPopup.GetItem("ActionLoading").Visible = true;
   device.Send(['LIMITS:'+ action + ',['+ range +']\r\n'])
}; 
   
driverIntesisBox.prototype.getLimit = function(device,action){
   device.Send(['LIMITS:'+ action +'\r\n'])
};

driverIntesisBox.prototype.getDeviceLimits = function(device){
   IR.SetTimeout(500,this.getLimit(device,"FANSP"));
   IR.SetTimeout(500,this.getLimit(device,"MODE"));
   IR.SetTimeout(500,this.getLimit(device,"VANELR"));//vertical
   IR.SetTimeout(500,this.getLimit(device,"VANEUD"));//horizontal
   IR.SetTimeout(500,this.getLimit(device,"SETPTEMP"));
};

driverIntesisBox.prototype.getDeviceStatus = function(device){   
   device.Send(['GET,1:*\r\n']);    
};

driverIntesisBox.prototype.getAction = function(device,action){
   device.Send(['GET,1:'+ action +'\r\n']);
   //IR.Log('GET,1:'+ action +'\r\n');
};
      
driverIntesisBox.prototype.setConfig = function(device,configItem,value){      
   device.Send(['CFG:'+ configItem +','+ value +'\r\n'])
};

driverIntesisBox.prototype.getConfig = function(device,configItem){   
   device.Send(['CFG:'+ configItem +'\r\n'])
};

driverIntesisBox.prototype.createDevice = function(mac,ip,port){
   this.device = IR.CreateDevice(IR.DEVICE_CUSTOM_TCP, "IntesisBox driver " + mac, ip, port);
   this.device.Connect();
};
