import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { Linha } from '../../components/Linha';
import { Header } from 'react-native-elements';
import styles from './styles';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import { Menu, Divider, Provider } from 'react-native-paper';


const App = () => {

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const auth = useAuth(); // auth = {type:'admin' , token:'1a1s22c5fd1a5d1'}


  const loadingData = async () => {
    if (auth?.token !== '') {
      try {
        const response = await api.get('/products', {
          headers: { 'x-access-token': auth?.token }
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
      await AsyncStorage.removeItem('auth');
      navigation.goBack();
    } catch (error) {

    }
  }

  useEffect(() => {
    loadingData();
  }, [auth, isFocused]);

  return (
    <Provider>
      <View style={styles.conteudo}>
        <Header>
          <View />
          <Text>Cardápio</Text>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <Icon name='more-vert' size={25} color='#fff'
                onPress={() => setVisible(true)}
              />
            }
          >
            <Menu.Item title='Sair' onPress={() => logoff()} />
            {auth?.type === 'admin' ?
              <Menu.Item title='Cadastrar Pizza' onPress={() => navigation.navigate('Edit')} /> :
              null}

          </Menu>
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
    </Provider>
  );
}



export default App;