import { omit } from 'lodash-unified'
import { useDeps } from '../utils'
import { AtMonacoEditor } from '../../../monaco-editor'
import { type RenderFnParams, needOmitKeyArr } from '../types'

export const renderMonacoEditor = defineComponent({
  props: ['item', 'model', 'internalConfigStates'],
  setup(compProps: RenderFnParams) {
    const { item, model, internalConfigStates } = reactive(toRefs(compProps))
    const { props = undefined, field } = item
    const state = useDeps({ item, model })
    props?.onChange?.(model[field], internalConfigStates)
    return () =>
      h(AtMonacoEditor, {
        'clearable': true,
        'value': model[field],
        'onUpdate:value': (v: string) => {
          model[field] = v
          props?.onChange?.(v, internalConfigStates)
        },
        ...omit(props, needOmitKeyArr),
        ...state,
      })
  },
})
