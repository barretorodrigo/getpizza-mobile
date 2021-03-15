import React from 'react';
import { View, Text } from 'react-native';

//operador ternário -> condição ? valor_se_verdade : valor_se_falso

const Info = ({valor, estilo}) => {
    return(
        <View>
            <Text style={estilo}>Informações - {valor ? valor : 'Elis Regina'}</Text>
        </View>
    );
}

export default Info;
