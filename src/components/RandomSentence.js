import React, {useEffect, useState} from 'react';
import '../utilities.css'
import useQuery from "../hooks/useQuery";
import useScan from "../hooks/useScan";
import useWordDropdown from "../hooks/useWordDropdown";
import WordFamilyDropdown from "./WordFamilyDropdown";

const RandomSentence = () => {
    const {query} = useQuery();
    const {getAllKeys} = useScan();
    const {wordFamilies,setWordFamilies,selectedWord,handleDropDown} = useWordDropdown()

    const [randomSentence,setRandomSentence] = useState('Select a word.');
    const [randomCache,setRandomCache] = useState([])

    const getWordFamilies = async () => {
        setWordFamilies(await getAllKeys())
    }

    const contains = word => {
        return randomCache.filter(rc=> rc.wordFamily === word).length > 0
    }

    const getRandomSentence = async () => {
        // bootleg cache
        if (!contains(selectedWord)) {
            const {Items,Count} = await query(selectedWord);
            setRandomCache([...randomCache,{wordFamily:selectedWord,Items,Count}])
            setRandomSentence( Items[Math.floor(Math.random() * Count)]['sentence']['S']);
        } else {
            const {Items,Count} = randomCache.filter(rc=> rc.wordFamily === selectedWord)[0]
            setRandomSentence( Items[Math.floor(Math.random() * Count)]['sentence']['S']);
        }
    }

    useEffect(() => {
        getWordFamilies().then()
    }, []);

    return (
        <>
            {
                wordFamilies.length > 0  ?
                    <>
                        <div className={'random-sentence-container'}>
                            <h1>{randomSentence}</h1>
                        </div>
                        <div className={'random-sentence-mid'}>
                            <WordFamilyDropdown handleDropDown={handleDropDown} wordFamilies={wordFamilies}/>
                            <button className={'btn-primary'} disabled={selectedWord === ''} onClick={getRandomSentence}>
                                Random
                            </button>
                        </div>
                        <div className={'random-sentence-footer'}>
                            <p>
                                Sentences from <a href={"http://www.manythings.org/sentences/words/"}>ManyThings.org</a>
                            </p>
                        </div>
                    </> :
                    <div>Loading...</div>
            }
        </>
    );
};

export default RandomSentence;
