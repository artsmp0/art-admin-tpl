import { omit } from 'lodash-unified'
import { defineComponent, h, toRefs } from 'vue'
import { useDeps } from '../utils'
import { AtMonacoEditor } from '../../../monaco-editor'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderMonacoEditor = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = toRefs(compProps)
    const state = useDeps({ item, model })
    return () =>
      h(AtMonacoEditor, {
        'clearable': true,
        'value': model.value[item.value.field],
        'onUpdate:value': (v: string) => {
          model.value[item.value.field] = v
          item.value.props?.onChange?.(v, internalConfigStates)
        },
        ...omit(item.value.props, needOmitKeyArr),
        ...state,
      })
  },
})
