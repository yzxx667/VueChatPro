import type { ConversationProps, Groupable, Conversation } from '../types'
import { computed } from 'vue'

type GroupList = {
  data: Conversation[]
  name?: string
  title?: Groupable['title']
}[]

export default function useGroupable(
  groupable: ConversationProps['groupable'],
  items: ConversationProps['items'] = [],
): [GroupList, boolean] {
  const groupWatch = computed<[boolean, Groupable['sort'], Groupable['title']]>(() => {
    if (!groupable) {
      return [false, undefined, undefined]
    }
    let baseConfig: Groupable = {
      sort: undefined,
      title: undefined,
    }

    if (typeof groupable === 'object') {
      baseConfig = { ...baseConfig, ...groupable }
    }
    return [true, baseConfig.sort, baseConfig.title]
  })

  console.log(groupWatch.value)

  const groupListComputed = computed<[GroupList, boolean]>(() => {
    const isGroup = groupWatch.value[0]
    if (!isGroup) {
      const groupList = [
        {
          name: 'unGroup',
          data: items,
          title: undefined,
        },
      ]
      return [groupList, isGroup as boolean]
    }

    // 得到 data 分组后的结果
    const groupMap = items.reduce<Record<string, Conversation[]>>((acc, pre) => {
      const group = pre.group || 'unGroup'

      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(pre)
      return acc
    }, {})

    const groupKeys =
      groupWatch.value[1] && typeof groupWatch.value[1] !== 'boolean'
        ? Object.keys(groupMap).sort(
            groupWatch.value[1] as unknown as (a: string, b: string) => number,
          )
        : Object.keys(groupMap)

    const groupListFinal: GroupList = groupKeys.map((item) => ({
      name: item === 'unGroup' ? undefined : item,
      data: groupMap[item],
      title: groupWatch.value[2],
    }))

    return [groupListFinal, groupWatch.value[0]] as const
  })

  return groupListComputed.value
}
