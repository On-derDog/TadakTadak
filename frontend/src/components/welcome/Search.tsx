import { useState } from 'react';

import styled from '@emotion/styled';

import SearchSVG from '../../assets/Search.svg';

export const Search = () => {
  const [searchData, setSearchData] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    handleSearch();
  };

  const handleSearch = () => {
    console.log('검색:', searchData);
  };

  return (
    <SearchDiv>
      <img src={SearchSVG} alt='SearchSVG' onClick={handleClick} />
      <SearchInput
        type='text'
        placeholder='Search...'
        value={searchData}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </SearchDiv>
  );
};

const SearchDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 8px 16px;
  gap: 10px;
  background: var(--color-wildsand);
  border-radius: 10px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: none;
  font-size: var(--font-size-xs);
  line-height: 140%;
`;
