import React from 'react';

export const Notification = (props) => {
  const { message } = props;
  console.log(message);

  const m = message.map((x) => <li key={x.msg}>{x.msg}</li>);

  return (
    <div>
      <ul>{m}</ul>
    </div>
  );
};
