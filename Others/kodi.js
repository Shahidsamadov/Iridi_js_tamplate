// Unit: kodi

var position;
var duration;
var speed;
var kodi;
//var statusel = IR.GetItem("Main").GetItem("Status");
var timeline = IR.GetItem("KODI_Remote").GetItem("Timeline");
var timeleft = IR.GetItem("KODI_Remote").GetItem("Timeleft");
var totaltime = IR.GetItem("KODI_Remote").GetItem("Totaltime");

function setpos()
{
    position = this.Value / 100 * duration;
    kodi.Request("Player.Seek", {"playerid" : 1, "value": this.Value});
}

function kodistop()
{
    kodi.Request("Player.Stop", {"playerid": 1});
    speed = 0;
}

   var date = new Date();

   function UpdatePlayer()
   {      
       //IR.Log("update player");
      // Запрашиваем данные о состоянии плеера
      kodi.Request("Player.GetProperties", {"playerid" : 1, properties: ["time", "totaltime", "speed", "position", "repeat", "shuffled"]}, function(response)
      {
         if(response.result)
         {
            var time = response.result.time;
            timeleft.Text = "" + time.hours + ((time.minutes < 10) ? ":0" : ":") + time.minutes + ((time.seconds < 10) ? ":0" : ":") + time.seconds;
            position = time.hours * 3600 + time.minutes * 60 + time.seconds;
            time = response.result.totaltime;
            totaltime.Text = "" + time.hours + ((time.minutes < 10) ? ":0" : ":") + time.minutes + ((time.seconds < 10) ? ":0" : ":") + time.seconds;
            duration = time.hours * 3600 + time.minutes * 60 + time.seconds;
            timeline.Value = position * 100 / duration;
            speed = response.result.speed;   
         }
      });  
   }
   
   
function listen()
{
   kodi  = new KODI();
   
    
   function Notify(response)
   {
      try {     
         if(response.method.indexOf("Player.") >= 0 &&
            response.params.data.player.playerid == 1)
         {
            switch(response.method)
            {
            case "Player.OnPlay":
            case "Player.OnResume":
               //statusel.Value = 1;
               UpdatePlayer();
               break;
            case "Player.OnPause":
            case "Player.OnStop":
               //statusel.Value = 0;
               IR.Log("stop recieved");
               speed = 0;
               //UpdatePlayer();
               break;
            case "Player.OnSeek":
               var time = response.params.data.player.time;
               position = time.hours * 3600 + time.minutes * 60 + time.seconds;
               timeline.Value = position * 100 / duration;
               break;
            case "Player.OnSpeedChanged":
               //speed = response.params.data.player.speed;
               break;
            }
         }
      } catch(error) {}
   }

   function Work()
   {
      if(speed)
      {
         timeline.Show();
         timeleft.Show();
         totaltime.Show();
         UpdatePlayer();
         // Текущая позиция воспроизведения
         //position += speed;
         timeline.Value = position * 100 / duration;    
                        
         date.setTime(position * 1000);
         timeleft.Text = "" + date.getUTCHours() + ((date.getUTCMinutes() < 10) ? ":0" : ":") + date.getUTCMinutes() + ((date.getUTCSeconds() < 10) ? ":0" : ":") + date.getUTCSeconds();           
      }
      else
      {
         timeline.Hide();
         timeleft.Hide();
         totaltime.Hide();
      }
   }
   
   kodi.AddListener(kodi.EVENT_NOTIFY, Notify);
   //IR.AddListener(IR.EVENT_WORK, 0, Work);
   IR.SetInterval (1000, Work);
}

//---------------------------------------------------------
// Объект Kodi
//---------------------------------------------------------
function KODI()
{
   // События
   this.EVENT_ONLINE    = 1;
   this.EVENT_OFFLINE   = 2;
   this.EVENT_NOTIFY    = 3;

    var requestId = 0;
    var requests = [];
   var buffer = "";
   var listeners = [undefined, [], [], []];
    
    var device = IR.GetDevice("Kodi"); //IR.CreateDevice(IR.DEVICE_CUSTOM_TCP, "DeviceXBMC", "127.0.0.1", 9090);
    //device.Disconnect();

    //------------------------------------------------------
    // Событие: Получен ответ от сервера
    //------------------------------------------------------
    IR.AddListener(IR.EVENT_RECEIVE_TEXT, device, function(text)
    { 
        IR.Log("Data received=" + text);
        var start, count, response, callback, pos, open, close;
        
      // Добавляем к тексту в буфере
      buffer += text;
      
        count = 0;
      open = buffer.indexOf('{', pos);
      close = buffer.indexOf('}', pos);
      while(open != close)
      {
         if(open != -1 && (close == -1 || open < close))
         {
            // {
                if(count++ == 0) start = open;
            open = buffer.indexOf('{', open + 1);
         } else
         {
            // }
                if(--count == 0)
                {
                    response = JSON.Parse(buffer.substring(start, close + 1));
                    
                    // Находим нужный callback
                    if(response.id)
                    {
                        callback = requests[response.id];
                        if(callback !== undefined)
                            callback(response);
                    } else
                  FireEvent(this.EVENT_NOTIFY, response);
                    
                    // Удаляем из списка
                    delete requests[response.id];
                }
            close = buffer.indexOf('}', close + 1);
         }
      }
      
      // Если строка получена не полностью сохраняем в буфере
      buffer = (count > 0) ? buffer.substring(start) : "";
    }, this);
    
    //------------------------------------------------------
    // Событие: соединение установлено
    //------------------------------------------------------
    IR.AddListener(IR.EVENT_ONLINE, device, function(text)
    { 
      FireEvent(this.EVENT_ONLINE);
    }, this);

    //------------------------------------------------------
    // Событие: соединение потеряно
    //------------------------------------------------------
    IR.AddListener(IR.EVENT_OFFLINE, device, function(text)
    { 
      FireEvent(this.EVENT_OFFLINE);
    }, this);
    
    //------------------------------------------------------
    // Отправка запроса к серверу
    //------------------------------------------------------
    this.Request = function(method, params, callback)
    {
        // Запоминаем callback
        requests[++requestId] = callback;
        
        // Формируем запрос
        var request = {
            "jsonrpc": "2.0",
            "id"        : requestId,
            "method" : method,
            "params" : params
        }
        
        // Отправляем серверу
      IR.Log("Send="+JSON.Stringify(request));
        device.Send([JSON.Stringify(request)]);
    }
   
    //------------------------------------------------------
    // Установка параметров соединения
    //------------------------------------------------------
    this.SetParameters = function(options)
    {
      options = options.split(':');
      device.SetParameters({Host: options[1], Port: options[2]});
   }
   
    //------------------------------------------------------
    // Соединение
    //------------------------------------------------------
    this.Connect = function()
    {
      device.Connect();
   }
 
   //------------------------------------------------------
    // Разрыв соединения
    //------------------------------------------------------
    this.Disconnect = function()
    {
      device.Disconnect();
   }
   
   //------------------------------------------------------
    // Добавление слушателя
    //------------------------------------------------------
    this.AddListener = function(event, callback)
    {
      listeners[event].push(callback);
   }

   //------------------------------------------------------
    // Генерация события для слушателей
    //------------------------------------------------------
    function FireEvent(event, data)
    {
      var callbacks = listeners[event];
      for(var index in callbacks)
         callbacks[index](data);
   }   
   
    
}