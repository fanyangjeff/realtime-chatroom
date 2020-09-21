const io = require('socket.io')(5000)


activeUsers = {}

io.on('connection', socket => {

    //once a new user connects to the server, then we put it in the activeUsers object
    const userId = socket.handshake.query.userId
    activeUsers[userId] = socket

    //process creating a new contact
    socket.on('sendRequest', (freindId) => {processRequest(freindId, userId, socket)})
   
    socket.on('createChat', ({members, groupName, groupId}) => {processCreateChat(members, groupName, groupId, socket)})

    socket.on('sendMessage', ({text, sender, time, groupId}) => {processSendMessage(text, sender, time, groupId)})
})  

const processRequest = (freindId, userId, socket) => {
    if (!activeUsers.hasOwnProperty(freindId)){
        //alert the request sender that the user does not exist
        socket.emit('requestFeedback', {succeed: false})
        return 
    }

    //announce the request the sender that request was passed
    socket.emit('requestFeedback', {succeed: true})

    //announce the other user that a new friend added
    activeUsers[freindId].emit('newContactAdded', {userId})

}


const processCreateChat = (members, groupName, groupId, socket) => {
    members.forEach(memberId => {
        activeUsers[memberId].join(groupId)

        if (socket.handshake.query.userId == memberId) {
            //chat room has already been created
        } else {
            activeUsers[memberId].emit('conversationCreated', {members, groupName, groupId})
        }
    })
}

const processSendMessage = (text, sender, time, groupId) => {
    io.in(groupId).emit('receiveMessage', {text, sender, time, groupId})
}