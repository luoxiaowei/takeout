import Router from '../Router';
import AccountStore from './actions/store';
import Account from './views/Account';

Router.addRoute({
    title: '用户',
    path: '/account',
    component: Account,
    isMune: true,
    icon: 'product'
});

Router.addStore({
    account: new AccountStore()
});