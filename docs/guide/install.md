---
layout: doc
---

## 一、安装

你可以使用以下命令通过不同的包管理工具安装 `Vue_Chat_Pro`：

::: code-group

```sh [npm]
npm install Vue_Chat_Pro --save
```

```sh [pnpm]
pnpm add Vue_Chat_Pro --save
```

:::

## 二、验证安装

1. 检查 `package.json` 文件是否包含：

   ```json
   {
     "dependencies": {
       "vue-chat-pro": "^0.0.0"
     }
   }
   ```

2. 运行项目验证组件是否可用：

   ```bash
   pnpm dev
   ```

## 三、按需加载说明

内置 **Tree Shaking** 优化，无需额外配置

1. **按需引入**

```vue
<script>
import { Sender } from "vue-chat-pro";
const value = ref("");
</script>

<template>
  <Sender v-model="value" />
</template>
```

2. **全量引入**

```
// main.ts
import { createApp } from 'vue'
import VueChatPro from 'vue-chat-pro'
import 'vue-chat-pro/es/index.css'
import App from './App.vue'

const app = createApp(App)
// 使用 app.use() 全局引入
app.use(VueChatPro)
app.mount('#app')
```
