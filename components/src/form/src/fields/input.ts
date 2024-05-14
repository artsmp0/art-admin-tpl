import { omit } from 'lodash-unified'
import { NInput } from 'naive-ui'
import { defineComponent, h, toRefs } from 'vue'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderInput = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = toRefs(compProps)
    const state = useDeps({ item, model })
    const isStringLabel = typeof item.value.label === 'string'
    return () =>
      h(NInput, {
        clearable: true,
        value: model.value[item.value.field],
        placeholder: isStringLabel ? `请输入${item.value.label}` : undefined,
        onUpdateValue: (v: string) => {
          model.value[item.value.field] = v
          item.value.props?.onChange?.(v, internalConfigStates)
        },
        ...omit(item.value.props, needOmitKeyArr),
        ...state,
      } as any)
  },
})
