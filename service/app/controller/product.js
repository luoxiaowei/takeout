'use strict';

const Controller = require('./base');

class CategoryController extends Controller {
    async save() {
        const { ctx, service } = this;
        const params = ctx.request.body;
        const saveRule = {
            product_name: { type: 'string' },
            order_by: { type: 'integer' },
            price: { type: 'integer' },
            number: { type: 'integer' },
            desc: { type: 'string' }
        };
        // 校验参数
        ctx.validate(saveRule, params);

        if (params.product_id) {
            const res = await service.product.update(params);
            this.success(res);
        } else {
            const res = await service.product.add(params);
            this.success(res);
        }
    }
    async list() {
        const { service, ctx } = this;
        const result = await service.product.list(ctx.request.query);
        const count = await service.product.count(ctx.request.query);
        this.success({
            list: result,
            total: count
        });
    }
    async delete() {
        const { service, ctx } = this;
        const { product_id } = ctx.request.body;
        const result = await service.product.delete(product_id);
        this.success(result);
    }
}
module.exports = CategoryController;
