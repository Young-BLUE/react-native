import styled from "styled-components/native";
import {useState} from "react";
import {useQuery} from "react-query";
import {moviesAPI, tvApi} from "../api";

const Container = styled.ScrollView`

`

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`

const Search = () => {
    const [query, setQuery] = useState("");
    const {isLoading: moviesLoading, data: moviesData, refetch: searchMovies} = useQuery(["searchMovies", query], moviesAPI.search, {
        enabled: false,
    });
    const {isLoading: tvLoading, data: tvData, refetch: searchTv} = useQuery(
        ["searchTv", query],
        tvApi.search, {
        enabled: false,
    });
    const onChangeText = (text) => {
        setQuery(text);
    }
    const onSubmit = () => {
        if (query === "") {
            return;
        }
        searchMovies();
        searchTv();
    }
    return (<Container>
        <SearchBar
            placeholder={"Search for Movie or TV Shows"}
            placeholderTextColor={"grey"}
            returnKeyType={"search"}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
        />
    </Container>);
};

export default Search;
