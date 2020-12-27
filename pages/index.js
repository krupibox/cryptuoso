import Router from 'next/router';
import { useEffect } from 'react';

export default () => {

  useEffect(() => {
    Router.push('/robots');
  }, []);

  return (
    <style jsx global>{`
      body {color: blue}
  `}</style>
  );
}