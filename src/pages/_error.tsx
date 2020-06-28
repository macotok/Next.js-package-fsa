import React from 'react';
import { NextPage } from 'next';

type ErrorPagePropsType = {
  statusCode: number;
};

const Error: NextPage<ErrorPagePropsType> = ({ statusCode }) => (
  <p>
    {statusCode
      ? `An error ${statusCode} occurred on server`
      : 'An error occurred on client'}
  </p>
);

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
