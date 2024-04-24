<script setup lang="ts">
import { cloneDeep, isArray, merge, mergeWith, omit } from 'lodash-unified'
import type { FormInst } from 'naive-ui'
import { EXTRA_FORM_ITEM_PROPS, getElements } from './utils'
import type { FormItemConfig, FormItemElement, GpFormProps } from './types'

defineOptions({
  name: 'AtForm',
})
const props = withDefaults(defineProps<GpFormProps>(), {
  scrollToFirstError: true,
  layout() {
    return { xGap: 16 }
  },
})

const model = defineModel<object>('model', { required: true })
const { genElement, genElements } = getElements(model.value, () => props.configs)
const elements = shallowReactive<FormItemElement[]>(genElements())
// when props.configs is computed, it will auto update elements when config changed.
watch(
  () => props.configs,
  () => {
    Object.assign(elements, genElements())
  },
)
const formRef = shallowRef<FormInst>()

async function validate(...args: any[]) {
  try {
    await formRef.value?.validate(...args)
    return Promise.resolve()
  }
  catch (error: any) {
    if (Array.isArray(error) && props.scrollToFirstError) {
      const t = document.querySelector(`[target="${error[0][0].field}"]`)
      t?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
    return Promise.reject(error)
  }
}

async function setValue(newValue: any) {
  mergeWith(model.value, newValue, (oldVal, newVal) => {
    // 重置对象数组类型的表单需要对齐数组的长度
    if (isArray(oldVal) && isArray(newVal) && oldVal.length > newVal.length)
      oldVal.splice(newVal.length - oldVal.length, Number.POSITIVE_INFINITY)
  })
}

const cloneInitVal = cloneDeep(model.value)
async function resetValue() {
  setValue(props.initValue ?? cloneInitVal)
}

function restoreValidation() {
  formRef.value?.restoreValidation()
}

function updateElementByField(field: string, config: Partial<FormItemConfig>, idx?: number) {
  const oldIdx = elements.findIndex(el => el.field === field)
  if (oldIdx === -1) {
    if (config.field && config.type) {
      const newEl = genElement(config as FormItemConfig)
      if (idx)
        elements.splice(idx, 0, newEl)
      else
        elements.push(newEl)
    }
    else {
      console.warn('新建字段的 type 和 field 必传！')
    }

    return
  }
  elements[oldIdx] = genElement(merge(elements[oldIdx].oldJson, config))
}
defineExpose(
  reactive({
    validate,
    resetValue,
    setValue,
    restoreValidation,
    updateElementByField,
  }),
)

function isString(thing: any) {
  return typeof thing === 'string'
}
</script>

<template>
  <NForm ref="formRef" :model="model" v-bind="props.nFormProps">
    <NGrid v-bind="layout">
      <template v-for="element in elements" :key="element.props.field">
        <template v-if="element.props.type !== 'titleBar'">
          <NFormItemGi
            v-if="!element.props.hide"
            v-bind="omit(element.props, EXTRA_FORM_ITEM_PROPS)"
            :span="element.props.span ?? 24"
            :path="element.props.field"
            :target="element.props.field"
          >
            <template v-if="element.props.label" #label>
              <div flex items-center gap4>
                <span v-if="isString(element.props.label)">{{ element.props.label }}</span>
                <Component :is="element.props.label" v-else />
              </div>
            </template>
            <Component :is="element.widget" />
          </NFormItemGi>
        </template>
        <NGridItem v-else :span="24">
          <div
            :style="{ background: '#f5f5f5' }"
            class="text-16 font-bold mb16 relative flex items-center gap8 flex-auto rounded-base of-hidden"
            :class="titleBarCls"
          >
            <span class="h-36 w4 bg-primary" />
            <span v-if="isString(element.props.label)">{{ element.props.label }}</span>
            <Component :is="element.props.label" v-else />
          </div>
        </NGridItem>
      </template>
    </NGrid>
  </NForm>
</template>
