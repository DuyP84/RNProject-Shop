import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    SectionList,
  } from "react-native";

import { fetchAll, searchGameByName } from '../redux/actions/gameActions';
import { useSelector, useDispatch } from 'react-redux';
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import { SafeAreaView } from 'react-native-web';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LinearGradient } from 'expo-linear-gradient'

import Categogy from '../components/Explore/Categogy';
function ItemListView({navigation}) {

    const dispatch = useDispatch();
    const db = useSelector((store) => store.games);
    
    const [data,setData] = useState([])
    const [text, value] = useState("");
    //const [profile, setprofile] = useState([])

    
    useEffect(() => {
        dispatch(fetchAll());
        console.log("db", db);
        setData(db.games)
      }, []);
    
      const navigateAdd = (id) => {
        navigation.navigate("Create");
      };
    
      const navigate = (id) => {
        // console.log(id)
        navigation.navigate("Details",{
          id : id
        });
      };
      const search = (keyword) => {
        if(keyword != ""){
          dispatch(searchGameByName(keyword));
        }else{
          document.getElementById('Nothing found!')
          dispatch(fetchAll());
        }
        
      }

      const navigateProfile = (id) => {
        navigation.navigate('Profile', {
          id: id  
        });
      }

      const navigateCart = (id) => {
        // console.log(id)
        navigation.navigate("Cart",{
          id : id
        });
      };
     
 const ItemComponent = ({item}) => {
    return (
        <SafeAreaView>
        <TouchableOpacity  onPress={() => navigate(item.id)}>
        <View style={styles.item} key={item.id}>
          <Image style={styles.image} source={{ uri: item.url }} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Price: ${item.price} </Text>
          </View>
          
        </View>
        
      </TouchableOpacity>
      
      </SafeAreaView>
      
 
    );
 };
 const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};
 return (
  <SafeAreaView>
    <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
    
    >
    <View style={styles.container}>

      <View
          style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Hello, Duy
          </Text>
          <TouchableOpacity  onPress={navigateProfile}>
            <ImageBackground
              source={{
                uri: `https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg`,
              }}
              style={styles.avatar}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rowlinetop}>
        
        <TouchableOpacity onPress={ navigateAdd} >
        
        <View style={styles.iconWrapper}>
        <Text style={styles.createtext}>Create new one <FiPlusCircle/> </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity  onPress={navigateCart}>
        <View style={styles.iconCart} >
        < AiOutlineShoppingCart size={28}/>
        </View>
        </TouchableOpacity>
        </View>

      <View style={styles.search}>
        
        <TextInput
          style={styles.searchInput}
          placeholder="PUBG, AmongUs, Minecraft, TownShip ..."
          onChangeText={value}
          value={text}
        />
        {/* < name="search" onPress={() => {search(text)}}/> */}
        <TouchableOpacity onPress={() => {search(text)}}
         
      >
        <View style={styles.searchbtn}>
        <FiSearch/>
        </View>
      </TouchableOpacity>
      
        </View>
        <View style={styles.features}>
      <Text style={styles.text}>
            Best for you today
          </Text>
      </View>
      {/* SCROLLBAR NGANG */}
      <View style={{justifyContent:'center' }}></View>
      <ScrollView horizontal={true}
      stickyHeaderHiddenOnScroll={false}
      scrollEnabled={true}
      >
        
<Categogy imgUri={require('../images/items/Altos-Odyssey.jpeg')} name="Altos Odyssey" price="$49" />
<Categogy imgUri={require('../images/items/miles-morales.webp')} name="SpiderMan" price="$29"/>
<Categogy imgUri={require('../images/items/battlefield-2042.webp')} name="Battlefield" price="$49" />
<Categogy imgUri={require('../images/items/pokemon-unite.jpeg')} name="Pokemon-Unite" price="$49"/>

    
  
  </ScrollView>
      <View style={styles.features}>
      <Text style={styles.text}>
            Popular Games
          </Text>
      </View>
      <FlatList
       //hien thi key value, khoa chinh = id 
       keyExtractor={(item) => item.id}
        data={db.games}
        
        renderItem={ItemComponent}
        
      />
      
      </View>
      </ScrollView>
      </SafeAreaView>
  );
}
export default ItemListView;

const styles = StyleSheet.create({
    container: {
      
      backgroundColor: "#fff",
    },
    loginContainer:{
      flex:1,
      backgroundColor:"#4fc3f7",
      height:"25%",
      borderBottomLeftRadius:35,
      borderBottomRightRadius:15,
      paddingHorizontal:20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      padding:10
    },
    loginText:{
      color:'#fff',
      fontSize: 18, 
      fontFamily: 'Roboto-Medium',
      marginHorizontal:10,
      fontWeight:'bold',
    },
    avatar:{
      width: 35, 
      height: 35
    },
    features:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
      padding:10,
    },
    searchbtn:{
      size:30, 
      color:"#000", 
      marginHorizontal:8,
    },
    text:{
      color:'black',
      fontSize: 20, 
      fontFamily: 'Roboto-Medium',
      marginHorizontal:10,
    },
    item: {
      flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical:5,
    backgroundColor: "#eee",
    borderRadius: 5,
    },
    image: {
      width: 220,
      height: 220,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    info: {
      marginLeft: 10,
    },
    name: {
      fontSize: 32,
      fontWeight: "bold",
      flexWrap: 'wrap'
    },
    brand: {
      fontSize: 16,
      fontWeight: "600",
    },
    price: {
      fontSize: 16,
      color: "#888",
    },
    search: {
      marginBottom:10,
      paddingHorizontal: 5,
      paddingVertical:5,
      marginHorizontal:5,
      marginVertical:10,
      backgroundColor: "#fff",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 25,
      border: "1px solid #ccc",
    },
    searchInput: {
      backgroundColor: "#fff",
      padding: 10,
      flex: 1,
    },
    iconWrapper: {
      width:'100%',
      height:30,
      borderRadius:20,
      backgroundColor: 'orange',
      borderColor:'black',
      alignItems: "center",
      justifyContent: "center",
      marginLeft:8
    
  },
  rowlinetop:{
flexDirection:'row',
justifyContent:'space-between',
paddingTop:10
  },
  createtext:{
flexDirection:'row',
fontSize:16,

  },
  iconCart:{
    paddingHorizontal:10,
    borderWidth:1,
    borderColor:'#eeeeee',
    backgroundColor:'#eeeeee',
    borderRadius:10,
    marginRight:8,
  },
  icon:{
    fontSize:24,
    color:'black',
    justifyContent:'center',
      alignItems:'center'
},
scrollviewWrapper:{
  height:250,
  elevation:2,
  backgroundColor:"#FFF",
  marginLeft:20,
  marginTop:20,
  borderRadius:15,
  marginBottom:10,
  width:160
},
  });