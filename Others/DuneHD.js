var DuneHDModule = function DuneHDVersion3(m_sDeviceName){
  // 1 получаем ссылку на драйвер
  var m_oDevice = IR.GetDevice(m_sDeviceName);
  // 2 запоминаем путь расположения каналов
  m_sDeviceName = "Drivers." + m_sDeviceName + ".";       
  // 3 нло 
  var l_iDuration;
  var l_iPosition; 
  // 4 кот шредингера  
  var Online = 0;
  // 5 Получаем страницу
  //var Page = IR.GetItem("DuneHD_Background");
  
  // 6 показываем, что идет подключение
  /*IR.AddListener(IR.EVENT_START, 0, function(){
    Page.ShowPopup("DuneHD_Connection");       
  });*/
  
  // ~ действия во времени
  IR.SetInterval(5000, function(){
    // 1 спрашиваем плеер
    m_oDevice.Send(["GET,/cgi-bin/do?cmd=status,"]); 
    // 2 кот шредингера   
    Online -= 1;   
    // 3 если плеер недоступен - предупреждаем и ставим статус оффлайн!           
    if(Online < -3){
         IR.SetVariable(m_sDeviceName + "device_online", 0);   
         //Page.ShowPopup("DuneHD_Offline"); 
    }    
  });

  // ~ посылаем команды со значениями от слайдеров
  /*IR.AddListener(IR.EVENT_CHANNEL_SET, m_oDevice, function(in_sName, in_sValue){
    switch(in_sName){
      case "volume":
      case "position":      
        m_oDevice.Send(["GET,/cgi-bin/do?cmd=set_playback_state&" + in_sName + "=" + in_sValue + ","]);
      break;
    }
  });*/
  
  // ~ плеер нашелся
  IR.AddListener(IR.EVENT_ONLINE, m_oDevice, function(){
      // 1 ставим статус онлайн и убираем предупреждения!
      IR.SetVariable(m_sDeviceName + "device_online", 1);  
      //Page.HidePopup("DuneHD_Connection");
      //Page.HidePopup("DuneHD_Offline"); 
      // 2 кот шредингера
      Online = 0;           
      // 3 если плееер в спящем режиме - предупреждаем, а если уже нет убираем предупреждения!              
      /*if(IR.GetVariable(m_sDeviceName + "player_state") == "standby")
         Page.ShowPopup("DuneHD_Standby");
      else
         Page.HidePopup("DuneHD_Standby");*/
  });
  
  // ~ читаем письмо
  IR.AddListener(IR.EVENT_RECEIVE_TEXT, m_oDevice, function(in_sText){
    // 1 сортируем по полочкам    
    in_sText = new XML(in_sText)
    // 2 нло
    var l_iIndex = 0;
    var l_bNotUndefined = true;   
    // 3 пишем в каналы новые сведения
    while(l_bNotUndefined){
      if(in_sText.command_result["param"][l_iIndex]["@name"] != undefined){
        var l_sNowItemName = in_sText.command_result["param"][l_iIndex]["@name"];
        var l_sNowItemValue = in_sText.command_result["param"][l_iIndex]["@value"];             
        switch(l_sNowItemName){
          case "playback_duration":
          case "playback_position":
            if(l_sNowItemName == playback_duration)
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
      else
        l_bNotUndefined = false;
      l_iIndex++;
    }
    if(l_iPosition != 0 && l_iDuration != 0  && IR.GetVariable(m_sDeviceName + "playback_state") == 'playing') 
      IR.SetVariable(m_sDeviceName + "playback_progress", l_iPosition * 100 / l_iDuration)
    else
      IR.SetVariable(m_sDeviceName + "playback_progress", 0); 
  });
}