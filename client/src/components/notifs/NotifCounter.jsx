import React from 'react';
import NotifCounterContainer from '../../styled/Notif/NotifCounterContainer';

function NotifCounter({ notifs }) {
  return notifs.filter(not => !not.read).length > 0 && (
    <NotifCounterContainer>
      {notifs.filter(not => !not.read).length}
    </NotifCounterContainer>
  )
}

export default NotifCounter;
