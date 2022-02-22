/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Layout from '../components/Layout';

export const Privacy = (): JSX.Element => {
  return (
    <Layout
      customMeta={{
        title: 'About - Crypto Memes',
      }}
    >
      <h1>Privacy Policy</h1>
      <p>Here, should go the privacy policy of the platform...</p>
      <p>But, we're entirely using blockchain as backend so no privacy policy (and frontend never will save cookies)</p>
    </Layout>
  );
};

export default Privacy;
