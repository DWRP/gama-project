import React from 'react'
import ChatBot from 'react-simple-chatbot';
import styled, { ThemeProvider } from 'styled-components';
import Informations from './Informations'
// import axios from 'axios'

interface XcbotProps { }

const ChatBox = styled.div`
  display: block;
  position: fixed;
  bottom: 0;
  right: 15px;
  z-index: 999;
`;
// all available props
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#57DA56',
  headerFontColor: '#fff',
  headerFontSize: '18px',
  botBubbleColor: '#57DA56',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};


const Xcbot: StorefrontFunctionComponent<XcbotProps> = ({ }) => {

  const steps = [
    {
      id: '1',
      message: 'Por favor, informe o ID do seu produto:',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      validator: (value:string)=>{
        console.log(value)
        localStorage.setItem('orderId',value)
        return true
      },
      trigger: '3',
    },
    {
      id: '3',
      component: (<Informations />),
      end: true
    }
  ]
  return (
    <>
      <ChatBox>
        <ThemeProvider theme={theme}>
          <ChatBot steps={steps} floating="true" />
        </ThemeProvider>
      </ChatBox>
    </>
  );
}

Xcbot.schema = {
  title: 'Xcbot',
  description: 'Xcoders ChatBot',
  type: 'object',
  properties: {},
}

export default Xcbot
