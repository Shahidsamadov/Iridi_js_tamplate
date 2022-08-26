IR.AddListener(IR.EVENT_START,0,function()
{
   var wait_popup = IR.GetItem("Main").CreateItem(IR.ITEM_POPUP, "Wait_Popup", 0, 88, 750, 1158);
   var wait_popup_button = wait_popup.CreateItem(IR.ITEM_BUTTON,"button",0,0,750,1158);
   wait_popup_button.Text = "Please wait";
   
   wait_popup.Show();
   //wait_popup.Hide();

   var glist = IR.GetItem("Main").CreateItem(IR.ITEM_GOOD_LIST, "goodlist", 0, 88, 750, 1158);
   glist.SelectMode = 0;
   
   mydata = [{text: "Loading data"}];
   
   var ajaxDriver = IR.CreateDevice(IR.DEVICE_CUSTOM_HTTP_TCP, "AJAX", {Host: "192.168.88.250", Port: 80,  SSL: false, DisableQueue: false, SendCommandAttempts: 0,	ConnectWaitTimeMax: 3000, ReceiveWaitTimeMax: 5000, UserAgent: ""});

   function navigate_up()
   {
      wait_popup.Show();
      ajaxDriver.SendEx({Type: "GET", Url:  "/YamahaExtendedControl/v1/netusb/setListControl?type=return", cbReceiveText: function(text, code, headers) {
         IR.Log("cbReceiveText "+text);
      }})   
   }
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("Main").GetItem("navigate_up"), function () {
      IR.Log("Navigate up");
      navigate_up();
      something();	
   });
   
   function navigate_element(number)
   {
      wait_popup.Show();       
      ajaxDriver.SendEx({Type: "GET", Url:  "/YamahaExtendedControl/v1/netusb/setListControl?type=select&index=" + number, cbReceiveText: function(text, code, headers) {
         IR.Log("cbReceiveText "+text);
      }})   
   }
   
   function play_element(number)
   {      
      ajaxDriver.SendEx({Type: "GET", Url:  "/YamahaExtendedControl/v1/netusb/setListControl?type=play&index=" + number, cbReceiveText: function(text, code, headers) {
         IR.Log("cbReceiveText "+text);
      }})   
   }
   
   function something()
   {
      mydata = [];
   
      function print_list(list)
      {
         for (var i = 0; i < list.length; i++) {
           IR.Log(list[i].text);
         } 
      }
   
      function recieve_index(index,callback)
      {
         wait_popup_button.Text += ".";
         ajaxDriver.SendEx({Type: "GET", Url:  "/YamahaExtendedControl/v1/netusb/getListInfo?input=net_radio&size=8&index=" + index, cbReceiveText: function(text, code, headers) {
            IR.Log("cbReceiveText "+text);
            var elements = JSON.Parse(text);
            mydata = mydata.concat(elements.list_info)
            if (elements.max_line > index+8)
               recieve_index(index+8,callback);
            else
               callback();   
         }})
      }
      
      recieve_index(0, function() {
         print_list(mydata);
         glist.Adapter.total = mydata.length;
         glist.Update();
         wait_popup_button.Text = "Please wait";
         wait_popup.Hide();
      });   
   }
   
   IR.AddListener(IR.EVENT_ITEM_RELEASE, IR.GetItem("Main").GetItem("navigate_refresh"), function () {
      IR.Log("Navigate refresh");
      mydata = [];
      something();	
   });
   
   glist.Adapter = {
      total: 1,
   	GetCount : function () {
   		return this.total;
   	},
   
      GetItem : function (pos) {
         var item = IR.GetItem("Main").CreateItem(IR.ITEM_POPUP, "List_Element_" + pos, 0, 0, 750, 88);
         var button = item.CreateItem(IR.ITEM_BUTTON,"button",100,0,650,88);
         button.GetState(0).Color = 0xFFFFFFFF;
         button.GetState(0).TextColor = 0x000000FF;
         var icon = item.CreateItem(IR.ITEM_BUTTON,"icon",0,0,100,88);
         icon.GetState(0).Color = 0xFFFFFFFF;
         icon.GetState(0).TextColor = 0x000000FF;
   
         //button.Text = "Element " + pos;
         button.Text = mydata[pos].text;
         icon.GetState(0).Image = mydata[pos].thumbnail;
         icon.GetState(0).ImageStretch = 1;
   
         IR.AddListener(IR.EVENT_ITEM_PRESS, item.GetItem("button"), function () {
   		   //button.Text = "EVENT_ITEM_PRESS";
            glist.SetSelected(item);	
   		});
      	IR.AddListener(IR.EVENT_TOUCH_MOVE, item.GetItem("button"), function () {
   		   //button.Text = "EVENT_TOUCH_MOVE";
            glist.SetSelected(item);	
   		});
         IR.AddListener(IR.EVENT_MOUSE_MOVE, item.GetItem("button"), function () {
   		   //button.Text = "EVENT_MOUSE_MOVE";
            glist.SetSelected(item);	
   		});
   		IR.AddListener(IR.EVENT_ITEM_RELEASE, item.GetItem("button"), function () {
   		   //button.Text = "EVENT_ITEM_RELEASE";
            glist.SetSelected(item);
            IR.Log(item.Name);
            IR.Log("position " + pos);
            
            if (mydata[pos].attribute & 2)
            {
               IR.Log("element select");
               navigate_element(pos);
               something();
               wait_popup.Show();
            }
            else if (mydata[pos].attribute & 4)
            {
               IR.Log("element play");
               play_element(pos);
            }	
   		});
         return item;
   	},
   
   	SetSelected : function (item, selected) {
   		//IR.Log(item.Name);
   	}
   }

   IR.Log("project start");
   //mydata = [];
   something();
;
   
});

IR.AddListener(IR.EVENT_EXIT,0,function()
{

});

