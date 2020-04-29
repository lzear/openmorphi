import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Animation, useGetAnimationsQuery } from '../generated/graphql';
import Spinner from '../components/Spinner';
import { AnimationPreview } from './CreateAnimation/FinalRender';

const Tile = styled.div`
  display: inline-block;
  margin: 10px;
`;

const SavedAnimations: React.FC<{}> = () => {
  const { loading, error, data } = useGetAnimationsQuery({
    variables: { size: 20 },
  });
  const aa: (Animation | null)[] | undefined = data?.animations.data;
  let content = null;
  if (loading) content = <Spinner />;
  if (error)
    content = (
      <p>An error occurred when trying to load recently saved animations</p>
    );
  if (aa)
    content = aa.map(
      (a: Animation | null) =>
        a && (
          <Tile key={a._id}>
            <Link to={'/animations?id=' + a._id}>
              {moment(a._ts / 1000).format('HH:mm, dd MMM D YYYY')}
            </Link>
            <AnimationPreview widthA={150}>
              <div dangerouslySetInnerHTML={{ __html: a.html }} />
            </AnimationPreview>
          </Tile>
        ),
    );
  return <div>{content}</div>;
};

export default SavedAnimations;
