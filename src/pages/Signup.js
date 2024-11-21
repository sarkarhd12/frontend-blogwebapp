

// import React, { useEffect, useState } from 'react'
// import Base from '../components/Base'
// import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
// import { signUp } from '../services/user-service'
// import { toast } from 'react-toastify'

// const Signup = () => {


    

//     const [data,setData]=useState({
//        name:'',
//        email:'',
//        password:'',
//        about:''
//     })
//     const [error,setError] = useState({
//         errors:{},
//         isError:false
//     })

//     useEffect(()=>{

//     },[data])


//     const handleChange=(event,property)=>{
//         setData({...data,[property]:event.target.value})
//     }

//     const resetData=()=>{
//         setData({
//             name:'',
//             email:'',
//             password:'',
//             about:''
//         })
//     }

//     const submitForm=(event)=>{
//         event.preventDefault()
//         // if(error.isError){
//         //     toast.error("form data invalid!")
//         //     return;
//         // }

//      signUp(data).then((resp)=>{
//     console.log("success log")
//     console.log(resp)
//     toast.success("registerd succesfully")
//     setData({
//         name:'',
//         email:'',
//         password:'',
//         about:''
//     })
//     }).catch((error)=>{
//         console.log(error)
//         setError({
//             errors:error,
//             isError:true
//         })
//     })
// }


//   return (
//     <Base>
//     <Container>
//         <Row>
//             <Col sm={{size:6,offset:3}}>
//             <Card>
//             <CardHeader>
//                 <h3>Fill info for register</h3>
//             </CardHeader>
//             <CardBody>
//                 <Form onSubmit={submitForm}>
//                     <FormGroup>
//                         <Label for='name'>Enter name</Label> 
//                         <Input type='text'
//                         id='name'
//                         onChange={(e)=>handleChange(e,'name')}
//                         value={data.name}
//                         invalid={error.errors?.response?.data?.name ?true : false}
//                         />
//                         <FormFeedback>
//                             {error.errors?.response?.data?.name}
//                         </FormFeedback>
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for='email'>Enter email</Label> 
//                         <Input type='email'
//                         id='email'
//                         onChange={(e)=>handleChange(e,'email')}
//                         value={data.email}
//                         invalid={error.errors?.response?.data?.email ?true : false}
//                         />
//                          <FormFeedback>
//                             {error.errors?.response?.data?.email}
//                         </FormFeedback>
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for='password'>Enter password</Label> 
//                         <Input type='password'
//                         id='password'
//                         onChange={(e)=>handleChange(e,'password')}
//                         value={data.password}
//                         invalid={error.errors?.response?.data?.password ?true : false}
//                         />
//                          <FormFeedback>
//                             {error.errors?.response?.data?.password}
//                         </FormFeedback>
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for='about'>Enter about</Label> 
//                         <Input type='textarea'
//                         id='about'
//                         onChange={(e)=>handleChange(e,'about')}
//                         value={data.about}
//                         invalid={error.errors?.response?.data?.about ?true : false}
//                         />
//                          <FormFeedback>
//                             {error.errors?.response?.data?.about}
//                         </FormFeedback>
//                     </FormGroup>
//                     <Container className='text-center'>
//                         <Button outline='light' color='dark'>Register</Button>
//                         <Button onClick={resetData} className='ms-2' color='secondary'>Reset</Button>

//                     </Container>
//                 </Form>
//             </CardBody>
//         </Card></Col>
//         </Row>
//     </Container>
//     </Base>
//   )
// }

// export default Signup

import React, { useState } from 'react';
import Base from '../components/Base';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';
import { signUp } from '../services/user-service';
import { toast } from 'react-toastify';

const Signup = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about: '',
    });

    const [error, setError] = useState({
        errors: {},
        isError: false,
    });

    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value });

        // Clear error for the specific field on change
        if (error.errors[property]) {
            setError((prevState) => ({
                ...prevState,
                errors: { ...prevState.errors, [property]: null },
            }));
        }
    };

    const resetData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            about: '',
        });
        setError({
            errors: {},
            isError: false,
        });
    };

    const submitForm = (event) => {
        event.preventDefault();

        if (!data.name || !data.email || !data.password || !data.about) {
            toast.error("All fields are required!");
            return;
          }

        signUp(data)
            .then((resp) => {
                console.log("Success:", resp);
                toast.success("Registered successfully!");
                resetData(); // Reset form
            })
            .catch((error) => {
                console.log("Error:", error);

                // Capture validation errors from server response
                setError({
                    errors: error?.response?.data || {}, // Assuming backend sends validation errors here
                    isError: true,
                });

                // Show a general error toast
                if (error?.response?.data?.message) {
                    toast.error(error.response.data.message);
                }
            });
    };

    return (
        <Base>
            <Container>
                <Row>
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card>
                            <CardHeader>
                                <h3>Fill info for register</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitForm}>
                                    <FormGroup>
                                        <Label for="name">Enter name</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            onChange={(e) => handleChange(e, 'name')}
                                            value={data.name}
                                            invalid={!!error.errors.name}
                                        />
                                        <FormFeedback>
                                            {error.errors.name}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Enter email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            onChange={(e) => handleChange(e, 'email')}
                                            value={data.email}
                                            invalid={!!error.errors.email}
                                        />
                                        <FormFeedback>
                                            {error.errors.email}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Enter password</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            onChange={(e) => handleChange(e, 'password')}
                                            value={data.password}
                                            invalid={!!error.errors.password}
                                        />
                                        <FormFeedback>
                                            {error.errors.password}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="about">Enter about</Label>
                                        <Input
                                            type="textarea"
                                            id="about"
                                            onChange={(e) => handleChange(e, 'about')}
                                            value={data.about}
                                            invalid={!!error.errors.about}
                                        />
                                        <FormFeedback>
                                            {error.errors.about}
                                        </FormFeedback>
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button outline="light" color="dark">
                                            Register
                                        </Button>
                                        <Button onClick={resetData} className="ms-2" color="secondary">
                                            Reset
                                        </Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default Signup;
