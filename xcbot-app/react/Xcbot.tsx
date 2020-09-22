import React, { useState, useEffect } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
// import { ChatFeed, Message } from 'react-chat-ui'
import awsconfig from './aws-exports'
// import styles from './utils/styles'

import { Widget, addResponseMessage, renderCustomComponent } from 'react-chat-widget';
import styled from 'styled-components'

Amplify.configure(awsconfig);

const App = styled.div`
.rcw-conversation-container .rcw-header{background-color:#35cce6;border-radius:10px 10px 0 0;color:#fff;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;text-align:center;padding:15px 0 25px}.rcw-conversation-container .rcw-title{font-size:24px;margin:0;padding:15px 0}.rcw-conversation-container .rcw-close-button{display:none}.rcw-conversation-container .avatar{width:40px;height:40px;border-radius:100%;margin-right:10px;vertical-align:middle}.rcw-full-screen .rcw-header{border-radius:0;-ms-flex-negative:0;flex-shrink:0;position:relative}.rcw-full-screen .rcw-title{padding:0 0 15px}.rcw-full-screen .rcw-close-button{background-color:#35cce6;border:0;display:block;position:absolute;right:10px;top:20px;width:40px}.rcw-full-screen .rcw-close{width:20px;height:20px}@media screen and (max-width:800px){.rcw-conversation-container .rcw-header{border-radius:0;-ms-flex-negative:0;flex-shrink:0;position:relative}.rcw-conversation-container .rcw-title{padding:0 0 15px}.rcw-conversation-container .rcw-close-button{background-color:#35cce6;border:0;display:block;position:absolute;right:10px;top:20px;width:40px}.rcw-conversation-container .rcw-close{width:20px;height:20px}}.rcw-message{margin:10px;display:-ms-flexbox;display:flex;word-wrap:break-word}.rcw-timestamp{font-size:10px;margin-top:5px}.rcw-client{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin-left:auto}.rcw-client .rcw-message-text{background-color:#a3eaf7;border-radius:10px;padding:15px;max-width:215px;text-align:left}.rcw-client .rcw-timestamp{-ms-flex-item-align:end;align-self:flex-end}.rcw-response{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start}.rcw-response .rcw-message-text{background-color:#f4f7f9;border-radius:10px;padding:15px;max-width:215px;text-align:left}.rcw-message-text p{margin:0}.rcw-message-text img{width:100%;object-fit:contain}.rcw-avatar{width:40px;height:40px;border-radius:100%;margin-right:10px}.rcw-snippet{background-color:#f4f7f9;border-radius:10px;padding:15px;max-width:215px;text-align:left}.rcw-snippet-title{margin:0}.rcw-snippet-details{border-left:2px solid #35e65d;margin-top:5px;padding-left:10px}.rcw-link{font-size:12px}.quick-button{background:none;border-radius:15px;border:2px solid #35cce6;font-weight:700;padding:5px 10px;cursor:pointer;outline:0}.quick-button:active{background:#35cce6;color:#fff}.loader{margin:10px;display:none}.loader.active{display:-ms-flexbox;display:flex}.loader-container{background-color:#f4f7f9;border-radius:10px;padding:15px;max-width:215px;text-align:left}.loader-dots{display:inline-block;height:4px;width:4px;border-radius:50%;background:gray;margin-right:2px;animation:a .5s ease infinite alternate}.loader-dots:first-child{animation-delay:.2s}.loader-dots:nth-child(2){animation-delay:.3s}.loader-dots:nth-child(3){animation-delay:.4s}@keyframes a{0%{transform:translateY(0)}to{transform:translateY(5px)}}.rcw-messages-container{background-color:#fff;height:50vh;max-height:410px;overflow-y:scroll;padding-top:10px;-webkit-overflow-scrolling:touch}.rcw-full-screen .rcw-messages-container{height:100%;max-height:none}@media screen and (max-width:800px){.rcw-messages-container{height:100%;max-height:none}}.rcw-sender{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;background-color:#f4f7f9;height:45px;padding:5px;border-radius:0 0 10px 10px}.rcw-sender.expand{height:55px}.rcw-new-message{width:100%;border:0;background-color:#f4f7f9;height:30px;padding-left:15px;resize:none}.rcw-new-message:focus{outline:none}.rcw-new-message.expand{height:40px}.rcw-send{background:#f4f7f9;border:0}.rcw-send .rcw-send-icon{height:25px}@media screen and (max-width:800px){.rcw-sender{border-radius:0;-ms-flex-negative:0;flex-shrink:0}}.quick-buttons-container{background:#fff;overflow-x:auto;white-space:nowrap;padding:10px}.quick-buttons-container .quick-buttons{list-style:none;padding:0;margin:0;text-align:center}.quick-buttons-container .quick-buttons .quick-list-button{display:inline-block;margin-right:10px}@media screen and (max-width:800px){.quick-buttons-container{padding-bottom:15px}}.rcw-conversation-container{border-radius:10px;box-shadow:0 2px 10px 1px #b5b5b5}.rcw-conversation-container.active{opacity:1;transform:translateY(0);transition:opacity .3s ease,transform .3s ease}.rcw-conversation-container.hidden{z-index:-1;pointer-events:none;opacity:0;transform:translateY(10px);transition:opacity .3s ease,transform .3s ease}.rcw-full-screen .rcw-conversation-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:100%}@media screen and (max-width:800px){.rcw-conversation-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:100%}}.rcw-launcher .rcw-badge{position:fixed;top:-10px;right:-5px;background-color:red;color:#fff;width:25px;height:25px;text-align:center;line-height:25px;border-radius:50%}.rcw-launcher{-webkit-animation-delay:0;-webkit-animation-duration:.5s;-webkit-animation-name:d;-webkit-animation-fill-mode:forwards;-moz-animation-delay:0;-moz-animation-duration:.5s;-moz-animation-name:d;-moz-animation-fill-mode:forwards;animation-delay:0;animation-duration:.5s;animation-name:d;animation-fill-mode:forwards;-ms-flex-item-align:end;align-self:flex-end;background-color:#35cce6;border:0;border-radius:50%;box-shadow:0 2px 10px 1px #b5b5b5;height:60px;margin-top:10px;cursor:pointer;width:60px}.rcw-launcher:focus{outline:none}.rcw-open-launcher{-webkit-animation-delay:0;-webkit-animation-duration:.5s;-webkit-animation-name:c;-webkit-animation-fill-mode:forwards;-moz-animation-delay:0;-moz-animation-duration:.5s;-moz-animation-name:c;-moz-animation-fill-mode:forwards;animation-delay:0;animation-duration:.5s;animation-name:c;animation-fill-mode:forwards}.rcw-close-launcher{width:20px;-webkit-animation-delay:0;-webkit-animation-duration:.5s;-webkit-animation-name:b;-webkit-animation-fill-mode:forwards;-moz-animation-delay:0;-moz-animation-duration:.5s;-moz-animation-name:b;-moz-animation-fill-mode:forwards;animation-delay:0;animation-duration:.5s;animation-name:b;animation-fill-mode:forwards}@media screen and (max-width:800px){.rcw-launcher{bottom:0;margin:20px;position:fixed;right:0}.rcw-hide-sm{display:none}}.rcw-previewer-container{width:100vw;height:100vh;background:rgba(0,0,0,.75);overflow:hidden;position:fixed;z-index:9999;left:0;top:0}.rcw-previewer-container .rcw-previewer-image{position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;transition:all .3s ease}.rcw-previewer-container .rcw-previewer-tools{position:fixed;right:16px;bottom:16px;-ms-flex-direction:column;flex-direction:column}.rcw-previewer-container .rcw-previewer-button,.rcw-previewer-container .rcw-previewer-tools{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.rcw-previewer-container .rcw-previewer-button{padding:0;margin:16px;box-shadow:0 3px 8px 0 rgba(0,0,0,.3);border-radius:50%;width:32px;height:32px;outline:none;background-color:#fff;border:none}.rcw-previewer-container .rcw-previewer-close-button{position:absolute;right:0;top:0}.rcw-previewer-container .rcw-previewer-veil{width:100%;height:100%;overflow:scroll;position:relative}@keyframes b{0%{transform:rotate(-90deg)}to{transform:rotate(0)}}@keyframes c{0%{transform:rotate(90deg)}to{transform:rotate(0)}}@keyframes d{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.rcw-widget-container{bottom:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin:0 20px 20px 0;max-width:370px;position:fixed;right:0;width:90vw;z-index:9999}.rcw-full-screen{height:100vh;margin:0;max-width:none;width:100%}@media screen and (max-width:800px){.rcw-widget-container{height:100%;height:100vh;margin:0;max-width:none;width:100%}}.rcw-previewer .rcw-message-img{cursor:pointer}
`

