import { omit } from 'lodash-unified'
import { NInput } from 'naive-ui'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderInput = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = reactive(toRefs(compProps))
    const { props = undefined, field } = item
    const state = useDeps({ item, model })
    const isStringLabel = typeof item.label === 'string'
    props?.onChange?.(model[field], internalConfigStates)
    return () =>
      h(NInput, {
        clearable: true,
        value: model[field],
        placeholder: isStringLabel ? `请输入${item.label}` : undefined,
        onUpdateValue: (v: string) => {
          model[field] = v
          props?.onChange?.(v, internalConfigStates)
        },
        ...omit(props, needOmitKeyArr),
        ...state,
      } as any)
  },
})
