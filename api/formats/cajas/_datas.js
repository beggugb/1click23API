
export const _fcajasInf = (data) =>{         
    let newData = data.map((it)=>{
        let iok={
            id            : it.id,
            fecha         : it.fecha,
            fechaClose    : it.fechaClose,
            inicial       : it.inicial,
            ingreso       : it.ingreso,
            egreso        : it.egreso,
            total         : it.total,
            estado        : it.estado,
            observaciones : it.observaciones,
            usuario       : it.usuario.apellidos +', '+it.usuario.nombres,
            usuarioId     : it.usuario.id            
            
        }
        return iok
    })
    return newData
}