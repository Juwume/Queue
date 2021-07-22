import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Context } from "./index";
import AppRouter from "./components/AppRouter";
import NavBar from './components/NavBar'
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";



const App = observer(() => {
  const {user} = useContext(Context)
  const [loading,setLoading] = useState(true)

  useEffect( () => {
    setTimeout( () =>{
      check().then( () => {
        user.setIsAuth(true)
        user.setUser(true)
      }).finally( () => setLoading(false))
    }, 500)
    
  })

  if(loading) return <Spinner style={{alignSelf:'center'}} animation='border'/>

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App;
