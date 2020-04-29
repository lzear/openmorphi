import {
  useReducer,
  Reducer,
  ReducerAction,
  ReducerState,
  Dispatch,
} from 'react';

export type AnimationElement = {
  svgHex: string;
  elementIndex: number;
};

export type AnimationData = {
  source: AnimationElement;
  target: AnimationElement;
};

export type Action =
  | {
      type: 'ADD';
      value: AnimationData;
    }
  | {
      type: 'REMOVE';
      value: number;
    };

export type MyR = Reducer<AnimationData[], Action>;
export const useAnimationReducer = (): [
  ReducerState<MyR>,
  Dispatch<ReducerAction<MyR>>,
] => {
  return useReducer<MyR>((prev, action) => {
    if (action.type === 'ADD') return [...prev, action.value];
    if (action.type === 'REMOVE')
      return prev.filter((v, k) => k !== action.value);
    return prev;
  }, []);
};
