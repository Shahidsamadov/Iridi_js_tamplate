function Back(){
      if (IR.GetVariable("Global.Room_prev")=="Office") OpenPopups_Office();
      if (IR.GetVariable("Global.Room_prev")=="Reception") OpenPopups_Reception();
      if (IR.GetVariable("Global.Room_prev")=="Security Department") OpenPopups_Security_Department();
      if (IR.GetVariable("Global.Room_prev")=="Archive") OpenPopups_Archive();
      if (IR.GetVariable("Global.Room_prev")=="IT Department") OpenPopups_IT_Department();
      if (IR.GetVariable("Global.Room_prev")=="Personnel Department") OpenPopups_Personnel_Department();
      if (IR.GetVariable("Global.Room_prev")=="Finance Department") OpenPopups_Finance_Department();
      if (IR.GetVariable("Global.Room_prev")=="Server Room") OpenPopups_Server_Room();
      if (IR.GetVariable("Global.Room_prev")=="Director's Office") OpenPopups_Director_Office();
      if (IR.GetVariable("Global.Room_prev")=="Waiting Room") OpenPopups_Waiting_Room();
      if (IR.GetVariable("Global.Room_prev")=="Meeting Room") OpenPopups_Meeting_Room();
      if (IR.GetVariable("Global.Room_prev")=="Laboratory") OpenPopups_Laboratory();
      if (IR.GetVariable("Global.Room_prev")=="Record Studio") OpenPopups_Record_Studio();
      

      
}