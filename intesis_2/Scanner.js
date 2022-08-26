function scannerIntesisBox(in_gui)
{
	this.CLIENT_ID = "0e8d2102-6d7e-4eaf-bb03-f693cb00716b";
	this.CLIENT_SECRET = "VP1RjH8EN5PqsPi6OaaCTwUXg";

	this.gui = in_gui;
	this.thermostatArray = [];
	this.thermostatUsed = [];
   this.BOX_STASH = [];
	this.device = this.gui.device;
	this.settingsPopup = IR.GetPopup("Selector");
	this.settingsPopup.GetState(0).FillColor = 0x00000066;

   //driver to found intesis boxes
   this.driverForDiscoverIntesisBox = IR.CreateDevice(IR.DEVICE_CUSTOM_UDP, "discoverIntesisBox", "255.255.255.255", "3310" , "255.255.255.255", true, "3310");
   this.driverForDiscoverIntesisBox.Connect();

	this.scannerWindow = new Selector("Devices", "Cancel", false, "Select All", function(){
		for (var i = 0; i < this.list.ItemsCount; i++){
			var l_oItem = this.list.GetItemByIndex(i);
			if (l_oItem){
				l_oItem.Selected = this.add.Text == "Select All";
				l_oItem.SetOptions({
					mark: {
						Value: this.add.Text == "Select All" ? 1 : 0
					}
				});
			}
			this.button.Enable = this.add.Text == "Select All";
		}
		this.add.Text = this.add.Text == "Select All" ? "Clear All" : "Select All";
	}, "Add", function(){
		var l_aSelected = this.selector.list.GetSelected();
		var l_aThermostats = this.context.gui.intesisIDsValue;
		if(!l_aThermostats)
			l_aThermostats = [];
		for (var i = 0; i < l_aSelected.length; i++){
			l_aThermostats.push(l_aSelected[i].Data);
         //this.device = IR.CreateDevice(IR.DEVICE_CUSTOM_TCP, "IntesisBox driver " + l_aSelected[i].Data.ID, l_aSelected[i].Data.IP, l_aSelected[i].Data.Port);
         this.context.gui.driver.createDevice(l_aSelected[i].Data.ID, l_aSelected[i].Data.IP, l_aSelected[i].Data.Port);
         this.context.thermostatUsed.push(l_aSelected[i].Data.ID);
			this.context.gui.driver.createTag(l_aSelected[i].Data.ID);
			this.context.gui.notFoundMessageDisable();
			this.context.gui.recoveryPopups(l_aSelected[i].Data);
		}                      
		IR.SetVariable("Global.intesisIDs", JSON.Stringify(l_aThermostats));
		this.context.gui.intesisIDsValue = l_aThermostats;
		this.selector.Hide();
      
      IR.SetTimeout(1000, function(){
         var currentIndex = this.context.gui.staticList.list.PositionIndex;
         var itemsCount = this.context.gui.staticList.list.ItemsCount;
         if(itemsCount > 1)
         {
            var thermArray = this.context.gui.intesisIDsValue;
            this.context.gui.staticList.list.SetPosition(thermArray.length - 1);
            IR.SetTimeout(1000, function(){
               this.scanner.context.gui.staticList.list.SetPosition(this.index);
            }, {scanner: this, index: currentIndex});
         }      
      }, this); 
      IR.GetDevice("discoverIntesisBox").Disconnect();      
	}, this);


	//install selector popup
	this.scannerWindow.add.Visible = this.scannerWindow.add.Enable = false;
	this.scannerWindow.button.Enable = false;

	IR.AddListener(IR.EVENT_RECEIVE_TEXT, this.driverForDiscoverIntesisBox, this.dataAnalysis, this);

	IR.AddListener(IR.EVENT_ITEM_RELEASE, this.gui.scannerButton, function () {
		this.scannerWindow.Show();
		this.discoverIntesisBox();
      this.BOX_STASH = [];
		this.scannerWindow.loading.Visible = true;
		this.scannerWindow.button.Enable = false;
		this.scannerWindow.add.Enable = this.scannerWindow.add.Visible = false;
	}, this);
}

//check used thermostat
scannerIntesisBox.prototype.checkUsedSubDevice = function(in_sID){
	var l_bExist = false;
	for (var i = 0; i < this.thermostatUsed.length; i++){
		if (this.thermostatUsed[i] == in_sID){
			l_bExist = true;
			break;
		}
	}
	return l_bExist;
};


/**
 * Get info about thermostat
 * @private
 */
scannerIntesisBox.prototype.getInfoAboutThermostat = function () {

};

