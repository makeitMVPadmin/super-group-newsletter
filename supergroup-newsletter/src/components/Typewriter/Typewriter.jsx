import React, { useState, useEffect } from 'react';

export default function Typewriter() {
  const [text, setText] = useState('');
  const phrases = ['L','Lo','Loa','Load','Loadi','Loadin','Loading', 'Loading .', 'Loading . .', 'Loading . . .'];

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      setText(phrases[counter]);
      counter = (counter + 1) % phrases.length;
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <p>{text}</p>;
};