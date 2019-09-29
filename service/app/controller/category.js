'use strict';

const Controller = require('./base');

class CategoryController extends Controller {
    async save() {
        const { ctx, service } = this;
        const params = ctx.request.body;
        const saveRule = {
            category_name: { type: 'string' },
            order_by: { type: 'integer' },
            is_mune: { type: 'boolean' }
        };
        // 校验参数
        ctx.validate(saveRule, params);

        if (params.category_id) {
            const res = await service.category.update(params);
            this.success(res);
        } else {
            const res = await service.category.add(params);
            this.success(res);
        }
    }
    async list() {
        const { service } = this;
        const result = await service.category.list();
        this.success(result);
    }
    async delete() {
        const { service, ctx } = this;
        const { category_id } = ctx.request.body;
        const result = await service.category.delete(category_id);
        this.success(result);
    }
    async changeMune() {
        const { service, ctx } = this;
        const { category_id } = ctx.request.body;
        const result = await service.category.changeMune(category_id);
        this.success(result);
    }
}
module.exports = CategoryController;
