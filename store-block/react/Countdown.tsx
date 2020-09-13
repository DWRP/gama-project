import React from 'react';
import Chat from './components/Chat';

interface CountdownProps { }

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ }) => {

  return (
    <div>
      <h1>CountDown Teste</h1>
      <Chat />
    </div>
  );
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default Countdown
