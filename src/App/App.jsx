import React from 'react';

import MyForm from '../MyForm';
import ContentWrapper from '../ContentWrapper';

import './App.scss';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <ContentWrapper>
      <MyForm />
    </ContentWrapper>
  );
};

export default App;
