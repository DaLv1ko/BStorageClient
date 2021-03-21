
import React from 'react';

export const FormErrors = ({formErrors}) =>
    <div className="errors_div">
        {Object.keys(formErrors).map((fieldName, i) => {
            if(formErrors[fieldName].length > 0){
                return (
                    <div className="popup-box popup-box-butt">
                        <p className="error_form" key={i}> {formErrors[fieldName]}</p>
                    </div>

                )
            } else {
                return '';
            }
        })}
    </div>