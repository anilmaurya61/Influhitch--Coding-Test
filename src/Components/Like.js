import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from './firebase';

export default function Like({userData,postData}) {
    const [like,setlike] = useState(null);
    useEffect(()=>{
        let check = postData.likes.includes(userData.userId)?true:false
        setlike(check)
    },[postData])
    const handlelike=()=>{
        if(like==true){
            let narr = postData.likes.filter((el)=>el!=userData.userId)
            database.posts.doc(postData.postId).update({
                likes : narr
            })
        }
        else{
            let narr = [...postData.likes,userData.userId]
            database.posts.doc(postData.postId).update({
                likes : narr
            })
        }
    }
  return (
    <div>
        {
            like!=null ?
            <>
            {
                like==true ? <FavoriteIcon className={`icon-styling like`} onClick={handlelike}/> : <FavoriteIcon className={`icon-styling unlike`} onClick={handlelike}/>
            }
            </>:
            <></>
        }
    </div>
  )
}
