import { useNavigate } from 'react-router-dom';
import AuthPrompt from '../../components/AuthPrompt/AuthPrompt';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import CardWrapper from '../../wrappers/CardWrapper';
import InputList from '../../wrappers/InputListWrapper';
import classes from './auth.module.css';
import { routes, URL, withCredentials } from '../../constants/utils';
import { useState } from 'react';
import type { LOGIN_VALUES } from './types';
import { LoginValues } from './constant';
import axios from 'axios';
import { useError } from '../../stateManagement/useError';
import { useToast } from '../../stateManagement/useToast';


export default function Login() {
    const navigate = useNavigate();
    const { handleAPIError } = useError();
    const {addToast} = useToast();
    const [values, setValues] = useState<LOGIN_VALUES>(LoginValues);
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e?.preventDefault();
        try {
            await axios.post(`${URL}/user/login`, values, withCredentials);
            addToast('success', 'Success', 'Welcome back');
            navigate(routes.home)
        } catch (error) {
            handleAPIError(error)
        }
    }

    return (
        <div className={classes.container}>
            <CardWrapper title='Welcome back' addLogo={true}>
                <InputList cta={handleSubmit}>
                    <Input value={values.email} name='email' handleChange={handleInput} label='Email' placeholder='Name@example.com' type='email' size='large' />
                    <Input value={values.password} name='password' handleChange={handleInput} label='Password' placeholder='Your password' type='password' size='large' />
                    <Button title="Log In" />
                </InputList>
                <AuthPrompt ctaFunc={() => { navigate(routes.forgotPassword) }} foreText="Did you forget your password?" ctaText='Reset Password.' />
            </CardWrapper>
        </div>
    )
}