import styled from "styled-components/native";
import {useState} from "react";

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
    const onChangeText = (text) => {
        setQuery(text);
    }
    return (
        <Container>
            <SearchBar
                placeholder={"Search for Movie or TV Shows"}
                placeholderTextColor={"grey"}
                returnKeyType={"search"}
                onChangeText={onChangeText}/>
        </Container>
    );
};

export default Search;
