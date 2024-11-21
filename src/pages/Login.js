


import React, { useState } from 'react'
import Base from '../components/Base'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { toast } from 'react-toastify'
import { loginUser } from '../services/user-service'
import { doLogin } from '../auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

   const [loginDetails,setLoginDetails] = useState({
        userName : '',
        password:''
    })

    const handleChange=(event,field)=>{
        let actualValue = event.target.value
        setLoginDetails({
            ...loginDetails,
            [field]:actualValue
        })
    }
    const handleReset =()=>{
        setLoginDetails({
            userName:'',
            password:''
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
      
        if (loginDetails.userName === '' || loginDetails.password === '') {
          toast.error("Invalid Credentials");
          return;
        }
      
        console.log("Login details: ", loginDetails);
      
        loginUser(loginDetails)
          .then((data) => {
            console.log("JWT Token: ", data);
            doLogin(data,()=>{
               navigate("/user/dashboard")
            })
            toast.success("Login successful!");
          })
          .catch((error) => {
            console.error("Login error: ", error);
            toast.error("Invalid username or password.");
          });
      };
      

  return (
   <Base>
   <Container>
    <Row>
        <Col sm={{size:6,offset:3}}>
        <Card>
            <CardHeader>
                <h3>Login here</h3>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                        <Label for='email'>Enter email</Label>
                        <Input type='email' id='email'
                        value={loginDetails.userName}
                        onChange={(e)=>handleChange(e,'userName')}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Enter password</Label>
                        <Input type='password' id='password'
                         value={loginDetails.password}
                         onChange={(e)=>handleChange(e,'password')}></Input>
                    </FormGroup>
                    <Container className='text-center'>
                        <Button outline='light' color='dark'>Login</Button>
                        <Button onClick={handleReset} className='ms-2' color='secondary'>Reset</Button>

                    </Container>
                </Form>
            </CardBody>
        </Card>
        </Col>
    </Row>
    </Container></Base>
  )
}

export default Login
