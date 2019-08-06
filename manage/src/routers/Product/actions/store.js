import { observable } from 'mobx';

class ProductStore {
    @observable list = [];
}

export default ProductStore;