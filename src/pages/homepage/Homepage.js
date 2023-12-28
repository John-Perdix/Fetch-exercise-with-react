import { useState, useEffect } from 'react';
import { API_URL } from '../../api';
import { Pagination } from 'antd';

import CharacterList from '../../components/characterList/CharacterList.js';
import Loading from '../../components/loading/Loading.js';
import FilterOptions from '../../components/filterOptions/FilterOptions.js';
import SortCharacters from '../../components/sortCharacters/SortCharacters.js'


const Homepage = () => {
    const [characters, setCharacters] = useState(null);//define the characters inicially to null until the fetching
    const [loading, setLoading] = useState(true);//define the loading inicially to true
    const [pageNum, setPageNum] = useState(null);//define the pages inicially to null until the fetching
    const [itemNum, setitemNum] = useState(null);//define the number of items in the pages inicially to null until the fetching
    const [sortOrder, setSortOrder] = useState('asc');

    const [current, setCurrent] = useState(1);//define the pages in the api
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };

    const [query, setQuery] = useState('');


    //fetch for clear filters button
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

    //fetch for the text input
    const fetchInput = async () => {
        setLoading(true);

        await fetch(API_URL + '/character/' + '?name=' + query)
            .then(response => response.json())
            .then(result => {
                setCharacters(result.results)
                setLoading(false)
                console.log(result.results)
            });
    }

    //fetch for the status dropdown input
    const fetchStatus = async (valueStatus) => {
        console.log('Called fetchStatus()')
        setLoading(true);

        await fetch(API_URL + '/character/' + '?status=' + valueStatus)
            .then(response => response.json())
            .then(result => {
                setCharacters(result.results)
                setLoading(false)
                console.log(result.results)
            });

            
    }

    //fetching for the gender radio input
    const fetchGender = async (valueGender) => {
        console.log('Called fetchGender()')
        setLoading(true);

        await fetch(API_URL + '/character/' + '?gender=' + valueGender.target.value)
            .then(response => response.json())
            .then(result => {
                setCharacters(result.results)
                setLoading(false)
                console.log(result.results)
            });

        console.log(valueGender)
    }

    const fetchSorting = async () => {

        await fetch(API_URL + '/character/')
            .then(response => response.json())
            .then(data => {
                // Extracting number of episodes for each character
                const charactersWithEpisodes = data.results.map(character => ({
                    ...character,
                    episodeCount: character.episode.length,
                }));

                setCharacters(charactersWithEpisodes);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    //sorting the data acording to the number of episodes
    const handleSorting = async () => {
        // Wait for fetchSorting to complete
        //fetchSorting gives the number of episodes each character has
        await fetchSorting();
    
        const charactersWithEpisodes = characters.map(character => ({
            ...character,
            episodeCount: character.episode.length,
        }));
    
        const sortedCharacters = [...charactersWithEpisodes];
    
        if (sortOrder === 'asc') {
            sortedCharacters.sort((a, b) => a.episodeCount - b.episodeCount);
            setSortOrder('dec');
        } else {
            sortedCharacters.sort((a, b) => b.episodeCount - a.episodeCount);
            setSortOrder('asc');
        }
    
        setCharacters(sortedCharacters);
    };

    
    //defining the variable query for the fetch
    const handleInputChange = (value) => {
        setQuery(value);
    };

    useEffect(() => {
        //if the query is empty call fetchcaracters, if the user types in the input call the fetchInput
        if (query !== '') {
            fetchInput();
            console.log('called fetchInput()')
        } else {
            fetchCharacters();
            console.log('called fetchCaracters()')
        }

    }, [current, query])

    console.log('Total pages:', pageNum);

    const characterList = !loading ? (
        <div>
            <FilterOptions onSearch={handleInputChange} fetchCharacters={fetchCharacters} fetchStatus={fetchStatus} fetchGender={fetchGender} />
            <SortCharacters  onChange={handleSorting} fetchCharacters={fetchCharacters}  />
            <CharacterList characters={characters} />
        </div>
    ) : (
        <div className='padding-2 margin-auto'>
            <Loading />
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