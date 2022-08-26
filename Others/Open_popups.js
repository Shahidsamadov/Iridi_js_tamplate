function HidePopups(){
   IR.HideAllPopups("bg");
   IR.SetTimeout(900, Back);
}

function OpenPopups_Office(){     //Office_Weather_2
   IR.ShowPopup("Office_Photo");    //Office_Photo
   //IR.ShowPopup("Office_Weather_2");    
   IR.ShowPopup("Office_Rooms");
   IR.ShowPopup("Office_Date");
   IR.ShowPopup("Office_Scenario");
   IR.SetVariable("Global.Room","Office");    
   IR.Log(IR.GetVariable("Global.Room"));       
}

function OpenPopups_Reception(){
   IR.ShowPopup("Office_R1_Devices");
   IR.ShowPopup("Office_R1_Activites");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev","Office");
   IR.SetVariable("Global.Room","Reception");
   IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo Container").GetState(0).Image;
}


function OpenPopups_Security_Department(){
   IR.ShowPopup("Office_R1_Devices");
   IR.ShowPopup("Office_R2_Activites");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev","Office");
   IR.SetVariable("Global.Room","Security Department");
   IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo Container").GetState(1).Image;
}

function OpenPopups_Archive(){
   IR.ShowPopup("Office_R1_Devices");
   IR.ShowPopup("Office_R3_Activites");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev","Office");
   IR.SetVariable("Global.Room","Archive");
   IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo Container").GetState(2).Image;
}

function OpenPopups_IT_Department(){
   IR.ShowPopup("Office_R1_Devices");
   IR.ShowPopup("Office_R3_Activites");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev","Office");
   IR.SetVariable("Global.Room","IT Department");
   IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo Container").GetState(3).Image;
}

function OpenPopups_Personnel_Department(){
   IR.ShowPopup("Office_R1_Devices");
   IR.ShowPopup("Office_R3_Activites");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev","Office");
   IR.SetVariable("Global.Room","Personnel Department");
   IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo Container").GetState(4).Image;
}

function OpenPopups_Finance_Department(){
   IR.ShowPopup("Office_R1_Devices");
   IR.ShowPopup("Office_R3_Activites");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev","Office");
   IR.SetVariable("Global.Room","Finance Department");
   IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo Container").GetState(5).Image;
}

function OpenPopups_Server_Room(){
   IR.ShowPopup("Office_R1_Devices");
   IR.ShowPopup("Office_R2_Activites");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev","Office");
   IR.SetVariable("Global.Room","Server Room");
   IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo Container").GetState(6).Image;
}

function OpenPopups_Director_Office(){
   IR.ShowPopup("Office_R1_Devices");
   IR.ShowPopup("Office_R3_Activites");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev","Office");
   IR.SetVariable("Global.Room","Director's Office");
   IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo Container").GetState(7).Image;
}

function OpenPopups_Waiting_Room(){
   IR.ShowPopup("Office_R1_Devices");
   IR.ShowPopup("Office_R1_Activites");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev","Office");
   IR.SetVariable("Global.Room","Waiting Room");
   IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo Container").GetState(8).Image;
}


function OpenPopups_Meeting_Room(){
   IR.ShowPopup("Office_R1_Devices");
   IR.ShowPopup("Office_R1_Activites");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev","Office");
   IR.SetVariable("Global.Room","Meeting Room");
   IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo Container").GetState(9).Image;
}

function OpenPopups_Laboratory(){
   IR.ShowPopup("Office_R1_Devices");
   IR.ShowPopup("Office_R2_Activites");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev","Office");
   IR.SetVariable("Global.Room","Laboratory");
   IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo Container").GetState(10).Image;
}

function OpenPopups_Record_Studio(){
   IR.ShowPopup("Office_R1_Devices");
   IR.ShowPopup("Office_R1_Activites");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev","Office");
   IR.SetVariable("Global.Room","Record Studio");

   
   IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo").GetState(0).Image = IR.GetItem("Office_R1_Devices").GetItem("photo Container").GetState(11).Image;
}


function OpenPopups_Cameras(){
   IR.ShowPopup("Group Camera");
   IR.ShowPopup("Camera_Time");
   IR.ShowPopup("Camera_View_1");
   IR.SetVariable("Global.Camera", "1");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev",IR.GetVariable("Global.Room"));
   IR.SetVariable("Global.Room","Cameras");
}

function OpenPopups_Sound(){
   IR.ShowPopup("Group Sound");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev",IR.GetVariable("Global.Room"));
   IR.SetVariable("Global.Room","Sound");
}

function OpenPopups_Lights(){
   IR.ShowPopup("Group Light");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev",IR.GetVariable("Global.Room"));
   IR.SetVariable("Global.Room","Lights");
}

function OpenPopups_Climate(){
   IR.ShowPopup("Group Climat");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev",IR.GetVariable("Global.Room"));
   IR.SetVariable("Global.Room","Climate");
}

function OpenPopups_Sonos(){
   IR.ShowPopup("Audio");
   IR.ShowPopup("Back"); 
   IR.SetVariable("Global.Room_prev",IR.GetVariable("Global.Room")); 
   IR.SetVariable("Global.Room","Audio");
}

function OpenPopups_TV(){
   IR.ShowPopup("TV");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev",IR.GetVariable("Global.Room"));
   IR.SetVariable("Global.Room","TV");
   
}


function OpenPopups_Blu_ray(){
   IR.ShowPopup("DVD");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev",IR.GetVariable("Global.Room"));
   IR.SetVariable("Global.Room","Blu-ray");
}

function OpenPopups_Radio(){
   IR.ShowPopup("Radio");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev",IR.GetVariable("Global.Room"));
   IR.SetVariable("Global.Room","Radio");
}

function OpenPopups_Presentation(){
   IR.ShowPopup("Room");
   IR.ShowPopup("Back");
   IR.SetVariable("Global.Room_prev",IR.GetVariable("Global.Room"));
   IR.SetVariable("Global.Room","Presentation");
}