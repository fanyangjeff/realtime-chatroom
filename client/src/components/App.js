import React from 'react';
import Login from './Login'
import useLocalStorage from './custom_hooks/useLocalStorage'
import Dashboard from './Dashboard';
import { ContactsProvider } from './Context/useContacts'
import { ConversationProvider } from './Context/useConversations'
function App() {
  const [userName, setUserName] = useLocalStorage('id')

  const dashboard = () => {
    return (
      <ContactsProvider>
        <ConversationProvider>
          <Dashboard userName={userName}/>
        </ConversationProvider>
      </ContactsProvider>
    )
  }

  return (
    userName ? dashboard() : <Login onSubmitUserName={setUserName}/>
  );
}

export default App;
