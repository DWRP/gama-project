import React, { useState, useEffect } from 'react';
import { OrderProps } from '../../utils/interfaces';

export const Order = (props: any) => {
  let [data, setData] = useState<OrderProps[]>([])

  useEffect(() => {
    let newData: OrderProps[] = JSON.parse(props.message)
    setData(newData)
    console.log(newData)
  }, [])

  return (
    <div>
      {
        data.map((item: OrderProps, index: number) => {
          if (item.erro) {
            return (
              <h3>{item.erro}</h3>
            )
          }
          else {
            return (
              <div key={index}>
                <h4>{item.orderId}</h4>
                <h5>{item.statusDescription}</h5>
              </div>
            )
          }
        })
      }
    </div>
  )
}