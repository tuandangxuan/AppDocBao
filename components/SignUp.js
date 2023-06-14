import React, { useState } from 'react';
import { View ,Text, TextInput, Button,StyleSheet, ImageBackground, SafeAreaView, Dimensions,TouchableOpacity,Image} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Switch } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp=(props)=>{
    const [getPassVisibile, setPassVisibile] = useState(false);
    const [getPassVisibile1, setPassVisibile1] = useState(false);
    const [account, setaccount] = useState("");
    const [password, setpassword] = useState("");
    const [password1, setpassword1] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
      // alert(isEnabled);
      return setIsEnabled((previousState) => {
        return !previousState
      }
      );
    }



    const doSignUp = ()=>{
        if (account.length==0){
            alert("chưa nhập tài khoản"); return;
        }
        if(password.length==0){
            alert("Chưa nhập mật khẩu"); return;
        }
        if(password!=password1){
            alert("Mật khẩu không khớp"); return;
        }
        // let url_check_acc = 'http://192.168.31.104:3000/users? taikhoan='+account;
        // fetch(url_check_acc)
        // .then((res)=> {return res.json()  })
        // .then ((arr_user)=>{
        //     if(arr_user.length == 1){
        //         alert ("Tài khoản đã có người sử dụng");
        //         return;
        //     }
            let obju = {
                taikhoan: account,
                passw: password,
                role:isEnabled,
            }

            let apii="http://192.168.31.108:3000/users"
            fetch(apii, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    obju,
                )
              })
              .then ((res)=>{
                  console.log(res);
                
                  if(res.status==201){
                    alert("Đăng ký thành công");
                    props.navigation.navigate('Login');
                
                  }
              })
                .catch((err) =>{console.log(err);})
        
         

    }
    return (
        <ImageBackground style={{height:'100%',width:'100%'}} source={require('../images/nen1.jpg')}>
            <SafeAreaView style={{flex:1}}>
                <View style={{height:'100%',width:'100%'}}>
                    {/* Tài khoản mật khẩu */}
                    <View style={{width:'100%', height:'20%', marginTop:0.3 * windowHeight, alignItems:'center'}}>
                        {/* Tài khoản */}
                        <View style={{ width:'70%', height:40,flexDirection:'row',  alignItems:'center', justifyContent:'space-between', marginBottom:15}}>
                            <Text style={{color:'white'}}>Account </Text>
                            <TextInput value={account} onChangeText={setaccount} style={{color:'white',width:'70%',borderBottomWidth:1, borderColor:'white'}}  />
                        </View>
                        {/* Mật khẩu */}
                        <View style={{ width:'70%', height:40,flexDirection:'row',  alignItems:'center', justifyContent:'space-between', marginBottom:15}}>
                            <Text style={{color:'white'}}>Password </Text>
                            <TextInput value={password} onChangeText={setpassword} style={{ color:'white',width:'70%',borderBottomWidth:1, borderColor:'white', paddingRight:'30%'}} 
                                secureTextEntry={getPassVisibile? false : true} />
                            <TouchableOpacity style={{height:'60%', width:25, position:'absolute', right:0}}
                                onPress={()=>{
                                    setPassVisibile(!getPassVisibile)
                                }}
                            >

                                <Image source={require('../images/eye-24.png')} style={{width:'100%', height:'100%'}} resizeMode="contain"/>

                            </TouchableOpacity>
                        </View>

                        {/* Mật khẩu Again  */}
                        <View style={{ width:'70%', height:40,flexDirection:'row',  alignItems:'center', justifyContent:'space-between'}}>
                            <Text style={{color:'white'}}>Again </Text>
                            <TextInput value={password1} onChangeText={setpassword1} style={{ color:'white',width:'70%',borderBottomWidth:1, borderColor:'white', paddingRight:'30%'}} 
                                secureTextEntry={getPassVisibile1? false : true} />
                            <TouchableOpacity style={{height:'60%', width:25, position:'absolute', right:0}}
                                onPress={()=>{
                                    setPassVisibile1(!getPassVisibile1)
                                }}
                            >

                                <Image source={require('../images/eye-24.png')} style={{width:'100%', height:'100%'}} resizeMode="contain"/>

                            </TouchableOpacity>
                        </View>
                        <View style={{ width:'70%', height:40,flexDirection:'row',  alignItems:'center', justifyContent:'space-between', marginTop: 10,}}>
                            <Text style={{color:'white'}}>You are admin ?</Text>
                            <Switch
                                trackColor={'#ccc'}
                                thumbColor={isEnabled ? 'cyan' : 'green'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        
                       
                    </View>
                    {/* Nút bấm */}
                    <View style={{ width:'100%', height:'20%', marginTop:0.28 * windowHeight, alignItems:'center'}}>
                        

                        <TouchableOpacity onPress={doSignUp}  style={{width:'40%', height:'40%', borderColor:'white',  borderWidth:1, alignItems:'center', justifyContent: 'center',borderRadius:20, backgroundColor:'#CC99CC'}}>
                            <Text style={{color:'white', fontSize:17}}>Sign up</Text>
                        </TouchableOpacity>
                        <Text style={{marginTop: 20,textDecorationLine:"underline", color:'white'}} onPress={()=> props.navigation.popToTop()}>You have a account ?</Text>

                
                    </View>
                    
                    
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
export default SignUp;