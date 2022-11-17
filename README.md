# 个人主页

https://www.chegi.fun/

使用 next.js 和 vercel 实现

## 构建时渲染静态页面 generate page at build time

来自 Notion 的文章内容是静态的，可以在构建阶段一次性渲染。这个可以由 Next.js 的 getStaticProps 和 getStaticPath 实现。

## GitHub Actions 定时运行 build，更新静态页面

每个小时 deploy 一次。触发 deploy 的原理是借助 vercel 的 [deploy hook](https://vercel.com/docs/concepts/git/deploy-hooks#triggering-a-deploy-hook)

```yml
name: schedule_deploy

on:
  push:
  schedule:
    - cron: "0 0/1 * * *" #每个小时运行一次
jobs:
  set-up-env:
    runs-on: ubuntu-latest
    steps:
      - run: curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_68ulfshB1NsLjtJkSAGUNlqudDdj/VFs5dC5ysm
```
