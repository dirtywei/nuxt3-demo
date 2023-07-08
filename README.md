### 运行

```
pnpm install
pnpm dev
pnpm build

```

### runtimeConfig 与 app.config

- runtimeConfig:项目中需要使用指定的私有数据时(与环境变量 NUXT\_有关系)
- app.config:可以放一些需要在构建时使用的公共 Token, 例如主题变量，标题等不敏感的数据
