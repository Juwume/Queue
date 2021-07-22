import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../index'
import {NavLink,Navbar,Container,Button,Nav} from 'react-bootstrap'
import { ABOUT_ROUTE, FIND_ROUTE,CREATE_ROUTE, MYQS_ROUTE } from '../utils/consts'
import {observer} from 'mobx-react-lite'
import Login from '../modals/Login'
import Registration from '../modals/Registration'


// function simulateNetworkRequest() {
//   return new Promise((resolve) => setTimeout(resolve, 500));
// }

// function LoadingButton(MyString, prop) {
//   const [isLoading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isLoading) {
//       simulateNetworkRequest().then(() => {
//         setLoading(false);
//       });
//     }
//   }, [isLoading]);

//   const handleClick = () => setLoading(true);
//   const forClick = () => {
//     if(!isLoading) handleClick()
//     prop(true)
//   }
//   return (
//     <Button
      
//       variant="primary"
//       className='m-1'
//       disabled={isLoading}
//       onClick={forClick}
//     >
//       {isLoading ? 'Загрузка…' : MyString}
//     </Button>
//   );
// }

const NavBar = observer(() => {

    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
    }

    const {user} = useContext(Context)
   
    const [loginVisible, setLoginVisible] = useState(false)
    const [registrationVisible, setRegistrationVisible] = useState(false)

    return (
        <Navbar bg='dark' variant="dark">
        <Container>
        <Nav className='ml-auto'>
          <NavLink style={{color:'white',marginRight:'1em', fontSize:'20px',alignSelf:'center'}}  className='ml-1' href={ABOUT_ROUTE}>SimpleQueue</NavLink>
          <Button variant={"outline-light"} className='m-1 align-self-center' href={FIND_ROUTE}>Поиск</Button> 
            
          {user.isAuth?<Button  variant={"outline-light"} className='m-1 align-self-center' href={CREATE_ROUTE}>Создать</Button>:null}
          {user.isAuth?<Button  variant={"outline-light"} className='m-1 align-self-center' href={MYQS_ROUTE} >Мои очереди</Button>:null}
          
          
          
        </Nav>
        {user.isAuth ? 
        <Nav className='ml-auto'>
          <Button
      
            variant="primary"
            className='m-1'
            onClick={logOut}
          >
            Выйти
          </Button>
        </Nav> :
        <Nav className='ml-auto'>

          <Button
      
            variant="primary"
            className='m-1'
            onClick={() => setLoginVisible(true)}
          >
            Войти
          </Button>
          <Button
      
            variant="primary"
            className='m-1'
            onClick={() => setRegistrationVisible(true)}
          >
            Регистрация
          </Button>
          {/* {LoadingButton('Войти', setLoginVisible)}
          {LoadingButton('Регистрация', setRegistrationVisible)} */}
        </Nav> 
        }
        
        
        
        </Container>
        
        <Login show={loginVisible} onHide={() => setLoginVisible(false)}/>
        <Registration show={registrationVisible} onHide={() => setRegistrationVisible(false)}/>
      </Navbar>
    )
})

export default NavBar
