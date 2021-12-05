import React, { Component } from "react";
import getWeb3 from "../getWeb3";
import FarmerProduct from "../contracts/FarmerProduct.json";


class Lots extends Component {
 
    state = {quantity : 1 , unit_price : 1 ,  storageValue: 0, web3: null, accounts: null, contract: null };


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
       
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, contract: instance }, this.GetLotsDetails);
        console.log( this.state);
        } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
        }
    };


    GetLotsDetails = async () => {

        const { accounts, contract } = this.state;
        console.log("all lots")  ; 
        console.log(await contract.methods.Get_list().call())  ; 


        
        

        }
      
      

    

  render() {
    return (
        <div>
                hello account key = {this.state.accounts}

        </div>
    );
  }
}
export default Lots;

