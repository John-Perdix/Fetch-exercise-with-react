import React from 'react';
import { Radio } from 'antd';
import { Button } from 'antd';

const SortCharacters = ({ fetchCharacters, onChange }) => {

  const handleClearFilters = () => {
    // Call the fetchCharacters function from homepage
    fetchCharacters();
  };


    const handleSorting = (valueSorting) =>{
      onChange(valueSorting);
    }

  return (
    <div className='flex flex-end'>

      <div className='padding-1'>
        <Radio.Group onChange={handleSorting} buttonStyle="solid" style={{ marginTop: 16 }}>
          <Radio.Button value="des">Most episodes</Radio.Button>
          <Radio.Button value="asc" >
            Least Episodes
          </Radio.Button>
        </Radio.Group>
      </div>

      <div className='padding-1'>
        <Button onClick={handleClearFilters}>Clear Sorting</Button>
      </div>
    </div>
  );
};

export default SortCharacters;