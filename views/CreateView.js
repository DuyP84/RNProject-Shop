import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  TextInput,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { postAction } from "../redux/actions/gameActions";
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const CreateView = ({ navigation, params }) => {
  const [selectedImage, setSelectedImage] = useState({
    localUri: `https://www.pinclipart.com/picdir/middle/460-4608361_alexander-hamilton-clip-art.png`,
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
  
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const addNew = () => {
    const game = {
      name: name,
      brand: brand,
      price: price,
      description: description,
      url: url,
    };
    console.log(game.url);
    
    dispatch(postAction(game));
    navigation.navigate("List");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New</Text>
      <Image
        style={styles.image}
        source={{
          uri: url,
        }}
      />
      <TouchableOpacity style={styles.button} onPress={openImage}>
        <Text style={styles.buttonText}>Add image here</Text>
      </TouchableOpacity>
      <SafeAreaView>
        <View 
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            style={styles.InputText}
            placeholder="Name"
            // value={value}
            onChangeText={(e) => setName(e)}
          />
          <TextInput
            style={styles.InputText}
            placeholder="Publisher"
            // value={value}
            onChangeText={(e) => setBrand(e)}
          />
          <TextInput
            style={styles.InputText}
            placeholder="Price"
            // value={value}
            onChangeText={(e) => setPrice(e)}
          />
          <TextInput
            style={styles.InputText}
            placeholder="Description"
            // value={value}
            onChangeText={(e) => setDescription(e)}
          />
          
          
          <TouchableOpacity style={styles.button} onPress={() => addNew()}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default CreateView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 200 / 2,
    borderColor: "gray",
    borderWidth:1,
    borderEndColor:'red,'
  },
  button: {
    backgroundColor: "#4fc3f7",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  title: {
    marginBottom: 40,
    fontSize: 30,
    fontWeight: "600",
    textTransform: "capitalize",
    opacity:0.8,
  },
  btn: {
    marginTop: 10,
  },
  subTitle: {
    fontSize: 20,
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