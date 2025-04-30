import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { detectDevice } from '../store/utilsSlice';

export const useWindowSize = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      dispatch(detectDevice({ width, height, isMobile }));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);
};
