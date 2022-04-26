import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './contextApi'
import { database } from './firebase'
import Uploadfile from './Uploadfile'
import Posts from './Posts'
import Navbar from './Navbar'

export default function Feed() {
  const { logout, user } = useContext(AuthContext)
  const [userData, setUserData] = useState('')
  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data())
    })
    return () => { unsub() }
  }, [user])
  return (
    <div>
      <Navbar userData={userData} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Uploadfile user={userData} />
        <Posts userData={userData} />
      </div>
    </div>

  )
}
