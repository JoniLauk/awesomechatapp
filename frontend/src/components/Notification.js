import React from 'react';

export const Notification = (props) => {
  const { message } = props;

  const styles = {
    color: message.type === 'success' ? 'green' : 'red',
    listStyle: 'none',
  };

  const render = () => {
    if (typeof message.message === 'string') {
      return (
        <ul style={styles}>
          <li>{message.message}</li>
        </ul>
      );
    } else if (typeof message.message === 'object') {
      const m = message.message.map((x) => <li key={x.msg}>{x.msg}</li>);
      return <ul style={styles}>{m}</ul>;
    }
  };

  return render();
};
