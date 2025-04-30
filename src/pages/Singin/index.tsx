import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './styles.module.scss';
import api from '../../api/axios';
import { emailRegexp } from '../../utils';
import { setAuthentication } from '../../store/utilsSlice';
import { useDispatch } from 'react-redux';

// TODO make sign in page with small validations dont used <form> element, and when have error any fields when blured error trigged, when typeing in the field remove error
    // signed when press enter button and mouse clicking signin button

export const Signin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState<FormFields>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const validateEmail = useCallback((value: string) => {
    if (!value.trim()){
      return 'Email is required';
    }
    
    if (!emailRegexp.test(value)){
      return 'Invalid email format';
    }
    return '';
  }, []);

  const validatePassword = useCallback((value: string) => {
    if (!value.trim()){
      return 'Password is required';
    }
    return '';
  }, []);

  const handleChange = useCallback(
    (field: 'email' | 'password', value: string) => {

      setForm((prev) => ({
        ...prev, [field]: value
      }));

      if (errors[field]) {

        if (field === 'email') setErrors((prev) => ({
          ...prev, email: validateEmail(value)
        }));

        if (field === 'password') setErrors((prev) => ({
          ...prev, password: validatePassword(value)
        }));

      }

    },
    [errors, validateEmail, validatePassword]
  );

  const validateForm = useCallback(() => {
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    setErrors({ email: emailError, password: passwordError });

    return !emailError && !passwordError;
  }, [form.email, form.password, validateEmail, validatePassword]);


  const handleSignin = useCallback(async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const response = await api.post('/login', form);
      const token = response.data?.token;

      if (!token) throw new Error('No token in response');

      localStorage.setItem('token', token);

      dispatch(setAuthentication(true)); // Update Redux state

      navigate('/home');

    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    } 

  }, [dispatch, form, navigate, validateForm]);


  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Sign in</h2>
        <Input
          label="Email"
          value={form.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('email', e.target.value)
          }
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              email: validateEmail(form.email),
            }))
          }
          error={errors.email}
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('password', e.target.value)
          }
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              password: validatePassword(form.password),
            }))
          }
          error={errors.password}
          placeholder="Enter your password"
        />

        <Button
          type="button"
          size="middle"
          color="primary"
          variant="contained"
          disabled={isSubmitting}
          onClick={handleSignin}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>

        <p className={styles.redirect}>
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

/*useCallback hook memoize the functions for better performance and unnecessary re-renders. */
