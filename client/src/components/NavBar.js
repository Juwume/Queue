import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../index'
import {NavLink,Navbar,Container,Button,Nav} from 'react-bootstrap'
import { ABOUT_ROUTE, FIND_ROUTE,CREATE_ROUTE, MYQS_ROUTE } from '../utils/consts'
import {observer} from 'mobx-react-lite'
import Login from '../modals/Login'
import Registration from '../modals/Registration'

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

function LoadingButton(MyString, prop) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);
  const forClick = () => {
    if(!isLoading) handleClick()
    prop(true)
  }
  return (
    <Button
      
      variant="primary"
      className='m-1'
      disabled={isLoading}
      onClick={forClick}
    >
      {isLoading ? 'Загрузка…' : MyString}
    </Button>
  );
}

const NavBar = observer(() => {
    const {user} = useContext(Context)
    user.setIsAuth(true)
    const [loginVisible, setLoginVisible] = useState(false)
    const [registrationVisible, setRegistrationVisible] = useState(false)

    return (
        <Navbar bg='dark' variant="dark">
        <Container>
        <Nav className='ml-auto'>
          <NavLink style={{color:'white',marginRight:'1em', fontSize:'20px',alignSelf:'center'}}  className='ml-1' href={ABOUT_ROUTE}>SimpleQueue</NavLink>
          <Button variant={"outline-light"} className='m-1' href={FIND_ROUTE}>Поиск</Button> 
            
          {(() => {if(user.isAuth) return(
            <div>
              <Button  variant={"outline-light"} className='m-1' href={CREATE_ROUTE}>Создать</Button>
              <Button  variant={"outline-light"} className='m-1' href={MYQS_ROUTE} >Мои очереди</Button>
            </div>
          )})()}
          
          
        </Nav>
        {user.isAuth ? 
        <div>

        </div> :
        <Nav className='ml-auto'>

          {LoadingButton('Войти', setLoginVisible)}
          {LoadingButton('Регистрация', setRegistrationVisible)}
        </Nav> 
        }
        
        
        
        </Container>
        
        <Login show={loginVisible} onHide={() => setLoginVisible(false)}/>
        <Registration show={registrationVisible} onHide={() => setRegistrationVisible(false)}/>
      </Navbar>
    )
})

export default NavBar
