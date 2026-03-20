import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>论文辅导网站后台已准备好</h4>
      </Banner>
      建议按这个顺序开始：
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {' 导入示例内容，或者直接进入首页全局配置、文章和页面集合开始编辑。然后 '}
          <a href="/" target="_blank">
            打开前台网站
          </a>
          {' 查看效果。'}
        </li>
        <li>
          {'优先编辑首页全局配置、Header、Footer、文章和页面内容。你已经有了一个可运营的中英文 CMS 站点骨架。'}
        </li>
        <li>
          {'如果你想继续扩展字段，可以参考 Payload 的 '}
          <a
            href="https://payloadcms.com/docs/configuration/collections"
            rel="noopener noreferrer"
            target="_blank"
          >
            collections
          </a>
          {' 与 '}
          <a
            href="https://payloadcms.com/docs/fields/overview"
            rel="noopener noreferrer"
            target="_blank"
          >
            fields
          </a>
          {' 文档。'}
        </li>
        <li>
          {'如果你是第一次使用 Payload，也可以阅读 '}
          <a
            href="https://payloadcms.com/docs/getting-started/what-is-payload"
            rel="noopener noreferrer"
            target="_blank"
          >
            Getting Started
          </a>
          {'。'}
        </li>
      </ul>
      {'这个提示块本身也是一个 '}
      <a
        href="https://payloadcms.com/docs/custom-components/overview"
        rel="noopener noreferrer"
        target="_blank"
      >
        custom component
      </a>
      ，后续你也可以随时在 <strong>payload.config</strong> 中移除它。
    </div>
  )
}

export default BeforeDashboard
