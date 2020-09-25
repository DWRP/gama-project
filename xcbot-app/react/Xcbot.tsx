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
import { schema } from './utils/schema';

Amplify.configure(awsconfig);

const Chat: StorefrontFunctionComponent<ChatProps> = ({ chatName, avatarIcon, placeHolder }) => {

  async function handleMsg(input: any) {

    const response = await Interactions.send(awsconfig.aws_bots_config[0].name, input);

    let product = undefined
    let numPedido = undefined

    if (response.slots !== undefined) {
      product = response.slots.product
      numPedido = response.slots.numPedido
    }

    if (product) {
      addResponseMessage("Achei alguns produtos que podem ser do seu interesse, dê uma olhada.");
      renderCustomComponent(Card, response);
      return;
    }

    if (numPedido) {
      renderCustomComponent(Order, { response, avatarIcon })
      return;
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
        <div className="sug-container">
          <h5>Sugestões:</h5>
          <div className="button-container">
            <button className="button-bot-option" onClick={() => {
              handleOption('Informações sobre meu pedido')
            }}>Info Pedido</button>
            <button className="button-bot-option" onClick={() => {
              handleOption('Comprar produtos')
            }}>Comprsar</button>
            <button className="button-bot-option" onClick={() => {
              handleOption('Rastrear meu pedido')
            }}>Rastrear</button>
          </div>
        </div>
      )
    }, '')
  }, [])

  return (
    <Widget
      handleNewUserMessage={(event: any) => handleMsg(event)}
      title={chatName}
      senderPlaceHolder={placeHolder}
      subtitle={false}
      profileAvatar={avatarIcon}
      showCloseButton={true}
    />
  )

}

Chat.schema = schema;

export default Chat;
