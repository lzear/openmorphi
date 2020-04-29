import React, { useState } from 'react';

type NumberState = [number, (n: number) => void];
export const SpeedContext = React.createContext<{
  speed: NumberState;
  duration: NumberState;
}>({ speed: [0.5, () => null], duration: [5000, () => null] });
export const WithSpeed: React.FC = ({ children }) => {
  const speed = useState<number>(0.5);
  const duration = useState<number>(5000);
  return (
    <SpeedContext.Provider value={{ speed, duration }}>
      {children}
    </SpeedContext.Provider>
  );
};
