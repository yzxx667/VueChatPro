---
title: Sender | Vue-Chat
description: Sender 组件的文档
---

# Sender 输入框 💭

## 介绍

`Sender` 是用于聊天的输入框组件。具备丰富的交互功能和自定义特性。

## 基础用法

<preview path="../demo/Sender/Basic.vue" title="基础用法" description="这是一个 Sender 输入框"></preview>

## 提示词

<preview path="../demo/Sender/Placeholder.vue" title="提示词" description="这是一个 Sender 输入框，并设置了提示词"></preview>

## 组件的各种状态

<preview path="../demo/Sender/Disabled.vue" title="禁用状态" description="这是一个 Sender 输入框，并设置了禁用状态"></preview>

## 实例方法

<preview path="../demo/Sender/Methods.vue" title="实例方法" description="这是一个 Sender 输入框，并设置了提示词"></preview>

## 提交方法

<preview path="../demo/Sender/Submit.vue" title="提交方法" description="通过 submitType 控制换行与提交模式。默认 'enter'。即 回车提交，'shift + Enter' 换行。"></preview>

## 变体

通过 `variant` 属性设置输入框的变体。默认 'default' | 上下结构 'updown'

<preview path="../demo/Sender/Variants.vue" title="变体" description="通过 variants 控制输入框的变体。默认 'default'。即 默认输入框，'updown' 上下变体。"></preview>

## 自定义操作列表

通过 `actionsList` 插槽设置输入框的操作列表。

<preview path="../demo/Sender/ActionsList.vue" title="自定义操作列表" description="通过 actionsList 插槽设置输入框的操作列表。"></preview>

## 自定义头部

通过 `header` 插槽可以自定义输入框的头部内容。

**相关方法：**

- `senderRef.value.handleHeaderOpen()` - 打开头部容器
- `senderRef.value.handleHeaderClose()` - 关闭头部容器

<preview path="../demo/Sender/Header.vue" title="自定义头部" description="通过 header 插槽设置输入框的头部。"></preview>

## Sender Attributes

| 属性          | 说明             | 类型                                         | 默认值                  | 版本 |
| ------------- | ---------------- | -------------------------------------------- | ----------------------- | ---- |
| v-model       | 双向绑定         | string                                       | -                       | -    |
| classNames    | 样式类名         | Partial<Record<SemanticType, string>>        | -                       | -    |
| placeholder   | 占位符           | string                                       | -                       | -    |
| disabled      | 是否禁用         | boolean                                      | false                   | -    |
| loading       | 是否加载中       | boolean                                      | false                   | -    |
| readOnly      | 是否让输入框只读 | boolean                                      | false                   | -    |
| rootClassName | 根元素样式类     | string                                       | -                       | -    |
| styles        | 语义化定义样式   | Partial<Record<SemanticType, CSSProperties>> | -                       | -    |
| submitType    | 提交模式         | SubmitType                                   | `enter` \| `shiftEnter` | -    |
| variants      | 变体             | `default` \| `updown`                        | `default`               | -    |

## Sender Event

| 事件名   | 说明               |
| -------- | ------------------ |
| onInput  | 输入框值改变的回调 |
| onSubmit | 提交时的回调       |

## Ref 实例方法

| 方法名             | 说明         |
| ------------------ | ------------ |
| handleHeaderOpen   | 打开头部容器 |
| handleHeaderClose  | 关闭头部容器 |
| handleFooterClose  | 关闭底部容器 |
| handleFooterOpen   | 打开底部容器 |
| handleFocusDefault | 聚焦默认变体 |
| handleFocusupDown  | 聚焦上下变体 |
| handleInputSubmit  | 提交输入框   |
| handleInputClear   | 清除输入框   |

## Sender Slots

| 插槽名      | 说明     |
| ----------- | -------- |
| header      | 头部面板 |
| footer      | 底部面板 |
| actionsList | 操作按钮 |
| prefix      | 前缀内容 |
