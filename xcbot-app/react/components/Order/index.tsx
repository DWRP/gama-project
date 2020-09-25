import React, { useState, useEffect } from 'react';
import { OrderProps } from '../../utils/interfaces';
import { schema } from '../../utils/schema';

export const Order = (props: any) => {
  let [data, setData] = useState<OrderProps[]>([])

  console.log(props.avatarIcon);

  useEffect(() => {
    let newData: OrderProps[] = JSON.parse(props.response.message)
    setData(newData)
  }, [])

  return (
    <div>
      {
        data.map((item: OrderProps, index: number) => {
          if (item.erro) {
            return (
              <>
                <div className="rcw-message rcw-message-order" key={index}>
                  <img src={props.avatarIcon} className="rcw-avatar" alt="profile" />
                  <div className="rcw-response">
                    <div className="rcw-message-text">
                      <p>Ops! Algo de errado aconteceu. Tente novamente!</p>
                    </div>
                  </div>
                </div>
                {console.log(item.erro)}
              </>
            )
          } else {
            return (
              <div className="rcw-message rcw-message-order" key={index}>
                <img src={props.avatarIcon} className="rcw-avatar" alt="profile" />
                <div className="rcw-response">

                  <div className="rcw-message-text">
                    <p>Certo! Aqui estão algumas informações que eu encontrei sobre o seu pedido.</p>
                    <br />
                    <div>
                      <span className="rcw-order-title">Numero:</span>
                      <p className="rcw-order-result">{item.orderId}</p>
                    </div>
                    <div>
                      <span className="rcw-order-title">Status:</span>
                      <p className="rcw-order-result">{item.statusDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })
      }
    </div>
  )
}

Order.schema = schema;