/**
 * Change big text
 * @param in_oField
 * @returns {string|*}
 */
var textReduce = function (in_oField) {
	if (in_oField) {
		if (in_oField.GetState(0).TextWidth > in_oField.Width) {
			var l_nTextLength = in_oField.Text.length;
			var l_sText = in_oField.Text;
			var l_nDifferent = (in_oField.Width / (in_oField.GetState(0).TextWidth)) * l_nTextLength;
			var l_sAnotherText = l_sText.slice(0, l_nDifferent - 3);
			in_oField.Text = l_sAnotherText + "...";
		}
		return in_oField.Text;
	}
};

/**
 * scanner window
 * @param in_sName
 * @param in_sBackLabel
 * @param in_fHideAction
 * @param in_sAddLabel
 * @param in_fAddFunction
 * @param in_sButtonName
 * @param in_fButtonFunction
 * @constructor
 */
this.Selector = function (in_sName, in_sBackLabel, in_fHideAction, in_sAddLabel, in_fAddFunction, in_sButtonName, in_fButtonFunction, in_ButtonContext) {
	var that = this;

	/**
	 * change name
	 * @param in_sName
	 */
	this.setName = function (in_sName) {
		if (in_sName)
			this.Window.GetItem("name").Text = in_sName;
		textReduce(this.Window.GetItem("name"));
	};

	this.Window = IR.GetPopup("Selector");;
	this.setName(in_sName);
	this.list = this.Window.GetItem("list");
	this.background = this.Window.GetItem("background");
	this.background.GetState(0).Border = 0;
	this.backgroundDefHeight = this.background.Height;
	this.BackButton = this.Window.GetItem("cancelCaption");
	this.add = this.Window.GetItem("add");
	this.button = this.Window.GetItem("button");
	this.button.GetState(0).FontId = IR.CreateFont("iR_Default_Normal.ttf", 27);
	this.loading = this.Window.GetItem("loading");
	this.buttonDefY = this.button.Y;
	this.loadingDefY = this.loading.Y;
	this.separatorButton_1 = this.Window.GetItem("separatorHalfButton");
	this.separatorButton_1DefY = this.separatorButton_1.Y;
	this.separatorButton_2 = this.Window.GetItem("separatorButton");
	this.separatorButton_2DefY = this.separatorButton_2.Y;

	this.Show = function () {
		IR.ShowPopup(that.Window.Name);
	};
	this.Hide = function () {
		this.list.Clear();
		IR.HidePopup(that.Window.Name);
		this.background.Height = this.backgroundDefHeight;
		if (in_sButtonName) {
			this.button.Y = this.buttonDefY;
			this.loading.Y = this.loadingDefY;
			this.separatorButton_1.Y = this.separatorButton_1DefY;
			this.separatorButton_2.Y = this.separatorButton_2DefY;
		}
	};
	this.HideWithAction = function () {
		in_fHideAction();
		this.Hide()
	};
	if (in_sAddLabel)
		this.add.Text = in_sAddLabel;

	if (in_fAddFunction && typeof in_fAddFunction == "function") {
		IR.AddListener(IR.EVENT_ITEM_RELEASE, this.add, in_fAddFunction, this);
	}

	if (in_sButtonName && in_fButtonFunction) {
		this.button.Text = in_sButtonName;
		this.button.Visible = this.button.Enable = true;
		this.loading.Visible = false;
		this.separatorButton_1.Visible = false;
		this.separatorButton_2.Visible = false;
		this.button.Y = this.button.Y - this.separatorButton_1.Height - this.separatorButton_2.Height;
		textReduce(this.Window.GetItem("button"));
		if(in_ButtonContext)
         IR.AddListener(IR.EVENT_ITEM_RELEASE, this.button, in_fButtonFunction, {selector: this, context: in_ButtonContext});        
		else
			IR.AddListener(IR.EVENT_ITEM_RELEASE, this.button, in_fButtonFunction, this);
	}
	else {
		this.button.Visible = this.button.Enable = false;
		this.separatorButton_1.Visible = false;
		this.separatorButton_2.Visible = false;
		this.loading.Visible = false;
	}
	if (in_fHideAction) {
		IR.AddListener(IR.EVENT_ITEM_RELEASE, this.BackButton, this.HideWithAction, this);
	} else {
		IR.AddListener(IR.EVENT_ITEM_RELEASE, this.BackButton, this.Hide, this);
	}

	this.addSelectorItem = function (in_sName, in_sIP, in_sTemplate, in_fAction, in_space, in_bLast) {
		var templateHeight = IR.GetPopup(in_sTemplate).Height + 1;
		var item = this.list.AddItem(in_sTemplate, {
			Name: {
				Text: in_sName
			},
         IP: {
				Text: in_sIP
			}
		});
		textReduce(item.Popup.GetItem("Name"));
		if (in_fAction)
			item.SetReleaseAction(in_fAction, in_space);
		if (in_bLast) {
			item.Popup.GetItem("Separator").Visible = false;
		}
		if (this.list.ItemsCount < 6) {
			this.background.Height = this.background.Height + templateHeight;
			this.list.ScrollEnabled = false;
			if (in_sButtonName) {
				this.separatorButton_1.Y = (this.separatorButton_1.Y + templateHeight) - 1;
				this.separatorButton_2.Y = this.separatorButton_1.Y + 1;
				this.button.Y = this.separatorButton_2.Y + 1;
				this.loading.Y = this.button.Y + 1;
				this.separatorButton_1.Visible = true;
				this.separatorButton_2.Visible = true;
			}
		} else {
			this.list.ScrollEnabled = true;
		}
		if (this.list.ItemsCount == 6) {
			this.background.Height = this.background.Height + templateHeight / 2;
			if (in_sButtonName) {
				this.separatorButton_1.Y = (this.separatorButton_1.Y + templateHeight / 2) - 1;
				this.separatorButton_2.Y = this.separatorButton_1.Y + 1;
				this.button.Y = this.separatorButton_2.Y + 1;
				this.loading.Y = this.button.Y + 1;
				this.separatorButton_1.Visible = true;
				this.separatorButton_2.Visible = true;
			}
		}
		return item;
	};
};

