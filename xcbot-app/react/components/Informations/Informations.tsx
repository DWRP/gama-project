import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Loading } from 'react-simple-chatbot';

interface InformationsProps { }

interface Orders {
  orderId: string
  statusDescription: string
  value: number
  erro: string
}

const Informations: StorefrontFunctionComponent<InformationsProps> = ({ }) => {
  const [data, setData] = useState<Array<Orders>>([])
  const orderId = localStorage.getItem('orderId')

  useEffect(() => {
    async function loading() {
      const result = await axios.get(`https://xcoders-gama.herokuapp.com/orders/${orderId}`)
      console.log(result.data)
      const requisition: Array<Orders> = [result.data]
      setData(requisition)
    }
    loading()
  }, [orderId])

  return (
    <>
      {
        data !== [] ? data.map((item: Orders) => item.erro ? item.erro : <div>
          <h3>Informações do Pedido</h3>
          <p>Numero: {item.orderId}</p>
          <p>Status: {item.statusDescription}</p>
          <p>Valor: R$ {item.value}</p>
        </div>
        ) : <Loading />
      }
    </>
  );
}

<<<<<<< HEAD
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
  
=======
Informations.schema = {
  title: 'ChatBotInfos',
  description: 'Testando ChatBotInfos',
  type: 'object',
  properties: {},
>>>>>>> master
}

export default Informations
