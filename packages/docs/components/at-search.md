# AtSearch

## props

```ts
const props = withDefaults(
  defineProps<{
    labelWidth?: string
    /** 查询按钮的 loading 状态 */
    loading?: boolean
    /** 最小宽度，小于会自动换行 @default 320px */
    minWidth?: string
    /** 和 AtForm 一样 */
    configs: FormItemConfig[]
    /** 容器类样式 */
    bgCls?: string
    /** 等同于 NCard */
    cardStyle?: CSSProperties
    /** 默认展开 @default false */
    defaultOpen?: boolean
  }>(),
  {
    labelWidth: '100px',
    minWidth: '320px',
    bgCls: 'bg-base',
    cardStyle: () => ({
      padding: '16px',
      paddingRight: 0,
    }),
  },
)
```

## demos

#### 基础示例
<demo src="../examples/at-search/basic.vue"></demo>

#### 显示 label 与自定义宽度
<demo src="../examples/at-search/custom-width.vue"></demo>

#### 自定义操作
<demo src="../examples/at-search/custom-action.vue"></demo>
