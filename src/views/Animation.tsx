import React from 'react';
import { useLocation } from 'react-router-dom';
import SavedAnimations from './SavedAnimations';
import OneAnimation from './OneAnimation';

const Animation: React.FC = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get('id');
  return id ? <OneAnimation id={id} /> : <SavedAnimations />;
};

export default Animation;
