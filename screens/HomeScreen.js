import React, { Component } from 'react';
import { CheckBox, Button, SearchBar } from 'react-native-elements';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
 // AsyncStorage
} from 'react-native';

export default class HomeScreen extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            pavadinimas: 'Knygos pavadinimas',
            autorius: '',
            metai: '',
            puslapiai: '',
            checked: false,
            blank: ''
        };
      }

    static navigationOptions = {
        drawerLabel: 'Ideti knyga',
    };
    render(){
        return(
            <ScrollView style={{ backgroundColor: '#6495ed' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                
                <Text style={{color:'#ffffff', fontSize:32, fontWeight: 'bold',paddingTop: 20}}>
                 IDEKITE NAUJA KNYGA
                </Text>
                <Text style={{color:'#ffffff', fontSize:22, fontWeight: 'bold',paddingTop: 20}}>
                 Knygos pavadinimas
                </Text>
                <TextInput
                 editable = {true}
                 maxLength = {20}
                 width = {300}
                 style={{height: 40, borderColor: '#c4c4c4', borderWidth: 1,borderRadius:10,}}
                 onChangeText={(pavadinimas) => this.setState({pavadinimas})}
                 />
                 
                <Text style={{color:'#ffffff', fontSize:22, fontWeight: 'bold',paddingTop: 10}}>
                 Knygos autorius
                </Text>
                <TextInput
                 editable = {true}
                 maxLength = {20}
                 width = {300}
                 style={{height: 40, borderColor: '#c4c4c4', borderWidth: 0.5,borderRadius:10,}}
                 onChangeText={(autorius) => this.setState({autorius})}
                 />

                <Text style={{color:'#ffffff', fontSize:22, fontWeight: 'bold',paddingTop: 10}}>
                 Knygos metai
                </Text>
                <TextInput
                 editable = {true}
                 maxLength = {20}
                 width = {300}
                 style={{height: 40, borderColor: '#c4c4c4', borderWidth: 0.5, borderRadius:10}}
                 onChangeText={(metai) => this.setState({metai})}
                 />

                <Text style={{color:'#ffffff', fontSize:22, fontWeight: 'bold',paddingTop: 10}}>
                 Knygos puslapiai
                </Text>
                <TextInput
                 editable = {true}
                 maxLength = {20}
                 width = {300}
                 style={{height: 40, borderColor: '#c4c4c4', borderWidth: 0.5,borderRadius:10}}
                 onChangeText={(puslapiai) => this.setState({puslapiai})}
                 />

                <CheckBox
                    title='Knyga perskaityta'
                    onPress={this.pressCheckBox}
                    checked={this.state.checked}
                 />

                 <Button
                 onPress={this.saveData}
                    raised
                    color = 'white'
                    backgroundColor = 'red'
                    icon={{name: 'plus', type: 'font-awesome'}}
                    title='PRIDETI NAUJA KNYGA' />
                 
                 

            </View>
            </ScrollView>
        );
    }

    pressCheckBox = () => {
        this.setState((state) => ({
            checked: !state.checked
        }));
    }

    saveData = () =>{
        let knygosInfo = {
            pavadinimas: this.state.pavadinimas,
            skaityta: this.state.checked
        }
       // let knygosPav = this.state.pavadinimas;
        AsyncStorage.setItem('knyga',JSON.stringify(knygosInfo));
    }

    displayData = async () => {
        try{
            let info = await AsyncStorage.getItem('knyga');
            let infoIskaidyta = JSON.parse(info);
            alert(infoIskaidyta.pavadinimas + '' + infoIskaidyta.skaityta);
        }
        catch(err){
            alert(err);
        }
    }

}
