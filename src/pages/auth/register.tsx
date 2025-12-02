import { useNavigate } from 'react-router-dom';
import AuthPrompt from '../../components/AuthPrompt/AuthPrompt';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { routes } from '../../constants/utils';
import CardWrapper from '../../wrappers/CardWrapper';
import InputList from '../../wrappers/InputListWrapper';
import SmallInputListWrapper from '../../wrappers/SmallInputListWrapper';
import classes from './auth.module.css';


export default function Register() {
    const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <CardWrapper title='Complete your registration' addLogo={true}>
                <p className={classes.email}>Chimetobbey@gmail.com</p>

                <InputList>
                    <SmallInputListWrapper>
                        <Input label='First name' placeholder='John' type='text' size='small' />
                        <Input label='Last name' placeholder='Doe' type='text' size='small' />
                    </SmallInputListWrapper>
                    <Input label='Password' placeholder='Your password' type='password' size='large' />
                    <Button title="Submit" />
                </InputList>
                <AuthPrompt ctaFunc={() => { navigate(routes.signin) }} foreText="Already have an account?" ctaText='Log In.' />
            </CardWrapper>
        </div>
    )
}