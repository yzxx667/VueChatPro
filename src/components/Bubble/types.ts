import type { VNode, CSSProperties } from "vue";
export interface TypingOption {
  /**
   * @default 50
   */
  interval?: number;
  /**
   * @default 1
   */
  step?: number;
}

export interface BubbleProps {
  avatar?: string | VNode;
  className?: {
    avatar?: string;
    header?: string;
    content?: string;
    footer?: string;
  };
  content?: string | VNode;
  loading?: boolean;
  loadingRender?: undefined | (() => VNode);
  messageRender?: (content: string) => string | VNode;
  placement?: "start" | "end";
  shape?: "round" | "corner";
  styles?: {
    avatar?: CSSProperties;
    content?: CSSProperties;
    footer?: CSSProperties;
    header?: CSSProperties;
  };
  typing?: boolean | TypingOption;
  variant?: "borderless" | "filled" | "outlined" | "shadow";
  // 背景是否透明
  transparent?: boolean;
  // thinkingProps?: ThinkingProps;
}

export interface BubbleEmits {
  (e: "onTypingComplete"): void;
  (e: "onUpdate"): void;
}
