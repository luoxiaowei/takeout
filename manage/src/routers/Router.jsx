import React, { Component, Suspense, lazy } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'mobx-react';
import history from '../utils/history';
import { isAuth } from '../utils/utils';
import Layout from './Layout/Main';
import Login from './Login/views/Login';
import { NotFound, ErrorBoundary } from 'components';

let routers = [];
let stores = {};
class Main extends Component {
    static addStore (store) {
        stores = {
            ...stores,
            ...store
        };
    }
    static addRoute (modules) {
        if (modules instanceof Array) {
            routers.push(modules);
        } else {
            routers.push(modules);
        }
        
    }
    constructor(props) {
        super(props);
    }

    renderRoute = (routers) => {
        return routers.map(item => {
            return item.childs ? this.renderRoute(item.childs) : (isAuth(item.authKey || 1)) ? (
                <ErrorBoundary key={'route' + item.path} ><Route {...item} /></ErrorBoundary>
            ) : null;
        })
    }
    render() {
        return (
            <Provider {...stores}>
                <Router history={history}>
                    <Route 
                        render={({ location }) => {
                            if (location.pathname === '/login') {
                                return (
                                    <Route path={'/login'} component={Login} />
                                );
                            } else {
                                return (
                                    <Layout menuList={routers} location={location}>
                                        <Switch>
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <Route path='/' exact render={() => (<Redirect to={'/product'} />)}/>
                                                {this.renderRoute(routers)}
                                            </Suspense>
                                            <Route component={NotFound} />
                                        </Switch>
                                    </Layout>
                                )
                            }
                        }}
                    />
                    
                </Router>
            </Provider>
        );
    }
}

export default Main;