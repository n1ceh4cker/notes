import { AppBar, Avatar, Button, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import { AddCircleOutlineOutlined, MenuOutlined, SubjectOutlined, ExitToApp } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import Particles from 'react-particles-js'
import { particleConfig } from '../config/particles'
import { AuthContext } from '../context/AuthContext'
import { auth, provider } from '../config/firebase'
import Loading from './Loading'
import NoteContextProvider from '../context/NoteContext'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh'
    },
    content: {
        backgroundColor: '#f9f9f9',
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3)
        }
    },
    brand: {
        display: 'flex',
        flexGrow: 1
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        },
    },
    appbar: {
        [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
        display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerTitle: {
        padding: theme.spacing(2)
    },
    toolbar: theme.mixins.toolbar,
    active: {
        backgroundColor: '#f4f4f4'
    },
    avatar: {
        marginLeft: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2)
        }
    },
    userinfo: {
        fontStyle: 'italic'  
    }
}))
function Layout({ children }) {
    const styles = useStyles()
    const history = useHistory()
    const location = useLocation()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const { user, loading } = useContext(AuthContext)
    const items = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color='secondary' />,
            path: '/'
        },
        {
            text: 'Add Note',
            icon: <AddCircleOutlineOutlined color='secondary' />,
            path: '/new'
        }
    ]
    const drawer = (
        <div>
            <Typography variant='h5' className={styles.drawerTitle}>
                Notes Menu
            </Typography>
            <List>
                {items.map(item => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => history.push(item.path)}
                        className={location.pathname===item.path ? styles.active:null}
                        >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>)
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    if (loading) return <Loading />
    else if (!user) {
        auth.signInWithRedirect(provider)
        return <Loading />
    }else
    return (
    <NoteContextProvider>
        <Particles params={particleConfig} />
        <div className={styles.root}>
            <AppBar
                className={styles.appbar} 
                elevation={0}
            >
                <Toolbar >
                    <IconButton
                        color='inherit'
                        edge="start"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                        className={styles.menuButton}
                    >
                        <MenuOutlined/>
                    </IconButton>
                    <Typography className={styles.brand}>
                        {new Date().toDateString()}
                    </Typography>
                    <Button
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                    >
                         <Avatar src={user.photoURL} alt={user.displayName} className={styles.avatar}></Avatar>   
                    </Button>
                    <Menu
                        id="menu-appbar"
                        getContentAnchorEl={null}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        keepMounted
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        <MenuItem><Typography className={styles.userinfo}>{user.displayName}</Typography></MenuItem>
                        <MenuItem><Typography className={styles.userinfo}>{user.email}</Typography></MenuItem>
                        <Divider />
                        <MenuItem onClick={() => auth.signOut()}><ExitToApp />&nbsp;Logout</MenuItem>
                    </Menu>      
                </Toolbar>
            </AppBar>
            <nav className={styles.drawer}>
                <Hidden xsDown implementation="css">
                    <Drawer
                        variant='permanent'
                        anchor='left'
                        classes={{ paper: styles.drawerPaper }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smUp implementation="css">
                    <Drawer
                        variant='temporary'
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(!drawerOpen)}
                        anchor='left'
                        classes={{ paper: styles.drawerPaper }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <div className={styles.content}>
                <div className={styles.toolbar} />
                {children} 
            </div>
        </div>
    </NoteContextProvider>
    )
}

export default Layout
