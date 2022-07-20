import React, { useState } from "react";
import { ActivityIndicator, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAppDispatch , useAppSelector} from "../../app/hooks";
import * as repoReducer from "../repositorio/repoSlice";
import { selectStatus as getUserState, selectUser, fetchUserById, selectError as getUserError} from "./userSlice";

export function UserList(props){

    const user = useAppSelector(selectUser);
    const status = useAppSelector(getUserState);
    const error = useAppSelector(getUserError);

    const repos = useAppSelector(repoReducer.selectRepos);
    const reposStatus = useAppSelector(repoReducer.selectStatus);
    const reposError = useAppSelector(repoReducer.selectError);

    const dispatch = useAppDispatch();

    const [nombre, setNombre] = useState('defunkt')

    const getUser = () => {
        //Aqui hay un ejemplo de como usar las promesas
        dispatch(fetchUserById(nombre)).then((res)=>{
            console.log('Asyn Promise ==> '+res.payload?.name)
        })
    }

    const getRepos = () => {
        //Aqui hay un ejemplo de como usar las promesas
        dispatch(repoReducer.fetchReposByUserId(nombre)).then((res)=>{
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

            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    style={{backgroundColor:'gray', padding:10, width:150, flexDirection:'row', justifyContent:'center'}}
                    onPress={() => getUser()}>
                    <Text>Get User Data</Text>
                </TouchableOpacity>

                <ActivityIndicator color={'blue'} animating={status === 'loading'} />
            </View>            
            
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

            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    style={{backgroundColor:'gray', padding:10, width:150, flexDirection:'row', justifyContent:'center'}}
                    onPress={() => getRepos()}>
                    <Text>Get Repos Data</Text>
                </TouchableOpacity>

                <ActivityIndicator color={'blue'} animating={reposStatus === 'loading'} />
            </View>

            {
                reposError? (
                    <Text>{reposError?.message}</Text>
                ):(
                    <ScrollView>
                    {
                        repos && repos.map(repo=>(
                            <View key={repo?.id} style={{paddingVertical:5, borderBottomColor:'blue', borderBottomWidth:1}}>
                                <Text>{repo?.full_name}</Text>
                                <Text onPress={()=>Linking.openURL(repo?.url)} style={{color:'blue'}}>Open Link</Text>
                            </View>
                        ))
                    }
                    </ScrollView>
                )
            }
            
        </View>
    )
}