import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import ImageSheet from './components/ImageSheet';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/imagesheet' component={ImageSheet} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
  </Layout>
);
