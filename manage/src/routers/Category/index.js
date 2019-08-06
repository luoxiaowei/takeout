import Router from '../Router';
import CategoryStore from './actions/store';
import Category from './views/Category';

Router.addRoute({
    title: '分类',
    path: '/category',
    component: Category,
    isMune: true,
    icon: 'category'
});

Router.addStore({
    category: new CategoryStore()
});