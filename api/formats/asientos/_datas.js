
export const _fsaldo = (data) =>{         
    let datas = data.map((it,index)=>{
        return it.pucId
    })    
    let uniqueChars = [...new Set(datas)];  

    let tDebe  = 0
    let tHaber = 0
    let tDeudor   = 0
    let tAcreedor = 0
    let tGastos = 0
    let tIngresos = 0    
    let tActivos = 0
    let tPasivos = 0

    let nn = uniqueChars.map((it,index)=>{                
        let iDebe     = 0
        let iHaber    = 0
        let iDeudor   = 0
        let iAcreedor = 0

        let iGastos    = 0
        let iIngresos  = 0
        let iActivo    = 0
        let iPasivo    = 0

        let tipo = ""
        let puc = ""
        let icuenta = ""
        let fm = ""
        data.map((tt,ii)=>{                        
            if(it === tt.pucId){                                         
              iDebe  = iDebe + parseFloat(tt.debe)  
              iHaber = iHaber + parseFloat(tt.haber)                
              tipo = tt.puc.tipo
              icuenta = tt.puc.descripcion,
              puc     = it,
              fm      = tt.fm
            }            
        })
        iDeudor   = (tipo === "Activo" || tipo === "Gastos")  ? parseFloat(iDebe) - parseFloat(iHaber) : 0  
        iAcreedor = (tipo === "Ingresos" || tipo === "Pasivo")  ? parseFloat(iHaber) - parseFloat(iDebe) : 0
        
        iGastos   = tipo === "Gastos"  ? parseFloat(iDeudor) : 0  
        iIngresos = tipo === "Ingresos"  ? parseFloat(iAcreedor) : 0
        iActivo = tipo === "Activo"  ? parseFloat(iDeudor) : 0  
        iPasivo = tipo === "Pasivo"  ? parseFloat(iAcreedor) : 0

        let ddt ={
            cuenta: icuenta,
            fm :fm,
            puc : puc,
            tipo  : tipo,
            iDebe: iDebe,
            iHaber: iHaber,
            iDeudor: iDeudor,
            iAcreedor: iAcreedor,
            iGastos : iGastos,
            iIngresos : iIngresos,
            iActivo: iActivo,
            iPasivo : iPasivo
        }
        tDebe  = tDebe  + parseFloat(iDebe)
        tHaber = tHaber + parseFloat(iHaber)
        tDeudor   = tDeudor  + parseFloat(iDeudor)
        tAcreedor = tAcreedor + parseFloat(iAcreedor)
        tGastos  = tGastos + parseFloat(iGastos)
        tIngresos  = tIngresos + parseFloat(iIngresos)
        tActivos  = tActivos + parseFloat(iActivo)
        tPasivos  = tPasivos + parseFloat(iPasivo)
        return ddt
    })  
     
    let newData ={        
        tDebe      : tDebe,
        tHaber     : tHaber,
        tDeudor    : tDeudor,
        tAcreedor  : tAcreedor,
        tGastos    : tGastos,        
        tIngresos  : tIngresos,
        tPerdidas  : tGastos > tIngresos ? tGastos - tIngresos: 0,
        tGanancias : tGastos < tIngresos ? tIngresos - tGastos: 0,
        tActivos   : tActivos,
        tPasivos   : tPasivos,
        tPatrimonio : tActivos - tPasivos
    }
    return newData
}  



export const _fDiarios = (data) =>{   
    let tDebe  = 0       
    let tHaber = 0   
    
    let datas = data.map((it,index)=>{
            return it.comprobanteId
    })
    let uniqueChars = [...new Set(datas)];    
    
    let nn = uniqueChars.map((it,index)=>{        
        let san = {
            id:it,
            fecha: "",
            items:[],
            glosa:"",
            iDebe:0,
            iHaber:0
        }
        let iDebe  = 0
        let iHaber = 0
        data.map((tt,ii)=>{            
            if(it === tt.comprobanteId){                
                let kk={
                    id            : tt.id,          
                    comprobanteId : tt.comprobanteId,  
                    fechaAsiento  : tt.fechaAsiento,
                    fm :tt.fm,
                    debe          : tt.debe,
                    haber         : tt.haber,
                    codigo        : tt.puc.codigo,
                    cuenta        : tt.puc.descripcion,
                    tipo          : tt.puc.tipo                                        
                }
              iDebe  = iDebe + parseFloat(tt.debe)  
              iHaber = iHaber + parseFloat(tt.haber)  
              san.fecha = tt.fechaAsiento  
              san.glosa = tt.glosaAsiento              
              san.items.push(kk)              
            }
            tDebe  = tDebe  + parseFloat(tt.debe)
            tHaber = tHaber + parseFloat(tt.haber)             
        })
        san.iDebe  = iDebe           
        san.iHaber = iHaber           
        return san        
    })
         
    let sm ={
        data : nn,
        tDebe: tDebe,
        tHaber: tHaber
    }
    return sm
}


