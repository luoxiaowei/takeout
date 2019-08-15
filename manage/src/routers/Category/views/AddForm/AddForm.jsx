import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from "mobx-react"
import { Modal, Form, Input, Row, Col, InputNumber, Checkbox } from 'antd';
const FormItem = Form.Item;

@inject('category')
@observer

class Main extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onCancel: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        
    }

    handleCancel = () => {
        this.props.onCancel && this.props.onCancel();
    }

    handleOk = () => {

    }

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            },
            colon: false
        };
        return (
            <Modal
                visible={visible}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                closable={false}
                width={500}
            >
                <Form>
                    <Row>
                        <Col span={24}>
                            <FormItem label={'分类名称'} { ...formItemLayout }>
                                {getFieldDecorator('category_name', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input className={'w12'} placeholder="请输入" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem label={'排序'} { ...formItemLayout }>
                                {getFieldDecorator('category_name', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <InputNumber style={{ width: '100%' }} placeholder="请输入" min={0} max={1000000} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem label={'是否显示'} { ...formItemLayout }>
                                {getFieldDecorator('is_mune', {
                                    initialValue: false,
                                    rules: [{ required: false }]
                                })(
                                    <Checkbox />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}
export default Form.create(() => {})(Main);