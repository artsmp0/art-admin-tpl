import { omit } from 'lodash-unified'
import { NDatePicker } from 'naive-ui'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderDatePicker = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = reactive(toRefs(compProps))
    const { props = undefined, field } = item
    const state = useDeps({ item, model })
    props?.onChange?.(model[field], internalConfigStates)
    return () =>
      h(NDatePicker, {
        clearable: true,
        formattedValue: model[field],
        onUpdateFormattedValue: (v: any) => {
          model[field] = v
          props?.onChange?.(v, internalConfigStates)
        },
        style: { width: '100%' },
        ...omit(props, ['formattedValue', 'onUpdateFormattedValue', 'onUpdate:formattedValue'].concat(needOmitKeyArr)),
        ...state,
      } as any)
  },
})
