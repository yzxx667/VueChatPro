---
title: BubbleList | VueChat
description: BubbleList 组件的文档
---

# BubbleList 对话列表

用于承载 `Bubble` 组件的列表。

## 介绍

`BubbleList` 组件常用于对话界面的列表。

## 基础用法

<preview path="../demo/BubbleList/Basic.vue" title="基础用法" description="BubbleList 组件的基础用法"></preview>

## 自定义对话列表

通过调整`items`加载定制，调整气泡效果。

<preview path="../demo/BubbleList/Custom.vue" title="自定义对话列表" description="BubbleList 组件的自定义对话列表"></preview>

### BubbleList Attributes

| 属性       | 说明                               | 类型                                                       | 默认值 | required |
| ---------- | ---------------------------------- | ---------------------------------------------------------- | ------ | -------- |
| autoScroll | 当内容更新时，自动滚动到最新位置。 | boolean                                                    | true   |          |
| items      | `Bubble` 数据列表                  | (BubbleProps & { key: string \| number, role?: string })[] | -      | true     |

### BubbleList Slots

| 插槽名  | 说明         | 类型 |
| ------- | ------------ | ---- |
| avatar  | 头像         | -    |
| header  | 头部面板     | -    |
| footer  | 底部内容     | -    |
| loading | loading 占位 | -    |
| content | 内容         | -    |
