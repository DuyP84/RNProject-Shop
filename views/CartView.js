import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Button
} from "react-native";
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { FiPlusCircle, FiSearch } from "react-icons/fi";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchAll, DeleteAction, searchGamebyId } from "../redux/actions/gameActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BiWallet } from "react-icons/bi";

const CartView = ({route, navigation}) => {

    
  const id = route.params.id;

  const store = useSelector((store) => store.games.item);
  const [item, setItem] = useState({});
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchGamebyId(id));
    console.log("id:", id)
  }, []);

  useEffect(() => {
    console.log("item: ", store);
    setItem(store);
  }, [store]);

  // useEffect(() => {
  //   const unsubcribe = navigation.addListener('focus', () => {
  //     getDataFromDB();
  //   });
  //   return unsubcribe
  // },[navigation])

  // const getDataFromDB = async () => {
  //   let items = await AsyncStorage.getItem('cartItems');
  //   //items = JSON.parse(items);
  //   let productData = [];
  //   if (items) {
  //     item.forEach(data => {
  //       if (items.includes(data.id)) {
  //         productData.push(data);
  //         return;
  //       }
  //     });
  //     setProduct(productData);
  //     //getTotal(productData);
  //   } else {
  //     setProduct(false);
  //     //getTotal(false);
  //   }
  // };

  return (
<ScrollView>
    <View >
      <View style={styles.linetop}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
           name="chevron-left" style={styles.btnBack} 
            />
        </TouchableOpacity>
      
    <Text style={styles.text}>Order Details</Text>
    <TouchableOpacity  >
        <View style={styles.iconWrapper}>
        <Text style={styles.createtext}><FiPlusCircle/> </Text>
        </View>
        </TouchableOpacity>
        
        </View>
        <Text style={styles.text1}>
          My Cart
        </Text>


      <View style={styles.item} key={item.id}>
        <Image style={styles.image} source={{ uri: item.url }} />
        <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}> $ {item.price} </Text>
        </View>
    <View>
      
    </View>

    {/*/////////////// Wallet method ///////////// */}
    <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 20,
            }}>
              
            <Text
              style={styles.paymentText}>
              Your Wallet
            </Text>
            
            <View
              style={styles.methodContainer}>
              <View
                style={styles.locationHeader}>
                <View
                  style={styles.methodHeader}>
                  <BiWallet
                    name="mdiWallet"
                    style={{
                      fontSize: 18,
                      color: '#0043F9',
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={styles.locaitonText}>
                    Balance
                  </Text>
                  <Text
                    style={styles.locaitonText2}>
                    $150.00,    
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{fontSize: 22, color: 'black'}}
              />
              </TouchableOpacity>
            </View>
          </View>
    {/* /////////// PAYMENT METHOD ////////////////*/}
    <View style={{
      paddingHorizontal: 16,
      marginVertical: 10,
      }}>
    <Text
    style={styles.paymentText}>
      Payment Method
    </Text>
    <View
    style={styles.methodContainer}>
    <View
    style={{
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    }}>
     <View
     style={styles.methodHeader}>
    <Text
    style={styles.methodText}>
    VISA
    </Text>
    </View>
    <View>
    <Text
    style={styles.visaText}>
    Visa Classic
    </Text>
    <Text
    style={styles.visaNumber}>
    Add your Visa number
    </Text>
    </View>
    </View>
    <TouchableOpacity>
    <MaterialCommunityIcons
    name="chevron-right"
    style={{fontSize: 22, color: 'black'}}
    />
    </TouchableOpacity>
    </View>
    </View>   

    {/*///////////////// TOTAL PRICE/////////////////  */}
    <View style={styles.totaltop}>
      <Text style={styles.paymentText}>
        Order Info
      </Text>
    <View style={styles.totalContainer}>
    <Text style={styles.totaltext}>
    Sale Discount
    </Text>
    <Text
    style={styles.visaNumber}>
    -15%
    </Text>
    </View>
    <View style={styles.totalContainer}>
    <Text style={styles.totaltext}>
        Total
    </Text>
    <Text style={styles.totalprice}>${item.price}</Text>
    </View> 
    </View>
   
{/* ////////////CHECKOUT BUTTON////////// */}
    <View style={styles.btnContainer}>
    <TouchableOpacity style={styles.btnHeader}>
    <Text style={styles.btnText}> CHECK OUT </Text>
    </TouchableOpacity>
   </View>
  
    </View> 
    </ScrollView>
    
  )
}
export default CartView

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eeee",
    justifyContent: 'space-between',
    
  },
  btnBack:{
    fontSize: 18,
    color:'gray',
    padding: 12,
    backgroundColor: '#eeee',
    borderRadius: 12,
  },
  linetop:{
    paddingTop:30,
    flexDirection:'row',
    paddingHorizontal:10,
    justifyContent:'space-between',
    backgroundColor:'#eeee'
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
  createtext:{
  fontSize:15,
  color: 'black',
  },
  
  text:{
  color:'black',
  fontSize: 20, 
  // fontFamily: 'Roboto-Medium',
  marginHorizontal:10,
  fontWeight:'bold',
  paddingTop:10,
  marginLeft:15
  },
  text1:{
  fontSize: 20,
  color: 'black',
  fontWeight: '500',
  letterSpacing: 1,
  paddingLeft: 16,
  marginBottom: 10,
  paddingTop:10,
  backgroundColor:'#eeee'
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    borderRadius: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    // flexWrap: "wrap",

  },
  item: {
    flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 10,
  backgroundColor: "#eee",
  borderRadius: 5,
  justifyContent:'space-between'
  },
  totaltop:{
    paddingHorizontal: 16,
    marginTop: 40,
    marginBottom: 80,
  },
  totalContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:5,
  },
  totaltext:{
  fontSize: 15,
  fontWeight: '400',
  maxWidth: '80%',
  color: 'black',
},
  totalprice:{
    fontSize: 18,
    fontWeight: '500',
    color:'black'
  },
  paymentText:{
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 20,
  },
  methodContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  methodHeader:{
    color: '#0043F9',
      backgroundColor: '#F0F0F3',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      borderRadius: 10,
      marginRight: 18,
  },
methodText:{
  fontSize: 10,
  fontWeight: '900',
  color: '#0043F9',
  letterSpacing: 1,
},
visaText:{
  fontSize: 14,
  color: 'black',
  fontWeight: '500',
},
visaNumber:{
  fontSize: 12,
  color: 'black',
  fontWeight: '400',
  lineHeight: 20,
  opacity: 0.5,
},
locationHeader:
{
  flexDirection: 'row',
  width: '80%',
  alignItems: 'center',
},
locaitonText:{
  fontSize: 14,
  color: 'black',
  fontWeight: '500',
},
locaitonText2:{
  fontSize: 12,
  color: 'black',
  fontWeight: '400',
  lineHeight: 20,
  opacity: 1,
},
btnContainer:{
  position: 'absolute',
  bottom: 10,
  height: '8%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
},
btnHeader:{
  width: '86%',
  height: '90%',
  backgroundColor: '#4fc3f7',
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',

 
},
btnText:{
  fontSize: 18,
  fontWeight: '500',
  letterSpacing: 1,
  color: '#fff',
  textTransform: 'uppercase',  
},
footer: {
  marginTop: 30,
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor:'#fff',
},
})