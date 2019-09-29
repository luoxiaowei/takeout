'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    // category
    router.get('/api/category/list', controller.category.list);
    router.post('/api/category/save', controller.category.save);
    router.post('/api/category/delete', controller.category.delete);
    router.post('/api/category/change-mune', controller.category.changeMune);

    // product

    router.get('/api/product/list', controller.product.list);
    router.post('/api/product/save', controller.product.save);
    router.post('/api/product/delete', controller.product.delete);
};
