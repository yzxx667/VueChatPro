<template>
  <div ref="listRef" :class="[ns.b(), rootClassName, className, scrollEnd ? ns.b('reach-end') : '']"
    @scroll="handleScroll">
    <Bubble v-for="bubble in ListData" :key="bubble.key" v-bind="bubble"
      :ref="(node) => getBubbleRefs(node, bubble.key)" :on-typing-complete="() => onTypingCompleteFn(bubble)"
      :typing="initialized ? (bubble.typing as boolean) : false">
      <template v-for="(slotName, _slot) in slots" :key="slotName" #[slotName]="slotProps">
        <!-- slotProps可以换成任意字符串 例如foo -->
        <!-- {{ console.log('slotName:', slotName, 'slot function:', _slot, 'slotProps', slotProps) }} -->
        <slot :name="slotName" :info="{ ...slotProps, ...bubble }" :index="slotName" />
      </template>
    </Bubble>
  </div>
</template>

<script setup lang="ts">
import { useClassMoudle } from '@/hooks/useClassMoudle'
import type { BubbleListProps, scrollTopParameters, BubbleDataType } from './types'
import { ref, watch, onMounted, nextTick } from 'vue'
import type { Component } from 'vue'
import Bubble from '../Bubble/Bubble.vue'
import useListData from './hooks/useListData'
// import useDisplayData from './hooks/useDisplayData'
import type { ListItemType } from './hooks/useListData'
const props = withDefaults(defineProps<BubbleListProps>(), {
  autoScroll: true,
  items: () => [],
})
const listRef = ref<HTMLDivElement>()
const updateCount = ref(0)
// 存储bubble的ref
const bubbleRefs = ref<Record<string, InstanceType<typeof Bubble>>>({})
const slots = defineSlots<{
  avatar?: (slotProps: { info: BubbleDataType }) => void
  header?: (slotProps: { info: BubbleDataType }) => void
  loading?: (slotProps: { info: BubbleDataType }) => void
  footer?: (slotProps: { info: BubbleDataType }) => void
}>()

const ns = useClassMoudle('bubble-list')
const scrollEnd = ref(false)
// 兼容 1px 的误差
const Residual = ref(1)

// 默认启动打字
const initialized = ref(true)

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  // 兼容 1px 的误差
  // scrollheight 滚动容器高度 scrollTop 滚动容器滚动高度 clientHeight 滚动容器可视高度
  scrollEnd.value = target.scrollHeight - Math.abs(target.scrollTop) - target.clientHeight <= Residual.value
}

// 获取对话列表以及设置key and 设置bubble的呈现方式（props）
const { ListData, setListData } = useListData(props.items, props.roles)
console.log(props.items, props.roles);


watch(() => props.items, () => {
  setListData(props.items)
}, { deep: true })
// const [displayData, onTypingComplete, ItemsWatch] = useDisplayData(ListData)

// watch(() => ListData.value, () => {
//   ItemsWatch()
// })

// 存储每个bubble的ref
const getBubbleRefs = (
  node: Component<InstanceType<typeof Bubble>> | null,
  key: number | string | undefined | null
) => {
  if (key === null || key === undefined) return
  if (node) {
    Reflect.set(bubbleRefs.value, key, node)
  } else {
    Reflect.deleteProperty(bubbleRefs.value, key)
  }
}

watch(() => updateCount.value, () => {
  if (props.autoScroll && listRef.value && scrollEnd.value) {
    listRef.value!.scrollTo({
      top: listRef.value!.scrollHeight,
      behavior: 'smooth'
    })
  }
})

watch(() => ListData.value.length, () => {
  nextTick(() => {
    if (props.autoScroll) {
      updateCount.value += 1
      scrollEnd.value = true
    }
  })
})


const onTypingCompleteFn = (bubble: ListItemType) => {
  if (!bubble.key) return
  bubble?.onTypingComplete?.()
}

// 滚动逻辑
const scrollTo = ({ key, offset, behavior = 'smooth', block }: scrollTopParameters) => {
  if (typeof offset === 'number') {
    listRef.value?.scrollTo({
      top: offset,
      behavior,
    })
  } else if (key !== undefined) {
    const bubbleInst = bubbleRefs.value[`persit_${key}` as string]
    console.log(bubbleRefs);

    if (bubbleInst) {
      // Block current auto scrolling
      const index = ListData.value.findIndex((dataItem) => dataItem.key === `persit_${key}`)
      console.log('index', index, ListData.value);

      scrollEnd.value = index === ListData.value.length - 1

      // Do native scroll
      bubbleInst.$el.scrollIntoView({
        behavior,
        block,
      })
    }
  }
}

// bubblelist更新的回调
// const onBubbleUpdate = () => {
//   updateCount.value += 1
// }

onMounted(() => {
  nextTick(() => {
    scrollTo({ offset: listRef.value!.scrollHeight, behavior: 'auto' })
  })
})

defineExpose({
  nativeElement: listRef.value,
  scrollTo
})

</script>

<style scoped lang="scss">
@import './style'
</style>
