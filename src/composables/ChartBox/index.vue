<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useRoute } from 'vue-router'
import { getImageUrl } from '@/utils/chart'

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  title: '',
  fontColor: '#fff',
  fontSize: 18,
  animationSec: 5,
  isDetails: false,
  loadingTitle: '拼命加载中...',
  bgUrl: '',
  bgColor: '',
})
const emit = defineEmits(['emitLook'])
const route = useRoute()
interface Props {
  title?: string
  loading?: boolean
  fontColor?: string
  fontSize?: number
  animationSec?: number
  loadingTitle?: string
  isDetails?: boolean
  bgUrl?: string
  bgColor?: string
}
const animationSec = computed(() => `${props.animationSec}s`)
const fontSize = computed(() => `${props.fontSize}px`)
function handleLook() {
  emit('emitLook', true)
}
function imgUrl() {
  return getImageUrl(props.bgUrl)
}
</script>

<template>
  <NSpin :show="loading" class="indication-spin" stroke="#0d4b86">
    <template #description>
      <span style="color: #3388d7">{{ loadingTitle }}</span>
    </template>
    <div class="chart-box" :class="{ active: route.params.id === '1' }" :style="{ backgroundImage: `url(${imgUrl()})` }">
      <div v-if="title" class="title-warper" :class="{ 'city-brain': route.params.id === '1' }">
        <div class="title-bar">
          <span v-if="route.params.id !== '1'" class="line" />
          <img v-if="route.params.id !== '1'" class="img" src="~@/assets/polygon.png">
          <span class="title">{{ title }}</span>

          <slot name="date" />
        </div>
        <div class="right-cont">
          <span v-show="isDetails" class="details" @click="handleLook">查看详情</span>
        </div>
      </div>

      <div class="main-warper" :style="{ paddingTop: title ? '40px' : '10px' }">
        <slot />
      </div>
    </div>
  </NSpin>
</template>

<style lang="less" scoped>
.parallel {
    margin-top: 5px;
    margin-right: 4px;
    width: 8px;
    height: 6px;
    background: #02a4e6;
    transform: skew(20deg, 0);
    margin-bottom: 7px;
}

.chart-box {
    display: flex;
    height: 100%;
    flex-direction: column;

    background-size: 100% 100%;

    position: relative;

    border-radius: 5px;

    .title-warper {
        z-index: 20;
        display: flex;
        padding-right: 20px;
        // text-shadow: 0 0 10px #0065ff;
        background: rgba(0, 73, 185, 0.25);
        flex: none;
        justify-content: space-between;
        align-items: center;
        &.city-brain {
            padding-left: 20px;
            background: transparent;
        }
        .title-bar {
            position: relative;
            display: flex;
            height: 37px;
            // font-weight: bold;
            font-weight: 700;
            text-align: left;
            align-items: center;

            .title {
                padding-left: 5px;
                font-size: v-bind('fontSize');
            }

            .img {
                width: 34px;
                height: 36px;
            }

            .line {
                width: 4px;
                height: 100%;
                background: #0065ff;
            }
        }
        .details {
            font-size: 12px;
            padding-left: 10px;
            cursor: pointer;
            color: #00ffff;
        }
    }

    .main-warper {
        flex: 1;
        padding: 0 15px 0 20px;
        background: v-bind('props.bgColor');
    }

    &.active {
        position: relative;
        .title-warper {
            height: 40px;
            padding-top: 15px;
            padding-left: 20px;
            // background: url('~@/assets/titleBg.png') no-repeat, url('~@/assets/titleLine.png') no-repeat;
            background-color: transparent;
            background-size: 100% 100%;
            align-items: center;
        }
        .main-warper {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            padding-top: 40px;
            padding-bottom: 5px;
            border-radius: 0 0 6px 6px;
        }
    }
}
svg text {
    animation: stroke v-bind('animationSec') infinite alternate;
    animation-iteration-count: 1;
    letter-spacing: 2px;
    fill: #fff;
    font-size: v-bind('fontSize');
}
@keyframes stroke {
    0% {
        fill: rgba(72, 138, 20, 0);
        stroke: rgba(255, 255, 255, 0.2);
        stroke-dashoffset: 25%;
        stroke-dasharray: 0 50%;
        stroke-width: 1;
    }
    70% {
        fill: rgba(72, 138, 20, 0);
        stroke: rgba(255, 255, 255, 0.4);
        stroke-width: 1;
    }
    90%,
    100% {
        fill: #fff;
        stroke: rgba(255, 255, 255, 0.9);
        stroke-dashoffset: -25%;
        stroke-dasharray: 50% 0;
        stroke-width: 0;
    }
}
</style>
