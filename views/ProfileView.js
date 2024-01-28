import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  TextInput,
  FlatList, 
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from 'react-redux';
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth"
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { fetchAllProfile, putAction, searchProfilebyId } from "../redux/actions/profileAction";
import { ScrollView } from 'react-native-gesture-handler';


const ProfileView= ({ route }) => {
  const id = route.params.id;
  const [selectedImage, setSelectedImage] = useState({
    localUri: `https://tiengdong.com/wp-content/uploads/www_tiengdong_com-hinh-anh-10-diem.jpg`
  });

  //  cai truoc bi loi asset[0]
  //   let uri = result.assets[0].uri;
  const openImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({base64: true})
    if (result.canceled)
        return;
    let uri = result.uri;
    setSelectedImage({localURI: uri})
    // console.log(uri);
    
    if (Platform.OS === 'web'){
        let base64code = result.base64;
        //upload to firestorage
        await uploadBase64Code(base64code);
    }else {
        let uri = result.uri;
        //convert to blob file
        const blobfile = await convertToBlob(uri);
        //console.log(blobfile);
        //upload file
        await uploadFileBlob(blobfile);
    }
}

//delete image handle
// const deleteImage = async () => {
//     deleteObject(ref(storage, `images/${imgname}.jpg`)) // .child);

// }
const convertToBlob = async(uri) =>{
    const convert = new Promise((resolve, reject) =>{
        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onload = function(){
            resolve(xmlRequest.response);
        }
        xmlRequest.onerror = function(){
            console.log("error convertToBlob")
        }
        xmlRequest.contentType="blob";
        xmlRequest.open("GET", uri, true);
        xmlRequest.send(null);
    })
    return convert;
}

const uploadFileBlob = async () => {
    let imgname = "img-w-"+new Date().getTime();
    //console.log(imgname);
    //let fullname = `images\\${imgname}.jpg`;
    //console.log(fullname);
    let storage = getStorage();
    let storageref = ref(storage, `images/${imgname}.jpg`);
    //console.log('storageref',storageref);

    let metadata = {
        contentType: 'image/jpg'
    }

    const uploadTask = uploadBytesResumable(storageref, blobfile, metadata);
    uploadTask.on('state-changed', 
        (snapshot) => {},
        (error) => {},
        () => {
            getDownloadURL(snapshot.storage.ref).then(async(downloadURL) =>{
                console.log('File IOS available at',downloadURL);
                setUrl(downloadURL);
            })
        } 
    )
}
const uploadBase64Code = async(base64code) => {
    let imgname = "img-w-"+new Date().getTime();
    let storage = getStorage();
    //console.log(fullname);
    let storageref = ref(storage, `images/${imgname}.jpg`);
    //console.log('storageref',storageref);
    let metadata = {
        contentType: 'image/jpg'
    }
   const uploadTask = uploadString(storageref,base64code,'base64',metadata).then((snapshot) => {
        console.log('upload done')
        getDownloadURL(snapshot.ref).then(async(downloadURL) =>{
        console.log('File Web available at',downloadURL);
        setUrl(downloadURL);
        })
    });              
}

  //action o day ne
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(searchProfilebyId(id));
    console.log("id:", id)
  }, []);
  
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");

  const db = useSelector((store) => store.profiles);
   useEffect(() => {
    //dispatch(fetchAllProfile());
    //console.log("db", db);
    //setData(db.profiles)
   }, []);
   
  const updateProfile = () => {
    const profile = {
      id: id,
      username: username,
      url: url,
    };
    dispatch(putAction(profile));
    
  };
  const navigation = useNavigation();
  const handleLogout = () => {
      auth.signOut()
      .then(() => {
        navigation.navigate('Login');
      }) 
      .catch(error=>alert(error.message));
  };

 
  return (
    <View style={styles.container}>
      
      
        <View 
          style={{ justifyContent: "center", alignItems: "center", paddingTop:20 }}>
            
            <Text style={styles.title}>Your Profile</Text>
        <Image style={styles.image} source={{ uri: selectedImage.localUri }} />

        
            <View style={styles.header}>
            <TouchableOpacity style={styles.button} onPress={openImage}>
        <Text style={styles.buttonText}>Add image here</Text>
        </TouchableOpacity>

            </View>
            <Text style={styles.textdb}>Email: {auth.currentUser?.email}</Text>
            <Text style={styles.textdb}>Username: {auth.currentUser?.displayName}</Text>
            <TextInput
            style={styles.InputText}
            placeholder="Username"
            onChangeText={(e) => setUsername(e)}
          /> 

          <View style={styles.footer}>
          
          <TouchableOpacity
            onPress={() => updateProfile()}
            style={styles.button}
          >
            <Text style={styles.btnText}>Update</Text>
          </TouchableOpacity>

        
          <TouchableOpacity
            onPress={() => handleLogout()}
            style={styles.button}
          >
            <Text style={styles.btnText}>Log out</Text>
          </TouchableOpacity>
          </View>
        
        </View>
      
    </View>
    
  );
}

export default ProfileView

const styles = StyleSheet.create({
  container: {
    marginVertical:20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderColor: "gray",
    borderWidth:1,
  },
  header:{
    paddingTop:20,
    justifyContent:'center',
    alignItems:'center'
  },
  TextInput: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  title: {
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "600",
    textTransform: 'capitalize',
    opacity:0.8,
  },
  textdb:{
    marginTop: 10,
    fontSize: 20,
    
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    backgroundColor: "#4fc3f7",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#222b45",
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
  InputText: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
})