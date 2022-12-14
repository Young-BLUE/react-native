import {useState} from "react";
import {RefreshControl, ScrollView} from "react-native";
import {useQuery, useQueryClient} from "react-query";
import {tvAPI} from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false)
    const {
        isLoading: todayLoading,
        data: todayData,
    } = useQuery(["tv", "today"], tvAPI.airingToday);
    const {
        isLoading: topLoading,
        data: topData,
    } = useQuery(["tv", "top"], tvAPI.topRated);
    const {
        isLoading: trendingLoading,
        data: trendingData,
    } = useQuery(["tv", "trending"], tvAPI.trending);

    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(["tv"]);
        setRefreshing(false);
    };
    const loading = todayLoading || topLoading || trendingLoading;

    return loading ? (
        <Loader/>
    ) : (
        <ScrollView
            contentContainerStyle={{paddingVertical: 30}}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
        >
            {trendingData ?
            <HList title="Trending TV" data={trendingData.results}/> : null }
            {todayData ?
            <HList title="Airing Today" data={todayData.results}/> : null }
            {topData ?
            <HList title="Top Rated TV" data={topData.results}/> : null }
        </ScrollView>
    );
};

export default Tv;
