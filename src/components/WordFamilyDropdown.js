import React, {useEffect, useState} from 'react';
import useScan from "../hooks/useScan";
import useWordDropdown from "../hooks/useWordDropdown";

const WordFamilyDropdown = ({handleDropDown,wordFamilies}) => {

    return (
        <select onChange={handleDropDown}>
            <option value="">Select Word</option>
            {
                wordFamilies.map(wf => (
                    <option key={wf} value={wf}>{wf}</option>
                ))
            }
        </select>
    );
};

export default WordFamilyDropdown;
