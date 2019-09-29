import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';
import AddForm from './AddForm/AddForm';
import List from './List/List';

@inject('category', 'product')
@observer

export default class Main extends Component {
    constructor(props, text) {
        super(props, text);
        this.state = {
            visible: false,
            formValue: {}
        };
    }

    componentDidMount() {
        this.props.category.getCategoryList((res) => {
            let categoryObj = {};
            res.data.map(item => categoryObj[item.category_id] = item.category_name);
            this.props.product.categoryArray = res.data;
            this.props.product.categoryObj = categoryObj;
        });
    }

    handleAdd = (formValue = {}) => {
        this.setState({
            visible: true,
            formValue
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            handleAdd: {}
        });
    }

    render() {
        return (
            <div>
                <div className={'flexje pb20'}>
                    <Button onClick={this.handleAdd}>添加产品</Button>
                </div>
                {this.state.visible && <AddForm
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    formValue={this.state.formValue}
                />}
                <List 
                    onEdit={this.handleAdd}
                />
            </div>
        );
        
    }
}