import { FC, useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  useWindowDimensions,
  SectionList,
} from "react-native";
import pokemonList from "../data.json";
import groupedData from "../grouped-data.json";
const App: FC = () => {
  const [numCols, setNumCols] = useState<number>(1);
  const { styles, windowWidth } = useStyle();

  useEffect(() => {
    windowWidth > 500 ? setNumCols(3) : setNumCols(1);
  }, [windowWidth]);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <FlatList
        key={numCols.toString()}
        numColumns={numCols}
        style={{
          height: "100%",
          borderWidth: 2,
          borderColor: "blue",
        }}
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100%",
              borderWidth: 2,
              borderColor: "red",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                textAlign: "center",
              }}
            >
              No data found
            </Text>
          </View>
        }
        data={pokemonList}
        renderItem={({ item }) => {
          return (
            <View key={item.id} style={styles.cardExterior}>
              <View key={item.id} style={[styles.card]}>
                <Text style={[styles.cardText]}>{item.type}</Text>
                <Text style={[styles.cardText]}>{item.name}</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const useStyle = () => {
  const windowWidth = useWindowDimensions().width;

  const styles = StyleSheet.create({
    card: {
      borderRadius: 8,
      borderWidth: 1,
      padding: 5,
    },
    cardText: {
      textAlign: "center",
      fontSize: 30,
      flex: 1,
      flexWrap: "wrap",
    },
    cardExterior: {
      minWidth: windowWidth > 500 ? "33%" : "100%",
      padding: 5,
    },
    sectionHeaderView: {
      padding: 20,
    },
    sectionHeaderText: {
      fontSize: 28,
      fontWeight: "bold",
    },
  });

  return { styles, windowWidth };
};

export default App;
