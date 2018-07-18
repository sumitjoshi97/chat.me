import React, { Component } from 'react'
import _ from 'lodash';
import avatar from '../assets/avatar.png';

export default class SearchUser extends Component {

  state = {

  }
  render() {
    const {store, search} = this.props;
    let users = store.searchUsers(search);
    
    let usersList = users.map((user, index) => (
        <div className="search-user__list__user" key={index} onClick={() => this.props.onSelect(user)}>
            <img src={avatar} alt="" />
            <h2>{_.get(user, 'name')}</h2>
        </div>
    ))

    return (
      <div className="search-user">
        <div className="search-user__list">
            {usersList}
        </div>
      </div>
    )
  }
}
