import React from 'react';
import { Link } from "react-router-dom";
import { Card } from 'antd';
import { Tag } from 'antd';


const { Meta } = Card;


const CharacterList = ({ characters }) => {

	return (
		<div className='space-around flex wrap'>
			{characters && characters.length > 0 ? (
				Array.isArray(characters) ? (
					characters.map(character => (
						<Link key={character.id} to={`/characters/${character.id}`}>
							<Card
								key={character.id}
								hoverable
								style={{ width: 240, margin: '16px' }}
								cover={<img src={character.image} alt={character.name} />}
							>
								<Meta title={character.name} />
								{character.status === 'Alive' ? (
									<Tag className='margin-1' color="#5CAD4A">{character.status}</Tag>
								) : character.status === 'Dead' ? (
									<Tag className='margin-1' color="#fb6467ff">{character.status}</Tag>
								) : character.status === 'unknown' ? (
									<Tag className='margin-1' color="#f0e14a">Unknown</Tag>
								) : (
									null
								)}

								{/* <p>{character.episode.length} episodes</p> */}
								<p>{Array.isArray(character.episode) ? character.episode.length : 0} episodes</p>
							</Card>
						</Link>

					))) :
					<Link key={characters.id} to={`/characters/${characters.id}`}>
						<Card
							key={characters.id}
							hoverable
							style={{ width: 240, margin: '16px' }}
							cover={<img src={characters.image} alt={characters.name} />}
						>
							<Meta title={characters.name} />
							{characters.status === 'Alive' ? (
								<Tag color="#5CAD4A">{characters.status}</Tag>
							) : characters.status === 'Dead' ? (
								<Tag color="#e89ac7">{characters.status}</Tag>
							) : characters.status === 'unknown' ? (
								<Tag color="#f0e14a">Unknown</Tag>
							) : (
								null
							)}
							<p>{Array.isArray(characters.episode) ? characters.episode.length : 0} episodes</p>
						</Card>
					</Link>
			) : (
				<h2>There is no characters</h2>
			)}
		</div>

	);
};

export default CharacterList;