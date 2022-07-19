import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../Redux/Slices/auth";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const {
      register,
      handleSubmit,
      formState: {errors, isValid}
  } = useForm({
      defaultValues: {
          fullName: '',
          email: '',
          password: ''
      },
      mode: 'onChange'
  })

  const onSubmit = async (values) => {
      const data = await dispatch(fetchRegister(values))
      if (!data.payload) {
          alert('Не удалось зарегистрироваться')
      }
     if ('token' in data.payload) {
          window.localStorage.setItem('token', data.payload.token)
      }
  }

  if (isAuth) {
      return <Navigate to="/"/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <TextField  error={Boolean(errors.fullName ?.message)}
                        helperText={errors.fullName ?.message}
                        fullWidth {...register('fullName', {required: 'Укажите ваше полное имя'})} className={styles.field} label="Полное имя" fullWidth />
            <TextField  error={Boolean(errors.email ?.message)}
                        helperText={errors.email ?.message}
                        fullWidth {...register('email', {required: 'Укажите email'})} className={styles.field} label="E-Mail" fullWidth />
            <TextField  error={Boolean(errors.password ?.message)}
                        helperText={errors.password ?.message}
                        type="password"
                        fullWidth {...register('password', {required: 'Укажите пароль'})} className={styles.field} label="Пароль" fullWidth />
            <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                Зарегистрироваться
            </Button>
        </form>
    </Paper>
  );
};
