import React, { useEffect } from 'react';
import './utils/style.global.css';
//AWS
import Amplify, { Interactions } from 'aws-amplify';
import awsconfig from './aws-exports';
//
import {
  Widget,
  addResponseMessage,
  addUserMessage,
  renderCustomComponent
}
  from 'react-chat-widget';
import { ChatProps } from './utils/interfaces';
import { Card } from './components/Card';
import { Order } from './components/Order';

Amplify.configure(awsconfig);

const Chat: StorefrontFunctionComponent<ChatProps> = ({ chatName, avatarIcon, placeHolder }) => {

  async function handleMsg(input: any) {

    const response = await Interactions.send(awsconfig.aws_bots_config[0].name, input);

    console.log(response)
    let product = undefined
    let numPedido = undefined

    if (response.slots !== undefined) {
      product = response.slots.product
      numPedido = response.slots.numPedido
    }

    if (product) {
      renderCustomComponent(Card, response)
      return
    }

    if (numPedido) {
      renderCustomComponent(Order, response)
      return
    }

    addResponseMessage(response.message)

  }

  useEffect(() => {
    addResponseMessage('Olá, eu sou o Joseph, seu bot pessoal, em que posso te ajudar hoje?')
    renderCustomComponent(() => {
      function handleOption(option: string) {
        addUserMessage(option)
        handleMsg(option)
      }
      return (
        <div>
          <button className="button-bot-option" onClick={() => {
            handleOption('Informações sobre meu pedido')
          }}>Info Pedido</button>
          <button className="button-bot-optison" onClick={() => {
            handleOption('Comprar produtos')
          }}>Comprar Produtos</button>
          <button className="button-bot-option" onClick={() => {
            handleOption('Rastrear meu pedido')
          }}>Rastreio</button>
        </div>
      )
    }, '')
  }, [])
  console.log(avatarIcon);
  return (
    <Widget
      handleNewUserMessage={(event: any) => handleMsg(event)}
      title={chatName}
      senderPlaceHolder={placeHolder}
      subtitle={false}
      profileAvatar="https://hiringcoders9.vtexassets.com/assets/vtex.file-manager-graphql/images/133ad9db-b1d4-4fa8-878a-00635dbaaa60___2ed90089707038a3e798b66150cdd1c5.png"
      showCloseButton={true}
    />
  )

}

Chat.schema = {
  title: 'ChatBot',
  description: 'Testando ChatBoot',
  type: 'object',
  properties: {
    chatName: {
      title: 'Titulo',
      description: 'nome do chatbot',
      type: 'string',
      default: "Chatbot"
    },
    avatarIcon: {
      title: 'Avatar',
      description: 'Avatar do bot',
      type: 'string',
      default: "-",
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    placeHolder: {
      title: 'Place Holder',
      description: 'Observação da caixa de texto do chat',
      type: 'string',
      default: "Escreva sua mensagem"
    },
  },
}

export default Chat;
