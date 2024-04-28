import { cloneDeep, isArray, omit } from 'lodash-unified'
import { NFormItemGi, NGrid } from 'naive-ui'
import { type VNode, computed, defineComponent, h, ref, watch } from 'vue'
import { EXTRA_FORM_ITEM_PROPS, useDeps } from '../utils'
import type { FormItemConfig, RenderFnParams } from '../types'
import { AtIconBtn } from '../../../icon'
import { getWidget } from '.'

export const renderMultipleBlock = defineComponent({
  props: ['item', 'model'],
  setup(compProps: RenderFnParams) {
    const { props = undefined, field, children, multipleConfig } = compProps.item
    const state = useDeps({ item: compProps.item, model: compProps.model })
    const defaultItem = multipleConfig?.defaultItem ?? cloneDeep(compProps.model[field][0])
    if (!compProps.model[compProps.item.field]) {
      console.warn(`表单 model 无 ${field} 字段！`)
      return null
    }
    if (!children?.length)
      return null
    const getLabelRenderer = (label: FormItemConfig['label']) => {
      if (typeof label === 'string')
        return () => label
      return label
    }

    const disableDel = computed(() => {
      if (!multipleConfig?.limit)
        return
      return compProps.model[field].length <= multipleConfig.limit
    })

    const uuids: string[] = []
    const internalGenConfigs = ref<any[][]>([])

    const genWidgetByIndex = (i: number) => {
      const subItems: VNode[] = []
      if (!compProps.item.children)
        return
      const currentConfig = [...internalGenConfigs.value[i]]
      if (!Array.isArray(currentConfig))
        return
      subItems.push(
        ...(currentConfig
          .map((child) => {
            const path = `${field}.${i}.${child.field}`
            return child.hide
              ? null
              : (
                <NFormItemGi
                  {...omit(child, EXTRA_FORM_ITEM_PROPS)}
                  showLabel={!!child.label}
                  labelStyle={{ alignItems: 'center' }}
                  span={child.span ?? 24}
                  rule={child.rule ?? compProps.item.rule}
                  path={path}
                  key={Math.random()}
                  {...{ target: path }}
                >
                  {{
                    default: () =>
                      h(
                        getWidget({
                          item: { ...child, path },
                          model: compProps.model[field][i],
                          internalConfigStates: currentConfig,
                        }),
                      ),
                    label: getLabelRenderer(child.label),
                  }}
                </NFormItemGi>
                )
          })
          .filter(Boolean) as any[]),
      )
      return (
        <div class="mb8 w-full rounded-base bg-base px8 pt8 hover:shadow-base bd-base" key={uuids[i]}>
          <div class="mb4 flex items-center justify-between">
            <div class="h20 w20 rounded-base bg-gray/30 text-center text-12 lh-20">{i + 1}</div>
            {multipleConfig
              ? (
                <AtIconBtn
                  icon="i-ph-trash-simple-duotone"
                  type="error"
                  text
                  disabled={disableDel.value}
                  onClick={() => {
                    compProps.model[field].splice(i, 1)
                    uuids.splice(i, 1)
                    internalGenConfigs.value.splice(i, 1)
                    multipleConfig.onRemoveButtonClick?.(i, compProps.item)
                  }}
                >
                </AtIconBtn>
                )
              : null}
          </div>
          <NGrid xGap={12} {...props} {...state}>
            {subItems}
          </NGrid>
        </div>
      )
    }

    const widgets = computed(() => {
      const genWidgetArr: any[] = []
      if (!compProps.model[field] && defaultItem) {
        // 如果 model[field] 为 null 或者 undefined 并且存在 defaultItem，则说明这是一个对象数组表单。需要初始化他为一个数组。避免报错 xxx undefined。
        // !!! 后端不规范问题
        compProps.model[field] = []
      }
      if (isArray(compProps.model[field])) {
        for (let i = 0; i < compProps.model[field].length; i++) {
          if (!uuids[i])
            uuids.push(`${Math.random()}`)
          if (!internalGenConfigs.value[i])
            internalGenConfigs.value[i] = cloneDeep(compProps.item.children!)
          genWidgetArr.push(genWidgetByIndex(i))
        }
      }
      else {
        genWidgetArr.push(
          <NGrid
            xGap={12}
            {...props}
            {...state}
            class={`w-full rounded-base bd-base bg-base ${children[0].labelPlacement === 'left' ? 'pt24 px24' : 'px8 pt4'}`}
          >
            {children.map((child) => {
              const path = `${field}.${child.field}`
              return (
                <NFormItemGi
                  {...omit(child, EXTRA_FORM_ITEM_PROPS)}
                  span={child.span ?? 24}
                  rule={child.rule ?? compProps.item.rule}
                  labelStyle={{ alignItems: 'center' }}
                  path={path}
                  key={path}
                  {...{ target: path }}
                >
                  {{
                    default: () => h(getWidget({ item: { ...child, path }, model: compProps.model[field] })),
                    label: getLabelRenderer(child.label),
                  }}
                </NFormItemGi>
              )
            })}
          </NGrid>,
        )
      }
      return genWidgetArr
    })

    const genInternalConfigs = () => {
      const v = compProps.model[field].length
      for (let idx = 0; idx < v; idx++)
        internalGenConfigs.value[idx] = cloneDeep(compProps.item.children!)
    }

    watch(
      [() => compProps.model[field].length, () => compProps.item],
      genInternalConfigs,
      { immediate: true, deep: true },
    )

    return () => {
      return (
        <div class="w-full">
          {widgets.value}
          {multipleConfig && (
            <AtIconBtn
              icon="i-ph-plus-circle-duotone"
              type="primary"
              secondary
              block
              {...multipleConfig.addBtnProps}
              onClick={() => {
                compProps.model[field].push(cloneDeep(defaultItem))
                internalGenConfigs.value.push(cloneDeep(compProps.item.children!))
                uuids.push(`${Math.random()}`)
                multipleConfig.onAddButtonClick?.(compProps.item)
              }}
            >
              {compProps.item.multipleConfig?.addBtnText}
            </AtIconBtn>
          )}
        </div>
      )
    }
  },
})
