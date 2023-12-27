import React from 'react';
import {  Table } from 'antd';

const columns = [
	{
		title: 'name',
		dataIndex: 'name',
		key: 'name',
		
	},
	{
		title: 'Type',
		dataIndex: 'type',
		key: 'type',
	},
	{
		title: 'Dimension',
		dataIndex: 'dimension',
		key: 'dimension',
	},
    {
		title: 'Created',
		dataIndex: 'created',
		key: 'created',
	},
];


const LocationList= ({ locations }) => {

	return (
		<div>

			<h1>Locations</h1>
			
				<Table size='25' dataSource={locations} columns={columns} />
			
		</div>
	)
};

export default LocationList;