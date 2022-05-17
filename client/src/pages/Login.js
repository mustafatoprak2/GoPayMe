import React, { useState, useRef } from 'react';
import { Segment, Form, Button, Container, Grid, Header } from 'semantic-ui-react';
import { io, Socket } from 'socket.io-client';
import { FormProvider, useForm } from 'react-hook-form';
import { emailLogin, googleLogin } from '../services/user-services';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import { motion }from 'framer-motion';

const Login = () => {
  const history = useHistory();
  const socket = useRef(io('ws://localhost:8900'));
  // const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const defaultValues = {
    email: '',
    password: '',
  };

  // const socket = useRef()
  // useEffect(() => {
  //   //  if(!socket.current ){
  //   //     socket.current =io('http://localhost:5200')
  //   //  }

  //   setSocket(io('ws://localhost:8900'));

  //   if (socket) {
  //     console.log('fired');
  //     socket.current.emit('hello', { name: 'john doe', age: 22 });
  //   }
  // }, []);

console.log('id',socket);

  // useEffect(() => {
  //   socket.current.emit('addUser', login);
  // });

  // useEffect(()=> {
  //   // if(!socket.current )

  //   // socket.current = io('http://127.0.0.1:5200');x
  //   setSocket(io('ws://localhost:8900'))

  //   if(socket) {
  //     console.log('fired')
  //     socket.emit('hello', {name:'john doe', age: 22})
  //   }
  // },[])

  console.log('store user', user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues,
    delayError: 500,
    mode: 'onChange',
  });

  console.log(watch('email'));
  const onSubmit = async (formObj) => {
    console.log('fired', formObj);
    const data = await emailLogin(formObj);
    console.log('final data', data);
    if (data) {
      if (user.register) {
        console.log('should go to categories', data);
        dispatch(loginUser(data));
        history.push('/categories');
      } else {
        console.log('should not categories', data);
        dispatch(loginUser(data));
        history.push('/home');
      }

      // history.push('/categories');
      // reset();
      toast.success('login successful!');
    }
  };

  return (
    // motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <Grid columns={2} divided style={{ height: '100vh', }}>
        <Grid.Column className='loginTexting' style={{
          // border: 'red 1px solid',
          'place-self': 'center',
          }}>
          <Container style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            'flex-direction': 'column',
            marginTop: '35%',
            }}>
            <Header size='huge'>Make Friends and Raise Funds</Header>
            <Header size='medium' >Support good causes</Header>
            <Header size='medium' style={{marginTop: '0'}}>Make friends</Header>
            <Header size='medium' style={{marginTop: '0'}}>Achieve your goals</Header>
            <Header size='medium' style={{marginTop: '0'}}>Contribute with the community!</Header>

          </Container>
        </Grid.Column>
        <Grid.Column style={{'place-self': 'center'}}>
          <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form size="big" onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '30vw' }}>
              {/* <h1>Welcome to GoPayME</h1> */}
              <Header size='huge'>Welcome to GoPayME</Header>
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="Email"
                  // value={email}
                  type="text"
                  {...register('email', { required: 'Email is required.' })}
                />
                <p style={{ color: 'red' }}>{errors.email?.message}</p>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  placeholder="password"
                  // value={password}
                  type="password"
                  // onChange={(e) => setPassword(e.target.value)}
                  {...register('password', { required: 'Password is required.' })}
                />
                <p style={{ color: 'red' }}>{errors.password?.message}</p>
              </Form.Field>
              <Button type="submit" fluid size="large" color="teal" content="Login" />
              <Button
                fluid
                size="large"
                color="teal"
                content="Login with Google?"
                onClick={googleLogin}
                style={{ marginTop: '1.2rem' }}
                icon="google"
              />
              <Button
                fluid
                size="large"
                color="blue"
                content="Register?"
                onClick={() => history.push('/register')}
                style={{ marginTop: '1.2rem' }}
              />
            </Form>
          </Container>
        </Grid.Column>
      </Grid>
    </motion.div>
  );
};

export default Login;
