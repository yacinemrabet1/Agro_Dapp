import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import FarmerProduct from "./contracts/FarmerProduct.json";
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom";
import Client from "./components/client";
import Client1 from "./components/Client1";
import Lots from "./components/lots";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'



class App extends Component {
 
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FarmerProduct.networks[networkId];
      const instance = new web3.eth.Contract(
        FarmerProduct.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log(accounts);
      console.log(networkId);
      console.log(deployedNetwork);
      console.log( deployedNetwork.address);
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
      console.log( this.state);
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
  
    
  
  };

  
  render() {
    return (
      <Router>
    
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/client">Client</Link>
            </li>

            <li>
              <Link to="/quality">Quality</Link>
            </li>

            <li>
              <Link to="/client1">Client1</Link>
            </li>

          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/client" element = {<Client/>} /> 
          <Route path="/quality" element = {<Lots/>} /> 
          <Route path="/client1" element = {<Client1/>} /> 
        </Routes>
   
    </Router>
    );
  }
}

export default App;
