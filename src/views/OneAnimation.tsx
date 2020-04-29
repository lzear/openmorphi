import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAnimationQuery } from '../generated/graphql';
import Spinner from '../components/Spinner';
import { AnimationPreview } from './CreateAnimation/FinalRender';
import SVG from '../components/SVG';

const OneAnimation: React.FC<{ id: string }> = ({ id }) => {
  const { loading, error, data } = useGetAnimationQuery({ variables: { id } });
  const animation = data?.findAnimationByID;
  let content = null;
  if (loading) content = <Spinner />;
  if (error) content = <p>Error</p>;
  if (animation)
    content = (
      <AnimationPreview>
        <SVG svg={animation.html} />
      </AnimationPreview>
    );
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
