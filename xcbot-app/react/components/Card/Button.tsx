import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

export const ButtonSum = () => {
  let [input, setInput] = useState<number>(0);

  const increment = (input: any, setInput: Function) => {
    let total = input + 1;
    setInput(total);
  }
  const decrement = (input: any, setInput: Function) => {
    let total;
    if (input > 0) {
      total = input - 1;
    } else {
      total = 0;
    }
    setInput(total);
  }
  return (
    <div className="buttons-qtd-box">
      <button className="minus" onClick={() => { decrement(input, setInput) }}><FaMinus /></button>
      <input type="text" name="qtd" value={input} />
      <button className="plus" onClick={() => { increment(input, setInput) }}><FaPlus /></button>
    </div>
  )
}