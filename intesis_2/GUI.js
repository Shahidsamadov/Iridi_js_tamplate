function guiIntesisBox(in_wait, in_question)
{
	this.HVAC_MODE = {
		0: "heat",
		1: "cool",
		2: "heat-cool",
		"heat": 0,
		"cool": 1,
		"heat-cool": 2
	};

	this.remote = IR.GetPopup("Widget");
   this.l_oPopup;

	this.mainPage = IR.GetPage("MainPage IntesisBox");
	this.scannerButton = this.mainPage.GetItem("scanner");

	this.QuestionBox = in_question;
	this.WaitingWindow = in_wait;

	this.keyOfID = 1;
	this.keyArray = [];

	this.staticList = new SavantEffect(this.mainPage.GetItem("list"), "movedItem");

	var l_aThermostats = IR.GetVariable("Global.IntesisBoxIDs");
	if(l_aThermostats && l_aThermostats != "error")
		this.IntesisBoxIDsValue = JSON.Parse(IR.GetVariable("Global.IntesisBoxIDs"));
	else
		this.IntesisBoxIDsValue = undefined;
	
   this.driver = new driverIntesisBox(this);
	this.scanner = new scannerIntesisBox(this);

	if (this.IntesisBoxIDsValue) {
		this.notFoundMessageDisable();
		for (var i = 0; i < this.IntesisBoxIDsValue.length; i++) {
         this.driver.createDevice(IntesisBoxIDsValue[i].ID,this.IntesisBoxIDsValue[i].IP,IntesisBoxIDsValue[i].Port);
         this.scanner.thermostatUsed.push(this.IntesisBoxIDsValue[i].ID);
			this.driver.createTag(this.IntesisBoxIDsValue[i].ID);
			this.recoveryPopups(this.IntesisBoxIDsValue[i]);
		}
	} else {
		this.notFoundMessageEnable();
	}

}


guiIntesisBox.prototype.recoveryPopups = function (in_object) {
	var l_sID = in_object.ID;
	this.keyArray.push({Key: this.keyOfID, ID: l_sID});
	var l_sName = in_object.Name;
	var l_sWTitle = l_sName;
	var l_aWNames = "Remote" + l_sID; //Names of future widgets
	//recovery of widgets
	this.makeWidget(l_aWNames, l_sWTitle, l_sID);
   
   this.l_oPopup = IR.GetPopup(l_aWNames);
   
   IR.AddRelation("Drivers.IntesisBox driver " + l_sID +".Name " + l_sID, "UI." + l_aWNames + ".name");
   IR.AddRelation("Drivers.IntesisBox driver " + l_sID +".PowerValue " + l_sID, "UI." + l_aWNames + ".Power.Value");
   IR.AddRelation("Drivers.IntesisBox driver " + l_sID +".PowerValue " + l_sID, "UI." + l_aWNames + ".Power.State");
   IR.AddRelation("Drivers.IntesisBox driver " + l_sID +".AC Temperature " + l_sID, "UI." + l_aWNames + ".temp value.Value");
   IR.AddRelation("Drivers.IntesisBox driver " + l_sID +".Room Temperature " + l_sID, "UI." + l_aWNames + ".header value.Value");
   IR.AddRelation("Drivers.IntesisBox driver " + l_sID +".Mode " + l_sID, "UI." + l_aWNames + ".value MODE.Text");
   IR.AddRelation("Drivers.IntesisBox driver " + l_sID +".Fan " + l_sID, "UI." + l_aWNames + ".value FAN.Text");
   IR.AddRelation("Drivers.IntesisBox driver " + l_sID +".Vertical Position " + l_sID, "UI." + l_aWNames + ".value Vertical Vane.Text");
   IR.AddRelation("Drivers.IntesisBox driver " + l_sID +".Horizontal Position " + l_sID, "UI." + l_aWNames + ".value Horizontal Vane.Text");
   
   this.l_oPopup.GetItem("Cover").Visible = true;
   this.l_oPopup.GetItem("Cover Offline").Text = "";
   this.l_oPopup.GetItem("btnRefresh").Visible = true;
   this.l_oPopup.GetItem("Power").Visible = false;
   
	this.keyOfID++;
};


/**
 * A function for update remote
 * @param in_sId - string
 * @private
 */
guiIntesisBox.prototype.initRemoteElements = function(in_sId) {
	this.l_oPopup = IR.GetPopup("Remote" + in_sId);
	if (this.l_oPopup){
      
      //IR.GetPopup("PickerTemplate").GetState(0).TextColor = m_pTextColorPicker;
      this.SEARCHING;
      this.CONNECTION;
      
      this.l_oErrorPopup = IR.GetPopup("Error");
      
      this.l_oSettingsPopup = IR.GetPopup("Settings").Clone("Settings "+in_sId);
      this.l_oSelectPopup = IR.GetPopup("SelectPopup").Clone("SelectPopup "+in_sId);
      this.l_oSetValuePopup = IR.GetPopup("SetValuePopup").Clone("SetValuePopup "+in_sId); 
      this.l_oSelectTempPopup = IR.GetPopup("Picker").Clone("Picker "+in_sId);
      
      this.l_oSettingsPopupList = this.l_oSettingsPopup.GetItem("LstMode");
      this.l_oSelectPopupList = this.l_oSelectPopup.GetItem("LstMode");
      this.l_oSetValuePopupList = this.l_oSetValuePopup.GetItem("LstMode");
      
      this.l_oSetValuePopupBackground = this.l_oSetValuePopup.GetItem("panel bottom rounded third");
      this.l_oSettingsPopupBackground = this.l_oSettingsPopup.GetItem("panel bottom rounded third");
      this.l_oSelectPopupBackground = this.l_oSelectPopup.GetItem("panel bottom rounded third");
      
      this.ArrowLoading;//timer to show or hide items when data limits are sent
      
      this.l_oCurrentSettings = "";
      
      this.actions = {
         "Power" : "ONOFF",
         "Mode" : "MODE",
         "Temp" : "SETPTEMP",  
         "Fan" : "FANSP",
         "Horizontal" : "VANEUD",
         "Vertical" : "VANELR" 
      }
      
      var l_oButtonTriggerModeLeft = this.l_oPopup.GetItem("hvacInv left");
      var l_oButtonTriggerModeMid1 = this.l_oPopup.GetItem("hvacInv mid1");
      var l_oButtonTriggerModeMid2 = this.l_oPopup.GetItem("hvacInv mid2");
      var l_oButtonTriggerModeRight = this.l_oPopup.GetItem("hvacInv right");
      
      var l_oTabTriggerModeLeft = this.l_oPopup.GetItem("hvac left");
      var l_oTabTriggerModeMid1 = this.l_oPopup.GetItem("hvac mid1");
      var l_oTabTriggerModeMid2 = this.l_oPopup.GetItem("hvac mid2");
      var l_oTabTriggerModeRight = this.l_oPopup.GetItem("hvac right");
      
      var l_oButtonTriggerFanLeft = this.l_oPopup.GetItem("fanInv left");
      var l_oButtonTriggerFanMid1 = this.l_oPopup.GetItem("fanInv mid1");
      var l_oButtonTriggerFanMid2 = this.l_oPopup.GetItem("fanInv mid2");
      var l_oButtonTriggerFanRight = this.l_oPopup.GetItem("fanInv right");
      
      var l_oTabTriggerFanLeft = this.l_oPopup.GetItem("fan left");
      var l_oTabTriggerFanMid1 = this.l_oPopup.GetItem("fan mid1");
      var l_oTabTriggerFanMid2 = this.l_oPopup.GetItem("fan mid2");
      var l_oTabTriggerFanRight = this.l_oPopup.GetItem("fan right");
      
      this.ModeTabs = [l_oTabTriggerModeLeft, l_oTabTriggerModeMid1, l_oTabTriggerModeMid2, l_oTabTriggerModeRight];       
      this.FanTabs = [l_oTabTriggerFanLeft, l_oTabTriggerFanMid1, l_oTabTriggerFanMid2, l_oTabTriggerFanRight]; 
      this.ModeButtons = [l_oButtonTriggerModeLeft, l_oButtonTriggerModeMid1, l_oButtonTriggerModeMid2, l_oButtonTriggerModeRight];       
      this.FanButtons = [l_oButtonTriggerFanLeft, l_oButtonTriggerFanMid1, l_oButtonTriggerFanMid2, l_oButtonTriggerFanRight];
   }
};


