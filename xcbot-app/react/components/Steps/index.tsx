import React from 'react'
import Theme from '../Theme'
const steps = (ChatComponent:StorefrontFunctionComponent)=>{
    return ([
        {
      id: '1',
      message: 'Olá, eu sou o Joseph, qual o seu nome?',
      trigger: '2',
    },
    {
        id: '2',
      user: true,
      trigger: '3',
    },
    {
        id: '3',
      message: 'Olá {previousValue}! Muito prazer',
      trigger: '10',
    },
    {
        id: 'type_select',
        options: [
            {
                value: 'rastreio',
          label: 'Informações sobre Pedido',
          trigger: '5'
        },
    ],
},
{
    id: '5',
    message: 'Certo! Vou te ajudar a encontrar seu pedido',
    trigger: '6',
    },
    

    {
        id: '6',
        message: 'Por favor, informe o Numero do seu pedido',
      trigger: '7',
    },
    {
        id: '7',
      user: true,
      validator: (value: string) => {
        localStorage.setItem('orderId', value)
        return true
      },
      trigger: '8',
    },
    {
        id: '8',
        component: (<div style={Theme.infos}><ChatComponent /></div>),
        trigger: '9',
    },
    {
      id: '9',
      message: 'Espero que tenha conseguido te ajudar!',
      trigger: '11',
    },
    {
      id: '10',
      message: 'Posso te ajudar com os seguintes assuntos abaixo:',
      trigger: 'type_select',
    },
    {
      id: '11',
      message: 'Posso te ajudar com algo mais? Basta escolher uma opção:',
      trigger: 'type_select',
    }
  ])
}

export default steps