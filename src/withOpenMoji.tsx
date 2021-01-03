import React, { useState, useEffect } from 'react'

export const OpenMojiContext = React.createContext<OpenMoji[] | null>(null)
const getMojis = async (): Promise<OpenMoji[]> => {
  const response = await fetch(
    'https://raw.githubusercontent.com/hfg-gmuend/openmoji/12.1.0/data/openmoji.json',
  )

  return response.json()
}
export type OpenMoji = {
  hexcode: string
  emoji: string
  annotation: string
  tags: string
  openmoji_tags: string
}

export const WithOpenMoji: React.FC = ({ children }) => {
  const [json, setJson] = useState<OpenMoji[] | null>(null)
  useEffect(() => {
    const loadMojis = async (): Promise<void> => {
      setJson(null)
      const mojis = await getMojis()
      setJson(mojis)
    }
    loadMojis()
  }, [])
  return (
    <OpenMojiContext.Provider value={json}>{children}</OpenMojiContext.Provider>
  )
}
