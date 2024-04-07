import _ from 'lodash'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import { OpenMoji, OpenMojiContext } from '../withOpenMoji'
import { loadMojiSvg } from '../useRedir'
import * as d3 from 'd3'
import { buildAnimation } from '../AnimationGraph/animate'
import Slider from 'rc-slider'

const speedometer = [
  '🛏️',
  '😴',
  '🐌',
  '🦥',
  '🚶',
  '🚲',
  '🐆',
  '🏎️',
  '🚄',
  '🚀',
  '⚡️',
  '🙉',
  '🙈',
  '😱',
  '🤮',
]
const useTimer = (duration: number) => {
  const [isOver, setOver] = useState(false)
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startTimer = useCallback(() => {
    setOver(false)
    if (timerId.current) {
      clearTimeout(timerId.current)
      timerId.current = null
    }
    timerId.current = setTimeout(() => setOver(true), duration)
  }, [duration])

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current)
        timerId.current = null
      }
    }
  }, [])

  return { startTimer, isOver }
}

const minDuration = 20
const maxDuration = 7000

const Infinite: React.FC = () => {
  const json = useContext(OpenMojiContext)
  const [speed, setSpeed] = useState(45)

  const duration =
    minDuration + (maxDuration - minDuration) * Math.pow((100 - speed) / 100, 2)

  const { isOver, startTimer } = useTimer(duration)

  const [moji1, setMoji1] = useState<OpenMoji | null>(null)
  const [moji2, setMoji2] = useState<OpenMoji | null>(null)
  const [moji3, setMoji3] = useState<OpenMoji | null>(null)
  const [svg1, setSvg1] = useState<string | null>(null)
  const [svg2, setSvg2] = useState<string | null>(null)
  const [svg3, setSvg3] = useState<string | null>(null)

  // const mojis = [moji1, moji2, moji3]
  useEffect(() => {
    if (json) {
      const [m1, m2, m3] = _.sampleSize(json, 3)
      setMoji1(m1)
      setMoji2(m2)
      setMoji3(m3)
      const l1 = async () => setSvg1(await loadMojiSvg(m1.hexcode))
      const l2 = async () => setSvg2(await loadMojiSvg(m2.hexcode))
      const l3 = async () => setSvg3(await loadMojiSvg(m3.hexcode))
      l1()
      l2()
      l3()
    }
  }, [json])

  useEffect(() => {
    if (json && !moji3 && !svg3) {
      const m3 = _.sample(json)!
      setMoji3(m3)
      const l3 = async () => setSvg3(await loadMojiSvg(m3.hexcode))
      l3()
    }
  }, [json, moji3, svg3])

  useEffect(() => {
    if (isOver && moji3 && svg3) {
      setMoji1(moji2)
      setMoji2(moji3)
      setMoji3(null)

      setSvg1(svg2)
      setSvg2(svg3)
      setSvg3(null)
    }
  }, [isOver, moji2, moji3, svg2, svg3])

  useEffect(() => {
    if (moji1 && svg1 && svg2) {
      const anim = buildAnimation(svg1, svg2)
      const svg = d3.select('#svg')
      const paths = svg.selectAll('path')
      // gs.remove()
      const svgGs = paths.data(anim)
      svgGs.exit().remove()
      svgGs
        .enter()
        .append('path')
        // @ts-ignore
        .merge(svgGs)
        .each(function (a) {
          const element = d3.select(this)
          Object.keys(a.attributesConstant).forEach((attr) =>
            // @ts-ignore
            element.attr(attr, a.attributesConstant[attr]),
          )
          const transition = element.transition().duration(duration)
          Object.keys(a.attributesToAnimate).forEach((attr) => {
            // @ts-ignore
            element.attr(attr, a.attributesToAnimate[attr][0])
            // @ts-ignore
            transition.attr(attr, a.attributesToAnimate[attr][1])
          })
        })
      startTimer()
    }
  }, [duration, moji1, startTimer, svg1, svg2])
  return (
    <>
      <p>
        <Link to="/">Back</Link>
      </p>
      <div style={{ width: 200, textAlign: 'center', margin: 'auto' }}>
        {/*Speed:{' '}*/}
        <span style={{ marginLeft: 6, fontSize: '2.2em' }}>
          {speedometer[Math.floor((speed / 101) * speedometer.length)]}
        </span>
        {/*// @ts-ignore*/}
        <Slider<number>
          min={0}
          max={100}
          step={1}
          value={speed}
          onChange={(v) => setSpeed(v)}
        />
      </div>
      {/*<div style={{ display: 'flex', flexDirection: 'row' }}>*/}
      {/*  {[svg1, svg2, svg3].filter(Boolean).map((s, k) => (*/}
      {/*    <div key={mojis?.[k]?.hexcode || k} style={{ width: 200 }}>*/}
      {/*      <SVGComp svg={s} />*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}

      <svg
        id="svg"
        width={300}
        height={300}
        viewBox="0 0 72 72"
        style={{ display: 'block', margin: '30px auto' }}
      />
    </>
  )
}

export default Infinite
