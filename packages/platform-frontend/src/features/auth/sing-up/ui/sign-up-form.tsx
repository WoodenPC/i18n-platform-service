import { Button, FormItem, FormLayout, Input, Panel, PanelHeader } from '@vkontakte/vkui';
import React from 'react';


export const SignUpForm = () => {
    const [formState, setFormState] = React.useState({
        userEmail: '',
        userPassword: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleSignUp = () => {

    }

    return (
        <FormLayout>
        <FormItem>
            <Input type='text' placeholder='your-email@gmail.com' name='userEmail' value={formState.userEmail} onChange={handleChange} />
        </FormItem>
        <FormItem>
            <Input type='password' name='userPassword' value={formState.userPassword} onChange={handleChange} />
        </FormItem>
        <FormItem>
        <Button size="l" onClick={handleSignUp} stretched>
            Зарегистрироваться
        </Button>
        </FormItem>
    </FormLayout>)
}