# AtUpload

主要做的封装的目的如下：
1. 默认 `NUpload` 上传失败是根据 http status code 进行判断，但是一般后端接口是根据自定义 code 判断，所以这里加了一个 `isSuccess` 函数进行自定义判断逻辑
2. 根据你传进来的 `format` 函数格式化成你想要的数据格式
3. 根据你传进来的 `toFileList` 函数格式化成 `NUpload` 想要的数据格式

### props

```ts
export interface AtUploadProps {
  value: any
  onUpdateValue: (v: any) => void
  /** 判断是否上传成功 */
  isSuccess?: (response: any) => boolean
  /** 将后端数据转成 naive-ui 需要的文件列表 */
  toFileList?: (value: any[]) => UploadProps['fileList']
  /** 格式化成后端需要的数据格式 */
  format?: (file: UploadFileInfo & { response: any }) => any
  dragTip?: string
  nUploadProps?: Omit<UploadProps, 'themeOverrides'>
}
```

### demos

<demo src="../examples/at-upload/basic.vue"></demo>
<demo src="../examples/at-upload/image-list.vue"></demo>
