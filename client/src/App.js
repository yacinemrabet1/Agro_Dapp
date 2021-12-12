import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import FarmerProduct from "./contracts/FarmerProduct.json";
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom";
import Farmer from "./components/farmer";
import Lots from "./components/lots";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Lot from "./components/lots";
import Supplier from "./components/supplier";
import Client from "./components/client";



class App extends Component {
 
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => { //error error :'(
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
      <div class="main justify-content-center" style={{height: "100%"}}>
      <Router>
    
      <nav class="justify-content-end navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link" to="/">Home</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/farmer">farmer</Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/quality">Quality</Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/supplier">Supplier</Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/client">Client</Link>
            </li>
          </ul>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          
        <Routes>
          <Route path="/farmer" element = {<Farmer/>} /> 
        </Routes>

        <Routes>
          <Route path="/quality" element = {<Lot/>} /> 
        </Routes>

        <Routes>
          <Route path="/supplier" element = {<Supplier/>} /> 
        </Routes>

        <Routes>
          <Route path="/client" element = {<Client/>} /> 
        </Routes>
        
    </Router>
    </div>
    
    );
  }
}

export default App;
