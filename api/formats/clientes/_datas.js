import { getDistanceBetweenPoints, verOpen } from '../../functions/env'

export const _grafico = (data) =>{      
    let resData = []
    data.map((it)=>{          
          let iok={}
          iok.name = it.tipo,
          iok.y    = parseInt(it.total)
          resData.push(iok)
    })
    return resData  
}

export const _consultas = (data,latitude,longitude) =>{         
    let newData = data.map((it)=>{        
        let hinicio = it.hinicio ? it.hinicio : '08:00'
        let hfin    = it.hfin ? it.hfin : '08:00'
        let ntd = getDistanceBetweenPoints(latitude,longitude,it.latitude,it.longitude)         
        let estado = verOpen(hinicio,hfin)
        let iok={
            id: it.id,
            celular: it.ciudad,
            ciudad: it.ciudad,
            direccion: it.direccion,
            email: it.email,
            filename: it.filename,    
            latitude: it.latitude,
            longitude: it.longitude,
            nit: it.nit,
            nombres: it.nombres,
            pais: it.pais,
            telefono: it.telefono,
            tipo: it.tipo,
            estado: estado,
            distancia: ntd
        }        
        return iok
    })
    return newData
}

export const _fcliente = (it,latitude, longitude) =>{      
    let hinicio = it.hinicio ? it.hinicio : '08:00'
    let hfin    = it.hfin ? it.hfin : '08:00'
    let ntd = getDistanceBetweenPoints(latitude,longitude,it.latitude,it.longitude)     
    let estado = verOpen(hinicio,hfin)
    let iok=it
    iok.categoria = it.categoria.nombre
    iok.moneda    = it.moneda
    iok.labelMoneda = it.labelMoneda
    iok.distancia = ntd
    iok.banner    = it.banner ? it.banner: "default.png"
    iok.portada   = it.portada ? it.portada: "default.png"
    iok.filename  = it.filename ? it.filename: "default.png"
    iok.estado    = estado
    return iok 
}

export const _fclient = (it) =>{          
    let iok=it
    iok.hinicio   = it.hinicio ? it.hinicio : '00:00:00'
    iok.hfin      = it.hfin ? it.hfin : '00:00:00'
    iok.categoria = it.categoria.nombre    
    iok.moneda    = it.moneda
    iok.labelMoneda = it.labelMoneda
    iok.banner    = it.banner ? it.banner: "default.png"
    iok.portada   = it.portada ? it.portada: "default.png"
    iok.filename  = it.filename ? it.filename: "default.png"    
    return iok 
}


export const _sucursales = (data,latitude,longitude) =>{         
    let newData = data.map((it)=>{                
        let ntd = getDistanceBetweenPoints(latitude,longitude,it.latitude,it.longitude)     
        let estado = verOpen(it.hinicio,it.hfin)
        let iok={
            id: it.id,
            nombre: it.nombre,            
            ciudad: it.ciudad,            
            direccion: it.direccion,
            hinicio: it.hinicio,
            hfin: it.hfin,
            hestado: true,
            telefono: it.telefono,
            celular: it.celular,
            tipo: it.tipo,            
            latitude: it.latitude,
            longitude: it.longitude,
            distancia: ntd,
            estado: estado,            
            clienteId: 42,
            
        }       
        return iok
    })
    return newData
}

export const _sucursals = (data) =>{         
    let newData = data.map((it)=>{                        
        let estado = verOpen(it.hinicio,it.hfin)
        let iok={
            id: it.id,
            nombre: it.nombre,            
            ciudad: it.ciudad,            
            direccion: it.direccion,
            hinicio: it.hinicio,
            hfin: it.hfin,
            hestado: true,
            telefono: it.telefono,
            celular: it.celular,
            tipo: it.tipo,            
            latitude: it.latitude,
            longitude: it.longitude,            
            estado: estado,            
            clienteId: 42,
            
        }       
        return iok
    })
    return newData
}

