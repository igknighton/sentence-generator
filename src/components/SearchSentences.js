import React, {useState} from 'react';
import Table from "./Table";
import styled from "styled-components";
import useQuery from "../hooks/useQuery";
import useWordDropdown from "../hooks/useWordDropdown";
import WordFamilyDropdown from "./WordFamilyDropdown";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid #7a7878;
    width: 700px;
    height: 500px;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    thead {
      color: #f4f4f4;
    }
    thead tr {}
    th {
      background-color: #7a7878;
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #7a7878;
      border-right: 1px solid #7a7878;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

const SearchSentences = () => {

    const {query} = useQuery();
    const {selectedWord,handleDropDown,wordFamilies} = useWordDropdown();
    const getItems = async () => {
        try {
            const {Items} = await query(selectedWord);
            const items = Items.map(item => {
                    return {
                        id: item['id']['S'],
                        wordFamily: item['wordFamily']['S'],
                        sentence: item['sentence']['S']
                    }
                }
            )
            setData(items);
        } catch (e) {
            console.error(e);
        }
    }
    const columns = React.useMemo(
        () => [
                    {
                        Header: 'Word',
                        accessor: 'wordFamily',
                    },
                    {
                        Header: 'Sentence',
                        accessor: 'sentence'
                    }
        ],
        []
    )

    const [data,setData] = useState([]);
    return (
        <>
            <WordFamilyDropdown wordFamilies={wordFamilies} handleDropDown={handleDropDown}/>
            <button disabled={selectedWord === ''} onClick={getItems}>
                search
            </button>
                <Styles>
                    <Table columns={columns} data={data}/>
                </Styles>
        </>

    )
};

export default SearchSentences;
