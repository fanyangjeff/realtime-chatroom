# telegram-app


# events: 

# "sendRequest":
newContactModal (emit):
    functionality: send a request to the server to add a friend
    parameters: the other users ID

server (on): 
    functionality: checks if the other user exists in the first place, if
    it does exist, emit event "requestFeedback". Then, adds the sender as a friend 
    from the other user's end

# "requestFeedback":
server (emit):
    functionality: tells the sender if the request is successful.
    parameters: succeed: boolean

newContactModal (on):
    functionality: if the request is not passed, then show an error box at the bottom of newContactModal. If the request is passed, then call createContact()

# "newContactAdded":
server (emit):
    funcitonality: alert the proper user that someone just adds him. 
    parameters: the original sender ID

useContacts (on):
    funcionality: call createContact()

# "createChat": 
newConversationModal (emit):
    functionality: tells the server to create a new chat
    parameters: members(everyone includes the sender), groupName, groupId (unique)

server (on):
    firstly, make each user join a group 
    then emit 'conversation created' to all the other users

# "conversationCreated":
server (emit):
    functionality: tells each receiver to create a chat room
    parameters:  members, groupName, groupId

useConversationModal (on):
    create a new local chat room, add everyone to id except itself



# "sendMessage":
openConversation.js (emit):
    functionality: notifies the server there's a message sent from the user
    parameters:    text, sender(id), time, groupId

server(on):
    functionality: send message to proper receivers based on the groupId passed in, call "receiveMessage" event

# "receiveMessage":
server (emit):
    parameters: text, sender(id), time, groupId

useConversations(on):
    add messsage to the proper conversation based on groupId


