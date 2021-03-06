import {
  Button,
  FormItem,
  FormLayout,
  FormLayoutGroup,
  FormStatus,
  Input,
  Link,
} from '@vkontakte/vkui';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

import { signUpHooks } from '../model';

export const SignUpForm = () => {
  const { status, isLoading, resetSignUpStatusFn, signUpFn } =
    signUpHooks.useSignUp();

  const [formState, setFormState] = React.useState({
    userEmail: '',
    userPassword: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignUp = () => {
    signUpFn(formState);
  };

  React.useEffect(
    () => () => {
      resetSignUpStatusFn();
    },
    []
  );

  return (
    <FormLayout onSubmit={handleSignUp}>
      {status !== 'idle' && (
        <FormItem>
          <FormStatus mode={status === 'fail' ? 'error' : 'default'}>
            {status === 'fail' &&
              'Ошибка регистрации, пожалуйста попробуйте еще раз'}
            {status === 'success' && 'Успешно зарегистрированы'}
          </FormStatus>
        </FormItem>
      )}
      <FormItem>
        <Input
          type='text'
          placeholder='your-email@gmail.com'
          name='userEmail'
          value={formState.userEmail}
          onChange={handleChange}
        />
      </FormItem>
      <FormItem>
        <Input
          type='password'
          name='userPassword'
          value={formState.userPassword}
          onChange={handleChange}
        />
      </FormItem>
      <FormLayoutGroup mode='vertical'>
        <FormItem>
          <Button size='l' onClick={handleSignUp} loading={isLoading} stretched>
            Зарегистрироваться
          </Button>
        </FormItem>
        <FormItem>
          <Link href='/signIn'>Войти</Link>
        </FormItem>
      </FormLayoutGroup>
    </FormLayout>
  );
};
