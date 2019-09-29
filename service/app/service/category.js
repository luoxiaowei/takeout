'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class CategoryService extends Service {
    async add(param) {
        param.update_time = moment().format('YYYY-MM-DD HH:mm:ss');
        param.is_delete = 0;
        const result = await this.app.mysql.insert('category', param);
        return result.affectedRows === 1;
    }
    async update(param) {
        param.update_time = moment().format('YYYY-MM-DD');
        const result = await this.app.mysql.update('category', param, {
            where: { category_id: param.category_id }
        });
        return result.affectedRows === 1;
    }
    async list() {
        const list = await this.app.mysql.select('category', {
            where: { is_delete: 0 }, // WHERE 条件
            columns: [ 'category_name', 'category_id', 'is_mune', 'order_by' ], // 要查询的表字段
            orders: [[ 'order_by', 'desc' ], [ 'update_time', 'desc' ]], // 排序方式
        });
        list.map(item => {
            item.is_mune = Boolean(item.is_mune);
            return item;
        });
        return list;
    }
    async find(category_id) {
        const result = await this.app.mysql.get('category', { category_id });
        return result;
    }
    async delete(category_id) {
        const params = await this.find(category_id);
        params.is_delete = 1;
        const result = await this.update(params);
        return result;
    }
    async changeMune(category_id) {
        const params = await this.find(category_id);
        console.log(params);
        params.is_mune = !params.is_mune;
        const result = await this.update(params);
        return result;
    }
}

module.exports = CategoryService;
