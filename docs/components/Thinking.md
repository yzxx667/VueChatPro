---
title: Thinking | Vue-Chat
description: Thinking 组件的文档
---

# Thinking

用于显示思考过程的组件。

## 介绍

`Thinking` 是一个用于展示思考中状态的组件，支持 状态管理 、内容展开/收起 和 自定义样式。通过不同状态（开始/思考中/完成/错误）的视觉反馈，帮助用户直观理解AI的思考流程。组件内提供灵活的扩展插槽，适合在智能对话、数据分析等场景中使用。

::: tip 💌 消息
此组件可以和 `Bubble` 、 `BubbleList` 等组件一起使用，以实现更丰富的交互体验（例如DeepSeek的思考过程）。
:::

## 基础用法

<preview path="../demo/Thinking/Basic.vue" title="基础用法" description="Thinking 的基础用法"></preview>

::: tip 💌 props
通过 `content` 属性可以设置内容展示。

通过 `v-model` 可以控制组件的展开/收起。
:::

## 状态

<preview path="../demo/Thinking/Status.vue" title="状态用法" description="通过 status 属性设置组件的状态，一共有四个默认状态，分别是 start、thinking、end、error"></preview>

## 自动收起

<preview path="../demo/Thinking/Auto.vue" title="自动收起" description="通过 auto-collapse 属性设置组件的自动收起"></preview>

## 禁用

<preview path="../demo/Thinking/Disabled.vue" title="禁用" description="通过 disabled 属性设置组件的禁用状态"></preview>

## 宽度定制

<preview path="../demo/Thinking/Width.vue" title="宽度定制" description="通过 button-width 和 max-width 属性设置组件的宽度"></preview>

## 颜色定制

<preview path="../demo/Thinking/Color.vue" title="颜色定制" description="通过 color 和 background-color 属性设置组件的颜色"></preview>

## 深度思考

<preview path="../demo/Thinking/DeepThinking.vue" title="深度思考" description="通过深度思考，实现更复杂的思考过程(类似DeepSeek的思考过程)"></preview>

## 插槽

<preview path="../demo/Thinking/Slots.vue" title="插槽" description="通过插槽自定义组件的样式"></preview>

::: tip 💌 slot
通过 `icon` 插槽可以自定义图标。

通过 `label` 插槽可以自定义标签。

通过 `arrow` 插槽可以自定义箭头。

通过 `content` 插槽可以自定义内容。

通过 `error` 插槽可以自定义错误内容。
:::
