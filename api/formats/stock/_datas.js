export const _grafico = (data) =>{      
    let resData = []
    data.map((it)=>{          
          let iok={}
          iok.name = it.categoria,
          iok.y    = parseInt(it.total)
          resData.push(iok)
    })
    return resData   
}

export const _fstocks = (data) =>{ 
    let newItems = data.map((it,index)=>{   
                 
        let iok = {
            "id"          : it.producto.id,
            "nombre"      : it.producto.nombre,
            "codigo"      : it.producto.codigo,
            "filename"    : it.producto.filename,
            "stock"       : it.stock,
            "precioVenta" : parseFloat(it.producto.precioVenta),
            "categoria"   : it.producto.categoria.nombre || '',
            "marca"       : it.producto.marca.nombre || '',                    
            "unidad"      : it.producto.unidad.nombre || '',                    
        }
    return iok;
    })
return newItems
}

export const _fstocksInf = (data) =>{ 
    let cantidadTotal  = 0
    let newData = data.map((item)=>{
        let iok={
            id           : item.id,            
            nombre       : item.producto.nombre,
            codigo       : item.producto.codigo,
            precioVenta  : item.pventa,            
            precioCompra : item.pcompra,            
            categoria    : item.categoria,            
            vendidos     : item.aventa,
            comprados    : item.acompra,
            stock        : item.stock,
            costo        : item.costo,
            productoId   : item.productoId
            }        
        cantidadTotal  = cantidadTotal + parseFloat(item.stock)
        return iok
    })   
    let nidok = {        
        cantidad    : cantidadTotal,
        data        : newData     
    }
    return nidok
}