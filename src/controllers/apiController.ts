import  { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { Phrase } from '../models/Phrase'


export const ping = (req: Request, res: Response)=>{
    res.json({pong:true})
}
export const random = (req: Request, res:Response) => {
    let nRand:number = Math.floor( Math.random() * 10)
    res.json({number: nRand});
}

export const nome = (req: Request, res:Response) =>{
    let nome:string = req.params.nome;
    res.json(`Nome: ${nome}`);
}


export const createPhrase = async (req: Request, res:Response) =>{
    let { author, txt} = req.body;

   let newPhrase = await Phrase.create({author, txt});
   
    res.status(201)
    res.json({id: newPhrase.id, author, txt}); 

}
export const listPhrases = async ( req: Request, res: Response)=>{
    let list = await Phrase.findAll()
    res.json({ list })
}

export const getPhrases = async ( req: Request, res: Response)=>{
    let { id } = req.params;

    let phrase = await Phrase.findByPk(id);
    if(phrase){
        res.json({ phrase })
    }else{
        res.json({error: 'Frase não encontrada'})
    }

  
}
export const updatePhrase = async (req: Request, res: Response) =>{
    let { id } = req.params;
    let {author, txt } = req.body;

    let phrase = await Phrase.findByPk(id);

    if(phrase){
        phrase.author = author;
        phrase.txt = txt;
        await phrase.save();

        res.json({ phrase });
    }else{
        res.json({error: 'Frasess não encontradas'})
    }
    
}
export const deletePhrase = async ( req: Request, res: Response)=>{
    let { id } = req.params;
    await Phrase.destroy({where: { id }})

    res.json({})
}
export const randomPhrase = async ( req:Request, res:Response)=>{
    let phrase = await Phrase.findOne({
        order:[
            Sequelize.fn('RAND')
        ]
    });
    if(phrase){
        res.json({ phrase })
    }else{
        res.json({ error: 'Não à frases cadastradas'})
    }
}

export const uploadFile = async (req: Request, res: Response)=>{  
    //para um arquivo:
    //console.log( req.file)

    //para dois arquivos:
    //console.log( req.files)

    //para os arquivos diferentes:
/*const files = req.files as { [fieldname: string]: Express.Multer.File[]};
    console.log("AVATAR", files.avatar)
    console.log("GALLERY", files.gallery) */

    console.log("FILE", req.file)
    console.log("FILES", req.files)

    res.json({})
}