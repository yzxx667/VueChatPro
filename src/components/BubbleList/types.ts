import type { BubbleProps } from "../Bubble/types";

// BubbleDataType 的值为其 BubbleDataType 的值联合 BubbleProps 的值
export type BubbleDataType = {
  key?: number | string;
  role?: string;
  [key: string]: any;
} & BubbleProps;

export type RoleType = Partial<Omit<BubbleProps, "content">>;
export interface BubbleListProps {
  autoScroll?: boolean;
  className?: string;
  items: BubbleDataType[];
  // roles?: ((bubbleDataP: BubbleDataType) => RoleType) | Record<string, RoleType>
  rootClassName?: string;
}

export interface scrollTopParameters {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  key?: number | string;
  offset?: number;
}
