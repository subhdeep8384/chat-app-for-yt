import React from 'react'

const GenderCheckBox = ({onCheckboxChange , selectedGender}) => {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer ${selectedGender === 'male' ? 'select-bordered' : ''}`}>
                    <span className='label-text'>Male</span>
                    <input type='radio' name='gender' className='checkbox border-s-slate-500'
                    checked={selectedGender === 'male'}
                    onChange={()=> onCheckboxChange("male")}
                    />
                </label>
            </div>

            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer ${selectedGender === 'female' ? 'select-bordered' : ''}`}>
                    <span className='label-text'>Female</span>
                    <input type='radio' name='gender' className='checkbox border-s-slate-500'
                    checked={selectedGender === 'female'}
                    onChange={()=> onCheckboxChange("female")}
                    />
                </label>
            </div>
        </div>
    );
};


export default GenderCheckBox
