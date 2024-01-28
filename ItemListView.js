import React, { useEffect } from 'react';
import {FlatList, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
//step 1
import { fetchAllCourses } from '../redux/actions/courseActions';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import CreateTagView from './CreateTagView';

export default function ItemListView({navigation}){
    //step 2
    const dispatch = useDispatch();
    //console.log(dispatch)

    const db = useSelector(state => state.podcast)
    // console.log('db', db)
    const [data,setData] = useState([])
    // //step 3
    useEffect(() => {
        dispatch(fetchAllCourses());
        setData(db.podcast)
        console.log('data', db.podcast)
    } 
    , []);
    const HeaderComponent = () => {
        return (
            <View>
                <Text style={styles.titleCourses}> Podcast </Text>
            
            <TouchableOpacity style={styles.btn} 
            onPress={()=>{{
                navigation.navigate('Create')
            }}} >
            <Text style={styles.btnText}> Create New </Text>
            </TouchableOpacity>
            </View>
        )
     }

     
 const ItemComponent = ({item}) => {
    return (
    
    <View style={styles.itemContainer}>
          <View style={styles.imgCourseContainer}>
            <Image style={styles.imgCourse} source={{uri: item.img}} />

          </View>  
          <TouchableOpacity 
            onPress={()=>{{
                navigation.navigate('Edit', {id: item.id})}}}>
          <View style={styles.itemDetails}>
            <Text style={styles.podcastName}>Name: {item.name}</Text>
            <Text style={styles.date}>Date: {item.date} </Text>
            

          </View>
          </TouchableOpacity>
    </View>
    )
 }

    return (
    <View style={styles.listItemContainer}>
        <FlatList 
            data={db.podcast}
            ListHeaderComponent={HeaderComponent}
            renderItem={ItemComponent}
            
        >
        </FlatList>
    </View>
);
 }






const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
    },
    btn: {
        height: 45,
        backgroundColor: "orange",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 50,
        padding: 15,
        borderRadius: 45 / 2,
        width: "80%",
      },
      btnText: {
        color: "black",
      },
    titleCourses: {
        fontSize: 28,
        fontWeight:'bold'
    },
    itemContainer: {
        flexDirection:'row',
        marginVertical:10
    },
    imgCourse: {
        width: 70,
        height:70,
        borderRadius:15
    },
    itemDetails: {
        flex: 1,
        flexWrap: 'wrap',
        padding: 10,
        paddingTop: 0
        
    },
    podcastName: {
        fontSize: 22,
        fontWeight:'bold'
    },
    img: {
        
        
    },
    date: {
        fontSize: 20,
        
    },
    courseRating: {
        fontSize: 20,
        color: 'orange'
        
    }
})


