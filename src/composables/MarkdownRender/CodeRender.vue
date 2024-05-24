<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export default {
  props: {
    code: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return {
      str: hljs.highlightAuto(props.code).value,
    }
  },
}
</script>

<template>
  <pre>
    <code v-html="str" />
  </pre>
</template>
