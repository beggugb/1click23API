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

export const _fComprados = (data,type) =>{           
    let newData = data.map((it)=>{
        let iok={
            productoId  : it.productoId, 
            producto    : it.producto.nombre,
            codigo      : it.producto.codigo,
            precio      : it.producto.precioVenta,
            categoriaId : it.producto.categoriaId,
            categoria   : it.categoria,
            sumTotal    : parseFloat(it.total),
            sumCantidad : parseFloat(it.sumCantidad)
        }
        return iok
    })
   
    newData.sort(function (a, b) {
            if (a.sumCantidad < a.sumCantidad) {
              return 1;
            }
            if (a.sumCantidad > b.sumCantidad) {
              return -1;
            }
            // a must be equal to b
            return 0;
        });   
   
    return newData
}



export const _fpagosInf = (data) =>{         
    let montoTotal = 0        
    let newData = data.map((it)=>{            
    let iok={
        id        : it.notacobranza.planpago.id,
        compraId  : it.id,
        proveedor : it.proveedors,
        detalle   : it.notacobranza.detalle,
        cuota     : it.notacobranza.planpago.cuota,
        monto     : it.notacobranza.planpago.monto,
        estado    : it.notacobranza.planpago.estado,
        fechaPago : it.notacobranza.planpago.fechaPago,
        mes       : it.notacobranza.planpago.mes,
        proveedorId : it.proveedorId,
        notaId    : it.notacobranza.id,            
        planId    : it.notacobranza.planpago.id,            
        gestion   : it.notacobranza.planpago.gestion
    }
    montoTotal = montoTotal + parseFloat(it.notacobranza.planpago.monto)        
    return iok
})
let iok={
    data   : newData,
    pTotal : montoTotal        
}
return iok
}




export const _fcomprasInf = (data) =>{         
    let sumaTotal = 0
    let cantidadTotal = 0
    let newData = data.map((it)=>{
        let iok={
            id          : it.id,
            fecha       : it.fechaCompra,
            cantidad    : it.compraitem.cantidad,
            valor       : it.compraitem.valor,
            subTotal    : it.compraitem.subTotal,
            nombre      : it.compraitem.nombre,
            productoId  : it.compraitem.productoId,
            categoria   : it.compraitem.categoria            
        }
        sumaTotal      = sumaTotal + parseFloat(it.compraitem.subTotal)
        cantidadTotal  = cantidadTotal  + parseInt(it.compraitem.cantidad)
        return iok
    })

    newData.sort((a, b) => {
        if (a.nombre === b.nombre) {
          return 0;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }        
        return 1;
    });  

    let newDatas ={
        data      : newData,
        suma      : sumaTotal,
        cantidad  : cantidadTotal
    }
    return newDatas
}


export const _fcompras = (data) =>{             
    let newData = data.map((it)=>{            
    let iok={
        id              : it.id,
        fechaCompra     : it.fechaCompra,
        observaciones   : it.observaciones,
        estado          : it.estado,
        totalGeneral    : it.totalGeneral,
        proveedors      : it.proveedors,
        tipo            : it.tipo,
        pagoTotal       : it.notacobranza.id !== null ? it.notacobranza.pagoTotal : 0,
        saldoTotal      : it.notacobranza.id !== null ? it.notacobranza.saldoTotal : 0,
    }    
    return iok
    })
return newData
}

export const _fproveedorEstados = (data) =>{     
    let montoTotal = 0
    let saldoTotal = 0
    let pagoTotal  = 0

    let newData = data.map((it)=>{        
            let iok={                
                compraId   : it.id,
                proveedor : it.proveedors,
                fecha     : it.notacobranza.fechaVencimiento,
                detalle   : it.notacobranza.detalle,
                total     : it.notacobranza.montoTotal,
                saldo     : it.notacobranza.saldoTotal,
                pago      : it.notacobranza.pagoTotal,            
                proveedorId : it.proveedorId,
                notaId    : it.notacobranza.id,            
                
            }
            montoTotal = montoTotal + parseFloat(it.notacobranza.montoTotal)
            saldoTotal = saldoTotal + parseFloat(it.notacobranza.saldoTotal)
            pagoTotal  = pagoTotal + parseFloat(it.notacobranza.pagoTotal)
            return iok
        
    })
  
    let nn={
        data   : newData,
        pTotal : montoTotal,
        pSaldo : saldoTotal,
        pPago  : pagoTotal
    }
    return nn
}