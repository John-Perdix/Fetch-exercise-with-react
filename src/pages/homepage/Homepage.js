import { useState, useEffect } from 'react';
import { API_URL } from '../../api';
import { Pagination } from 'antd';

import CharacterList from '../../components/characterList/CharacterList.js';
import Loading from '../../components/loading/Loading.js';
import FilterOptions from '../../components/filterOptions/FilterOptions.js';


const Homepage = () => {
    const [characters, setCharacters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pageNum, setPageNum] = useState(null);
    const [itemNum, setitemNum] = useState(null);

    const [current, setCurrent] = useState(1);
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };

    const [query, setQuery] = useState('');


    const fetchCharacters = async () => {

        setLoading(true);
        await fetch(API_URL + '/character') // Fetch the first page to get the total number of pages
            .then(response => response.json())
            .then(result => {
                setPageNum(result.info.pages); // Set pageNum based on the fetched result
                setitemNum(result.info.count);
            });

        await fetch(API_URL + '/character/?page=' + current)
            .then(response => response.json())
            .then(result => {
                setCharacters(result.results)
                setLoading(false)
            });
    };

    const fetchInput = async () => {
        setLoading(true);

            await fetch(API_URL + '/character/' + '?name='+ query)
                .then(response => response.json())
                .then(result => {
                    setCharacters(result.results)
                    setLoading(false)
                    console.log(result.results)
                });
        }

        const fetchStatus = async (valueStatus) => {
            console.log('Called fetchStatus()')
            setLoading(true);
    
                await fetch(API_URL + '/character/' + '?status='+ valueStatus)
                    .then(response => response.json())
                    .then(result => {
                        setCharacters(result.results)
                        setLoading(false)
                        console.log(result.results)
                    });
            }

            const fetchGender = async (valueGender) => {
                console.log('Called fetchGender()')
                setLoading(true);
        
                    await fetch(API_URL + '/character/' + '?gender='+ valueGender.target.value)
                        .then(response => response.json())
                        .then(result => {
                            setCharacters(result.results)
                            setLoading(false)
                            console.log(result.results)
                        });

                        console.log(valueGender)
                }

    const handleInputChange = (value) => {
        setQuery(value);
    };

    useEffect(() => {
        if(query!==''){
            fetchInput();
            console.log('called fetchInput()')
        }else{
            fetchCharacters();
        console.log('called fetchCaracters()')
        }
        
    }, [current, query])

    console.log('Total pages:', pageNum);

    const characterList = !loading ? (
        <div>
        <FilterOptions onSearch={handleInputChange} fetchCharacters={fetchCharacters} fetchStatus={fetchStatus} fetchGender={fetchGender}/>
        <CharacterList characters={characters} />
        </div>
    ) : (
        <div className='padding-2 margin-auto'> 
        <Loading/>
        </div>
    )

    return (
        <div>
            <h1>Characters</h1>
            {characterList}

            <Pagination
            current={current} onChange={onChange}
                total={itemNum}
                showQuickJumper
                pageSize={20}
                showSizeChanger={false}
                showTotal={(total) => `Total ${total} items`}
            />
        </div>
    )
}

export default Homepage;