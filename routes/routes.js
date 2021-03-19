const router = require('express').Router();

//importar las rutas
const homeRoute = require('./autor');
const operationsRoute = require('./servicio');

//se hacen los paths con la ruta
router.use('/autor', homeRoute);
router.use('/servicio', operationsRoute);

//se instancia el path con retorno directo
router.use('/', (req, res) => {
    res.json(
        {
            version: "0.0.1",
            paths: [
                "/autor",
                "/servicio"
            ]           
        }
    )
})

//ruta para el livenessprove del yaml a realizar para el eks y kubernets
router.use('/revisasivivo', (req,res)=>{
    res.send(
        {
           status:"working" 
        }
    )
})

module.exports = router;