import type { CSSProperties } from "vue";
export interface SenderProps {
  modelValue: string;
  className?: {
    actionsList?: string;
    prefix?: string;
    input?: string;
  };
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  rootClassName?: string;
  styles?: {
    actionsList?: CSSProperties;
    prefix?: CSSProperties;
    input?: CSSProperties;
  };
  loading?: boolean;
  variants?: "default" | "updown";
  submitType?: "enter" | "shiftEnter";
  onInput?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export interface SenderMethods {
  handleHeaderClose: () => void;
  handleHeaderOpen: () => void;
  handleFooterClose: () => void;
  handleFooterOpen: () => void;
  handleFocusDefault: () => void;
  handleFocusupDown: () => void;
  handleInputSubmit: (value: string) => void;
  handleInputClear: () => void;
}
