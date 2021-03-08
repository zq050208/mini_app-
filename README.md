# etc_gas

> ETC自营加油小程序

## 构建命令

```bash
# install dep
npm i

# 开发
npm run watch

# 测试环境
npm run build:test

# 预发环境
npm run build:pre

# for 生产环境
npm run build

# YAPI文档生成 Typescript 类型文件
npm run ytt
```

npm script规范 [build|watch]:[dev|prod|]


## 开发相关

### 提交并自动写入CHANGELOG

已接入自动写CHANGELOG，但必须按 angular 的提交[日志规范](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)。

如果不知道怎么写，可以执行 stage 所有要提交的文件后执行 `npm run commit`

自动更新版本执行

### 目录结构

```bash
.
├── build # 构建脚本
│   └── eslint # 项目 eslint 配置
├── config # 环境标量配置
├── dist # 输出目录
│   └── wx # 输出平台
├── src
│   ├── apis # 所有接口的常理管理
│   ├── assets # 静态资源 （tabicon）
│   ├── components # 组件
│   ├── const # 常量
│   ├── mixins # 混合
│   ├── pages # 页面
│   ├── services # 服务
│   ├── store # store
│   ├── styles # 样式
│   ├── templates # 模板
│   ├── types # Typesscript 定义文件
│   ├── utils # 工具
│   └── wxs # wxs
└── static # 静态目录，直接复制到输出目录
    ├── ali # 阿里平台相关
    ├── common # 共享
    └── wx # 微信平台相关
```
