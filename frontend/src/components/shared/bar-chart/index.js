import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    // extract needed data from props
    const {
      data,
      indexBy,
      keys,
      title,
    } = this.props;
    return (
      <div id="bar-chart-holder">
        <div className="widget">
          <div>
            <h3>{title}</h3>
            <div className="clear"></div>
          </div>
          <div className="widget-content top-10">
            <ResponsiveBar
              data={data}
              keys={keys}
              indexBy={indexBy}
              margin={{
                top: 0,
                right: 30,
                bottom: 0,
                left: 150,
              }}
              padding={0.5}
              layout="horizontal"
              colors="blues"
              colorBy="id"
              borderColor="inherit:darker(1.6)"
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Top 10',
                legendPosition: 'middle',
                legendOffset: -140,
              }}
              enableGridY={false}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor="inherit:darker(1.6)"
              animate
              motionStiffness={90}
              motionDamping={15}
              legends={[]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BarChart;
