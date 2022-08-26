/*IR.AddListener(IR.EVENT_START, 0, function()  
{    
   IR.AddListener(IR.EVENT_RECEIVE_TEXT, IR.GetDevice("AV & Custom Systems (TCP)"), function(text) 
      //Событие срабатывающее при принятии данных от устройства
      {
      IR.Log("Data from reciever");  
      IR.Log(text); //В лог выводим текст
      });                      
}); */

var prewWait;
var trigSat;
var trigBR;
var trigAppleTV;

/************************************************************************************/
/** Повторно из Иридиума отправляем сигнал на переключение на нужный вход ресивера **/
/************************************************************************************/ 

//Взводим флаг входа, по которому повторно отправляем команду           
function arcam_SAT()
   {
      trigSat = 1;  
   }
function arcam_BR()
   {
      trigBR = 1;
   }
function arcam_AppleTV()
   {
      trigAppleTV = 1;
   }
   
//По окончанию работы степпера crestrona с задержкой в несколько секунд отправляем команду на включение входа     
IR.AddListener(IR.EVENT_TAG_CHANGE, IR.GetDevice("Crestron"), function(name,value)
{  
    if  (name == "[UI][IPD1]Wait#")
        {   
         if ((value == 65535) && (prewWait != 65535)) //Степпер закончил работу
            { 
               IR.SetTimeout(5000, function() {   //Задержка    
                     if (trigSat == 1)
                        {  //Отправляем команду по ТСР IР
                           IR.GetDevice("AV & Custom Systems (TCP)").Send([0x21, 0x01, 0x08, 0x02, 0x10, 0x1B, 0x0D]);
                           trigSat = 0;// сбрасываем флаг  
                         
                        }
                     if (trigBR == 1)
                        {  
                           IR.GetDevice("AV & Custom Systems (TCP)").Send([0x21, 0x01, 0x08, 0x02, 0x10, 0x62, 0x0D]);
                           trigBR = 0;
                          
                        }
                     if (trigAppleTV == 1)
                        {  
                           IR.GetDevice("AV & Custom Systems (TCP)").Send([0x21, 0x01, 0x08, 0x02, 0x10, 0x61, 0x0D]);
                           trigAppleTV = 0; 
                           
                        } 
               });
            }
            prewWait = value;
        }
            
});