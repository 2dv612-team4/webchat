import React, { Component } from 'react';
import SearchBox from './SearchBox';
import SearchSubmit from './SearchSubmit';

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchQuery: this.props.filterQuery
    };
  }
  
  onSearchBoxInput(query){
    this.setState({searchQuery: query});
  }

  onSearchSubmit(){
    this.props.setQuery(this.state.searchQuery);
  }

  render() {
    return (   
      <div>
        <SearchBox
          onInput={this.onSearchBoxInput.bind(this)}/>
        <SearchSubmit 
          onSubmit={this.onSearchSubmit.bind(this)}/>
      </div>
    )
  }
}

export default Search