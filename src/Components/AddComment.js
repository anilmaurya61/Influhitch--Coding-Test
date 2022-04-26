import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { database } from './firebase';
import SendIcon from '@mui/icons-material/Send';

function AddComment({userData,postData}) {
    const [text,setText] = useState('')
    const handleClick = () => {
        let obj = {
            text:text,
            uProfileImage:userData.profileUrl,
            uName : userData.fullname
        }
        database.comments.add(obj).then((doc)=>{
            database.posts.doc(postData.postId).update({
                comments:[...postData.comments,doc.id]
            })
        })
        setText('')
    }
    return (
        <div style={{width:'100%'}}>
            <TextField id="outlined-basic" label="Comment" variant="outlined" size="small" sx={{width:'75%'}} value={text} onChange={(e)=>setText(e.target.value)}/>
            <Button onClick={handleClick} sx={{margin:'0'}}><SendIcon/></Button>
        </div>
    )
}

export default AddComment