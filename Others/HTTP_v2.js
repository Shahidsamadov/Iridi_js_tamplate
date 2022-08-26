var Device = IR.GetDevice("HTTP");

function print_object(a)
{
   var text = "";
   for(var p in a) {
      text += (p + ": "+a[p] + "\n");
   }
   return text;      
}
function get() {
IR.Log("Send package from GET")
   Device.SendEx(
   {
         Type: "GET",
         Url: "/xampp/",
         Headers: { 
                  "Accept": "application/xml;",
                  "Accept-Language": "de,en-us;q=0.7,en;q=0.3",
                  "User-Agent" :  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"
               },
        //  cbReceiveData: function(data, code, headers) { IR.Log("Получение данных в формате Data: \n Code ответа от сервера: " + code + "\n Данные: "+ data); },
          cbReceiveText: function(text, code, headers) {IR.Log("Getting data in format of Text: \n Code receive from server: " +code + "\n Data: " +  text + "\n Header: " + headers);},
          cbReceiveKey: function(key, value) {IR.Log("Header : "+ key + "\n Header value: "+ value);},
          cbReceiveCode: function(code) {IR.Log("Code receive from server: "+code);},
          cbReceiveStartBody: function() {},
          cbReceivePartBody: function(stream) {IR.Log("Getting data in format of ByteStream(Object): "+stream);},
          cbReceiveEndBody: function(size) {IR.Log("Size stream (Stream): "+size);} ,
          cbTimeOut: function() {IR.Log("cbTimeOut: TimeOut")},
          cbReceiveStream: function(stream, code, headers) { IR.Log("Getting data in format of ByteStream: \n Code receive from server: " +code + "\n Object data: " +  stream); }
   })
};
function post() {
IR.Log("Send package from POST")
 Device.SendEx(
   {
         Type: "POST",
         Url: "/xampp/",
         Data: ["<xml></xml>"],
         Headers: { 
                  "Accept": "application/xml;",
                  "Accept-Language": "de,en-us;q=0.7,en;q=0.3",
                  "User-Agent" :  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"
               },
          cbReceiveData: function(data, code, headers) { IR.Log("Getting data in format Data: \n Code receive from server: " + code + "\n Data: "+ data); },
          cbReceiveText: function(text, code, headers) {IR.Log("Getting data in format Text: \n Code receive from server: " +code + "\n Data: " +  text + "\n Header: " + headers);},
          cbReceiveKey: function(key, value) {IR.Log("Header : "+ key + "\n Value Header: "+ value);},
          cbReceiveCode: function(code) {IR.Log("Code ответа от сервера: "+code);},
          cbReceiveStartBody: function() {},
          cbReceivePartBody: function(stream) {IR.Log("Getting data in format ByteStream(Object Stream): "+stream);},
          cbReceiveEndBody: function(size) {IR.Log("Size stream (Stream): "+size);} ,
          cbTimeOut: function() {IR.Log("cbTimeOut: TimeOut")},
          cbReceiveStream: function(stream, code, headers) { IR.Log("Getting data in format ByteStream: \n Code receive from server: " +code + "\n Object data: " +  stream); }
   });
}
function put() {
IR.Log("Send package from PUT")
 Device.SendEx(
   {
         Type: "PUT",
         Url: "/xampp/",
         Data: ["<xml></xml>"],
         Headers: { 
                  "Accept": "application/xml;",
                  "Accept-Language": "de,en-us;q=0.7,en;q=0.3",
                  "User-Agent" :  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"
               },
          cbReceiveData: function(data, code, headers) { IR.Log("Getting data in format of Data: \n Code receive from server: " + code + "\n Data: "+ data); },
          cbReceiveText: function(text, code, headers) {IR.Log("Getting data in format of Text: \n Code receive from server: " +code + "\n Data: " +  text + "\n Header: " + headers);},
          cbReceiveKey: function(key, value) {IR.Log("Header : "+ key + "\n Value Header: "+ value);},
          cbReceiveCode: function(code) {IR.Log("Code receive from server: "+code);},
          cbReceiveStartBody: function() {},
          cbReceivePartBody: function(stream) {IR.Log("Getting data in format of ByteStream(Object Stream): "+stream);},
          cbReceiveEndBody: function(size) {IR.Log("Size stream  (Stream): "+size);} ,
          cbTimeOut: function() {IR.Log("cbTimeOut: TimeOut")},
          cbReceiveStream: function(stream, code, headers) { IR.Log("Getting data in format of ByteStream: \n Code receive from server: " +code + "\n Object data: " +  stream); }
   })
}
function cookie(){

   Device.SetCookie("BITRIX_SM_GUEST_ID", "379750");
   Device.SetCookie("BITRIX_SM_LAST_VISIT", "29.05.2015+09%3A57%3A07");
   Device.SetCookie("PHPSESSID", "3944fb2527b128bf34ec98a430b295d1");
};   

