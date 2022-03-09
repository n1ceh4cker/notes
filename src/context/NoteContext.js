import React, { createContext, useEffect, useState } from 'react'
import { auth, firestore } from '../config/firebase'
import firebase from 'firebase/app'

export const NoteContext = createContext()
function NoteContextProvider({ children }) {
    const [notes, setNotes] = useState([])
    useEffect(() => {
        firestore.collection("notes").where("uid", "==", auth.currentUser.uid).orderBy("createdAt").onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    let note = { _id: change.doc.id, ...change.doc.data() }    
                    setNotes(prevNotes => [...prevNotes, note])
                }
                else if (change.type === 'removed') {
                    setNotes(prevNotes => prevNotes.filter(note => note._id !== change.doc.id))
                }
            })
        })
    },[])
    const addNote = async(note) => {
        await firestore.collection("notes").add({
            uid: auth.currentUser.uid,
            title: note.title,
            content: note.content,
            category: note.category,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
    const deleteNote = async(note) => {
        await firestore.collection("notes").doc(note._id).delete()
    }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote}}>
            {children}
        </NoteContext.Provider>
    )
}


export default NoteContextProvider
