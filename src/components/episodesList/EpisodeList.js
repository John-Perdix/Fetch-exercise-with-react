import React from 'react';
import FilterOptions from '../filterOptions/FilterOptions';
import {  Table } from 'antd';

const columns = [
	{
		title: 'Episode',
		dataIndex: 'episode',
		key: 'episode',
		sorter: (a, b) => a.episode.localeCompare(b.episode),
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Air Date',
		dataIndex: 'air_date',
		key: 'air_date',
	},
];

const EpisodeList = ({ episodes }) => {

	return (
		<div>

			<p>Isto são episodio malandro</p>
			<FilterOptions />
			
				<Table size='25' dataSource={episodes} columns={columns} />
			
		</div>
	)
};

export default EpisodeList;