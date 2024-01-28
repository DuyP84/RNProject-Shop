import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ToastAndroid,

} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import { fetchAll, DeleteAction, searchGamebyId } from "../redux/actions/gameActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsView = ({ route, navigation }) => {
  const id = route.params.id;

  //console.log(id);
 // const db = useSelector((store) => store.games);
 const store = useSelector((store) => store.games.item);
 const [item, setItem] = useState({});

 const dispatch = useDispatch();

 useEffect(() => {
   dispatch(searchGamebyId(id));
   console.log("id:", id)
 }, []);

// useEffect(() => {
  // dispatch(fetchAll());
  // console.log("db", db);
  // setItem(store);
  // setData(store)
  // }, [store]);

 useEffect(() => {
   console.log("item: ", store);
   setItem(store);
 }, [store]);

  const navigateUpdate = (id) => {
    navigation.navigate("Edit", {
      id: id,
      item: item,
      
    });
  };


  const deleteGame = (id) => {
    let result = confirm("Want to delete?");
if (result) {
  dispatch(DeleteAction(id));
}
    dispatch(fetchAll());
    navigation.navigate("List");
  };

  // const navigateCart = async (id) => {
  //   let itemArray = await AsyncStorage.getItem('cartItems');
  //   //itemArray = JSON.parse(itemArray);
  //   if (itemArray) {
  //     let array = [itemArray];
  //     array.push(id);

  //     try {
  //       await AsyncStorage.setItem('cartItems', array);
  //       ToastAndroid.show(
  //         'Item Added Successfully to cart',
  //         ToastAndroid.SHORT,
  //       );
  //       navigation.navigate('Cart');
  //     } catch (error) {
  //       return error;
  //     }
  //   } else {
  //     let array = [];
  //     array.push(id);
  //     try {
  //       await AsyncStorage.setItem('cartItems', array);
  //       ToastAndroid.show(
  //         'Item Added Successfully to cart',
  //         ToastAndroid.SHORT,
  //       );
  //       navigation.navigate('Cart');
  //     } catch (error) {
  //       return error;
  //     }
  //   }
  // };
    // navigation.navigate("Cart", {
    //   id: id,
    //   item: item,
      
    const navigateCart = (id) => {
      navigation.navigate("Cart", {
        id: id,
        item: item,
        
      });
    };
  return (
    <View style={styles.container}>
      <View style={styles.itemcss} key={item.id}>
        <Image style={styles.image} source={{ uri: item.url }} />
        </View>
        <View style={styles.info}>
          
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>$ {item.price} </Text>
         
          
          <Text style={styles.brand}>Publisher : {item.brand}</Text>
          
          {/* <View style={styles.overview}>
            <Text
              style={styles.overviewtext}
            >
              OVERVIEW
            </Text>
            <View style={styles.row}>
              <Image
                style={styles.rowImg}
                source={{
                  uri: "https://kingshoes.vn/data/upload/media/gia%CC%80y-adidas-nasa-nmdr1-spectoo-footwear-white-fx6818-king-shoes-sneaker-real-hcm-2.jpg",
                }}
              />
              
            </View>
          </View> */}
         
          <View style={styles.description}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
              Description
            </Text>
            <Text style={styles.txtDes}>{item.description}</Text>
          </View>
        
       
        <View style={styles.footer}>
        <TouchableOpacity
            onPress={() => navigateCart(id)}
            style={styles.btnadd}
          >
            <Text style={styles.btnTextadd}>Add to cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={() => deleteGame(id)}
            style={styles.btnadd}
          >
            <Text style={styles.btnTextadd}>Add to wishlist</Text>
          </TouchableOpacity>
        </View>
    <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigateUpdate(id)}
            style={styles.btn}
          >
            <Text style={styles.btnText}>UPDATE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => deleteGame(id)}
            style={styles.btn}
          >
            <Text style={styles.btnText}>DELETE</Text>
          </TouchableOpacity>
        </View>
        </View>
    </View>
    
  );
}


export default DetailsView;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#eeeeee",
  },
  itemcss: {
    backgroundColor: "#eeeeee",
    borderRadius: 10,

  },
  
  txtDes: {
    fontSize: 14,
    marginTop: 10,
  },
  sizeActive: {
    fontSize: 17,
    fontWeight: "bold",
  },
  viewSize: {
    marginTop: 10,
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    textAlign: "center",
    marginLeft: 15,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
  },
  info: {
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    backgroundColor:"#fff",
    flex: 3,
  },
  info1: {
    width: 60,
    flexDirection: "row",
  
  },
  brand: {
    fontSize: 16,
    fontWeight: "bold",
    margin:10,
  },
  description:{
    margin:10,
  },
  overview:{
    borderBottomColor:'gray',
    textDecorationLine:"underline",
    marginVertical:20,
    padding:20,
    borderWidth:2,
    borderBottomColor:'gray',
    borderTopColor:'gray',
    borderLeftColor:null,

  },
  overviewtext:{
    letterSpacing: "3px", 
    fontWeight: "bold", 
    fontSize: 16 
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    flexWrap: "wrap",
    paddingTop:20,
    margin:10,

  },
  price: {
    fontSize: 18,
    color: "#888",
    margin:10,
  },
  search: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    border: "1px solid #ccc",
  },
  color: {
    paddingTop: 20,
  },

  row: {
    flexDirection: "row",
    paddingTop: 20,
    borderBottomColor:'black',
  
  },
  rowImg: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    marginRight: 10,
    resizeMode: "contain",
  },
  footer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor:'#fff',
  },
  btn: {
    backgroundColor: "#4fc3f7",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  
  btnadd:{
    borderWidth:1,    
    borderColor:'4fc3f7', 
    padding: 10,
    marginRight: 10,
    width: 150,
    height:60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#eeee',
  },
  btnTextadd:{
    color:'black',
    fontSize:'bold',
    padding: 10,
    marginRight: 10,
    fontWeight: "bold",
  },
})