import React from 'react';

const Loader = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black dark:border-white"></div>
    </div>
  );
};

export default Loader;
