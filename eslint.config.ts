import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  // 忽略文件
  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/node_modules/**',
    '**/.vitepress/cache/**',
    '**/docs/.vitepress/cache/**',
    '**/docs/demo/**/*.vue',
    '**/*.test.js',
    '**/*.test.ts',
    '**/*.spec.js',
    '**/*.spec.ts',
    'vite.config.ts',
    'vite.es.config.ts',
    'vite.umd.config.ts',
  ]),

  // 插件配置
  pluginVue.configs['flat/essential'],
  // 使用typescript的规则
  vueTsConfigs.recommended,
  // 跳过eslint格式化 使用prettier
  skipFormatting,

  // 主要配置 - 放在最后以覆盖前面的规则
  {
    name: 'app/files-to-lint',
    files: ['src/**/*.{ts,mts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      // Vue 相关规则
      // 警告未使用的变量
      'vue/no-unused-vars': 'error',
      // 关闭 require-default-prop 规则，允许某些 props 没有默认值。
      'vue/require-default-prop': 'off',
      // 关闭 block-lang 规则，允许 Vue 文件中的 <template>、<script>、<style> 标签没有指定语言。
      'vue/block-lang': 'error',
      // 关闭组件命名必须是多单词的规则，可以使用单个单词作为组件名。
      'vue/multi-word-component-names': 'off',

      // TypeScript 相关规则
      // 警告未使用的变量
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // 关闭 no-explicit-any 规则，允许使用 any 类型。
      '@typescript-eslint/no-explicit-any': 'off',
      // 警告未使用的表达式
      '@typescript-eslint/no-unused-expressions': 'warn',
      // 警告 this 别名
      '@typescript-eslint/no-this-alias': 'warn',

      // 通用规则
      // 关闭 no-console 规则，允许使用 console。
      'no-console': 'off',
      // 警告 debugger
      'no-debugger': 'error',
      // 强制使用 const 来声明不会重新赋值的变量。
      'prefer-const': 'error',
      // 警告使用 var 声明变量
      'no-var': 'error',
    },
  },
)
