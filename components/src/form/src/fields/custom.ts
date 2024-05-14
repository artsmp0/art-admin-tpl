import { omit } from 'lodash-unified'
import { type Component, defineComponent, h, toRefs } from 'vue'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderCustom = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = toRefs(compProps)
    const state = useDeps({ item, model })
    const isStringLabel = typeof item.value.label === 'string'
    return () =>
      h(item.value.component as Component, {
        'value': model.value[item.value.field],
        'onUpdate:value': (v: any) => {
          model.value[item.value.field] = v
          item.value.props?.onChange?.(v, internalConfigStates)
        },
        'placeholder': isStringLabel ? `请输入${item.value.label}` : undefined,
        ...omit(item.value.props, needOmitKeyArr),
        ...state,
      })
  },
})
