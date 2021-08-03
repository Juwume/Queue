import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card, Container } from 'react-bootstrap'

const About = observer(() => {
    return (
        <Container>
            <Card className='align-items-center mt-3 mb-2'>
                
                    <h1 className='mt-2'>О сервисе</h1>
                    <div className='p-4 pt-0 pb-0' style={{fontSize:'20px', textAlign:'justify'}}>
                        <p >
                        <span style={{fontWeight:'bold'}}>Добрый день или вечер!</span>  Вы попали на сайт сервиса с очередями. 
                        Для того, чтобы полностью пользоваться его функционалом пожалуйста зарегистрируйтесь или авторизуйтесь.
                        </p>
                        <h4>О функционале</h4>
                        <p>
                        Этот сервис поможет вам и вашим коллегам по несчастью с гордостью отстоять возникшую очередь.
                        Здесь вы можете найти нужную вам очередь и встать в неё. 
                        Пожалуйста не забывайте выходить из неё когда закончите. 
                        </p>
                        <h4>Примечание</h4>
                        <p>
                        Данный сайт пока находится в далёкой pre alpha версии, 
                        и, если вы нашли какие-то недочёты, обязательно свяжитесь со мной.
                        </p>
                        <h4>Контакты</h4>
                        <p>
                            Почта: <span style={{fontStyle:'italic'}}>test@mail.ru</span><br></br>
                            Телефон: <span style={{fontStyle:'italic'}}>+7(999)555-55-55</span><br></br>
                            
                        </p>
                    </div>
                
            </Card>
        </Container>
    )
})

export default About
