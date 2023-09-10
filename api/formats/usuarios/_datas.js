export const _fusuarios = (data) =>{ 
    let newItems = data.map((it)=>{                
        let iok = {
            "id"          : it.id,
            "fullname"    : it.apellidos + ', ' + it.nombres,            
            "username"    : it.username,            
            "rol"         : it.rol,
            "sucursal"    : it.sucursal.nombre            
        }
    return iok;
    })
return newItems
}