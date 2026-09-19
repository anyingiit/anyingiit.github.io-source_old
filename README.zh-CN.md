[English](README.md) · **简体中文**

> 英文版是规范版本。本页与 [README.md](README.md) 不一致时，以英文版为准。

<!-- translation-of: README.md sha256:08d443226fd1d383 -->

<!-- Source: Best-README-Template BLANK_README (Unlicense) — https://github.com/othneildrew/Best-README-Template -->
<a id="readme-top"></a>

# anyingiit.github.io-source_old

一份已归档、已被取代的 Hexo 源码快照，曾用于构建 AnYing 博客，仅作历史留存，不再使用。

[![CI](https://github.com/anyingiit/anyingiit.github.io-source_old/actions/workflows/ci.yml/badge.svg)](https://github.com/anyingiit/anyingiit.github.io-source_old/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/anyingiit/anyingiit.github.io-source_old)](LICENSE)

[报告问题](https://github.com/anyingiit/anyingiit.github.io-source_old/issues/new?template=bug_report.yml) · [提出需求](https://github.com/anyingiit/anyingiit.github.io-source_old/issues/new?template=feature_request.yml)

<details>
  <summary>目录</summary>
  <ol>
    <li><a href="#about-the-project">关于本项目</a></li>
    <li><a href="#getting-started">开始使用</a></li>
    <li><a href="#usage">用法</a></li>
    <li><a href="#contributing">参与贡献</a></li>
    <li><a href="#license">许可证</a></li>
    <li><a href="#contact">联系方式</a></li>
  </ol>
</details>

## 关于本项目

本仓库保存的是曾经用来构建 blog.anyingiit.com 上 AnYing 博客的 Hexo 静态站点源码：`package.json` 锁定了 Hexo 5.4 及其生成器、渲染器插件，`_config.yml` 配置了站点并将 `theme` 指向 NexT 主题，该主题以完整源码的形式被收录在 `themes/hexo-theme-next-master` 下，包括构建钩子 `themes/hexo-theme-next-master/scripts/events/index.js` 和样式文件 `themes/hexo-theme-next-master/source/css/main.styl`。`source/_posts` 下的 27 篇中文文章记录了作者关于 Docker、GitHub Actions、GoLand、Windows 等开发话题的笔记。本仓库已被归档，其名称也表明它是作者其他 `anyingiit.github.io*` 仓库之外的一份被取代的快照，因此这里新增的 CI 只在本地构建站点，从不将其部署到任何地方。

计划中的功能与已知问题，见 [open issues](https://github.com/anyingiit/anyingiit.github.io-source_old/issues)。

## 开始使用

### 环境要求

- Node.js，需要能运行 Hexo 5.4（`package.json` 声明的工具链）的版本
- Yarn，因为确切的依赖版本被锁定在 `yarn.lock` 中
- Git，用于克隆本仓库

### 安装

```sh
git clone https://github.com/anyingiit/anyingiit.github.io-source_old.git
cd anyingiit.github.io-source_old
yarn install
```

## 用法

生成静态站点并在本地预览：

```sh
npx hexo generate
npx hexo server
```

`hexo server` 会在 `http://localhost:4000` 提供生成的 `public/` 目录。它所使用的主题由 `_config.yml` 的 `theme` 字段决定，目前是 `hexo-theme-next-master`。

## 参与贡献

欢迎参与。[CONTRIBUTING.md](CONTRIBUTING.md) 说明如何提交 issue 或 pull request，[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) 说明对所有参与者的行为要求。

请不要在公开的 issue 或 pull request 中报告安全问题。[SECURITY.md](SECURITY.md) 说明了私下报告的方式。

## 许可证

以 MIT 许可证分发。详见 [LICENSE](LICENSE)。

## 联系方式

项目地址：[https://github.com/anyingiit/anyingiit.github.io-source_old](https://github.com/anyingiit/anyingiit.github.io-source_old)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
