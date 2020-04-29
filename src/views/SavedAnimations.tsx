import React, { useEffect, useState } from 'react';
import faunadb from 'faunadb';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Animation } from '../generated/graphql';
import Spinner from '../components/Spinner';
import { AnimationPreview } from './CreateAnimation/FinalRender';
import SVG from '../components/SVG';

const Tile = styled.div`
  display: inline-block;
  margin: 10px;
`;
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SECRET as string,
});

const SavedAnimations: React.FC<{}> = () => {
  const [anims, setAnims] = useState<Animation[] | null>(null);
  /**
   * Unfortunately, I couldn't find an easy way to get the last page using GraphQL
   */
  useEffect(() => {
    const load = async () => {
      const a: any = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index('animations')), {
            size: 20,
            before: null,
          }),
          q.Lambda((ref) => q.Get(ref)),
        ),
      );
      if (a.data) {
        const c = a.data
          .map(
            (b: any) =>
              ({
                hexcode1: b.data.hexcode1,
                hexcode2: b.data.hexcode2,
                html: b.data.html,
                _ts: b.ts,
                _id: b.ref.value.id,
              } as Animation),
          )
          .reverse();
        setAnims(c);
      }
    };
    load();
  }, []);
  return (
    <div>
      {anims ? (
        anims.map((a: Animation) => (
          <Tile key={a._id}>
            <Link to={'/animations?id=' + a._id}>
              {moment(a._ts / 1000).format('HH:mm, dd MMM D YYYY')}
            </Link>
            <AnimationPreview widthA={150}>
              <SVG svg={a.html} />
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
