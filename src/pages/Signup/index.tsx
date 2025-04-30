import { useState, ChangeEvent, MouseEvent, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './styles.module.scss';
import api from '../../api/axios';
import { emailRegexp } from '../../utils';
import { setAuthentication } from '../../store/utilsSlice';
import { useDispatch } from 'react-redux';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState<FormFields>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO make sign up page with small validations, don't use <form> element, and when there is an error in any field when unfocus, the error is triggered, when typing in the field , remove the  error
  // registered when pressing the enter button and clicking sign-in button
  // sign in after registration with Promise.allWithMode , for example Promise.allWithMode([singupcall(), signincall()])

  const validateEmail = useCallback((value: string): string => {
    if (!value.trim()) {
      return 'Email is required'
    };
    if (!emailRegexp.test(value)) {
      return 'Invalid email address'
    };

    return '';
  }, []);

  const validatePassword = useCallback((value: string): string => {
    if (!value.trim()) {
      return 'Password is required'
    };
    return '';
  }, []);

  const handleChange = (field: 'email' | 'password', value: string) => {
    setForm((prevForm) => (
      {
        ...prevForm,
        [field]: value,
      }
    ));

    // Reset errors on input change
    if (errors[field]) {
      setErrors((prevErrors) => (
        {
          ...prevErrors,
          [field]: '',
        }
      ));
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
      const response = await api.post('/register', { email: form.email, password: form.password });
      return response.data;
    };

    const signinCall = async () => {
      const response = await api.post('/login', { email: form.email, password: form.password });
      return response.data.token;
    };

    try {

      const [signupResponse, signinToken] = await Promise.allWithMode([ //Promise.all()
        signupCall(),
        signinCall(),
      ], 'recursive');

      if (signinToken) {

        localStorage.setItem('token', signinToken);

        dispatch(setAuthentication(true));  // Update Redux state

        navigate('/home');

      } else {
        console.error('Login failed after signup.');
      }
    } catch (error) {
      console.error('Error registration or login:', error);
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
          <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
