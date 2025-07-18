import type { CSSProperties, Component, Vnode } from 'vue'
import type { DropDownItemProps } from './components/types'
export interface Groupable {
  /**
   * @desc 分组排序函数
   * @descEN Group sorter
   */
  sort?: unknown
  /**
   * @desc 自定义分组标签渲染
   * @descEN Semantic custom rendering
   */
  title?: unknown
}

export interface MenuProps {
  items: DropDownItemProps[]
  onClick?: (value: Conversation) => void
}

export interface ItemProps {
  direction?: 'ltr' | 'rtl'
  className?: string
  active?: boolean
  info?: Conversation
  menu?: MenuProps
  inEllipsis?: boolean
  line?: number
}

export interface GroupTitleRenderComponents {
  components: {
    // GroupTitleProps
    GroupTitle: Component<any>
  }
}

export type GroupTitleRender =
  | ((group: string, info: GroupTitleRenderComponents) => number | string | Vnode)
  | undefined
export interface Conversation {
  key: string
  label?: string
  timestamp?: number
  group?: string
  icon?: string
  disabled?: boolean
}
export interface ConversationProps {
  // 外层ul的style和className
  style?: CSSProperties
  className?: string
  direction?: 'ltr' | 'rtl'
  groupable?: boolean | Groupable
  items?: Conversation[]
  activeKey?: string
  defaultActiveKey?: string
  onActiveChange?: (value: string) => boolean
  // item的classNames
  classNames?: {
    item: string
  }
  // item的style
  styles?: {
    item: CSSProperties
  }
  menu?: ((value: Conversation) => MenuProps) | DropDownItemProps[]
}
