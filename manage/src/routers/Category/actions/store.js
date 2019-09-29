import { observable, runInAction, action } from 'mobx';
import ajax from 'utils/ajax';
import API from './api';

class CategoryStore {
    @observable list = [];
    @observable loading = false;

    @action async getCategoryList(cb) { 
        this.loading = true;
        const result = await ajax.get(API.getCategoryList, {});
        
        runInAction(() => {
            this.list = result.data || [];
            this.loading = false;
        });
        cb && cb(result);
    }; 
    @action async postCategorySave(params, cb) { 
        const result = await ajax.post(API.postCategorySave, params);
        cb && cb(result);
    }; 
    @action async postCategoryDelete(params, cb) { 
        const result = await ajax.post(API.postCategoryDelete, params);
        cb && cb(result);
    }; 
    @action async postCategoryChangeMune(params, cb) { 
        const result = await ajax.post(API.postCategoryChangeMune, params);
        cb && cb(result);
    }; 
}

export default CategoryStore;