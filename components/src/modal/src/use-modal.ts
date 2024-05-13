import { shallowRef, unref } from 'vue'

export function useModal() {
  const elRef = shallowRef()
  async function open() {
    await unref(elRef)?.open()
  }

  async function close() {
    await unref(elRef)?.close()
  }
  return [elRef, open, close] as const
}
