import React from 'react';

export const Notification = (props) => {
  const { message } = props;
  console.log(message);

  const m = message.map((x) => <li key={x.msg}>{x.msg}</li>);

  const styles = {
    color: 'red',
  };

  return (
    <div>
      <ul style={styles}>{m}</ul>
    </div>
  );
};
