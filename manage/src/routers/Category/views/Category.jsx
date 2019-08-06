import React, { Component } from 'react';
import AddForm from './AddForm/AddForm';
import { Button } from 'antd';

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
            visible: false
        });
    }

    render() {
        return (
            <div>
                <div className={'flexje'}><Button onClick={this.handleAdd}>添加分类</Button></div>
                <AddForm
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                />
            </div>
        );
    }
}