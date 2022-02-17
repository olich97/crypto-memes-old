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
      <p>Welcome to the about page</p>
    </Layout>
  );
};

export default Privacy;
