import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { selectUserFetchStatus, selectUser, fetchUserById, selectUserError } from "./userSlice";

export function UserList(props){
    const user = useSelector(selectUser);
    const status = useSelector(selectUserFetchStatus);
    const error = useSelector(selectUserError);
    const dispatch = useAppDispatch();

    const [nombre, setNombre] = useState('defunkt')

    const getUser = () => {
        //Aqui hay un ejemplo de como usar las promesas
        dispatch(fetchUserById(nombre)).then((res)=>{
            console.log('Asyn Promise ==> '+res.payload?.name)
        })
    }

    return (
        <View style={{padding:10}}>            

            <TextInput 
                placeholder="Nombre" 
                style={{borderColor:'red', borderWidth:1, marginVertical:5, fontSize:18}}
                value={nombre} 
                onChangeText={setNombre} />

            <TouchableOpacity
                style={{backgroundColor:'gray', padding:10, width:150, flexDirection:'row', justifyContent:'center'}}
                onPress={() => getUser()}>
                <Text>Get User Data</Text>
            </TouchableOpacity>

            <ActivityIndicator color={'blue'} animating={status === 'loading'} />
            
            {
                error? (
                    <Text>{error?.message}</Text>
                ):(
                    <>
                        <Text>Nombre: {user?.name}</Text>
                        <Text>Id: {user?.id}</Text>
                        <Text>Tipo: {user?.type}</Text>
                        <Text>Blog: {user?.blog}</Text>
                    </>
                )
            }
            

            
            

            
        </View>
    )
}