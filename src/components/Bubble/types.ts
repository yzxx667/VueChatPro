import type { VNode, CSSProperties } from "vue";
import type { ThinkingProps } from "../Thinking/types";
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
  onTypingComplete?: () => void;
  onUpdate?: () => void;
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
  // thinkingProps?: ThinkingProps;
}
