import { useState, useEffect } from 'react';
import { API_URL } from '../../api';
import { Flex, Spin } from 'antd';

import CharacterList from '../../components/characterList/CharacterList.js';


const Homepage = () => {
    const [characters, setCharacters] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCharacters = async () => {
        setLoading(true);
        await fetch(API_URL + '/character/?page=')
            .then(response => response.json())
            .then(result => {
                setCharacters(result.results)
                setLoading(false)
            });
    }

    useEffect(() => {
        fetchCharacters();
    }, [])

    const characterList = !loading ? (
        <CharacterList characters={characters} />
    ) : (
        <Flex gap="small" vertical>
            <Flex gap="small">
                <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin>
            </Flex>

        </Flex>
    )

    return (
        <div>
            <h1>Characters</h1>
            {characterList}
        </div>
    )
}

export default Homepage;