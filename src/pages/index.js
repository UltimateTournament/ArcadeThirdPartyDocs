import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import LinkTile from '../components/linkTile.jsx'

import styles from './index.module.css';
import { Redirect } from '@docusaurus/router';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          {/* <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            View Docs
          </Link> */}
          <div style={{
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap"
}}>
  <LinkTile title="Before You Begin" description="Considerations before jumping in" href="/docs/category/before-you-begin" />

  <LinkTile title="High-Level Overview" description="How integration works" href="/docs/integration/high-level" />

  <LinkTile title="Integrate Your Game" description="Integrate with our SDKs" href="/docs/integration/code-adaptions" />

  <LinkTile title="Integration Examples" description="Tutorials for Unity and JS" href="/docs/category/example-integrations" />

</div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {/* <Redirect to="/docs/getting-started" /> */}
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
