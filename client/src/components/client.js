import React, { Component } from "react";
import getWeb3 from "../getWeb3";
import FarmerProduct from "../contracts/FarmerProduct.json";


class Client extends Component {
 
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
        this.setState({ web3, accounts, contract: instance }, this.GetAccountDetails);
        console.log( this.state);
        } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
        }
    };


    GetAccountDetails = async () => {
        const { accounts, contract } = this.state;
        var bool_var = await contract.methods.farmer_exist(accounts[0]).call()

        if (bool_var) {
            console.log('exist');

            console.log(await contract.methods.Get_crop_farmer_by_key(accounts[0]).call());
            console.log(await contract.methods.Get_list().call())  ; 

            //show profile
            
        }
        else {
            console.log('new');
            
            //must put details

        }
        /*
        const { accounts, contract } = this.state;

        
        await contract.methods.Getnumber_crops().call();
        
        
        console.log(await contract.methods.Getnumber_crops().call());
        await contract.methods.AddNewCrop(accounts[0],
          "farmer_yacines", 
          "Tunisia north africa",
          "batata", 
          551,
          10,
          100).send({ from: accounts[0] });
        console.log('number crops');
        console.log(await contract.methods.Getnumber_crops().call());
        console.log(await contract.methods.Get_crop_farmer_id_by_key(accounts[0]).call());
        console.log("list crops");
        let a = await contract.methods.Get_list().call();
        console.log(a[0]);
        console.log("farmer exist");
        console.log(await contract.methods.farmer_exist(accounts[0]).call());
        console.log(accounts);
        
        console.log("hereee");
        console.log(await contract.methods.Get_list().call());
            */
      
      };
    
      check_farmer_by_id = async () => {
        const { accounts, contract } = this.state;
   
    
      };

      handleSubmit  = async (event) =>  {
        const { accounts, contract } = this.state ;
       
        console.log(contract.methods.Getnumber_crops().call());

        contract.methods.AddNewCrop(accounts[0],
            event.target.name.value, 
            event.target.location.value,
            event.target.crop.value, 
            event.target.phone.value,
            event.target.unit_price.value,
            event.target.quantity.value).send({ from: accounts[0] });

        console.log(contract.methods.Getnumber_crops().call());

        
        event.preventDefault();
      }

      totalprice = async (event) => { //to check later
        console.log("problem" )
       
        event.preventDefault();
      }

  render() {
    return (
        <div>
                account key = {this.state.accounts}
                <form onSubmit={this.handleSubmit} >
                    <label>  Name:   <input type="text" name="name" />  </label><br />

                    <label>  Location:  <input type="text" name="location" />  </label><br />

                    <label>  Crop Type:  <input type="text" name="crop" />  </label><br />

                    <label>  Phone :  <input type="text" name="phone" />  </label><br />
                    <div  onChange={this.totalprice} >
                    <label>  Quantity:  <input type="text" name="quantity"/>  </label><br />
                    <label>  Unit-Price:  <input type="text" name="unit_price" />  </label><br />
                    </div>

                    <div> Total price  = {this.unit_price * this.quantity} </div>

                    <input type="submit" value="Submit" /><br />

                    
                </form>
        </div>
    );
  }
}

export default Client;

