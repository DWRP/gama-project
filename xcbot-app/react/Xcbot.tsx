import React, { useState, useEffect } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Widget, addResponseMessage, renderCustomComponent } from 'react-chat-widget';
import './utils/style.global.css';

Amplify.configure(awsconfig);

interface ChatProps { }
interface CardProps {
  img?: string
  title?: string
}

const Card = (props: any) => {
  let [data, setData] = useState<CardProps[]>([])

  useEffect(() => {
    let newData: CardProps[] = []
    Object.keys(props).map((key: any) => {
      newData.push({ img: props[key].imageUrl, title: props[key].title })
    })

    setData(newData)
  }, [])

  return (
    <div>
      {
        data.map((item: CardProps, index: number) => <div key={index}><h3>{item.title}</h3><img src={item.img} alt="" style={{ maxWidth: "40px", maxHeight: "40px", }} /></div>)
      }
    </div>
  )
}

const Chat: StorefrontFunctionComponent<ChatProps> = ({ }) => {

  async function handleMsg(input: any) {

    const response = await Interactions.send(awsconfig.aws_bots_config[0].name, input);
    console.log(response)
    if (response.responseCard) {
      addResponseMessage(response.message)
      renderCustomComponent(Card, response.responseCard.genericAttachments)
      addResponseMessage("Essas são as opções")
    }
    else {
      addResponseMessage(response.message)
    }
  }

  useEffect(() => {
    addResponseMessage('Olá, em que posso te ajudar?')
  }, [])
  return (
    <Widget
      handleNewUserMessage={(event: any) => handleMsg(event)}
      title="Chatbot"
      senderPlaceHolder="Escreva sua mensagem"
      subtitle={false}
      profileAvatar="https://hiringcoders9.vtexassets.com/assets/vtex.file-manager-graphql/images/133ad9db-b1d4-4fa8-878a-00635dbaaa60___2ed90089707038a3e798b66150cdd1c5.png"
      showCloseButton={true}

    />
  )

}

export default Chat;
