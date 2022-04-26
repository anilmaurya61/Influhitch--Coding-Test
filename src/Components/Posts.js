import React, { useState, useEffect } from 'react'
import { database } from './firebase';
import Video from './Video';
import CircularProgress from '@mui/material/CircularProgress';
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like'
import CommentBankIcon from '@mui/icons-material/CommentBank';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddComment from './AddComment';
import Comments from './Comments';
import Like2 from './Like2'

export default function Posts({ userData }) {
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = React.useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr = []
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data)
            })
            setPosts(parr)
        })
        return unsub
    }, [])
    // console.log(Posts[0].purl)
    return (
        <div>
            {posts == null || userData == null ? <CircularProgress /> :
                <div className='video-container'>{
                    posts.map((post, index) => (
                        <React.Fragment key={index}>
                            {console.log(post)}
                            <div className="videos">
                                <Video src={post.pUrl} />
                                <div className='fa' style={{ display: 'flex' }}>
                                    <Avatar alt="Travis Howard" src={userData.profileUrl} />
                                    <h4>{userData.fullname}</h4>
                                </div>
                                <Like userData={userData} postData={post} />
                                <CommentBankIcon className='comment' onClick={() => handleClickOpen(post.pId)} />
                                <Dialog
                                    open={open === post.pId}
                                    onClose={handleClose}
                                    aria-labelledby="responsive-dialog-title"
                                    fullWidth={true}
                                    maxWidth='md'
                                >
                                    <div className="modal-container">
                                        <div className="video-modal">
                                            <video autoPlay={true} muted="muted" controls>
                                                <source src={post.pUrl} />
                                            </video>
                                        </div>
                                        <div className="comment-modal">
                                            <div className="card1">
                                                <Comments postData={post} />
                                            </div>
                                            <Card variant="outlined" className="card2">
                                                <Typography style={{ padding: '0.4rem' }}>{post.likes.length == 0 ? '' : `Liked by ${post.likes.length} users`}</Typography>
                                                <div style={{ display: 'flex' }}>
                                                    <Like2 postData={post} userData={userData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                                    <AddComment style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} userData={userData} postData={post} />
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </Dialog>
                            </div>
                        </React.Fragment>
                    ))
                }
                </div>
            }
        </div>
    )
}
