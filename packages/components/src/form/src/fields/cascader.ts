import { omit } from 'lodash-unified'
import { NCascader, NSpin } from 'naive-ui'
import { useDeps, useFetchField } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderCascader = defineComponent({
  props: ['item', 'model'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = reactive(toRefs(compProps))
    const { props = undefined, field, apiFn } = item
    const fetchRes = useFetchField(apiFn)
    const state: any = useDeps({ item, model }, fetchRes)
    const isStringLabel = typeof item.label === 'string'
    props?.onChange?.(model[field], internalConfigStates)

    return () => {
      return h(
        NCascader,
        {
          clearable: true,
          maxTagCount: 'responsive',
          options: fetchRes?.options.value,
          value: model[field],
          placeholder: isStringLabel ? `请选择${item.label}` : undefined,
          onUpdateValue: (v: any) => {
            model[field] = v
            props?.onChange?.(v, internalConfigStates)
          },
          ...omit(props, needOmitKeyArr),
          ...state,
        },
        {
          arrow: () =>
            state?.loading ?? (props as any)?.loading ?? fetchRes?.loading
              ? h(NSpin, {
                size: 12,
              })
              : undefined,
        },
      )
    }
  },
})
