function dune_ftp(page, list, home, back, folder_name, status, ip, icon_floder, icon_drive, search, sDeviceName, listpage, waitpopup, Toggle_Button, Dune_Messages, Gesture_Button){

      // drivers variables
      var port_tcp = 21;
      var port_http = 80;
      var device = null; 
      var end_line = "\r\n";
      var explorer_allow = true;
      var back_path = ["/"];
      var level_list = 0;
      var dir = [];
      var Online = 0;
      
      var DUNE_GEST_ON  = 3;
      var DUNE_GEST_OFF = 4;
      var GestFlag = 4;
      
      var disk_type = "";
      
      // http
      var m_oDevice = IR.GetDevice(sDeviceName);   
      var m_sDeviceName = "Drivers." + sDeviceName + ".";  
      
      var l_iDuration;
      var l_iPosition; 
     
         // -------------------------- explorer page
         page = IR.GetItem(page);
         list = IR.GetItem(listpage).GetItem(list);
         home = IR.GetItem(listpage).GetItem(home);
         back = IR.GetItem(listpage).GetItem(back); 
         folder_name = IR.GetItem(listpage).GetItem(folder_name);
         status = page.GetItem(status);    

         // Create device        
         device = IR.CreateDevice(IR.DEVICE_CUSTOM_TCP, "dune_ftp", ip, port_tcp)
			
			var deviceFILE_LIST;

         // Receive
         IR.AddListener(IR.EVENT_RECEIVE_TEXT, device, events);
         
         device.Connect();
         
         // Visible deivce status
         IR.AddListener(IR.EVENT_ONLINE, device, function(){ status.Value = true;});             
         IR.AddListener(IR.EVENT_OFFLINE, device, function(){ status.Value = false;});
         
         // Subscribing to events
         IR.AddListener(IR.EVENT_ITEM_RELEASE, back, back_release);
         IR.AddListener(IR.EVENT_ITEM_RELEASE, home, home_release);
         IR.AddListener(IR.EVENT_ITEM_SELECT, list, function(item, subitem){ select_item(item, subitem); });         
         
         function GetureWork (name, x, y) {
         
            if(GestFlag == DUNE_GEST_ON){     
               switch (name) {
                 
                 case IR.GESTURE_SWIPE_LEFT: 
                     m_oDevice.Set("Right",0);  
                     break;
                     
                 case IR.GESTURE_SWIPE_RIGHT:
                     m_oDevice.Set("Left",0);  
                     break;
                     
                 case IR.GESTURE_SWIPE_UP:
                     m_oDevice.Set("Up",0);   
                     break;
                     
                 case IR.GESTURE_SWIPE_DOWN:
                      m_oDevice.Set("Down",0);
                     break;
                     
                 case IR.GESTURE_PINCH_OUT:
                     m_oDevice.Set("Return",0);  
                     break;   
                 
                 case IR.GESTURE_DOUBLE_TAP:                      
                     m_oDevice.Set("Enter",0);   
                     break;                   
              }   
            }
         }
         
         IR.AddListener(IR.EVENT_GESTURE_BEGIN, page, GetureWork);
         
       // Error detecting
      function events(text){   
      IR.Log(text)     
            switch(text.charAt(0) + text.charAt(1) + text.charAt(2)){            
               case "500":
                  // reaction
                  device.Disconnect();                        
               break;
               
               case "421":
               case "220":  // Sign to FTP 
                  device.Send(["USER anonymous" + end_line]); 
               break; 
               
               case "230":  // Switching to Binary mode
                  device.Send(["TYPE I" + end_line]);  
               break; 
               
               case "200":  // Send directory's
                    device.Send(["CWD " + back_path[level_list] + end_line]);
               break;                  
               
               case "227": // parsing host & port
                     if(explorer_allow){
                        text = text.substring(0, text.length - 4).split(",");
                        
                        
                        var host_new = text[0].substring(27) + "." + text[1] + "." + text[2] + "." + text[3];                  
                        var port_new = parseInt(text[4]) * 256 + parseInt(text[5]);
                        
								if(deviceFILE_LIST == undefined){
                           IR.Log("add device")
										deviceFILE_LIST = IR.CreateDevice(IR.DEVICE_CUSTOM_TCP, "dune_list", host_new, port_new);
									   IR.AddListener(IR.EVENT_RECEIVE_TEXT, deviceFILE_LIST, explorer_fill);
                              	deviceFILE_LIST.Connect();
								} else{
                              IR.Log("change device")
								    // connect to data port_tcpand get data list 
									deviceFILE_LIST.SetParameters({Host: host_new, Port: port_new});      
									deviceFILE_LIST.Connect();
								}
								deviceFILE_LIST.Send(["LIST -l" + end_line]);
                        	device.Send(["LIST -l" + end_line]);
                     }
               break; 
               
               case "250": // Entering Passive Mode
                    device.Send(["PASV" + end_line]);
               break;
               
               default:   // parsing list data                   
                 //  explorer_fill(text);  
               break;                         
            }              
         };
      
      // fill data to list
      function explorer_fill(text){
          IR.Log(text)
         // clear list
         list.Clear();
         
         // parse text
         text = text.split("\n"); 

         // create items
         for(var i = 0; i < text.length-1; i++){

            dir[i] = text[i].substring(56, text[i].length-1);  
            list.CreateItem(i,2,{Text: dir[i].toString()});
            
            IR.Log(dir[i])
            // showing icon
            var selected = dir[i].split(".");

            if(selected.length > 1)   
               switch (selected[selected.length - 1].toLowerCase()){
                  case "mp3":
                  case "wav":
                      list.CreateItem(i, 4,{Value: 2, TextColor: 0x0000FFFF});
                  break;
                  
                  case "avi":
                  case "mp4":
                  case "mov":
                     list.CreateItem(i, 4,{Value: 1, TextColor: 0xFF0000FF}); 
                  break;
                  
                  case "png":
                  case "jpg":
                     list.CreateItem(i, 4,{Value: 3, TextColor: 0x00FF00FF});
                  break;
                  
                  default:
                     list.DeleteItem(i); 

            }
         // default connection and stop get data  
        }
         
         deviceFILE_LIST.Disconnect();        
         explorer_allow = false;
         
         // toggle buttons
         Toggle_Navigate_Buttons();
      }; 
      
      // When select item in list
      function select_item(item, subitem){  
         
         var selected = dir[item].split(".");
         
         if(selected.length == 1){
            level_list++;
             
            if(level_list > 1)
               back_path[level_list] = back_path[level_list - 1] + "/" + dir[item];
            else
               back_path[level_list] = back_path[level_list - 1] + dir[item];
            
            change_dirrectory();                
         }
         else{    
                 
            if(dir[item].charAt(0) == " ")
               dir[item] = dir[item].substring(1, dir[item].length)
            else
               if(dir[item].charAt(1) == " ")
               dir[item] = dir[item].substring(2, dir[item].length);   

            var demo = dir[item].split(" ");
            dir[item] = "";
            for(var i = 0; i < demo.length; i++){
               dir[item] += demo[i] + "%20";  
            }

            dir[item] = dir[item].substring(0, dir[item].length - 3);
            
            demo = dir[item].split("#");
            dir[item] = "";      
            for(var i = 0; i < demo.length; i++){
               dir[item] += demo[i] + "%23";  
            }
            
            dir[item] = dir[item].substring(0, dir[item].length - 3);
            
            demo = dir[item].split(",");
            dir[item] = "";      
            for(var i = 0; i < demo.length; i++){
               dir[item] += demo[i] + "%2C";  
            }
            
            dir[item] = dir[item].substring(0, dir[item].length - 3);

            var incodePath = back_path[level_list].split(" ");
            var new_path = "";
            
            for(var i = 0; i < incodePath.length; i++){
               new_path += incodePath[i] + "%20";  
            }
            
            new_path = new_path.substring(0, new_path.length - 3);

            m_oDevice.Send(["GET,/cgi-bin/do?cmd=start_file_playback&media_url=smb://" + ip + new_path + "/" + dir[item] + ","]);
            //m_oDevice.Send(["GET,/cgi-bin/do?cmd=start_file_playback&media_url=ftp://" + ip + back_path[level_list] + "/" + dir[item] + ","]);
            
            IR.HidePopup(listpage);
         }                     
      };
            
      // Button back
      function back_release(){
         level_list--;
         change_dirrectory();
      };
      
      // Button home
      function home_release(){
         level_list = 0;
         change_dirrectory();
      };
      
      // home - back toggle
      function Toggle_Navigate_Buttons(){
      
         if(level_list > 0){
            back.Enable = home.Enable = true;
            back.GetState(0).Opacity = home.GetState(0).Opacity = 255;
            
            var simple_path = back_path[level_list].split("/");
            folder_name.Text = simple_path[simple_path.length-1].split("_")[0]; 
         }
         else{
            back.Enable = home.Enable = false;
            back.GetState(0).Opacity = home.GetState(0).Opacity = 100;
            folder_name.Text = Dune_Messages.MediaLabel; 
         }
         
      };
      
      // to new dirrectory(
      function change_dirrectory(){
         explorer_allow = true;
         device.Send(["CWD " + back_path[level_list] + end_line]);
      }

//========================================================================  http
      
      // request current state
      IR.SetInterval(2000, function(){                

         GetStatus();

         Online--;   
          
         // pleer is offline           
         if(Online < -3){
            IR.SetVariable(m_sDeviceName + "device_online", 0);
            page.GetItem("standby").Enable = page.GetItem("standby").Visible = 1;
            page.GetItem("standby").Text = Dune_Messages.Offline;
          } 
      });
      
      function GetStatus(){
      
         m_oDevice.Send(["GET,/cgi-bin/do?cmd=status,"]);    
      }
      
      this.pubGet = GetStatus;
      
      // pleer is online
      IR.AddListener(IR.EVENT_ONLINE, m_oDevice, function(){
          
         Online++;
      });
      
      
      /* Filler channel
      
         in: 
            in_sValue - reading options
            in_sValue - need value
      */
      function bool_FeadbackFill(in_sValue, in_sCondition){
         
         return (in_sValue == in_sCondition) ? 1 : 0;         
      };
      
      // read messages
      IR.AddListener(IR.EVENT_RECEIVE_TEXT, m_oDevice, function(text){

         text = new XML(text)
        
         var end = 0;
         switch(text.command_result.param[1]["@value"]){
             
             case "file_playback":
               end = 34;
               m_oDevice.SetFeedback("play", bool_FeadbackFill(text.command_result.param[2]["@value"],  "playing"));
               m_oDevice.SetFeedback("mute", parseInt(text.command_result.param[11]["@value"]));
                page.GetItem("standby").Enable = page.GetItem("standby").Visible = 0;
               IR.SetVariable(m_sDeviceName + "device_online", 2);
             break;
             
             case "ok":
               
             break;
             
             case "standby":
               IR.HidePopup("Wait");
               IR.SetVariable(m_sDeviceName + "player_state", "standby");
               page.GetItem("standby").Enable = page.GetItem("standby").Visible = 1;
               page.GetItem("standby").Text = Dune_Messages.Sleep;                   
               IR.SetVariable(m_sDeviceName + "device_online", 1);
             break;
             
             case "navigator":   
             case "photo_viewer":
               IR.SetVariable(m_sDeviceName + "player_state", "navigator");
               page.GetItem("standby").Enable = page.GetItem("standby").Visible = 0;
               IR.SetVariable(m_sDeviceName + "device_online", 2);
               
               end = 1;
               IR.SetVariable(m_sDeviceName + "play", 0);
             break;
             
             case "loading":
               IR.SetVariable(m_sDeviceName + "player_state", "loading");
               IR.SetVariable(m_sDeviceName + "device_online", 2);
               page.GetItem("standby").Text = Dune_Messages.Waking; 
             break;
         }

         for(var i = 0; i <= end; i++){
              var l_sNowItemName = text.command_result["param"][i]["@name"];
              var l_sNowItemValue = text.command_result["param"][i]["@value"];  
                         
              switch(l_sNowItemName){
              
                case "playback_duration":
                  IR.SetVariable(m_sDeviceName + "playback_duration_value", l_sNowItemValue);
                  
                case "playback_position":
                  if(l_sNowItemName == "playback_duration")
                     l_iDuration = l_sNowItemValue
                  else
                     l_iPosition = l_sNowItemValue;
                     
                  var minutes = Math.floor(l_sNowItemValue % 3600 / 60);
                  var seconds = Math.floor(l_sNowItemValue % 60);
                    
                  
                  IR.SetVariable(m_sDeviceName + l_sNowItemName, "" + Math.floor(l_sNowItemValue / 3600) + ((minutes < 10) ? ":0" : ":") + minutes + ((seconds < 10) ? ":0" : ":") + seconds);
                break;
                
                default:
                  IR.SetVariable(m_sDeviceName + l_sNowItemName, l_sNowItemValue);
                break;
              }         
         }
         
       if(IR.GetVariable(m_sDeviceName + "player_state") == 'file_playback') 
         IR.SetVariable(m_sDeviceName + "playback_progress", l_iPosition * 100 / l_iDuration)
       else
         IR.SetVariable(m_sDeviceName + "playback_progress", 0);   
      
      });
      
      // Levels sender
      IR.AddListener(IR.EVENT_CHANNEL_SET, m_oDevice, function(in_sName, in_sValue){
          switch(in_sName){
            case "volume":
              m_oDevice.Send(["GET,/cgi-bin/do?cmd=set_playback_state&" + in_sName + "=" + in_sValue + ","]);
            break;
            case "position":  
               IR.Log(Math.floor(in_sValue * IR.GetVariable(m_sDeviceName + "playback_duration_value") / 100));    
              m_oDevice.Send(["GET,/cgi-bin/do?cmd=set_playback_state&" + in_sName + "=" + Math.floor(in_sValue * IR.GetVariable(m_sDeviceName + "playback_duration_value") / 100) + ","]);
            break;
          }
      });  
      
     IR.SetInterval(1000,Visible_Move)
     
     // Switcher
      function Toggle(){
         if(IR.GetVariable(m_sDeviceName + "device_online") == "2"){
            m_oDevice.Send(["GET,/cgi-bin/do?cmd=standby,"]);
            IR.ShowPopup(waitpopup);
         }
         else{
            m_oDevice.Send(["GET,/cgi-bin/do?cmd=ir_code&ir_code=BC43BF00,"]);
         }
     }
     
     function DuneGestSwitch(){
   
         if(page.GetItem(Toggle_Button).Value)
            GestFlag = DUNE_GEST_ON;
         else
            GestFlag = DUNE_GEST_OFF;
    }
    
    IR.AddListener (IR.EVENT_ITEM_RELEASE, page.GetItem(Toggle_Button), DuneGestSwitch);     
    IR.AddListener (IR.EVENT_ITEM_RELEASE, page.GetItem(Toggle_Button), Toggle);
     
     function Visible_Move(){
         if(IR.GetVariable(m_sDeviceName + "play") == 1) 
            IR.SetVariable(m_sDeviceName + "playback_position", IR.GetVariable(m_sDeviceName + "playback_position").split(":")[0] + ":" + IR.GetVariable(m_sDeviceName + "playback_position").split(":")[1] + ":" + parseInt(parseInt(IR.GetVariable(m_sDeviceName + "playback_position").split(":")[2]) + 1));
         else{
            if(IR.GetVariable(m_sDeviceName + "player_state") != "file_playback"){
               IR.SetVariable(m_sDeviceName + "playback_position", "--:--:--");
               IR.SetVariable(m_sDeviceName + "playback_progress", 0);
               IR.SetVariable(m_sDeviceName + "playback_duration", "--:--:--"); 
            }                    
         }
         
     }
};   

IR.AddRecognizer(IR.GESTURE_SWIPE_LEFT); 
IR.AddRecognizer(IR.GESTURE_SWIPE_RIGHT);
IR.AddRecognizer(IR.GESTURE_SWIPE_UP);  
IR.AddRecognizer(IR.GESTURE_SWIPE_DOWN); 
IR.AddRecognizer(IR.GESTURE_PINCH_IN);  
IR.AddRecognizer(IR.GESTURE_PINCH_OUT);  
IR.AddRecognizer(IR.GESTURE_LONG_PRESS);  
IR.AddRecognizer(IR.GESTURE_DOUBLE_TAP); 