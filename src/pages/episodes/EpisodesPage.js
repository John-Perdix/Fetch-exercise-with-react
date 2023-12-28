import { useState, useEffect } from 'react';
import { API_URL } from '../../api.js';

//import Components
import EpisodeList from '../../components/episodesList/EpisodeList.js';
import Loading from '../../components/loading/Loading.js';


const EpisodesPage = () => {
    const [episodes, setEpisodes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);


    const fetchTotalPages = async () => {
        try {
            const response = await fetch(API_URL + '/episode');
            const result = await response.json();

            setTotalPages(result.info.pages);
        } catch (error) {
            console.error('Error fetching total pages:', error);
        }
    };


    const fetchEpisodes = async () => {
        let allEpisodes = [];
        let currentPage = 1;
        setLoading(true);

        while (currentPage <= totalPages) {
            await fetch(`${API_URL}/episode/?page=${currentPage}`)
                .then(response => response.json())
                .then(result => {
                    allEpisodes = allEpisodes.concat(result.results);
                    currentPage += 1;
                    setEpisodes(allEpisodes)
                    setLoading(false)
                    console.log(allEpisodes)
                });
        }
    }

    useEffect(() => {
        fetchTotalPages().then(fetchEpisodes())

    }, [totalPages])

    const characterDetail = !loading ? (
        <EpisodeList episodes={episodes} />
    ) : (
        <Loading />
    )

    return characterDetail;
}

export default EpisodesPage;