import {
  Button,
  FormItem,
  FormLayout,
  FormLayoutGroup,
  Input,
  Link,
  Panel,
  PanelHeader,
} from '@vkontakte/vkui';
import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { useSignIn } from '../model/hooks';

export const SignInForm = () => {
  const { isLoading, signInFn } = useSignIn();

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

  const handleSignIn = () => {
    signInFn(formState);
  };

  return (
    <FormLayout onSubmit={handleSignIn}>
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
          <Button size='l' onClick={handleSignIn} loading={isLoading} stretched>
            Войти
          </Button>
        </FormItem>
        <FormItem>
          <RouterLink to='/signUp'>
            <Link href='/signUp'>Создать Аккаут</Link>
          </RouterLink>
        </FormItem>
      </FormLayoutGroup>
    </FormLayout>
  );
};
