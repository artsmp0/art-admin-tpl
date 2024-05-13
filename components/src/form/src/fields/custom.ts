import { omit } from 'lodash-unified'
import { type Component, defineComponent, h, reactive, toRefs } from 'vue'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderCustom = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = reactive(toRefs(compProps))
    const { props = undefined, field, component } = item
    const state = useDeps({ item, model })
    const isStringLabel = typeof item.label === 'string'
    props?.onChange?.(model[field], internalConfigStates)
    return () =>
      h(component as Component, {
        'value': model[field],
        'onUpdate:value': (v: any) => {
          model[field] = v
          props?.onChange?.(v, internalConfigStates)
        },
        'placeholder': isStringLabel ? `请输入${item.label}` : undefined,
        ...omit(props, needOmitKeyArr),
        ...state,
      })
  },
})
