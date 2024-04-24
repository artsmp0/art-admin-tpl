import { omit } from 'lodash-unified'
import { NTreeSelect } from 'naive-ui'
import { useDeps, useFetchField } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderTreeSelect = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = reactive(toRefs(compProps))
    const { props = undefined, field, apiFn } = item
    const fetchRes = useFetchField(apiFn)
    const state = useDeps({ item, model }, fetchRes)
    const isStringLabel = typeof item.label === 'string'
    props?.onChange?.(model[field], internalConfigStates)
    return () =>
      h(NTreeSelect, {
        value: model[field],
        onUpdateValue(v: any) {
          model[field] = v
          props?.onChange?.(v, internalConfigStates)
        },
        loading: fetchRes?.loading.value,
        options: fetchRes?.options.value,
        clearable: true,
        placeholder: isStringLabel ? `请选择${item.label}` : undefined,
        ...omit(props, needOmitKeyArr),
        ...state,
      } as any)
  },
})
