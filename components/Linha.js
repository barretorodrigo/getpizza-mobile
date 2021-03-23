import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

const Linha = ({ item }) => {
    const auth = useAuth();
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate('Detalhes', item) }}
            onLongPress={() => auth.type == 'admin' ? navigation.navigate('Edit', item) : null}
        >
            <View style={estilo.conteudo}>
                <Image
                    style={estilo.imagem}
                    source={{ uri: item.image }}
                />
                <View>
                    <Text style={estilo.titulo} >{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text style={estilo.preco}>R$ {item.price}</Text>
                    <Rating
                        type='custom'
                        startingValue={item.rating}
                        readonly
                        style={estilo.rating}
                        imageSize={20}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const estilo = StyleSheet.create({
    titulo: {
        fontSize: 25,
    },
    preco: {
        fontSize: 20,
        color: 'red',
    },
    conteudo: {
        marginBottom: 120,
        flexDirection: 'row',
    },
    imagem: {
        height: 80,
        width: 80,
    },
    rating: {
        width: 120,
    }
})

export { Linha };