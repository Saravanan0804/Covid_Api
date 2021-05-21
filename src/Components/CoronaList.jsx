import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import FirebaseService from '../services/FirebaseService';
import { Bar } from "@ant-design/charts";
import firebase from "../util/firebase";

class CoronaList extends Component {

  constructor(props) {
    super(props);
    this.state = {corona: [], isLoading: true};
    this.remove = this.remove.bind(this);
    this.ref = firebase.ref('/corona');
    this.state = {
      corona: [],
      totalNewCases: 0,
      totalCases: 0,
      totaldeath: 0,
      casesData: [],
    };
  }

  componentDidMount = () => {
    FirebaseService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount = () => {
    FirebaseService.getAll().off("value", this.onDataChange);
  }

  onDataChange = (items) => {
    console.log(items);
    let corona = [];
    let totalNewCasesInt = 0;
    let totalCasesInt = 0;
    let totaldeathInt = 0;
    items.forEach(item => {
      let data = item.val();
      corona.push({
        key: item.key,
        country: data.country,
        totalcases: data.totalcases,
        useremail: data.useremail,
        newcases: data.newcases,
        totaldeaths: data.totaldeaths,
      });
    });

    corona.map((post) => {
      if (
        post.newcases !== undefined ||
        post.totalcases !== undefined ||
        post.totaldeaths !== undefined
      ) {
        totalNewCasesInt = parseInt(totalNewCasesInt) + parseInt(post.newcases);
        totalCasesInt = parseInt(totalCasesInt) + parseInt(post.totalcases);
        totaldeathInt = parseInt(totaldeathInt) + parseInt(post.totaldeaths);
      }
    });

    const data = [
      {
        total: " Total New Cases",
        value: totalNewCasesInt,
        type: "cases",
      },
      {
        total: "Total Cases",
        value: totalCasesInt,
        type: "cases",
      },
      {
        total: "Total Deaths",
        value: totaldeathInt,
        type: "cases",
      },
    ];


    this.setState({
      corona: corona,
      isLoading: false,
      casesData: data,
    });
  }

  async remove(key) {
    FirebaseService.delete(key)
    .then(() => {
      let updatedCustomers = [...this.state.corona].filter(i => i.key !== key);
      this.setState({corona: updatedCustomers});
    });
  }

  render() {
    const {corona, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const CoronaList  = corona.map(covid => {
      return <tr key={covid.key}>
        <td style={{whiteSpace: 'nowrap'}}>{covid.country}</td>
        <td>{covid.totalcases}</td>
        <td>{covid.newcases}</td>
        <td>{covid.useremail}</td>
        <td>{covid.totaldeaths}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/corona/" + covid.key}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(covid.key)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    const { casesData } = this.state;
    var config = {
      data: casesData,
      isStack: true,
      xField: "value",
      yField: "total",
      seriesField: "type",
      label: {
        position: "middle",
        layout: [
          { type: "interval-adjust-position" },
          { type: "interval-hide-overlap" },
          { type: "adjust-color" },
        ],
      },
    };

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/corona/new">Add Details</Button>
          </div>
          <h3>Corona List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Country</th>
                <th width="20%">Total Cases</th>
                <th width="10%">New Cases</th>
                <th>User Email</th>
                <th width="20%">Total Deaths</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {CoronaList }
            </tbody>
          </Table>
          <Bar {...config} />;
        </Container>
      </div>
    );
  }
}

export default CoronaList ;