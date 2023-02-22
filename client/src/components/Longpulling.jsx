import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Longpulling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    }, [])

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
    }

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages')
            setMessages(prev => [data, ...prev])
            await subscribe()
        } catch(e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
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
                        <div className='message' key={mess.id}>
                            {mess.message}
                        </div>    
                    )}
                </div>
            </div>
        </div>
    );
};

export default Longpulling;