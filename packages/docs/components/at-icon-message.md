# AtIconMessage

## props

```ts
const props = withDefaults(
  defineProps<{
    tooltipProps?: /* vue-ignore */ TooltipProps
    iconProps?: AtIconProps
    message?: string
  }>(),
  {
    tooltipProps: () => ({ contentStyle: { fontSize: '12px', maxWidth: '266px' } }),
    iconProps: () => ({ icon: 'i-ph-info-duotone' }),
  },
)
```
## demos

<demo title="基础示例" src="../examples/at-icon-message/basic.vue"></demo>
<demo title="基础示例" src="../examples/at-icon-message/custom-trigger.vue"></demo>
