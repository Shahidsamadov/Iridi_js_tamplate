function initGlib(){
	GLib = {};
   GLOBAL_GUI = {};
   GLOBAL_GUI.QuestionBoxPopup = IR.GetPopup("Question");
   GLOBAL_GUI.BlackmaskPopup = IR.GetPopup("Blackmask");

	GLib.QuestionBox = function () {
		var PreviousAction = undefined;
		var CancelAction = undefined;

		var originalHeightText = GLOBAL_GUI.QuestionBoxPopup.GetItem("Text").Height;
		var originalHeightPopup = GLOBAL_GUI.QuestionBoxPopup.Height;
		var originalPopupY = GLOBAL_GUI.QuestionBoxPopup.Y;
		var originalOKY = GLOBAL_GUI.QuestionBoxPopup.GetItem("Ok").Y;
		var originalCancelY = GLOBAL_GUI.QuestionBoxPopup.GetItem("Cancel").Y;
		var originalSeparator1Y = GLOBAL_GUI.QuestionBoxPopup.GetItem("Separator 1").Y;
		var originalSeparator2Y = GLOBAL_GUI.QuestionBoxPopup.GetItem("Separator 2").Y;
		var originalOkInfo1Y = GLOBAL_GUI.QuestionBoxPopup.GetItem("OkInfo").Y;

		function Release() {
			IR.HidePopup(GLOBAL_GUI.QuestionBoxPopup.Name);
			IR.HidePopup(GLOBAL_GUI.BlackmaskPopup.Name);
			GLOBAL_GUI.QuestionBoxPopup.GetItem("Text").Height = originalHeightText;
			GLOBAL_GUI.QuestionBoxPopup.Height = originalHeightPopup;
			GLOBAL_GUI.QuestionBoxPopup.Y = originalPopupY;
			GLOBAL_GUI.QuestionBoxPopup.GetItem("Ok").Y = originalOKY;
			GLOBAL_GUI.QuestionBoxPopup.GetItem("Cancel").Y = originalCancelY;
			GLOBAL_GUI.QuestionBoxPopup.GetItem("Separator 1").Y = originalSeparator1Y;
			GLOBAL_GUI.QuestionBoxPopup.GetItem("Separator 2").Y = originalSeparator2Y;
			GLOBAL_GUI.QuestionBoxPopup.GetItem("OkInfo").Y = originalOkInfo1Y;
		}

		GLOBAL_GUI.QuestionBoxPopup.GetItem("Cancel").Text = "Cancel";

		IR.AddListener(IR.EVENT_ITEM_RELEASE, GLOBAL_GUI.QuestionBoxPopup.GetItem("Cancel"), Release);
		IR.AddListener(IR.EVENT_ITEM_RELEASE, GLOBAL_GUI.QuestionBoxPopup.GetItem("Ok"), Release);
		IR.AddListener(IR.EVENT_ITEM_RELEASE, GLOBAL_GUI.QuestionBoxPopup.GetItem("OkInfo"), Release);

		return {
			Show: function (in_Text, inOk, inCancel, inSelf, inInfo) {
				IR.ShowPopup(GLOBAL_GUI.BlackmaskPopup.Name);
				IR.ShowPopup(GLOBAL_GUI.QuestionBoxPopup.Name);
				GLOBAL_GUI.QuestionBoxPopup.GetItem("Text").Text = in_Text;

				// непонятные цифры: 56 - отступ сверху и снизу (112 соответветственно два отступа), 4 - кончики не влезали и ввел такую вот поправку
				if(GLOBAL_GUI.QuestionBoxPopup.GetItem("Text").GetState(0).TextHeight > GLOBAL_GUI.QuestionBoxPopup.GetItem("Text").Height){
					GLOBAL_GUI.QuestionBoxPopup.GetItem("Text").Height = GLOBAL_GUI.QuestionBoxPopup.GetItem("Text").GetState(0).TextHeight + 4;
					var differentHeightText = GLOBAL_GUI.QuestionBoxPopup.GetItem("Text").Height - originalHeightText;
					GLOBAL_GUI.QuestionBoxPopup.Height = originalHeightPopup + differentHeightText;
					GLOBAL_GUI.QuestionBoxPopup.Y = originalPopupY - differentHeightText;
					GLOBAL_GUI.QuestionBoxPopup.GetItem("Ok").Y = originalOKY + differentHeightText;
					GLOBAL_GUI.QuestionBoxPopup.GetItem("Cancel").Y = originalCancelY + differentHeightText;
					GLOBAL_GUI.QuestionBoxPopup.GetItem("Separator 2").Y = originalSeparator2Y + differentHeightText;
					GLOBAL_GUI.QuestionBoxPopup.GetItem("Separator 1").Y = originalSeparator1Y + differentHeightText;
					GLOBAL_GUI.QuestionBoxPopup.GetItem("OkInfo").Y = originalOkInfo1Y + differentHeightText;
				}

				if (PreviousAction !== undefined)
					IR.RemoveListener(IR.EVENT_ITEM_RELEASE, GLOBAL_GUI.QuestionBoxPopup.GetItem("Ok"), PreviousAction);
				IR.AddListener(IR.EVENT_ITEM_RELEASE, GLOBAL_GUI.QuestionBoxPopup.GetItem("Ok"), inOk, inSelf);
				PreviousAction = inOk;

				if (CancelAction !== undefined)
					IR.RemoveListener(IR.EVENT_ITEM_RELEASE, GLOBAL_GUI.QuestionBoxPopup.GetItem("Cancel"), CancelAction);
				IR.AddListener(IR.EVENT_ITEM_RELEASE, GLOBAL_GUI.QuestionBoxPopup.GetItem("Cancel"), inCancel, inSelf);
				CancelAction = inCancel;
				if(inInfo) {
					GLOBAL_GUI.QuestionBoxPopup.GetItem("Ok").Visible = 0;
					GLOBAL_GUI.QuestionBoxPopup.GetItem("Cancel").Visible = 0;
					GLOBAL_GUI.QuestionBoxPopup.GetItem("Separator 2").Visible = 0;
					GLOBAL_GUI.QuestionBoxPopup.GetItem("OkInfo").Visible = 1;
				} else {
					GLOBAL_GUI.QuestionBoxPopup.GetItem("Ok").Visible = 1;
					GLOBAL_GUI.QuestionBoxPopup.GetItem("Cancel").Visible = 1;
					GLOBAL_GUI.QuestionBoxPopup.GetItem("Separator 2").Visible = 1;
					GLOBAL_GUI.QuestionBoxPopup.GetItem("OkInfo").Visible = 0;
				}
			},
			Hide: Release
		}
	};


	/**
	 * Окно ожидания (другой дизайн в отлицие от стандартного)
	 * @param in_text Текст сообщения
	 * @constructor
	 */
	GLib.WaitingWindow = function (in_Popup, in_label) {
		return function (in_Text) {
			if (!in_Text) {
				IR.HidePopup(in_Popup);
			}
			else {
				in_label.Text = in_Text;
				IR.ShowPopup(in_Popup);
			}
		}
	};
}