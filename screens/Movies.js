import {react, useEffect} from 'react';
import {ActivityIndicator, RefreshControl, FlatList, View, Text} from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import {Dimensions} from 'react-native';
import {useState} from 'react';
import Slide from '../components/Slides';
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

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

const API_KEY = '4d3d9f4a798cd8aaa63dd9b8af42cb25';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Movies = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [trending, setTrending] = useState([]);
    const getTrending = async () => {
        const {results} = await (
            await fetch(
                `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
            )
        ).json();
        setTrending(results);
    };
    const getUpcoming = async () => {
        const {results} = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
            )
        ).json();
        setUpcoming(results);
    };
    const getNowPlaying = async () => {
        const {results} = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
            )
        ).json();
        setNowPlaying(results);
    };
    const getData = async () => {
        // wait for all of them
        await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
        setLoading(false);
    };
    useEffect(() => {
        getData();
    }, []);
    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    };
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
                    {nowPlaying.map((movie) => (
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
                        keyExtractor={(item) => item.id+""}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 25}}
                        ItemSeparatorComponent={() => <View style={{ width: 30}}></View>}
                        data={trending}
                        renderItem={({item}) =>
                            <VMedia
                                poster_path={item.poster_path}
                                original_title={item.original_title}
                                votes={item.vote_average}
                            />} />
                </ListContainer>
                <ComingSoonTitle>Coming Soon</ComingSoonTitle></>}
            data={upcoming}
            keyExtractor={(item) => item.id+""}
            ItemSeparatorComponent={() => <View style={{ height: 30}}></View>}
            renderItem={({item}) =>
                <HMedia
                    id={item.id}
                    poster_path={item.poster_path}
                    original_title={item.original_title}
                    release_date={item.release_date}
                    overview={item.overview}
                    vote={item.vote_average}
                />
            }
            />

    );
};

export default Movies;
