var glist = IR.GetItem("Main").CreateItem(IR.ITEM_GOOD_LIST, "goodlist", 0, 88, 750, 900);
glist.SelectMode = 0;

glist.Adapter = {
   total: 5,
    GetCount : function () {
        return this.total;
    },

   GetItem : function (pos) {
      var item = IR.GetItem("Main").CreateItem(IR.ITEM_POPUP, "List_Element_" + pos, 0, 0, 750, 88);
      var button = item.CreateItem(IR.ITEM_BUTTON,"button",0,0,750,88);
      button.GetState(0).Color = 0xFFFFFFFF;
      button.GetState(0).TextColor = 0x000000FF;

      button.Text = "Element " + pos;

      IR.AddListener(IR.EVENT_ITEM_PRESS, item.GetItem("button"), function () {
           button.Text = "EVENT_ITEM_PRESS";
         glist.SetSelected(item);    
        });
       IR.AddListener(IR.EVENT_TOUCH_MOVE, item.GetItem("button"), function () {
           button.Text = "EVENT_TOUCH_MOVE";
         glist.SetSelected(item);    
        });
      IR.AddListener(IR.EVENT_MOUSE_MOVE, item.GetItem("button"), function () {
           button.Text = "EVENT_MOUSE_MOVE";
         glist.SetSelected(item);    
        });
        IR.AddListener(IR.EVENT_ITEM_RELEASE, item.GetItem("button"), function () {
           button.Text = "EVENT_ITEM_RELEASE";
         glist.SetSelected(item);
         IR.Log(item.Name);    
        });
      return item;
    },

    SetSelected : function (item, selected) {
        //IR.Log(item.Name);
    }
}

glist.Adapter.total = 10;
glist.Update();

IR.Log("i: " + glist.Adapter.GetItem(0).GetItem("button").Text)
var element = glist.Adapter.GetItem(0).GetItem("button");
element.Text = "AAAA";
IR.Log("i: " + element.Text)