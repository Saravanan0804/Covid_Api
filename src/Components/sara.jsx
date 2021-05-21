import React, { Component } from "react";
import axios from "axios";
import { Table, Row } from "antd";
import { Bar } from '@ant-design/charts';
import 'antd/dist/antd.css';

export default class main extends Component {
  state = {
    states: [],
    toatalData: [],
    barChart: [],
  };

  componentDidMount() {
    this.getCoronaDetails();
  }

  getCoronaDetails = () => {
    axios
      .get(`https://coronavirus-19-api.herokuapp.com/countries`)
      .then((res) => {
        console.log(res);

        this.setState({
          states: res.data,
          totalData: [res.data && res.data[0]],
          barChart: res.data && [
            {
              type: "Cases",
              value: res.data[0].cases,
            },
            {
              type: "Deaths",
              value: res.data[0].deaths,
            },
            {
              type: "Recovered",
              value: res.data[0].recovered,
            },
          ],
        });
      });
  };

  render() {
    const { states, totalData, barChart } = this.state;



    var config = {
      data: barChart,
      xField: 'value',
      yField: 'type',
      seriesField: 'type',
      legend: { position: 'top-left' },
    };
    const column = [
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
      },
      {
        title: "Cases",
        dataIndex: "cases",
        key: "cases",
      },
      {
        title: "Today Cases",
        dataIndex: "todayCases",
        key: "todayCases",
      },
      {
        title: "Total Deaths",
        dataIndex: "deaths",
        key: "deaths",
      },
      {
        title: "Deaths",
        dataIndex: "todayDeaths",
        key: "todayDeaths",
        render(text, record) {
          return {
            props: {
              style: { background: parseInt(text) > 200 ? "red" : "green" }
            },
            children: <div>{text}</div>
          };
        }
      },
      {
        title: "Recovered",
        dataIndex: "recovered",
        key: "recovered",
      },
    ];
    const columnTotal = [
      {
        title: "Cases",
        dataIndex: "cases",
        key: "cases",
      },
      {
        title: "Deaths",
        dataIndex: "deaths",
        key: "deaths",
      },
      {
        title: "Recovered",
        dataIndex: "recovered",
        key: "recovered",
      },
    ];

    return (
      <div>
        <Row>
          <Table
            columns={columnTotal}
            dataSource={totalData}
            size="large"
            pagination={false}
            scroll={{ y: 240 }}
          />
        </Row>
        
          <Bar {...config} />
        
        <Row>
          <Table
            columns={column}
            dataSource={states}
            size="large"
            pagination={false}
            scroll={{ y: 240 }}
          />
        </Row>
      </div>
    );
  }
}
