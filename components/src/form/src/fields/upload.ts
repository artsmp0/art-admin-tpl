import { omit } from 'lodash-unified'
import { defineComponent, h, toRefs } from 'vue'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'
import { AtUpload } from '../../../upload'

export const renderUpload = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = toRefs(compProps)
    const state = useDeps({ item, model })
    return () =>
      h(AtUpload, {
        value: model.value[item.value.field],
        onUpdateValue: (v: any[]) => {
          model.value[item.value.field] = v
          item.value.props?.onChange?.(v, internalConfigStates)
        },
        ...omit(item.value.props, needOmitKeyArr),
        ...state,
      } as any)
  },
})
