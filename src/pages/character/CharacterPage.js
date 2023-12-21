import { useState, useEffect } from 'react';
import { API_URL } from '../../api';
import { useParams } from 'react-router-dom';

//import Components
import CharacterDetail from '../../components/characterDetail/CharacterDetail';
import Loading from '../../components/loading/Loading.js';


const CharacterPage = () => {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const { characterId } = useParams();



    const fetchCharacter = async () => {
        setLoading(true);
            await fetch(API_URL + '/character/' + characterId)
                .then(response => response.json())
                .then(result => {
                    setCharacter(result)
                    setLoading(false)
                    console.log(result)
                });
    }


    useEffect(() => {
        fetchCharacter();
    }, [characterId])

    const characterDetail = !loading ? (
        <CharacterDetail character={character} />
    ) : (
        <Loading />
    )

    return characterDetail;
}

export default CharacterPage;