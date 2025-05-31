---
title: Conversation | VueChat
description: Conversation 组件的文档
---

# Conversation 管理对话

用于记录用户发送的历史对话列表。

## 介绍

`Conversations` 是一个基于 Vue 3 和 Element Plus 开发的会话管理组件，支持分组展示、菜单交互、自定义样式等功能。适用于消息列表、任务分组等场景，通过灵活的配置和插槽扩展，满足多样化的业务需求。

## 基础用法

<preview path="../demo/Conversation/Basic.vue" title="基础用法" description="Conversation 组件的基础用法"></preview>

## 添加菜单

配合 `menu` 属性，实现添加操作菜单

<preview path="../demo/Conversation/Menu.vue" title="添加菜单" description="Conversation 组件的添加菜单"></preview>

## 分组

配合 `groupable` 属性，实现分组展示(同时可以自定义sort函数实现自定义分组)

<preview path="../demo/Conversation/Group.vue" title="分组" description="Conversation 组件的分组"></preview>

## Conversation Attributes

| 属性              | 说明                                                     | 类型                                                | 默认值 | 版本 |
| ----------------- | -------------------------------------------------------- | --------------------------------------------------- | ------ | ---- |
| v-model:activeKey | 当前选中的值                                             | string                                              | -      | -    |
| defaultActiveKey  | 默认选中值                                               | string                                              | -      | -    |
| items             | 会话列表数据源                                           | `Conversation`[]                                    | -      | -    |
| onActiveChange    | 选中变更回调                                             | (value: string) => void                             | -      | -    |
| menu              | 会话操作菜单                                             | MenuProps \| ((value: `Conversation`) => MenuProps) | -      | -    |
| groupable         | 是否支持分组, 开启后默认按 `Conversation.group` 字段分组 | boolean \| GroupableProps                           | -      | -    |
| styles            | 语义化结构 style                                         | Record<'item', CSSProperties>                       | -      | -    |
| classNames        | 语义化结构 className                                     | Record<'item', string>                              | -      | -    |

### Conversation

| 属性      | 说明                                                 | 类型            | 默认值 | 版本 |
| --------- | ---------------------------------------------------- | --------------- | ------ | ---- |
| key       | 唯一标识                                             | string          | -      | -    |
| label     | 会话名称                                             | VNode \| string | -      | -    |
| timestamp | 会话时间戳                                           | number          | -      | -    |
| group     | 会话分组类型，与 `ConversationsProps.groupable` 联动 | string          | -      | -    |
| icon      | 会话图标                                             | VNode \| string | -      | -    |
| disabled  | 是否禁用                                             | boolean         | -      | -    |

### GroupableProps

| 属性   | 说明         | 类型                             | 默认值 | 版本 |
| ------ | ------------ | -------------------------------- | ------ | ---- |
| `sort` | 分组排序函数 | (a: string, b: string) => number | -      | -    |
