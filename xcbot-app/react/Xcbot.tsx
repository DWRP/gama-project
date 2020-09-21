import React from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import Theme from './components/Theme'
import Informations from './components/Informations/Informations'
import stepsBase from './components/Steps'

interface XcbotProps {
  chatName: string
  avatarIcon: string
  chatIcon: string
}

const Xcbot: StorefrontFunctionComponent<XcbotProps> = ({ chatName, avatarIcon, chatIcon }) => {

  const steps = stepsBase(Informations)
  return (
    <>
      <ThemeProvider theme={Theme.theme}>
        <ChatBot 
          steps={steps}
          botDelay="1000" 
          bubbleOptionStyle={Theme.bubbleOptionStyle} 
          floatingStyle={Theme.floatingStyle} 
          bubbleStyle={Theme.bubbleStyle} 
          headerTitle={chatName}
          floatingIcon={avatarIcon}
          botAvatar={chatIcon}
          placeholder="Digite sua mensagem"
          floating="true" />
      </ThemeProvider>
    </>
  );
}

Xcbot.schema = {
  title: 'ChatBot',
  description: 'Testando ChatBoot',
  type: 'object',
  properties: {
    chatName:{
      title: 'Titulo',
      description: 'nome do chatbot',
      type: 'string',
      default:"ChatBot - XCoders"
    },
    avatarIcon:{
      title: 'Avatar',
      description: 'Avatar do bot',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    chatIcon:{
      title: 'Icone',
      description: 'Icone do chat',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    }
  },
}

export default Xcbot