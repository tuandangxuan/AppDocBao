
import { Modal, View, StyleSheet, Text, Button, TextInput, Image, TouchableOpacity,FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import DropDownPicker from 'react-native-dropdown-picker';




const Comment = (props) => {


    console.log(props.taikhoanFromHome+"tk");
    const [showModalDialog, setshowModalDialog] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [newId, setnewId] = useState(props.idNewFromHome);
    const [userName, setuserName] = useState(props.taikhoanFromHome);

    const [noidung, setnoidung] = useState('');
    const [dscm, setdscm] = useState([]);

    const getComments=async()=>{
        setshowModalDialog(true);
        let api_url="http://  :3000/comments";

        try {
            const response = await fetch(api_url);
            const json = await response.json();
            
            setdscm(json)

          } catch (error) {
            console.error(error);
          }finally{
            
            setisLoading(false);
          }
    }

    const renderComment=( {item} )=>{
            
            if(item.newId==props.idNewFromHome){
                return(
                    <View style={{marginBottom: 20,}}>
                        <Text style={{textDecorationLine:'underline', fontStyle:'italic'}}>{item.userName +" :"}</Text>
                        <Text style={{fontSize:10}}>{item.noidung}</Text>

                    </View>
                );
            }else 
           return(
            <View>
               
            </View>
           );
    }
    

   
    const addCm = () => {
        if(noidung.length==0){
            alert("Chưa nhập bình luận !");
            return
        }
        let obj = {
            newId: newId,
            noidung: noidung,
            userName:userName
        }
        let apii = "http://192.168.31.108:3000/comments";

        fetch(apii, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                obj,
            )
        })
            .then((res) => {
                console.log(res);

                if (res.status == 201) {
                    // alert("done")
                    setnoidung('');
                } else alert('thất bại')
            })
            .catch((err) => { console.log(err); })
            .finally(getComments)
    }

    

    return (
        <View >
            
            <Modal visible={showModalDialog}
                transparent={true}
                animationType="slide"
                onRequestClose={
                    () => {
                        //xảy ra khi bấm nút back trên điện thoại
                        setshowModalDialog(false);
                    }
                }>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ScrollView style={st.khungDialog}>
                        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <Text style={{marginLeft: 100, color:'#FF6666', fontSize:20,marginBottom: 10}}>Bình luận </Text>
                        <Text style={{borderWidth:0.5, height:15, fontSize:10,color:'#808080', marginTop:5}} onPress={()=>setshowModalDialog(false)}>Cancel</Text>
                        </View>
                        
                        <View style={st.nhap}>
                            <TextInput placeholder="Viết bình luận" onChangeText={(txt) => setnoidung(txt)} />
                        
                      
                        <TouchableOpacity onPress={addCm} style={{ width: '15%', justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{width:25, height:25}} source={require('../images/cm.png')} />
                        </TouchableOpacity>
                        </View>
                        {
                    (isLoading)? (
                        <ActivityIndicator/>
                    ):
                <FlatList data={dscm}
                     keyExtractor={ (item)=>{return item.id} }
                     renderItem = { renderComment }/>
           }

                        


                    </ScrollView>
                </View>

            </Modal>
            

            <Text onPress={getComments}>Comment</Text>


        </View>
    );
}
export default Comment;

const st = StyleSheet.create({
    khungDialog: {
        backgroundColor: '#DDDDDD',
        borderRadius: 10,
        marginTop: 150,
        padding: 20,
        width: '80%',
        maxHeight: 300,

    },
    nhap: {
        
        borderWidth: 2,
        padding: 2,
        margin: 5,
        borderColor: 'cyan',
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection:'row', justifyContent: 'space-between',
    },

})