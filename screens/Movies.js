import {
  ActivityIndicator,
  RefreshControl,
  FlatList,
  View,
  Text,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions } from "react-native";
import Slide from "../components/Slides";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { useQuery, useQueryClient } from "react-query";
import { moviesAPI } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import {useState} from "react";

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
`;

const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
  } = useQuery(["movies", "nowPlaying"], moviesAPI.nowPlaying);
  const {
    isLoading: upComingLoading,
    data: upComingData,
  } = useQuery(["movies", "upComing"], moviesAPI.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
  } = useQuery(["movies", "trending"], moviesAPI.trending);
  // react-query를 사용하면 queryKey를 통해 caching 되어 다른 탭으로 나갔다 와도 다시 fetch를 하지 않는다

  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      votes={item.vote_average}
    />
  );

  const renderHMedia = ({ item }) => (
    <HMedia
      id={item.id}
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      releaseDate={item.release_date}
      overview={item.overview}
      vote={item.vote_average}
    />
  );

  const MovieKeyExtractor = (item) => item.id + "";
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  const loading = nowPlayingLoading || upComingLoading || trendingLoading;

  return loading ? (
    <Loader />
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={2}
            controlsEnabled={false}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 30,
            }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <HList title="Trending Movies" data={trendingData.results} />
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
