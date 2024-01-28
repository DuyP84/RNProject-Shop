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
  import React, { useState } from "react";
  import * as ImagePicker from "expo-image-picker";
  
  import { useDispatch } from "react-redux";
  import {
    getStorage,
    uploadString,
    ref,
    getDownloadURL,
    uploadBytesResumable,
  } from "firebase/storage";

  import { fetchAll, putAction } from "../redux/actions/gameActions";

const EditView = ({ route, navigation }) => {
    const [selectedImage, setSelectedImage] = useState({
        localUri: `https://cdn-amz.woka.io/images/I/61kfAYE-TKL.jpg`,
      });

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

  const item = route.params.item;
  const id = route.params.id;

  console.log("item list", item);
  const [name, setName] = useState(item.name);
  const [brand, setBrand] = useState(item.brand);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
  const [url, setUrl] = useState(item.url);

  const updateGame = () => {
    const game = {
      id: id,
      name: name,
      brand: brand,
      price: price,
      description: description,
      url: url,
    };
    dispatch(putAction(game));
    dispatch(fetchAll());
    navigation.navigate("List");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Item</Text>
      <Image
        style={styles.image}
        source={{
          uri: url 
        }}
      />
      <TouchableOpacity style={styles.button} onPress={openImage}>
        <Text style={styles.buttonText}>Update Image Here</Text>
      </TouchableOpacity>
      <SafeAreaView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            style={styles.TextInput}
            placeholder="Name"
            value={name}
            onChangeText={(e) => setName(e)}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Publisher"
            value={brand}
            onChangeText={(e) => setBrand(e)}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Price"
            value={price}
            onChangeText={(e) => setPrice(e)}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Description"
            value={description}
            onChangeText={(e) => setDescription(e)}
          />
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => updateGame()}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );

}

export default EditView

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
      },
      button: {
        backgroundColor: "#4fc3f7",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: 200,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
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
        marginBottom: 40,
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "capitalize",
      },
      backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      card: {
        width: 300,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
      },
      buttonText: {
        color: "#fff",
        fontSize: 16,
      },
      subTitle: {
        fontSize: 20,
      },
      img: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
      },
})