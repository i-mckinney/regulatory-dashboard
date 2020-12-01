import React, {useState} from 'react';
import Select from 'react-select';

const SelectDropdown = ({text, options}) => {
    return (
     <>
     <p> {text}</p>
     <Select options={options}/>
     </>
    )
}

export default SelectDropdown