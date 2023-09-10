import KeyToken from '../../functions/keyToken'
import usuarios from './usuarioRoute'
import empresa from './empresaRoute'
import files from './fileRoute' 
import clientes from './clienteRoute'
import stock from './stockRoute'
import venta from './ventaRoute'
import nota from './notaRoute'
import productos from './productoRoute'
import categoria from './categoriaRoute'
import informe from './informeRoute'  
import tpdv from './tpdvRoute'
import sucursal from './sucursalRoute'
import horario from './horarioRoute'
import cate from './cateRoute'
import consultas from './consultasRoute'
import trabajo from './trabajoRoute'

export default(app) =>{    
    app.use('/api/clientes',clientes)    
    app.use('/api/sucursales',sucursal)
    app.use('/api/usuarios',usuarios) 
    app.use('/api/horarios',horario)
    app.use('/api/cates',cate)    
    app.use('/api/empresas',KeyToken,empresa)   
    app.use('/api/files',files)     
    app.use('/api/stock',stock)    
    app.use('/api/ventas',KeyToken,venta)
    app.use('/api/notas',KeyToken,nota)    
    app.use('/api/productos',KeyToken,productos)
    app.use('/api/categorias',categoria)    
    app.use('/api/informes',KeyToken,informe)
    app.use('/api/tpdvs',KeyToken,tpdv)    
    app.use('/api/consultas',consultas)    
    app.use('/api/trabajos',trabajo)
    
  }