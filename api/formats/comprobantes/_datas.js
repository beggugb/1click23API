const fechaHoy = new Date();
const gestion = fechaHoy.getFullYear()
const gestions = gestion.toString()
const mes = fechaHoy.getMonth() + 1
const fechaComprobante  = (new Date(fechaHoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      

export const _fcomprobantes = (items,arr) =>{   

    const uniqueIds = [];
    const uniqueFm = [];
    const unique = arr.filter(element => {
        const isDuplicate = uniqueIds.includes(element.pucId);      
        if (!isDuplicate) {
          uniqueIds.push(element.pucId);
          uniqueFm.push(element.fm);      
          return true;
        }      
        return false;
      });
      
      let maximo = uniqueFm.length > 0 ? Math.max(...uniqueFm) :0             
      let newData = items.map((it,index)=>{
          let iok={
              "fechaAsiento": fechaComprobante,
              "glosaAsiento": it.glosaAsiento,            
              "debe": it.debe ? it.debe:0,
              "haber": it.haber ? it.haber:0,
              "descripcion": it.descripcion,
              "fm": 0,
              "comprobanteId": it.comprobanteId,
              "pucId": it.pucId,
              "codigo": it.codigo            
          }
          unique.map((dt)=>{                
              if(it.pucId === dt.pucId){                  
                  iok.fm = dt.fm   
              }          
          })        
          if(iok.fm === 0){
              iok.fm = maximo +1
              maximo = maximo +1
          }
          return iok
      })
   

    return newData
}   