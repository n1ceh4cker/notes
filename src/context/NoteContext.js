import React, { createContext } from 'react'
import { firestore } from '../config/firebase'
import firebase from 'firebase/app'
import { useLocalStorage } from '../hooks/useLocalStorage'
export const NoteContext = createContext()
function NoteContextProvider({ children }) {
    const [notes,setNotes] = useLocalStorage("notes",[])
    const addNote = (note) => {
        setNotes([...notes,note])
    }
    const deleteNote = (note) => {
        const newNotes = notes.filter(nte => note.id!==nte.id)
        if(typeof note.id == 'string'){
            note.delete = true
            setNotes([...newNotes,note])
        }
        else{
            setNotes(newNotes)
        }
    }
    const syncNote = async () => {
        const offlineNotes = notes.filter(note => typeof note.id!='string')
        const promises = offlineNotes.map( note =>  (
            firestore.collection("notes").add({
            title: note.title,
            content: note.content,
            category: note.category,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        ))
        const deletedNotes = notes.filter(note => note.delete)
        const promises1 = deletedNotes.map(note => (
            firestore.collection("notes").doc(note.id).delete()
        ))
        await Promise.all(promises)
        await Promise.all(promises1)
        const syncedNotes =[]
        const snapshot = await firestore.collection("notes").get()
        snapshot.docs.forEach( doc => {
            const note = {...doc.data(),id: doc.id}
            syncedNotes.push(note)
        }) 
        if(syncedNotes.length) setNotes(syncedNotes)
    }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, syncNote}}>
            {children}
        </NoteContext.Provider>
    )
}


export default NoteContextProvider
