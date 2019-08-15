import { observable, action, runInAction } from 'mobx';
import api from './api';
import ajax from 'ajax';

class OneStore {
    @observable list = [];
    @observable total = 0;
    @observable filter = {
        page: 1,
        pageSize: 10
    };

   @action async getOneList(cb) { 
        const result = await ajax.get(api.getOneList, { params: this.filter });
        runInAction(() => {
            this.list  = result.data.list;
            this.total = result.data.total;
        });
        cb && cb(result);
    }; 
    
}

export default OneStore;