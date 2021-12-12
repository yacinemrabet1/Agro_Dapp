import React, { Component, useEffect } from "react";
import { Container, Row, Col, Form, FormControl, FormLabel, Button } from "react-bootstrap";
import getWeb3 from "../getWeb3";
import FarmerProduct from "../contracts/FarmerProduct.json";


class Farmer extends Component {
    
    state = {farmer: {
        nom : '', location : '', crop: '', phone: '', unit_price: '', quantity: ''},
        disabled : false
};



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
    //console.log(bool_var)
    //console.log(await contract.methods.Get_list().call())  ; 
            

    if (bool_var) {
        this.setDisable(true)
        console.log('exist')
        //console.log('exist');
        //console.log(this.state.farmer);
        let current_farmer = await contract.methods.Get_crop_farmer_by_key(accounts[0]).call() ; 
        var secondKey = Object.keys(current_farmer)[1]; //fetched the key at second index
        console.log(current_farmer[secondKey].fid);
        console.log(current_farmer[secondKey].farmer_name);
        console.log(current_farmer[secondKey].location);
        console.log(current_farmer[secondKey].fid);
        console.log(current_farmer[secondKey].fid);

        this.setState({farmer : 
            {
                nom : current_farmer[secondKey].farmer_name , 
                location : current_farmer[secondKey].location, 
                crop: current_farmer[secondKey].crop_type, 
                phone: current_farmer[secondKey].phone_number, 
                unit_price: current_farmer[secondKey].unit_price, 
                quantity: current_farmer[secondKey].quantity
            }
        
        })
   
        //show profile
        
    }
    else {
        console.log("new")
        this.setDisable(false)

       

    }
   
  
  };


    handleSubmit  = (async (event) =>  {
        const { accounts, contract } = this.state ;

        let tmp = {
            nom: event.target.name.value, 
            location: event.target.location.value,
            crop: event.target.crop.value, 
            phone: event.target.phone.value,
            unit_price: event.target.unit_price.value,
            quantity: event.target.quantity.value
        }
        this.setState({farmer : tmp  }, ()=>{
            console.log("plotting state")
            console.log(this.state.farmer)
            contract.methods.AddNewCrop(accounts[0],
                tmp.nom, 
                tmp.location,
                tmp.crop, 
                tmp.phone,
                tmp.unit_price,
                tmp.quantity).send({ from: accounts[0] });
            this.setDisable(true)



        })
        
        
        

        event.preventDefault();
    });
    
    /*useEffect = (() => {
        console.log('aadsadas');
    });*/

    /*componentDidUpdate() {
        this._commitAutoSave();
      }
    */
    setDisable = (condition) => {
        this.setState({disabled : condition})
    }






    render() {
        
            return (
                <div style={{height:"950px"}}>
                <Container className="middle" >
                <Row> 
                    <Col className="justify-content-md-left">
                    <Container className= "card card-body mb-3 mt-3 " >
                        
                        <Form onSubmit={this.handleSubmit} >
                            <Row className="justify-content-md-center mb-3" >
                            <Col xs lg="4">
                            <Form.Group>
                                <Form.Label> Name </Form.Label>
                                <Form.Control type="text" placeholder="Name" name="name" disabled={this.state.disabled}/>
                            </Form.Group>
                            </Col>
                            <Col xs lg="4">
                            <Form.Group>
                                <FormLabel> Location </FormLabel>
                                <FormControl type="text" placeholder="exp: Tunis" name="location" disabled={this.state.disabled}/>
                            </Form.Group>
                            </Col>
                            </Row>
                            <Row className="justify-content-md-center mb-3" >
                            <Col xs lg="4">
                            <Form.Group>
                                <FormLabel> Crop type </FormLabel>
                                <FormControl type="text" placeholder="Crop type" name="crop" disabled={this.state.disabled}/>
                            </Form.Group>
                            </Col>
                            <Col xs lg="4">
                            <Form.Group>
                                <FormLabel> Phone </FormLabel>
                                <FormControl type="text" placeholder="exp: 55 555 555" name="phone" disabled={this.state.disabled}/>
                            </Form.Group>
                            </Col>
                            </Row>
                            <Row className="justify-content-md-center mb-3">
                            <Col xs lg="4">
                            <Form.Group>
                                <FormLabel> Quantity </FormLabel>
                                <FormControl type="text" placeholder="Quantity" name="quantity" disabled={this.state.disabled}/>
                            </Form.Group>
                            </Col>
                            <Col xs lg="4">
                            <Form.Group>
                                <FormLabel> Unit price </FormLabel>
                                <FormControl type="text" placeholder="Unit price" name="unit_price" disabled={this.state.disabled}/>
                            </Form.Group>
                            </Col>
                            </Row>
                            <Row className="justify-content-md-center mb-3">
                                <Col className="justify-content-md-center" xs lg="2">
                                    <input className= "btn btn-secondary btn-lg active" type= "submit" value= "submit" disabled={this.state.disabled}/> 
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                    </Col>
                    {this.state.disabled ? <Col>
                        <Container className= "card card-body mb-3 mt-3"> 
                            <div>
                                <h4>{this.state.farmer.nom}</h4>
                                <ul className= "list-group">
                                    
                                    <li className= "list-group-item"> location: {this.state.farmer.location} </li>
                                    <li className= "list-group-item"> crop: {this.state.farmer.crop} </li>
                                    <li className= "list-group-item"> phone: {this.state.farmer.phone} </li>
                                    <li className= "list-group-item"> unit price: {this.state.farmer.unit_price} </li>
                                    <li className= "list-group-item"> quantity: {this.state.farmer.quantity} </li>
                                    <li className= "list-group-item"> total price : {this.state.farmer.quantity * this.state.farmer.unit_price} </li>

                                </ul>
                            
                            </div>
                        </Container>
                    </Col> :<div></div>}
                    
                    </Row>
                </Container>
                </div>
              );
        }
    
}
 
export default Farmer;