scannerIntesisBox.prototype.discoverIntesisBox = function(){
   //IR.Log("> DISCOVER");
   this.driverForDiscoverIntesisBox.Send(['DISCOVER','\r\n']); 
   IR.SetTimeout(1000,function(){
      IR.GetPopup("Selector").GetItem("loading").Visible = false;
   });
};


//create list of info about thermostat
scannerIntesisBox.prototype.updateListOfDevice = function(){
	if (this.scannerWindow){
		this.scannerWindow.loading.Visible = false;
		this.scannerWindow.add.Text = "Select All";
		this.scannerWindow.button.Enable = false;
		this.scannerWindow.list.Clear();
		if (this.thermostatArray.length > 0){
			this.scannerWindow.add.Visible = this.scannerWindow.add.Enable = true;
			//(in_sName, in_sTemplate, in_fAction, in_bLast)
			for (var i = 0; i < this.thermostatArray.length; i++){
				var l_oItem = this.scannerWindow.addSelectorItem(this.thermostatArray[i].Name, "IP", "TplScanner", function(listItem){
					if (listItem.Popup.GetItem("mark").Value == 1){
						listItem.Popup.GetItem("mark").Value = 0;
						listItem.Selected = false;
						var l_aSelected = this.scannerWindow.list.GetSelected();
						if (l_aSelected.length == 0){
							this.scannerWindow.button.Enable = false;
							this.scannerWindow.add.Text = "Select All";
						}
					} else {
						listItem.Popup.GetItem("mark").Value = 1;
						listItem.Selected = true;
						this.scannerWindow.button.Enable = true;
						this.scannerWindow.add.Text = "Clear All";
					}
				}, this, (i == this.thermostatArray.length - 1));
				l_oItem.SetData(this.thermostatArray[i])
			}
		} else {
			this.scannerWindow.add.Visible = this.scannerWindow.add.Enable = false;
			this.scannerWindow.button.Enable = false;
			this.scannerWindow.addSelectorItem(this.gui.staticList.list.ItemsCount > 0 ? "All devices are added" : "Devices not found", "", "NotFound", false, false, true);
		}
	}
};

scannerIntesisBox.prototype.dataAnalysis = function(in_text) {
   //IR.Log(in_text);
   var info = "";
   var l_oListScanner = IR.GetPopup("Selector").GetItem("list");
   if(in_text.length > 10 && in_text.slice(0,9) == "DISCOVER:"){
      info = in_text.replace(/\r/g,"").replace(/\n/g,"");
      info = info.slice(9,).split(",");
      
      var BOX_MODEL = info[0];
      var BOX_MAC = info[1]; 
      var BOX_IP = info[2];
      var BOX_PROTOCOL = info[3];
      var BOX_VERSION = info[4];
      var BOX_CONNECTION = info[5];
      var BOX_NAME = info[6];
      var BOX_SECURITY = info[7];
      var BOX_PORT = "3310";
      if(this.BOX_STASH.length < 1){
         this.BOX_STASH.push(BOX_MAC);
      }else{
         var isCount = 0;
         for(i = 0; i < this.BOX_STASH.length; i++)
            if(this.BOX_STASH[i] == BOX_MAC){
                isCount++;
                l_oListScanner.Popup.GetItemByIndex(i).GetItem("IP").Text = ""+BOX_IP;
            }
      }
      
      if(l_oListScanner.ItemsCount != this.BOX_STASH.length){
         var l_oItem = this.scannerWindow.addSelectorItem(BOX_NAME, BOX_IP, "TplScanner", function(listItem){
					if (listItem.Popup.GetItem("mark").Value == 1){
						listItem.Popup.GetItem("mark").Value = 0;
						listItem.Selected = false;
						var l_aSelected = this.scannerWindow.list.GetSelected();
						if (l_aSelected.length == 0){
							this.scannerWindow.button.Enable = false;
							this.scannerWindow.add.Text = "Select All";
						}
					} else {
						listItem.Popup.GetItem("mark").Value = 1;
						listItem.Selected = true;
						this.scannerWindow.button.Enable = true;
						this.scannerWindow.add.Text = "Clear All";
					}
				}, this, false);
         l_oItem.SetData({ID: BOX_MAC, Name: BOX_NAME, IP: BOX_IP, Port: BOX_PORT})
      }      
   }
};

scannerIntesisBox.prototype.addBrowserListener = function() {
};

scannerIntesisBox.prototype.removeBrowserListener = function() {
	IR.RemoveListener(IR.EVENT_RECEIVE_TEXT, this.driverForDiscoverIntesisBox, this.dataAnalysis, this);
};
