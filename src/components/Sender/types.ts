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
  variants?: "default" | "updown";
  submitType?: "enter" | "shiftEnter";
  onChange?: (value: string) => void;
  onKeypress?: (e: KeyboardEvent) => void;
  onSubmit?: (value: string) => void;
}

export interface SenderMethods {
  handleHeaderClose: () => void;
  handleHeaderOpen: () => void;
}
