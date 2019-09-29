import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from "mobx-react";
import { toJS, set } from 'mobx';
import { Modal, Form, Input, Upload, InputNumber, Select, Icon } from 'antd';
import { Iconfont } from 'components';
const FormItem = Form.Item;
const Option = Select.Option;

@inject('product')
@observer

class Main extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onCancel: PropTypes.func,
        formValue: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: props.formValue && props.formValue.picture ? [{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: props.formValue.picture,
            }] : []
        };
    }

    componentDidMount() {
        
    }

    handleCancel = () => {
        this.props.onCancel && this.props.onCancel();
    }

    handleOk = () => {
        const { validateFields } = this.props.form;
        const { product_id } = this.props.formValue;
        validateFields((err, values) => {
            if (err) {
                return;
            }
            values.category_id = (values.category_id || []).join(',');
            if (product_id) values.product_id = product_id;
            
            this.props.product.postProductSave(values, () => {
                this.props.onCancel && this.props.onCancel();
                this.props.product.getProductList();
            });
        })
    }

    handleChange = ({file, fileList}) => {
        this.setState({
            fileList
        });
        if (fileList.length == 0) {
            this.props.form.setFieldsValue({
                picture: ''
            });
        }
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.thumbUrl,
            previewVisible: true,
        })
    }

    render() {
        const { visible, formValue } = this.props;
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
        const { categoryArray } = toJS(this.props.product);
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            },
            colon: false
        };
        console.log(this.state.fileList);
        return (
            <Modal
                visible={visible}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                closable={false}
                width={540}
            >
                <Form>
                    <FormItem label={'产品名称'} { ...formItemLayout }>
                        {getFieldDecorator('product_name', {
                            initialValue: formValue.product_name || '',
                            rules: [{ required: true, message: '不能为空' }]
                        })(
                            <Input placeholder="请输入" maxLength={100} />
                        )}
                    </FormItem>
                    <FormItem label={'产品图片'} { ...formItemLayout }>
                        {getFieldDecorator('picture', {
                            initialValue: '',
                            rules: [{ required: false, message: '不能为空' }]
                        })(
                            <Upload
                                accept={'.jpg, .jpeg, .png'}
                                beforeUpload={(file) => {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onload = () => {
                                        setFieldsValue({
                                            picture: reader.result
                                        });
                                    };
                                    return false;
                                }}
                                listType={'picture-card'}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {this.state.fileList.length > 0 ? null : <Iconfont className={'fs24'} type="upload" />}
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem label={'产品分类'} { ...formItemLayout }>
                        {getFieldDecorator('category_id', {
                            initialValue: (formValue.category_id || '').split(',').map(it => Number(it)),
                            rules: [{ required: false, message: '不能为空' }]
                        })(
                            <Select
                                mode="multiple"
                                showSearch={false}
                            >
                                {categoryArray.map(item => (
                                    <Option key={item.category_id} value={item.category_id}>{item.category_name}</Option>
                                ))}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label={'价格'} { ...formItemLayout }>
                        {getFieldDecorator('price', {
                            initialValue: formValue.price || '',
                            rules: [{ required: true, message: '不能为空' }]
                        })(
                            <InputNumber style={{ width: '100%' }} placeholder="请输入" max={100000} min={0} />
                        )}
                    </FormItem>
                    <FormItem label={'数量'} { ...formItemLayout }>
                        {getFieldDecorator('number', {
                            initialValue: formValue.number || '',
                            rules: [{ required: true, message: '不能为空' }]
                        })(
                            <InputNumber style={{ width: '100%' }} placeholder="请输入" max={100000} min={0} />
                        )}
                    </FormItem>
                    <FormItem label={'排序权重'} { ...formItemLayout }>
                        {getFieldDecorator('order_by', {
                            initialValue: formValue.order_by || '',
                            rules: [{ required: true, message: '不能为空' }]
                        })(
                            <InputNumber style={{ width: '100%' }} placeholder="请输入" max={100000} min={0} />
                        )}
                    </FormItem>
                    <FormItem label={'详情'} { ...formItemLayout }>
                        {getFieldDecorator('desc', {
                            initialValue: formValue.desc || '',
                            rules: [{ required: true, message: '不能为空' }]
                        })(
                            <Input placeholder="请输入"  />
                        )}
                    </FormItem>
                    <Modal visible={this.state.previewVisible} footer={null} onCancel={() => this.setState({ previewVisible: false })}>
                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                    </Modal>
                </Form>
            </Modal>
        );
    }
}
export default Form.create(() => {})(Main);