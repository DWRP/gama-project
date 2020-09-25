import React, { useState ,useEffect } from 'react';
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
  const [userInfos,setUserInfos] = useState({
    name: '',
    email: '',
    cpf: ''

  })

  async function handleMsg(input: any) {
    if(localStorage.getItem('cartClosed') === 'true'){
        if(!userInfos.email){
          setUserInfos({...userInfos, email:input})
          addResponseMessage('Para continuarmos, gostariamos de saber seu nome completo.')
          return
        }
        else if(!userInfos.name){
          setUserInfos({...userInfos, name:input})
          addResponseMessage('Agora, para geramos o boleto, informe seu cpf.')
          return
        }
        else if(!userInfos.cpf){
          setUserInfos({...userInfos, cpf:input})
          addResponseMessage('Obrigado pelas infmormações.')
          if(userInfos.name && userInfos.email){
            addResponseMessage('Aguarde um momento, estamos finalizando sua compra!.')
            localStorage.setItem('cartClosed','false')
            // const response = await Interactions.send(awsconfig.aws_bots_config[0].name, input);
            
            // return
          }
        }
        

    }else{
      const response = await Interactions.send(awsconfig.aws_bots_config[0].name, input);
  
      let product = undefined
      let numPedido = undefined
      let intentName = undefined
  
      if (response.slots !== undefined) {
        product = response.slots.product
        numPedido = response.slots.numPedido
        intentName = response.slots.intentName
      }
  
      if (product) {
        // addResponseMessage("Achei alguns produtos que podem ser do seu interesse, dê uma olhada.");
        renderCustomComponent(Card, response);
        return;
      }
      if (numPedido) {
        renderCustomComponent(Order, { response, avatarIcon })
        return;
      }
      if (intentName == 'Help') {
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
                }}>Comprar</button>
                <button className="button-bot-option" onClick={() => {
                  handleOption('Rastrear meu pedido')
                }}>Rastrear</button>
              </div>
            </div>
          )
        }, '')
        return;
      }
      addResponseMessage(response.message)
    }
    

  }

  useEffect(() => {
    localStorage.setItem('cartClosed','false')
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
            }}>Comprar</button>
            <button className="button-bot-option" disabled onClick={() => {
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
