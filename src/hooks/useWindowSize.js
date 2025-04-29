import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { detectDevice } from '../store/utilsSlice';

const getDeviceMode = (width) => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const useWindowSize = () => {
  const dispatch = useDispatch();

  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const mode = getDeviceMode(width);

    dispatch(detectDevice({ mode, width, height }));
  };

  useEffect(() => {
    handleResize(); // initial dispatch
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
};

export default useWindowSize;
