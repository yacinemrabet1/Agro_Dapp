import React, { Component, useEffect } from "react";
import { Container, Row, Col, Form, FormControl, FormLabel, Button } from "react-bootstrap";


class Client1 extends Component {
    
    state = {farmer: {
        nom : '', location : '', crop: '', phone: '', unit_price: '', quantity: ''},
        disabled : false
};


    handleSubmit  = (async (event) =>  {
        let tmp = {
            nom: event.target.name.value, 
            location: event.target.location.value,
            crop: event.target.crop.value, 
            phone: event.target.phone.value,
            unit_price: event.target.unit_price.value,
            quantity: event.target.quantity.value
        }
        this.setState({farmer : tmp  })
        this.setDisable(true)
        console.log(tmp)
        console.log(this.state.farmer)
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
                <Container >
                <Row> 
                    <Col className="justify-content-md-left">
                    <Container className= "card card-body mb-3 mt-3 " >
                        
                        <Form onSubmit={this.handleSubmit} >
                            <Row className="justify-content-md-left mb-3" >
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
                            <Row className="justify-content-md-left mb-3" >
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
                            <Row className="justify-content-md-left mb-3">
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
                            <Row className="justify-content-md-left mb-3">
                                <Col className="justify-content-md-center" xs lg="2">
                                    <input className= "btn btn-primary" type= "submit" value= "submit" disabled={this.state.disabled}/> 
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
              );
        }
    
}
 
export default Client1;