import React, { Component } from 'react';
import SearchBox from './SearchBox';
import { getAllUsersContaining } from '../../model/DAL/dbUser';
import connect from '../../connect/connect'

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchQuery: this.props.filterQuery
    };
  }

  onSearch(){
    this.props.setQuery(this.state.searchQuery);
    if(this.state.searchQuery === ''){
      return this.props.setOtherUsers([]); 
    } 
    getAllUsersContaining(this.state.searchQuery)
      .then(result => result.json())
      .then(users => {
        this.props.setOtherUsers(users)
      })
      .catch(() => {
        // TODO: show notification..
      });
  }
  
  onSearchBoxInput(query){
    this.setState({searchQuery: query}, () => {
      // uncomment for realtime search
      this.onSearch();
    });
  }

  onSearchBoxEnter(event){
    if(event.key === 'Enter'){
      this.onSearch();
    }
  }

  onSearchSubmit(){
    this.onSearch();
  }

  render() {
    return (   
      <div>
        <SearchBox
          onInput={this.onSearchBoxInput.bind(this)}
          onSubmit={this.onSearchBoxEnter.bind(this)}/>
      </div>
    )
  }
}

export default connect((state) => ({
  filterQuery: state.userSearchQuery,
  setOtherUsers: state.setOtherUsers,
}), Search);