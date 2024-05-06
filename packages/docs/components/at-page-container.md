# AtPageContainer

### props

```ts
const props = withDefaults(
  defineProps<{
    /** flex-col 布局，例如一个搜索 + 一个表格的布局，表格撑满剩余内容 */
    innerScroll?: boolean
    /** 内边距 */
    padding?: number | string
    /** 是否开启横向滚动 */
    xScrollable?: boolean
    /** 是否显示返回顶部按钮 */
    backTop?: boolean
  }>(),
  { padding: '16px' },
)
```

### demos

<demo src="../examples/at-page-container/basic.vue"></demo>
<demo src="../examples/at-page-container/inner-scroll.vue"></demo>
