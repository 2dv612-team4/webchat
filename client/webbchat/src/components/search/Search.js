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

  onSearch(){
    // TODO: make server ajax and set otherUsers to result...
    // this.props.setOtherUsers()
    this.props.setQuery(this.state.searchQuery);
  }
  
  onSearchBoxInput(query){
    this.setState({searchQuery: query}, () => {
      // uncomment for realtime search
      //this.props.setQuery(this.state.searchQuery);
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
        <SearchSubmit 
          onSubmit={this.onSearchSubmit.bind(this)}/>
      </div>
    )
  }
}

export default Search