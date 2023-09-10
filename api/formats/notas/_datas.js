export const _grafico = (data) =>{      
    let resData  = [0,0,0,0,0,0,0,0,0,0,0,0]  
    data.map((it)=>{          
          resData.map((its,inde)=>{                          
              if(it.mes === inde+1)
              {                
                  resData[inde] = parseInt(it.total) 
              }
          })        
    })
    return resData   
}
