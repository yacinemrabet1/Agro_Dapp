pragma solidity ^0.5.0;
import "truffle/Assert.sol"; //asserts to be used later
import "truffle/DeployedAddresses.sol"; //this smart contract gets the adresse of the deployed contract
import "../contracts/FarmerProduct.sol"; //the smart contract we are working on 


contract TestFarmProduce {
    FarmerProduct farmproduct = FarmerProduct(DeployedAddresses.FarmerProduct());   // DeployedAddresses.Adoption() get the adresse
      struct farmer_crop{
        address fid;
        string farmer_name;
        string location;
        string crop_type;
        uint phone_number;
        uint quantity;
        uint unit_price;
        uint total_price; // unit_price * quantity
    }

    function testRegisterNewCrop() public {

        farmproduct.AddNewCrop(
            msg.sender,
            "farmer_yacine", 
            "Tunisia north africa",
            "batata", 
            551,
            10,
            100);

        //FarmerProduct. memory _farmercrop = farmproduct.GetFarmerCropByAddress(address(this)) ; 

       // Assert.equal(farmer_crop_array[0],address(this),"address mismatch");       
    }    

    function testGetBYFarmerId()  public {
        string memory farmername  = farmproduct.Get_crop_farmer_id_by_key(msg.sender) ; 
        Assert.equal(farmername,string("farmer_yacine"),"farmer name not equal farmer_yacine");
    }
    

    function testNumberCrop() public{

        uint number_crops = farmproduct.Getnumber_crops();
        Assert.equal(number_crops,uint(1),"nb crops not equal 1");
        //Assert.equal(number_crops,uint(2),"nb crops not equal 1");
    }


    function testAddLot() public {
            farmproduct.AddNewLot(
                        msg.sender, 
                        msg.sender, 
                        50,
                        "2020", 
                        "2021"
                        );                        
    }
    function testNumberLot() public{
        uint number_lots = farmproduct.Getnumber_lots();
        Assert.equal(number_lots,uint(1),"nb lots not equal 1");
    }


    function testAddLot2() public {
            farmproduct.AddNewLot(
                        msg.sender, 
                        msg.sender, 
                        50,
                        "2020", 
                        "2021"
                        );                        
    }
    
    function testNumberLot2() public{

        uint number_lots = farmproduct.Getnumber_lots();
        Assert.equal(number_lots,uint(2),"nb lots not equal 1");
    }



    function testSupplier() public {
            farmproduct.AddNewSupplier(
                        msg.sender,
                        1,
                        50
                        );                        
    }
    function testNumberProducts() public{

        uint number_products = farmproduct.Getnumber_product();
        Assert.equal(number_products,uint(1),"nb products not equal 1");
    }


    

    


    

 
}


