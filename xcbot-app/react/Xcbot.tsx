import React, { useState } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import { ChatFeed, Message } from 'react-chat-ui'
import awsconfig from './aws-exports'
import { styles, ChatBot } from './utils/styles'
import awsmobile from './aws-exports';
import styled from 'styled-components';

Amplify.configure(awsconfig);

const GlobalStyle = styled.div`
  #chat-panel {
    height: 350px;
  }
`
interface ChatProps { }
const Chat: StorefrontFunctionComponent<ChatProps> = ({ }) => {
  let newMessages

  const [state, setState] = useState({
    input: '',
    finalMessage: '',
    messages: [
      new Message({
        id: 1,
        message: "Olá, em que posso te ajuda hoje?",
      })
    ]
  })

  async function submitMessage() {
    const { input } = state
    if (input === '') return

    const message = new Message({
      id: 0,
      message: input,
    })

    newMessages = [...state.messages, message]

    const response = await Interactions.send(awsmobile.aws_bots_config[0].name, input);

    const responseMessage = new Message({
      id: 1,
      message: response.message
    })

    newMessages = [...newMessages, responseMessage]

    setState({ ...state, messages: newMessages, input: '' })

    if (response.dialogState === 'Fulfilled') {
      if (response.intentName === 'OrderFlowers') {
        const finalMessage = `a`
        setState({ ...state, finalMessage })
      }
    }
  }

  function onChange(e: any) {
    const input = e.target.value
    setState({ ...state, input })
  }

  const _handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      submitMessage()
    }
  }

  return (
    <div style={ChatBot}>
      <header style={styles.header} >
        <p style={styles.headerTitle}>
          ChatBot - Joseph
        </p>
      </header>
      <div style={styles.messagesContainer} >
        <GlobalStyle>
          <ChatFeed
            messages={state.messages}
            hasInputField={false}
            bubbleStyles={styles.bubbleStyles}
          />
          <input
            onKeyPress={_handleKeyPress}
            onChange={onChange}
            style={styles.input}
            value={state.input}
            placeholder="Digite aqui sua mensagem"
          />
        </GlobalStyle>
      </div>
    </div>
  )
}

export default Chat;
