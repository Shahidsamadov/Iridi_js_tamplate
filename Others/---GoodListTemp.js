/*
var glist = IR.GetItem("Main").CreateItem(IR.ITEM_GOOD_LIST, "goodlist", 0, 88, 1080, 1920-88);
glist.SelectMode = 0;

glist.Adapter = {
	GetCount : function () {
		return 100;
	},

   GetItem : function (pos) {
		var item = IR.GetItem("list_element").Clone("" + pos);

		item.GetItem("btn").Text = "Element " + pos;

      IR.AddListener(IR.EVENT_ITEM_PRESS, item.GetItem("button"), function () {
		   item.GetItem("button").Text = "EVENT_ITEM_PRESS";
         glist.SetSelected(item);	
		});
   	IR.AddListener(IR.EVENT_TOUCH_MOVE, item.GetItem("button"), function () {
		   item.GetItem("button").Text = "EVENT_TOUCH_MOVE";
         glist.SetSelected(item);	
		});
      IR.AddListener(IR.EVENT_MOUSE_MOVE, item.GetItem("button"), function () {
		   item.GetItem("button").Text = "EVENT_MOUSE_MOVE";
         glist.SetSelected(item);	
		});
		IR.AddListener(IR.EVENT_ITEM_RELEASE, item.GetItem("button"), function () {
		   item.GetItem("button").Text = "EVENT_ITEM_RELEASE";
         glist.SetSelected(item);	
		});
      return item;
	},

	SetSelected : function (item, selected) {
		//IR.Log(item.Name);
	}
}
*/