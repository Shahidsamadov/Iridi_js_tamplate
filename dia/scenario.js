var iSelectedScenario = 0;


function StartScenario()
{
   if (!fBusyByScenario)
   {
      if (iSelectedScenario)
      {
         switch (iSelectedScenario)
         {
            case 1:
               SendPulse("[iRidium][Scenario]FlatOff_TryStart");
            break
            case 2:
               SendPulse("[iRidium][Scenario]Day_TryStart");
            break
            case 3:
               SendPulse("[iRidium][Scenario]Evening_TryStart");
            break
            case 4:
               SendPulse("[iRidium][Scenario]Guest_TryStart");
            break
            case 5:
               SendPulse("[iRidium][Scenario]Cinema_TryStart");
            break
            case 6:
               SendPulse("[iRidium][Scenario]Comfort_TryStart");
            break
            case 7:
               SendPulse("[iRidium][Scenario]Relax_TryStart");
            break
            case 8:
               SendPulse("[iRidium][Scenario]Rest_TryStart");
            break
            case 9:
               SendPulse("[iRidium][Scenario]Work_TryStart");
            break
            case 10:
               SendPulse("[iRidium][Scenario]CommonHalfOff_TryStart");
            break
            case 11:
               SendPulse("[iRidium][Scenario]LifeHalfOff_TryStart");
            break
         }
         iSelectedScenario = 0;

         if (g_fReturnToScenarios)
         {
            ShowScenario();
         }
         else
         {
            HideAll();
         }
      }
   }
   else
   {
      ShowScenarioInProgress();
   }
}

// *****************************************************

function ScenarioFlatOff()
{
   iSelectedScenario = 1;
   IR.SetVariable("Global.ScenarioAsk", "Вы действительно желаете запустить сценарий 'Выключить квартиру'?");
   ShowScenarioStart();
}

function ScenarioDay()
{
   iSelectedScenario = 2;
   IR.SetVariable("Global.ScenarioAsk", "Вы действительно желаете запустить сценарий 'День'?");
   ShowScenarioStart();
}

function ScenarioEvening()
{
   iSelectedScenario = 3;
   IR.SetVariable("Global.ScenarioAsk", "Вы действительно желаете запустить сценарий 'Вечер'?");
   ShowScenarioStart();
}

function ScenarioGuest()
{
   iSelectedScenario = 4;
   IR.SetVariable("Global.ScenarioAsk", "Вы действительно желаете запустить сценарий 'Гости'?");
   ShowScenarioStart();
}

function ScenarioCinema()
{
   iSelectedScenario = 5;
   IR.SetVariable("Global.ScenarioAsk", "Вы действительно желаете запустить сценарий 'Кино'?");
   ShowScenarioStart();
}

function ScenarioComfort()
{
   iSelectedScenario = 6;
   IR.SetVariable("Global.ScenarioAsk", "Вы действительно желаете запустить сценарий 'Комфорт'?");
   ShowScenarioStart();
}

function ScenarioRelax()
{
   iSelectedScenario = 7;
   IR.SetVariable("Global.ScenarioAsk", "Вы действительно желаете запустить сценарий 'Релакс'?");
   ShowScenarioStart();
}

function ScenarioRest()
{
   iSelectedScenario = 8;
   IR.SetVariable("Global.ScenarioAsk", "Вы действительно желаете запустить сценарий 'Отдых'?");
   ShowScenarioStart();
}

function ScenarioWork()
{
   iSelectedScenario = 9;
   IR.SetVariable("Global.ScenarioAsk", "Вы действительно желаете запустить сценарий 'Работа'?");
   ShowScenarioStart();
}

function ScenarioCommonOff()
{
   iSelectedScenario = 10;
   IR.SetVariable("Global.ScenarioAsk", "Вы действительно желаете запустить сценарий 'Выключить общую половину'?");
   ShowScenarioStart();
}

function ScenarioLifeOff()
{
   iSelectedScenario = 11;
   IR.SetVariable("Global.ScenarioAsk", "Вы действительно желаете запустить сценарий 'Выключить жилую половину'?");
   ShowScenarioStart();
}




// *******
function ReturnToScenarioSet()
{
   g_fReturnToScenarios = true;
}

function ReturnToScenarioReset()
{
   g_fReturnToScenarios = false;
}

function CloseScenarioAsk()
{
   if (g_fReturnToScenarios)
   {
      ShowScenario();
   }
   else
   {
      HideAll();
   }
}

