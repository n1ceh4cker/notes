import { Button, Container, FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import React, { useState } from 'react'
import { NoteContext } from '../context/NoteContext'

const useStyles = makeStyles({
    textField: {
        marginTop: 10,
        marginBottom: 10,
        display: 'block'
    }
})
function Create() {
    const [category, setCategory] = useState('work')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const styles = useStyles()
    return (
        <Container>
            <Typography 
                variant='h4' 
                color='textSecondary' 
                align='center'
            >
                Create New Note
            </Typography>
            <NoteContext.Consumer>{context => {
                const { addNote } = context
                const handleSubmit = (e) => {
                    e.preventDefault()
                    addNote({id: new Date().getTime(), title, content, category})
                    setTitle('')
                    setContent('')
                    setCategory('work')
                }
                return(
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant='outlined'
                        color='secondary'
                        label='Note Title'
                        fullWidth
                        required
                        className={styles.textField}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />    
                    <TextField
                        variant='outlined'
                        color='secondary'
                        label='Note Content'
                        fullWidth
                        required
                        multiline
                        rows={3}
                        className={styles.textField}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <FormControl className={styles.textField}>
                    <FormLabel>
                        Note Category
                    </FormLabel>
                    <RadioGroup value={category} onChange={(e) => {setCategory(e.target.value)}}>
                        <FormControlLabel value='todos' control={<Radio />} label="Todos"/>
                        <FormControlLabel value='money' control={<Radio />} label="Money"/>
                        <FormControlLabel value='work' control={<Radio />} label="Work"/>
                    </RadioGroup>
                    </FormControl>
                    <Button 
                        variant='contained' 
                        color='secondary' 
                        endIcon={<KeyboardArrowRight />}
                        type='submit'
                    >
                        Submit
                    </Button>
                </form>
                )
            }}
            </NoteContext.Consumer>
        </Container>
        
    )
}

export default Create
