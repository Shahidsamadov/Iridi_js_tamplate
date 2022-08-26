//---------------------------------------------------------
// Объект Remote
//---------------------------------------------------------
function Remote(gui)
{
   var speeds = [0, 0, 0];
   var active = 0;
   
   var volume;
   var percent;
   var mute;
      
   // Конструктор
   Init();
  
   //---------------------------------------------------------
   // Начальная инициализация
   //---------------------------------------------------------
   function Init()
   {
      var popup = IR.GetPopup(gui.remote);
      IR.AddListener(IR.EVENT_ITEM_SHOW, popup, function()
      {
         UpdateVolume();
      });      
      
      // Кнопки пульта
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteLeft), function()
      {
         xbmc.Request("Input.Left");
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteRight), function()
      {
         xbmc.Request("Input.Right");
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteUp), function()
      {
         xbmc.Request("Input.Up");
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteDown), function()
      {
         xbmc.Request("Input.Down");
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteOk), function()
      {
         xbmc.Request("Input.Select");
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteBack), function()
      {
         xbmc.Request("Input.Back");
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteHome), function()
      {
         xbmc.Request("Input.Home");
      });      
       
      // Кнопка Play
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remotePlay), function()
      {
         if(speeds[active] == 0) xbmc.Request("Player.PlayPause", {playerid: active});
      });
      // Кнопка Pause
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remotePause), function()
      {
         if(speeds[active] != 0) xbmc.Request("Player.PlayPause", {playerid: active});
      });
      // Кнопка Stop
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteStop), function()
      {
         xbmc.Request("Player.Stop", {playerid: active});
      });
      // Кнопка Next
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteNext), function()
      {
         xbmc.Request("Player.GoTo", {playerid : active, to: "next"});  
      });
      // Кнопка Previous
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remotePrev), function()
      {
         xbmc.Request("Player.GoTo", {playerid : active, to: "previous"});                  
      });
      // Кнопка Fast
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteFast), function()
      {
         xbmc.Request("Player.SetSpeed", {playerid: active, speed: "increment"});
      });
      // Кнопка Slow
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteSlow), function()
      {
         xbmc.Request("Player.SetSpeed", {playerid: active, speed: "decrement"});
      });
      // Кнопка Off
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteOff), function()
      {
         xbmc.Request("Application.Quit");
      });
    
      // Уровень громкости звука
      percent = GetItem(gui.remotePercent);
      volume = GetItem(gui.remoteVolume);
      IR.AddListener(IR.EVENT_ITEM_RELEASE, volume, function()
      {
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remotePlus), function()
      {
         volume.Value += 5;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      IR.AddListener(IR.EVENT_ITEM_HOLD, GetItem(gui.remotePlus), function()
      {
         volume.Value += 3;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      IR.AddListener(IR.EVENT_ITEM_PRESS, GetItem(gui.remoteMinus), function()
      {
         volume.Value -= 5;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });	
      IR.AddListener(IR.EVENT_ITEM_HOLD, GetItem(gui.remoteMinus), function()
      {
         volume.Value -= 3;
         percent.Text = volume.Value + '%';         
         xbmc.Request("Application.SetVolume", {"volume": volume.Value});
      });
      mute = GetItem(gui.remoteMute);
      IR.AddListener(IR.EVENT_ITEM_PRESS, mute, function()
      {
         xbmc.Request("Application.SetMute", {mute: "toggle"});
         UpdateVolume();
      });
      
      var stream = GetItem(gui.remoteStream);
      IR.AddListener(IR.EVENT_ITEM_PRESS, stream, function()
      {
         debug('Press remoteStream');
      });
      
      var subtitle = GetItem(gui.remoteSubtitle);
      IR.AddListener(IR.EVENT_ITEM_PRESS, subtitle, function()
      {
         debug('Press remoteSubtitle');
         xbmc.Request("Player.SetSubtitle", {"playerid" : 0, "subtitle": 1, "enable": True});
      });
      
      // Обработка cобытий
      xbmc.AddListener(xbmc.EVENT_NOTIFY, Notify);
      xbmc.AddListener(xbmc.EVENT_ONLINE, Online);
   }

   //---------------------------------------------------------
   // Обновить громкость звука
   //---------------------------------------------------------
   function UpdateVolume()
   {
      // Запрашиваем данные
      xbmc.Request("Application.GetProperties", {properties: ["volume", "muted"]}, function(response)
      {
         percent.Text = response.result.volume + '%';
         volume.Value = response.result.volume;
         mute.Value =  response.result.muted ^ 1;
      });  
   }
   
   //---------------------------------------------------------
   // Уведомления о событиях
   //---------------------------------------------------------
   function Notify(response)
   {
      try {
         if(response.method.indexOf("Player.") >= 0)
         {
            active = response.params.data.player.playerid;
            
            switch(response.method)
            {
            case "Player.OnPlay":
            case "Player.OnPause":
               speeds[active] = response.params.data.player.speed;
               break;
            case "Player.OnStop":
               speeds[active] = 0;
               break;
            }
         }
      } catch(error) {}
   }
                                                                
   //---------------------------------------------------------
   // Действия при соединении
   //---------------------------------------------------------
   function Online()
   {
      UpdateVolume();
      xbmc.Request("Player.GetActivePlayers", {}, function(response)
      {
         if(response.result.length)
            active = response.result[0].playerid;
      });      
   }
   
};
