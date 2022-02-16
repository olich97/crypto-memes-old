import React from 'react';
import Layout from '../components/Layout';
import MemeList from '../components/MemeList';

export const Index = (): JSX.Element => {
  return (
    <Layout>
      <MemeList />
    </Layout>
  );
};

export default Index;
