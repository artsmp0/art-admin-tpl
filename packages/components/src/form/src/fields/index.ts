import { upperFirst } from 'lodash-unified'
import { h } from 'vue'
import type { RenderFnParams } from '../types'
import * as Fields from './fields'

export function getWidget({ item, model, internalConfigStates }: RenderFnParams) {
  const renderTypeName = `render${upperFirst(item.type)}`
  return h((Fields as any)[renderTypeName], { item, model, internalConfigStates })
}
