import React from 'react'
import ChatBot from 'react-simple-chatbot';
import styled, { ThemeProvider } from 'styled-components';
// import { FaHeadset } from 'react-icons/fa'

interface CountdownProps { }

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

const steps = [
  {
    id: '1',
    message: 'Qual numero do seu pedido?',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: 'Pedido {previousValue}, está em separação!',
    end: true,
  },
]
const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ }) => {

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

Countdown.schema = {
  title: 'ChatBot',
  description: 'Testando ChatBoot',
  type: 'object',
  properties: {},
}

export default Countdown
