import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './covid.jpg'
import { Link } from 'react-router-dom'

class Header extends React.Component
{
  render()
  {
    return (
  <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
       <img src={ logo } width="50" height="30" class="d-inline-block align-top" alt=""></img>
         Covid-19 Dashboard
      </a>
<ul class="nav justify-content-center">
  <li class="nav-item">
    <Link to='/' className='nav-link active'>Dashboard</Link>
  </li>
  <li class="nav-item">
  <Link to='/corona' className='nav-link'>Customer Input</Link>
  </li>
</ul>
</nav>   
    )
  }
}
export default Header;