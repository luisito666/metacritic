import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated} from 'react-native';
import { Score } from './Score';

export function GameCard({ game }) {
    return (
        <View 
            className="flex-row bg-slate-500/10 p-4 rounded-xl mb-10"
            key={game.slug} 
            style={styles.card}>
            <Image
                source={{ uri: game.front_image }}
                style={styles.image} />
            <View className="ml-3">
                <Text className="mb-1" style={styles.title}>{game.name || game.title}</Text>
                <Score score={game.popularity} maxScore={1000} />
                <Text className="mt-2 flex-shrink" style={styles.description}>{game.description.slice(0, 105)}...</Text>
            </View>
        </View>
    )
}

export function AnimatedGameCard({movie, index}) {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            delay: index * 500,
            useNativeDriver: true
        }).start();
    }, [opacity, index])

    return (
        <Animated.View style={{ opacity }} >
            <GameCard  game={movie} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    card: {
      marginBottom: 42,
    },
    image: {
      width: 107,
      height: 147,
      borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        color: "#eee",
    },
    score: {
        fontSize: 20,
        fontWeight: "bold",
        color: "green",
        marginBottom: 10,
    },
});