var OnkyoDevice = function(DeviceName)
{
  var checkzone = 1;
  this.DriverName = DeviceName;
  this.device = IR.GetDevice(this.DriverName);
      
  var QueueCommands = [];
  var TransportFree = true;
      
  var flagRegex = /.*?!1NLSC\dP/g;
  var listaRegex = /.*?!1NLSU(.*?)\x2D(.*)/g;
  var playnowRegex = /.*?!1(NTM|NAT|NAL|NTI)(.*)/g;
  var volRegex = /!1(MVL|ZVL|VL3)(.*)/g;
  var powRegex = /!1(PWR|ZPW|PW3)(.*)/g;
  var muteRegex = /!1(AMT|ZMT|MT3)(.*)/g;			
  var tunerRegex = /!1(TUN|TUZ)(.*)/g;	
  var selectorRegex = /!1(SLI|SLZ|SL3)(.*)/g;
  var AudioselectorRegex = /!1(SLA)(.*)/g;
  var ListeningModeRegex = /!1(LMD|LMZ)(.*)/g;
  var valpr;
  
  
  
  IR.Log("this.device = "+DeviceName)
  var that = this;
  IR.AddListener(IR.EVENT_START,0,function()
  {
    IR.Log("start");
    that.device.SetFeedback("Listening zone 1", "Select Listening");
    that.device.SetFeedback("Listening zone 2", "Select Listening");
    
    that.device.SetFeedback("Audio zone 1", "Select Audio");
    that.device.SetFeedback("Audio zone 2", "Select Audio");
    that.device.SetFeedback("Audio zone 3", "Select Audio");
       
    that.device.SetFeedback("Input zone 1", "Select Source");
    that.device.SetFeedback("Input zone 2", "Select Source");
    that.device.SetFeedback("Input zone 3", "Select Source");       
  });
  
  //-------------------------------------------------------
  // Обработчик перехода устройства в Online
  //-------------------------------------------------------     
  IR.AddListener(IR.EVENT_ONLINE, that.device, function()
  { 
    IR.Log("DEVICE is Online");
    
    QueueCommands.push("!1PWRQSTN");
    QueueCommands.push("!1ZPWQSTN'");
    QueueCommands.push("!1PW3QSTN");
    
    QueueCommands.push("!1MVLQSTN");
    QueueCommands.push("!1ZVLQSTN");
    QueueCommands.push("!1VL3QSTN");
    
    QueueCommands.push("!1AMTQSTN");
    QueueCommands.push("!1ZMTQSTN");
    QueueCommands.push("!1MT3QSTN"); 
    
    QueueCommands.push("!1SLIQSTN");
     QueueCommands.push("!1SL3QSTN");
    QueueCommands.push("!1SLAQSTN");
    QueueCommands.push("!1SLZQSTN");
    QueueCommands.push("!1LMZQSTN");
    
    QueueCommands.push("!1LMDQSTN");
    
    
  }, that);
  
  //-------------------------------------------------------
  // Обработчик перехода устройства в Offline
  //-------------------------------------------------------
  IR.AddListener(IR.EVENT_OFFLINE, that.device, function()
  { 
    IR.Log("DEVICE is Offline");
  }, that);
  
  
  function hexToString(tmp) 
  {
    var arr = tmp;
    var str = '';
    var c;    
    var arr_len = arr.length;
 
    for (var i = 0; i < arr_len; i += 1) 
    {
        if (arr[i] != 0)
        {
          c = String.fromCharCode(arr[i]);
        
          str += c;
        }  
    }
 
    return str;
  }
  
  
  //---------------------------------------------------------
  // Действия каждый цикл
  //---------------------------------------------------------
  IR.SetInterval(1000, function()
  {
    // Посылаем команду из очереди
    if (TransportFree)
    {
      var command = QueueCommands.shift();
      if(command) 
      {
        SendPacket(command);
      }
    }    
  }, this);
  
  
  
  IR.AddListener(IR.EVENT_RECEIVE_DATA,that.device, function(data)
  {
      //IR.Log("data = "+ data);
      TransportFree = true;
      var FinishStr = '';  
      FinishStr = hexToString(data);
      IR.Log("FinishStr = "+ FinishStr);
//-----------------------------------------------------------------------------------------
		var msg;
      
      msg = ListeningModeRegex.exec(FinishStr);
      if(msg != null)
      {
         var id = msg[2].slice(0, msg[2].length - 1);
         IR.Log("id = "+ id);
         var ListeningModeName = 'NaN';
         switch(checkzone)
         {
            case '1':
              switch(id)
              {
         		case "00":
         		  ListeningModeName = 'STEREO';
         		break;
         		case "01":
         		  ListeningModeName = 'DIRECT';
         		break;
         		case "02":
         		  ListeningModeName = 'SURROUND';
         		break;
         		case "03":
         		  ListeningModeName = 'FILM';
         		break;
               case "04":
         		  ListeningModeName = 'THX';
         		break; 
               case "05":
         		  ListeningModeName = 'ACTION';
         		break;
               case "06":
         		  ListeningModeName = 'MUSICAL';
         		break;
               case "07":
         		  ListeningModeName = 'MONO MOVIE';
         		break;
               case "08":
         		  ListeningModeName = 'ORCHESTRA';
         		break;
               case "09":
         		  ListeningModeName = 'UNPLUGGED';
         		break;
               case "0A":
         		  ListeningModeName = 'STUDIO-MIX';
         		break;
               case "0B":
         		  ListeningModeName = 'TV LOGIC';
         		break;
               case "0C":
         		  ListeningModeName = 'ALL CH STEREO';
         		break;
               case "0D":
         		  ListeningModeName = 'THEATER-DIMENSIONAL';
         		break;
               case "0E":
         		  ListeningModeName = 'ENHANCE';
         		break;
               case "0F":
         		  ListeningModeName = 'MONO';
         		break;
               case "11":
         		  ListeningModeName = 'PURE AUDIO';
         		break;
               case "12":
         		  ListeningModeName = 'MULTIPLEX';
         		break;
               case "13":
         		  ListeningModeName = 'FULL MONO';
         		break;
               case "14":
         		  ListeningModeName = 'DOLBY VIRTUAL';
         		break;
               case "40":
         		  ListeningModeName = 'SURROUND';
         		break;
               case "41":
         		  ListeningModeName = 'DOLBY';
         		break;
               case "42":
         		  ListeningModeName = 'THX CINEMA';
         		break;
               case "43":
         		  ListeningModeName = 'THX SURROUND';
         		break;
               case "50":
         		  ListeningModeName = 'Cinema';
         		break;
               case "51":
         		  ListeningModeName = 'MusicMode';
         		break;
               case "52":
         		  ListeningModeName = 'Games Mode';
         		break;
               case "80":
         		  ListeningModeName = 'PLII Movie';
         		break;
               case "81":
         		  ListeningModeName = 'PLII Music';
         		break;
               case "82":
         		  ListeningModeName = 'Neo:6 Cinema';
         		break;
               case "83":
         		  ListeningModeName = 'Neo:6 Music';
         		break;
               case "84":
         		  ListeningModeName = 'PLII THX Cinema';
         		break;
               case "85":
         		  ListeningModeName = 'Neo:6 THX Cinema';
         		break;
               case "86":
         		  ListeningModeName = 'PLII Game';
         		break;
               case "87":
         		  ListeningModeName = 'Neural Surr';
         		break;
               case "88":
         		  ListeningModeName = 'Neural THX';
         		break;
               case "89":
         		  ListeningModeName = 'PLII THX Games';
         		break;
               case "8A":
         		  ListeningModeName = 'Neo:6 THX Games';
         		break;	
         	  };
              that.device.SetFeedback("Listening zone 1", ListeningModeName);
            break;
            case '2':
              switch(id)
              {
         		case "00":
         		  ListeningModeName = 'STEREO';
         		break;
               case "01":
         		  ListeningModeName = 'DIRECT';
         		break;
               case "0F":
         		  ListeningModeName = 'MONO';
         		break;
               case "12":
         		  ListeningModeName = 'MULTIPLEX';
         		break;
               case "87":
         		  ListeningModeName = 'DVS(PI2)';
         		break;
               case "88":
         		  ListeningModeName = 'DVS(NEO6)';
         		break;
              }
              that.device.SetFeedback("Listening zone 2", ListeningModeName);
            break;	
         };
      };
      
      msg = AudioselectorRegex.exec(FinishStr);
      if(msg != null)
      {
         var id = msg[2].slice(0, msg[2].length - 1);
         var AudioSelectorName = 'NaN';
         switch(id)
         {
      		case "00":
      		  AudioSelectorName = 'AUTO';
      		break;
      		case "01":
      		  AudioSelectorName = 'MULTI-CHANNEL';
      		break;
      		case "02":
      		  AudioSelectorName = 'ANALOG';
      		break;
      		case "03":
      		  AudioSelectorName = 'iLINK';
      		break;
            case "04":
      		  AudioSelectorName = 'HDMI';
      		break; 	
      	};
         that.device.SetFeedback("Audio zone", AudioSelectorName);	
      };
      
      msg = playnowRegex.exec(FinishStr);
      if(msg != null)
      {
      	switch(msg[1])
         {
      		
      		case "NTM":
      		  IR.Log("!!!! = "+ msg[2]);
      		break;
      		case "NAT":
      		  IR.Log("!!!! = "+ msg[2]);
      		break;
      		case "NAL":
      		  IR.Log("!!!! = "+ msg[2]);
      		break;
      		case "NTI":
      		  IR.Log("!!!! = "+ msg[2]);
      		break;
      		
      	};
      	
      };
      	
      msg = powRegex.exec(FinishStr);
      if(msg != null)
      {
      	var PowerStatus;
         if (/00/.test(msg[2]))
         {
           PowerStatus = '0';
         } else if (/01/.test(msg[2]))
         {
           PowerStatus = '1';
         }
      	switch(msg[1])
         {      		
      		case "PWR":
              that.device.SetFeedback("Power", PowerStatus);
              //IR.Log("Main Zone Power = "+ msg[2]);
      		break;
      		case "ZPW":
      		  that.device.SetFeedback("Power z2", PowerStatus);
              //IR.Log("Second Zone Power = "+ PowerStatus);
      		break;
            case "PW3":
      		  that.device.SetFeedback("Power z3", PowerStatus);
              //IR.Log("Third Zone Power = "+ msg[2]);
      		break;      		
      	};
      	powRegex.lastIndex = 0;
      };
      
      msg = muteRegex.exec(FinishStr);
      if(msg != null)
      {      	
      	var MuteStatus;
         if (/00/.test(msg[2]))
         {
           MuteStatus = '0';
         } else if (/01/.test(msg[2]))
         {
           MuteStatus = '1';
         }
         switch(msg[1])
         {      		
      		case "AMT":
      		  that.device.SetFeedback("Mute", MuteStatus);
              //IR.Log("Main Zone Mute = "+ MuteStatus);
      		break;
      		case "ZMT":
      		  that.device.SetFeedback("Mute z2", MuteStatus);
              //IR.Log("Second Zone Mute = "+ MuteStatus);
      		break;
            case "MT3":
      		  that.device.SetFeedback("Mute z3", MuteStatus);
              //IR.Log("Third Zone Mute = "+ MuteStatus);
      		break;      		
      	};
      	muteRegex.lastIndex = 0;
      };
      
      msg = volRegex.exec(FinishStr);
      if(msg != null)
      {      
      	if (/N\/A/.test(msg[2])) 
           msg[2] = 0;
         switch(msg[1])
         {	
      		case "MVL":
      		  //var Volume = parseInt(msg[2],16);
              var Volume = parseInt(msg[2],16);
              if (Volume == 'Nan') {return}
              that.device.SetFeedback("Volume", Volume);
              IR.Log("Main Zone Volume = "+ Volume);
      		  //var Aux = (parseInt(msg[2],16)/100)*65535;
      		  //IR.Log("Main Zone Aux = "+ Aux);
      		break;
      		
      		case "ZVL":
      		  //var Volume = parseInt(msg[2],16);
              var Volume = parseInt(msg[2],16);
              if (Volume == 'Nan') {return} 
              that.device.SetFeedback("Volume z2", Volume);
              IR.Log("Second Zone Volume = "+ Volume);
      		  //var Aux = (parseInt(msg[2],16)/100)*65535;
      		  //IR.Log("Second Zone Aux = "+ Aux);
      		break;
            
            case "VL3":
              var Volume = parseInt(msg[2],16);  
               if (Volume == 'Nan') {return} 
              that.device.SetFeedback("Volume z3", Volume);
              //IR.Log("Third Zone Volume = "+ Volume);
      		break;
      		
      	};
      	volRegex.lastIndex = 0;
      }
      
      msg = tunerRegex.exec(FinishStr);
      if(msg != null)
      {
      	switch(msg[1])
         {      		
      		case "TUN":
      		  var Aux = parseFloat(msg[2]);
      		  if (Aux >= 1000) 
                Aux = (Aux/100).toFixed(1);
      		  IR.Log("TUN = " + Aux);
      		break;
      		
      		case "TUZ":
      		  var Aux = parseFloat(msg[2]);
      		  if (Aux >= 1000) 
                Aux = (Aux/100).toFixed(1);
      		  IR.Log("TUZ = " + Aux);
      		break;
      		
      	};
      	tunerRegex.lastIndex = 0;	
      }				
      
      msg = selectorRegex.exec(FinishStr);
      if(msg != null)
      {
      	if(msg[1] == "SLI")
         {
      		var Input;
      		switch(parseInt(msg[2]))
            {
      			case 00:
      			  Input = "Video 1";
      			break;
      			case 01:
      			  Input = "Video 2";
      			break;
      			case 02:
      			  Input = "Video 3";
      			break;
      			case 03:
      			  Input = "Video 4";
      			break;
      			case 04:
      			  Input = "Video 5";
      			break;
      			case 05:
      			  Input = "Video 6";
      			break;
      			case 06:
      			  Input = "Video 7";
      			break;
      			case 10:
      			  Input = "DVD";
      			break;
      			case 20:
      			  Input = "Tape 1";
      			break;
      			case 21:
      			  Input = "Tape 2";
      			break;
      			case 22:
      			  Input = "Phono";
      			break;
      			case 23:
      			  Input = "CD";
      			break;
      			case 24:
      			  Input = "FM";
      			break;
      			case 25:
      			  Input = "AM";
      			break;
      			case 26:
      			  Input = "Tuner";
      			break;
      			case 27:
      			  Input = "Music Server";
      			break;
      			case 28:
      			  Input = "Net Radio";
      			break;
      			case 29:
      			  Input = "USB";
      			break;
      			case 30:
      			  Input = "Multi CH";
      			break;
      			case 31:
      			  Input = "XM";
      			break;
      		
      		};
      		
            that.device.SetFeedback("Input zone 1", Input);
            
            //IR.Log("Main Zone Input = " + Input);      		
      	}
      	if(msg[1] == "SLZ")
         {      		
      		switch(parseInt(msg[2])){
      		
      			case 00:
      			  Input = "Video 1";
      			break;
      			case 01:
      			  Input = "Video 2";
      			break;
      			case 02:
      			  Input = "Video 3";
      			break;
      			case 03:
      			  Input = "Video 4";
      			break;
      			case 04:
      			  Input = "Video 5";
      			break;
      			case 05:
      			  Input = "Video 6";
      			break;
      			case 06:
      			  Input = "Video 7";
      			break;
      			case 10:
      			  Input = "DVD";
      			break;
      			case 20:
      			  Input = "Tape 1";
      			break;
      			case 21:
      			  Input = "Tape 2";
      			break;
      			case 22:
      			  Input = "Phono";
      			break;
      			case 23:
      			  Input = "CD";
      			break;
      			case 24:
      			  Input = "FM";
      			break;
      			case 25:
      			  Input = "AM";
      			break;
      			case 26:
      			  Input = "Tuner";
      			break;
      			case 27:
      			  Input = "Music Server";
      			break;
      			case 28:
      			  Input = "Net Radio";
      			break;
      			case 29:
      			  Input = "IPod";
      			break;
      			case 30:
      			  Input = "Multi CH";
      			break;
      			case 31:
      			  Input = "XM";
      			break;         		
      		};
      		that.device.SetFeedback("Input zone 2", Input);
            //IR.Log("Second zone input: " + Input);      		
      	}	
         if(msg[1] == "SL3")
         {      		
      		switch(parseInt(msg[2]))
            {      		
      			case 00:
      			  Input = "Video 1";
      			break;
      			case 01:
      			  Input = "Video 2";
      			break;
      			case 02:
      			  Input = "Game\TV";
      			break;
      			case 03:
      			  Input = "Video 4";
      			break;
      			case 04:
      			  Input = "Video 5";
      			break;
      			case 05:
      			  Input = "Video 6";
      			break;
      			case 06:
      			  Input = "Video 7";
      			break;
      			case 10:
      			  Input = "DVD";
      			break;
      			case 20:
      			  Input = "Tape 1";
      			break;
      			case 21:
      			  Input = "Tape 2";
      			break;
      			case 22:
      			  Input = "Phono";
      			break;
      			case 23:
      			  Input = "CD";
      			break;
      			case 24:
      			  Input = "FM";
      			break;
      			case 25:
      			  Input = "AM";
      			break;
      			case 26:
      			  Input = "Tuner";
      			break;
      			case 27:
      			  Input = "Music Server";
      			break;
      			case 28:
      			  Input = "Net Radio";
      			break;
      			case 29:
      			  Input = "USB";
      			break;
      			case 30:
      			  Input = "Multi CH";
      			break;
      			case 31:
      			  Input = "XM";
      			break;
      		
      		};
      		that.device.SetFeedback("Input zone 3", Input);
            //IR.Log("Third zone input: " + Input);      		
      	}	
      	selectorRegex.lastIndex = 0;
      
      };	
//----------------------------------------------------------------------------------------- 
  }); 
  
  function SendPacket(cmd)
  {
    IR.Log("!!! = "+ cmd);
    var len = cmd.length + 3;
    //IR.Log("len = "+ len)
    that.device.Send(['ISCP', 0x00, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00, len, 0x01, 0x00, 0x00, 0x00, cmd, 0x0D]);
  };
  
  function CreatePacket(curzone, cmd, vallvl)
  {
    IR.Log(curzone + '  ' + cmd +'    '+ vallvl);
    
    var packet = '!1';
    curzone = curzone + '';
    switch (cmd)
    {
     case 'POWER OFF':
       switch (curzone)
       {
        case '1': 
          packet += 'PWR00';
        break;
        case '2': 
          packet += 'ZPW00';
        break;
        case '3': 
          packet += 'PW300';
        break;
       } 
     break;
     case 'POWER ON':          
        switch (curzone)
       {
        case '1': 
          packet += 'PWR01';
        break;
        case '2': 
          packet += 'ZPW01';
        break;
        case '3': 
          packet += 'PW301';
        break;
       }
     break;
     case 'MUTE OFF':          
        switch (curzone)
       {
        case '1': 
          packet += 'AMT00';
        break;
        case '2': 
          packet += 'ZMT00';
        break;
        case '3': 
          packet += 'MT300';
        break;
       } 
     break;
     case 'MUTE ON':          
         switch (curzone)
       {
        case '1': 
          packet += 'AMT01';
        break;
        case '2': 
          packet += 'ZMT01';
        break;
        case '3': 
          packet += 'MT301';
        break;
       }  
     break;
     
    case 'MUTE SWITCH': 
      switch (curzone) 
      { 
         case '1': 
            if(that.device.GetFeedback("Mute") == 0) 
               packet += 'AMT01'; 
            else 
               packet += 'AMT00'; 
         break; 
         
         case '2': 
            if(that.device.GetFeedback("Mute z2") == 0) 
               packet += 'ZMT01'; 
            else 
               packet += 'ZMT00'; 
         break; 
         
         case '3': 
            if(that.device.GetFeedback("Mute z3") == 0) 
               packet += 'MT301'; 
            else 
               packet += 'MT300'; 
         break; 
      } 
      break;
      
     case 'VOLUME 0-100':          
     
         var data = "";
         if (parseInt(vallvl) < 16) {
            data = "0" + vallvl.toString(16);
         } else {
            data = vallvl.toString(16);   
         } 
           
       switch (curzone)
       {
        case '1': 
        //IR.Log("!!!!!!!!!!!!!!!!" +  typeof(vallvl));
        //IR.Log(vallvl);
        //IR.Log(parseInt(vallvl,16));
          packet += 'MVL'+ data;
        break;
        case '2': 
          packet += 'ZVL'+ data;
        break;
        case '3': 
          packet += 'VL3'+ data;
        break;
       }  
     break;
     case 'VOLUME UP':          
       switch (curzone)
       {
        case '1': 
          packet += 'MVLUP';
        break;
        case '2': 
          packet += 'ZVLUP';
        break;
        case '3': 
          packet += 'VL3UP';
        break;
       }
     break;  
     case 'VOLUME DOWN':          
        switch (curzone)
       {
        case '1': 
          packet += 'MVLDOWN';
        break;
        case '2': 
          packet += 'ZVLDOWN';
        break;
        case '3': 
          packet += 'VL3DOWN';
        break;
       }
       break;
        case 'SETUP OPERATION MENU':          
        switch (curzone)
       {
        case '1': 
          packet += 'OSDMENU';
        break;
       } 
       break;
        case 'SETUP OPERATION UP':          
        switch (curzone)
       {
        case '1': 
          packet += 'OSDUP';
        break;
       }
       break;
        case 'SETUP OPERATION DOWN':          
        switch (curzone)
       {
        case '1': 
          packet += 'OSDDOWN';
        break;
       } 
       break;
        case 'SETUP OPERATION RIGHT':          
         switch (curzone)
       {
        case '1': 
          packet += 'OSDRIGHT';
        break;
       }; 
       break;
        case 'SETUP OPERATION LEFT':          
         switch (curzone)
       {
        case '1': 
          packet += 'OSDLEFT';
        break;
       } 
       break;
        case 'SETUP OPERATION ENTER':          
         switch (curzone)
       {
        case '1': 
          packet += 'OSDENTER';
        break;
       } 
       break;
        case 'SETUP OPERATION EXIT':          
         switch (curzone)
       {
        case '1': 
          packet += 'OSDEXIT';
        break;
       } 
       break; case 'INPUT SELECTION VCR/DVR':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI00';
        break;
        case '2': 
          packet += 'SLZ00';
        break;
        case '3': 
          packet += 'SL300';
        break;
       }
       break;
        case 'INPUT SELECTION CBL/SAT':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI01';
        break;
        case '2': 
          packet += 'SLZ01';
        break;
        case '3': 
          packet += 'SL301';
        break;
       }
       break;
        case 'INPUT SELECTION GAME/TV':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI02';
        break;
        case '2': 
          packet += 'SLZ02';
        break;
        case '3': 
          packet += 'SL302';
        break;
       }
       break;
        case 'INPUT SELECTION AUX1(AUX)':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI03';
        break;
        case '2': 
          packet += 'SLZ03';
        break;
        case '3': 
          packet += 'SL303';
        break;
       }
       break;
        case 'INPUT SELECTION AUX2':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI04';
        break;
        case '2': 
          packet += 'SLZ04';
        break;
        case '3': 
          packet += 'SL304';
        break;
       } 
       break;
        case 'INPUT SELECTION VIDEO6':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI05';
        break;
        case '2': 
          packet += 'SLZ05';
        break;
        case '3': 
          packet += 'SL305';
        break;
       } 
       break;
        case 'INPUT SELECTION VIDEO7':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI06';
        break;
        case '2': 
          packet += 'SLZ06';
        break;
        case '3': 
          packet += 'SL306';
        break;
       } 
       break; 
       case 'INPUT SELECTION DVD':          
       switch (curzone)
       {
        case '1': 
          packet += 'SLI10';
        break;
        case '2': 
          packet += 'SLZ10';
        break;
        case '3': 
          packet += 'SL310';
        break;
       } 
       break; 
       case 'INPUT SELECTION TAPE(1)':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI20';
        break;
        case '2': 
          packet += 'SLZ20';
        break;
        case '3': 
          packet += 'SL320';
        break;
       } 
       break; 
       case 'INPUT SELECTION TAPE2':          
       switch (curzone)
       {
        case '1': 
          packet += 'SLI21';
        break;
        case '2': 
          packet += 'SLZ21';
        break;
        case '3': 
          packet += 'SL321';
        break;
       } 
       break;
        case 'INPUT SELECTION PHONO':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI22';
        break;
        case '2': 
          packet += 'SLZ22';
        break;
        case '3': 
          packet += 'SL322';
        break;
       }
       break; 
       case 'INPUT SELECTION CD':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI23';
        break;
        case '2': 
          packet += 'SLZ23';
        break;
        case '3': 
          packet += 'SL323';
        break;
       } 
       break;
        case 'INPUT SELECTION FM':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI24';
        break;
        case '2': 
          packet += 'SLZ24';
        break;
        case '3': 
          packet += 'SL324';
        break;
       } 
       break;
        case 'INPUT SELECTION AM':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI25';
        break;
        case '2': 
          packet += 'SLZ25';
        break;
        case '3': 
          packet += 'SL325';
        break;
       }
       break;
        case 'INPUT SELECTION TUNER':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLI26';
        break;
        case '2': 
          packet += 'SLI26';
        break;
        case '3': 
          packet += 'SL326';
        break;
       } 
       break;
        case 'INPUT SELECTION MUSIC SERVER':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI27';
        break;
        case '2': 
          packet += 'SLZ27';
        break;
        case '3': 
          packet += 'SL327';
        break;
       }
       break;
        case 'INPUT SELECTION INTERNET RADIO':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI28';
        break;
        case '2': 
          packet += 'SLZ28';
        break;
        case '3': 
          packet += 'SL328';
        break;
       }
       break;
        case 'INPUT SELECTION USB':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI29';
        break;
        case '2': 
          packet += 'SLZ29';
        break;
        case '3': 
          packet += 'SL329';
        break;
       }
       break;
        case 'INPUT SELECTION MULTI CH':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI30';
        break;
        case '2': 
          packet += 'SLZ30';
        break;
        case '3': 
          packet += 'SL330';
        break;
       } 
       break;
        case 'INPUT SELECTION XM*1':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLI31';
        break;
        case '2': 
          packet += 'SLZ31';
        break;
        case '3': 
          packet += 'SL331';
        break;
       } 
       break;
        case 'INPUT SELECTION SIRIUS*1':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLI32';
        break;
        case '2': 
          packet += 'SLZ32';
        break;
        case '3': 
          packet += 'SL332';
        break;
       } 
       break;
        case 'INPUT SELECTION UP':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLIUP';
        break;
        case '2': 
          packet += 'SLZUP';
        break;
        case '3': 
          packet += 'SL3UP';
        break;
       }
       break;
        case 'INPUT SELECTION DOWN':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLIDOWN';
        break;
        case '2': 
          packet += 'SLZDOWN';
        break;
        case '3': 
          packet += 'SL3DOWN';
        break;
       } 
       break;
        case 'RECOUT SELECTOR VIDEO1':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR00';
        break;
       } 
       break;
        case 'RECOUT SELECTOR VIDEO2':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR01';
        break;
       } 
       break;
         case 'RECOUT SELECTOR VIDEO3':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR02';
        break;
       }
       break;
        case 'RECOUT SELECTOR VIDEO4':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR03';
        break;
       } 
       break;
        case 'RECOUT SELECTOR VIDEO5':          
          switch (curzone)
       {
        case '1': 
          packet += 'SLR04';
        break;
       } 
       break;
        case 'RECOUT SELECTOR VIDEO6':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR05';
        break;
       } 
       break;
        case 'RECOUT SELECTOR VIDEO7':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR06';
        break;
       }
       break;
        case 'RECOUT SELECTOR DVD':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR10';
        break;
       } 
       break;
        case 'RECOUT SELECTOR TAPE(1)':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR20';
        break;
       }
       break;
        case 'RECOUT SELECTOR TAPE2':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR21';
        break;
       } 
       break;
        case 'RECOUT SELECTOR PHONO':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR22';
        break;
       } 
       break;
        case 'RECOUT SELECTOR CD':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR23';
        break;
       } 
       break;
        case 'RECOUT SELECTOR FM':          
          switch (curzone)
       {
        case '1': 
          packet += 'SLR24';
        break;
       } 
       break;
        case 'RECOUT SELECTOR AM':          
          switch (curzone)
       {
        case '1': 
          packet += 'SLR25';
        break;
       } 
       break;
        case 'RECOUT SELECTOR TUNER':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR26';
        break;
       } 
       break;
        case 'RECOUT SELECTOR MUSIC SERVER':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR27';
        break;
       }
       break;
        case 'RECOUT SELECTOR INTERNET RADIO':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR28';
        break;
       } 
       break;
        case 'RECOUT SELECTOR MULTI CH':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR30';
        break;
       } 
       break;
        case 'RECOUT SELECTOR XM':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR31';
        break;
       } 
       break;
        case 'RECOUT SELECTOR OFF':          
          switch (curzone)
       {
        case '1': 
          packet += 'SLR7F';
        break;
       } 
       break;
        case 'RECOUT SELECTOR SOURCE':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLR80';
        break;
       }
       break;
        case 'AUDIO SELECTOR AUTO':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLA00';
        break;
       } 
       break;
        case 'AUDIO SELECTOR MULTI-CHANNEL':          
        switch (curzone)
       {
        case '1': 
          packet += 'SLA01';
        break;
       }  
       break;
        case 'AUDIO SELECTOR ANALOG':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLA02';
        break;
       }  
       break;
        case 'AUDIO SELECTOR iLINK':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLA03';
        break;
       }  
       break;
        case 'AUDIO SELECTOR HDMI':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLA04';
        break;
       } 
       break;
        case 'AUDIO SELECTOR UP':          
         switch (curzone)
       {
        case '1': 
          packet += 'SLAUP';
        break;
       }  
       break;
        case 'LISTENING MODE STEREO':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD00';
        break;
       }  
       break;
        case 'LISTENING MODE DIRECT':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD01';
        break;
       }   
       break;
        case 'LISTENING MODE SURROUND':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD02';
        break;
       }   
       break;
        case 'LISTENING MODE FILM':          
          switch (curzone)
       {
        case '1': 
          packet += 'LMD03';
        break;
       }   
       break;
        case 'LISTENING MODE THX':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD04';
        break;
       }   
       break;
        case 'LISTENING MODE ACTION':          
          switch (curzone)
       {
        case '1': 
          packet += 'LMD05';
        break;
       }   
       break;
        case 'LISTENING MODE MUSICAL':          
          switch (curzone)
       {
        case '1': 
          packet += 'LMD06';
        break;
       }   
       break;
        case 'LISTENING MODE MONO MOVIE':          
          switch (curzone)
       {
        case '1': 
          packet += 'LMD07';
        break;
       }   
       break;
        case 'LISTENING MODE ORCHESTRA':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD08';
        break;
       }   
       break;
        case 'LISTENING MODE UNPLUGGED':          
          switch (curzone)
       {
        case '1': 
          packet += 'LMD09';
        break;
       }   
       break;
        case 'LISTENING MODE STUDIO-MIX':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD0A';
        break;
       }   
       break;
        case 'LISTENING MODE TV LOGIC':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD0B';
        break;
       }  
       break;
        case 'LISTENING MODE ALL CH STEREO':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD0C';
        break;
       }   
       break;
        case 'LISTENING MODE THEATER-DIMENSIONAL':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD0D';
        break;
       }   
       break;
        case 'LISTENING MODE ENHANCED 7/ENHANCE':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD0E';
        break;
       }   
       break;
       case 'LISTENING MODE MONO':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD0F';
        break;
       }   
       break;
       case 'LISTENING MODE PURE AUDIO':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD11';
        break;
       }   
       break;
       case 'LISTENING MODE MULTIPLEX':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD12';
        break;
       }   
       break;
       case 'LISTENING MODE FULL MONO':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD13';
        break;
       }   
       break;
       case 'LISTENING MODE DOLBY VIRTUAL':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD14';
        break;
       }   
       break;
       case 'LISTENING MODE 5,1CH SURROUND':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD40';
        break;
       }   
       break;
       case 'LISTENING MODE STRAIGHT DECODE*1':   //FFFFUUUUUUU       
        switch (curzone)
       {
        case '1': 
          packet += 'LMD40';
        break;
       }   
       break;
       case 'LISTENING MODE DOLBY EX/DTS ES':          
          switch (curzone)
       {
        case '1': 
          packet += 'LMD41';
        break;
       }   
       break;
       case 'LISTENING MODE DOLBY EX*2':      //FFFFUUUUUU    
         switch (curzone)
       {
        case '1': 
          packet += 'LMD41';
        break;
       }   
       break;
       case 'LISTENING MODE THX CINEMA':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD42';
        break;
       }  
       break;
       case 'LISTENING MODE THX SURROUND EX':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD43';
        break;
       }  
       break;
       case 'LISTENING MODE U2/S2 CINEMA/CINEMA2':          
        switch (curzone)
       {
        case '1': 
          packet += 'LMD50';
        break;
       }   
       break;
       case 'LISTENING MODE MUSIC MODE':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD51';
        break;
       }   
       break;
       case 'LISTENING MODE GAMES MODE':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD52';
        break;
       }  
       break;
       case 'LISTENING MODE PLII/PLIIx MOVIE':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD80';
        break;
       }   
       break;
       case 'LISTENING MODE PLII/PLIIx MUSIC':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD81';
        break;
       }   
       break;
       case 'LISTENING MODE NEO6 CINEMA':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD82';
        break;
       }   
       break;
       case 'LISTENING MODE NEO6 MUSIC':          
        switch (curzone)
       {
        case '1': 
          packet += 'LMD83';
        break;
       }   
       break;
       case 'LISTENING MODE PLII/PLIIx THX CINEMA':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD84';
        break;
       }  
       break;
       case 'LISTENING MODE NEO6 THX CINEMA':          
        switch (curzone)
       {
        case '1': 
          packet += 'LMD85';
        break;
       }   
       break;
       case 'LISTENING MODE PLII/PLIIx GAME':          
        switch (curzone)
       {
        case '1': 
          packet += 'LMD86';
        break;
       }   
       break;
       case 'LISTENING MODE NEUTRAL SURR*3':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD87';
        break;
       }   
       break;
       case 'LISTENING MODE NEUTRAL THX':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD88';
        break;
       }   
       break;
       case 'LISTENING MODE PLII THX GAMES':          
        switch (curzone)
       {
        case '1': 
          packet += 'LMD89';
        break;
       }   
       break;
       case 'LISTENING MODE NEO6 THX GAMES':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMD8A';
        break;
       }   
       break;
       case 'LISTENING MODE UP':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMDUP';
        break;
       }   
       break;
       case 'LISTENING MODE DOWN':          
         switch (curzone)
       {
        case '1': 
          packet += 'LMDDOWN';
        break;
       }   
       break;
       case 'TUNING COMMAND UP':          
        switch (curzone)
       {
        case '1': 
          packet += 'TUNUP';
        break;
        case '2': 
          packet += 'TUNUP';
        break;
        case '3': 
          packet += 'TUNUP';
        break;
       }
       break;
       case 'TUNING COMMAND DOWN':          
        switch (curzone)
       {
        case '1': 
          packet += 'TUNDOWN';
        break;
        case '2': 
          packet += 'TUNDOWN';
        break;
        case '3': 
          packet += 'TUNDOWN';
        break;
       } 
       break;
       case 'PRESET COMMAND 1-40':          
         switch (curzone)
       {
        case '1': 
          packet += 'PRS'+vallvl;
        break;
        case '2': 
          packet += 'PRS'+vallvl;
        break;
        case '3': 
          packet += 'PRS'+vallvl;
        break;
       }  
       break;
       case 'PRESENT COMMAND UP':          
        switch (curzone)
       {
        case '1': 
          packet += 'PRSUP';
        break;
        case '2': 
          packet += 'PRSUP';
        break;
        case '3': 
          packet += 'PRSUP';
        break;
       }   
       break;
       case 'PRESENT COMMAND DOWN':          
        switch (curzone)
       {
        case '1': 
          packet += 'PRSDOWN';
        break;
        case '2': 
          packet += 'PRSDOWN';
        break;
        case '3': 
          packet += 'PRSDOWN';
        break;
       }    
       break;
    }
    SendPacket(packet);
  };
    
  IR.AddListener(IR.EVENT_CHANNEL_SET,that.device,function(namecommand)
  {   
      IR.Log("!!!!!! = "+ namecommand);
    // IR.Log(that.device.GetFeedback("Volume"))
     var curzone = checkzone;
     IR.Log("??? = "+ curzone);
     var cmd = namecommand;
     switch (namecommand)
     {
       case 'POWER OFF':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'POWER ON':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'MUTE OFF':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'MUTE ON':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;            
       case 'MUTE SWITCH':    
         value = 0;
         CreatePacket(curzone, cmd, value); 
        break;          
       case 'VOLUME 0-100':
        if (curzone == '1') 
        {       
         var vallvl = that.device.GetFeedback('Volume'); 
        // IR.Log("VALUE = "+vallvl);
         CreatePacket(curzone, cmd, vallvl); 
        } else
        if (curzone == '2')
        {
         var vallvl = that.device.GetFeedback('Volume z2');
         //IR.Log("VALUE = "+vallvl); 
         CreatePacket(curzone, cmd, vallvl); 
        }else 
        if (curzone == '3')
        {
         var vallvl = that.device.GetFeedback('Volume z3'); 
         CreatePacket(curzone, cmd, vallvl); 
        }                                                     
       break;
      case 'VOLUME UP':
        if (curzone == '1') 
        {       
         var vallvl = that.device.GetFeedback('Volume'); 
         CreatePacket(curzone, cmd, vallvl); 
        } else if (curzone == '2')
        {
         var vallvl = that.device.GetFeedback('Volume z2'); 
         CreatePacket(curzone, cmd, vallvl); 
        }else if (curzone == '3')
        {
         var vallvl = that.device.GetFeedback('Volume z3'); 
         CreatePacket(curzone, cmd, vallvl); 
        }
      break;
     case 'VOLUME DOWN':          
        IR.Log("bygaga");
        if (curzone == '1') 
        {       
         var vallvl = that.device.GetFeedback('Volume'); 
         CreatePacket(curzone, cmd, vallvl); 
        } else
       if (curzone == '2')
        {
         var vallvl = that.device.GetFeedback('Volume z2');
         CreatePacket(curzone, cmd, vallvl); 
        }else 
        if (curzone == '3')
        {
         var vallvl = that.device.GetFeedback('Volume z3'); 
         CreatePacket(curzone, cmd, vallvl); 
        }
       break;  
        case 'SETUP OPERATION MENU':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'SETUP OPERATION UP':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'SETUP OPERATION DOWN':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'SETUP OPERATION RIGHT':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'SETUP OPERATION LEFT':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'SETUP OPERATION ENTER':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'SETUP OPERATION EXIT':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break; 
       case 'INPUT SELECTION VCR/DVR':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'INPUT SELECTION CBL/SAT':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break; 
       case 'INPUT SELECTION GAME/TV':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'INPUT SELECTION AUX1(AUX)':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'INPUT SELECTION AUX2':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'INPUT SELECTION VIDEO6':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'INPUT SELECTION VIDEO7':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break; 
       case 'INPUT SELECTION DVD':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break; 
       case 'INPUT SELECTION TAPE(1)':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break; 
       case 'INPUT SELECTION TAPE2':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'INPUT SELECTION PHONO':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break; 
       case 'INPUT SELECTION CD':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'INPUT SELECTION FM':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'INPUT SELECTION AM':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'INPUT SELECTION TUNER':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'INPUT SELECTION MUSIC SERVER':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'INPUT SELECTION INTERNET RADIO':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'INPUT SELECTION USB':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'INPUT SELECTION MULTI CH':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'INPUT SELECTION XM*1':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'INPUT SELECTION SIRIUS*1':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'INPUT SELECTION UP':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'INPUT SELECTION DOWN':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR VIDEO1':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR VIDEO2':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
         case 'RECOUT SELECTOR VIDEO3':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR VIDEO4':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR VIDEO5':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR VIDEO6':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR VIDEO7':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR DVD':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR TAPE(1)':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR TAPE2':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR PHONO':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR CD':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR FM':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR AM':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR TUNER':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR MUSIC SERVER':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR INTERNET RADIO':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR MULTI CH':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'RECOUT SELECTOR XM':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR OFF':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'RECOUT SELECTOR SOURCE':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'AUDIO SELECTOR AUTO':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'AUDIO SELECTOR MULTI-CHANNEL':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'AUDIO SELECTOR ANALOG':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'AUDIO SELECTOR iLINK':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'AUDIO SELECTOR HDMI':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'AUDIO SELECTOR UP':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE STEREO':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE DIRECT':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE SURROUND':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE FILM':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE THX':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE ACTION':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE MUSICAL':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE MONO MOVIE':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE ORCHESTRA':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE UNPLUGGED':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE STUDIO-MIX':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE TV LOGIC':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE ALL CH STEREO':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE THEATER-DIMENSIONAL':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
        case 'LISTENING MODE ENHANCED 7/ENHANCE':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE MONO':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE PURE AUDIO':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE MULTIPLEX':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE FULL MONO':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE DOLBY VIRTUAL':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE 5,1CH SURROUND':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE STRAIGHT DECODE*1':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE DOLBY EX/DTS ES':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE DOLBY EX*2':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE THX CINEMA':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE THX SURROUND EX':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE U2/S2 CINEMA/CINEMA2':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE MUSIC MODE':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE GAMES MODE':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE PLII/PLIIx MOVIE':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE PLII/PLIIx MUSIC':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE NEO6 CINEMA':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE NEO6 MUSIC':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE PLII/PLIIx THX CINEMA':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE NEO6 THX CINEMA':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE PLII/PLIIx GAME':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE NEUTRAL SURR*3':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE NEUTRAL THX':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE PLII THX GAMES':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE NEO6 THX GAMES':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE UP':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE DOWN':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'LISTENING MODE GAMES MODE':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'TUNING COMMAND UP':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'TUNING COMMAND DOWN':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'PRESET COMMAND 1-40':          
        if (curzone = '1') 
        { 
        IR.Log("valpr = " + that.device.GetFeedback('Preset'));      
         var valpr = that.device.GetFeedback('Preset'); 
         //CreatePacket(curzone, cmd, valpr); 
         CreatePacket(curzone, cmd, valpr);
        } else
        if (curzone = '2')
        {
         var valpr = that.device.GetFeedback('Preset z2'); 
         CreatePacket(curzone, cmd, valpr); 
        }else 
        if (curzone = '3')
        {
         var valpr = that.device.GetFeedback('Preset z3'); 
         CreatePacket(curzone, cmd, valpr); 
        } 
       break;
       case 'PRESENT COMMAND UP':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'PRESENT COMMAND DOWN':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'CD-R RECORDER POWER':          
         value = 0;
         CreatePacket(curzone, cmd, value); 
       break;
       case 'Select Zone 1':          
         checkzone = '1';
       break;
       case 'Select Zone 2':          
         checkzone = '2'; 
       break;
       case 'Select Zone 3':          
         checkzone = '3'; 
       break; 
     }  
    IR.Log("name = "+ namecommand);
  });
};

var mydevice = new OnkyoDevice('Onkyo');
// Buttons for navigate in the list
function Onkyo_setto0()
{
   IR.GetItem("Onkyo_Main").GetItem("Item 1").SetPosition(0)
}         
function Onkyo_setto1()
{
   IR.GetItem("Onkyo_Main").GetItem("Item 1").SetPosition(1)
}
function Onkyo_setto2()
{
   IR.GetItem("Onkyo_Main").GetItem("Item 1").SetPosition(2)
}