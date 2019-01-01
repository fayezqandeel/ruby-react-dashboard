import React, { Component } from 'react';
import { List, Skeleton, Avatar, Button } from 'antd';
import { connect } from 'react-redux';
import qs from 'query-string';
import { getCampaignsList } from '../../actions/campaigns-actions';

class Campaigns extends Component {
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
    const { fetchCampaigns, location } = this.props;
    // checking if page exists in query string, if yes then pass it to the action
    const query = qs.parse(location.search);
    // if the page doesn't exits, just give it default page number 1
    const page = query.page || 1;
    // call the action
    fetchCampaigns(page, () => this.setState({ loading: false, page }));
  }

  onPageChange(page) {
    const { fetchCampaigns, location, history } = this.props;
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
    fetchCampaigns(page, () => this.setState({ loading: false }));
  }

  render() {
    const { campaignsReducer } = this.props;
    const { loading, page } = this.state;
    const ButtonGroup = Button.Group;
    return (
      <div className="page-content-area">
        <h2 className="page-title">Campaigns</h2>
        <div className="widget">
          <List
            className="campaigns-list"
            itemLayout="horizontal"
            loading={loading}
            pagination={{
              pageSize: 10,
              position: 'both',
              total: campaignsReducer.total,
              onChange: this.onPageChange,
              showQuickJumper: true,
              current: parseInt(page, 0),
            }}
            dataSource={campaignsReducer.campaigns}
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
                    avatar={<Avatar>{item.advertiser.name}</Avatar>}
                    title={item.name}
                    description={(
                      <div>
                        <b>cost model: </b>
                        {item.cost_model.replace('_', ' ')}
                        <span>|</span>
                        <b>advertiser: </b>
                        {item.advertiser.name}
                        <span>|</span>
                        <b>cost: </b>
                        {item.cost}
                      </div>
                    )}
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

const mapStateToProps = ({ campaignsReducer }) => ({ campaignsReducer });
export default connect(
  mapStateToProps,
  { fetchCampaigns: getCampaignsList }
)(Campaigns);
