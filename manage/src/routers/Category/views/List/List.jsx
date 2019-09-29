import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Spin, Table, Switch } from 'antd';
import styles from './List.less';

@inject('category')
@observer

export default class Main extends Component {
    static propTypes = {
        onEdit: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.columns = [
            {
                title: 'name',
                dataIndex: 'category_name',
                width: '30%',
            },
            {
                title: '排序权重',
                dataIndex: 'order_by',
                width: '20%',
            },
            {
                title: '是否展示',
                dataIndex: 'is_mune',
                width: '20%',
                render: (text, recode) => {
                    return (
                        <Switch checked={text} onChange={() => this.handleChange(recode.category_id)} />
                    );
                }
            },
            {
                title: '操作',
                render: (recode) => {
                    return (
                        <div className={'operate'}>
                            <span onClick={() => this.handleEdit(recode)}>编辑</span>
                            <span onClick={() => this.handleDelete(recode.category_id)}>删除</span>
                        </div>
                    );
                }
            },
        ];
    }

    handleDelete = (category_id) => {
        this.props.category.postCategoryDelete({
            category_id
        }, () => {
            this.props.category.getCategoryList();
        });
    }

    handleEdit = (recode) => {
        this.props.onEdit(recode);
    }

    handleChange = (category_id) => {
        this.props.category.postCategoryChangeMune({
            category_id
        }, () => {
            this.props.category.getCategoryList();
        });
        
    }

    componentDidMount () {
        this.props.category.getCategoryList();
    }

    render() {
        const { list, loading } = this.props.category;
        return (
            <Spin tip="正在加载数据..." spinning={loading}>
                <Table
                    dataSource={list}
                    columns={this.columns}
                    bordered
                    pagination={false}
                    rowKey={'category_id'}
                />
            </Spin>
        );
    }
}