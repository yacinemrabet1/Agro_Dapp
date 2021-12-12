import React from 'react' ;

const QualityForm = ({isShowForm}) => {
  console.log(isShowForm.isShowFrom)
  console.log(isShowForm.current_item)
  return(
    <div className={`${isShowForm.isShowFrom ? "active" : ""} show`}>
      <div className="quality-form"  style = {{minHeight : "10px"}} >
        <div className="form-box solid">
          <form onSubmit={ isShowForm.UpdateLot}>
            <h1 className="quality-text">Quality Informations Item :  </h1>       
            <h3>{isShowForm.current_item}</h3>
            <input className="quality-box" type="text" name="grade" placeholder="Grade"/>   
            <input className="quality-box" type="text" name="t_date" placeholder="testing date DD/MM/YYYY"/>       
            <input className="quality-box" type="text" name ="e_date" placeholder="Expiration date DD/MM/YYYY"/>     
            <input className="quality-btn" type="submit" value="Submit"    />
          </form>
        </div>
      </div>
    </div>
  )
}

QualityForm.propTypes = {};

QualityForm.defaultProps = {};

export default QualityForm;
