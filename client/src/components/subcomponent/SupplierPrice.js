import React from 'react' ;

const SupplierPrice = ({isShowForm}) => {
  console.log(isShowForm.isShowFrom)
  console.log(isShowForm.current_item)
  return(
    <div className={`${isShowForm.isShowFrom ? "active" : ""} show`}>
      <div className="quality-form"  style = {{minHeight : "10px"}} >
        <div className="form-box solid">
          <form onSubmit={ isShowForm.BuyProduct}>
            <h1 className="quality-text">Selling Price Item :  </h1>       
            <h3>{isShowForm.current_item}</h3>
            <input className="quality-box" type="text" name="price" placeholder="price"/>   
            <input className="quality-btn" type="submit" value="Submit"    />
          </form>
        </div>
      </div>
    </div>
  )
}

SupplierPrice.propTypes = {};

SupplierPrice.defaultProps = {};

export default SupplierPrice;
