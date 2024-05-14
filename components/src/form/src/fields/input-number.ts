import { omit } from 'lodash-unified'
import { NInputNumber } from 'naive-ui'
import { defineComponent, h, toRefs } from 'vue'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderInputNumber = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = toRefs(compProps)
    const state = useDeps({ item, model })
    const isStringLabel = typeof item.value.label === 'string'
    return () =>
      h(NInputNumber, {
        value: model.value[item.value.field],
        clearable: true,
        placeholder: isStringLabel ? `请输入${item.value.label}` : undefined,
        onUpdateValue: (v: number | null) => {
          model.value[item.value.field] = v
          item.value.props?.onChange?.(v, internalConfigStates)
        },
        ...omit(item.value.props, needOmitKeyArr),
        ...state,
      } as any)
  },
})
