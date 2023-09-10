export const verifiDBEmpty = (params) =>{
    if(params === "" || params === 0 || params === '0' || params === "0" || params === undefined )
    {
        return 0
    }else{
        return params
    }
}
export const verifiDBNull = (params) =>{
    if(params === '--todos--' || params === null || params === '' || params === 0 || params === '0' || params === undefined )
    {
        return '%'
    }else{
        return '%'+params+'%'
    }
}

export const verifiDBNulld = (params) =>{
    if(params === '--todos--' || params === null || params === '' || params === 0 || params === '0' || params === undefined )
    {
        return '%'
    }else{
        return params
    }
}

export const verifiDBNulls = (params) =>{
    if(params === '--todos--' || params === null || params === '' || params === 0 || params === '0' || params === undefined )
    {
        return '0'
    }else{
        return '%'+params+'%'
    }
}

export const verifiEmpty = (params) =>{
    if(params === '--todos--' || params === null || params === '' || params === 0 || params === '0' || params === undefined )
    {
        return '*'
    }else{
        return '%'+params+'%'
    }
}

export const isNUll = (dato) =>{
    if(dato){
        return dato
    }else{
        return 0
    }
}
export const isNUllArray = (data) =>{
    if(data){
        return data
    }else{
        return []
    } 
}

export const formatearInteger = (data) =>{
    let newData = []

    data.map((itt)=>{
        let iok={
            nombre: itt.nombre,            
            precioVenta: parseFloat(itt.precioVenta),
            filename: itt.filename,
            tipoId: parseInt(itt.tipoId),
            volumenId: parseInt(itt.volumenId),
            origenId: parseInt(itt.origenId),
            categoriaId: parseInt(itt.categoriaId),
            marcaId: parseInt(itt.marcaId),
            unidadId: parseInt(itt.unidadId),
            modeloId: parseInt(itt.modeloId),
            industriaId: parseInt(itt.industriaId)
        }
        newData.push(iok)
    })
    return newData
}


export const formatearMes = (data) =>{
    let asistencia = [0,0,0,0,0,0,0,0,0,0,0,0]
    let consulta   = [0,0,0,0,0,0,0,0,0,0,0,0]
    let reclamo    = [0,0,0,0,0,0,0,0,0,0,0,0]
    let soporte    = [0,0,0,0,0,0,0,0,0,0,0,0]

    data.map((itt,index)=>{
        switch(itt.tipo){
            case 'asistencia':
              asistencia[itt.mes-1]= Number(itt.total)
            break;
            case 'consulta':
              consulta[itt.mes-1]= Number(itt.total)
            break;
            case 'reclamo':
              reclamo[itt.mes-1]= Number(itt.total)
            break;
            case 'soporte':
              soporte[itt.mes-1]= Number(itt.total)
            break;
            default:              
            break;    
        }
    })  

    return { asistencia, consulta, reclamo, soporte }    
}

export function getFechaAnterior() 
{
   let  d = new Date()
   var dd = String(d.getDate()-1).padStart(2, '0');
   var mm = String(d.getMonth()+1).padStart(2, '0'); //January is 0!
   var yyyy = d.getFullYear();
   var tt = yyyy + '-' + mm + '-' + dd;    
   return tt
} 

export function getFechaNueva() 
{
   let  d = new Date()
   var dd = String(d.getDate()).padStart(2, '0');
   var mm = String(d.getMonth()+2).padStart(2, '0'); //January is 0!
   var yyyy = d.getFullYear();
   var tt = yyyy + '-' + mm + '-' + dd;    
  
   return tt
} 

export function sumarKilometros (lat,lon,km_norte,km_este) {

    let b_tal = lat * (Math.PI /180)

    let lat_km = km_norte / 111
    let lon_km = km_este / (111 * Math.cos(b_tal))

    let sum_lat = lat + lat_km    
    let res_lat = lat - lat_km

    let sum_lon = lon + lon_km    
    let res_lon = lon - lon_km

    

    let latMayor = sum_lat
    let latMenor = res_lat

    let lonMayor = sum_lon
    let lonMenor = res_lon
    
  
    if(sum_lat > res_lat){        
        latMayor = sum_lat
    }else{        
        latMenor = res_lat
    }

    if(sum_lon > res_lon){        
        lonMayor = sum_lon
    }else{        
        lonMenor = res_lon
    }
    
    /*
    console.log('latitude mayor',latMayor)
    console.log('latitude menor',latMenor)
    console.log('longitude mayor',lonMayor)
    console.log('longitude menor',lonMenor)*/
  
    let iok={
        latMayor   : latMayor, 
        latMenor   : latMenor, 
        lonMayor   : lonMayor,        
        lonMenor   : lonMenor
    }

    return iok

}

export function verificarPositivo (val1,val2){

    let min = Math.sign(val1) 
    let max = Math.sign(val2) 


    
}


export const getDistanceBetweenPointss = (lat1, lng1, lat2, lng2) =>{
    // El radio del planeta tierra en metros.
    let R = 6378137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(lng2 - lng1);
    let a = Math.sin(dLat / 2)
            *
            Math.sin(dLat / 2) 
            +
            Math.cos(degreesToRadians(lat1)) 
            * 
            Math.cos(degreesToRadians(lat1)) 
            *
            Math.sin(dLong / 2) 
            * 
            Math.sin(dLong / 2);
  
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;
  
    return distance;
  }
  function degreesToRadians(degrees){
    return degrees * Math.PI / 180;
  }

  export const getDistanceBetweenPoints = (latitude1, longitude1, latitude2, longitude2) =>{
    let theta = longitude1 - longitude2;
    let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
        Math.sin(latitude1 * (Math.PI/180)) * Math.sin(latitude2 * (Math.PI/180)) + 
        Math.cos(latitude1 * (Math.PI/180)) * Math.cos(latitude2 * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
    );        
    return Math.round(distance * 1.609344, 3);

  }

  export const verOpen = (hinicio,fin) =>{
    let fechaHoy = new Date();   

    const [hours] = hinicio.split(':');
    let hora   = parseInt(fechaHoy.getHours())        
    let ihora   = parseInt(hours)    

    const [fours] = fin.split(':');    
    let fhora = parseInt(fours)
    console.log(hora)

    if(hora >= ihora && hora <= fhora ){
        return 'ABIERTO'
    }else{
        return 'CERRADO'
    }      
}