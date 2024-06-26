import React, { useContext, useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { OpenMoji, OpenMojiContext } from '../withOpenMoji'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'
import MojiE from '../views/CreateAnimation/MojiSelect'
import Spinner from './Spinner'
import { randomString } from '../views/CreateAnimation/AnimationMaker'

const LIMIT = 64
const Emojinput: React.FC = () => {
  const [seed, setSeed] = useState(randomString())
  const json = useContext(OpenMojiContext)
  const [fuse, setFuse] = useState<Fuse<OpenMoji> | null>(null)
  const [search, setSearch] = useState('')
  const [list, setList] = useState<OpenMoji[] | null>(null)
  useEffect(() => {
    if (fuse && json)
      if (search.length)
        setList(
          fuse
            .search(search)
            .filter((e, k) => k < LIMIT)
            .map((el) => el.item as OpenMoji),
        )
      else setList(_.sampleSize(json, LIMIT))
  }, [json, fuse, search, seed])

  useEffect(() => {
    if (json)
      setFuse(
        new Fuse(json, {
          keys: ['hexcode', 'emoji', 'annotation', 'tags', 'openmoji_tags'],
        }),
      )
  }, [json])

  const handler = useMemo(() => {
    return _.debounce(setSearch, 2000)
  }, [])

  const history = useNavigate()
  return (
    <>
      <div style={{ display: 'flex' }}>
        <button onClick={() => setSeed(randomString())}>Random list</button>
        <span style={{ margin: '0 15px' }}>or</span>
        <input
          placeholder="input search text"
          onChange={(e) => {
            handler(e.target.value)
          }}
          onKeyPress={(e) => {
            const target: HTMLInputElement = e.currentTarget
            if (e.key === 'Enter') setSearch(target.value)
          }}
        />
      </div>
      <div>
        {list ? (
          list.map((m) => <MojiE moji={m} key={m.hexcode} history={history} />)
        ) : (
          <Spinner />
        )}
      </div>
    </>
  )
}

export default Emojinput
