import { Container, Typography } from '@material-ui/core'
import React from 'react'
import Masonry from 'react-masonry-css'
import NoteCard from '../components/NoteCard'
import { NoteContext } from '../context/NoteContext'

function Notes() {
    return (
        <Container>
            <Typography
                variant='h4'
                align='center'
                color='textSecondary'
                style={{marginBottom: '20px'}}
            >
                Notes
            </Typography> 
            <NoteContext.Consumer>{(context) => {
                const { notes, deleteNote } = context  
                return (
                    <Masonry
                        breakpointCols={{ default: 3, 1250: 2, 950: 1}}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >  
                        {notes && notes.map( note => (
                            note.delete?null:<NoteCard key={note._id} note={note} deleteNote={deleteNote}/>
                        ))}
                    </Masonry>)
            }}
            </NoteContext.Consumer> 
            
        </Container>
    )
}

export default Notes
