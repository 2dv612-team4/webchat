import React, { Component } from 'react';

import Search from './components/search/App'
import UserList from './components/userList/UserList'
import './App.css';

import { Layout, Header, Content, Grid, Cell} from 'react-mdl';

class App extends Component {

  render() {
    return (
      <div style={{height: '100vh', position: 'relative'}}>
          <Layout fixedHeader>
              <Header title="Title">
              </Header>
              <Content>
                <div style={{ margin: 'auto'}}>
                  <Grid className="demo-grid-ruler" >
                    <Cell col={2} style={{ minWidth: '200px'}} >
                      <Search />
                      <UserList />
                    </Cell>
                    <Cell col={10} style={{ margin: '2px'}}>CHATT</Cell>
                  </Grid>
                </div>
              </Content>
          </Layout>
      </div>
    );
  }
}

export default App;
