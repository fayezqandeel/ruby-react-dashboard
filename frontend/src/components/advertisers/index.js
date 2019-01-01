import React, { Component } from 'react';
import { List, Skeleton, Avatar, Button } from 'antd';
import { connect } from 'react-redux';
import qs from 'query-string';
import { getAdvertisersList } from '../../actions/advertisers-actions';

class Advertisers extends Component {
  constructor(props) {
    super(props);
    // initial state
    this.state = {
      loading: true,
      page: 1,
    };
    // to fix this scope
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    const { fetchAdvertisers, location } = this.props;
    // checking if page exists in query string, if yes then pass it to the action
    const query = qs.parse(location.search);
    // if the page doesn't exits, just give it default page number 1
    const page = query.page || 1;
    // call the action
    fetchAdvertisers(page, () => this.setState({ loading: false, page }));
  }

  onPageChange(page) {
    const { fetchAdvertisers, location, history } = this.props;
    /*
      after page change push it to query string, so when user reload the page
      he will see the same results
    */
    const query = { page };
    const queryString = qs.stringify(query);
    history.push({
      search: queryString,
      pathname: location.pathname,
    });
    // show loading indicator
    this.setState({ loading: true, page });
    // hide loading indicator after fetching the data
    fetchAdvertisers(page, () => this.setState({ loading: false }));
  }

  render() {
    const { advertisersReducer } = this.props;
    const { loading, page } = this.state;
    const ButtonGroup = Button.Group;
    return (
      <div className="page-content-area">
        <h2 className="page-title">Adevrtisers</h2>
        <div className="widget">
          <List
            className="advertisers-list"
            itemLayout="horizontal"
            pagination={{
              pageSize: 10,
              position: 'both',
              total: advertisersReducer.total,
              onChange: this.onPageChange,
              showQuickJumper: true,
              current: parseInt(page, 0),
            }}
            loading={loading}
            dataSource={advertisersReducer.advertisers}
            renderItem={item => (
              <List.Item
                actions={[
                  <ButtonGroup>
                    <Button icon="edit">Edit</Button>
                    <Button type="danger" icon="delete">Delete</Button>
                  </ButtonGroup>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar>{item.name}</Avatar>}
                    title={<a href="#">{item.name}</a>}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ advertisersReducer }) => ({ advertisersReducer });
export default connect(
  mapStateToProps,
  { fetchAdvertisers: getAdvertisersList }
)(Advertisers);
