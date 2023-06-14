import React,{ useState } from 'react'
import {Modal, Alert,View ,Text, Button, TouchableOpacity, Image} from 'react-native';
import st from './style';



//
const Profile=(props)=>{
  
  
    const logout=()=>{
      Alert.alert(
        'Xác nhận',
        'Bạn muốn đăng xuất',
        [
          // mảng nút bấm
          {
            text: 'OK',
            onPress: () => {
              alert("GoodBye!!!")
      props.navigation.navigate("Login");
          
            },
            style: 'default'
          },
          {
            text: 'No',
            onPress: () => {
              cancelable: true;
            }
          }
        ],
        {
          cancelable: true,
        }
      );
      
    }
    const XoaAcc=()=>{
        Alert.alert(
          'Confirm',
          'You are sure?',
          [
            // mảng nút bấm
            {
              text: 'OK',
              onPress: () => {
                let apii="http://192.168.31.108:3000/users/"
          fetch(apii+props.route.params.idFromHomeTab, {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body:""
            })
            .then ((res)=>{
                console.log(res);
              
                if(res.status==200){
                    props.navigation.navigate('Login');
                }else alert("thất bại")
            })
              .catch((err) =>{console.log(err);})
            
              },
              style: 'default'
            },
            {
              text: 'No',
              onPress: () => {
                cancelable: true;
              }
            }
          ],
          {
            cancelable: true,
          }
        );
    }

       return (
        <View style={{ flex:1 , padding: 10}}>
          <View style={{alignItems:"center", justifyContent:'center'}}>
              <Image source={require('../images/hh.jpg')} style={{width:150, height:150}}/>
              <View style={st.thongtinqt}>
                <Text style={{width:'30%'}}>You are </Text>
                <Text style={{width:'65%'}}>{props.route.params.roleFromHomeTab? "Admin" : "User"}</Text>
              </View>
              <View style={st.thongtinqt}>
                <Text style={{width:'30%'}}>Your account </Text>
                <Text style={{width:'65%'}}>{props.route.params.tkFromHomeTab}</Text>
              </View>
          </View>
          
         

          <View style={{flexDirection:"column", marginTop:'auto',flex:1, alignItems:'center', justifyContent: 'center',}}>
            <TouchableOpacity  style={{justifyContent: 'center', alignItems:"center",backgroundColor:'#009999', height:40, width:250}}>
                <Text style={{fontSize:15, color:'white'}}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout} style={{justifyContent: 'center', alignItems:"center",backgroundColor:'#339966', height:40, marginTop: 20,width:250}}>
                <Text style={{fontSize:15, color:'white'}}>LogOut</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={XoaAcc} style={{justifyContent: 'center', alignItems:"center",backgroundColor:'#669999', height:40,  marginTop: 20,width:250}}>
                <Text style={{fontSize:15, color:'white'}}>Delete your account</Text>
            </TouchableOpacity>
          
           </View>
          
           
        </View>
          

        
    );

}

export default Profile;
