import React from 'react';
import { View, Image } from 'react-native';
import { Header, Input, Button, Icon } from 'react-native-elements';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import { Formik } from 'formik';
import styles from '../Edit/styles';

const Edit = ({ route, navigation }) => {
    const initialValues = {
        name: route?.params == undefined ?'': route?.params?.name,
        description: route?.params == undefined ?'': route?.params?.description
  }

    const auth = useAuth();

    const saveProduct = async (values) => {
        try {
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
            await api.post(`/products/`, values, {
                headers: { 'x-access-token': auth?.token }
            });
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async()=>{
        try {
            await api.delete(`/products/${route.params.id}`,{
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
                        onPress={handleSubmit}
                    />
                    <Button 
                        title={"Deletar"}
                        onPress={deleteProduct}
                        style={{backgroundColor:'red'}}
                    />
                </View>
                )
                }
            </Formik>
        </View>
    )
}

export default Edit;