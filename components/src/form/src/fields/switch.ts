import { omit } from 'lodash-unified'
import { NSwitch } from 'naive-ui'
import { defineComponent, h, toRefs } from 'vue'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderSwitch = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = toRefs(compProps)
    const state = useDeps({ item, model })
    return () =>
      h(NSwitch, {
        value: model.value[item.value.field],
        onUpdateValue: (v: any) => {
          model.value[item.value.field] = v
          item.value.props?.onChange?.(v, internalConfigStates)
        },
        ...omit(item.value.props, needOmitKeyArr),
        ...state,
      } as any)
  },
})