function noURL(){
  Device.SendEx(
  {
         Type: "GET",
         Url: "",
         Headers: { 
                  "Accept": "application/xml;",
                  "Accept-Language": "de,en-us;q=0.7,en;q=0.3",
                  "User-Agent" :  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"
               },
          cbReceiveData: function(data, code, headers) { IR.Log("Getting data in format of Data: \n Code receive from server: " + code + "\n Data: "+ data); },
          cbReceiveText: function(text, code, headers) {IR.Log("Getting data in format of Text: \n Code receive from server: " +code + "\n Data: " +  text + "\n Header: " + headers);},
          cbReceiveKey: function(key, value) {IR.Log("Header : "+ key + "\n Value Header: "+ value);},
          cbReceiveCode: function(code) {IR.Log("Code receive from server: "+code);},
          cbReceiveStartBody: function() {},
          cbReceivePartBody: function(stream) {IR.Log("Getting data in format of ByteStream(Object Stream): "+stream);},
          cbReceiveEndBody: function(size) {IR.Log("Size stream (Stream)): "+size);} ,
          cbTimeOut: function() {IR.Log("cbTimeOut: TimeOut")},
          cbReceiveStream: function(stream, code, headers) { IR.Log("Getting data in format of ByteStream: \n Code receive from server: " +code + "\n Object data: " +  stream); }
   })
}
function incorrectURL(){
  Device.SendEx(
  {
         Type: "GET",
         Url: "/xampp1/",
         Headers: { 
                  "Accept": "application/xml;",
                  "Accept-Language": "de,en-us;q=0.7,en;q=0.3",
                  "User-Agent" :  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"
               },
          cbReceiveData: function(data, code, headers) { IR.Log("Getting data in format of Data: \n Code receive from server: " + code + "\n Data: "+ data); },
          cbReceiveText: function(text, code, headers) {IR.Log("Getting data in format of Text: \n Code receive from server: " +code + "\n Data: " +  text + "\n Header: " + headers);},
          cbReceiveKey: function(key, value) {IR.Log("Header : "+ key + "\n Value Header: "+ value);},
          cbReceiveCode: function(code) {IR.Log("Code receive from server: "+code);},
          cbReceiveStartBody: function() {},
          cbReceivePartBody: function(stream) {IR.Log("Getting data in format of ByteStream(Object Stream): "+stream);},
          cbReceiveEndBody: function(size) {IR.Log("Size stream (Stream): "+size);} ,
          cbTimeOut: function() {IR.Log("cbTimeOut: TimeOut")},
          cbReceiveStream: function(stream, code, headers) { IR.Log("Getting data in format of ByteStream: \n Code receive from server: " +code + "\n Object data: " +  stream); }
   })
}
function URL() {
IR.Log("Send package from GET")
   Device.SendEx(
   {
         Type: "GET",
         Url: "/xampp/",
         Headers: { 
                  "Accept": "application/xml;",
                  "Accept-Language": "de,en-us;q=0.7,en;q=0.3",
                  "User-Agent" :  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"
               },
          cbReceiveData: function(data, code, headers) { IR.Log("Getting data in format of Data: \n Code receive from server: " + code + "\n Data: "+ data); },
          cbReceiveText: function(text, code, headers) {IR.Log("Getting data in format of Text: \n Code receive from server: " +code + "\n Data: " +  text + "\n Header: " + headers);},
          cbReceiveKey: function(key, value) {IR.Log("Header : "+ key + "\n Value Header: "+ value);},
          cbReceiveCode: function(code) {IR.Log("Code receive from server: "+code);},
          cbReceiveStartBody: function() {},
          cbReceivePartBody: function(stream) {IR.Log("Getting data in format of ByteStream(Object Stream): "+stream);},
          cbReceiveEndBody: function(size) {IR.Log("Size stream (Stream): "+size);} ,
          cbTimeOut: function() {IR.Log("cbTimeOut: TimeOut")},
          cbReceiveStream: function(stream, code, headers) { IR.Log("Getting data in format of ByteStream: \n Code receive from server: " +code + "\n Object data: " +  stream); }
   })
};
function nossl(){
IR.Log("SSL MODE OFF PORT = 80")
Device.SetParameters({                     
        Host: "192.168.0.71",
        Port: "80",
        SSL: "0",
        Login: "",
        Password: "",
        BackgroundMode: "1",
        ScriptMode: "1"
   });
};
function ssl(){
IR.Log("SSL MODE ON PORT = 443")
Device.SetParameters({
                      
        Host: "192.168.0.71",
        Port: "443",
        SSL: "1",
        Login: "",
        Password: "",
        BackgroundMode: "1",
        ScriptMode: "1"
   });
};  
function getcookie(){
IR.GetItem("Page 1").GetItem("Cookie").Text = print_object(Device.GetCookies());
}
function nohost(){
 Device.SetParameters({
                      
        Host: "192.168.0.72",
        Port: "80",
        SSL: "0",
        Login: "",
        Password: "",
        BackgroundMode: "1",
        ScriptMode: "1"
   });
}
function host(){
 Device.SetParameters({
                      
        Host: "192.168.0.71",
        Port: "80",
        SSL: "0",
        Login: "",
        Password: "",
        BackgroundMode: "1",
        ScriptMode: "1"
   });
}


function connect(){
 Device.Connect();
}
function disconnect(){
 Device.Disconnect();
}

function hostforredirect(){
  Device.SetParameters({                     
        Host: "rik.in",
        Port: "80",
        SSL: "0",
        Login: "",
        Password: "",
        BackgroundMode: "1",
        ScriptMode: "1"
   });
}
function hostredirect(){
  Device.SetParameters({                     
        Host: "192.168.0.71",
        Port: "80",
        SSL: "0",
        Login: "",
        Password: "",
        BackgroundMode: "1",
        ScriptMode: "1"
   });
}
IR.AddListener(IR.EVENT_ONLINE, Device, function ()
{
 IR.Log(Device.Name + " I'm ONLINE :) ")
})
IR.AddListener(IR.EVENT_OFFLINE, Device, function ()
{
  IR.Log(Device.Name + " I'm OFFLINE :( ")
})
IR.AddListener(IR.EVENT_RECEIVE_TEXT, Device, function (text)
{
  IR.Log("IR.EVENT_RECEIVE_TEXT= "+ text)
})
IR.AddListener(IR.EVENT_RECEIVE_DATA, Device, function (data)
{
  IR.Log("IR.EVENT_RECEIVE_DATA = "+ data)
})