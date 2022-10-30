import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import path from "path"
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src')
            },
            {
                find: 'components',
                replacement: path.resolve(__dirname, 'src/components')
            }
        ],
    },
    productionSourceMap: false,
    // 开发请求代理服务
    server: {
        host: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8899',
                // 如果要跨域，需要添加请求头
                changeOrigin: true,
                rewrite: (p) => p.replace(/^\/api/, ''),
            }
        },
        hmr: {
            protocol: 'ws',
            // host: '[2408:8456:c35:a44d:30a5:f608:1290:9dab]',
            host: '192.168.211.107',
            // host: '192.168.0.211',
        },
    },
    plugins: [
        vue(),
        AutoImport({
            // Auto import functions from Vue, e.g. ref, reactive, toRef...
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue'],
            // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
            // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
            resolvers: [
                ElementPlusResolver(),

                // Auto import icon components
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),
            ],
        }),
        Components({
            resolvers: [
                // Auto register icon components
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
                // Auto register Element Plus components
                // 自动导入 Element Plus 组件
                ElementPlusResolver(),
            ],
        }),
        Icons({
            autoInstall: true,
        }),
    ]
})
