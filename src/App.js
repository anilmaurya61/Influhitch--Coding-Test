import './App.css';
import SignUp from './Components/SignUP';
import Login from './Components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Feed from './Components/Feed';
import { AuthProvider } from './Components/contextApi';
import PrivateRouting from './Components/PrivateRouting';
import Resetpassword from './Components/Resetpassword';
import Profile from './Components/Profile';

function App() {
  return (
    <BrowserRouter className="App">
      
       <AuthProvider>
         <Routes>
         <Route path='/profile' element={<PrivateRouting/>}>
            <Route exact path='/profile:id' element={<Profile/>}/>
          </Route>
         <Route exact path='/' element={<PrivateRouting/>}>
            <Route exact path='/' element={<Feed/>}/>
          </Route>
        <Route path="/Resetpassword" element={<Resetpassword/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/" element={<Feed />} /> */}
        </Routes>
        </AuthProvider>
      
    </BrowserRouter>
  );
}

export default App;
