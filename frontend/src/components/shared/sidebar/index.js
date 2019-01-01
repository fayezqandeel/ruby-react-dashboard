import React, { Component } from 'react';
import { Row, Col, Avatar, Tag, Badge } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import './index.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  checkIfActive(path) {
    // just make current page as selected
    const { location } = this.props;
    console.log(location);
    if (location && location.pathname === path) {
      return 'active';
    }
    return '';
  }

  render() {
    return (
      <div id="sidebar-area">
        <Row gutter={16}>
          <Col span={7}>
            <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </Col>
          <Col span={17}>
            <div className="user-meta-data">
              <Badge offset={[10, 12]} status="success" dot>
                <h3>Johnny Snow</h3>
              </Badge>
              <div className="role-holder">Compagins Manager</div>
              <Tag color="lime">Basic</Tag>
            </div>
          </Col>
        </Row>
        <div className="section-title">Summary</div>
        <ul>
          <li className={this.checkIfActive('/')}>
            <Link to="/">Dashboard</Link>
          </li>
          <li className={this.checkIfActive('/advertisers')}>
            <Link to="/advertisers">Advertisers</Link>
          </li>
          <li className={this.checkIfActive('/campaigns')}>
            <Link to="/campaigns">Campaigns</Link>
            <Badge count={5}></Badge>
          </li>
          <li><a>Shift Planner</a></li>
          <li><a>Employees</a></li>
          <li><a>Providers</a></li>
        </ul>
        <div className="section-title">Feedback</div>
        <ul>
          <li><a>Overview</a></li>
          <li><a>Reservations</a></li>
          <li><a>Payments Schedule</a></li>
          <li><a>Shift Planner</a></li>
          <li><a>Employees</a></li>
          <li><a>Providers</a></li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Sidebar);
