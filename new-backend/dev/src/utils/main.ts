import { resolve } from 'path'
import {
    readFile,
    writeFile
} from 'fs'

import {
    promisify
} from 'util'

const rdAsync = promisify(readFile)
const wrAsync = promisify(writeFile)

class Utils{
    
    async loadRoutes(){
        const file = await rdAsync(resolve(__dirname,'..','..','routes.ts'))
        let routes = file.toString().split('\n')
        routes = routes.filter(item=>item!=='')
        routes = routes.filter(item=>item.includes('routes.'))
        routes = routes.map(item=>item
                                    .replace('routes.get(','')
                                    .replace('routes.post(','')
                                    .replace('routes.put(','')
                                    .replace('routes.patch(','')
                                    .replace('routes.delete(','')
                                    .replace('/','')
                                    .replace("'",'')
                                    .replace("'",''))

        routes = routes.map(item=>item.replace(item.substring(item.indexOf(','),item.length),''))
        
        routes.shift()

        const data = routes.map((item,index)=>{
            return {
                id:index,
                endpoint:item
            }
        })

        let database = await rdAsync(resolve(__dirname,'..','..','public','database','routes.json'))
        
        database = JSON.parse(database.toString())

        const newData = [
            ...data,
            database
        ]

        await wrAsync(
            resolve(__dirname,'..','..','public','database','routes.json'),
            JSON.stringify(data)
        )
    }
}


export default new Utils()