import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Header, Input, Button, Icon } from 'react-native-elements';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../../hooks/useAuth';
import { Formik } from 'formik';
import styles from '../Edit/styles';

const Edit = ({ route, navigation }) => {
    const initialValues = {
        name: '',
        description: '',
    }

    const auth = useAuth();
    const [productName, setProductName] = useState(route?.params?.name);
    const [productDescription, setProductDescription] = useState(route?.params?.description);
    const [token, setToken] = useState();

    const saveProduct = async (values) => {
        try {

            // const body = {
            //     name: productName,
            //     description: productDescription
            // }
            await api.put(`/products/${route.params.id}`, values, {
                headers: { 'x-access-token': auth?.token }
            });
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    const createProduct = async (values) => {
        try {
            // const body = {
            //     name: productName,
            //     description: productDescription
            // }
            await api.post(`/products/`, values, {
                headers: { 'x-access-token': auth?.token }
            });
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    const sendInformation = (values)=>{
        return route.params == undefined ? createProduct(values) : saveProduct(values);
    }

    // const getToken = async () => {
    //     try {
    //         setToken(await AsyncStorage.getItem('token'));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(()=>{
    //     getToken();
    // },[auth])


    return (
        <View>
            <Header />
            <Formik
                initialValues={initialValues} onSubmit={(values) => sendInformation(values)}           
            >
                {({handleChange, handleSubmit, handleBlur, values})=>(
                <View>
                    {route.params == undefined ? null :
                    <Image
                        source={{
                            uri: route.params.image                        
                        }}
                        style={styles.img}
                    />
                    }
                    <Input
                        placeholder="Nome do produto"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        leftIcon={
                            <Icon 
                                type='font-awesome'
                                name='pencil'
                                size={18}
                                color='#888'
                            />
                        }
                        
                    />
                    <Input
                        placeholder="Descrição do produto"
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        leftIcon={
                            <Icon 
                                type='font-awesome'
                                name='comment'
                                size={18}
                                color='#888'
                            />
                        }
                        
                    />
                    <Button
                        title={route.params == undefined ? "Criar" : "Salvar"}
                        // onPress={route.params == undefined ? createProduct : saveProduct}
                        onPress={handleSubmit}
                    />
                </View>
                )
                }
            </Formik>
        </View>
    )
}

export default Edit;