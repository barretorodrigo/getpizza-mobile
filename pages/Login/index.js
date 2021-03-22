import React, { useEffect, useState } from 'react';
import { View, Alert, ToastAndroid } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../../hooks/useAuth';

const Login = () => {

    const navigation = useNavigation();
    const authentication = useAuth();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const auth = async () => {
        try {
            const response = await api.post('/login', {
                userName: userName,
                password: password
            });
            setDataStorage('auth', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
            Alert.alert(
                "Erro ao autenticar",
                "Nome de usuário ou senha incorretos",
                [
                    { text: "OK", onPress: () => { } }
                ],
                { cancelable: false }
            );
        }
    }

    const setDataStorage = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            getDataStorage();
        } catch (error) {
            ToastAndroid.show("Erro ao salvar dados", ToastAndroid.SHORT);
        }
    }

    const getDataStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('auth');
            if (token !== null) {
                navigation.navigate('Home');
            }
        } catch (error) {
            ToastAndroid.show("Dados não encontrados", ToastAndroid.SHORT);
        }
    }

    useEffect(() => {
        //getDataStorage();
        if (authentication?.token != ''){
            navigation.navigate('Home');
        }
    }, []);

    return (
        <View style={styles.center}>
            <Input
                placeholder='Nome de usuário'
                leftIcon={
                    <Icon
                        name='user'
                        size={24}
                        color='#858585'
                    />
                }
                value={userName}
                onChange={(value) => setUserName(value.nativeEvent.text)}
            />
            <Input
                placeholder='Senha'
                leftIcon={
                    <Icon
                        name='lock'
                        size={24}
                        color='#858585'
                    />
                }
                secureTextEntry={true}
                value={password}
                onChange={(value) => setPassword(value.nativeEvent.text)}
            />
            <Button
                title='Entrar'
                icon={
                    <Icon
                        name='sign-in'
                        size={20}
                        color="#fff"
                    />
                }
                onPress={auth}
                disabled={userName === '' || password === ''}
            />
            <Button
                title='Criar conta'
                icon={
                    <Icon
                        name='user-plus'
                        size={20}
                        color="#fff"
                    />
                }
                onPress={()=>navigation.navigate('CreateUser')}
            />
        </View>
    );
}

export default Login;