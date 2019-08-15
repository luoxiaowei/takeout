import React, { Component } from 'react';
import AddForm from './AddForm/AddForm';
import { Button, DatePicker } from 'antd';
import { array } from 'prop-types';

export default class Main extends Component {
    constructor(props, text) {
        console.log(props, text);
        super(props, text);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        
        try {
            const a = JSON.parse([1, 2]);
        } catch(err){
            console.log(this);
        }
    }

    componentDidCatch(err) {
        console.log(err);
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

    handlePanelChange = (value, mode) => {
        console.log(value, mode);
    }

    render() {
        let arr = [];
        return (
            <div>
                <div className={'flexje'}>
                    <Button onClick={this.handleAdd}>添加产品</Button>
                </div>
                <div>
                    {arr.map(item => {
                        return <div/>
                    })}
                </div>
                <AddForm
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                />
            </div>
        );
        
    }
}