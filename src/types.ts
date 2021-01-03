export type Attributes = { [atr: string]: string | null }

export type OkTagNames =
  | 'line'
  | 'path'
  | 'circle'
  | 'ellipse'
  | 'polyline'
  | 'rect'
  | 'polygon'

export type AnimationData = {
  attributesConstant: Attributes
  attributesToAnimate: { [p: string]: [string | null, string | null] }
  tagName: OkTagNames
}

export type AnimationElement = {
  id: string
  idx1: number
  idx2: number
} & AnimationData
