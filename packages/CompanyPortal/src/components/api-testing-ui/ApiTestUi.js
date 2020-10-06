import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PerformTestCard from './PerformTestCard';
import CustomRequestSection from './CustomRequest';
import RequestResponse from './RequestResponse';

const ApiTestUiStyles = makeStyles({
  root: {
    padding: 20,
  },
});

export default function ApiTestUi() {
  const cardClasses = ApiTestUiStyles();

  return (
    <div className={cardClasses.root}>
      <PerformTestCard />
      <CustomRequestSection />
      <RequestResponse />
    </div>
  );
}
