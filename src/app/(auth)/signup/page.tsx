import AuthForm from '../_components/AuthForm';
import { signup } from '../_actions';

export default function SignUpPage() {
  return <AuthForm isSignUp action={signup} />;
}
