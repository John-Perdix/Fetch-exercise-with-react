import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, Skeleton } from 'antd';

import Loading from '../loading/Loading';
import FilterOptions from '../filterOptions/FilterOptions';


const { Meta } = Card;



const CharacterDetail = ({ character }) => {

    const dateObject = new Date(character.created);

    // Format the date using toLocaleString
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short',
    };
    const formattedDate = dateObject.toLocaleString('en-US', options);
    
    

    //fetching episodes
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEpisodes = async () => {
        setLoading(true);

        try {
            const episodePromises = character.episode.map(async (episodeLink) => {
                const response = await fetch(episodeLink);
                const result = await response.json();
                return result;
            });

            const episodes = await Promise.all(episodePromises);

            setEpisodes(episodes);
            setLoading(false);
            console.log(episodes);
        } catch (error) {
            console.error('Error fetching episodes:', error);
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchEpisodes();
    }, [])

    const characterDetails = !loading ? (
        <div>
        <div>
        <FilterOptions/>
        </div>
        <div
            id="scrollableDiv"
            style={{
                height: 400,
                width: 1200,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >

            
            <InfiniteScroll
                dataLength={episodes.length}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={episodes}
                    renderItem={(ep) => (
                        <List.Item key={ep.id}>
                            <List.Item.Meta
                                title={<a href={ep.url}>{ep.episode} - {ep.name}</a>}
                                description={ep.name}
                            />
                            <div>{ep.air_date}</div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
        </div>
    ) : (
        <Loading />
    )



    /* const characterDetails = !loading ? (
        <div>
      {!loading && episodes.length === 0 && <p>This character does not appear in any episode</p>}
      {!loading && episodes.length > 0 && ( 
        <ul>
          {episodes.map((episode) => (
            <li key={episode.id}>
              {episode.name}
            </li>
          ))}
        </ul>
      )}
    </div>
    ) : (
        <Loading/>
    ) */


    return (
        <div className=''>
            <div><h2>Character Details</h2></div>
            <div className='flex'>
                <Card
                    key={character.id}
                    hoverable
                    style={{ width: 240, margin: '16px' }}
                    cover={<img src={character.image} alt={character.name} />}
                >
                    <Meta title={character.name} />
                    {character.status === 'Alive' ? (
                        <Tag color="#5CAD4A">{character.status}</Tag>
                    ) : character.status === 'Dead' ? (
                        <Tag color="#e89ac7">{character.status}</Tag>
                    ) : character.status === 'unknown' ? (
                        <Tag color="#f0e14a">Unknown</Tag>
                    ) : (
                        null
                    )}

                    <p>{character.episode.length} episodes</p>
                </Card>
                <div>
                    <p><strong>Species: </strong>{character.species}</p>
                    <p><strong>Type: </strong>{character.type}</p>
                    <p><strong>Gender</strong>{character.gender}</p>

                    {character.origin.name && (
                        <p><strong>Origin: </strong>{character.origin.name}</p>
                    )}

                    {character.location.name && (
                        <p><strong>Location: </strong>{character.location.name}</p>
                    )}

                    <p><strong>Creation date: </strong>{formattedDate}</p>
                </div>
            </div>
            <div>
                <h2>Appeared in episodes</h2>
                {characterDetails}


            </div>


        </div>


    );
};

export default CharacterDetail;