interface ChatProps {}
interface CardProps {
  img?: string
  title?: string
}

const Card = (props:any)=>{
  let [data,setData] = useState<CardProps[]>([])

  useEffect(()=>{
    let newData:CardProps[] = []
    Object.keys(props).map((key:any)=>{
      newData.push({img:props[key].imageUrl,title:props[key].title})
      })
    
    setData(newData)
  },[])

  return(
    <div>
      {
        data.map((item:CardProps, index: number)=><div key={index}><h3>{item.title}</h3><img src={item.img} alt="" style={{maxWidth:"40px",maxHeight:"40px",}}/></div>)
      }
    </div>
  )
}

const Chat:StorefrontFunctionComponent<ChatProps> = ({})=>{

  async function handleMsg (input:any){

    const response = await Interactions.send(awsconfig.aws_bots_config[0].name, input);
    console.log(response)
    if(response.responseCard){
      addResponseMessage(response.message)
      renderCustomComponent(Card,response.responseCard.genericAttachments)
      addResponseMessage("Essas são as opções")
    }
    else{
      addResponseMessage(response.message)
    }
  }

  useEffect(()=>{
    addResponseMessage('Olá, em que posso te ajudar?')
  },[])
  return(
      <App>
        <Widget
            handleNewUserMessage={(event:any)=>handleMsg(event)}
        />
      </App>
  )
}

export default Chat;
