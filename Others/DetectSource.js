// Unit: DetectSource

var RoomNumber = {
  "Бассейн" : 1,
  "Парная": 3,
  "Спорт" : 4,
  "Кинотеатр": 0,
  "Бильярд": 0
}

function CheckSonyProjector()
{
    IR.Log("Checking Sony projector");
    if (IR.GetDevice("Crestron").GetFeedback("Sony_Is_On") == 1)
    {
//        IR.Log("Sony projector is on");
        return true;
    }
    else
    {
//        IR.Log("Sony projector is off");
        return false;
    }
}

function CheckMiniYamaha(source)
{
//         IR.Log("Checking Mini Yamaha Reciever");
         if (IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Connected") == 1)
         {
//             IR.Log("Mini Yamaha Reciever connected");
//             IR.Log("Checking mini Yamaha main zone");
             if (IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Main_Power_Is_On") == 1)
             {
//                 IR.Log("Mini Yamaha Reciever main zone on");
                     switch (source)
                     {
                     case "AirPlay":
//                         IR.Log("Checking AirPlay status");
                         if (IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Main_Input_Is_Airplay") == 1)
                         {
//                             IR.Log("Mini Yamaha input is Airplay");
                             return true;
                         }
                         else
                         {
//                             IR.Log("Mini Yamaha input is not Airplay");
                             return false;
                         }
                     break;
                     case "Радио":
//                         IR.Log("Checking Radio status");
                         if (IR.GetDevice("Crestron").GetFeedback("Mini_Yamaha_Main_Input_Is_Net_Radio") == 1)
                         {
//                             IR.Log("Mini Yamaha input is Net Radio");
                             return true;
                         }
                         else
                         {
//                             IR.Log("Mini Yamaha input is not Net Radio");
                             return false;
                         }
                     }
             }
             else
             {
//                 IR.Log("Mini Yamaha main zone off");
                 return false;
             }
         }
         else
         {
//            IR.Log("Mini Yamaha not connected");
            return false;
         }
}

function DetectSource(location, source)
{
   switch (location)
   {
      case "Кинотеатр":
//         IR.Log("Checking Yamaha Reciever");
         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Connected") == 1)
         {
//             IR.Log("Yamaha Reciever connected");
//             IR.Log("Checking Yamaha main zone");
             if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Power_Is_On") == 1)
             {
//                 IR.Log("Yamaha Reciever main zone on");
                     switch (source)
                     {
                     case "Спутниковое":
//                         IR.Log("Checking Sattelite status");
//                         IR.Log("Checking Yamaha input");
                         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Input_Is_AV2") == 1)
                         {
//                             IR.Log("Yamaha input is Satellite");
                             return CheckSonyProjector();
                         }
                         else
                         {
//                             IR.Log("Yamaha input is not Satellite");
                             return false;
                         }
                     break;
                     case "Apple TV":
//                         IR.Log("Checking Apple TV status");
//                         IR.Log("Checking Yamaha input");
                         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Input_Is_AV1") == 1)
                         {
//                             IR.Log("Yamaha input is Apple TV");
                             return CheckSonyProjector();
                         }
                         else
                         {
//                             IR.Log("Yamaha input is not Apple TV");
                             return false;
                         }
                     break;
                     case "Kodi":
//                         IR.Log("Checking Kodi status");
//                         IR.Log("Checking Yamaha input");
                         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Input_Is_AV3") == 1)
                         {
//                             IR.Log("Yamaha input is Kodi");
                             return CheckSonyProjector();
                         }
                         else
                         {
//                             IR.Log("Yamaha input is not Kodi");
                             return false;
                         }
                     break;
                     case "XBOX":
//                         IR.Log("Checking XBOX status");
//                         IR.Log("Checking Yamaha input");
                         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Input_Is_AV4") == 1)
                         {
//                             IR.Log("Yamaha input is XBOX");
                             return CheckSonyProjector();
                         }
                         else
                         {
//                             IR.Log("Yamaha input is not XBOX");
                             return false;
                         }
                     break;
                     case "AirPlay":
//                         IR.Log("Checking AirPlay status");
                         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Input_Is_Airplay") == 1)
                         {
//                             IR.Log("Yamaha input is Airplay");
                             return true;
                         }
                         else
                         {
//                             IR.Log("Yamaha input is not Airplay");
                             return false;
                         }
                     break;
                     case "Радио":
                         IR.Log("Checking Radio status");
                         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Main_Input_Is_Net_Radio") == 1)
                         {
//                             IR.Log("Yamaha input is Net Radio");
                             return true;
                         }
                         else
                         {
//                             IR.Log("Yamaha input is not Net Radio");
                             return false;
                         }
                     }
             }
             else
             {
//                 IR.Log("Yamaha Reciever main zone off");
                 return false;
             }
         }
         else
         {
//            IR.Log("Yamaha not connected");
            return false;
         }
      break;
      case "Бильярд":
//         IR.Log("Checking Yamaha Reciever");
         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Connected") == 1)
         {
//             IR.Log("Yamaha Reciever connected");
//             IR.Log("Checking Yamaha zone 2");
             if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Zone2_Power_Is_On") == 1)
             {
//                   IR.Log("Yamaha Reciever zone 2 on");
                   switch (source)
                   {
                      case "AirPlay":
//                         IR.Log("Checking AirPlay status");
                         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Zone2_Input_Is_Airplay") == 1)
                         {
//                             IR.Log("Yamaha zone 2 input is Airplay");
                             return true;
                         }
                         else
                         {
//                             IR.Log("Yamaha zone 2 input is not Airplay");
                             return false;
                         }
                      break;
                      case "Радио":
                         if (IR.GetDevice("Crestron").GetFeedback("Yamaha_Zone2_Input_Is_Net_Radio") == 1)
                         {
//                             IR.Log("Yamaha zone 2 input is Net Radio");
                             return true;
                         }
                         else
                         {
//                             IR.Log("Yamaha zone 2 input is not Net Radio");
                             return false;
                         }
                         return true;
                      break;
                   }
             }
             else
             {
//                 IR.Log("Yamaha Reciever zone 2 off");
                 return false;
             }
         }
         else
         {
//            IR.Log("Yamaha not connected");
            return false;
         }
      break;
      case "Бассейн":
      case "Спорт":
      case "Парная":
//         IR.Log("Checking Crestron Reciever");     
         switch (source)
         {
            case "Спутниковое":
//                IR.Log("Checking Crestron Reciever input number for sattelite in " + location);
                if (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_Room" + RoomNumber[location] + "_Is_Src") == 1)
                {
//                    IR.Log("Crestron Reciever input number is sattelite");
                    return true;
                }
                else
                {
//                    IR.Log("Crestron Reciever input number is not sattelite");
                    return false;
                }
            break;
            case "AirPlay":
            case "Радио":
//                IR.Log("Checking Crestron Reciever input number for Yamaha in " + location);
//                IR.Log("expection room number is" + RoomNumber[location]);
                if (IR.GetDevice("Crestron").GetFeedback("Crestron_Reciever_Room" + RoomNumber[location] + "_Is_Src") == 2)
                {
//                      IR.Log("Crestron Reciever input number is Yamaha");
                      return CheckMiniYamaha(source);
                }
                else
                {
//                      IR.Log("Crestron Reciever input number is not Yamaha");
                      return false;
                } 
            break;
         }
     break;
     }
}
