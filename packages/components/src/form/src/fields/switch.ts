import { omit } from 'lodash-unified'
import { NSwitch } from 'naive-ui'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderSwitch = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = reactive(toRefs(compProps))
    const { props = undefined, field } = item
    const state = useDeps({ item, model })
    props?.onChange?.(model[field], internalConfigStates)
    return () =>
      h(NSwitch, {
        value: model[field],
        onUpdateValue: (v: any) => {
          model[field] = v
          props?.onChange?.(v, internalConfigStates)
        },
        ...omit(props, needOmitKeyArr),
        ...state,
      } as any)
  },
})
