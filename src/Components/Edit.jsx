import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import FirebaseService from '../services/FirebaseService';

class Edit extends Component {

  emptyCustomer = {
    key: '',
    country: '',
    totalcases: '',
    newcases: "",
    useremail: '',
    totaldeaths:"",
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCustomer
    };
  }

  componentDidMount = () => {
    let key = this.props.match.params.key
    if (key !== 'new') {
      FirebaseService.get(key).on("value", this.onDataChange);
    }
  }


  componentWillUnmount = () => {
    FirebaseService.getAll().off("value", this.onDataChange);
  }

  onDataChange = (item) => {
    let data = item.val();
    let covid = {
      key: item.key,
      country: data.country,
      totalcases: data.totalcases,
      newcases: data.newcases,
      useremail: data.useremail,
      totaldeaths: data.totaldeaths,
    };

    this.setState({
      item: covid,
    });
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {item} = this.state;
    let key = this.props.match.params.key
    if (key !== 'new') {
      FirebaseService.update(key, item);
    } else {
      FirebaseService.addCustomer(item);
    }

    this.props.history.push('/corona');
  };

  render = () => {
    const {item} = this.state;
    const title = <h2>{item.key ? 'Edit Customer' : 'Add Customer'}</h2>;

    return <div>
      
      <Container>
      <h3>Add Details</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="country">Country</Label>
            <Input type="text" name="country" id="country" value={item.country || ''}
                   onChange={this.handleChange} autoComplete="country"/>
          </FormGroup>
          <FormGroup>
            <Label for="totalcases">Total Cases</Label>
            <Input type="int" name="totalcases" id="totalcases" value={item.totalcases || ''}
                   onChange={this.handleChange} autoComplete="totalcases"/>
          </FormGroup>          
          <FormGroup>
            <Label for="newcases">New Cases</Label>
            <Input type="int" name="newcases" id="newcases" value={item.newcases || ''}
                   onChange={this.handleChange} autoComplete="newcases"/>
          </FormGroup>
          <FormGroup>
            <Label for="useremail">User Email</Label>
            <Input type="text" name="useremail" id="useremail" value={item.useremail || ''}
                   onChange={this.handleChange} autoComplete="useremail"/>
          </FormGroup>
          <FormGroup>
            <Label for="totaldeaths">Total Deaths</Label>
            <Input type="int" name="totaldeaths" id="totaldeaths" value={item.totaldeaths || ''}
                   onChange={this.handleChange} autoComplete="totaldeaths"/>
          </FormGroup> 
          <FormGroup>
            <Button color="primary" type="submit">Submit</Button>{' '}
            <Button color="secondary" tag={Link} to="/corona">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(Edit);