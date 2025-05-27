export type ThinkingStatus = "start" | "thinking" | "end" | "error";

export interface ThinkingProps {
  /** 内容 */
  content?: string;
  /** 初始展开状态 */
  modelValue?: boolean;
  status?: ThinkingStatus;
  autoCollapse?: boolean;
  disabled?: boolean;
  duration?: string;
  buttonWidth?: string;
  maxWidth?: string;
  // 内容content区域的背景颜色
  backgroundColor?: string;
  // 内容content区域的文字颜色
  color?: string;
  isBorder?: boolean;
}

export interface ThinkingEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "change", value: boolean, status: ThinkingStatus): void;
}
