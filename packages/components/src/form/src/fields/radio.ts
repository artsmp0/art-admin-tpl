import { omit } from 'lodash-unified'
import { NRadio, NRadioButton, NRadioGroup, NSpace } from 'naive-ui'
import { useDeps } from '../utils'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderRadio = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = reactive(toRefs(compProps))
    const { props = undefined, field, button } = item
    if (!(props as any)?.options)
      console.warn('radio options must be required!')

    const state = useDeps({ item, model })
    const children = button
      ? (item.props as any)?.options.map((o: any) =>
          h(
            NRadioButton,
            {
              value: o.value,
              key: o.value,
            },
            () => o.label,
          ),
        )
      : h(
        NSpace,
        null,
        () =>
          (item.props as any)?.options.map((o: any) =>
            h(
              NRadio,
              {
                value: o.value,
                key: o.value,
              },
              () => o.label,
            ),
          ),
      )
    props?.onChange?.(model[field], internalConfigStates)
    return () =>
      h(
        NRadioGroup,
        {
          value: model[field],
          onUpdateValue: (v: any) => {
            model[field] = v
            props?.onChange?.(v, internalConfigStates)
          },
          ...omit(item.props, needOmitKeyArr),
          ...state,
        } as any,
        () => children,
      )
  },
})
