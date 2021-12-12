import React, { Component } from "react";
import  {useState , useEffect } from "react";
import differenceBy from 'lodash/differenceBy'

import getWeb3 from "../getWeb3";
import FarmerProduct from "../contracts/FarmerProduct.json";
import SupplierPrice from './subcomponent/SupplierPrice'
import ProductsGrid from './subcomponent/ProductsGrid';
import ProductsGridLot from './subcomponent/ProductsGridLot';
import ProductsGridSupplier from './subcomponent/ProductsGridSupplier';
import '../App.css'
 
var supp = true ; 
/**/

export default function Supplier(){
    const [isShowFrom, setIsShowFrom] = useState(true); //show quality form
    const [current_item, setCurrentItem] = useState(-1); //current farmer id (clicked)
    const [lot_data, setLotData] = useState([]);   //all farmers except the one with the same
                                                         //public key as the quality tester
    const [web3, setweb3] = useState( null);              //web3 object
    const [accounts, setAccounts] = useState(null);       //accounts : list of public keys
    const [contract, setContract] = useState(null);       //contracy
    const [current_farmer, setFarmer] = useState(null);   //current farmer object (to be used later)
    const [added_lots, setAddedLot] = useState([]);   
    const [ForSaleLots, setForSaleLots] = useState([]);   
    const [Myproducts, setMyProduct] = useState([]);   

   


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

        let current_farmer =  instance.methods.Get_list().call() ; //get list of all farmer
        var res
        current_farmer.then(function(result) {
            res = result ; 
            //setLotData(res.filter((x)=>x[0] !=accounts_list))   //remover the farmer with the same public key
            instance.methods.Get_lots().call().then(function(result) {
          
            setLotData(differenceBy(res.filter((x)=>x[0] !=accounts_list),result, 'fid'))
            //setLotData(differenceBy(res,result, 'fid'))
            console.log("added_lots",result);

            let op2 = result.map((e,i)=>{
              let temp2 = res.find(element=> element.fid === e.fid)
              if(temp2.fid) {
                e.farmer_name = temp2.farmer_name;
                e.crop_type = temp2.crop_type;
                e.location = temp2.location;
                e.total_price = temp2.total_price;
              }
              return e;


              

            })
            
            instance.methods.Get_ForSaleProduct().call().then(function(SalesProducts) {
              console.log("supp products : ",SalesProducts.filter(product => product.suppid == accounts_list[0]));
              console.log("supp products : ",SalesProducts);
              setMyProduct(SalesProducts.filter(product => product.suppid == accounts_list[0]))
              
            });
            console.log("operation : ",op2);
            setAddedLot(op2);


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
  
    

  
    const handleFormClick = (number) => { //click on verify 
     console.log("buy buttom clicked",number);
     console.log(added_lots.filter(lot => lot.fid == number  )) 

     if(current_item != number) { 
      console.log("note the same item") ; 
      setIsShowFrom((isShowForm) => false);
      setCurrentItem((current_item) => number); //setting current farmer key 
      //console.log("data : ! ", lot_data) ; 
      //console.log("Accounts : ! ", accounts) ; 
      console.log("lots_list")
      console.log(added_lots)
    }
    else{
      console.log("same item")

    }

    setFarmer(added_lots.filter(x => x[0]== number) );
    console.log("item_array",added_lots.filter(x => x[0]== number));
    
    };
  

    const BuyProduct = (event) =>{  //if submit buttom is clicked //add new lot
      //console.log(event.target.grade.value)
      //console.log(event.target.t_date.value)
      //console.log(event.target.e_date.value)
      //console.log("current item",current_item)
      console.log("current farmer",current_farmer)
      console.log("current farmer",current_farmer[0].lot_id)

            
      contract.methods.AddNewSupplier(accounts[0],
        current_farmer[0].lot_id,
        event.target.price.value).send({ from: accounts[0] });
      event.preventDefault();
    }

    const div_style =  {
      height: "10px",
      width: "10px",
    };
  
    return (
      <div >
        <h1>{accounts}</h1>
        <SupplierPrice  isShowForm={{isShowFrom,current_item,BuyProduct}} />
        <ProductsGridSupplier handleFormClick={{handleFormClick,Myproducts,supp}} />
        <h1>Available Products</h1>
        <ProductsGridLot handleFormClick={{handleFormClick,added_lots,supp}} />
        
      </div>
    );
  }
  