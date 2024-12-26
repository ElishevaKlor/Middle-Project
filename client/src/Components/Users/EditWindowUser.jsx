import { Fragment, useEffect, useState } from "react"
import axios from 'axios'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import { Alert } from "@mui/material";
import { useContext } from 'react';
import { UsersContext } from '../../Contexts.jsx/UsersContext';

const EditWindow = (props) => {
    const { usersList, setUsersList } = useContext(UsersContext);

    const UpdateUser = async (newUser) => {
        newUser['id'] = props.User._id
        console.log(newUser)
        try {
            const res = await axios.put('http://localhost:5000/Users', newUser)
            if (res.status === 200)
                setUsersList(res.data)
        }
        catch (err) {
            console.error(err)
        }
    }

    const CreateUser = async (newUser) => {
        try {
            const res = await axios.post('http://localhost:5000/Users', newUser)
            if (res.status === 200)
                setUsersList(res.data)
        }
        catch (err) {
            console.error(err);
        }
    }

    const [name, setName] = useState(props.User ? props.User.name : '');
    const [address, setAddress] = useState(props.User ? props.User.address : '');
    const [phone, setPhone] = useState(props.User ? props.User.phone : '');
    const [email, setEmail] = useState(props.User ? props.User.email : '');
    const [userName, setUsername] = useState(props.User ? props.User.userName : '');

    const save = async (name, userName, phone, email, address) => {
        if (!name) {
            return (
                <Alert variant="outlined" severity="error">
                    This is an outlined error Alert.
                </Alert>
            )
        }
        const newUser = {
            email: email,
            name: name,
            phone: phone,
            userName: userName,
            address: address,
        }
        if (props.User) {
            UpdateUser(newUser)

        }

        else
            CreateUser(newUser)
        props.setOpen(false)

    }

    const handleClose = () => {
        props.setOpen(false);
    }

    return (<>
       <Dialog
    open={props.open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    sx={{ marginTop: 4 }}  
>
    <DialogTitle id="alert-dialog-title">
        {props.User ? "Edit User" : "Create a new user"}
    </DialogTitle>
    <DialogContent sx={{ mt: 1 }}> 
        <Container component="main" sx={{ pt: 3 }}>
            <AppBar position="fixed" component="nav" sx={{ height: 40 }}>
                {/* <Toolbar>
                    
                </Toolbar> */}
            </AppBar>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <br />
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-name" label="Name" variant="standard" defaultValue={props.User?.name} onChange={(e) => setName(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-userName" label="User Name" variant="standard" defaultValue={props.User?.userName} onChange={(e) => setUsername(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountBalanceIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-address" label="address" variant="standard" defaultValue={props.User?.address} onChange={(e) => setAddress(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-phone" label="Phone" variant="standard" defaultValue={props.User?.phone} onChange={(e) => setPhone(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-email" label="Email" variant="standard" defaultValue={props.User?.email} onChange={(e) => setEmail(e.target.value)} />
                </Box>
            </Box>
        </Container>
    </DialogContent>
    <DialogActions>
        <Button size="small" onClick={handleClose}>
            Cancel
        </Button>
        <Button size="small" onClick={() => { save(name, userName, phone, email, address) }} variant="contained">
            Save
        </Button>
    </DialogActions>
</Dialog>

    </>
    )
}

export default EditWindow
