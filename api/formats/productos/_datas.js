export const _fproductos = (data) =>{         
    let newData = data.map((it)=>{        
        let iok={
            id          : it.id,
            codigo      : it.codigo,
            nombre      : it.nombre,  
            precioVenta : it.precioVenta,                                  
            categoria   : it.cate.nombre,                                    
            filename    : it.filename,
            stock       : it.stock,
            clienteId   : it.clienteId,
            categoriaId : it.cateId
        }        
        return iok
    })
    return newData
}

export const _fproducto = (it) =>{          
    let iok=it
    iok.categoria   = it.cate.nombre    
    return iok 
}

export const _fproductosInf = (data) =>{    
 
    let totalStock = 0
    let newData = data.map((it)=>{
        let iok={
            id          : it.id,
            codigo      : it.codigo,
            nombre      : it.nombre,  
            precioVenta : it.precioVenta,                                  
            categoria   : it.categoria.nombre,            
            industria   : it.industria.nombre,
            marca       : it.marca.nombre,
            unidad      : it.unidad.nombre,
            filename    : it.filename,
            stock       : it.sucursalitem.stock || 0
        }
        totalStock = totalStock + parseInt(iok.stock === 0 ? 0 : 1)
        return iok
    })
    let diok = {
        data: newData,
        stock : totalStock
    }
    return diok
}
