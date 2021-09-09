




import { Typography } from '@material-ui/core'
import React, { useState, useEffect, useRef } from 'react'
import { Avatar } from 'react-rainbow-components'
import { db, auth } from '../firebase'
import { user } from '../redux/reducers/user'
import SendMessages from './SendMessages'

function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        console.log('In use effect')
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            console.log(snapshot.docs.map(doc => doc.data()))

        })
    }, [])

   
    return (
        <div>
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <Avatar src={photoURL} alt={user.name} />
                            <Typography>{text}</Typography>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessages scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat

