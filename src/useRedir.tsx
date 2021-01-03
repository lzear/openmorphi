import { useEffect, useContext, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { History, Location } from 'history'
import _ from 'lodash'
import { OpenMojiContext } from './withOpenMoji'

const replaceQueryParams = (history: History, entries: string[][]) => {
  const s = entries.map(([k, v]) => `${k}=${v}`).join('&')
  history.replace(`?${s}`)
}

export const addQueryParam = (
  name: string,
  value: string,
  history: History,
  location: Location,
) => {
  const urlParams = new URLSearchParams(location.search)
  const old = Array.from(urlParams.entries()).filter(([k]) => k !== name)
  replaceQueryParams(history, [...old, [name, value]])
}

export const useRedir = (): void => {
  const history: History = useHistory()
  const location = useLocation()
  const json = useContext(OpenMojiContext)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const entries = ['a', 'b'].map((name) => [name, urlParams.get(name)])
    const namesToAdd = entries.filter(([k, v]) => k && !v).map(([k]) => k!)
    if (namesToAdd.length && json) {
      const old = Array.from(urlParams.entries())
      const toAdd = namesToAdd.map((name) => [name, _.sample(json)!.hexcode])
      replaceQueryParams(history, [...old, ...toAdd])
    }
  }, [history, json, location.search])
}

export const useLoadFromHexcode = (hexcode: string | null) => {
  const [svg, setSvg] = useState<string | null>(null)
  useEffect(() => {
    if (hexcode) {
      const load = async () => {
        const svgResponse: Response = await fetch(
          `https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji@12.1.0/color/svg/${hexcode}.svg`,
        )
        const text = await svgResponse.text()
        setSvg(text)
      }
      load()
    }
  }, [hexcode])
  return svg
}

export const useMojiHtml = (
  name: string,
): null | { hex: string; svg: string } => {
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const hex = urlParams.get(name)
  const svg = useLoadFromHexcode(hex)
  return hex && svg ? { hex, svg } : null
}
