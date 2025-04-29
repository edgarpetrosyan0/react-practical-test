import { useState, ChangeEvent, MouseEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './styles.module.scss';
import api from '../../api/axios';
import { emailRegexp } from '../../utils';


export const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormFields>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
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
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,

    }));

    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: '',
      }));
    }
  };

  const handleSignup = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 

    const newEmailError = validateEmail(form.email);
    const newPasswordError = validatePassword(form.password);

    setErrors({
      email: newEmailError,
      password: newPasswordError,
    });

    if (newEmailError || newPasswordError) return;

    setIsSubmitting(true);

    const signupCall = async () => {
      await api.post('/register', { email: form.email, password: form.password });
    };

    const signinCall = async () => {
      const response = await api.post('/login', { email: form.email, password: form.password });
      return response.data.token; 
    };

    try {
      const [signupResult, signinToken] = await Promise.all([signupCall(), signinCall()]);//?????

      // Store token and navigate if both actions succeeded
      if (signinToken) {
        localStorage.setItem('token', signinToken);
        navigate('/home');
      } else {
        console.error('Login failed after signup.');
      }
    } catch (error) {
      console.error('Error during registration or login:', error);
    } 
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Sign Up</h2>
        <Input
          label="Email"
          value={form.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
          onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(form.email) }))}
          error={errors.email}
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('password', e.target.value)}
          onBlur={() => setErrors((prev) => ({ ...prev, password: validatePassword(form.password) }))}
          error={errors.password}
          placeholder="Enter your password"
        />
        <br />
        <Button
          type="button"
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
      </div>
    </div>
  );
};
