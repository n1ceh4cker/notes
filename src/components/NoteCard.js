import { Avatar, Card, CardContent, CardHeader, IconButton, makeStyles, Typography } from '@material-ui/core'
import { blue, green, red } from '@material-ui/core/colors'
import { DeleteOutlined } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: (note) => {
            if(note.category==='work') return red[700]
            if(note.category==='money') return green[700]
            if(note.category==='todos') return blue[700]
        }
    },
    content: {
        padding: theme.spacing(1)
    }
}))
function NoteCard({ note, deleteNote }) {
    const styles = useStyles(note)
    return (
        <Card elevation={1}>
            <CardHeader
                avatar={
                    <Avatar className={styles.avatar}>{note.category[0].toUpperCase()}</Avatar>
                }
                action={
                    <IconButton onClick={() => deleteNote(note)}>
                        <DeleteOutlined />
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
            />
            <CardContent>
                <Typography variant='body2' color='textSecondary' className={styles.content}>
                    {note.content}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default NoteCard
