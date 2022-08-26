var created_list;
var elements = [{
		Text : "Элемент 0",
		Value : 0
	}];

function listCreate() {
	if (created_list) {
		Log("Лист уже создан");
	} else {
		created_list = IR.GetPopup("ListVisual").CreateItem(IR.ITEM_GOOD_LIST, "created_test_list", 61, 0, 630, 250);
		created_list.SelectMode = 0;
		created_list.Adapter = {
			GetCount : function () {
				return elements.length;
			},
			GetItem : function (pos) {
				var item = IR.GetPopup("list_template").Clone("item" + pos);
				var data = elements[pos];

				if (data) {
					item.GetItem("text").Text = data.Text;
					item.GetItem("check").Value = data.Value;

					IR.AddListener(IR.EVENT_ITEM_RELEASE, item.GetItem("check"), function () {
						var value = item.GetItem("check").Value;
						elements[pos].Value = value;
					});

					IR.AddListener(IR.EVENT_ITEM_RELEASE, item.GetItem("text"), function () {
						created_list.SetSelected(item);
					}, item);
					return item;
				}
			},

			SetSelected : function (item, selected) {
				IR.Log(item.Name + " sel " + selected);
				if (selected) {
					item.GetState(0).FillColor = 0xC0C0C0FF;
				} else {
					item.GetState(0).FillColor = 0xFFFFFFFF;
				}
			}
		}
	}
}

function listCreateItem() {
   var number = IR.GetVariable("Global.list_item_add_num");
   
   for(var i = 0; i < number; i++) {
      elements.push({
		   Text : "Элемент " + elements.length,
		   Value : 0
	   });
   }
	if (created_list) {
		created_list.Update();
	}
}

function listDeleteItem() {
	elements.pop();
	if (created_list) {
		created_list.Update();
	}
}

function listClear() {
	elements = [];
	if (created_list) {
		created_list.Update();
	}
}

function listSetPosition() {
	if (created_list) {
		created_list.Position = 0;
	} else {
		Log("Сначала создайте лист");
	}
}

function listDirectionChange() {
	if (created_list) {
		if (created_list.Direction == 1) {
			created_list.Direction = 0;
         created_list.Update();
		} else {
			created_list.Direction = 1;
         created_list.Update();
		}
	} else {
		Log("Сначала создайте лист");
	}
}

function listSelectMode() {
   var mode = IR.GetVariable("Global.list_mode");
   if(created_list) {
      created_list.SelectMode = mode;
      created_list.Update();
	} else {
		Log("Сначала создайте лист");
	}   
}
