import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Loading } from 'react-simple-chatbot';

interface InformationsProps { }

interface Orders {
  orderId: string
  statusDescription: string
  value: number
  erro: string
}


const Informations: StorefrontFunctionComponent<InformationsProps> = ({ }) => {
  const [ data , setData ] = useState<Array<Orders>>([])
  const orderId = localStorage.getItem('orderId')

  useEffect(()=>{
      async function loading(){
        const result = await axios.get(`https://xcoders-gama.herokuapp.com/dwrp/orders/${orderId}`)
        console.log(result.data)
        const requisition:Array<Orders> = [result.data]
        setData(requisition)
      }
      loading()
  },[orderId])

  return (
    <>
      <div>
        {data!==[]?data.map((item:Orders)=>item.erro?item.erro:<div><p>ID: {item.orderId}</p><p>Status: {item.statusDescription}</p><p>Valor: {item.value}</p></div>):<Loading />}
      </div>
    </>
  );
}

Informations.schema = {
  title: 'Xcinfos',
  description: 'Xcoders ChatBot Infos',
  type: 'object',
  properties: {},
}

export default Informations
