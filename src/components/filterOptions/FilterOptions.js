/* import React from 'react';
import { Radio } from 'antd';
import { Input, Space } from 'antd';



const { Search } = Input;




const FilterOptions = ({ onSearch  }) => {


  return (
    <div className='flex flex-end'>
      <div className='padding-1'>
      <Space direction="vertical">
        <Search onChange={(e) => onSearch(e.target.value)}
        placeholder="Enter character name" style={{ width: 200 }} />
        </Space>
      </div>

      <div className='padding-1'>
        <Radio.Group defaultValue="c" buttonStyle="solid" style={{ marginTop: 16 }}>
          <Radio.Button value="a">Hangzhou</Radio.Button>
          <Radio.Button value="b" disabled>
            Shanghai
          </Radio.Button>
          <Radio.Button value="c">Beijing</Radio.Button>
          <Radio.Button value="d">Chengdu</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default FilterOptions; */

import React from 'react';
import { Radio, Select } from 'antd';
import { Input, Space } from 'antd';
import { Button } from 'antd';
import { useState, useEffect } from 'react';

const { Search } = Input;

const FilterOptions = ({ onSearch, fetchCharacters, fetchStatus, fetchGender }) => {
  const handleSubmit = (value) => {
    onSearch(value);
  };

  const handleClearFilters = () => {
    // Call the fetchCharacters function from the prop
    fetchCharacters();
  };


  const [labelStatus, setLabelStatus] = useState('All');


    const handleStatus = (valueStatus) => {
      console.log('Before fetchStatus - label:'+ labelStatus);
    fetchStatus(valueStatus);
    console.log('After fetchStatus - label:'+ labelStatus);
    console.log('valueStatus:', valueStatus);
    setLabelStatus(valueStatus);
    console.log('After setLabelStatus - label:'+ labelStatus);
    };

    const handleGender = (valueGender) =>{
      fetchGender(valueGender);
    }

/*   const handleStatus = async (valueStatus) => {
    console.log('Before fetchStatus - label:', labelStatus);

    try {
      await fetchStatus(valueStatus);
      setLabelStatus(valueStatus);
      console.log('After fetchStatus - label:', labelStatus);
      console.log('valueStatus:', valueStatus);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  }; */

  useEffect(() => {
  console.log('Label status updated:', labelStatus);
}, [labelStatus]);

console.log('Label status updated:', labelStatus);
  return (
    <div className='flex flex-end'>
      <div className='padding-1'>
        <Space direction="vertical">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e.target.elements.searchInput.value);
            }}
          >
            <Search
              id="searchInput"
              placeholder="Enter character name"
              style={{ width: 200 }}
            />
          </form>
        </Space>
      </div>

      <div className='padding-1'>
        <Select
          value={labelStatus}
          style={{ width: 120 }}
          onChange={handleStatus}
          options={[
            { value: 'alive', label: 'Alive' },
            { value: 'dead', label: 'Dead' },
            { value: 'unknown', label: 'Unknown' },
            { value: '', label: 'All' },
          ]}
        />
      </div>


      <div className='padding-1'>
        <Radio.Group onChange={handleGender} buttonStyle="solid" style={{ marginTop: 16 }}>
          <Radio.Button value="male">Male</Radio.Button>
          <Radio.Button value="female" >
            Female
          </Radio.Button>
          <Radio.Button value="genderless">Genderless</Radio.Button>
          <Radio.Button value="unknown">Unknown</Radio.Button>
        </Radio.Group>
      </div>

      <div className='padding-1'>
        <Button onClick={handleClearFilters}>Clear filters</Button>
      </div>
    </div>
  );
};

export default FilterOptions;