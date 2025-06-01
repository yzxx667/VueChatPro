# 📱 VueChatPro

开箱即用的聊天组件库（基于 Vue3 + ElementPlus）
📚 [文档地址](https://yzxx667.github.io/VueChatPro_Zh/)


## 核心特性

- ✨ 聊天组件：支持消息发送、信息列表、消息气泡、输入框等常用功能
- 🔌 零配置使用：基于 Element-Plus，导入即用，无需繁琐设置
- 📦 按需加载：支持 Tree Shaking，构建体积更小
- 🎨 可自定义：支持插槽和样式覆盖，方便集成和扩展
- 🌍 实用 Hooks：内置多种通用逻辑（如滚动、消息处理等），提升多组件协作效率

## 📦 安装

```bash
# npm
npm install vue-chat-pro

# pnpm（推荐）
pnpm install vue-chat-pro

```

## 验证安装

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

## 按需加载说明

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

```javascript
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

## 🤝 参与贡献

我们欢迎所有形式的贡献：

1. Fork 本仓库
2. 创建 Feature 分支（建议命名为 `feature/your-feature-name`）
3. 提交 Pull Request，附上变更说明

> 如有重大改动，请先通过 issue 与我们沟通～

## ⭐ Stars 历史记录

[![Star History Chart](https://api.star-history.com/svg?repos=yzxx667/VueChatPro_Zh&type=Date)](https://star-history.com/#yzxx667/VueChatPro_Zh&Date)

