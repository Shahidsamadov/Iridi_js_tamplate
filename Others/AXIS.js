function AXIS(device, login, pass, ip, port, id) {
   var that = this;
   this.id = id;
   
   this.regex_realm = /realm=".+?"/;
   this.regex_nonce = /nonce=".+?"/;
   this.regex_qop = /qop=".+?"/;
   this.regex_k = /".+"/;
   
   this.stage = 0;
   
   this.realm;
   this.nonce;
   this.qop;
   this.cnonce = "f6cb4969cb32159f";
   
   ///
   this.device = device;
   this.login = login;
   this.pass = pass;
   this.ip = ip;
   this.port = port;                                                
   this.uri = "/axis-cgi/param.cgi?action=list&group=Properties.PTZ.PTZ";
   ///
   
   this.sendCMD = function(cmd) {
      IR.Log("send cmd:" + cmd);
      IR.Log("id:"+id);
      this.uri = cmd;
      this.sendRequest();
   }
   
   
   this.sendRequest = function() {
      if (this.stage == 0) {
         this.stage = 1;
         IR.GetDevice(this.device).Send(["GET "+this.uri+" HTTP/1.1\r\nHost: "+this.ip+":"+this.port+"\r\n\r\n"]);
      }     
   }
   
   this.sendDigest = function() {
      this.stage = 2;
      var HA1 = md5(this.login+":"+this.realm+":"+this.pass);
      var HA2 = md5("GET:"+this.uri);
      var resp = md5(HA1+":"+this.nonce+":"+"00000001"+":"+this.cnonce+":"+this.qop+":"+HA2);
      var digest = ["GET "+this.uri+" HTTP/1.1\r\nHost: "+this.ip+":"+this.port+"\r\nAuthorization: Digest username=\""+this.login+"\", realm=\""+this.realm+"\", nonce=\""+this.nonce+"\", uri=\""+this.uri+"\", algorithm=MD5, response=\""+resp+"\", qop=auth, nc=00000001, cnonce=\""+this.cnonce+"\"\r\n\r\n"];      
      IR.GetDevice(this.device).Send(digest);
      IR.SetTimeout(2000, function() {that.stage = 0;});
   }
   
   IR.AddListener(IR.EVENT_RECEIVE_TEXT, IR.GetDevice(this.device), function(text) {
      IR.Log(text);
      if (that.stage == 1) {
         that.realm = text.match(that.regex_realm)[0].substring(7,text.match(that.regex_realm)[0].length-1);
         that.nonce = text.match(that.regex_nonce)[0].substring(7,text.match(that.regex_nonce)[0].length-1);
         that.qop = text.match(that.regex_qop)[0].substring(5,text.match(that.regex_qop)[0].length-1);
         that.sendDigest();
      }
   });
}