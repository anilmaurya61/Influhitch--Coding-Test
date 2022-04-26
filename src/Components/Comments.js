import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import { database } from './firebase'
import './Comments.css'

function Comments({ postData }) {
    const [comments, setComment] = useState(null)
    
    useEffect(() => {
        async function fetchcomment() {
            let arr = []
            for (let i = 0; i < postData.comments.length; i++) {
                let data = await database.comments.doc(postData.comments[i]).get()
                arr.push(data.data())
            }
            setComment(arr)
        }
        fetchcomment(postData)
    }, [postData])
    return (
        <div>
            {
                comments === null ? <CircularProgress /> :
                    <div className='comment-cont'>
                        {
                            comments.map((Comment, index) => (
                                <div className='comment-item' style={{ display: 'flex',flexWrap:'wrap', border: '1px solid grey',borderRadius:'5px', margin:'.5rem' }} key={index}>
                                    <Avatar src={Comment.uProfileImage} />
                                    <p>&nbsp;&nbsp;<span style={{ fontWeight: 'bold' }}>{Comment.uName}</span>&nbsp;&nbsp; {Comment.text}</p>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Comments
