/** TV device parameters:

 1. Input a name of the driver from the project device panel, for example "Samsung (Net)"
 2. TYPE MAC-ADDRESS OF THE CONTROL PANEL (iPAD, Laptop, etc.) HERE IN FORMAT 00-00-00-00-00-00
 3. CHANGE TV MODEL UE32F6330 on yours 
 
 */
var myTV =  new Samsung_net_main("Samsung (Net)", "00-00-00-00-00-00", "UE32F6330");

/** To add more TVs for controling:

    1. Copy the driver "Samsung (Net)" in the project device panel, the new driver
       will has the name "Samsung (Net) 1"
    2. Copy the line 
       var myTV =  new Samsung_net_main("Samsung (Net)", "00-00-00-00-00-00", "UE32F6330");
    3. Change line with new TV parameters (Driver name, mac, model) 
    
 */
 
 
 
 
 
 
 
 
 
 
 
 

///////////////////////////////////////////////////////////////////////////////////////
// No Changing folowing code
///////////////////////////////////////////////////////////////////////////////////////

function Samsung_net_main(in_device_name, in_mac, in_TV_model)
{
 //Driver Data
 
 //=============================================================================================

 //TYPE MAC-ADDRESS OF THE CONTROL PANEL (iPAD, Laptop, etc.) HERE IN FORMAT 00-00-00-00-00-00
 mymac = in_mac;
 
 //CHANGE TV MODEL UE32F6330 on yours   
 var tvappstring = "iphone." + in_TV_model + ".iapp.samsung";

 //YOU CAN CHANGE REMOTENAME IF YOU WANT
 var remotename = "iRidium Remote";
 
 //===============================================================================================

 this.DriverName = in_device_name;
 this.device;
 this.Online = false;
 
 var appstring = "iphone..iapp.samsung";
 var myip = "";  
 var remotename_b64 = base64_encode(remotename);

 this.device = IR.GetDevice(this.DriverName) ; //Определение ссылки на устройство по его имени (т.к. устройств одного типа может быть несколько в проекте - каждый экземпляр необходимо инициализировать отдельно по имени
  
 var that = this; //Получение ссылки на объект для использования его внутри функции
  
  
  IR.SetTimeout(0,function()
  {

    myip =  IR.GetVariable("Drivers." + that.DriverName + ".IP");
    
    IR.Log( "TV IP: " + IR.GetVariable("Drivers."+ that.DriverName +".Host") );
    IR.Log( "my IP: " + myip);
    IR.Log("my MAC: " + mymac);
      
  }
  );
  
  
  //online - offline
  
  IR.AddListener(IR.EVENT_ONLINE, that.device, function(text)
  {
   IR.Log(that.DriverName + " Device is OnLine");
   that.Online = true;  
   IR.SetVariable("Drivers.Samsung (Net).OnLine",true);
           
   message_connect();           
   message_reconnect();
  });
  
  
   
  IR.AddListener(IR.EVENT_OFFLINE, that.device, function(text)
  {
   IR.Log(that.DriverName + " Device is OffLine");
   that.Online = false;  
   IR.SetVariable("Drivers.Samsung (Net).OnLine",false);
   
  }); 

  
  IR.AddListener(IR.EVENT_CHANNEL_SET, that.device, function(name)
  {
     IR.Log("[" + that.DriverName + "] Channel set: {" + name + "}");
     message_control(name);
  });//listener channel
  
  
  function message_connect()
  {
    var myip_b64  = base64_encode(myip);
    var mymac_b64 = base64_encode(mymac);
    
    var length = 2 + 1 + 1 + myip_b64.length + 
                 1 + 1 + mymac_b64.length +
                 1 + 1 + remotename_b64.length;
                
   /* var messagepart =  "d\0"+
           String.fromCharCode(myip_b64.length) + "\0" + myip_b64 +
           String.fromCharCode(mymac_b64.length)+ "\0" + mymac_b64 +
           String.fromCharCode(remotename_b64.length) + "\0" + remotename_b64; 
    
     var msg = "\0" + String.fromCharCode(appstring.length) + "\0" + appstring +
           String.fromCharCode(messagepart.length) + "\0" + messagepart;//*/
           
    that.device.Send([
    0x00,appstring.length,0x00,appstring,
    length,0x00,
    0x64,0x00,myip_b64.length,0x00,myip_b64,mymac_b64.length,0x00,mymac_b64,remotename_b64.length,0x00,remotename_b64
    ]);
    
    IR.Log("Connect sended");                
  }
  
  
  function message_reconnect()
  {
    //var messagepart =  String.fromCharCode(0xC8,0x00);
    var length = 2;
    
   /* var msg =  String.fromCharCode(0x00,appstring.length,0x00) + appstring +
           String.fromCharCode(messagepart.length,0x00) + messagepart;//*/
           
           
    that.device.Send([
                        0x00,appstring.length,0x00,appstring,
                        length,0x00,
                        0xC8,0x00
                     ]);
    IR.Log("Reconnect sended");           
  }
  
  
  function message_control(KEY)
  {
    var sKey_b64 = base64_encode("KEY_" + KEY);
    var length = 3 + 1 + 1 + sKey_b64.length;
   
   // var messagepart =  String.fromCharCode(0x00,0x00,0x00,sKey_b64.length,0x00) + sKey_b64 ;  
  /*  var msg = String.fromCharCode(0x00,appstring.length,0x00) + appstring +
           String.fromCharCode(messagepart.length,0x00) + messagepart;*/
           
    that.device.Send([0x00,tvappstring.length,0x00,tvappstring,
                      length,0x00,
                      0x00,0x00,0x00,sKey_b64.length,0x00,sKey_b64
                     ]);
    IR.Log("KEY sended");           
  }    
    
  IR.AddListener(IR.EVENT_RECEIVE_DATA, that.device, function(text)
  {
   IR.Log("[" + that.DriverName + "]: " + text);  
  })


 function base64_encode( data ) {	// Encodes data with MIME base64
	// 
	// +   original by: Tyler Akins (http://rumkin.com)
	// +   improved by: Bayron Guevara

	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

	do { // pack three octets into four hexets
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);

		bits = o1<<16 | o2<<8 | o3;

		h1 = bits>>18 & 0x3f;
		h2 = bits>>12 & 0x3f;
		h3 = bits>>6 & 0x3f;
		h4 = bits & 0x3f;

		// use hexets to index into b64, and append result to encoded string
		enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	} while (i < data.length);

	switch( data.length % 3 ){
		case 1:
			enc = enc.slice(0, -2) + '==';
		break;
		case 2:
			enc = enc.slice(0, -1) + '=';
		break;
	}

	return enc;
};    

};