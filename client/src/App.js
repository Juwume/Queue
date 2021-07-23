import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Context } from "./index";
import AppRouter from "./components/AppRouter";
import NavBar from './components/NavBar'
import { check } from "./http/userAPI";
import { Container, Spinner } from "react-bootstrap";
import jwt_decode from 'jwt-decode'



const App = observer(() => {
  const {user} = useContext(Context)
  const [loading,setLoading] = useState(true)
  let temp
  useEffect( () => {
    setTimeout( () =>{
      check().then( () => {
        user.setIsAuth(true)
        user.setUser(jwt_decode(localStorage.getItem('token')))
      }).finally( () => {
        
        setLoading(false)
      })
      
    }, 500)
    
  })
  
  if(loading) return (
    <Container 
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight - 54}}
    >
      <Spinner  animation='border'/>
    </Container>
    
  )

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App;
