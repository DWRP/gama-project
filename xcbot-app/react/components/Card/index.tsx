import React, { useState, useEffect } from 'react';
import { CardProps } from '../../utils/interfaces';
import { FaPlus, FaMinus, FaCartPlus } from 'react-icons/fa';

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
                    <div className="buttons-qtd-box">
                      <button className="minus"><FaMinus /></button>
                      <input type="text" name="qtd" value="0" />
                      <button className="plus"><FaPlus /></button>
                    </div>
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
