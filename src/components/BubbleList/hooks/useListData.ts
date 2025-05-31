import type { BubbleListProps, BubbleDataType } from '../types'
import type { BubbleProps } from '../../Bubble/types'
import type { Ref } from 'vue'
import { watch, ref } from 'vue'
export interface useListDataReturnType {
  ListData: Ref<BubbleDataType[]>
  setListData: (value: BubbleListProps['items']) => void
}

// 从 useListData() 中获取 ListData.value 这个数组的单项元素类型，并命名为 ListItemType。
// number为索引访问 表示数组中任意元素类型
export type ListItemType = ReturnType<typeof useListData>['ListData']['value'][number]

export default function useListData(
  items: BubbleListProps['items'],
  roles?: BubbleListProps['roles'],
): useListDataReturnType {
  let getRoleBubblePorps: (bubble: BubbleDataType) => Partial<BubbleProps>
  watch(
    () => roles,
    () => {
      getRoleBubblePorps = (bubble: BubbleDataType) => {
        if (typeof roles === 'function') {
          return roles(bubble)
        }

        if (roles) {
          return roles[bubble['role']! as string]
        }

        return {}
      }
    },
    {
      immediate: true,
    },
  )

  const ListData = ref<BubbleDataType[]>([])
  const setListData = (value: BubbleListProps['items']) => {
    const arr = value?.map((item, index) => {
      const mergeKey = item.key ?? `persit_${index}`
      return {
        ...getRoleBubblePorps(item),
        ...item,
        key: mergeKey,
      }
    })
    ListData.value = arr
    console.log('ListData', ListData.value)
  }
  setListData(items)
  return {
    ListData,
    setListData,
  }
}
