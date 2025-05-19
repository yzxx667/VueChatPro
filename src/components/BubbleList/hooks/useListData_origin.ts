import type { Ref } from 'vue'
import type { BubbleProps } from '../../Bubble/types'

import type { BubbleDataType, BubbleListProps } from '../types'
import { ref, watch } from 'vue'

export interface UseListDataReturnType {
  ListData: Ref<BubbleListProps['items']>
  setListData: (value: BubbleListProps['items']) => void
}

// 从 useListData() 中获取 ListData.value 这个数组的单项元素类型，并命名为 ListItemType。
export type ListItemType = ReturnType<typeof useListData>['ListData']['value'][number]

// 把输入数组 items 处理成带默认属性 / 唯一 key 的响应式列表
export default function useListData(
  items: BubbleListProps['items'],
  roles?: BubbleListProps['roles'],
): UseListDataReturnType {
  let getRoleBubbleProps: (bubble: BubbleDataType) => Partial<BubbleProps>

  // 获得单个bubble的role信息（包括placement avatar等）
  watch(
    () => roles,
    () => {
      getRoleBubbleProps = (bubble: BubbleDataType): Partial<BubbleProps> => {
        console.log('bubble', bubble)
        console.log(roles)
        if (typeof roles === 'function') {
          return roles(bubble)
        }

        if (roles) {
          return roles[bubble.role as string] || {}
        }

        return {}
      }
    },
    {
      immediate: true,
    },
  )

  const ListData = ref<BubbleListProps['items']>([])
  const setListData = (value: BubbleListProps['items']) => {
    console.log('value', value)
    const arr = (value || []).map((bubbleData, i) => {
      const mergedKey = bubbleData.key ?? `preset_${i}`

      return {
        ...getRoleBubbleProps(bubbleData),
        ...bubbleData,
        key: mergedKey,
      }
    })
    ListData.value = arr
  }

  setListData(items)

  return {
    ListData,
    setListData,
  }
}
