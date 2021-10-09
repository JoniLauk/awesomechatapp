import React from 'react';

export const Notification = (props) => {
  const { message } = props;

  /**
   * Handles how notifications are displayed. Notification message can be of type
   * string and a object.
   * @returns unordered list containing notification message content.
   */
  const render = () => {
    if (typeof message.message === 'string') {
      return (
        <ul className="notification">
          <li>{message.message}</li>
        </ul>
      );
    } else if (typeof message.message === 'object') {
      const m = message.message.map((x) => <li key={x.msg}>{x.msg}</li>);
      return <ul className="notification">{m}</ul>;
    } else {
      return null;
    }
  };

  return render();
};
