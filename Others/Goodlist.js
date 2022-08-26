// Unit: Goodlist

function DarkElement(parent, pos, w, data, glist)
{
    var item = parent.CreateItem(IR.ITEM_POPUP, "List_Element_" + pos, 0, 0, w, 88);
    var button = item.CreateItem(IR.ITEM_BUTTON,"button",0,0,w,88);
    button.GetState(0).Color = 0x000000FF;
    button.GetState(0).TextColor = 0xFFFFFFFF;
    
    button.Text = "Element " + pos + " Data: " + data.one + "," + data.two;
    
    IR.AddListener(IR.EVENT_ITEM_PRESS, item.GetItem("button"), function () {
         button.Text = "EVENT_ITEM_PRESS";
       glist.SetSelected(item);    
      });
     IR.AddListener(IR.EVENT_TOUCH_MOVE, item.GetItem("button"), function (x, y) {
        //tak
         button.Text = "EVENT_TOUCH_MOVE " + x + " " + y;
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
}

function FancyElement(parent, pos, w, data, glist)
{
    var item = parent.CreateItem(IR.ITEM_POPUP, "List_Element_" + pos, 0, 0, w, 88);
    var button = item.CreateItem(IR.ITEM_BUTTON,"button",0,0,w,88);
    button.GetState(0).Color = 0xFFFFFFFF;
    button.GetState(0).TextColor = 0x000000FF;
    
    button.Text = "Element " + pos + " Data: " + data.one + "," + data.two;
    
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
}

function FancyGoodList(x,y,w,h)
{
    var ElementsList = [];
    ElementsList.push({type: "discrete", two: 2});

    var glist = IR.GetItem("Main").CreateItem(IR.ITEM_GOOD_LIST, "goodlist", x, y, w, h);
    glist.SelectMode = 0;
    glist.Adapter = {
       total: ElementsList.length,
        GetCount : function () {
            return this.total;
        },
       GetItem : function (pos) {
          if (ElementsList[pos].type == "discrete")
              return FancyElement(IR.GetItem("Main"), pos, w, ElementsList[pos], glist);
          if (ElementsList[pos].type == "dimmer")
              return DarkElement(IR.GetItem("Main"), pos, w, ElementsList[pos], glist);
        },
    
        SetSelected : function (item, selected) {
            //IR.Log(item.Name);
        }
    }
    
    //glist.Adapter.total = 1;

    this.update = function() {
        glist.Adapter.total = ElementsList.length;
        glist.Update()
    };

    this.add = function(data){
        ElementsList.push(data);
        this.update();
        IR.Log("Adding element");
    }

    glist.Update();
}

var myFancyGoodList = new FancyGoodList(0,88,750,1158);
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "dimmer", two: 3});
myFancyGoodList.add({type: "discrete", two: 4});
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "discrete", two: 2});
myFancyGoodList.add({type: "discrete", two: 2});

