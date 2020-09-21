import React, {useState, useEffect} from 'react';
import Login from './Login'
import useLocalStorage from './custom_hooks/useLocalStorage'
import Dashboard from './Dashboard';
import { ContactsProvider } from './Context/useContacts'
import { ConversationProvider } from './Context/useConversations'
import { SocketProvider, useSocket} from './Context/useSockets'
import uuid from 'react-uuid'
function App() {
  //const [userId, setUserId] = useLocalStorage('id')

  const [userId, setUserId] = useState(uuid())

  const dashboard = () => {
    return (
      <SocketProvider userId={userId}>
        <ContactsProvider>
          <ConversationProvider userId={userId}>
            <Dashboard userId={userId}/>
          </ConversationProvider>
        </ContactsProvider>
      </SocketProvider>
    )
  }

  return (
    userId ? dashboard() : <Login onSubmitUserName={setUserId}/>
  );
}

export default App;
