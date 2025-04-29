import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './styles.module.scss';
import api from '../../api/axios';
import { emailRegexp } from '../../utils';

export const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value: string): string => {
    if (!value.trim()) return 'Email is required';
    if (!emailRegexp.test(value)) return 'Invalid email address';
    return '';
  };

  const validatePassword = (value: string): string => {
    if (!value.trim()) return 'Password is required';
    return '';
  };

  const handleChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
      if (emailError) setEmailError('');
    } else if (field === 'password') {
      setPassword(value);
      if (passwordError) setPasswordError('');
    }
  };

  const handleSignup = async () => {
    const newEmailError = validateEmail(email);
    const newPasswordError = validatePassword(password);

    setEmailError(newEmailError);
    setPasswordError(newPasswordError);

    if (newEmailError || newPasswordError) return;

    setIsSubmitting(true);

    const signupCall = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            await api.post('/register', { email, password });
            resolve({ success: true });
          } catch (err) {
            reject(new Error('Registration failed'));
          }
        }, 1000);
      });

    const signinCall = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await api.post('/login', { email, password });
            resolve({ success: true, token: response.data.token });
          } catch (err) {
            reject(new Error('Login failed'));
          }
        }, 500);
      });

    try {
      const results = await Promise.allSettled([signupCall(), signinCall()]); //allWithMode ?
      const [signupResult, signinResult] = results;

      if (
        signupResult.status === 'fulfilled' &&
        signinResult.status === 'fulfilled' &&
        (signinResult.value as any).token
      ) {
        localStorage.setItem('token', (signinResult.value as any).token);
        navigate('/home');
      } else {
        console.error('Registration or login failed:', results);
      }
    } catch (err) {
      console.error('Unexpected Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2>Sign Up</h2>
        <Input
          label="Email"
          value={email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => setEmailError(validateEmail(email))}
          error={emailError}
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => setPasswordError(validatePassword(password))}
          error={passwordError}
          placeholder="Enter your password"
        />
        <br />
        <Button
          type='button'
          onClick={handleSignup}
          color="primary"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Sign Up'}
        </Button>
        <p className={styles.redirect}>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </div>
  );
};
// TODO make sign up page with small validations, don't use <form> element, and when there is an error in any field when unfocus, the error is triggered, when typing in the field , remove the  error
// registered when pressing the enter button and clicking sign-in button
 // sign in after registration with Promise.allWithMode , for example Promise.allWithMode([singupcall(), signincall()])