var Marantz_sr5007 = function(DeviceName)
{
  this.DriverName = DeviceName;
  this.device = IR.GetDevice(this.DriverName);
  this.queue = [];
  this.Online = false;
  this.timerID;
  this.SecondZone = false;
  var SecondZonePacket;
  var SourceList = ['FAVORITES', 'IRADIO', 'SERVER', 'SOURCE', 'SAT/CBL', 'DVD', 'BD', 'GAME', 'AUX1', 'MPLAY', 'CD', 'TUNER', 'TV', 'M-XPORT'];
  
  IR.Log("this.device = "+DeviceName)
  var that = this;
  IR.AddListener(IR.EVENT_START,0,function()
  {
    IR.Log("start");
  });
  
  //-------------------------------------------------------
  // Обработчик перехода устройства в Online
  //-------------------------------------------------------     
  IR.AddListener(IR.EVENT_ONLINE, that.device, function()
  { 
    IR.Log("DEVICE is Online");
    that.queue.push("PW?",13);
    that.queue.push("ZM?",13);
    
    that.queue.push("MV?",13);
    that.queue.push("MU?",13);
    that.queue.push("SI?",13);
    that.queue.push("MS?",13);
    
    that.queue.push("Z2?",13);
    that.queue.push("Z2MU?",13);
    
    that.device.SetFeedback("Selected Zone", "Zone1");
    that.Online = true;
    
    that.timerID = IR.SetInterval(300,SendPacket);
  }, that);
  
  //-------------------------------------------------------
  // Обработчик перехода устройства в Offline
  //-------------------------------------------------------
  IR.AddListener(IR.EVENT_OFFLINE, that.device, function()
  { 
    IR.Log("DEVICE is Offline");
    that.Online = false;
  }, that);
  
  function SendPacket()
  {
    var packet = that.queue.shift();
    if (packet) that.device.Send([packet]);
  }
  
  IR.AddListener(IR.EVENT_RECEIVE_TEXT,that.device, function(text)
  {
    IR.Log("text = "+text);
    var cmd = text.slice(0,2);
    var answer;
    if (that.SecondZone)
    {
      SecondZonePacket += text;
      BadPacket(SecondZonePacket);
      that.SecondZone = false;
    };
    switch (cmd)
    {
      case "PW":
        answer = text.slice(2,4);
        if (answer == "ON") 
          answer = 1
        else
          answer = 0;  
        that.device.SetFeedback("Power", answer);
      break;
      case "MV":
        answer = text.slice(2,4);
        if (/\d/.test(answer))
          that.device.SetFeedback("MZVolume", answer);
      break;
      case "MU":
        answer = text.slice(2,4);
        if (answer == "ON")
          answer = 1
        else
          answer = 0;
        that.device.SetFeedback("MZMute", answer);    
      break;
      case "SI":
        answer = text.slice(2,text.indexOf('\r'));
        that.device.SetFeedback("MZInput", answer);
      break;
      case "MS":
        answer = text.slice(2,text.indexOf('\r'));
        that.device.SetFeedback("MZAudio mode", "Audio mode: "+answer);
      break;
      case "ZM":
        answer = text.slice(2,4);
        if (answer == "ON") 
          answer = 1
        else
          answer = 0;  
        that.device.SetFeedback("MZPower", answer);
      break;
      case "Z2":  
        var IsSource = false;
        //SourceList
        var source = text.slice(2, text.indexOf('\r'));
        
        for (var NowSource in SourceList)
        {
          if (source.indexOf(SourceList[NowSource]) >= 0)
          {
            IsSource = true;
            that.device.SetFeedback("Z2Input", source);
          }
        };
        
        if (IsSource)
          break;
        
        var mute = text.slice(2,4);
        IR.Log("mute = "+mute);
        if (mute == "MU")
        {
          var MuteStatus = text.slice(4, text.length - 1);
          if (MuteStatus == "OFF")
          {
            that.device.SetFeedback("Z2Mute", 0);
          }
          else
          {
            that.device.SetFeedback("Z2Mute", 1);
          }
        }
        else
        { 
          var EndPacket;
           
          EndPacket = text.slice(text.length-5,text.length);
           
           
          IR.Log("EndPacket = "+EndPacket);
          IR.Log(/Z2/.test(EndPacket));
          if (/Z2/.test(EndPacket))
          {
            that.SecondZone = true; 
            SecondZonePacket = text;
          }
          else
          {
            var ZoneInfo = text.split('\r');
            var ZonePower = ZoneInfo[0].slice(2,4);
            IR.Log("ZonePower = "+ZonePower);
            if (ZonePower == "ON") 
              ZonePower = 1
            else
             ZonePower = 0;  
            that.device.SetFeedback("Z2Power", ZonePower);
          }
        }
      break;      
    }  
  }); 
  
  function BadPacket(packet)
  {
    //IR.Log("packet = "+packet);
    var ZoneInfo = packet.split('\r');
    IR.Log("ZoneInfo = "+ZoneInfo);
    var ZonePower = ZoneInfo[0].slice(2,4);
    if (ZonePower == "ON") 
       ZonePower = 1
     else
       ZonePower = 0;  
     that.device.SetFeedback("Z2Power", ZonePower);
     
     var ZoneSource = ZoneInfo[2];
     var ZoneInput = ZoneSource.slice(2,ZoneSource.length);
     that.device.SetFeedback("Z2Input", ZoneInput);
     
     var ZoneVolume = ZoneInfo[4];
     var MyVolume = ZoneVolume.slice(2,ZoneSource.length - 1); 
     that.device.SetFeedback("Z2Volume", MyVolume);
  }    
  
  IR.AddListener(IR.EVENT_CHANNEL_SET,that.device,function(name)
  {   
    IR.Log("name = "+ name);
    var ZoneData;
    var SelectedZone = that.device.GetFeedback("Selected Zone");
    if (SelectedZone == "Zone1")
      ZoneData = "ZM";
    else  
      ZoneData = "Z2";
      
    switch(name)
    {
     case "Power":
       var power = that.device.GetFeedback("MZPower");
       IR.Log("power = "+power);
       if (power == 1)
         that.queue.push("PWSTANDBY",13); 
       else   
         that.queue.push("PWON",13);
     break;
     case "Volume Up":
       if (ZoneData == "ZM")
         ZoneData = "MV"
       IR.Log(ZoneData+"UP")  
       that.queue.push(ZoneData+"UP",13);
     break;
     case "Volume Down":                                
       if (ZoneData == "ZM")
         ZoneData = "MV"
       that.queue.push(ZoneData+"DOWN",13);
     break;
     case "Set Volume":
       var CurrVolume = that.device.GetFeedback("MZVolume");
       IR.Log("MV"+CurrVolume)
       if (ZoneData == "ZM")
         ZoneData = "MV"
       that.queue.push(ZoneData+CurrVolume,13);
     break;
     case "Mute":
       var CurrMute = that.device.GetFeedback("MZMute");
       if (CurrMute == 0)
         that.queue.push("MUON",13)
       else  
         that.queue.push("MUOFF",13);
     break;
     case "Internet Radio":
       if (ZoneData == "Z2")
         that.queue.push("Z2IRADIO",13);
       else  
         that.queue.push("SIIRADIO",13);
     break;
     case "Favorites":
       if (ZoneData == "Z2")
         that.queue.push("Z2FAVORITES",13);
       else
         that.queue.push("SIFAVORITES",13);
     break;
     case "FM":
       if (ZoneData == "Z2")
         that.queue.push("Z2TUNER",13);
       else
         that.queue.push("SITUNER",13);
     break;
     case "Media server":
       if (ZoneData == "Z2")
         that.queue.push("Z2SERVER",13);
       else
         that.queue.push("SISERVER",13);
     break;
     case "Blu-ray":
       if (ZoneData == "Z2")
         that.queue.push("Z2BD",13);
       else
         that.queue.push("SIBD",13);
     break;
     case "CD":
       if (ZoneData == "Z2")
         that.queue.push("Z2CD",13);
       else
         that.queue.push("SICD",13);
     break;
     case "DVD":
       if (ZoneData == "Z2")
         that.queue.push("Z2DVD",13);
       else
         that.queue.push("SIDVD",13);
     break;
     case "LastFM":
       if (ZoneData == "Z2")
         that.queue.push("Z2LASTFM",13);
       else
         that.queue.push("SILASTFM",13);
     break;
     case "Media Player":
       if (ZoneData == "Z2")
         that.queue.push("Z2MPLAY",13);
       else
         that.queue.push("SIMPLAY",13);
     break;
     case "Network":
       if (ZoneData == "Z2")
         that.queue.push("Z2NET",13);
       else
         that.queue.push("SINET",13);
     break;
     case "TV AUDIO":
       if (ZoneData == "Z2")
         that.queue.push("Z2TV",13);
       else
         that.queue.push("SITV",13);
     break;
     case "cbl-sat":
       if (ZoneData == "Z2")
         that.queue.push("Z2SAT/CBL",13);
       else
         that.queue.push("SISAT/CBL",13);
     break;
     case "M-XPort":
       if (ZoneData == "Z2")
         that.queue.push("Z2M-XPORT",13);
       else
         that.queue.push("SIM-XPORT",13);
     break;
     case "aux":
       if (ZoneData == "Z2")
         that.queue.push("Z2AUX1",13);
       else
         that.queue.push("SIAUX1",13);
     break;
     case "Game":
       if (ZoneData == "Z2")
         that.queue.push("Z2GAME",13);
       else
         that.queue.push("SIGAME",13);
     break;
     case "iPod-usb":
       if (ZoneData == "Z2")
         that.queue.push("Z2USB/IPOD",13);
       else
         that.queue.push("SIUSB/IPOD",13);
     break;
     case "Audio Direct":
       that.queue.push("MSDIRECT",13);
     break;
     case "Audio Stereo":
       that.queue.push("MSSTEREO",13);
     break;
     case "Audio Auto":
       that.queue.push("MSAUTO",13);
     break;
     case "Audio Standart":
       that.queue.push("MSSTANDARD",13);
     break;
     case "Audio Dolby":
       that.queue.push("MSDOLBY DIGITAL",13);
     break;
     case "Audio Matrix":
       that.queue.push("MSMATRIX",13);
     break;
     case "Audio Virtual":
       that.queue.push("MSVIRTUAL",13);
     break;
     case "Audio DTS":
       that.queue.push("MSDTS",13);
     break;
     case "Up":
       that.queue.push("MNCUP",13);
     break;
     case "Down":
       that.queue.push("MNCDN",13);
     break;
     case "Left":
       that.queue.push("MNCLT",13);
     break;
     case "Right":
       that.queue.push("MNCRT",13);
     break;
     case "Enter":
       that.queue.push("MNENT",13);
     break;
     case "Return":
       that.queue.push("MNRTN",13);
     break;
     case "Select Zone 1":
       that.device.SetFeedback("Selected Zone", "Zone1");
     break;
     case "Select Zone 2":
       that.device.SetFeedback("Selected Zone", "Zone2");
     break;
     case "Zone Power":
       var power;
       if (SelectedZone == "Zone1")
         power = that.device.GetFeedback("MZPower")
       else 
         power = that.device.GetFeedback("Z2Power")
       IR.Log("power = "+power);
       if (power == 1)
         that.queue.push(ZoneData+"OFF",13); 
       else   
         that.queue.push(ZoneData+"ON",13);
     break;
    } 
  });
 
};

var mydevice = new Marantz_sr5007("Marantz");


// Buttons for navigate in the list
function Marantz_sr5007_setto0()
{
   IR.GetItem("Marantz_Main").GetItem("Item 1").SetPosition(0);
}
function Marantz_sr5007_setto1()
{
   IR.GetItem("Marantz_Main").GetItem("Item 1").SetPosition(1);
}