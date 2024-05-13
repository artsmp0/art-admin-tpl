import { type MaybeRefOrGetter, toValue, tryOnMounted, tryOnUnmounted } from '@vueuse/core'
import { omit } from 'lodash-unified'
import { isRef, reactive, ref, shallowReactive, shallowRef, watch } from 'vue'
import { getWidget } from './fields'
import type { FormItemConfig, FormItemElement, RenderFnParams } from './types'

/** 传给表单 FormItem 时需要排除掉这些额外的属性 */
export const EXTRA_FORM_ITEM_PROPS = [
  'type',
  'field',
  'label',
  'props',
  'deps',
  'listener',
  'deep',
  'hide',
  'children',
  'apiFn',
  'button',
  'multipleConfig',
  'component',
] as any

export function useFetchField(apiFn?: Function) {
  if (!apiFn)
    return undefined
  const loading = ref(false)
  const options = shallowRef([])
  const fetchData = async () => {
    loading.value = true
    const res = await apiFn()
    loading.value = false
    options.value = res
  }
  tryOnMounted(fetchData)

  return { loading, options, fetchData }
}

export function useDeps({ item, model }: RenderFnParams, args?: ReturnType<typeof useFetchField>) {
  const state = reactive({})
  if (!item.deps)
    return state

  const watcher = async () => {
    Object.assign(state, await item.listener?.(args?.fetchData))
  }
  tryOnMounted(watcher)
  const refDeps = item.deps.filter(d => isRef(d))

  // 这种写法不行（不知道为啥
  // const modelDeps = item.deps.filter((d) => typeof d === 'string').map((k) => model[k as string]);
  // watch(() => modelDeps, watcher);

  const stop1 = watch(() => item.deps?.map(k => (typeof k === 'string' ? model[k] : null)), watcher, {
    deep: item.deep,
  })
  const stop2 = watch(refDeps, watcher)

  tryOnUnmounted(() => {
    stop1()
    stop2()
  })

  return state
}

export function getElements(model: any, outerConfigs: MaybeRefOrGetter<FormItemConfig[] | undefined>) {
  const genElement = (item: FormItemConfig) => {
    item.path = item.field
    return {
      field: item.field,
      widget: item.type === 'titleBar' ? undefined : getWidget({ item, model }),
      oldJson: item,
      props: shallowReactive(
        omit(item, ['children', 'themeOverrides', 'component', 'multipleConfig', 'slots', 'apiFn', 'props', 'deep', 'deps', 'listener']),
      ),
    } as FormItemElement
  }

  const genElements = () => {
    return toValue(outerConfigs)?.map(config => genElement(config)) ?? []
  }

  return {
    genElement,
    genElements,
  }
}
