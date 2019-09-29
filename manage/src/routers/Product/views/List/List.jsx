import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Spin, Table, Modal } from 'antd';
import styles from './List.less';

@inject('product')
@observer

export default class Main extends Component {
    static propTypes = {
        onEdit: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            previewVisible: false
        };
        
    }

    handleEdit = (recode) => {
        this.props.onEdit(recode);
    }

    handleDelete = (product_id) => {
        this.props.product.postProductDelete({ product_id }, () => {
            this.props.product.filter.page = 1;
            this.props.product.getProductList();
        });
    }

    componentDidMount () {
        this.props.product.getProductList();
    }

    render() {
        const { list, total, filter, loading, categoryObj } = this.props.product;
        const obj = toJS(categoryObj);
        const columns = [
            {
                title: 'name',
                dataIndex: 'product_name',
                width: '14%',
            },
            {
                title: '图片',
                dataIndex: 'picture',
                width: '12%',
                render: (text) => {
                    return (
                        <div>
                            {text ? <img className={'w12'} src={text} /> : null}
                        </div>
                    );
                }
            },
            {
                title: '分类',
                dataIndex: 'category_id',
                width: '14%',
                render: (text, recode) => {
                    return (
                        <div>
                            {(text || '').split(',').map(it => {
                                return (
                                    <div key={recode.product_id + '_' + it}>
                                        {obj[Number(it)] || ''}
                                    </div>)
                            })}
                        </div>
                    );
                }
            },
            {
                title: '价格',
                dataIndex: 'price',
                width: '10%',
                className: 'cred',
                render: (text) => {
                    return (
                        <div>¥ {text}</div>
                    );
                }
            },
            {
                title: '数量',
                dataIndex: 'number',
                width: '10%',
            },
            {
                title: '销量',
                dataIndex: 'sale_num_reality',
                width: '12%',
            },
            {
                title: '排序权重',
                dataIndex: 'order_by',
                width: '12%',
            },
            {
                title: '操作',
                render: (recode) => {
                    return (
                        <div className={'operate'}>
                            <span onClick={() => this.handleEdit(recode)}>编辑</span>
                            <span onClick={() => this.handleDelete(recode.product_id)}>删除</span>
                        </div>
                    );
                }
            },
        ];
        const pagination = {
            pageSize: filter.pageSize,
            showQuickJumper: true,
            total: total,
            showTotal: (total) => {
                return <p className='l'>共 <b>{total}</b> 条</p>;
            },
            current: filter.page,
            onChange: (page, pageSize) => {
                this.props.product.filter = {
                    ...this.props.product.filter,
                    page
                };
                this.props.product.getProductList();
            }
        };
        return (
            <Spin tip="正在加载数据..." spinning={loading}>
                <Table
                    dataSource={list}
                    columns={columns}
                    bordered
                    pagination={pagination}
                    rowKey={'product_id'}
                />
                <Modal visible={this.state.previewVisible} footer={null} onCancel={() => this.setState({ previewVisible: false })}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </Spin>
        );
    }
}