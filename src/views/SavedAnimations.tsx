import React, { useEffect, useState } from 'react';
import faunadb from 'faunadb';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MorphInput } from '../generated/graphql';
import Spinner from '../components/Spinner';
import {
  AnimationPreview,
  ViewAnimationElements,
} from './CreateAnimation/FinalRender';
import { MorphData } from '../fauna';
import { validate } from '../utils/svgsanitize';

const Tile = styled.div`
  display: inline-block;
  margin: 10px;
`;
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SECRET as string,
});

const SavedAnimations: React.FC<{}> = () => {
  const [anims, setAnims] = useState<
    (MorphData & { ts: number; id: number })[] | null
  >(null);
  /**
   * Unfortunately, I couldn't find an easy way to get the last page using GraphQL
   */
  useEffect(() => {
    const load = async () => {
      const a: {
        data: {
          data: MorphInput;
          ts: number;
          ref: { value: { id: number } };
        }[];
      } = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index('morphs')), {
            size: 20,
            before: null,
          }),
          q.Lambda((ref) => q.Get(ref)),
        ),
      );
      if (a.data) {
        const c = a.data
          .map((morph) => {
            const morphData: MorphData = JSON.parse(morph.data.data);
            return { ...morphData, ts: morph.ts, id: morph.ref.value.id };
          })
          .reverse()
          .filter(validate);
        setAnims(c);
      }
    };
    load();
  }, []);
  return (
    <div>
      {anims ? (
        anims.map((a) => (
          <Tile key={a.id}>
            <Link to={'/animations?id=' + a.id}>
              {moment(a.ts / 1000).format('HH:mm, dd MMM D YYYY')}
            </Link>
            <AnimationPreview widthA={150}>
              <ViewAnimationElements
                animations={a.svgElements}
                spline={a.spline}
                duration={a.duration}
              />
            </AnimationPreview>
          </Tile>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default SavedAnimations;
