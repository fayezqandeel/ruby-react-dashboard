import React, { Component } from 'react';
import { Dropdown, Menu, Icon } from 'antd';
import { ResponsivePie } from '@nivo/pie';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  renderMenu(items) {
    /*
      because we have different pararmeters in report, we allow user
      to select which parameter
    */
    const { defaultMenuKey, onPieChartChange } = this.props;
    return (
      <Menu
        onClick={onPieChartChange}
        defaultSelectedKeys={[defaultMenuKey]}
        selectable
      >
        {
          items.map(item => <Menu.Item key={item} value={item}>{item}</Menu.Item>)
        }
      </Menu>
    );
  }

  render() {
    // exact needed data fro props
    const {
      data,
      pieKey,
      menuItems,
      subtitle,
      title,
    } = this.props;
    return (
      <div id="pie-chart-holder">
        <div className="widget">
          <div>
            <div className="actions">
              <Dropdown overlay={this.renderMenu(menuItems)} placement="bottomRight">
                <a className="ant-dropdown-link">
                  Share per
                  {` ${pieKey}`}
                  <Icon type="down" />
                </a>
              </Dropdown>
            </div>
            <h3>{title}</h3>
            <h4>{subtitle}</h4>
            <div className="clear"></div>
          </div>
          <div className="widget-content pie-chart">
            <ResponsivePie
              data={data}
              margin={{
                top: 40,
                right: 80,
                bottom: 80,
                left: 80,
              }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors="set3"
              colorBy="id"
              borderWidth={1}
              borderColor="inherit:darker(0.2)"
              radialLabelsSkipAngle={10}
              radialLabelsTextXOffset={6}
              radialLabelsTextColor="#333333"
              radialLabelsLinkOffset={0}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={24}
              radialLabelsLinkStrokeWidth={1}
              radialLabelsLinkColor="inherit"
              slicesLabelsSkipAngle={10}
              slicesLabelsTextColor="#333333"
              animate
              motionStiffness={90}
              motionDamping={15}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PieChart;
