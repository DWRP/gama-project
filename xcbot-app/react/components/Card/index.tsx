import React, { useState, useEffect } from 'react';
import { CardProps } from '../../utils/interfaces';
import {
  addResponseMessage
}
  from 'react-chat-widget';

import { FaCartPlus } from 'react-icons/fa';
import {
  ButtonSum
}
  from './Button';
export const Card = (props: any) => {
  let [data, setData] = useState<CardProps[]>([]);
  let [finishOrder,setFinish] = useState(false);

  useEffect(() => {
    let newData: CardProps[] = JSON.parse(props.message)
    localStorage.setItem('cartClosed','false')
    setData(newData)
  }, [])

  return (
    <div className="order-box">
      <div className="wrapper">
        <div className="wrapper_child">
          {
            (data && !finishOrder?
              data.map((item: CardProps) => {
                return (
                  <div className="tab" key={item.id}>
                    <img src={item.imageUrl} width="100%" />
                    <p className="title-box">{item.title}</p>
                    <p className="price-box"><span>R$</span> {item.price}</p>
                    <ButtonSum id={item.id} />
                  </div>
                )
              })
              :finishOrder? <div>Carrinho fechado!</div> :<div>Produto não encontrado</div>
            )
          }
        </div>
      </div>
      {
        (!finishOrder ?
          <div className="finish-order">
            <button onClick={()=>{
              localStorage.setItem('cartClosed','true')
              setFinish(true)
              addResponseMessage('Vamos continuar a compra.\nPor favor, informe seu email!')
              }}>Fechar carrinho<FaCartPlus /></button>
          </div>
          :
          ''
        )
      }
    </div>
  )
}
