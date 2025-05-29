---
title: useAudio | VueChat
description: useAudio hooks的文档
---

# useAudio

## 介绍

`useAudio` 是一个调用浏览器原生API用于语音识别的 hooks。 结合 `sender` 发送输入框和 `useAudio` 钩子函数，可以很好的实现自定义的语音按钮样式。

## 基础用法

<preview path="../demo/useAudio/Basic.vue" title="基础用法" description="useAudio 的基础用法"></preview>

::: tip 💌 提示
若想使用 `useAudio` 钩子函数，可能需要科学上网。
:::

## useAudio 参数

| 属性名         | 类型                   | 是否必填 | 默认值  | 描述             |
| -------------- | ---------------------- | -------- | ------- | ---------------- |
| lang           | string                 | 否       | 'zh-CN' | 语言             |
| continuous     | boolean                | 否       | true    | 是否连续识别     |
| interimResults | boolean                | 否       | true    | 是否实时返回结果 |
| onError        | (err: unknown) => void | 否       | -       | 错误回调         |
| onStart        | () => void             | 否       | -       | 开始回调         |
| onEnd          | (res: string) => void  | 否       | -       | 结束回调         |
| onResult       | (res: string) => void  | 否       | -       | 实时结果回调     |

## useAudio 返回值

| 属性名  | 类型       | 描述     |
| ------- | ---------- | -------- |
| start   | () => void | 开始录音 |
| stop    | () => void | 停止录音 |
| value   | string     | 录音结果 |
| loading | boolean    | 录音状态 |
