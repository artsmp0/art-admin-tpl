import { omit } from 'lodash-unified'
import { NSelect } from 'naive-ui'
import { defineComponent, h, reactive, toRefs } from 'vue'
import { useDeps, useFetchField } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderSelect = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = reactive(toRefs(compProps))
    const { props = undefined, field, apiFn } = item

    const fetchRes = useFetchField(apiFn)
    const state = useDeps({ item, model }, fetchRes)
    const isStringLabel = typeof item.label === 'string'
    props?.onChange?.(model[field], internalConfigStates)
    return () =>
      h(NSelect, {
        value: model[field],
        onUpdateValue: (v: string) => {
          model[field] = v
          props?.onChange?.(model[field], internalConfigStates)
        },
        clearable: true,
        loading: fetchRes?.loading.value,
        options: fetchRes?.options.value,
        placeholder: isStringLabel ? `请选择${item.label}` : undefined,
        filterable: true,
        ...omit(props, needOmitKeyArr),
        ...state,
      } as any)
  },
})
