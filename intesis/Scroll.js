/*
 Savant Effect для Static List

 wizard:
 config:
 {
 list - link to list type graphical element
 popups - array of popup names
 movedItem - name of the item which moves with the effect
 }
 */
function SavantEffect(in_list, in_movedItem) {
	// popup array
	this.items = [];
	// elements for effects array
	this.movedItems = [];
	// popups and list
	this.list = in_list;
	this.movedItem = in_movedItem;
	this.listenerAdd = false;
}

// Effect for move list
SavantEffect.prototype.move = function (){
	// limits
	if(this.items[0].X <= 0 && this.items[this.items.length - 1].X >= 0){
		// first
		this.movedItems[0].X = (this.items[0].Width - this.items[1].X) / 2;
		// others
		for(var i = 1, popupsLength = this.items.length; i < popupsLength; i++){
			this.movedItems[i].X = -this.items[i - 1].Width / 2 + (this.items[i - 1].Width - this.items[i].X) / 2;
		}
	}
};


// Effect for move list
SavantEffect.prototype.add = function (in_item){
	if(in_item && in_item.GetItem(this.movedItem)){
		this.items.push(in_item);
		this.list.AddPopup(in_item.Name);
		this.movedItems.push(in_item.GetItem(this.movedItem));
		if(this.list.ItemsCount > 1 && !this.listenerAdd){
			IR.AddListener(IR.EVENT_WORK, 0, this.move, this);
			this.listenerAdd = true;
		}
	}
};

// Effect for move list
SavantEffect.prototype.clear = function (){
	IR.RemoveListener(IR.EVENT_WORK, 0, this.move);
	this.items = [];
	this.movedItems = [];
   this.list.SetPosition(0);
	this.list.Clear();
	this.listenerAdd = false;
};


// Effect for move list
SavantEffect.prototype.remove = function (in_PopupName){
	if(in_PopupName){
		var posPopup = -1;
		for(var i = 0; i < this.items.length; i++){
			if(this.items[i].Name == in_PopupName)
			{
				posPopup = i;
				break;
			}
		}
		if(posPopup != -1)
		{
			this.items.splice(posPopup, 1);
			this.movedItems.splice(posPopup, 1);
		}

		this.list.RemovePopup(in_PopupName);

		if(this.list.ItemsCount < 2)
      {
         IR.RemoveListener(IR.EVENT_WORK, 0, this.move, this); 
         this.listenerAdd = false;  
      }
			
	}
};