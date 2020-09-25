import React, { useState, useEffect } from 'react';
import { CardProps } from '../../utils/interfaces';

export const Card = (props: any) => {
  let [data, setData] = useState<CardProps[]>([])

  useEffect(() => {
    let newData: CardProps[] = JSON.parse(props.message)
    setData(newData)
  }, [])

  return (
    <div>
      {
        (data ?
          data.map((item: CardProps) => {
            return (
              <div key={item.id}>
                <h4>{item.title}</h4>
                <img src={item.imageUrl} alt="" />
                <h5>R$ {item.price}</h5>
              </div>
            )
          })
          :
          'Produto não encontrado'
        )

      }
    </div>
  )
}
