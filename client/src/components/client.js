import React, { Component } from "react";
import  {useState , useEffect } from "react";
import differenceBy from 'lodash/differenceBy'

import getWeb3 from "../getWeb3";
import FarmerProduct from "../contracts/FarmerProduct.json";
import QualityForm from './subcomponent/QualityForm'
import ProductsGrid from './subcomponent/ProductsGrid';
import ProductsGridClient from './subcomponent/ProductsGridClient';
import '../App.css'


var supp = false ; 



export default function Client(){
    const [isShowFrom, setIsShowFrom] = useState(true); //show quality form
    const [current_item, setCurrentItem] = useState(-1); //current farmer id (clicked)
    const [lot_data, setLotData] = useState([]);   //all farmers except the one with the same
                                                         //public key as the quality tester
    const [web3, setweb3] = useState( null);              //web3 object
    const [accounts, setAccounts] = useState(null);       //accounts : list of public keys
    const [contract, setContract] = useState(null);       //contracy
    const [current_farmer, setFarmer] = useState(null);   //current farmer object (to be used later)
    const [added_lots, setAddedLot] = useState([]);   
    const [all_products, setProduct] = useState([]);   

   

    useEffect(()  => { //component did mount
      
      async function update_states(){  //function definition 
      try {
        // Get network provider and web3 instance.
        const web3_object = await getWeb3();
        // Use web3 to get the user's accounts.
        const accounts_list = await web3_object.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3_object.eth.net.getId();
        const deployedNetwork = FarmerProduct.networks[networkId];
        const instance = new web3_object.eth.Contract(
            FarmerProduct.abi,
            deployedNetwork && deployedNetwork.address,
            );
          
        //console.log("current accounts",web3_object.eth.getAccounts())
        setweb3(web3_object );
        setAccounts(accounts_list );
        setContract(instance);

        let current_farmer =  instance.methods.Get_list().call() ;
        current_farmer.then(function(result_farmers) {
           
          
            instance.methods.Get_lots().call().then(function(tested_crop) {

              instance.methods.Get_ForSaleProduct().call().then(function(for_sale_product) {

                console.log("all data to be proc");
                console.log("all_farmers",result_farmers);
                console.log("all_tested_crops",tested_crop);
                console.log("all_for_sale_product",for_sale_product);

                let supplier_lot = for_sale_product.map((product, i) => {
                  let temp2 = tested_crop.find(lot => lot.lot_id === product.lot_id)
                  if (temp2.lot_id) {
                    product.fid = temp2.fid;
                    product.tester_id = temp2.tester_id;
                    product.grade = temp2.grade;
                    product.test_date = temp2.test_date;
                    product.exp_date = temp2.exp_date;
                  }
                  return product;
              });     

              let supplier_lot_farmer = supplier_lot.map((product, i) => {
                let temp2 = result_farmers.find(lot => lot.fid === product.fid)
                if (temp2.fid) {
                  product.farmer_name = temp2.farmer_name;
                  product.location = temp2.location;
                  product.crop_type = temp2.crop_type;
                  product.phone_number = temp2.phone_number;
                  product.unit_price = temp2.unit_price;
                }
                return product;
            });     
              
              
              console.log("supplier_lot : ",supplier_lot);
              console.log("supplier_lot_farmer : ", supplier_lot_farmer[0]);
              console.log("supplier_lot_farmer : ", Object.entries(supplier_lot_farmer));
              console.log("json : ",JSON.stringify(supplier_lot_farmer));
              

              function convert_key(obj) {
                return Object.keys(obj).map(v => v)
            }
               function convert_values(obj) {
              return Object.keys(obj).map( v => obj[v])
          }

            var results = []; 
            console.log("length : ",supplier_lot_farmer.length)
            for(let i=0; i<supplier_lot_farmer.length; i++) {
              let keys = convert_key(supplier_lot_farmer[i])
              let values =  convert_values(supplier_lot_farmer[i])
              let result = {};
              console.log("f results : " ,keys.forEach((key, i) => result[key] = values[i]));
              results.push(result);



            }
           

            setProduct(results);


           
            });
      
            });
          });  
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
        //console.log("error_error_error_error_");
        console.error(error);
        }
      }
      update_states();
    })
  
    


    const UpdateLot = (event) =>{  //if submit buttom is clicked //add new lot
       event.preventDefault();
    }


  
    const handleFormClick = (number) => { //click on verify 
      
    };
  
    const div_style =  {
      height: "10px",
      width: "10px",
      
    };
  
    return (
      <div style={{height: "950px"}}>
        <h6>Public key: {accounts}</h6>
        <ProductsGridClient handleFormClick={{all_products}} />
      </div>
    );
  }
  