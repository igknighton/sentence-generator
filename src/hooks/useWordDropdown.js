import React, {useEffect, useState} from 'react';
import useScan from "./useScan";

const useWordDropdown = () => {

    const [wordFamilies,setWordFamilies] = useState([]);
    const [selectedWord,setSelectedWord] = useState('');

    const {getAllKeys} = useScan();

    const getWordFamilies = async () => {
        setWordFamilies(await getAllKeys())
    }

    const handleDropDown = e => {
        setSelectedWord(e.target.value);
    }

    useEffect(() => {
        getWordFamilies().then()
    }, []);

    return {
        handleDropDown,selectedWord,wordFamilies,setWordFamilies
    };
};

export default useWordDropdown;
