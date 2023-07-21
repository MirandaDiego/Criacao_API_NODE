//PADRAO REST
import { Router } from "express";
import multer from "multer";
import * as ApiController from '../controllers/apiController';



//config. simples: para  onde vai o arquivo:

/*const upload = multer({
    dest: './tmp'

}) */


const storageConfig  = multer.diskStorage({
    destination: (req, file, cb) => {
        //destino do arquivo:
        cb(null, './tmp')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+'-'+Date.now())
    }
}); 


const upload = multer({
    storage: storageConfig
}); 



const router = Router()

router.get('/ping', ApiController.ping)
router.get('/random', ApiController.random )
router.get('/nome/:nome', ApiController.nome)

router.post('/frases', ApiController.createPhrase);
router.get('/frases', ApiController.listPhrases)
router.get('/frase/aleatoria', ApiController.randomPhrase)
router.get('/frase/:id', ApiController.getPhrases)
router.put('/frase/:id', ApiController.updatePhrase)
router.delete('/frase/:id', ApiController.deletePhrase);

//ROTA,  CALLBACK DE UPLOAD, ROTA
//receber um arquivo somente:
//router.post('/upload', upload.single('avatar'), ApiController.uploadFile);

//receber dois arquivos:
//router.post('/upload', upload.array('avatares', 2), ApiController.uploadFile);


//Recebimentos de varios arquivos diferentes juntos:
 /*router.post('/upload', upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'gallery', maxCount: 3}
]), ApiController.uploadFile) */

router.post('/upload', upload.single('avatar'), ApiController.uploadFile);



export default router;