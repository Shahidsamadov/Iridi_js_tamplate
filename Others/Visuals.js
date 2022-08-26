// функция пишет в лог
function Log(in_text) { 
   var list = IR.GetItem("LogVisual").GetItem("log_list");
   var text = in_text.toString();
   list.CreateItem(list.ItemsCount, 1, {Text: text});
   if(list.ItemsCount > 4) {
      list.SetPosition(list.ItemsCount-4);
   }
}
function logClean() {
   var list = IR.GetItem("LogVisual").GetItem("log_list");
   list.Clear();   
}
function guiVisualShow() {
   IR.GetItem("Main").GetItem("visuals_list").AddPopup("GUIVisual");
}
function guiVisualHide() {
   IR.GetItem("Main").GetItem("visuals_list").RemovePopup("GUIVisual");   
}
function listVisualShow() {
   IR.GetItem("Main").GetItem("visuals_list").AddPopup("ListVisual");   
}
function listVisualHide() {
   IR.GetItem("Main").GetItem("visuals_list").RemovePopup("ListVisual");   
}