import { useState, useEffect } from 'react';
import { API_URL } from '../../api.js';

//import Components
import LocationList from '../../components/locationList/LocationList.js';
import Loading from '../../components/loading/Loading.js';


const EpisodesPage = () => {
    const [locations, setlocations] = useState(null);
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


    const fetchLocations = async () => {
        let allLocations = [];
        let currentPage = 1;
        setLoading(true);

        while (currentPage <= totalPages) {
            await fetch(`${API_URL}/location/?page=${currentPage}`)
                .then(response => response.json())
                .then(result => {
                    allLocations = allLocations.concat(result.results);
                    currentPage += 1;
                    setlocations(allLocations)
                    setLoading(false)
                    console.log(allLocations)
                });
        }
    }

    useEffect(() => {
        fetchTotalPages().then(fetchLocations())

    }, [totalPages])

    const characterDetail = !loading ? (
        <LocationList locations={locations} />
    ) : (
        <Loading />
    )

    return characterDetail;
}

export default EpisodesPage;