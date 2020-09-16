import React from 'react'
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Informations from './Informations'

interface CountdownProps { }

const bubbleStyle = {
  fontSize: '16px',
  fontFamily: 'Arial',
}
const floatingStyle = {
  right: '8px',
  bottom: '8px'
}
const bubbleOptionStyle = {
  background: '#5fb55e',
  cursor: 'pointer'
}
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#57DA56',
  headerFontColor: '#fff',
  headerFontSize: '20px',
  botBubbleColor: '#57DA56',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};


const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ }) => {

  const steps = [
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
      trigger: '4',
    },
    {
      id: '4',
      message: 'Eu acabei de nascer e ainda estou aprendendo para ajudar muito mais, por enquanto, posso te ajudar com os seguintes assuntos abaixo',
      trigger: 'type_select',
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
      component: (<Informations />),
      trigger: '9',
    },
    {
      id: '9',
      message: 'Espero que tenha conseguido te ajudar, Posso te ajudar com algo mais?',
      trigger: '10',
    },
    {
      id: '10',
      options: [
        {
          value: 'sim',
          label: 'Sim',
          trigger: '11'
        },
        {
          value: 'nao',
          label: 'Não',
          trigger: '12'
        },
      ],
    },
    {
      id: '11',
      message: 'Posso te ajudar com os seguintes assuntos abaixo',
      trigger: 'type_select',
    },
    {
      id: '12',
      message: 'Obrigado pelo seu contato e até breve!',
      end: true
    }

  ]
  return (
    <>
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps} botDelay="1800" bubbleOptionStyle={bubbleOptionStyle} floatingStyle={floatingStyle} bubbleStyle={bubbleStyle} headerTitle="ChatBot - XCoders" placeholder="Digite sua mensagem" floating="true" />
      </ThemeProvider>
    </>
  );
}

Countdown.schema = {
  title: 'ChatBot',
  description: 'Testando ChatBoot',
  type: 'object',
  properties: {},
}

export default Countdown
