import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import styles from 'One.less';

@inject('one')
@observer

export default class Main extends Component {
    static propTypes = {
        
    }
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}