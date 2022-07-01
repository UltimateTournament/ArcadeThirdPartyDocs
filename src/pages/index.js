import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

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
   <article class="col col--6 margin-bottom--lg">
      <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/docs/integration/high-level">
        <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module">
           Before You Integrate
        </h2>
        <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module">
          Considerations before jumping in
        </p>
      </a>
  </article>

  <article class="col col--6 margin-bottom--lg">
      <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/docs/integration/high-level">
        <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module">
           High Level Overview
        </h2>
        <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module">
          How integration works
        </p>
      </a>
  </article>

  <article class="col col--6 margin-bottom--lg">
      <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/docs/integration/code-adaptions">
        <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module">
          Integrate Your Game
        </h2>
        <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module">
          Integrate with our SDKs
        </p>
      </a>
  </article>

  <article class="col col--6 margin-bottom--lg">
    <a class="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href="/docs/category/example-integrations">
      <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module">
        Integration Examples
      </h2>
      <p class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module">
        Tutorials for Unity and JS
      </p>
    </a>
  </article>
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
