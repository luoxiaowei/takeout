import React, { Suspense, lazy } from 'react';
import Router from '../Router';
import ProductStore from './actions/store';
// import Product from './views/Product';
const Product = lazy(() => import('./views/Product'));

Router.addRoute({
    title: 'product',
    path: '/product',
    component: Product,
    isMune: true,
    icon: 'product'
});

Router.addStore({
    product: new ProductStore()
});