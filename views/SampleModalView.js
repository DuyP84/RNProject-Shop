import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, View,StyleSheet, TouchableOpacity,
     ImageBackground, Modal,Pressable,Image } from 'react-native';


const SampleModalView = ({ params,}) => { 
    const [showModal,setShowModal] =useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.titleText}> Sample React Native Modal</Text>
                <TouchableOpacity
                     style={styles.btn}
                     onPress={()=>setShowModal(true)}
                     >
                    <Text style={styles.btnText}>Show Modal</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
                <ImageBackground 
                     source={{uri: require('../assets/discount-background-pattern.jpg')}} 
                     resizeMode='cover'
                     style={styles.bg}
                     />
            </View>
            <Modal 
             transparent={true}
             visible={showModal}
             animationType={'slide'}
             onRequestClose={()=>setShowModal(false)}
            >
                <Pressable style={styles.modalContainer} 
                           onPress={(evt)=> evt.target == evt.currentTarget ? 
                                            setShowModal(false) : setShowModal(true) }>
                    
                    <TouchableOpacity style={styles.closeBtn} 
                                   onPress={()=> setShowModal(false)}>
                        <Ionicons name={'close'} size={24}  color={'#FFF'} />
                    </TouchableOpacity>
                    
                    <View style={styles.imgContainer}>
                        <Image source={{uri: require('../assets/shopeeadv2.png')}} 
                               style={styles.img}/>
                    </View>

                    {/* <Text style={styles.titleText}>Hello</Text> */}
                </Pressable>    
               
            </Modal>
        </View>
    );
}
export default SampleModalView;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    top: {
        flex: 1,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 28,

    },
    bottom: {
        flex: 4,
       
    },
    bg: {
        flex: 1,
        alignItems:'center'
    },
    btn: {
        width: '80%',
        padding: 10,
        backgroundColor:'#FF0000',
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center'
    },
    btnText: {
        color: '#FFF'
    },
    modalContainer: {
        marginTop: 200,
        width: '100%',
        height: 420,
        backgroundColor: 'rgba(1,1,1,0.5)',
        padding: 20,
    },
    closeBtn: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        backgroundColor:'#FF0000',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: 250,
    },
    img: {
        width: '90%',
        height: 350,
    }
})