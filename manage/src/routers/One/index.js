import Router from '../Router';
import OneStore from './actions/store';
import One from './views/One';

Router.addRoute({
    title: 'One',
    path: '/one',
    component: One
});

Router.addStore({
    one: new OneStore()
});