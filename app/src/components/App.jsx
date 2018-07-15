import React, {Component} from 'react'
import Messanger from "./Messanger";
import Store from '../store';
export default class App extends Component {

  state = {
    store: new Store(this)
  }

  render() {

    const {store} = this.state;
    return (

      <div className="app">
        {console.log(store)}
        <Messanger store={store}/>
      </div>
    )
  }
}