/**
 * A function for creation the small, full widget, and remote
 * @param in_wNames - array
 * @param in_wTitle - string
 * @param in_SubDev - string
 */
guiIntesisBox.prototype.makeWidget = function(in_aWNames, in_sWTitle, in_sID) {
	this.l_oPopup = null;
	//Clone popup for the small widget
	if (!IR.GetPopup(in_aWNames))
		this.l_oPopup = this.remote.Clone(in_aWNames);
	else
		this.l_oPopup = IR.GetPopup(in_aWNames);

	this.l_oPopup.GetItem("name").Text = in_sWTitle;

	//Installation of widget and remote
	this.initRemoteElements(in_sID);
   this.initListeners(this.l_oPopup, in_sID, in_sWTitle);
	this.staticList.add(this.l_oPopup);
   this.driver.startUpdateInterval(IR.GetDevice("IntesisBox driver "+in_sID));
};

/**
 * A function for subscriptions to the elements of widget and remote
 * @param in_oRemotePopup - object
 * @param in_oWidget - object
 * @param in_sId - string
 * @param in_sLongName - string
 * @private
 */
guiIntesisBox.prototype.initListeners = function(in_oPopup, in_sId) {
   
   var CONNECTION = this.CONNECTION;
   var ArrowLoading = this.ArrowLoading;
 
   var tempValues = ["180","300"]
      
   var horValues = {
      "AUTO" : "0",
      "1" : "0",
      "2" : "0",
      "3" : "0",
      "4" : "0",
      "5" : "0",
      "6" : "0",
      "7" : "0",
      "8" : "0",
      "9" : "0",
      "SWING" : "0"
   };
   
   var verValues = {
      "AUTO" : "0",
      "1" : "0",
      "2" : "0",
      "3" : "0",
      "4" : "0",
      "5" : "0",
      "6" : "0",
      "7" : "0",
      "8" : "0",
      "9" : "0",
      "SWING" : "0"
   };
   
   var fanValues = {
      "AUTO" : "0",
      "1" : "0",
      "2" : "0",
      "3" : "0",
      "4" : "0",
      "5" : "0",
      "6" : "0",
      "7" : "0",
      "8" : "0",
      "9" : "0",
   };
   
   var modeValues = {
      "AUTO" : "0",
      "COOL" : "0",
      "HEAT" : "0",
      "FAN" : "0",
      "DRY" : "0"
   };
   var FanTabs = this.FanTabs;
   var FanButtons = this.FanButtons;
   var ModeTabs = this.ModeTabs;
   var ModeButtons = this.ModeButtons;
   var device = IR.GetDevice("IntesisBox driver "+in_sId);
   var l_oDriver = device;
   var l_sID = in_sId;
   var l_oPopup = IR.GetPopup("Remote"+ l_sID);
   var actions = {
         "Power" : "ONOFF",
         "Mode" : "MODE",
         "Temp" : "SETPTEMP",  
         "Fan" : "FANSP",
         "Horizontal" : "VANEUD",
         "Vertical" : "VANELR" 
      }
      
   var l_oCurrentAction = "";//stores the type of command to send to AC
  
   var l_oSettingsPopup = this.l_oSettingsPopup; 
   var l_oSelectPopup = this.l_oSelectPopup; 
   var l_oSetValuePopup = this.l_oSetValuePopup; 
   var l_oSelectTempPopup = this.l_oSelectTempPopup;
   var l_oErrorPopup = this.l_oErrorPopup;
   
   var l_oSettingsPopupList = this.l_oSettingsPopupList; 
   var l_oSelectPopupList = this.l_oSelectPopupList;
   var l_oSetValuePopupList = this.l_oSetValuePopupList;
   
   var l_oSetValuePopupBackground = this.l_oSetValuePopupBackground; 
   var l_oSettingsPopupBackground = this.l_oSettingsPopupBackground;
   var l_oSelectPopupBackground = this.l_oSelectPopupBackground; 
   
   var _Left = l_oSelectTempPopup.GetItem("_Left");
   var _Right = l_oSelectTempPopup.GetItem("_Right");
   var LeftPicker = l_oSelectTempPopup.CreateItem(IR.ITEM_PICKER, "leftPicker", {
		X: _Left.X,
		Y: _Left.Y + 6, // styled gui +6
		Min: 0,
		Max: 35,
		VisibleCount: 3,
		Template: IR.GetPopup("PickerTemplate")
	});
   
   LeftPicker.Y = l_oSelectTempPopup.GetItem("backPicker left").Y - 23;
   LeftPicker.Height = l_oSelectTempPopup.GetItem("backPicker left").Height + 36; 
   
   var RightPicker = l_oSelectTempPopup.CreateItem(IR.ITEM_PICKER, "rightPicker", {
		X: _Right.X,
		Y: _Right.Y + 6, // styled gui +6
		Min: 0,
		Max: 35,
		VisibleCount: 3,
		Template: IR.GetPopup("PickerTemplate")
	});
   
   RightPicker.Y = l_oSelectTempPopup.GetItem("backPicker right").Y - 23;
   RightPicker.Height = l_oSelectTempPopup.GetItem("backPicker right").Height + 36;
   
   //Listener offline of device
	IR.AddListener(IR.EVENT_OFFLINE, device, function () {
		//IR.Log("EVENT_OFFLINE   ");
	}, this);

	//Listener online of device
	IR.AddListener(IR.EVENT_ONLINE, device, function () {
		//IR.Log("EVENT_ONLINE   ");
      this.driver.getDeviceStatus(device);
      this.driver.getDeviceLimits(device);
	}, this);

	//Listener receive text of device
	IR.AddListener(IR.EVENT_RECEIVE_TEXT, device, function(in_text){
      var parse = [];
   
      //IR.Log(in_text);
      in_text = in_text.replace(/\r/g,"").replace(/\n/g,"");
      var last_chn = in_text.lastIndexOf("CHN");
      var last_limits = in_text.lastIndexOf("LIMITS");
      while(last_chn > 1 || last_limits > 1){
         var last_index
         if(last_chn > last_limits){
            last_index = last_chn;
         }else{
            last_index = last_limits;       
         }
         parse.push(in_text.slice(last_index,).replace(/\r/g,"").replace(/\n/g,""));
         in_text = in_text.slice(0,last_index);
         last_chn = in_text.lastIndexOf("CHN");
         last_limits = in_text.lastIndexOf("LIMITS");
      }
      if(in_text.lastIndexOf("ACK") > 1){
         in_text = in_text.replace(/ACK/g,"").replace(/\r/g,"").replace(/\n/g,"");
      }
      if(in_text.lastIndexOf("ER") > 1){
         in_text = in_text.replace(/ERR/g,"").replace(/ER/g,"").replace(/\]/g,"");
      }
      parse.push(in_text);
      while(parse.length > 0){
         //IR.Log("parse "+parse);
         var check = parse[parse.length - 1].slice(0,3); 
         //block: catch error or complete answer
         switch (check){
            case "ER":
               //IR.Log(parse[parse.length - 1]);
               //IR.Log("Last command was not sent");
               check = "";
               parse.pop();
               break;
            case "ERR":
               //IR.Log(parse[parse.length - 1]);
               //IR.Log("Last command was not sent");
               check = "";
               parse.pop();
               break;
            case "ACK":
               l_oPopup.GetItem("CoverLoading").Visible = false;
               l_oPopup.GetItem("ActionLoading").Visible = false;
               //IR.Log("< ACK start");
               //IR.Log("< "+parse[parse.length - 1]);               
               IR.SetTimeout(2000,doneForData);
               IR.ClearInterval(ArrowLoading);
               l_oPopup.GetItem("Cover").Visible = false;
               l_oPopup.GetItem("Cover Offline").Text = "Device is offline";
               l_oPopup.GetItem("btnRefresh").Visible = false;
               l_oPopup.GetItem("Power").Visible = true;
               IR.ClearInterval(CONNECTION);
               //IR.Log("< ACK end");
               check = "";
               parse.pop();
               break;
            case "OK":
               //IR.Log("Command to change config was successfully  completed");
               check = "";
               parse.pop();
               break;
            case "CFG":
               //IR.Log("< CFG");
               check = "";
               parse.pop();
               break;
            case "LIM": 
               l_oPopup.GetItem("CoverLoading").Visible = false;
               l_oPopup.GetItem("ActionLoading").Visible = false;
               l_oPopup.GetItem("Cover").Visible = false; 
               l_oPopup.GetItem("Cover").Visible = false;
               l_oPopup.GetItem("Cover Offline").Text = "Device is offline";
               l_oPopup.GetItem("btnRefresh").Visible = false;
               l_oPopup.GetItem("Power").Visible = true;     
               var actionFunc = parse[parse.length - 1].slice(7,15).split(",")[0];                 
                  switch(actionFunc){
                     case actions.Fan:
                        //IR.Log("> LIMITS:"+actions.Fan);
                        fanLimit = parse[parse.length - 1].slice(14,parse[parse.length - 1].length - 1).split(",");
                        refreshSetValues(fanLimit,fanValues);
                        //IR.Log("< LIMITS:"+actions.Fan+",["+ fanLimit +"]");
                        widgetRebuild(fanLimit,"Fan");
                        for(i = 0; i < FanTabs; i++){
                           this.l_oPopup.GetItem(FanTabs[i].Name).State = 0;
                           this.l_oPopup.GetItem(FanTabs[i].Name).Value = 0;
                           if(l_oPopup.GetItem(FanTabs[i].Name).Text.toUpperCase() == l_oDriver.GetFeedback("Fan "+l_sID)){
                              l_oPopup.GetItem(FanTabs[i].Name).State = 1;
                              l_oPopup.GetItem(FanTabs[i].Name).Value = 1;
                           }
                        };
                        
                        parse.pop();
                        break;
                     case actions.Mode:
                        //IR.Log("> LIMITS:"+actions.Mode);
                        modeLimit = parse[parse.length - 1].slice(13,parse[parse.length - 1].length - 1).split(",");
                        refreshSetValues(modeLimit,modeValues);
                        //IR.Log("< LIMITS:"+actions.Mode+",["+ modeLimit +"]");
                        widgetRebuild(modeLimit,"Mode"); 
                        for(i = 0; i < ModeTabs; i++){
                           l_oPopup.GetItem(ModeTabs[i].Name).State = 0;
                           l_oPopup.GetItem(ModeTabs[i].Name).Value = 0;
                           if(l_oPopup.GetItem(ModeTabs[i].Name).Text.toUpperCase() == l_oDriver.GetFeedback("Mode "+l_sID)){
                              l_oPopup.GetItem(ModeTabs[i].Name).State = 1;
                              l_oPopup.GetItem(ModeTabs[i].Name).Value = 1;
                           }
                        };
                        parse.pop();
                        break;
                     case actions.Vertical:
                        //IR.Log("> LIMITS:"+actions.Vertical);
                        verLimit = parse[parse.length - 1].slice(15,parse[parse.length - 1].length - 1).split(",");
                        refreshSetValues(verLimit,verValues);
                        //IR.Log("< LIMITS:"+actions.Vertical+",["+ verLimit +"]");
                        parse.pop();
                        break;
                     case actions.Horizontal:
                        //IR.Log("> LIMITS:"+actions.Horizontal);
                        horLimit = parse[parse.length - 1].slice(15,parse[parse.length - 1].length - 1).split(",");
                        refreshSetValues(horLimit,horValues);
                        //IR.Log("< LIMITS:"+actions.Horizontal+",["+ horLimit +"]");
                        parse.pop();
                        break;
                     case actions.Temp:
                        //IR.Log("> LIMITS:"+actions.Temp);
                        tempLimit = parse[parse.length - 1].slice(17,parse[parse.length - 1].length - 1).split(",");
                        refreshSetTemp(tempLimit,tempValues);
                        l_oDriver.SetFeedback("AC Temperature Min " + l_sID, tempValues[0]);
                        l_oDriver.SetFeedback("AC Temperature Max " + l_sID, tempValues[1]);
                        //IR.Log("< LIMITS:"+actions.Temp+",["+ tempLimit +"]");
                        parse.pop();
                        break;
                  }
               break;
            case "CHN":               
               var tempValue = parse[parse.length - 1].split(',')[2].replace(/\r/g,"").replace(/\n/g,"");
               var actionFunc = parse[parse.length - 1].slice(6,12).split(",")[0];
               l_oPopup.GetItem("Cover").Visible = false;
               l_oPopup.GetItem("Cover").Visible = false;
               l_oPopup.GetItem("Cover Offline").Text = "Device is offline";
               l_oPopup.GetItem("btnRefresh").Visible = false;
               l_oPopup.GetItem("Power").Visible = true;
                  switch(actionFunc){
                     default:
                        parse.pop();
                        break;
                     case actions.Power:
                        //IR.Log("> CHN,1:"+ actions.Power); 
                        l_oDriver.SetFeedback("Power " + l_sID, tempValue);
                        l_oDriver.SetFeedback("PowerValue " + l_sID, tempValue == "OFF" ? 0 : 1);
                        l_oDriver.SetFeedback("Offline " + l_sID, tempValue == "OFF" ? "OFFLINE" : "ONLINE");
                        if(l_oDriver.GetFeedback("Offline " + l_sID) == "OFFLINE"){
                           //IR.Log("true");
                           l_oPopup.GetItem("Cover Offline").Visible = true;
                           l_oPopup.GetItem("Cover").Visible = false;
                           l_oPopup.GetItem("Cover Offline").Text = "Device is offline";
                           l_oDriver.SetFeedback("Room Temperature " + l_sID, 0); 
                        }else{ 
                           //IR.Log("false");
                           l_oPopup.GetItem("Cover Offline").Visible = false;
                        }  
                        //IR.Log("< CHN,1:"+ actions.Power +","+ tempValue);
                        parse.pop();
                        device.Send(['GET,1:AMBTEMP\r\n'])                        
                        break;                    
                     case actions.Fan:
                        //IR.Log("> CHN,1:"+ actions.Fan);
                        if(tempValue.length == 1)
                           tempValue = "Speed "+tempValue
                        l_oDriver.SetFeedback("Fan " + l_sID,  tempValue);
                        //IR.Log("< CHN,1:"+ actions.Fan +","+ tempValue); 
                        parse.pop();
                        checkTabState("Fan");
                        break;
                     case actions.Mode:
                        //IR.Log("> CHN,1:"+ actions.Mode);
                        l_oDriver.SetFeedback("Mode " + l_sID,  tempValue);
                        //IR.Log("< CHN,1:"+ actions.Mode +","+ tempValue);   				
                        parse.pop();
                        checkTabState("Mode");
                        break;
                     case actions.Vertical:
                        //IR.Log("> CHN,1:"+ actions.Vertical);
                        if(tempValue.length == 1)
                           tempValue = "Pos "+tempValue 
                        l_oDriver.SetFeedback("Vertical Position " + l_sID,  tempValue);
                        //IR.Log("< CHN,1:"+ actions.Vertical +","+ tempValue);    				
                        parse.pop();
                        break;
                     case actions.Horizontal:
                        //IR.Log("> CHN,1:"+ actions.Horizontal);
                        if(tempValue.length == 1)
                           tempValue = "Pos "+tempValue
                        l_oDriver.SetFeedback("Horizontal Position " + l_sID,  tempValue);   
                        //IR.Log("< CHN,1:"+ actions.Horizontal +","+ tempValue);     				
                        parse.pop();
                        break;
                     case "SETPTE":
                        //IR.Log("> CHN,1:SETPTEMP");
                        l_oDriver.SetFeedback("AC Temperature " + l_sID, tempValue / 10);  
                        //IR.Log("< CHN,1:SETPTEMP,"+tempValue);      				
                        parse.pop();
                        break;
                     case "AMBTEM":
                        //IR.Log("> CHN,1:AMBTEMP");
                        if(l_oDriver.GetFeedback("Offline " + l_sID) == "OFFLINE"){
                           l_oDriver.SetFeedback("Room Temperature " + l_sID , 0); 
                        }else{
                           l_oDriver.SetFeedback("Room Temperature " + l_sID , tempValue / 10);
                        } 
                        //IR.Log("< CHN,1:AMBTEMP,"+tempValue);                  				
                        parse.pop();
                        break;
                  }
               check = "";
               break;
            case "INF":
               //IR.Log("> INF");
               check = "";
               parse.pop();
               break;
            default:
               check = "";
               parse.pop();
               break;
         }
      }
      
      function checkTabState(type){
         var array = [];
         switch(type){
            case "Fan":
               array = FanTabs;
               break;
            case "Mode":
               array = ModeTabs;
               break;
         }
         for(i = 0; i < array.length; i++){
            var tag = l_oDriver.GetFeedback(type+" "+l_sID);
            if(tag.length == 1)
               tag = "Speed "+tag;
            if(l_oPopup.GetItem(array[i].Name).Text == tag){
               l_oPopup.GetItem(array[i].Name).State = 1;
            }else{
               l_oPopup.GetItem(array[i].Name).State = 0;
            }
         }
      }
      
      function widgetRebuild(activeElements,type){
         var SOFW = IR.GetScaleWidth();
         var widgetElements;
         var Triggers;
         var Buttons;
         var Border,Label,Parameter,Arrow;
         if(type == "Mode"){
            Triggers = ModeTabs;
            Buttons = ModeButtons;
            Border = l_oPopup.GetItem("Selected 1");
            Label = l_oPopup.GetItem("Label Mode");
            Parameter = l_oPopup.GetItem("value MODE");
            Arrow = l_oPopup.GetItem("ArrowMode");
         }else if(type == "Fan"){
            Triggers = FanTabs;
            Buttons = FanButtons;
            Border = l_oPopup.GetItem("Selected 2");
            Label = l_oPopup.GetItem("Label Fan");
            Parameter = l_oPopup.GetItem("value FAN");                
            Arrow = l_oPopup.GetItem("ArrowFan");
         }
   
         
         Border.Visible = false;
         Label.Visible = false;
         Parameter.Visible = false;
         Arrow.Visible = false;
         
         
         //IR.Log(FanTabs);
         //IR.Log(ModeTabs);
         //IR.Log(Triggers);
         for(i = 0; i < Triggers.length; i++)
            Triggers[i].Visible = false;
         
         for(i = 0; i < Buttons.length; i++)
            Buttons[i].Visible = false;
         
         for(i = 0; i < activeElements.length; i++){
            if(activeElements[i].length == 1)
               activeElements[i] = "Speed "+activeElements[i];  
         }
      	var l_nDefaultWidth = 288 // SOFW;
         var count = activeElements.length;
         if(count > 5)
            count = 5;	
         switch (count + "") {
            default:
               Border.Visible = false;
               Label.Visible = true;
               Parameter.Visible = true;
               break;
            case "2":
               l_nDefaultWidth = 288 // SOFW;
               Triggers[0].Visible = true;
               Buttons[0].Visible = true;
               Triggers[0].Width = l_nDefaultWidth;
               Buttons[0].Width = l_nDefaultWidth;
               Triggers[0].GetState(0).Text = activeElements[0];
               Triggers[0].GetState(1).Text = activeElements[0];
               
               Triggers[3].Visible = true;
               Buttons[3].Visible = true;
               Triggers[3].Width = l_nDefaultWidth;
               Buttons[3].Width = Triggers[3].Width
               Triggers[3].X = Triggers[0].X + Triggers[0].Width
               Buttons[3].X = Triggers[3].X
               Triggers[3].GetState(0).Text = activeElements[1];
               Triggers[3].GetState(1).Text = activeElements[1];
               
               checkTabState("Fan");
               checkTabState("Mode");
               break;
            case "3":
               l_nDefaultWidth = 192 // SOFW;
               Triggers[0].Visible = true;
               Buttons[0].Visible = true;
               Triggers[0].Width = l_nDefaultWidth;
               Buttons[0].Width = l_nDefaultWidth;
               Triggers[0].GetState(0).Text = activeElements[0];
               Triggers[0].GetState(1).Text = activeElements[0];
               
               Triggers[1].Visible = true;
               Buttons[1].Visible = true;
               Triggers[1].Width = l_nDefaultWidth;
               Buttons[1].Width = l_nDefaultWidth;
               Triggers[1].X = Triggers[0].X + Triggers[0].Width;
               Buttons[1].X = Triggers[1].X;
               Triggers[1].GetState(0).Text = activeElements[1];
               Triggers[1].GetState(1).Text = activeElements[1];
               
               Triggers[3].Visible = true;
               Buttons[3].Visible = true;
               Triggers[3].Width = l_nDefaultWidth;
               Buttons[3].Width = l_nDefaultWidth;
               Triggers[3].X = Triggers[1].X + Triggers[1].Width;
               Buttons[3].X = Triggers[3].X;
               Triggers[3].GetState(0).Text = activeElements[2];
               Triggers[3].GetState(1).Text = activeElements[2];
               
               checkTabState("Fan");
               checkTabState("Mode");
               break;
            case "4":
               l_nDefaultWidth = 144 // SOFW;
               Triggers[0].Visible = true;
               Buttons[0].Visible = true;
               Triggers[0].Width = l_nDefaultWidth;
               Buttons[0].Width = l_nDefaultWidth;
               Triggers[0].GetState(0).Text = activeElements[0];
               Triggers[0].GetState(1).Text = activeElements[0];
               
               Triggers[1].Visible = true;
               Buttons[1].Visible = true;
               Triggers[1].Width = l_nDefaultWidth;
               Buttons[1].Width = l_nDefaultWidth;
               Triggers[1].X = Triggers[0].X + Triggers[0].Width;
               Buttons[1].X = Triggers[1].X
               Triggers[1].GetState(0).Text = activeElements[1];
               Triggers[1].GetState(1).Text = activeElements[1];
               
               Triggers[2].Visible = true;
               Buttons[2].Visible = true;
               Triggers[2].Width = l_nDefaultWidth + 2;
               Buttons[2].Width = Triggers[2].Width;
               Triggers[2].X = (Triggers[1].X + Triggers[1].Width) - 2;
               Buttons[2].X = Triggers[2].X;
               Triggers[2].GetState(0).Text = activeElements[2];
               Triggers[2].GetState(1).Text = activeElements[2];
               
               Triggers[3].Visible = true;
               Buttons[3].Visible = true;
               Triggers[3].Width = l_nDefaultWidth;
               Buttons[3].Width = l_nDefaultWidth;
               Triggers[3].X = Triggers[2].X + Triggers[2].Width - 1;
               Buttons[3].X = Triggers[3].X
               Triggers[3].GetState(0).Text = activeElements[3];
               Triggers[3].GetState(1).Text = activeElements[3];
               
               checkTabState("Fan");
               checkTabState("Mode");                           
               break;
            case "5":
               Border.Visible = true;
               Border.Hit = 0;
               Label.Visible = true;
               Label.Hit = 2;
               Parameter.Visible = true;
               Parameter.Hit = 2;
               Arrow.Visible = true;
               Arrow.Hit = 2;
               break;
            }
      };
      
      function refreshSetValues(arrayRange, arrayValues){
         for(key in arrayValues)
            arrayValues[key] = "0";   
         for(i = 0; i < arrayRange.length; i++)
            for(key in arrayValues)   
               if(arrayRange[i] == key)
                  arrayValues[key] = "1";
      };
   
      function refreshSetTemp(arrayRange, arrayValues){
         arrayValues[0] = arrayRange[0];
         l_oDriver.SetFeedback("AC Temperature Min "+l_sID, arrayRange[0]);
         arrayValues[1] = arrayRange[1];
         l_oDriver.SetFeedback("AC Temperature Max "+l_sID, arrayRange[1]);
      };
      
   }, this);


	/**
	 * Subscriptions to the elements of widget and remote
	 */
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, in_oPopup.GetItem("Selected 1"), function(Item, Subitem, TypeEvent, object) {  
      IR.ShowPopup(l_oSetValuePopup.Name);
      l_oCurrentAction = actions.Mode;
      l_oSetValuePopupList.Clear();
      var array = ["AUTO","HEAT","COOL","DRY","FAN"];
      for(i = 0; i < array.length; i++){         
         for (key in modeValues){
            if(array[i] == key && modeValues[key] == 1){
               var currentValue = 0;
               if(key == l_oDriver.GetFeedback("Mode "+l_sID))
                  currentValue = 1;
               l_oSetValuePopupList.AddItem("TplSelectMode", { LblMode: { Text: array[i] }, TrgMode: { Value: currentValue } }, 0);
               resizeListHeight(l_oSetValuePopupList,l_oSetValuePopupBackground);
            }
         }
      }
      l_oSetValuePopupList.GetItemByIndex(l_oSetValuePopupList.ItemsCount - 1).Popup.GetItem("Line").Visible = false;
   }, this);
      
   IR.AddListener(IR.EVENT_ITEM_RELEASE, in_oPopup.GetItem("Selected 2"), function(Item, Subitem, TypeEvent, object) {  
      IR.ShowPopup(l_oSetValuePopup.Name);
      l_oCurrentAction = actions.Fan;
      l_oSetValuePopupList.Clear();
      var array = ["AUTO","Speed 1","Speed 2","Speed 3","Speed 4","Speed 5","Speed 6","Speed 7","Speed 8","Speed 9","SWING"];
      for(i = 0; i < array.length; i++){         
         for (key in fanValues){
            if(array[i].replace("Speed ","").replace("Position ","").replace("Pos ","") == key && fanValues[key] == 1){
               var currentValue = 0;
               if(array[i] == l_oDriver.GetFeedback("Fan "+l_sID))
                  currentValue = 1;
               l_oSetValuePopupList.AddItem("TplSelectMode", { LblMode: { Text: array[i] }, TrgMode: { Value: currentValue } }, 0);
               resizeListHeight(l_oSetValuePopupList,l_oSetValuePopupBackground);
            }
         }
      }
      l_oSetValuePopupList.GetItemByIndex(l_oSetValuePopupList.ItemsCount - 1).Popup.GetItem("Line").Visible = false;   
   }, this);
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, in_oPopup.GetItem("Selected 3"), function(Item, Subitem, TypeEvent, object) {  
      IR.ShowPopup(l_oSetValuePopup.Name);
      l_oCurrentAction = actions.Vertical;
      l_oSetValuePopupList.Clear();
      var array = ["AUTO","Position 1","Position 2","Position 3","Position 4","Position 5","Position 6","Position 7","Position 8","Position 9","SWING"];
      for(i = 0; i < array.length; i++){         
         for (key in verValues){
            if(array[i].replace("Position ","").replace("Pos ","") == key && verValues[key] == 1){
               var currentValue = 0;
               if(array[i].replace("ition","") == l_oDriver.GetFeedback("Vertical Position "+l_sID))
                  currentValue = 1;
               l_oSetValuePopupList.AddItem("TplSelectMode", { LblMode: { Text: array[i] }, TrgMode: { Value: currentValue } }, 0);
               resizeListHeight(l_oSetValuePopupList,l_oSetValuePopupBackground);
            }
         }
      }    
      l_oSetValuePopupList.GetItemByIndex(l_oSetValuePopupList.ItemsCount - 1).Popup.GetItem("Line").Visible = false;  
   }, this); 
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, in_oPopup.GetItem("Selected last"), function(Item, Subitem, TypeEvent, object) {  
      IR.ShowPopup(l_oSetValuePopup.Name);
      l_oCurrentAction = actions.Horizontal;
      l_oSetValuePopupList.Clear();
      var array = ["AUTO","Position 1","Position 2","Position 3","Position 4","Position 5","Position 6","Position 7","Position 8","Position 9","SWING"];
      for(i = 0; i < array.length; i++){         
         for (key in horValues){
            if(array[i].replace("Position ","").replace("Pos ","") == key && horValues[key] == 1){
               var currentValue = 0;
               if(array[i].replace("ition","") == l_oDriver.GetFeedback("Horizontal Position "+l_sID))
                  currentValue = 1;
               l_oSetValuePopupList.AddItem("TplSelectMode", { LblMode: { Text: array[i] }, TrgMode: { Value: currentValue } }, 0);
               resizeListHeight(l_oSetValuePopupList,l_oSetValuePopupBackground);
            }
         }
      }
      l_oSetValuePopupList.GetItemByIndex(l_oSetValuePopupList.ItemsCount - 1).Popup.GetItem("Line").Visible = false;      
   }, this);
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, in_oPopup.GetItem("temp increase"), function(){
      var MAX = parseInt(l_oDriver.GetFeedback("AC Temperature Max "+l_sID)) / 10;
      var MIN = parseInt(l_oDriver.GetFeedback("AC Temperature Min "+l_sID)) / 10;
      var CURRENT = l_oDriver.GetFeedback("AC Temperature "+l_sID);
      //IR.Log("MAX "+MAX);
      //IR.Log("MIN "+MIN);
      //IR.Log("CURRENT "+CURRENT);
      var setTemp = parseInt(CURRENT) + 1;
      if(setTemp < MIN){
         setAction(device,actions.Temp,MIN * 10);
      }else{
         if(setTemp < MAX || setTemp == MAX){
            setAction(device,actions.Temp,setTemp * 10);
         }else{
            this.l_oErrorPopup.GetItem("errorLabel").Text = "You cannot exceed the current";
            this.l_oErrorPopup.GetItem("errorLabel 1").Text = "temperature limit ("+MAX+"°)";
            IR.ShowPopup(this.l_oErrorPopup.Name);        
         }
      }
   }, this); 
       
   IR.AddListener(IR.EVENT_ITEM_RELEASE, in_oPopup.GetItem("temp decrease"), function(){
      var MIN = parseInt(l_oDriver.GetFeedback("AC Temperature Min "+l_sID)) / 10;
      var MAX = parseInt(l_oDriver.GetFeedback("AC Temperature Max "+l_sID)) / 10;        
      var CURRENT = l_oDriver.GetFeedback("AC Temperature "+l_sID);
      //IR.Log("MAX "+MAX);
      //IR.Log("MIN "+MIN);
      //IR.Log("CURRENT "+CURRENT);
      var setTemp = parseInt(CURRENT) - 1;
      if(setTemp > MAX){
         //IR.Log(MAX*10);
         setAction(device,actions.Temp,MAX * 10);
      }else{
         if(setTemp > MIN || setTemp == MIN){
            setAction(device,actions.Temp,setTemp * 10);
         }else{
            this.l_oErrorPopup.GetItem("errorLabel").Text = "You cannot exceed the current";
            this.l_oErrorPopup.GetItem("errorLabel 1").Text = "temperature limit ("+MIN+"°)";
            IR.ShowPopup(this.l_oErrorPopup.Name);       
         }
      }
   }, this);
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, in_oPopup.GetItem("PowerInv"), function(){
      var powerValue = l_oDriver.GetFeedback("Power "+l_sID);
      
      var action = actions.Power;
      var value = powerValue == "OFF" ? "ON" : "OFF"
      setAction(device,action,value);
   }, this);
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, in_oPopup.GetItem("fanInv left"), function(){
      l_oActiveFan = FanTabs[0] 
      var value = FanTabs[0].GetState(0).Text.replace("Speed ","").replace("Position ","").replace("Pos ","");
      setAction(device,actions.Fan,value.toString());
      //checkTabState("Fan");
   }, this);
   
   IR.AddListener(IR.EVENT_ITEM_PRESS, in_oPopup.GetItem("fanInv mid1"), function(){
      l_oActiveFan = FanTabs[1]   
      var value = FanTabs[1].GetState(0).Text.replace("Speed ","").replace("Position ","").replace("Pos ","");
      setAction(device,actions.Fan,value.toString());
      //checkTabState("Fan");
   }, this);
      
   IR.AddListener(IR.EVENT_ITEM_PRESS, in_oPopup.GetItem("fanInv mid2"), function(){
      l_oActiveFan = FanTabs[2] 
      var value = FanTabs[2].GetState(0).Text.replace("Speed ","").replace("Position ","").replace("Pos ","");
      setAction(device,actions.Fan,value.toString()); 
      //checkTabState("Fan"); 
   }, this);  
    
   IR.AddListener(IR.EVENT_ITEM_PRESS, in_oPopup.GetItem("fanInv right"), function(){
      l_oActiveFan = FanTabs[3] 
      var value = FanTabs[3].GetState(0).Text.replace("Speed ","").replace("Position ","").replace("Pos ","");
      setAction(device,actions.Fan,value.toString()); 
      //checkTabState("Fan");
   }, this);   
    
   IR.AddListener(IR.EVENT_ITEM_PRESS, in_oPopup.GetItem("hvacInv left"), function(){
      l_oActiveMode = ModeTabs[0]  
      var value = ModeTabs[0].GetState(0).Text;
      setAction(device,actions.Mode,value.toString());
      //checkTabState("Mode");
   }, this);  
     
   IR.AddListener(IR.EVENT_ITEM_PRESS, in_oPopup.GetItem("hvacInv mid1"), function(){
      l_oActiveMode = ModeTabs[1]   
      var value = ModeTabs[1].GetState(0).Text;
      setAction(device,actions.Mode,value.toString());
      //checkTabState("Mode");
   }, this);  
    
   IR.AddListener(IR.EVENT_ITEM_PRESS, in_oPopup.GetItem("hvacInv mid2"), function(){
      l_oActiveMode = ModeTabs[2] 
      var value = ModeTabs[2].GetState(0).Text;
      setAction(device,actions.Mode,value.toString());
      //checkTabState("Mode"); 
   }, this);
      
   IR.AddListener(IR.EVENT_ITEM_PRESS, in_oPopup.GetItem("hvacInv right"), function(){
      l_oActiveMode = ModeTabs[3] 
      var value = ModeTabs[3].GetState(0).Text;
      setAction(device,actions.Mode,value.toString());  
      //checkTabState("Mode");
   }, this);

   IR.AddListener(IR.EVENT_ITEM_PRESS, in_oPopup.GetItem("btnRefresh"),function(){ 
      device.Disconnect();
      device.Connect();
      //setAction(device,"FANSP","AUTO");
      //device.Send(['GET,1:FANSP\r\n']);
   },this);
   
   IR.AddListener(IR.EVENT_ITEM_SELECT, l_oSetValuePopupList, function(number){
      var value = l_oSetValuePopupList.GetItemByIndex(number).Popup.GetItem("LblMode").Text.replace("Speed ","").replace("Position ","").replace("Pos ","");
      setAction(device,l_oCurrentAction,value.toString());
      IR.HidePopup(l_oSetValuePopup.Name);
   })
      
   IR.RemoveListener(IR.EVENT_ITEM_RELEASE, l_oSetValuePopup.GetItem("BtnCancel"),listenerSetValuePopupCancelButton); 
   IR.AddListener(IR.EVENT_ITEM_RELEASE, l_oSetValuePopup.GetItem("BtnCancel"),listenerSetValuePopupCancelButton, l_oSetValuePopup);
   
   function listenerSetValuePopupCancelButton() {
         IR.HidePopup(l_oSetValuePopup.Name);
      };
      
   IR.AddListener(IR.EVENT_ITEM_PRESS, in_oPopup.GetItem("btnSettings"),function(){        
      IR.ShowPopup(l_oSettingsPopup.Name);
      //getDeviceLimits(); 
      l_oSettingsPopupList.Clear();
      l_oSettingsPopupList.AddItem("TplSettingsDevice", { LblMode: { Text: "Select HVAC" }, LblParam: { Text: "" }, LblLoad: { Visible: false } }, 0);
      l_oSettingsPopupList.AddItem("TplSettingsDevice", { LblMode: { Text: "Select Fan speed" }, LblParam: { Text: "" }, LblLoad: { Visible: false } }, 0);
      l_oSettingsPopupList.AddItem("TplSettingsDevice", { LblMode: { Text: "Select Horizontal vane position" }, LblParam: { Text: "" }, LblLoad: { Visible: false } }, 0);
      l_oSettingsPopupList.AddItem("TplSettingsDevice", { LblMode: { Text: "Select Vertical vane position" }, LblParam: { Text: "" }, LblLoad: { Visible: false } }, 0);
      l_oSettingsPopupList.AddItem("TplSettingsDevice", { LblMode: { Text: "Select Temperature range" }, LblParam: { Text: "" }, Line: { Visible: false}, LblLoad: { Visible: false } }, 0);
      resizeListHeight(l_oSettingsPopupList,l_oSettingsPopupBackground);
        
   },this);
   
   IR.RemoveListener(IR.EVENT_LIST_ITEM_CHANGE, l_oSettingsPopup.GetItem("LstMode"), listenerSettingsSelectItemButton);
	   IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, l_oSettingsPopup.GetItem("LstMode"), listenerSettingsSelectItemButton,l_oSettingsPopup);
   
      IR.RemoveListener(IR.EVENT_ITEM_RELEASE, l_oSettingsPopup.GetItem("BtnCancel"), listenerSettingsDone);
	   IR.AddListener(IR.EVENT_ITEM_RELEASE, l_oSettingsPopup.GetItem("BtnCancel"), listenerSettingsDone,l_oSettingsPopup);

      IR.RemoveListener(IR.EVENT_ITEM_RELEASE, l_oSettingsPopup.GetItem("BtnOk"), listenerSettingsDone);
	   IR.AddListener(IR.EVENT_ITEM_RELEASE, l_oSettingsPopup.GetItem("BtnOk"), listenerSettingsDone,l_oSettingsPopup);
      
      IR.RemoveListener(IR.EVENT_LIST_ITEM_CHANGE, l_oSettingsPopup.GetItem("LstMode"), listenerSettingsSelectItemButton);
   	IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, l_oSettingsPopup.GetItem("LstMode"), listenerSettingsSelectItemButton,l_oSettingsPopup);
      
      IR.RemoveListener(IR.EVENT_LIST_ITEM_CHANGE, l_oSelectPopup.GetItem("LstMode"), listenerSelectNoItems);
   	IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, l_oSelectPopup.GetItem("LstMode"), listenerSelectNoItems,l_oSelectPopup);
      
      IR.RemoveListener(IR.EVENT_LIST_ITEM_CHANGE, l_oSelectPopup.GetItem("LstMode"), listenerSelectItem);
   	IR.AddListener(IR.EVENT_LIST_ITEM_CHANGE, l_oSelectPopup.GetItem("LstMode"), listenerSelectItem,l_oSelectPopup);
      
      IR.RemoveListener(IR.EVENT_ITEM_RELEASE, l_oSelectPopup.GetItem("BtnCancel"),listenerSelectPopupCancelButton); 
      IR.AddListener(IR.EVENT_ITEM_RELEASE, l_oSelectPopup.GetItem("BtnCancel"),listenerSelectPopupCancelButton, l_oSelectPopup); 
      
      IR.RemoveListener(IR.EVENT_ITEM_RELEASE, l_oSelectPopup.GetItem("BtnOk"),listenerSelectPopupOkButton); 
      IR.AddListener(IR.EVENT_ITEM_RELEASE, l_oSelectPopup.GetItem("BtnOk"),listenerSelectPopupOkButton, l_oSelectPopup); 
      
      IR.AddListener(IR.EVENT_ITEM_PRESS, l_oErrorPopup.GetItem("button_Ok"), function(){
         IR.HidePopup(l_oErrorPopup.Name);
      },l_oErrorPopup);
      
      IR.AddListener(IR.EVENT_ITEM_PRESS, l_oSelectTempPopup.GetItem("Cancel"), function(){
         IR.HidePopup(l_oSelectTempPopup.Name);
         IR.ShowPopup(l_oSettingsPopup.Name);
      })
      
      IR.AddListener(IR.EVENT_ITEM_PRESS, l_oSelectTempPopup.GetItem("Done"), function(){
         //IR.Log("LeftPicker.Value "+parseInt(LeftPicker.Value));
         //IR.Log("RightPicker.Value "+parseInt(RightPicker.Value));
         //IR.Log(parseInt(LeftPicker.Value) > parseInt(RightPicker.Value));   
         if((parseInt(LeftPicker.Value)) > parseInt(RightPicker.Value)){
            l_oErrorPopup.GetItem("errorLabel").Text = "Min temperature("+LeftPicker.Value+"°) cannot";
            l_oErrorPopup.GetItem("errorLabel 1").Text = "exceed Max temperature("+RightPicker.Value+"°)";
            IR.ShowPopup(l_oErrorPopup.Name);
         }else{      
            //setLimit(device,actions.Temp,LeftPicker.Value*10 +","+ RightPicker.Value*10);
            device.Send(['LIMITS:'+ actions.Temp + ',['+ LeftPicker.Value*10 +","+ RightPicker.Value*10 +']\r\n'])
            //getLimit(device,actions.Temp);
            device.Send(['LIMITS:'+ actions.Temp +'\r\n'])
            IR.HidePopup(l_oSelectTempPopup.Name);
            IR.ShowPopup(l_oSettingsPopup.Name);
         }
      })   

      function listenerSelectPopupCancelButton() {
         IR.HidePopup(l_oSelectPopup.Name);
         doneForData();
         IR.ShowPopup(l_oSettingsPopup.Name);
         l_oCurrentSettings = "";
      };

      function listenerSettingsDone(){
         IR.HidePopup(l_oSettingsPopup.Name);
      }

      function listenerSettingsSelectItemButton(Item, Subitem, TypeEvent, object) {
         function addSpd(){
            for(i = 1;i < 10;i++)
               l_oSelectPopupList.AddItem("TplSettingsMode", { LblMode: { Text: "Speed "+i}, TrgMode: { Value: 0 } }, 0);   
         };
         function addPos(){
            for(i = 1;i < 10;i++)
               l_oSelectPopupList.AddItem("TplSettingsMode", { LblMode: { Text: "Position "+i}, TrgMode: { Value: 0 } }, 0);   
         };
         if(TypeEvent == IR.EVENT_LIST_ITEM_RELEASE && l_oSettingsPopupList.GetItemByIndex(Item).Popup.GetItem("Border").Hit == 0){ 
            switch(Item+""){
               case "0":
                  l_oCurrentSettings = "MODE";
                  IR.HidePopup(l_oSettingsPopup.Name);
                  IR.ShowPopup(l_oSelectPopup.Name);
                  l_oCurrentAction = actions.Mode;
                  l_oSelectPopupList.Clear();
                  l_oSelectPopupList.AddItem("TplSettingsMode", { LblMode: { Text: "AUTO" }, TrgMode: { Value: 0 } }, 0);
                  l_oSelectPopupList.AddItem("TplSettingsMode", { LblMode: { Text: "COOL" }, TrgMode: { Value: 0 } }, 0);
                  l_oSelectPopupList.AddItem("TplSettingsMode", { LblMode: { Text: "HEAT" }, TrgMode: { Value: 0 } }, 0);
                  l_oSelectPopupList.AddItem("TplSettingsMode", { LblMode: { Text: "FAN"}, TrgMode: { Value: 0 } }, 0);
                  l_oSelectPopupList.AddItem("TplSettingsMode", { LblMode: { Text: "DRY"}, TrgMode: { Value: 0 }, Line: { Visible: false}  }, 0);
                  resizeListHeight(l_oSelectPopupList,l_oSelectPopupBackground);
                  
                  for(i = 0; i < l_oSelectPopupList.ItemsCount; i++)
                     for(j = 0; j < modeLimit.length; j++){
                        if(l_oSelectPopupList.GetItemByIndex(i).Popup.GetItem("LblMode").Text == modeLimit[j]){
                           l_oSelectPopupList.GetItemByIndex(i).Popup.GetItem("TrgMode").Value = 1;
                        }
                     }
                  waitForData(0);
                   
                  break;
               case "1":
                  l_oCurrentSettings = "FAN";
                  IR.HidePopup(l_oSettingsPopup.Name);
                  IR.ShowPopup(l_oSelectPopup.Name);
                  l_oCurrentAction = actions.Fan;
                  l_oSelectPopupList.Clear();
                  l_oSelectPopupList.AddItem("TplSettingsMode", { LblMode: { Text: "AUTO"}, TrgMode: { Value: 0 } }, 0);
                  addSpd();
                  l_oSelectPopupList.GetItemByIndex(l_oSelectPopupList.ItemsCount - 1).Popup.GetItem("Line").Visible = false;
                  resizeListHeight(l_oSelectPopupList,l_oSelectPopupBackground);
                  
                  for(i = 0; i < l_oSelectPopupList.ItemsCount; i++)
                     for(j = 0; j < fanLimit.length; j++){
                        if(l_oSelectPopupList.GetItemByIndex(i).Popup.GetItem("LblMode").Text == fanLimit[j]){
                           l_oSelectPopupList.GetItemByIndex(i).Popup.GetItem("TrgMode").Value = 1;  
                        }
                     }
                  waitForData(1);
                  
                  break;
               case "2":
                  l_oCurrentSettings = "HORIZONTAL";
                  IR.HidePopup(l_oSettingsPopup.Name);
                  IR.ShowPopup(l_oSelectPopup.Name);
                  l_oCurrentAction = actions.Horizontal;
                  l_oSelectPopupList.Clear();
                  l_oSelectPopupList.AddItem("TplSettingsMode", { LblMode: { Text: "AUTO"}, TrgMode: { Value: 0 } }, 0);
                  addPos();
                  l_oSelectPopupList.AddItem("TplSettingsMode", { LblMode: { Text: "SWING"}, TrgMode: { Value: 0 }, Line: { Visible: false} }, 0);
                  resizeListHeight(l_oSelectPopupList,l_oSelectPopupBackground);
                  
                  for(i = 0; i < l_oSelectPopupList.ItemsCount; i++)
                     for(j = 0; j < horLimit.length; j++){
                        if(l_oSelectPopupList.GetItemByIndex(i).Popup.GetItem("LblMode").Text.replace("Position ","").replace("Pos ","") == horLimit[j]){
                           l_oSelectPopupList.GetItemByIndex(i).Popup.GetItem("TrgMode").Value = 1;
                        }
                     }
                  waitForData(2);
                  
                  break;
               case "3":
                  l_oCurrentSettings = "VERTICAL";
                  IR.HidePopup(l_oSettingsPopup.Name);
                  IR.ShowPopup(l_oSelectPopup.Name);
                  l_oCurrentAction = actions.Vertical; 
                  l_oSelectPopupList.Clear();
                  l_oSelectPopupList.AddItem("TplSettingsMode", { LblMode: { Text: "AUTO"}, TrgMode: { Value: 0 } }, 0);
                  addPos();
                  l_oSelectPopupList.AddItem("TplSettingsMode", { LblMode: { Text: "SWING"}, TrgMode: { Value: 0 }, Line: { Visible: false} }, 0);
                  resizeListHeight(l_oSelectPopupList,l_oSelectPopupBackground);
                  
                  for(i = 0; i < l_oSelectPopupList.ItemsCount; i++)
                     for(j = 0; j < verLimit.length; j++){
                        if(l_oSelectPopupList.GetItemByIndex(i).Popup.GetItem("LblMode").Text.replace("Position ","").replace("Pos ","") == verLimit[j]){
                           l_oSelectPopupList.GetItemByIndex(i).Popup.GetItem("TrgMode").Value = 1;
                        }
                     }
                  waitForData(3);
                  break;
               case "4":
                  IR.HidePopup(l_oSettingsPopup.Name);
                  IR.ShowPopup(l_oSelectTempPopup.Name);
                  l_oCurrentAction = actions.Temp;
                  var Picker = l_oSelectTempPopup;              
         
                  var _backgroundLeft = Picker.GetItem("backPicker left");
                  var _backgroundRight = Picker.GetItem("backPicker right");
                  var LeftBackground = Picker.CreateItem(IR.ITEM_BUTTON,"ButtonLeft",_Left.X,_Left.Y,_Left.Width,_Left.Height);
                  var RightBackground = Picker.CreateItem(IR.ITEM_BUTTON,"ButtonRight",_Right.X,_Right.Y,_Right.Width,_Right.Height);
                  LeftBackground.Hit = 2;   
                  RightBackground.Hit = 2;
                  LeftBackground.GetState(0).Color = 0x00000000;
                  RightBackground.GetState(0).Color = 0x00000000;
                  LeftBackground.GetState(0).ImageStretch = 0;
                  RightBackground.GetState(0).ImageStretch = 0;
                  LeftPicker.Position = parseInt(l_oDriver.GetFeedback("AC Temperature Min "+l_sID)) / 10 - 1;
                  if(LeftPicker.Value == 0)
                     LeftPicker.Position = 35;
                  RightPicker.Position = parseInt(l_oDriver.GetFeedback("AC Temperature Max "+l_sID)) / 10 - 1;
                  if(RightPicker.Value == 0)
                     RightPicker.Position = 35;
                              
            }
         }
      }
      
      function listenerSelectPopupCancelButton() {
         IR.HidePopup(l_oSelectPopup.Name);
         doneForData();
         IR.ShowPopup(l_oSettingsPopup.Name);
         l_oCurrentSettings = "";
      };
      
      function listenerSelectPopupOkButton() {
         var temp = [];
         for(i = 0; i < l_oSelectPopupList.ItemsCount; i++){
            if(l_oSelectPopupList.GetItemByIndex(i).Popup.GetItem("TrgMode").Value == 1){
               temp.push(l_oSelectPopupList.GetItemByIndex(i).Popup.GetItem("LblMode").Text.replace("Speed ","").replace("Position ","").replace("Pos ",""));
            }
         }
         if(temp.length == 0){
         }else{
            l_oPopup.GetItem("CoverLoading").Visible = true;
            l_oPopup.GetItem("ActionLoading").Visible = true;
            device.Send(['LIMITS:'+ l_oCurrentAction + ',['+ temp +']\r\n'])
            function updateValues(){
               var allValues = [horValues, modeValues, verValues, fanValues];
               var Selected = l_oSelectPopupList.GetSelected;
               for(i = 0; i < allValues.length; i++){
                  for(j = 0; j < l_oSelectPopupList.GetSelected; j++){
                     for(key in allValues[i]){
                        allvalues[key] = 0;
                        if(key == Selected[j])
                           allValues[key] = 1;
                     }   
                  }
               }
            }; 
            IR.HidePopup(l_oSelectPopup.Name);
            IR.ShowPopup(l_oSettingsPopup.Name);
            IR.SetTimeout(1000,function(){
            device.Send(['LIMITS:'+ l_oCurrentAction +'\r\n']);
            });
            ArrowLoading = IR.SetTimeout(20000,doneForData);
         }
         l_oCurrentSettings = "";
      };
      
      function listenerSelectNoItems(Item, Subitem){
         var Btn_OK = l_oSelectPopup.GetItem("BtnOk");
         var selected = false;
         for(i = 0; i < l_oSelectPopupList.ItemsCount; i++)
            if(l_oSelectPopupList.GetItemByIndex(i).Popup.GetItem("TrgMode").Value == 1)
               selected = true;
         if(selected){
            Btn_OK.Hit = 0;
            Btn_OK.Enable = 1;
         }else{
            Btn_OK.Hit = 2;
            Btn_OK.Enable = 0;
         }
      }; 
      
      function listenerSelectItem(Item, Subitem, TypeEvent){     
         if(TypeEvent == IR.EVENT_LIST_ITEM_RELEASE){
            //IR.Log(l_oCurrentSettings);
            stateSwitch(l_oCurrentSettings, Item); 
         }
         
         function stateSwitch(state, Item){
            var listItemLabel = l_oSelectPopupList.GetItemByIndex(Item).Popup.GetItem("LblMode");
            var listItemCheck = l_oSelectPopupList.GetItemByIndex(Item).Popup.GetItem("TrgMode");
            var tag;  
            switch(state){
               case "MODE":
                  tag = l_oDriver.GetFeedback("Mode "+l_sID);
                  break;
               case "FAN":
                  tag = l_oDriver.GetFeedback("Fan "+l_sID);
                  break;
               case "HORIZONTAL":
                  tag = l_oDriver.GetFeedback("Vertical Position "+l_sID);
                  break;
               case "VERTICAL":
                  tag = l_oDriver.GetFeedback("Horizontal Position "+l_sID);
                  break;
            }
            //IR.Log(modeValues) 
            if(state == "MODE" && modeValues[listItemLabel.Text] == "1" && listItemLabel.Text == tag ||
               state == "FAN" && fanValues[listItemLabel.Text.replace("Speed ","")] == "1" && listItemLabel.Text == tag ||
               state == "HORIZONTAL" && horValues[listItemLabel.Text.replace("Position ","")] == "1" && listItemLabel.Text == tag ||
               state == "VERTICAL" && verValues[listItemLabel.Text.replace("Position ","")] == "1" && listItemLabel.Text == tag)
            {
               l_oErrorPopup.GetItem("errorLabel").Text = "This setting is";
               l_oErrorPopup.GetItem("errorLabel 1").Text = "active at this moment";
               IR.ShowPopup(l_oErrorPopup.Name);
            }else{
               if(listItemCheck.Value == 0){
                  listItemCheck.Value = 1;
                  listItemCheck.State = 1;
               }else{
                  listItemCheck.Value = 0;
                  listItemCheck.State = 0; 
               } 
            }
         }    
      }
   
   function waitForData(index){
      l_oSettingsPopupList.GetItemByIndex(index).Popup.GetItem("LblLoad").Visible = true;   
      l_oSettingsPopupList.GetItemByIndex(index).Popup.GetItem("LblArrow").Visible = false;
      l_oSettingsPopupList.GetItemByIndex(index).Popup.GetItem("Border").Hit = 2;
   };
   
   function doneForData(){
      for(i = 0; i < l_oSettingsPopupList.ItemsCount; i++){
         l_oSettingsPopupList.GetItemByIndex(i).Popup.GetItem("LblLoad").Visible = false;   
         l_oSettingsPopupList.GetItemByIndex(i).Popup.GetItem("LblArrow").Visible = true;
         l_oSettingsPopupList.GetItemByIndex(i).Popup.GetItem("Border").Hit = 0;
      }
   }
   
   function resizeListHeight(list,background){
      var itemsCount = parseInt(list.ItemsCount);
      IR.Log(itemsCount); 
   	   if(itemsCount > 7){
            itemsCount = 6.5;
            list.ScrollEnabled = true;
         }else{
            list.ScrollEnabled = false;  
         }     
   		list.Height = (88 * itemsCount) / IR.GetScaleHeight()
   		background.Height = (88 * itemsCount + 12) / IR.GetScaleHeight();
   };
   
   function setAction(device,action,value) {
      //IR.Log("action "+action);
      //IR.Log("value "+value);
      //IR.Log(device.Name);
      var l_oPopup = IR.GetPopup("Remote"+(device.Name).slice("IntesisBox driver ".length,))
      //IR.Log(l_oPopup.Name);
      l_oPopup.GetItem("CoverLoading").Visible = true;
      l_oPopup.GetItem("ActionLoading").Visible = true;
      IR.ClearInterval(CONNECTION);      
      CONNECTION = IR.SetTimeout(5000,function(){
         l_oPopup.GetItem("Cover").Visible = true;
         l_oPopup.GetItem("Cover Offline").Text = "";
         l_oPopup.GetItem("btnRefresh").Visible = true;
         l_oPopup.GetItem("Power").Visible = false;
         l_oPopup.GetItem("CoverLoading").Visible = false;
         l_oPopup.GetItem("ActionLoading").Visible = false;
         device.Send(['LIMITS:'+ action +'\r\n'])
      });
      device.Send(['SET,1:'+ action + ','+ value +'\r\n']);     
   };
   
};



guiIntesisBox.prototype.getIDByKey = function(in_nKey) {
	var l_sID = "";
	for (var i = 0; i < this.keyArray.length; i++) {
		if (in_nKey == this.keyArray[i].Key) {
			l_sID = this.keyArray[i].ID;
			break;
		}
	}
	return l_sID;
};

guiIntesisBox.prototype.notFoundMessageEnable = function() {
	var item = this.mainPage.GetItem("ErrorDec");
	item.Text = "THERMOSTAT NOT FOUND";
	item.Visible = true;
};

guiIntesisBox.prototype.notFoundMessageDisable = function() {
	this.mainPage.GetItem("ErrorDec").Visible = false;
};

IR.AddListener(IR.EVENT_START, 0, function () {
	initGlib();
   IR.GetPage("MainPage IntesisBox").GetItem("list").Type = 3;
	var WaitingWindow = new GLib.WaitingWindow(IR.GetPopup("WaitWindow"), IR.GetPopup("WaitWindow").GetItem("Item 2"));
	var QuestionBox = new GLib.QuestionBox();
	new guiIntesisBox(WaitingWindow, QuestionBox);
});



