import type { ComponentType } from 'react'
import type { LoaderFunction } from 'react-router-dom'

type RouteArgs = Promise<{
  default: ComponentType
  loader?: LoaderFunction
}>

export const route = async (args: RouteArgs) => {
  const { default: Component, loader } = await args

  return {
    Component,
    loader,
  }
}
