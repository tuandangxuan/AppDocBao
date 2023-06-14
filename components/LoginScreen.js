import React, { useState } from 'react';
import { View ,Text, TextInput, ImageBackground, SafeAreaView, Dimensions,TouchableOpacity,Image} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login=(props)=>{
    const [getPassVisibile, setPassVisibile] = useState(false);
    const [account, setaccount] = useState("");
    const [password, setpassword] = useState("");


    const doLogin = ()=>{
        if (account.length==0){
            alert("chưa nhập tài khoản"); return;
        }
        if(password.length==0){
            alert("Chưa nhập mật khẩu"); return;
        }
        // link api check login
        let url_check_login = 'http://192.168.31.108:3000/users?taikhoan='+account;
        fetch(url_check_login)
        .then((res)=> {return res.json()  })
        .then ( async (arr_user)=>{
            if(arr_user.length != 1){
                alert ("Không tồn tại username hoặc CSDL bị trùng lặp");
                return;
            }


            let objU = arr_user[0];
            if(objU.passw != password ){
                alert("Sai password");  return;
            }
            // đến dưới này là đúng thông tin người dùng==> ghi vào storage
           
            try {
                await AsyncStorage.setItem('loginInfo',   JSON.stringify(objU)   );
                console.log("Ghi dữ liệu thành công");
                props.navigation.navigate('HomeTab', {aidi: objU.id, quyen:objU.role, taikhoan:objU.taikhoan, matkhau:objU.passw });
              } catch (e) {
                // saving error
                console.log(e);
              }
 


        })
        .catch ( (err) =>{
            console.log(err);
        })
       
    }
    const GoSignUp=()=>{
        props.navigation.navigate('SignUp');
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
                        <View style={{ width:'70%', height:40,flexDirection:'row',  alignItems:'center', justifyContent:'space-between'}}>
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
                       
                    </View>
                    {/* Nút bấm */}
                    <View style={{ width:'100%', height:'20%', marginTop:0.28 * windowHeight, alignItems:'center', justifyContent:'space-between'}}>
                        <TouchableOpacity style={{width:'40%', height:'40%', borderColor:'white',  borderWidth:1, backgroundColor:'#33CCFF', alignItems:'center', justifyContent: 'center',borderRadius:20}}
                        onPress={doLogin}
                        >
                            <Text style={{color:'white', fontSize:17}}>Sign in</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={GoSignUp}  style={{width:'40%', height:'40%', borderColor:'white',  borderWidth:1, alignItems:'center', justifyContent: 'center',borderRadius:20, backgroundColor:'#CC99CC'}}>
                            <Text style={{color:'white', fontSize:17}}>Sign up</Text>
                        </TouchableOpacity>

                
                    </View>
                    
                    
                </View>
            </SafeAreaView>
        </ImageBackground>
    );

}

export default Login;
