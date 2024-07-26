import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { getLatestMovies } from '../lib/metacritic';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedGameCard } from './GameCard';
import { Logo } from './Logo'

export function Main() {

  const [games, setGames] = useState([])
  //const [page, setPage] = useState(1)
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchNextPage()
  }, [])

  const fetchNextPage = () => {
    getLatestMovies().then((results) => {
        //setPage((page) => page + 1)
        setGames((current) => {
            return [...current, ...results];
        });
    })
  }

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={{ marginBottom: 20 }}>
        <Logo />
      </View>
      {games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard movie={item} index={index}/>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({

});
