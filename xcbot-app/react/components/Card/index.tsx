import React, { useState, useEffect } from 'react';
import { CardProps } from '../../utils/interfaces';
import { FaCartPlus } from 'react-icons/fa';
import {
  ButtonSum
}
  from './Button';
export const Card = (props: any) => {
  let [data, setData] = useState<CardProps[]>([]);
  let finishOrder = false;

  useEffect(() => {
    let newData: CardProps[] = JSON.parse(props.message)
    setData(newData)
  }, [])

  return (
    <div className="order-box">
      <div className="wrapper">
        <div className="wrapper_child">
          {
            (data ?
              data.map((item: CardProps) => {
                { finishOrder = true }
                return (
                  <div className="tab" key={item.id}>
                    <img src={item.imageUrl} width="100%" />
                    <p className="title-box">{item.title}</p>
                    <p className="price-box"><span>R$</span> {item.price}</p>
                    <ButtonSum key={item.id} />
                  </div>
                )
              })
              :
              <div>Produto não encontrado</div>
            )
          }
        </div>
      </div>
      {
        (finishOrder ?
          <div className="finish-order">
            <button>Finalizar Compra <FaCartPlus /></button>
          </div>
          :
          ''
        )
      }
    </div>
  )
}
