import { Link } from 'react-router-dom';
import React from 'react';
import { Card } from 'antd';
import { Tag } from 'antd';

const { Meta } = Card;


const CharacterList = ({ characters }) => {

	return (
		<div className='space-around flex wrap'>
			{characters.map(character => (
				<Card
					key={character.id}
					hoverable
					style={{ width: 240, margin: '16px' }}
					cover={<img src={character.image} alt={character.name} />}
				>
					<Meta title={character.name}/>
					{character.status === 'Alive' ? (
						<Tag color="#5CAD4A">{character.status}</Tag>
					) : character.status === 'Dead' ? (
						<Tag color="#e89ac7">{character.status}</Tag>
					): character.status === 'unknown' ?(
							<Tag color="#f0e14a">Unknown</Tag>
					) : (
						null
					)}
				</Card>
			))}
		</div>
	);
};

export default CharacterList;