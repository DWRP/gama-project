import { json } from 'body-parser'
import { Request, Response } from 'express'
import api from '../../utils/api'

class OrderController {
    async index (req:Request,res:Response){
        
        return res.send({
            description: "Show all"
        })
    }

    async show (req:Request,res:Response){
        const { shop, id } = req.params
        let erro = ""

        const worspace = shop?shop+"--":""
        const result = await api.get(`https://${worspace}${process.env.API_URL}/oms/pvt/orders/${id}`)
        
        const jsonResult = JSON.parse(JSON.stringify(result.data))
        let data = {}

        if(jsonResult.error){
            data = {
                orderId : "",
                statusDescription : "",
                value : "",
                erro : jsonResult.error.message
            }
        }else{
            const {orderId, statusDescription, value } = jsonResult
            data = {
                orderId,
                statusDescription,
                value,
                erro : ""
            }
        }

        return res.json(data)
    }

    async create (req:Request,res:Response){
        const { id, name } = req.body

        return res.send({
            description: "create any"
        })
    }
    
    async delete (req:Request,res:Response){
        const { id } = req.params

        return res.send({
            description: "delete any"
        })
    }
}

export default new OrderController()