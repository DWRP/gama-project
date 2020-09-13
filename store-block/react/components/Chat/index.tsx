import React from 'react';
import './style.css';
import styled from 'styled-components';

const OpenButton = styled.button`
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 280px;
`;
const ChatPopUp = styled.div`
  display: block;
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
`;
const Form = styled.form`
  max-width: 300px;
  padding: 10px;
  background-color: white;
  textarea{
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    border: none;
    background: #f1f1f1;
    resize: none;
    min-height: 200px;
  }
`;

const Chat = () => {
  const openForm = () => {
    console.log('teste');
  }
  return (
    <div>
      <ChatPopUp id="myForm">
        <Form action="/action_page.php">
          <h1>Chat</h1>
          <label><b>Message</b></label>
          <textarea placeholder="Type message.." name="msg" required></textarea>

          <button type="submit" className="btn">Send</button>
          <button type="button" className="btn cancel">Close</button>
        </Form>
      </ChatPopUp>
      <OpenButton onClick={() => { openForm() }}>Chat</OpenButton>
    </div>
  );
}

export default Chat;
