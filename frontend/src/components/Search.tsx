import styled from '@emotion/styled';
import SearchSVG from "../assets/Search.svg"
import { useState } from "react"

export const Search = ()=>{
  const [searchData,setSearchData] = useState<string>("Search...")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(event.target.value);
  };

  return (
    <SearchDiv>
      <img src={SearchSVG} alt='SearchSVG' />
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchData}
        onChange={handleInputChange}
      />
    </SearchDiv>
  )
}


const SearchDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 8px 16px;
  gap: 10px;
  background: #F5F5F5;
  border-radius: 10px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: none;
  font-size: var(--font-size-xs);
  line-height: 140%;
`;