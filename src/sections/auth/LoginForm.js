import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import FormProvider from '../../components/hook-form/FormProvider'
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { RHFTextField } from '../../components/hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';


const LoginForm = () => {

  const [showPassword, setShowPassword] = useState(false);

  //validation rules 
  const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'), // Change email to username
    password: Yup.string().required('Password is required')
  });

  const defaultValues = {
    username: 'dulanjali@gmail.com', // Change email to username
    password: 'dula@123'
  };

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues
  });

  const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } }
    = methods;

  const onSubmit = async (data) => {
    try {
      // Submit data to backend
      const response = await axios.post('http://localhost:5000/auth/token', {
        username: data.username, // Change email to username
        password: data.password
      });
      // If successful response, store token to localStorage
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.log(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message
      });
      // Pop up a modal for failed login
      // You can use any modal library or component for this purpose
      // Here's a simple alert for demonstration
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

        <RHFTextField name='username' label='Username' /> {/* Change name to username */}
        <RHFTextField name='password' label='Password' type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={() => {
                  setShowPassword(!showPassword);
                }}>
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            )
          }} />
      </Stack>
      <Stack alignItems={'flex-end'} sx={{ my: 2 }}>
        <Link component={RouterLink} to='/auth/reset-password'
          variant='body2' color='inherit' underline='always'>Forgot Password?</Link>
      </Stack>
      <Button fullWidth color='inherit' size='large' type='submit' variant='contained'
        sx={{
          bgcolor: 'text.primary', color: (theme) => theme.palette.mode === 'light' ?
            'common.white' : 'grey.800',
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
          }
        }}>Login</Button>
    </FormProvider>
  )
}

export default LoginForm;
