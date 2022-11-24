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

## ISR

如果只能在构建 build 的时候静态渲染页面，那么在每次构建之间新增的页面，就不能即时更新到 next.js 网站。解决这个问题，只能允许动态渲染这一部分页面。

凭借 Next.js 的 [ISR(Incremental Static Regeneration)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) 支持，可以增量更新 Notion 上随时更新的页面，在 GitHub Actions 构建 build 的间隙，这些页面会得不到即时更新，那么可以等到用户请求的时候再去构建这些页面。

我们可以自己设置需要多久自动更新缓存的新增渲染好的页面，通过 getStaticProps 的返回值 revalidate
