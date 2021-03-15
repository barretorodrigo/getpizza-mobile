import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { Linha } from '../../components/Linha';
import { Header } from 'react-native-elements';
import styles from './styles';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';


const App = () => {

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  

  const loadingData = async () => {
    if (token !== '') {
      try {
        const response = await api.get('/products', {
          headers: { 'x-access-token': token }
        });
        setDados(response['data']);
        setLoading(false);
      } catch (error) {
        //toast
        console.log(error);
      }
    }
  }

  const Spinner = () => {
    return (loading ? <ActivityIndicator size="large" color="#00000ff" /> : null);
  }

  const logoff = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.goBack();
    } catch (error) {

    }
  }

  const getData = async () => {
    try {
      setToken(await AsyncStorage.getItem('token'));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
    loadingData();
  }, [token, isFocused]);

  return (
    <View style={styles.conteudo}>
      <Header>
        <View />
        <Text>Cardápio</Text>
        <Icon
          name='power-settings-new'
          color="#fff"
          size={24}
          onPress={logoff}
        />
      </Header>
      <View>
        <Spinner />
      </View>
      <FlatList
        data={dados}
        renderItem={({ item }) => <Linha item={item} />}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
}



export default App;