<!-- Source: Best-README-Template BLANK_README (Unlicense) — https://github.com/othneildrew/Best-README-Template -->
<a id="readme-top"></a>

# anyingiit.github.io-source_old

An archived, superseded snapshot of the Hexo source that once built the AnYing blog, kept for its history rather than for further use.

**English** · [简体中文](README.zh-CN.md)

[![CI](https://github.com/anyingiit/anyingiit.github.io-source_old/actions/workflows/ci.yml/badge.svg)](https://github.com/anyingiit/anyingiit.github.io-source_old/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/anyingiit/anyingiit.github.io-source_old)](LICENSE)

[Report a bug](https://github.com/anyingiit/anyingiit.github.io-source_old/issues/new?template=bug_report.yml) · [Request a feature](https://github.com/anyingiit/anyingiit.github.io-source_old/issues/new?template=feature_request.yml)

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

This repository holds the Hexo static-site source that once built the AnYing blog at blog.anyingiit.com: `package.json` pins Hexo 5.4 and its generator and renderer plugins, `_config.yml` configures the site and points `theme` at the NexT theme, and that theme is vendored in full under `themes/hexo-theme-next-master`, including the build hooks at `themes/hexo-theme-next-master/scripts/events/index.js` and the stylesheet at `themes/hexo-theme-next-master/source/css/main.styl`. Twenty-seven Chinese-language posts under `source/_posts` cover the author's own notes on Docker, GitHub Actions, GoLand, Windows and similar developer topics. The repository is archived, and its name marks it as a superseded snapshot alongside the owner's other `anyingiit.github.io*` repositories, so the CI added here only builds the site locally and never deploys it anywhere.

See the [open issues](https://github.com/anyingiit/anyingiit.github.io-source_old/issues) for planned features and known issues.

## Getting Started

### Prerequisites

- Node.js, a version able to run Hexo 5.4, the toolchain `package.json` declares
- Yarn, since the exact dependency versions are pinned in `yarn.lock`
- Git, to clone the repository

### Installation

```sh
git clone https://github.com/anyingiit/anyingiit.github.io-source_old.git
cd anyingiit.github.io-source_old
yarn install
```

## Usage

Generate the static site and preview it locally:

```sh
npx hexo generate
npx hexo server
```

`hexo server` serves the generated `public/` directory at `http://localhost:4000`. The theme it renders with is set by `_config.yml`'s `theme` key, currently `hexo-theme-next-master`.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for how to open an issue or a pull request, and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for the standards expected of everyone taking part.

Please do not report security issues in public issues or pull requests. [SECURITY.md](SECURITY.md) explains how to report them privately.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact

Project link: [https://github.com/anyingiit/anyingiit.github.io-source_old](https://github.com/anyingiit/anyingiit.github.io-source_old)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
