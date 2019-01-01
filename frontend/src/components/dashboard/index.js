import React, { Component } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import qs from 'query-string';
import BarChart from '../shared/bar-chart';
import LineChart from '../shared/line-chart';
import PieChart from '../shared/pie-chart';
import { getStats } from '../../actions/dashboard-actions';
import { dynamicSort } from '../../config/utils';
import './index.scss';

// lib for formating numbers
const numeral = require('numeral');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieData: [],
      pieKey: 'installs', // default pie chart parameter
      fromDate: moment().subtract(7, 'd'), // default from date
      toDate: moment(), // default to date
      loading: true,
    };
    // to fix (this) scope
    this.onPieChartChange = this.onPieChartChange.bind(this);
    this.onDateRangeChange = this.onDateRangeChange.bind(this);
  }

  componentDidMount() {
    const { fetchStats } = this.props;
    fetchStats(false, () => {
      const { dashboardReducer } = this.props;
      const { advertisersByInstalls } = dashboardReducer;
      this.setState({ pieData: advertisersByInstalls, loading: false });
    });
  }

  onPieChartChange(e) {
    // changing pie chart parameter and showing shares related to that
    const { dashboardReducer } = this.props;
    if (e.key === 'clicks') {
      const { advertisersByClicks } = dashboardReducer;
      this.setState({ pieData: advertisersByClicks, pieKey: e.key });
    }
    if (e.key === 'installs') {
      const { advertisersByInstalls } = dashboardReducer;
      this.setState({ pieData: advertisersByInstalls, pieKey: e.key });
    }
    if (e.key === 'impressions') {
      const { advertisersByImpressions } = dashboardReducer;
      this.setState({ pieData: advertisersByImpressions, pieKey: e.key });
    }
    if (e.key === 'costs') {
      const { advertisersByCosts } = dashboardReducer;
      this.setState({ pieData: advertisersByCosts, pieKey: e.key });
    }
  }

  onDateRangeChange(dates) {
    this.updateStats(dates);
  }

  updateStats(dates) {
    // we call this fuction when date range updated.
    const { fetchStats } = this.props;
    const [fromDate, toDate] = dates;
    // formating dates for backend
    const query = {
      fromDate: fromDate.format('YYYY-MM-DD'),
      toDate: toDate.format('YYYY-MM-DD'),
    };
    // making query string
    const queryString = qs.stringify(query);
    // update line chart with new data
    fetchStats(queryString);
  }

  render() {
    const { dashboardReducer } = this.props;
    const {
      dateUnit,
      totalImpressions,
      totalClicks,
      totalCostMicros,
      totalInstalls,
      totalCampaigns,
      totalAdvertisers,
      top10Installs,
      top10Clicks,
      top10Impressions,
      activityInstalls,
      activityClicks,
      activityImpressions,
    } = dashboardReducer;
    const { pieData, pieKey, fromDate, toDate, loading } = this.state;
    if (top10Installs && top10Clicks && top10Impressions) {
      // just to make sure that data will display in correct sort
      top10Installs.sort(dynamicSort('installs'));
      top10Clicks.sort(dynamicSort('clicks'));
      top10Impressions.sort(dynamicSort('impressions'));
    }
    const lineChartData = [
      {
        id: 'Installs',
        data: activityInstalls,
      },
      {
        id: 'Clicks',
        data: activityClicks,
      },
      {
        id: 'Impressions',
        data: activityImpressions,
      },
    ];
    return (
      <div className="page-content-area">
        <h2 className="page-title">Dashboard</h2>
        <Skeleton loading={loading} active>
          <div className="overall-stats">
            <Row gutter={24}>
              <Col span={4}>
                <div className="num">{totalAdvertisers}</div>
                <div className="meta">Advertiser</div>
              </Col>
              <Col span={4}>
                <div className="num">{totalCampaigns}</div>
                <div className="meta">Campaign</div>
              </Col>
              <Col span={4}>
                <div className="num">{numeral(totalImpressions).format('0.0 a')}</div>
                <div className="meta">Impression</div>
              </Col>
              <Col span={4}>
                <div className="num">{numeral(totalInstalls).format('0.0 a')}</div>
                <div className="meta">Install</div>
              </Col>
              <Col span={4}>
                <div className="num">{numeral(totalCostMicros).format('$ 0.0 a')}</div>
                <div className="meta">Cost</div>
              </Col>
              <Col span={4}>
                <div className="num">{numeral(totalClicks).format('0.0 a')}</div>
                <div className="meta">Click</div>
              </Col>
            </Row>
          </div>
          <Row gutter={24}>
            <Col span={16}>
              <LineChart
                units={['day', 'week', 'month', 'year']}
                currentUnit={dateUnit}
                onDateRangeChange={this.onDateRangeChange}
                defaultDates={[fromDate, toDate]}
                data={lineChartData}
                title="Activity Chart"
                subtitle="shows stats base on date range"
              />
              <PieChart
                defaultMenuKey="installs"
                data={pieData}
                menuItems={['installs', 'costs', 'impressions', 'clicks']}
                onPieChartChange={this.onPieChartChange}
                pieKey={pieKey}
                title="Advertisers Share"
                subtitle="Shows the percentage for each advertiser over the time"
              />
            </Col>
            <Col span={8}>
              <BarChart
                data={top10Installs}
                indexBy="campaign_name"
                keys={[
                  'installs',
                ]}
                title="Top 10 campaigns by installs"
              />
              <BarChart
                data={top10Clicks}
                indexBy="campaign_name"
                keys={[
                  'clicks',
                ]}
                title="Top 10 campaigns by clicks"
              />
              <BarChart
                data={top10Impressions}
                indexBy="campaign_name"
                keys={[
                  'impressions',
                ]}
                title="Top 10 campaigns by impressions"
              />
            </Col>
          </Row>
        </Skeleton>
      </div>
    );
  }
}

const mapStateToProps = ({ dashboardReducer }) => ({ dashboardReducer });
export default connect(mapStateToProps, { fetchStats: getStats })(Dashboard);
