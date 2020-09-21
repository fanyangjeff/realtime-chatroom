import React, {useState, useEffect, useContext} from 'react'
import io from 'socket.io-client'

const socketContext = React.createContext()

export function useSocket(){
    return useContext(socketContext)
}


export function SocketProvider({children, userId}) {

    const [socket, setSocket] = useState()

    
    useEffect(() => {
        const newSocket = io('http://localhost:5000', 
        {query: {userId}})

        setSocket(newSocket)

        console.log("a new socket has been created")

        return () => {
            console.log("socket has been closed")
            newSocket.close()
        }
    }, [userId])

    
    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    )
}
