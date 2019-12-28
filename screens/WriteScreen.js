import React from 'react';
import { TextInput, StyleSheet, Dimensions, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WriteHeader from '../component/WriteHeader';
import uuid from 'uuid/v1';

const { width, height } = Dimensions.get('window');

export default class WriteScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => ( 
            <MaterialCommunityIcons name='calendar-multiselect' size={25} style={{ color: tintColor }} />
        ),
        tabBarOnPress: ({ navigation }) => {
            navigation.navigate('Write');
            }            
    }

    state = {
            inputtitle :'',  
            inputcontent : '',
            imageUri: '',
        }
    _showTitle = (value) => { //todoApp을 만들때 했던것 처럼 changeText가 발생하면
        // console.log(value) //입력된 Text를 value로 받아와 setState로 state값을 변경시켜준다
        this.setState({inputtitle:value})
    }
    _showContent = (value) =>{
        
        this.setState({inputcontent:value})}

    _saveText = () =>{ 
        if(this.state.inputtitle !== ''){ 
            const id = uuid() 
            const date = this._gettoday() 
            const newpost = { 
            id : id, 
            title: this.state.inputtitle,
            content: this.state.inputcontent,
            date: date,
            imageUri: this.state.imageUri,
        }
        this.setState( 
            {
                inputtitle: '',
                inputcontent: '',
                imageUri: '',
            }
        )
        
            this.props.navigation.navigate('MainScreen',{myparam :newpost})
        
        }
        else{
        
            this.props.navigation.navigate('MainScreen')
        
        }
        }
        
    _gettoday = () => {
        
        tyear = (new Date().getFullYear()).toString()
        tmonth = (new Date().getMonth() + 1).toString()
        tday = (new Date().getDate()).toString()
    
        if (tmonth < 10) {
            tmonth = '0' + tmonth
        }
        if (tday < 10) {
            tday = '0' + tday
        }
        return (tyear + "-" + tmonth + "-" + tday)
        }
            
    _selectImage = async() =>{
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true, 
        });
        this.setState({ imageUri: result.uri }); 
        }
            

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                <WriteHeader saveProps={this._saveText} selectImage = {this._selectImage}/>  
                    <TextInput
                        value = {this.state.inputtitle} 
                        onChangeText={this._showTitle}
                        placeholder="제목을 입력하세요"
                        style={styles.title}
                        returnKeyType="done" />

                {this.state.imageUri ? <Image source={{ uri: this.state.imageUri }} style={{ width: 100, height: 100 }} /> : null} 
                      
                    <TextInput
                        value={this.state.inputcontent}
                        onChangeText={this._showContent}
                        placeholder="내용을 입력하세요"
                        multiline={true}
                        style={styles.content}
                        returnKeyType="done" />                     
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
        },
        fontcontainer: {
            fontSize: 30,
        },
    });
