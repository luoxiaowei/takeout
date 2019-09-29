'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class CategoryService extends Service {
    async add(param) {
        param.update_time = moment().format('YYYY-MM-DD HH:mm:ss');
        param.is_delete = 0;
        const result = await this.app.mysql.insert('product', param);
        return result.affectedRows === 1;
    }
    async update(param) {
        param.update_time = moment().format('YYYY-MM-DD');
        const result = await this.app.mysql.update('product', param, {
            where: { product_id: param.product_id }
        });
        return result.affectedRows === 1;
    }
    async list(param) {
        const { page = 1, pageSize = 10 } = param;
        const list = await this.app.mysql.select('product', {
            where: { is_delete: 0 }, // WHERE 条件
            columns: [ 'product_name', 'product_id', 'order_by', 'price', 'number', 'desc', 'category_id', 'sale_num_reality', 'picture' ], // 要查询的表字段
            orders: [[ 'update_time', 'desc' ]], // 排序方式
            limit: pageSize, // 返回数据量
            offset: page, // 数据偏移量
        });
        return list;
    }
    async count() {
        // const { category_id = '' } = param;
        const count = await this.app.mysql.count('product', {
            is_delete: 0
        });
        console.log(count);
        return count;
    }
    async find(product_id) {
        const result = await this.app.mysql.get('product', { product_id });
        return result;
    }
    async delete(product_id) {
        const params = await this.find(product_id);
        params.is_delete = 1;
        const result = await this.update(params);
        return result;
    }
}

module.exports = CategoryService;
