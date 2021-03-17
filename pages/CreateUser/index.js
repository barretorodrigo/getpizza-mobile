import React from 'react';
import { View, Alert } from 'react-native';
import { Formik } from 'formik';
import { Input, Button } from 'react-native-elements';
import styles from './styles';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

const CreateUserSchema = Yup.object().shape({
    userName: Yup.string().required('Esse campo é obrigatório'),
    email: Yup.string().email('Deve ser um email válido').required('Esse campo é obrigatório'),
    password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Esse campo é obrigatório')
});

const CreateUser = () => {

    const navigation = useNavigation();

    const initialValues = {
        userName: '',
        password: '',
        email: ''
    }

    const saveUser = async (value) => {
        try {
            await api.post('/users', value);
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert(
                "Erro ao criar conta",
                "Ocorreu um erro ao criar a conta. Tente novamente mais tarde."
                [
                    {text: "OK"}
                ]
            );
            console.log(error);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => saveUser(values)}
            validationSchema={CreateUserSchema}
        >
            {({ handleChange, handleSubmit, handleBlur, values, errors, touched, isValid }) => (
                <View style={styles.container}>
                    <Input
                        placeholder='Username'
                        value={values.userName}
                        onChangeText={handleChange('userName')}
                        onBlur={handleBlur('userName')}
                        errorMessage={errors.userName && touched.userName ? errors.userName : null}
                    />
                    <Input
                        placeholder='Email'
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        errorMessage={errors.email && touched.email ? errors.email : null}
                    />
                    <Input
                        placeholder='Senha'
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry
                        errorMessage={errors.password && touched.password ? errors.password : null}
                    />
                    <Button
                        title="Criar conta"
                        onPress={handleSubmit}
                        disabled={!isValid}
                    />
                </View>
            )}
        </Formik>
    );
}

export default CreateUser;