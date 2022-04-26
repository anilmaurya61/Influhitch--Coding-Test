import TextField from '@mui/material/TextField';
import * as React from 'react';
import './SignUp.css'
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import insta from '../Assets/Instagram.JPG'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from './contextApi';
import { storage } from './firebase';
import { database } from './firebase';


export default function SignUp() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [Eee, setError] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Profilepictur,setProfilepicture]= useState('Upload Profile Image');
    const history = useNavigate();
    const { signup } = useContext(AuthContext)
    
   
    const handleupload = (file)=>{
        if(file!=null){
            setProfilepicture("Uploaded");
            setFile(file);
        }
    }
    const handleClick = async () => {
        try {
            if (file == null) {
                setError('Upload profile picture first');
                setTimeout(() => {
                    setError('')
                }, 2000)
                console.log('Hello')
                return;
            }
            setLoading(true)
            let userObj = await signup(email,password)
            let uid = userObj.user.uid
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot){
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                console.log(`Upload is ${progress} done.`)
            }
            function fn2(error){
                alert(error);
                setTimeout(()=>{
                    setError('')
                },2000);
                setLoading(false)
                return;
            }
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url+"900");
                    database.users.doc(uid).set({
                        email:email,
                        userId:uid,
                        fullname:name,
                        profileUrl:url,
                        createdAt:database.getTimeStamp()
                    })
                })
                setLoading(false);
                history('/')
            }
        } catch (err) {
            // alert(err);
            if(err.message.includes('auth/weak-password')){
                setError('Password should be at least 6 characters');
            }else if(err.message.includes('auth/email-already-in-use')){
                setError('Email already in use');
            }else if(err.message.includes('auth/invalid-email')){
                setError('Invalid Email')
            }
            else{
                setError('Something went wrong')
            }
            setTimeout(() => {
                setError('')
            }, 2000)
        }
        

    }
    
    
    // const error=Error.value;
    return (
        <div className='card-wraper'>
            <div className='card_cont'>
                <Card variant="outlined">
                    <div className="Insta-img">
                        <img src={insta} alt="" />
                    </div>
                    <CardContent>
                        <Typography className='text1' variant="subtitle1">
                            Sign up to see photos and videos from your friends
                        </Typography>
                        {Eee!='' && <Alert variant="outlined" severity="error">
                               {Eee}
                        </Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small" value={name} onChange={(e) => setName(e.target.value)} />
                        <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CloudUploadIcon />} component="label" >
                            {Profilepictur}
                            <input type="file" accept="image/*" hidden onChange={(e) => handleupload(e.target.files[0])}/>
                        </Button>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" fullWidth={true} variant="contained" onClick={handleClick} disabled={loading }>
                            Sign up
                        </Button>
                    </CardActions>
                    <CardContent>
                        <Typography className='text1' variant="subtitle1">
                            By signing up, you agree to our Terms, Conditions and Cookies policy.
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" className="card__2">
                    <CardContent>
                        <Typography className='text1' variant="subtitle1">
                            Having an account ? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
