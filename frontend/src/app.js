import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { Row, Col } from 'antd';
import { routes } from './config/routes';
import store from './config/store';
import history from './config/history';
import Sidebar from './components/shared/sidebar';
import './app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Row gutter={16} className="page-container">
            <Col span={5}>
              <div className="sidebar-col">
                <Sidebar />
              </div>
            </Col>
            <Col span={19}>
              <div className="content-col">
                {
                  routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))
                }
              </div>
            </Col>
          </Row>
        </Router>
      </Provider>
    );
  }
}

export default App;
