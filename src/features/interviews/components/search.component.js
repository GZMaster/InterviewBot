import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

const SearchContainer = styled.View.attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = () => {
  const { keyword, search } = useContext();
  const { searchKeyword, setSearchKeyword } = useContext(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        // icon={isFavouritesToggled ? "heart" : "heart-outline"}
        // onIconPress={onFavouritesToggle}
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />{" "}
    </SearchContainer>
  );
};
