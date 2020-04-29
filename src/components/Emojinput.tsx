import React, { useContext, useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { OpenMojiContext, OpenMoji } from '../withOpenMoji';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import Fuse from 'fuse.js';
import MojiE from '../views/CreateAnimation/MojiSelect';
import Spinner from './Spinner';

const LIMIT = 50;
const Emojinput: React.FC<{}> = () => {
  const json = useContext(OpenMojiContext);
  const [fuse, setFuse] = useState<Fuse<
    OpenMoji,
    Fuse.IFuseOptions<OpenMoji>
  > | null>(null);

  const [search, setSearch] = useState('');
  const [list, setList] = useState<OpenMoji[] | null>(null);
  useEffect(() => {
    if (fuse && json) {
      if (search.length)
        setList(
          fuse
            .search(search)
            .filter((e, k) => k < LIMIT)
            .map((el) => el.item),
        );
      else setList(_.sampleSize(json, LIMIT));
    }
  }, [json, fuse, search]);

  useEffect(() => {
    if (json)
      setFuse(
        new Fuse(json, {
          keys: ['hexcode', 'emoji', 'annotation', 'tags', 'openmoji_tags'],
        }),
      );
  }, [json]);

  const handler = useCallback(_.debounce(setSearch, 2000), []);

  const history: History = useHistory();
  return (
    <>
      <input
        placeholder="input search text"
        onChange={(e) => {
          handler(e.target.value);
        }}
        onKeyPress={(e) => {
          const target: HTMLInputElement = e.currentTarget;
          if (e.key === 'Enter') setSearch(target.value);
        }}
      />
      <div>
        {list ? (
          list.map((m) => <MojiE moji={m} key={m.hexcode} history={history} />)
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Emojinput;
