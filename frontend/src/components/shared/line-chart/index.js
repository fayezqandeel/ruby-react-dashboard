import React, { Component } from 'react';
import { DatePicker, Radio } from 'antd';
import { ResponsiveLine } from '@nivo/line';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  renderUnits(units) {
    /*
      render list of units, basically when user select long date range
      it will show so long list of days and will make points and whole chart
      looks so ugly, so I made it to change the display base of the date range
      length, if it's > 7 days and less than 60 days show weeks instead of days
      if its's > 60 days and < than 360 days then it will display months
      instead of days, and if it's more than 360 days, it will display years
      inseated of days
    */
    const { currentUnit } = this.props;
    return (
      <Radio.Group
        size="small"
        value={currentUnit}
        buttonStyle="solid"
        disabled
      >
        {
          units.map(unit => <Radio.Button key={unit} value={unit}>{unit}</Radio.Button>)
        }
      </Radio.Group>
    );
  }

  render() {
    // extract needed data from props
    const {
      data,
      defaultDates,
      onDateRangeChange,
      units,
      subtitle,
      title,
    } = this.props;
    return (
      <div id="line-chart-holder">
        <div className="widget">
          <div>
            <div className="actions">
              <div>
                <DatePicker.RangePicker
                  onChange={onDateRangeChange}
                  defaultValue={defaultDates}
                  size="small"
                />
              </div>
              {this.renderUnits(units)}
            </div>
            <h3>{title}</h3>
            <h4>{subtitle}</h4>
            <div className="clear"></div>
          </div>
          <div className="widget-content line-chart">
            <ResponsiveLine
              data={data}
              margin={{
                top: 30,
                right: 10,
                bottom: 70,
                left: 60,
              }}
              xScale={{
                type: 'point',
              }}
              yScale={{
                type: 'linear',
                stacked: true,
                min: 'auto',
                max: 'auto',
              }}
              curve="natural"
              axisTop={{}}
              axisRight={{}}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              colors="set3"
              dotSize={10}
              dotColor="inherit:darker(0.3)"
              dotBorderWidth={2}
              dotBorderColor="#ffffff"
              dotLabel="y"
              dotLabelYOffset={-12}
              animate
              motionStiffness={90}
              motionDamping={15}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LineChart;
