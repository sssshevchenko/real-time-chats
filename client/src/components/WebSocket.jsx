import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';

const Longpulling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState('')
    const socket = useRef()

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            console.log(message)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose = () => {
            console.log('Socket closed')
        }
        socket.current.onerror = () => {
            console.log('Socket error')
        }
    }

    const sendMessage = () => {
        const message = {
            event: 'message',
            username,
            message: value,
            id: Date.now()
        }
        socket.current.send(JSON.stringify(message))
        setValue('')
    }

    if(!connected) {
        return (
            <div className='center'>
                <div className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text" 
                        placeholder='Write your name'
                    />
                    <button onClick={connect}>Log In</button>
                </div>
            </div>
        )
    }

    return (
        <div className='center'>
            <div>
                <div className="form">
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)} 
                        type="text" 
                        placeholder='Write message'
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
                <div className="messages">
                    {messages.map(mess => 
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className='message_connection'>User {mess.username} connected</div>
                                : <div className="message">{mess.username}. {mess.message}</div>
                            }
                        </div>    
                    )}
                </div>
            </div>
        </div>
    );
};

export default Longpulling;