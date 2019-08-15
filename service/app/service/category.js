'use strict';

const Service = require('egg').Service;

class CategoryService extends Service {
    async save(param) {
        const result = await this.app.mysql.insert('category', param);
        return result;
    }
    async list() {
        const list = await this.app.mysql.select('category');
        console.log(list);
        return list;
    }
    async count() {
        const count = await this.app.mysql.get('users', { id: 11 });
        return count;
    }
}

module.exports = CategoryService;
