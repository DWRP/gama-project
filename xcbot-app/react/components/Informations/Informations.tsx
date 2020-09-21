import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Loading } from 'react-simple-chatbot';

interface Orders {
  orderId: string
  statusDescription: string
  value: number
  erro: string
}

const Informations = () => {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Array<Orders>>([])
  const orderId = localStorage.getItem('orderId')

  useEffect(() => {
    async function loader() {
      const result = await axios.get(`https://xcoders-gama.herokuapp.com/orders/${orderId}`)
      const requisition: Array<Orders> = [result.data]
      setData(requisition)
      setLoading(false)
    }
    loader()
  }, [orderId])

  if(loading){

    return (
      <div style={{display:"flex !important",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <h4>Carregando informação</h4>
          <Loading />
      </div>
    )
  }else{
    return (
      <>
        {
          data.map((item: Orders) => item.erro ? item.erro : <div key={item.orderId}>
              <h3>Informações do Pedido</h3>
              <p>Numero: {item.orderId}</p>
              <p>Status: {item.statusDescription}</p>
              <p>Valor: R$ {item.value}</p>
            </div>
          )
        }
      </>
    );
  }
  
}

export default Informations
