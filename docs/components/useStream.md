---
title: useStream | Vue-Chat
description: useStream 组件的文档
---

# useStream

用于控制流式请求的hook。

## 介绍

`useStream` 是一个hook，可以让用户更方便的控制 流式请求。提供 发起请求 ，中断请求 ，返回 loading 请求状态，返回 SSE 协议 实时的数据流，返回请求 error 信息。

## 基础用法

<preview path="../demo/useStream/Basic.vue" title="基础用法" description="useStream 的基础用法"></preview>

::: warning 注意
这个 hooks 的解析规则，和 ant-design-x 一致，都是在内部做了处理。请放心切换使用

```ts
/**
 * @description 默认分隔符 {@link splitStream}
 */
const DEFAULT_STREAM_SEPARATOR = "\n\n";
/**
 * @description 默认分隔符 {@link splitPart}
 * @example "event: delta\ndata: {\"key\": \"value\"}"
 */
const DEFAULT_PART_SEPARATOR = "\n";
/**
 * @description 键值的默认分隔符，冒号(`:`)用于分隔键值
 * @example "event: delta"
 */
const DEFAULT_KV_SEPARATOR = ":";
```

:::

## 返回钩子

| 属性名      | 说明                 | 类型                         |
| ----------- | -------------------- | ---------------------------- |
| startStream | 开始请求流模式接口   | `({readableStream}) => void` |
| cancel      | 中断流式请求         | `() => void`                 |
| loading     | 是否正在请求流式数据 | `boolean`                    |
| data        | 实时返回的流式数据   | `string`                     |
| error       | 流式请求报错信息     | `string`                     |
