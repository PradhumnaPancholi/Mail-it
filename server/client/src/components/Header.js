import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component{
  renderContent(){
      switch(this.props.auth){
        case null:
          return; //user will not see wrong data if req takes more time to finish
        case false:
          return <li><a href = "/auth/google">Log in with Google</a></li>;
        default:
          return [
            <li key='a'><Payments /></li>,
            <li key='b'><a href = "/api/logout">Log out</a></li>
          ];
      }
  }

  render(){
    console.log(this.props);
    return(
        <nav>
          <div className="nav-wrapper blue-grey darken-3">
            <Link
              to={this.props.auth ? '/dashboard' : '/'}
              className="left brand-logo"
            >
              Mail It
            </Link>
            <ul className="right">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
    );
  }
}

function mapStateToProps({auth}){
  return {auth};
}

export default connect(mapStateToProps)(Header);