export const _fMayores = (data) =>{         
    let tDebe  = 0
    let tHaber = 0
    let tDeudor   = 0
    let tAcreedor = 0
    let tipo = ""

    let newData = data.map((it)=>{
        let iok={
            id       : it.id,
            comprobanteId :it.comprobanteId,
            fecha    : it.fechaAsiento,
            concepto : it.glosaAsiento, 
            debe     : it.debe,
            haber    : it.haber,
            tipo     : it.puc.tipo
        }
        tipo = it.puc.tipo
        tDebe  = tDebe + parseFloat(it.debe)
        tHaber = tHaber + parseFloat(it.haber)
        return iok
    })
    tDeudor   = (tipo === "Activo" || tipo === "Gastos")  ? parseFloat(tDebe) - parseFloat(tHaber) : 0  
    tAcreedor = (tipo === "Ingresos" || tipo === "Pasivo")  ? parseFloat(tHaber) - parseFloat(tDebe) : 0  
    let nip ={
        data: newData,
        tDebe: tDebe,
        tHaber: tHaber,
        tDeudor: tDeudor,
        tAcreedor: tAcreedor        
    }
    return nip
}

export const _fSaldos = (data) =>{         
    let datas = data.map((it,index)=>{
        return it.pucId
    })    
    let uniqueChars = [...new Set(datas)];  

    let tDebe  = 0
    let tHaber = 0
    let tDeudor   = 0
    let tAcreedor = 0
    let tGastos = 0
    let tIngresos = 0
    let tActivos = 0
    let tPasivos = 0

    let nn = uniqueChars.map((it,index)=>{                
        let iDebe     = 0
        let iHaber    = 0
        let iDeudor   = 0
        let iAcreedor = 0

        let iGastos    = 0
        let iIngresos  = 0
        let iActivo    = 0
        let iPasivo    = 0

        let tipo = ""
        let puc = ""
        let icuenta = ""
        let fm = ""
        data.map((tt,ii)=>{                        
            if(it === tt.pucId){                                         
              iDebe  = iDebe + parseFloat(tt.debe)  
              iHaber = iHaber + parseFloat(tt.haber)                
              tipo = tt.puc.tipo
              icuenta = tt.puc.descripcion,
              puc     = it,
              fm      = tt.fm
            }            
        })
        iDeudor   = (tipo === "Activo" || tipo === "Gastos")  ? parseFloat(iDebe) - parseFloat(iHaber) : 0  
        iAcreedor = (tipo === "Ingresos" || tipo === "Pasivo")  ? parseFloat(iHaber) - parseFloat(iDebe) : 0
        
        iGastos   = tipo === "Gastos"  ? parseFloat(iDeudor) : 0  
        iIngresos = tipo === "Ingresos"  ? parseFloat(iAcreedor) : 0
        iActivo = tipo === "Activo"  ? parseFloat(iDeudor) : 0  
        iPasivo = tipo === "Pasivo"  ? parseFloat(iAcreedor) : 0

        let ddt ={
            cuenta: icuenta,
            fm :fm,
            puc : puc,
            tipo  : tipo,
            iDebe: iDebe,
            iHaber: iHaber,
            iDeudor: iDeudor,
            iAcreedor: iAcreedor,
            iGastos : iGastos,
            iIngresos : iIngresos,
            iActivo: iActivo,
            iPasivo : iPasivo
        }
        tDebe  = tDebe  + parseFloat(iDebe)
        tHaber = tHaber + parseFloat(iHaber)
        tDeudor   = tDeudor  + parseFloat(iDeudor)
        tAcreedor = tAcreedor + parseFloat(iAcreedor)
        tGastos  = tGastos + parseFloat(iGastos)
        tIngresos  = tIngresos + parseFloat(iIngresos)
        tActivos  = tActivos + parseFloat(iActivo)
        tPasivos  = tPasivos + parseFloat(iPasivo)
        return ddt
    })  
     
    let newData ={
        data      : nn,
        tDebe     : tDebe,
        tHaber    : tHaber,
        tDeudor   : tDeudor,
        tAcreedor : tAcreedor,
        tGastos   : tGastos,
        tIngresos : tIngresos,
        tActivos  : tActivos,
        tPasivos  : tPasivos
    }
    return newData
}  
