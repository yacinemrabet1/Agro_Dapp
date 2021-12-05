pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

//registers all the farmer contracts t track his work
contract FarmerProduct {

    //______________________________________________________
    //farmer crop 
    struct farmer_crop{ // no crop type 
        address fid;
        string farmer_name;
        string location;
        string crop_type;
        uint phone_number;
        uint quantity;
        uint unit_price;
        uint total_price; // unit_price * quantity  
    }

    struct lot{
        address fid ;
        address tester_id; 
        uint    lot_id  ;
        uint    grade;
        string  test_date;
        string  exp_date  ;      
    }

    struct supplier{
        address suppid ; 
        uint lot_id ;
        uint product_id; 
        uint selling_price;
    }

    //______________________________________________________
    //list of all farmers crops
    farmer_crop[] public all_Farmers_crops ; 

    uint public  number_crops ;

    //list of all lots
    lot[] all_lots ; 
    uint  number_lots ; 

    supplier[]  all_product_supplier ; 
    uint  number_products ; 
    
    


   //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
   constructor() public {
       number_crops=0 ; 
       number_lots = 0 ;
       number_products = 0 ; 
   }

    //______________________FARMER FARMER FARMER FARMER FARMER FARMER  FARMER FARMER FARMER  ____________________________________________
   //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
   function  Getnumber_crops() public view returns (uint ){
       return number_crops  ;
   }

    function  Get_list() public view returns (farmer_crop[] memory){
       return all_Farmers_crops ;
   }
    function  farmer_exist(address farmer_address ) public view returns (bool){
        for (uint i=0; i<all_Farmers_crops.length; i++) {
        if (all_Farmers_crops[uint(i)].fid == farmer_address ) {
            return true  ;
        }
   }
        return false ;
   }
   //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    //add a new crop
    function  Get_crop_farmer_by_key(address farmer_address) public view returns (bool exist , farmer_crop memory ){
       for (uint i=0; i<all_Farmers_crops.length; i++) {
        if (all_Farmers_crops[uint(i)].fid == farmer_address ) {
            return (true , all_Farmers_crops[uint(i)] ) ;
        }
    }
        return (false , all_Farmers_crops[0] );
   }

    function AddNewCrop(
        address fid,
        string memory farmer_name,
        string memory location,
        string memory crop_type,
        uint   phone_number,
        uint   quantity,
        uint   unit_price
        ) public {
            //must add a condition

            if ( farmer_exist(fid) == false)
            {
            farmer_crop memory new_farmer_crop =farmer_crop( fid,   //msg.value
                                                                farmer_name,
                                                                location,
                                                                crop_type,
                                                                phone_number,
                                                                quantity,
                                                                unit_price,
                                                                unit_price * quantity ); 

            all_Farmers_crops.push(new_farmer_crop); 
            number_crops= number_crops + 1 ; 
            }
    }







    //______________________Lot Lot Lot Lot Lot Lot Lot Lot Lot Lot Lot Lot Lot Lot Lot ____________________________________________

    function AddNewLot(
        address fid, 
        address tester_id,
        uint    grade,
        string  memory test_date,
        string  memory exp_date      
        ) public {
            lot memory new_lot =lot( fid,
                                     tester_id,
                                     number_lots,
                                     grade,
                                     test_date,
                                     exp_date
                                ); 

            all_lots.push(new_lot); 
            number_lots+=1 ; 
    }

    function  Getnumber_lots() public view returns (uint ){
       return number_lots  ;
   }


    //_________________________ SUPPLIER SUPPLIER SUPPLIER SUPPLIER SUPPLIER SUPPLIER _____________________
    function AddNewSupplier(
        address suppid,
        uint lot_id, 
        uint selling_price     
        ) public {
            supplier memory new_supp =supplier( suppid,
                                                number_products,
                                                number_products,
                                                selling_price
                                ); 

            all_product_supplier.push(new_supp); 
            number_products+=1 ; 
    }
    function  Getnumber_product() public view returns (uint ){
       return number_products  ;
   }




 




}