import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthentication } from '../store/utilsSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.utils);

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(setAuthentication(!!token));
  }, [dispatch]);

  return { isAuthenticated};
}
