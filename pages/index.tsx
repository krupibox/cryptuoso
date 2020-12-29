import Router from 'next/router';
import { NextPage } from 'next';
import { useEffect } from 'react';

const App: NextPage = () => {

  useEffect(() => {
    Router.push('/robots');
  }, []);

  return null;
}

export default App;