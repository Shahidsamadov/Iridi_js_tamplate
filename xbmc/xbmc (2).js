//---------------------------------------------------------
// Объект XBMC
//---------------------------------------------------------
function XBMC()
{
   // События
   this.EVENT_ONLINE    = 1;
   this.EVENT_OFFLINE   = 2;
   this.EVENT_NOTIFY    = 3;

    var requestId = 0;
    var requests = [];
   var buffer = "";
   var listeners = [undefined, [], [], []];
    
    var device = IR.CreateDevice(IR.DEVICE_CUSTOM_TCP, "DeviceXBMC", "127.0.0.1", 9091);
    device.Disconnect();

    //------------------------------------------------------
    // Событие: Получен ответ от сервера
    //------------------------------------------------------
    IR.AddListener(IR.EVENT_RECEIVE_TEXT, device, function(text)
    { 
        //IR.Log("Data received=" + text);
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
      //IR.Log("Send="+JSON.Stringify(request));
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