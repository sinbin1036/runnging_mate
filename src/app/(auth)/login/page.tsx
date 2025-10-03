import AuthForm from '../_components/AuthForm';
import { login } from '../_actions';

export default function LoginPage() {
  return <AuthForm isSignUp={false} action={login} />;
}

