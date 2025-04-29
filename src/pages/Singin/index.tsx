import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './styles.module.scss';
import api from '../../api/axios';
import { emailRegexp } from '../../utils';


export const Signin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const validateEmail = (value: string) => {
      if (!value.trim()) return 'Email is required';
      if (!emailRegexp.test(value)) return 'Invalid email format';
      return '';
    };
  
    const validatePassword = (value: string) => {
      if (!value.trim()) return 'Password is required';
      return '';
    };
  
    const handleChange = (field: string, value: string) => {
      if (field === 'email') setEmail(value);
      if (field === 'password') setPassword(value);
    };
  
    const handleSignin = async () => {
      const newEmailError = validateEmail(email);
      const newPasswordError = validatePassword(password);
      setEmailError(newEmailError);
      setPasswordError(newPasswordError);
    
      if (newEmailError || newPasswordError) return;
    
      try {
        setIsSubmitting(true);
        const response = await api.post('/login', { email, password });
        // Save token
        const token = response.data?.token;
        if (token) {
          localStorage.setItem('token', token);
          navigate('/home');
        } else {
          throw new Error('No token in response');
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('Invalid credentials or server error');
      } finally {
        setIsSubmitting(false);
      }
    };
    
    return (
      <div className={styles.container}>
        <form className={styles.form}  onSubmit={(e) => e.preventDefault()}>
          <h2>Sign in</h2>
          <Input
            label="Email"
            value={email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={emailError}
            placeholder="Enter your email"
            onBlur={() => setEmailError(validateEmail(email))}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={passwordError}
            placeholder="Enter your password"
          />
          <br></br>
          <Button type="button" size="middle" color="primary" variant="contained" disabled={isSubmitting} 
          onClick={handleSignin}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
          <p className={styles.redirect}>
            <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    );
  };
  