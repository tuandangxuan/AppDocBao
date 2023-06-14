import { Button, Text, TouchableOpacity, View, FlatList, ScrollView, Image, TouchableHighlight, Alert , Modal} from "react-native";
import React from 'react'
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import st from "./style";
import AddBaiViet from "./AddBaiViet";
import UpdateBaiViet from "./UpdateBaiViet";
import Comment from "./Comment";
const Home = (props) => {

  const [isLoading, setisLoading] = useState(true);
  const [dsbv, setdsbv] = useState([]);
  const [ten, setten] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  //hàm load bài viết



  const getListBV = async () => {
    let api_url = "http://192.168.31.108:3000/news?_expand=cat"

    try {
      const response = await fetch(api_url);// load dữ liệu
      const json = await response.json();// chuyển dl thành json

      setdsbv(json)// đổ dl vào state

    } catch (error) {
      console.error(error);
    } finally {
      // kết thúc quá trình load dữ liệu, có lỗi cũng gọi vào lệnh này
      setisLoading(false);// trạng thái khoogn còn load
    }
  }
  const addlike = () => {
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

  const renderBaiViet = ({ item }) => {
    const addlike = () => {
      
      
      let apii = "http://192.168.31.108:3000/news/"+item.id;

      fetch(apii, {
          method: 'PATCH',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(
              {
                "luotLike": item.luotLike+1 
              }
          )
      })
          .then((res) => {
              console.log(res);

              if (res.status == 200) {
                  // alert("done")
                  console.log("Like thành công");
                  getListBV();
                  
              } else alert('like thất bại')
          })
          .catch((err) => { console.log(err); })
          
  }

    const XoaBV = () => {
      if (props.route.params.roleFromHomeTab == true) {
        Alert.alert(
          'Confirm',
          'You are sure?',
          [
            // mảng nút bấm
            {
              text: 'OK',
              onPress: () => {
                let apii = "http://192.168.31.108:3000/news/"
                fetch(apii + item.id, {
                  method: 'DELETE',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: ""
                })
                  .then((res) => {
                    console.log(res);

                    if (res.status == 200) {
                      alert("Xóa thành công");
                      getListBV;
                    } else alert("thất bại")
                  })
                  .catch((err) => { console.log(err); })

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

      } else alert("Bạn không có quyền xóa bài")

      setModalVisible(false)



    }
    return (
      <View style={st.khungBaiViet}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: 'red' }}>Chủ đề : {item.cat.name}</Text>
          {
            props.route.params.roleFromHomeTab ?
              <View>
                <TouchableOpacity onPress={()=>setModalVisible(true)}>
                <Text style={{fontSize:30}}>...</Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(false);
                }}
              >
                <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                  <View style={{width:'30%',backgroundColor:'#FFFFCC',justifyContent: 'center',alignItems:"center", flexDirection:'column', height:100,}}>
                    <TouchableHighlight style={{height:30, borderBottomWidth:1, padding:5}} onPress={() => setModalVisible(false)}  >
                      <UpdateBaiViet idFromHome={item.id} roleFromHome={props.route.params.roleFromHomeTab} titleFromHome={item.title} contentFromHome={item.content} authorFromHome={item.author} imageFromHome={item.image} valueFromHome={item.cat.id}/>
                      
                    </TouchableHighlight>
                    <TouchableHighlight style={{height:30, borderBottomWidth:1, padding:5}} onPress={XoaBV}>
                      <Text >Xóa bài</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={{height:30, padding:5}} onPress={() => setModalVisible(false)}>
                      <Text>Đóng</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
              
              </View>
              
              : null
          }

        </View>

        <Text style={{ fontSize: 20, fontStyle: "italic", marginLeft: 30, textDecorationLine: "underline", marginBottom: 10 }}>{item.author}</Text>

        <View style={{ alignItems: "center", justifyContent: 'center', height: 20, marginBottom: 10, }}>
          <Text style={{ color: '#669966', fontSize: 15 }}>{item.title}</Text>
        </View>
        <Text>{item.content}</Text>
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: item.image }} style={{ width: 300, height: 200, margin: 10, }} />
        </View>
        {/* <TouchableOpacity style={st.nutXoa}  onPress={XoaBV}>
                    <Text style={{fontSize:10}}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={st.nutSua}  onPress={()=>{props.navigation.navigate('UpdateBaiViet',{_id:item.id,tit:item.title})}}>
                    <Text style={{fontSize:10}}>Sửa</Text>
                </TouchableOpacity> */}
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={addlike} style={st.binhluan_follow}>
            
            <Text>Like {item.luotLike}</Text>
            
          </TouchableOpacity>

          <TouchableOpacity style={st.binhluan_follow}>
            <Comment idNewFromHome={item.id} taikhoanFromHome={props.route.params.tkFromHomeTab} />
          </TouchableOpacity>
        </View>


      </View>
    );

  }
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something
      getListBV();
    });

    return unsubscribe;
  }, [props.navigation]);




  const handleRefresh = () => {
    setisLoading(true);
    // Thực hiện các tác vụ khi người dùng vuốt từ trên xuống ở đây
    console.log("Vuốt trên xuống");

    setisLoading(false);
  };






  return (
    <View>
      <View style={st.header}>

        <TouchableOpacity onPress={getListBV} style={st.khungnew} activeOpacity={0.6} underlayColor="pink"><Text>News</Text></TouchableOpacity>
        {
          props.route.params.roleFromHomeTab ?
            <View style={st.nutbamAdd}>
              <AddBaiViet roleFromHome={props.route.params.roleFromHomeTab} />
            </View>

            : <View style={st.nutbamAdd}>
                <Text>Viewer</Text>
              </View>
        }



      </View>

      {/* <ScrollView style={st.KhungDSSP}
         showsVerticalScrollIndicator={false}
         onRefresh={() => handleRefresh()}
         refreshing={isLoading}
        >


        {
          (isLoading) ? (
            <ActivityIndicator />
          ) :
            <FlatList data={dsbv}
              keyExtractor={(item) => { return item.id }}
              renderItem={renderBaiViet} />
        }

      </ScrollView> */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView
          contentContainerStyle={st.KhungDSSP}
          showsVerticalScrollIndicator={false}
          onRefresh={() => handleRefresh()}
          refreshing={isLoading}
        >
          <FlatList data={dsbv}
              keyExtractor={(item) => { return item.id }}
              renderItem={renderBaiViet} />

        </ScrollView>
      )}

    </View>

  );
}

export default Home;
