import { observable, runInAction, action } from 'mobx';
import ajax from 'utils/ajax';
import API from './api';

class ProductStore {
    @observable list = [];
    @observable loading = false;
    @observable total = 0;
    @observable filter = {
        page: 1,
        pageSize: 10
    };
    @observable categoryArray = [];
    @observable categoryObj = {};

    @action async getProductList(cb) { 
        this.loading = true;
        const result = await ajax.get(API.getProductList, { params: this.filter });
        runInAction(() => {
            this.list = result.data.list || [];
            this.total = result.data.total;
            this.loading = false;
        });
        cb && cb(result);
    }; 
    @action async postProductSave(params, cb) { 
        const result = await ajax.post(API.postProductSave, params);
        cb && cb(result);
    };
}

export default ProductStore;