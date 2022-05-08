import React, { useState } from 'react';
import { Segment, Form, Button, Container, Grid } from 'semantic-ui-react';

import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { creatEmailAccount, googleLogin } from '../services/user-services';
import { useHistory } from 'react-router-dom';
const Register = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
  console.log('register page', user);
  const defaultValues = {
    name: '',
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    delayError: 500,
    mode: 'onChange',
  });

  const onSubmit = (formObj) => {
    console.log(formObj);
    if (creatEmailAccount(formObj)) history.push('/categories');
    // navigate('/login')
  };
  return (
    <Grid style={{ height: '100vh' }}>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Form size="big" onSubmit={handleSubmit(onSubmit)} style={{ minWidth: '30vw' }}>
          <h1>Register</h1>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="First Name"
              // value={email}
              type="text"
              // onChange={(e) => setEmail(e.target.value)}
              {...register('name', {
                required: 'Name is required.',
              })}
            />

            <p style={{ color: 'red' }}>{errors.name?.message}</p>
          </Form.Field>
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

          <Button type="submit" fluid size="large" color="teal" content="Register" />
          <Button
            fluid
            size="large"
            color="blue"
            content="Sign in instead?"
            onClick={() => history.push('/login')}
            style={{ marginTop: '2rem' }}
          />
        </Form>
      </Container>
    </Grid>
  );
};

export default Register;
