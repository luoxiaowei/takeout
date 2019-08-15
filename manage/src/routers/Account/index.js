import React, { Suspense, lazy } from 'react';
import Router from '../Router';
import AccountStore from './actions/store';
// import Account from './views/Account';
const Account = lazy(() => import('./views/Account'));

Router.addRoute({
    title: 'account',
    path: '/account',
    component: Account,
    isMune: true,
    icon: 'product'
});

Router.addStore({
    account: new AccountStore()
});