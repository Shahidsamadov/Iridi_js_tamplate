IR.AddListener(IR.EVENT_START,0,function()
{
   // Send command devices in ASCII
   function sendDeviceCoolMasterNet (in_data, in_device) {
      var l_massiveNumberASCII = [];
      for (var i = 0; i < in_data.length; i++) {
         l_massiveNumberASCII[i] = parseInt(fixedCharCodeAt(in_data, i).toString(16), 16);
      };
      l_massiveNumberASCII.push(0x0d);
      l_massiveNumberASCII.push(0x0a);
      in_device.Send (l_massiveNumberASCII);
   };
   
   function fixedCharCodeAt (str, idx) {
      var code = str.charCodeAt(idx);
      if (0xD800 <= code && code <= 0xDBFF) {
         // Верхний вспомогательный символ
         var hi = code;
         var low = str.charCodeAt(idx+1);
         return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
      }
      if (0xDC00 <= code && code <= 0xDFFF) {
         // Нижний вспомогательный символ
         var hi = str.charCodeAt(idx-1);
         var low = code;
         return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
      }
      return code;
   };
   
   function transformationUIDUseronUIDDevice (in_string) {
      var l_string = "";
      if (in_string.length == 2)
         l_string = in_string;
      else
         l_string = in_string.substr(0,2) + "." + in_string.substr(-3);
      return l_string; 
   };
   
   function foundUIDinObject (in_array, in_UID) {
      var l_boolean = -1;
      for (var uidDevice = 0; uidDevice < in_array.length; uidDevice++) {
         if ((in_array[uidDevice].UID == in_UID) || (">" + in_array[uidDevice].UID == in_UID)) {
            l_boolean = uidDevice;
            break;
         };            
      };
      return l_boolean;
   };
   
   // Created reception and transmission your devices
   function createCoolMasterNetBase(in_object) {
      var l_device = IR.GetDevice(in_object.Name);
      var l_nowUIDDeviceSearch = "";
      for (var l_nowCount = 0; l_nowCount < l_device.GetFeedbacksCount(); l_nowCount++) {
         var l_objectChannel = l_device.GetFeedbackAtPos(l_nowCount);
         if (l_nowUIDDeviceSearch == transformationUIDUseronUIDDevice(l_objectChannel.name.split(":")[0])) {
            var l_newChannel = in_object.DeviceBase[in_object.DeviceBase.length-1];
            //l_newChannel.ID = l_objectChannel.name.split(":")[0];
            switch (l_objectChannel.name.split(":")[1]) {
               case "Power":
                  l_newChannel.Power = l_objectChannel.name.split(":")[0] + ":Power";
                  break;
               case "FanSpeed":
                  l_newChannel.FanSpeed = l_objectChannel.name.split(":")[0] + ":FanSpeed";
                  break;
               case "Mode":
                  l_newChannel.Mode = l_objectChannel.name.split(":")[0] + ":Mode";
                  break;
               case "DesiredTemp":
                  l_newChannel.DesiredTemp = l_objectChannel.name.split(":")[0] + ":DesiredTemp";
                  break;
               case "CurrentTemp":
                  l_newChannel.CurrentTemp = l_objectChannel.name.split(":")[0] + ":CurrentTemp";
                  break;
               case "Unit":
                  l_newChannel.Unit = l_objectChannel.name.split(":")[0] + ":Unit";
                  break;
              /* case "TempSet":
                  l_newChannel.TempSet = "TempSet";
                  break;
               case "Swing":
                  l_newChannel.Swing = "Swing";
                  break; */   
            }; 
         }
         else {
            var l_newChannel = in_object.DeviceBase[in_object.DeviceBase.length] = {};
            l_newChannel.UID = transformationUIDUseronUIDDevice(l_objectChannel.name.split(":")[0]);
            switch (l_objectChannel.name.split(":")[1]) {
               case "Power":
                  l_newChannel.Power = l_objectChannel.name.split(":")[0] + ":Power";
                  break;
               case "FanSpeed":
                  l_newChannel.FanSpeed = l_objectChannel.name.split(":")[0] + ":FanSpeed";
                  break;
               case "Mode":
                  l_newChannel.Mode = l_objectChannel.name.split(":")[0] + ":Mode";
                  break;
               case "DesiredTemp":
                  l_newChannel.DesiredTemp = l_objectChannel.name.split(":")[0] + ":DesiredTemp";
                  break;
               case "CurrentTemp":
                  l_newChannel.CurrentTemp = l_objectChannel.name.split(":")[0] + ":CurrentTemp";
                  break;
               case "Unit":
                  l_newChannel.Unit = l_objectChannel.name.split(":")[0] + ":Unit";
                  break;
              /* case "TempSet":
                  l_newChannel.TempSet = "TempSet";
                  break;
               case "Swing":
                  l_newChannel.Swing = "Swing";
                  break; */   
            }; 
            l_nowUIDDeviceSearch = l_newChannel.UID
         };
      };
      
      IR.SetInterval(10000, function () {
         sendDeviceCoolMasterNet ("ls", l_device)      
      });
      
      IR.AddListener(IR.EVENT_CHANNEL_SET, l_device, function(in_name, in_value) {
      //IR.Log ("in_name = " + in_name + ", in_value = " + in_value);
         switch (in_name.split(":")[1]) {
            case "Power":
               switch (parseInt(in_value)) {
                  case 0:
                     sendDeviceCoolMasterNet ("off " + transformationUIDUseronUIDDevice(in_name.split(":")[0]), l_device);
                     break;
                  case 1:
                     sendDeviceCoolMasterNet ("on " + transformationUIDUseronUIDDevice(in_name.split(":")[0]), l_device);
                     break;   
               }
               break;
            case "FanSpeed":
               switch (parseInt(in_value)) {
                  case 0:
                     sendDeviceCoolMasterNet ("fspeed " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " l", l_device);
                     break;
                  case 1:
                     sendDeviceCoolMasterNet ("fspeed " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " m", l_device);
                     break;
                  case 2:
                     sendDeviceCoolMasterNet ("fspeed " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " h", l_device);
                     break;
                  case 3:
                     sendDeviceCoolMasterNet ("fspeed " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " t", l_device);
                     break;
                  case 4:
                     sendDeviceCoolMasterNet ("fspeed " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " a", l_device);
                     break;  
               }
               break;
            case "Mode":
               switch (parseInt(in_value)) {
                  case 0:
                     sendDeviceCoolMasterNet ("cool " + transformationUIDUseronUIDDevice(in_name.split(":")[0]), l_device);
                     break;
                  case 1:
                     sendDeviceCoolMasterNet ("heat " + transformationUIDUseronUIDDevice(in_name.split(":")[0]), l_device);
                     break;
                  case 2:
                     sendDeviceCoolMasterNet ("fan " + transformationUIDUseronUIDDevice(in_name.split(":")[0]), l_device);
                     break;
                  case 3:
                     sendDeviceCoolMasterNet ("dry " + transformationUIDUseronUIDDevice(in_name.split(":")[0]), l_device);
                     break;
                  case 4:
                     sendDeviceCoolMasterNet ("auto " + transformationUIDUseronUIDDevice(in_name.split(":")[0]), l_device);
                     break;  
               }
               break;
            case "TempIncrease":
               sendDeviceCoolMasterNet ("temp " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " +" + parseInt(in_value), l_device);
               IR.Log ("temp " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " +" + parseInt(in_value))
               break;
            case "TempDecrease":
               sendDeviceCoolMasterNet ("temp " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " -" + parseInt(in_value), l_device);
               IR.Log ("temp " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " -" + parseInt(in_value))
               break;
            case "TempSet":
               sendDeviceCoolMasterNet ("temp " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " " + parseInt(in_value), l_device);
               break;
            case "Swing":
               switch (parseInt(in_value)) {
                  case 0:
                     sendDeviceCoolMasterNet ("swing " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " 3", l_device);
                     break;
                  case 1:
                     sendDeviceCoolMasterNet ("swing " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " 4", l_device);
                     break;
                  case 2:
                     sendDeviceCoolMasterNet ("swing " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " 6", l_device);
                     break;
                  case 3:
                     sendDeviceCoolMasterNet ("swing " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " a", l_device);
                     break;
                  case 4:
                     sendDeviceCoolMasterNet ("swing " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " h", l_device);
                     break;
                  case 5:
                     sendDeviceCoolMasterNet ("swing " + transformationUIDUseronUIDDevice(in_name.split(":")[0]) + " v", l_device);
                     break;  
               }
               break;
            case "SimulSet":
               sendDeviceCoolMasterNet ("simul " + in_name.substr(0,2) + " " + parseInt(in_value), l_device);
               break;
         };    
      });
      
      IR.AddListener(IR.EVENT_RECEIVE_TEXT, l_device, function (in_text) {
         in_text = in_text.replace(new RegExp(/\s+\s+/g)," ");
         in_text = in_text.replace(/\r|\n/g, "");
         var l_informationDevice;
         var l_foundNumberinObject;
         var l_arrayOfDevices = in_text.split(/ OK - 1| OK - 0| OK # 1| OK # 0/g);
         if (l_arrayOfDevices.length > 1) {
            for (var l_deviceSelectedNow = 0; l_deviceSelectedNow < l_arrayOfDevices.length; l_deviceSelectedNow++) {
               l_informationDevice = l_arrayOfDevices[l_deviceSelectedNow].split(" ");
               l_foundNumberinObject = foundUIDinObject(in_object.DeviceBase, l_informationDevice[0]);
               if (l_foundNumberinObject != -1) {
                  if (in_object.DeviceBase[l_foundNumberinObject].Power) {
                     if (l_informationDevice[1] == "ON") {
                        l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].Power, 1);  
                     }
                     else {
                        l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].Power, 0); 
                     };
                  };
                  if (in_object.DeviceBase[l_foundNumberinObject].Mode) {
                     switch (l_informationDevice[5]) {
                        case "Fan":
                           l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].Mode, 2)
                           break;
                        case "Cool":
                           l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].Mode, 0)
                           break;
                        case "Heat":
                           l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].Mode, 1)
                           break;
                        case "Dry":
                           l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].Mode, 3)
                           break;
                        case "Auto":
                           l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].Mode, 4)
                           break;
                     };
                  };
                  if (in_object.DeviceBase[l_foundNumberinObject].FanSpeed) {
                     switch (l_informationDevice[4]) {
                        case "Low":
                           l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].FanSpeed, 0)
                           break;
                        case "Med":
                           l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].FanSpeed, 1)
                           break;
                        case "High":
                           l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].FanSpeed, 2)
                           break;
                        case "Top":
                           l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].FanSpeed, 3)
                           break;
                        case "Auto":
                           l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].FanSpeed, 4)
                           break;
                     };
                  };
                  if (in_object.DeviceBase[l_foundNumberinObject].DesiredTemp) {
                     if (l_informationDevice[2].length == 3) {
                        l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].DesiredTemp, parseInt(l_informationDevice[2].slice(0, 2)));
                     }
                     else {
                        l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].DesiredTemp, parseInt(l_informationDevice[2].slice(0, 3)));
                     };
                  };
                  if (in_object.DeviceBase[l_foundNumberinObject].CurrentTemp) {
                     if (l_informationDevice[3].length == 3) {
                        l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].CurrentTemp, parseInt(l_informationDevice[3].slice(0, 2)));
                     }
                     else {
                        l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].CurrentTemp, parseInt(l_informationDevice[3].slice(0, 3)));
                     };
                  };
                  if (in_object.DeviceBase[l_foundNumberinObject].Unit) {
                     if (l_informationDevice[3].indexOf("C") != -1) {
                        l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].Unit, "C");
                     }
                     else {
                        l_device.SetFeedback(in_object.DeviceBase[l_foundNumberinObject].Unit, "F");
                     };
                  };
               };
            };
         }
         else {
            sendDeviceCoolMasterNet ("ls", l_device); 
         };
      });
   };
   
   var coolMasterNetBase = [];
   IR.Log ("Start");
   if (IR.GetDevice("CoolMasterNet") != null) {
      coolMasterNetBase[0] = {};
      coolMasterNetBase[0].Name = "CoolMasterNet";
      coolMasterNetBase[0].DeviceBase = [];
      new createCoolMasterNetBase (coolMasterNetBase[0]);
   } 
   else {
      IR.Log ("Device CoolMasterNet not found!");
   }
     
  for (var i = 1; i <= 100; i++)
      if (IR.GetDevice("CoolMasterNet" + i) != null) {
         coolMasterNetBase[i] = {};
         coolMasterNetBase[i].Name = "CoolMasterNet" + i;
         coolMasterNetBase[i].DeviceBase = [];
         new createCoolMasterNetBase (coolMasterNetBase[i]);
         IR.Log (JSON.Stringify(coolMasterNetBase[i]));   
      }

});

IR.AddListener(IR.EVENT_EXIT,0,function()
{

});
