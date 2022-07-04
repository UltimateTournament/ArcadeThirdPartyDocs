import React from 'react';

export default (props) => {
  return <>
    <article className="col col--6 margin-bottom--lg">
      <a className="card padding--lg artcard" href={props.href}>
      {/* <a className="card padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module" href={props.href}> */}
        <h2 className="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module">
          { props.title }
        </h2>
        <p className="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-theme-DocCard-styles-module">
          { props.description }
        </p>
      </a>
    </article>
  </>
}
