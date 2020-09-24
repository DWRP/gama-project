import React, { useState, useEffect } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Widget, addResponseMessage, addUserMessage, renderCustomComponent } from 'react-chat-widget';
import './utils/style.global.css';

Amplify.configure(awsconfig);

interface ChatProps { 
  chatName: string
  avatarIcon: string
  placeHolder: string
}
interface CardProps {
  id: number
  title: string
  subTitle: string
  imageUrl: string
  price: number | string
  attachmentLinkUrl: string
}

interface OrderProps{
  orderId: string
  statusDescription: string
  erro: string
}

const Card = (props: any) => {
  let [data, setData] = useState<CardProps[]>([])

  useEffect(() => {
    let newData:CardProps[] = JSON.parse(props.message)
    setData(newData)
  }, [])

  return (
    <div>
      {
        data.map((item: CardProps) => {
          
          return (
            <div key={item.id}>
              <h4>{item.title}</h4>
              <img src={item.imageUrl} alt="" />
              <h5>R$ {item.price}</h5>
            </div>
          )
        })
      }
    </div>
  )
}

const Order = (props: any) => {
  let [data, setData] = useState<OrderProps[]>([])

  useEffect(() => {
    let newData:OrderProps[] = JSON.parse(props.message)
    setData(newData)
    console.log(newData)
  }, [])

  return (
    <div>
      {
        data.map((item: OrderProps, index: number) => {
          if(item.erro){
            return (
              <h3>{item.erro}</h3>
            )
          }
          else{
            return (
              <div key={index}>
                <h4>{item.orderId}</h4>
                <h5>{item.statusDescription}</h5>
              </div>
            )
          }
        })
      }
    </div>
  )
}


const Chat: StorefrontFunctionComponent<ChatProps> = ({ chatName, avatarIcon, placeHolder }) => {

  async function handleMsg(input: any) {

    const response = await Interactions.send(awsconfig.aws_bots_config[0].name, input);
    
    console.log(response)
    let product = undefined
    let numPedido =  undefined

    if(response.slots !== undefined){
      product = response.slots.product
      numPedido =  response.slots.numPedido
    }
    
    if(product){
      renderCustomComponent(Card, response)
      return
    }
    
    if(numPedido){
      renderCustomComponent(Order, response)
      return
    }
    
    addResponseMessage(response.message)
  
  }

  useEffect(() => {
    addResponseMessage('Olá, em que posso te ajudar?')
    renderCustomComponent(()=>{
      function handleOption(option:string) {
          addUserMessage(option)
          handleMsg(option)
      }
      return (
        <div>
          <button onClick={()=>{
            handleOption('comprar flores')
          }}>flores</button>
          <button onClick={()=>{
            handleOption('Comprar produtos')
          }}>produtos</button>
          <button onClick={()=>{
            handleOption('Comprar')
          }}>categoria</button>
        </div>
      )
    },'')
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

Chat.schema = {
  title: 'ChatBot',
  description: 'Testando ChatBoot',
  type: 'object',
  properties: {
    chatName:{
      title: 'Titulo',
      description: 'nome do chatbot',
      type: 'string',
      default:"Chatbot"
    },
    avatarIcon:{
      title: 'Avatar',
      description: 'Avatar do bot',
      type: 'string',
      default:"https://hiringcoders9.vtexassets.com/assets/vtex.file-manager-graphql/images/133ad9db-b1d4-4fa8-878a-00635dbaaa60___2ed90089707038a3e798b66150cdd1c5.png",
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    placeHolder:{
      title: 'Place Holder',
      description: 'Observação da caixa de texto do chat',
      type: 'string',
      default:"Escreva sua mensagem"
    },
  },
}
export default Chat;
