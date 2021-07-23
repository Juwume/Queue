import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card, Container } from 'react-bootstrap'

const About = observer(() => {
    return (
        <Container>
            <Card className='align-items-center mt-3'>
                
                    <h1 className='mt-2'>О сервисе</h1>
                    <div className='p-2'>
                        <p >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Praesentium quos id incidunt ut quae in, nostrum laudantium eius fugit veritatis tempora expedita beatae. 
                        Commodi debitis, eum modi a dolorum consequuntur repellat illo ea accusamus alias, ad vitae? 
                        Rerum, exercitationem itaque? 
                        Aliquid neque, nulla voluptas quidem impedit eveniet fugit officia doloremque, 
                        quasi voluptatibus quo, asperiores doloribus nobis veritatis?
                        </p>
                    </div>
                
            </Card>
        </Container>
    )
})

export default About
