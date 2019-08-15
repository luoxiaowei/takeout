import Router from '../Router';
import CategoryStore from './actions/store';
import Category from './views/Category';

Router.addRoute({
    title: 'category',
    path: '/category',
    component: Category,
    isMune: true,
    icon: 'product'
});

Router.addStore({
    category: new CategoryStore()
});