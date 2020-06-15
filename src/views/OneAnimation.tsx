import React from 'react';
import { Link } from 'react-router-dom';
import { useFindMorphByIdQuery } from '../generated/graphql';
import Spinner from '../components/Spinner';
import {
  ViewAnimationElements,
  AnimationPreview,
} from './CreateAnimation/FinalRender';
import { MorphData } from '../fauna';
import { validate } from '../utils/svgsanitize';

const OneAnimation: React.FC<{ id: string }> = ({ id }) => {
  const { loading, error, data } = useFindMorphByIdQuery({ variables: { id } });
  const animation = data?.findMorphByID;
  let content = null;
  if (loading) content = <Spinner />;
  if (error) content = <p>Error</p>;
  if (animation) {
    const morph: MorphData = JSON.parse(animation.data);
    if (validate(morph))
      content = (
        <AnimationPreview>
          <ViewAnimationElements
            animations={morph.svgElements}
            duration={morph.duration}
            spline={morph.spline}
          />
        </AnimationPreview>
      );
  }
  return (
    <div>
      <div>
        <Link to="/">Back</Link>
      </div>
      {content}
    </div>
  );
};

export default OneAnimation;
