import React, { Component } from 'react';
import { Button } from 'react-mdl';

class Logout extends Component {

  render() {
      return (   
        <div>
          <form action="/logout" name="logout" method="get">
            <Button type="submit" id="logout" colored raised ripple>Logout</Button>
          </form>
        </div>
      )
    }
  }

export default Logout