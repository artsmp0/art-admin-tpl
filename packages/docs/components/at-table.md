# AtTable

## props

```ts
export interface AtTableProps {
  listApi: (...params: any[]) => Promise<any>
  /** 分页相关数据获取的路径字符串或者参数名称 */
  pagerKeys?: PagerKeys
  pagination?: DataTableProps['pagination']
  columns: TableColumns
  sorterKeys?: SorterKeys
  selection?: TableSelectionColumn
  /** 右侧功能区 */
  rightUtils?: RightUtils
  size?: DataTableProps['size']
  /** 对 data 是否采用 ref 包裹还是 shallowRef，一般如果不需要行内编辑，shallowRef 即可，不用深度侦听对象，明显性能会好一些 */
  deepReactive?: boolean
  /** 自动处理异步数据展开 */
  defaultExpandAll?: boolean
  rowKey?: DataTableProps['rowKey']
  /** 是否自动调取接口获取数据 */
  autoFetch?: boolean
  /** 表格头部类名 */
  headerCls?: string
  /** 开启自适应列宽(有一列存在 fitContent)后，该属性由内部计算，注意：此时非自适应列宽的 column 的 width 必须存在 */
  scrollX?: number
  /** 表格外边框 @default true */
  outerBordered?: boolean
  tableTitle?: string
  rowClassName?: DataTableProps['rowClassName']
}
```

## demos

#### 基础示例
自适应容器高度，并且表格内滚动。
<demo src="../examples/at-table/basic.vue"></demo>

#### 自适应列宽
开启自适应列宽(有一列存在 `fitContent`)后，`scrollX` 由内部计算，注意：此时非自适应列宽的 `column` 的 `width` 必须存在。注意，此时每一列的 `key` 不能重复，否则计算会失效。
<demo src="../examples/at-table/auto-column-width.vue"></demo>
