export const _ftickets = (data) =>{ 
    let newData = data.map((it)=>{
        let iok={
            id        : it.id,
            fecha     : it.fecha,
            tipo      : it.tipo,
            estado    : it.estado,
            detalle   : it.detalle,
            cliente   : it.client,
            usuario   : it.usuario.nombres,
            clienteId : it.clienteId,
            nit       : it.cliente.nit,
            filename  : it.cliente.filename
        }
        return iok
    })
    return newData
}

export const _fticket = (it) =>{         
    let iok={
        id        : it.id,
        fecha     : it.fecha,
        tipo      : it.tipo,
        estado    : it.estado,
        gestion   : it.gestion,
        detalle   : it.detalle,
        mes       : it.mes,      
        clienteId : it.clienteId,
        client    : it.client,      
        usuario   : it.usuario.nombres
    }
return iok
}


export const _fticketItems = (data) =>{         
    let newData = data.map((it)=>{
        let iok={
            id        : it.id,
            accion    : it.accion,
            fecha     : it.createdAt,
            observacion : it.observacion,
            usuario   : it.usuario.nombres,
                 
        }
        return iok
    })
    return newData
}

