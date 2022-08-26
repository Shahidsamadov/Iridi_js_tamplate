IR_anim = function(gr, out, c, f, v){
   var st = [];
   IR.AddListener(IR.EVENT_WORK, 0, f = function(t){ 
      c += t;
      if(function(){
         for(var g = 0; g < gr.length; g++){
            if(c == t) st[g] = []; 
            for(var p = 0; p < gr[g][1].length; p++)  
               for(var i = 0; i < gr[g][0].length; i++){                                         
                  if(gr[g][1][p][1] == "?" && c == t)
                     if(gr[g][1][p][4] == -1) st[g][i] = gr[g][0][i][gr[g][1][p][3]]   
                     else  st[g][i] = gr[g][0][i].GetState(gr[g][1][p][4])[gr[g][1][p][3]]
                  else if (gr[g][1][p][1] != "?") st[g][i] = gr[g][1][p][1];                           
                  if(c >= out) v =  st[g][i] + gr[g][1][p][2] + gr[g][1][p][5] * i;   
                  else  v = IR.Tween(gr[g][1][p][0], c,  st[g][i], gr[g][1][p][2] + gr[g][1][p][5] * i, out);                                       
                  if(gr[g][1][p][4] == -1) gr[g][0][i][gr[g][1][p][3]] = v  
                  else  gr[g][0][i].GetState(gr[g][1][p][4])[gr[g][1][p][3]] = v;  
               }
         }
         return c >= out;  
      }()) IR.RemoveListener(IR.EVENT_WORK, 0, f); 
   });    
}                