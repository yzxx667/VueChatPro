---
title: Welcome | Vue-Chat
description: Welcome 组件的文档
---

# Welcome 欢迎 👏🏻

## 介绍

`Welcome` 组件能够清晰地向用户传达可实现的操作范围和主要功能。通过合理设计的欢迎推荐内容，可以有效降低用户的学习门槛，帮助其快速了解系统并顺利上手使用。

## 基础用法

使用 `title`、`description`、`icon` 和 `extra` 来定义`Welcome`的样式。

<preview path="../demo/Welcome/BasicWelcome.vue" title="基础用法" description="Welcome 组件的基础用法"></preview>

## 变体

通过设置 `variant` 属性为 `filled` 或 `borderless` 来定义 `Welcome` 的样式。通过设置 `directions` 属性为 `left` 或 `right` 来定义 `Welcome` 的布局方向。

<preview path="../demo/Welcome/Variant.vue" title="变体" description="Welcome 组件的变体"></preview>

## 自定义样式

通过设置 `styles` 属性来定义 `Welcome` 各部分的自定义样式 `icon`, `title`, `extra`, `description`。

<preview path="../demo/Welcome/Custom.vue" title="自定义样式" description="Welcome 组件的自定义样式"></preview>

## 插槽

使用 `icon` 和 `extra` 插槽来定义`Welcome`的样式。

<preview path="../demo/Welcome/WelcomeSlot.vue" title="使用插槽" description="Welcome 组件的使用插槽"></preview>

## Welcome Attributes

| 属性名      | 类型            | 是否必填 | 默认值 | 描述                                                    |
| ----------- | --------------- | -------- | ------ | ------------------------------------------------------- |
| variant     | string          | 否       | filled | 组件样式变体（filled/borderless）                       |
| direction   | string          | 否       | left   | 文本方向（left/right）                                  |
| icon        | string          | 否       | -      | 图标 URL 地址                                           |
| title       | string          | 否       | -      | 主标题文本内容                                          |
| extra       | string \| VNode | 否       | -      | 副标题文本内容                                          |
| description | string          | 否       | -      | 描述文本内容                                            |
| style       | object          | 否       | -      | 容器外层自定义样式                                      |
| styles      | object          | 否       | -      | 各部分自定义样式（{ icon, title, extra, description }） |

## Welcome Slot

| 插槽名 | 参数 | 类型 | 描述               | 描述 |
| ------ | ---- | ---- | ------------------ | ---- |
| #icon  | -    | Slot | 自定义欢迎图片内容 |      |
| #extra | -    | Slot | 自定义副标题内容   |      |
