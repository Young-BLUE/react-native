import {react, useEffect} from 'react';
import {ActivityIndicator, RefreshControl, FlatList, View, Text} from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import {Dimensions} from 'react-native';
import {useState} from 'react';
import Slide from '../components/Slides';
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import {useQuery} from "react-query";
import {moviesAPI} from "../api";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 25px;
  margin-bottom: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const VSeparator = styled.View`
  width: 20px;
`

const HSeparator = styled.View`
  height: 20px;
`


const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Movies = () => {
    const [refreshing, setRefreshing] = useState(false);
    const {isLoading: nowPlayingLoading, data: nowPlayingData} = useQuery("nowPlaying", moviesAPI.nowPlaying);
    const {isLoading: upComingLoading, data: upComingData} = useQuery("upComing", moviesAPI.upcoming);
    const {isLoading: trendingLoading, data: trendingData} = useQuery("trending", moviesAPI.trending);

    const renderVMedia = ({item}) => (
        <VMedia
            poster_path={item.poster_path}
            original_title={item.original_title}
            votes={item.vote_average}
        />);

    const renderHMedia = ({item}) => (
        <HMedia
            id={item.id}
            poster_path={item.poster_path}
            original_title={item.original_title}
            release_date={item.release_date}
            overview={item.overview}
            vote={item.vote_average}
        />
    );

    const MovieKeyExtractor = (item) => item.id + ""
    const onRefresh = async () => {};
    const loading = nowPlayingLoading || upComingLoading || trendingLoading;

    return loading ? (
        <Loader>
            <ActivityIndicator size="large"/>
        </Loader>
    ) : (
        <FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={<>
                <Swiper
                    horizontal
                    loop
                    autoplay
                    autoplayTimeout={2}
                    controlsEnabled={false}
                    showsButtons={false}
                    showsPagination={false}
                    containerStyle={{
                        width: '100%',
                        height: SCREEN_HEIGHT / 4,
                        marginBottom: 30,
                    }}
                >
                    {nowPlayingData.results.map((movie) => (
                        <Slide
                            key={movie.id}
                            backdrop_path={movie.backdrop_path}
                            poster_path={movie.poster_path}
                            original_title={movie.original_title}
                            vote_average={movie.vote_average}
                            overview={movie.overview}
                        />
                    ))}
                </Swiper>
                <ListContainer>
                    <ListTitle>Trending Movies</ListTitle>
                    <FlatList
                        horizontal
                        keyExtractor={MovieKeyExtractor}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 25}}
                        ItemSeparatorComponent={VSeparator}
                        data={trendingData.results}
                        renderItem={renderVMedia}/>
                </ListContainer>
                <ComingSoonTitle>Coming Soon</ComingSoonTitle>
            </>
            }
            data={upComingData.results}
            keyExtractor={MovieKeyExtractor}
            ItemSeparatorComponent={HSeparator}
            renderItem={renderHMedia}
        />

    );
};

export default Movies;
