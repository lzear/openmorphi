import React, { useState } from 'react';

type NumberStateTuple = [number, (n: number) => void];
export const SpeedContext = React.createContext<{
  splineTuple: NumberStateTuple;
  durationTuple: NumberStateTuple;
}>({ splineTuple: [0.5, () => null], durationTuple: [5000, () => null] });
export const WithSpeed: React.FC = ({ children }) => {
  const splineTuple = useState<number>(0.5);
  const durationTuple = useState<number>(5000);
  return (
    <SpeedContext.Provider value={{ splineTuple, durationTuple }}>
      {children}
    </SpeedContext.Provider>
  );
};
