function Kramer2000(DeviceName)     // "DeviceName"    - device name in the project  
{      
   this.DeviceName       = DeviceName;           // device name in the project 
   this.MachineNumber    = 1;                    // machine number (1 by default)
   this.OutputsVideo     = 0;                    // number of Video outputs for commutation
   this.OutputsVideoInit = true;                 // разрешение инициализации команд для запроса состояний видеовыходов 
   this.OutputsAudio     = 0;                    // number of Audio outputs for commutation
   this.OutputsAudioInit = true;                 // разрешение инициализации команд для запроса состояний аудиовыходов 
   this.DEVICE = IR.GetDevice(this.DeviceName);  // identifier of the device instance in the system

   // function for command forming, returns the command ready for sending (array  of 4 bytes)
   this.GenCommand = function(instr, input, output, MachineNumber) 
   {
      var data = [];
      data[0] = instr;
      data[1] = input+128;
      data[2] = output+128;
      data[3] = MachineNumber+128;
      return data;     
   }          
   
   this.CommandsCur = -1;      // number of the current command inquired at the moment                         
   
   // array which stores commands for automatic request about the device state when
   // switching on or restoring connection after its loss 
   this.Commands = [           
      [0x1F,0x80,0x80,this.MachineNumber+128],  // Request whether Panel is Locked
      [0x0B,0x80,0x80,this.MachineNumber+128],  // Request BreakAway Setting
      [0x3E,0x82,0x81,this.MachineNumber+128],  // Define Machine outputs for Video
      [0x3E,0x82,0x82,this.MachineNumber+128]   // Define Machine outputs for Audio
   ];     
   
      
   // function for sending next command  for requesting the state of device properties
   this.RequestStatus = function()   
   {           
      this.CommandsCur++;
      if (this.CommandsCur < this.Commands.length)
      this.DEVICE.Send(this.Commands[this.CommandsCur]);
   }
   
   
   // Event: connection is established
   IR.AddListener(IR.EVENT_ONLINE, this.DEVICE, function()
   { 
      this.CommandsCur = -1;
      this.RequestStatus();     
   }, this);
   
   // Event: response from the device is received 
   IR.AddListener(IR.EVENT_RECEIVE_DATA, this.DEVICE, function(data)
   {  
      var instr  = data[0]-64;    // instruction number
      var input  = data[1]-128;   // input number
      var output = data[2]-128;   // output number  
      var i;
                               
      switch(instr)
      {
         case 1:   // Switch Video
            if(output == 0) // if 0, then it is applied to all outputs (in cycle)
            {                   
               for(i=1; i<=this.OutputsVideo; i++ )
               {
                  IR.SetVariable("Driver." + this.DeviceName + "." + "Video Out [" + i + "]",input);
               } 
               
               if(IR.GetVariable("Driver." + this.DeviceName + "." + "BreakAway Setting"))  // if Video and Audio signals are switched in 1 binding then switch Audio signal too 
               {
                  for(i=1; i<=this.OutputsAudio; i++ )
                  {                     
                     IR.SetVariable("Driver." + this.DeviceName + "." + "Audio Out [" + i + "]",input);
                  } 
               }
            }
            else   // if the number is other than zero then it is for a particular output 
            {
               IR.SetVariable("Driver." + this.DeviceName + "." + "Video Out [" + output + "]",input);
               if(IR.GetVariable("Driver." + this.DeviceName + "." + "BreakAway Setting"))
               {
                  IR.SetVariable("Driver." + this.DeviceName + "." + "Audio Out [" + output + "]",input);
               }  
            }
            break;
            
         case 2:   // Switch Audio            
            if(output == 0) 
            {               
               for(i=1; i<=this.OutputsAudio; i++ )
               {
                  IR.SetVariable("Driver." + this.DeviceName + "." + "Audio Out [" + i + "]",input);
               } 
               
               if(IR.GetVariable("Driver." + this.DeviceName + "." + "BreakAway Setting"))
               {
                  for(i=1; i<=this.OutputsVideo; i++ )
                  {                     
                     IR.SetVariable("Driver." + this.DeviceName + "." + "Video Out [" + i + "]",input);
                  } 
               }
            }
            else
            {
               IR.SetVariable("Driver." + this.DeviceName + "." + "Audio Out [" + output + "]",input);
               if(IR.GetVariable("Driver." + this.DeviceName + "." + "BreakAway Setting"))
               {
                  IR.SetVariable("Driver." + this.DeviceName + "." + "Video Out [" + output + "]",input);
               }  
            } 
            break;  
            
         case 5:   // Switch Video  (auto Request)  
            input  = output;
            output = this.Commands[this.CommandsCur][2]-128;   
            IR.SetVariable("Driver." + this.DeviceName + "." + "Video Out [" + output + "]",input);
            this.RequestStatus();
            break;
         
         case 6:   // Switch Audio   (auto Request) 
            input  = output;
            output = this.Commands[this.CommandsCur][2]-128; 
            IR.SetVariable("Driver." + this.DeviceName + "." + "Audio Out [" + output + "]",input);
            this.RequestStatus();
            break;
            
         case 8:   // BreakAway Setting
            if(input == 0 )  
            {
               if(output == 0 )
               {
                   IR.SetVariable("Driver." + this.DeviceName + "." + "BreakAway Setting",1);
               }
               else if(output == 1 )
               {
                   IR.SetVariable("Driver." + this.DeviceName + "." + "BreakAway Setting",0);
               }
            } 
            this.CommandsCur = 0;        
            break;  
            
         case 11:   // BreakAway Setting    (auto Request)            
            if(input == 0 )    
            {
               if(output == 0 )
               {
                   IR.SetVariable("Driver." + this.DeviceName + "." + "BreakAway Setting",1);
               }
               else if(output == 1 )
               {
                   IR.SetVariable("Driver." + this.DeviceName + "." + "BreakAway Setting",0);
               }
            } 
            this.RequestStatus();
            break;   
         
         case 22:  // Set Audio Gain  !!!!!!!!!!!!!!!!!!!!!!!!  
            output = Math.round(output/1.27);
            if(input == 0) 
            {           
               for(i=1; i<=this.OutputsAudio; i++ )
               {
                  IR.SetVariable("Driver." + this.DeviceName + "." + "Audio Vol Out [" + i + "]",output);
               }
            }
            else
            {
               IR.SetVariable("Driver." + this.DeviceName + "." + "Audio Vol Out [" + input + "]",output);             
            }
            break; 
            
         case 25:   // Set Audio Gain  (auto Request)  
            output = Math.round(output/1.27);
            IR.SetVariable("Driver." + this.DeviceName + "." + "Audio Vol Out [" + input + "]",output);
            this.RequestStatus();
         
         case 30:   // Lock Front Panel
            if(output == 0 )   
            {
               if(input == 0 )
               {
                   IR.SetVariable("Driver." + this.DeviceName + "." + "Lock Front Panel",0);
               }
               else if(input == 1 )
               {
                   IR.SetVariable("Driver." + this.DeviceName + "." + "Lock Front Panel",1);
               }
            } 
            break;
            
         case 31:   // Lock Front Panel   (auto Request)
            if(input == 0 )    
            {
               if(output == 0 )
               {
                   IR.SetVariable("Driver." + this.DeviceName + "." + "Lock Front Panel",0);
               }
               else if(output == 1 )
               {
                   IR.SetVariable("Driver." + this.DeviceName + "." + "Lock Front Panel",1);
               }
            } 
            this.RequestStatus();
            break;     
            
         case 62:   //  ответ на запрос кол-ва выходов            
            if(input == 2)
            {
               input = this.Commands[this.CommandsCur][2]-128;              
               if(input == 1)
               {                                     
                  if(this.OutputsVideoInit)
                  {
                     this.OutputsVideo = output; 
                     // adding commands to the array depending on the number of device outputs 
                     // (i.e. a separate command for requesting each output)     
                     for(i=1; i<=this.OutputsVideo; i++)
                     {
                        this.Commands.push(this.GenCommand(5,0,i,this.MachineNumber));  // for Video 
                     }
                     this.OutputsVideoInit = false;
                  } 
               }
               else if(input == 2)
               {  
                  if(this.OutputsAudioInit)
                  {
                     this.OutputsAudio = output;
                     // adding commands to the array depending on the number of device outputs 
                     // (i.e. a separate command for requesting each output)  
                     for(i=1; i<=this.OutputsAudio; i++ )    
                     {
                        this.Commands.push(this.GenCommand(6,0,i,this.MachineNumber));  // for Audio              
                     }
               
                     // volume status
                     // (this block is filled in last, because if the device does not support commands of changing volume 
                     // it can lead to hanging up of the queue with requests for initial activation)
                     for(i=1; i<=this.OutputsAudio; i++ )    
                     {
                        this.Commands.push(this.GenCommand(25,i,1,this.MachineNumber)); // for Audio volume             
                     }
                     this.OutputsAudioInit = false;
                  }
               }
            } 
            this.RequestStatus();
            break;           
      }    
   }, this);
   
  
   // array which stores command names and their codes for sending to the device 
   // ["name", instruction, input, output]
   this.ChannelData = [
      ["Reset",              0x00,0x80,0x80],
      ["Lock Front Panel",   0x1E,0x81,0x80],
      ["UnLock Front Panel", 0x1E,0x80,0x80],
      ["Audio Follow",       0x08,0x80,0x80],
      ["Audio BreakAway",    0x08,0x80,0x81]      
   ];      
   
   
   // Event: sending the command to the device   
   var THIS = this;
   IR.AddListener(IR.EVENT_CHANNEL_SET, IR.GetDevice(this.DeviceName), function(name, value)
   {
      
      var i, instr=-1, input=-1, output=-1; // variables for command forming (properties)
      
      // searching commands for sending in the dictionary 
      for(i=0;i<THIS.ChannelData.length;i++)   
      {
         if(THIS.ChannelData[i][0] == name)
         {              
            THIS.DEVICE.Send([THIS.ChannelData[i][1],THIS.ChannelData[i][2],THIS.ChannelData[i][3],(THIS.MachineNumber+128)]);
            IR.SetVariable("Drivers."+DeviceName+".Input",null);
            IR.SetVariable("Drivers."+DeviceName+".Output",null);
            return null;             
         }
      }
     
      // search for instruction identifier
      switch(name)
      {
         case "Switch Video":
            instr = 1;
            
            input = IR.GetVariable("Drivers."+DeviceName+".Input");               
            if( input=="off" || input=="Off" || input=="OFF" )
               input = 0;
            else            
               input = parseInt(input, 10);                            
            if( isNaN(input) )
            {
               input = -1;
               IR.Log("Error: incorrect number of input!");               
            }           
              
            output = IR.GetVariable("Drivers."+DeviceName+".Output");
            if( output=="all" || output=="All" ||output=="ALL" )
               output = 0;
            else      
               output = parseInt(output, 10);
            if( isNaN(output) )
            {
               IR.Log("Error: incorrect number of output!");
               output = -1;
            }      
            
            if( input>-1 && output>-1 )
               THIS.DEVICE.Send([instr, input+128,output+128,THIS.MachineNumber+128]);    
            break;
            
         case "Switch Audio":
            instr = 2;
            
            input = IR.GetVariable("Drivers."+DeviceName+".Input");               
            if( input=="off" || input=="Off" || input=="OFF" )
               input = 0;
            else            
               input = parseInt(input, 10);                            
            if( isNaN(input) )
            {
               input = -1;
               IR.Log("Error: incorrect number of input!");               
            }           
              
            output = IR.GetVariable("Drivers."+DeviceName+".Output");
            if( output=="all" || output=="All" ||output=="ALL" )
               output = 0;
            else      
               output = parseInt(output, 10);
            if( isNaN(output) )
            {
               IR.Log("Error: incorrect number of output!");
               output = -1;
            }      
            
            if( input>-1 && output>-1 )
               THIS.DEVICE.Send([instr, input+128,output+128,THIS.MachineNumber+128]);   
            break;
            
         case "Set Volume":
            output = IR.GetVariable("Drivers."+DeviceName+".Output");
            if( output=="all" || output=="All" ||output=="ALL" )
               output = 0;
            else      
               output = parseInt(output, 10);
            if( isNaN(output) )
            {
               IR.Log("Error: incorrect number of output!");
               output = -1;
            } 
            
            input = output;
            output = -1;
            output = Math.round(value*1.27);
            
            if( input>-1 )
               THIS.DEVICE.Send([22, input+128,output+128,THIS.MachineNumber+128]);    
            break;         
      }    

      IR.SetVariable("Drivers."+DeviceName+".Input",null);
      IR.SetVariable("Drivers."+DeviceName+".Output",null);
   });      
}        