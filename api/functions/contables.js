
const fechaHoy = new Date();
const gestion = fechaHoy.getFullYear()
const gestions = gestion.toString()
const mes = fechaHoy.getMonth() + 1
const fechaComprobante  = (new Date(fechaHoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      


export const ajusteNotaPlan = (item,items,arr,glosa, bancoId,nBanco,cheque) =>{             
    //falta numero comprobante
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
    
   

    let newNota = {
        fecha: fechaComprobante,
        tipo: "",
        estado: "pendiente",
        label: item.proveedors ?  item.proveedors: item.clients,
        glosa: "(Automatico) "+glosa,
        ciudad: item.ciudad,
        impuesto: 0,
        subTotal: item.totalGeneral,
        total: item.totalGeneral,
        gestion: gestion,
        tdc: 0,
        tDebe: item.totalGeneral,
        tHaber:item.totalGeneral,        
        num: 0,
        usuarioId: item.usuarioId,
        bancoId: bancoId ? bancoId: null,
        nCheque : cheque ? cheque: "",
        nBanco : nBanco ? nBanco :""    
    }
    let maximo = Math.max(...uniqueFm)        
    let newData = items.map((it,index)=>{
        let iok={
            "fechaAsiento": fechaComprobante,
            "glosaAsiento": "(Automatico) "+glosa,
            "debe": it.debe ? (item.totalGeneral * parseFloat(it.debe) / 100 ):0,
            "haber": it.haber ? (item.totalGeneral * parseFloat(it.haber) / 100 ):0,
            "descripcion": it.descripcion,
            "fm": 0,
            "comprobanteId": 888,
            "pucId": it.pucId,
            "codigo": it.codigo            
        }
        unique.map((dt)=>{                
            if(it.pucId === dt.pucId){
                /*console.log(dt.fm)*/
                iok.fm = dt.fm   
            }          
        })        
        if(iok.fm === 0){
            iok.fm = maximo +1
            maximo = maximo +1
        }
        return iok
    })

   
    let iok = {
        nota: newNota,
        asientos : newData
    }  
    return iok 
}


export const ajustePagoCaja = (item,items,arr,glosa,bancoId,nBanco,cheque) =>{             
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
    
   

    let newNota = {
        fecha: fechaComprobante,
        tipo: "",
        estado: "pendiente",
        label: item.proveedors ? "(Automatico)"+ item.proveedors : "(Automatico)"+ item.clients,
        glosa: item.proveedors ? "(Automatico) Pago :"+glosa : "(Automatico) Cobro :"+glosa,
        ciudad: "santa cruz",
        impuesto: 0,
        subTotal: parseFloat(item.monto),
        total: parseFloat(item.monto),
        gestion: gestion,
        tdc: 0,
        tDebe: parseFloat(item.monto),
        tHaber:parseFloat(item.monto),        
        num: 0,
        usuarioId: item.usuarioId,  
        bancoId: bancoId ? bancoId: null,
        nCheque : cheque ? cheque: "",
        nBanco : nBanco ? nBanco :""    
    }
    let maximo = Math.max(...uniqueFm)        
    let newData = items.map((it,index)=>{
        let iok={
            "fechaAsiento": fechaComprobante,
            "glosaAsiento": "(Automatico) "+glosa,
            "debe": it.debe ? (parseFloat(item.monto) * parseFloat(it.debe) / 100 ):0,
            "haber": it.haber ? (parseFloat(item.monto) * parseFloat(it.haber) / 100 ):0,
            "descripcion": it.descripcion,
            "fm": 0,
            "comprobanteId": 888,
            "pucId": it.pucId,
            "codigo": it.codigo            
        }
        unique.map((dt)=>{                
            if(it.pucId === dt.pucId){
                /*console.log(dt.fm)*/
                iok.fm = dt.fm   
            }          
        })        
        if(iok.fm === 0){
            iok.fm = maximo +1
            maximo = maximo +1
        }
        return iok
    })

   
    let iok = {
        nota: newNota,
        asientos : newData
    }  
    return iok 
}


export const ajusteNotaCaja = (item,items,arr,glosa) =>{             
    //falta numero comprobante
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
    
   

    let newNota = {
        fecha: fechaComprobante,
        tipo: "",
        estado: "pendiente",
        label: "(Automatico) Cierre de Caja :"+glosa,
        glosa: "(Automatico) Cierre de Caja :"+glosa,
        ciudad: "santa cruz",
        impuesto: 0,
        subTotal: item.total,
        total: item.total,
        gestion: gestion,
        tdc: 0,
        tDebe: item.total,
        tHaber:item.total,        
        num: 0,
        usuarioId: item.usuarioId,     
    }
    let maximo = Math.max(...uniqueFm)        
    let newData = items.map((it,index)=>{
        let iok={
            "fechaAsiento": fechaComprobante,
            "glosaAsiento": "(Automatico) "+glosa,
            "debe": it.debe ? (item.total * parseFloat(it.debe) / 100 ):0,
            "haber": it.haber ? (item.total * parseFloat(it.haber) / 100 ):0,
            "descripcion": it.descripcion,
            "fm": 0,
            "comprobanteId": 888,
            "pucId": it.pucId,
            "codigo": it.codigo            
        }
        unique.map((dt)=>{                
            if(it.pucId === dt.pucId){
                /*console.log(dt.fm)*/
                iok.fm = dt.fm   
            }          
        })        
        if(iok.fm === 0){
            iok.fm = maximo +1
            maximo = maximo +1
        }
        return iok
    })

   
    let iok = {
        nota: newNota,
        asientos : newData
    }  
    return iok 
}