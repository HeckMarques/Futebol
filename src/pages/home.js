import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios'

const Home = (props) => {
    const { navigation } = props
    const token = "live_cff1de316dfea61c3257738cdfdd90"
    const [torneios, setTorneios] = useState([])
  
    const campeonatos = () => {
      axios.get("https://api.api-futebol.com.br/v1/campeonatos", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        setTorneios(response.data)
        console.log(response.data)
      })
        .catch(function (error) {
          console.log(error);
        });
    }
  
    useEffect(
      () => {
        campeonatos()
      }, []
    );
    
    return (
        <View style={styles.container}>
        <FlatList
          data={torneios}
          renderItem={
            ({ item }) =>
              <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Fases", { item })
                }}
              >
                <Text style={styles.item}>
                  {item.nome}
                </Text>
              </TouchableOpacity>
          }
          keyExtractor={(item) => item.campeonato_id}
        />
  
      </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 20,
    }, item: {
      borderWidth: 1,
      borderColor: "gray",
      width: "90%",
      marginLeft: "5%",
      marginTop: 5,
      padding: 3,
      textAlign: 'center'
    }, tinyLogo: {
      width: 100,
      height: 100,
      marginTop: 5,
      borderRadius: 200
    }
  });
  