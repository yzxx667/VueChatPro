---
title: Bubble | Vue-Chat
description: Bubble 组件的文档
---

# Bubble 对话气泡

用于聊天的气泡组件。

## 介绍

`Bubble` 组件常用于对话界面的构建。

## 基础用法

<preview path="../demo/Bubble/Basic.vue" title="基础用法" description="Bubble 组件的基础用法"></preview>

## 位置与头像

使用 `avatar` 设置自定义头像，通过 `placement` 设置位置，提供了 start、end 两个选项。

<preview path="../demo/Bubble/Avatar.vue" title="位置与头像" description="Bubble 组件的位置与头像"></preview>

## 加载中

使用 `loading` 属性控制加载状态。

<preview path="../demo/Bubble/Loading.vue" title="加载中" description="Bubble 组件的加载中"></preview>

## 打字器

使用 `typing` 属性控制加载状态。

<preview path="../demo/Bubble/Typing.vue" title="打字器" description="Bubble 组件的打字器"></preview>

## 自定义渲染

使用 `markdown-it` 组件实现自定义渲染。

<preview path="../demo/Bubble/Markdown.vue" title="自定义渲染" description="Bubble 组件的自定义渲染"></preview>

### 变体

使用 `variant` 属性设置气泡的样式变体。

<preview path="../demo/Bubble/Variant.vue" title="变体" description="Bubble 组件的变体"></preview>

### 形状

使用 `shape` 设置气泡的形状。

<preview path="../demo/Bubble/Shape.vue" title="形状" description="Bubble 组件的形状"></preview>

## 插槽

使用 `avatar`、`header`、`footer`、`loading` 插槽来定义`Bubble`的样式。

<preview path="../demo/Bubble/Slot.vue" title="插槽" description="Bubble 组件的插槽"></preview>

## Bubble Attributes

| 属性             | 说明                                                         | 类型                                                                   | 默认值   | 版本 |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- | -------- | ---- |
| avatar           | 展示头像                                                     | VNode \| String                                                        | -        |      |
| content          | 聊天内容                                                     | VNode \| String                                                        | -        |      |
| loading          | 聊天内容加载状态                                             | boolean                                                                | -        |      |
| placement        | 信息位置                                                     | `start` \| `end`                                                       | `start`  |      |
| shape            | 气泡形状                                                     | `round` \| `corner`                                                    | -        |      |
| styles           | 语义化结构 style                                             | [Record<"avatar" \| "content" \| "footer" \| "header", CSSProperties>] | -        |      |
| typing           | 设置聊天内容打字动画                                         | boolean \| \{ step?: number, interval?: number \}                      | false    |      |
| variant          | 气泡样式变体                                                 | `filled` \| `borderless` \| `outlined` \| `shadow`                     | `filled` |      |
| loadingRender    | 自定义渲染加载态内容                                         | () => VNode                                                            | -        |      |
| messageRender    | 自定义渲染内容                                               | (content?: string) => VNode                                            | -        |      |
| onTypingComplete | 打字效果完成时的回调，如果没有设置 typing 将在渲染时立刻触发 | () => void                                                             | -        |      |
| onUpdate         | 内容更新时会触发                                             | () => void                                                             | -        | -    |

## Bubble Slot

| 插槽名  | 说明     | 类型 |
| ------- | -------- | ---- |
| avatar  | 头像     | -    |
| header  | 头部面板 | -    |
| footer  | 底部内容 | -    |
| loading | loading  | -    |
