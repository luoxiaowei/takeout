import React, { Component } from 'react';
import { Button } from 'antd';
import AddForm from './AddForm/AddForm';
import List from './List/List';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    handleReady = () => {
        
    }

    handleChange = (value) => {
        this.setState({value});
    }

    handleAdd = () => {
        this.setState({
            visible: true
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            formValue: {}
        });
    }
    handleEdit = (formValue) => {
        this.setState({
            visible: true,
            formValue
        })
    }

    render() {
        return (
            <div>
                <div className={'flexje'}><Button onClick={this.handleAdd}>添加分类</Button></div>
                {this.state.visible && <AddForm
                    visible={this.state.visible}
                    formValue={this.state.formValue}
                    onCancel={this.handleCancel}
                />}
                <div className={'pt20'}>
                    <List 
                        onEdit={this.handleEdit}
                    />
                </div>
                
            </div>
        );
    }
}