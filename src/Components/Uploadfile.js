import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import MovieIcon from '@mui/icons-material/Movie';
import {v4 as uuidv4} from 'uuid'
import { database } from './firebase';
import { useNavigate } from 'react-router-dom';
import {storage} from './firebase'


export default function (props) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file,setfile]=useState(null);
    const history = useNavigate();

    const handlechange= async(file)=>{
        if(file==null){
            setError('Please select a file first')
            setTimeout(()=>{
                setError('')
            },2000)
        }
        if(file.size/(1024*1024)>100){
            setError('this video is very big')
            setTimeout(()=>{
                setError('')
            },2000)
        }
        let uid =uuidv4()
        setLoading(true);
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
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
                    console.log(url);
                    let obj = {
                        likes:[],
                        comments:[],
                        pId:uid,
                        pUrl:url,
                        uName : props.user.fullname,
                        uProfile : props.user.profileUrl,
                        userId : props.user.userId,
                        createdAt : database.getTimeStamp()
                    }
                    database.posts.add(obj).then(async(ref)=>{
                        let res = await database.users.doc(props.user.userId).update({
                            postIds : props.user.postIds!=null ? [...props.user.postIds,ref.id] : [ref.id]
                        })
                    }).then(()=>{
                        setLoading(false)
                    }).catch((err)=>{
                        setError(err)
                        setTimeout(()=>{
                            setError('')
                        },2000)
                        setLoading(false)
                    })
                })
        }
    }

    return (
        <div style={{marginTop:'5rem',marginBottom:'1rem'}}>
            {error != '' ? <Alert variant="outlined" severity="error">
                {error}
            </Alert> :
                <>
                    <input accept="videos/*" onChange={(e)=>handlechange(e.target.files[0])} id="contained-button-file" multiple type="file" style={{ display: 'none' }} />
                    <label htmlFor="contained-button-file">
                        <Button variant="outlined" component="span" style={{ color:'pink'}} >
                            <MovieIcon style={{ color:'pink'}}/>&nbsp; Upload
                        </Button>
                    </label>
                    {loading && <LinearProgress color="success" />}
                </>
            }
        </div>
    )
}
