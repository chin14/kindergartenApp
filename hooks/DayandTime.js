import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from '../firebase'

export function MorningDelay() {
    const [time, setTime] = useState('7:30')
    const [reason, setReason] = useState('')
    const [timing, setTiming] = useState([])

    //Pass this onChange handler to the time input field
    function handleTime(e) {
        setTime(e.target.value)
    }

    //Pass this onChange handler to the deadline input field
    function handleReason(e) {
        setReason(e.target.value)
    }

    //if you must use .set method, generate randomId or use a custom method for determining your Ids (checkout docs for .add alternatives)
    const docId = uuid4()

    //pass this onClick function to the button
    function delayMorning(e) {
        e.preventDefault() //prevent reload when using a form
        db.collection('delayInTheMorning').doc(docId).set({
            time, 
            reason
        }).then(() => {
            //If you wish to push the written data to your local state, you can do it here
            setTiming([...timing, {time, reason}])
            console.log('Documents saved succesfully')
        }).catch((err)=> {
            console.log(err)
        })
    }

    //If you wish to access the saved files in this component, or another component. You can use the useEffect hook
    useEffect(() => {
        db.collection('delayInTheMorning').get().then((data) => {
            const docs = data.docs.map(doc => {
                return {...doc.data(), id: doc.id}
            })
            setTiming(docs)
        }).catch((err) =>{
            console.log(err)
        })
    })

  }