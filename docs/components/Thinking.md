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

::: warning 💌 提示
本例是模拟的DeepSeek的思考过程，实际使用时，请使用 `useStream` 钩子函数。
:::

## 插槽

<preview path="../demo/Thinking/Slots.vue" title="插槽" description="通过插槽自定义组件的样式"></preview>

::: tip 💌 slot
通过 `icon` 插槽可以自定义图标。

通过 `label` 插槽可以自定义标签。

通过 `arrow` 插槽可以自定义箭头。

通过 `content` 插槽可以自定义内容。

通过 `error` 插槽可以自定义错误内容。
:::

## 属性

| 属性名            | 类型           | 是否必填 | 默认值                   | 描述                                                                               |
| ----------------- | -------------- | -------- | ------------------------ | ---------------------------------------------------------------------------------- |
| `content`         | String         | 否       | `''`                     | 显示的主要内容文本 无打字效果，由接口返回决定                                      |
| `modelValue`      | Boolean        | 是       |                          | 通过 v-model 绑定展开状态，默认为展开状态                                          |
| `status`          | ThinkingStatus | 否       | `'start'`                | 组件状态：`start`（开始） / `thinking`（思考中） / `end`（完成） / `error`（错误） |
| `autoCollapse`    | Boolean        | 否       | `true`                   | 是否在组件状态变为 `end` 时自动收起内容区域                                        |
| `disabled`        | Boolean        | 否       | `false`                  | 是否禁用组件交互                                                                   |
| `buttonWidth`     | String         | 否       | `'160px'`                | 触发按钮宽度                                                                       |
| `duration`        | String         | 否       | `'0.2s'`                 | 过渡动画时长                                                                       |
| `maxWidth`        | String         | 否       | `'500px'`                | 内容区域最大宽度                                                                   |
| `backgroundColor` | String         | 否       | `'#fcfcfc'`              | 内容区域背景色                                                                     |
| `color`           | String         | 否       | `'var(--el-color-info)'` | 内容文字颜色                                                                       |
| `isBorder`        | Boolean        | 否       | `false`                  | 是否显示边框                                                                       |
| `lb`              | Boolean        | 否       | `true`                   | 是否显示深度思考左边框                                                             |

## 事件

| 事件名    | 参数                                         | 类型     | 描述                     |
| --------- | -------------------------------------------- | -------- | ------------------------ |
| `@change` | `{ value: boolean, status: ThinkingStatus }` | Function | 展开状态或状态变化时触发 |

## 插槽

| 插槽名     | 参数                  | 类型 | 描述                         |
| ---------- | --------------------- | ---- | ---------------------------- |
| `#icon`    | `{ status }`          | Slot | 自定义状态图标               |
| `#label`   | `{ status }`          | Slot | 自定义按钮文字               |
| `#arrow`   | -                     | Slot | 自定义箭头图标               |
| `#content` | `{ content, status }` | Slot | 自定义内容区域（非错误状态） |
| `#error`   | -                     | Slot | 自定义错误信息内容展示       |
