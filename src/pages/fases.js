import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios'

const fases = (props) => {
    const { navigation } = props
    const { route } = props
    const data = route.params
    console.log(data)
    const [faseslist, setFaseslist] = useState([])
    const [ntem, setNtem] = useState('')

    const token = "live_cff1de316dfea61c3257738cdfdd90"

    const getfases = () => {
        axios.get(`https://api.api-futebol.com.br/v1/campeonatos/${data.item.campeonato_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.data.fases.length > 0) {
                setFaseslist(response.data.fases)
            } else {
                setNtem('Este campeonato não tem fases')
            }

            console.log(response.data.fases)
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(
        () => {
            getfases()
        }, []
    );

    return (
        <View style={styles.container}>
            <Text>
                {ntem}
            </Text>
            <FlatList
                data={faseslist}
                renderItem={
                    ({ item }) =>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Detalhes", { item })
                            }}
                        >
                            <Text style={styles.item}>
                                {item.nome}
                            </Text>
                        </TouchableOpacity>
                }
                keyExtractor={(item) => item.nome}
            />

        </View>
    )
}

export default fases;

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