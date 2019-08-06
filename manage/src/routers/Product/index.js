import Router from '../Router';
import ProductStore from './actions/store';
import Product from './views/Product';

Router.addRoute({
    title: '产品',
    path: '/product',
    component: Product,
    isMune: true,
    icon: 'product'
});

Router.addStore({
    product: new ProductStore()
});