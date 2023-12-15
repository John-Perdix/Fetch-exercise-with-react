import { Link } from 'react-router-dom';
import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const CharacterList = ({ characters }) => {
	return (
	  <div class='flex wrap'>
		{characters.map(character => (
		  <Card
			key={character.id}
			hoverable
			style={{ width: 240, margin: '16px' }}
			cover={<img src={character.image} alt={character.name} />}
		  >
			<Meta title={character.name} description="www.instagram.com" />
		  </Card>
		))}
	  </div>
	);
  };

export default CharacterList;