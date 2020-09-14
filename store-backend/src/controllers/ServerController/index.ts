import { Request, Response, response } from 'express'
import { resolve } from 'path'
import { readFile } from 'fs'
import { promisify } from 'util'

const rdAsync = promisify(readFile)

class ServerController {
    async index (req:Request,res:Response){
        const file = await rdAsync(resolve(__dirname,'..','..','views','index.html'))
        res.write(file)
        return res.end()
    }

    async status(req:Request,res:Response){
        try{
            return res.send({runing:true})
        }
        catch(error){
            return res.send({error})
        }
    }
}


export default new ServerController()