import React, { Component } from 'react';
import { CheckBox, Button } from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from 'react-native';

export default class PerskaitytosScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            pavadinimas: 'Knygos pavadinimas',
            autorius: 'Autorius',
            metai: 'Metai',
            puslapiai: 'Puslapiai',
            checked: false,
        };
      }

    static navigationOptions = {
        drawerLabel: 'Perskaitytos knygos',
        drawerIcon: ({ tintColor, focused }) => (
            <Ionicons
              name={focused ? 'ios-eye' : 'ios-eye'}
              size={20}
              style={{ color: tintColor }}
            />
          ),
    };
    render(){
        
        return(
            <ScrollView style={{ backgroundColor: '#6495ed' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
             
            <Text style={{color:'#98b3d3', fontSize:32, fontWeight: 'bold',paddingTop: 15}}>
                </Text>

            <Button
                 onPress={this.displayData}
                    raised
                    backgroundColor= '#51edff'
                    icon={{name: 'eye', type: 'font-awesome'}}
                    title='PARODYTI PERSKAITYTA' />

                <Text style={{color:'#98b3d3', fontSize:32, fontWeight: 'bold',paddingTop: 15}}>
                 KNYGOS PAVADINIMAS
                </Text>
                <Text style={{color:'#ffffff',fontSize:22, fontWeight: 'bold',paddingTop: 5}}>
                {this.state.pavadinimas}
                </Text>
                
                <Text style={{color:'#98b3d3', fontSize:32, fontWeight: 'bold',paddingTop: 15}}>
                KNYGOS AUTORIUS
                </Text>
                <Text style={{color:'#ffffff',fontSize:22, fontWeight: 'bold',paddingTop: 5}}>
                {this.state.autorius}
                </Text>
                
                <Text style={{color:'#98b3d3', fontSize:32, fontWeight: 'bold',paddingTop: 15}}>
                LEIDIMO METAI
                </Text>
                <Text style={{color:'#ffffff',fontSize:22, fontWeight: 'bold',paddingTop: 5}}>
                {this.state.metai}
                </Text>
               
                <Text style={{color:'#98b3d3', fontSize:32, fontWeight: 'bold',paddingTop: 15}}>
                PUSLAPIU KIEKIS
                </Text>
                <Text style={{color:'#ffffff',fontSize:22, fontWeight: 'bold',paddingTop: 5,paddingBottom: 20}}>
                {this.state.puslapiai}
                </Text>

            </View>
            </ScrollView>
        );
    }

    displayData = async () => {
        try{
            let info = await AsyncStorage.getItem('knyga');
            let infoIskaidyta = JSON.parse(info);
            if(infoIskaidyta.skaityta != true){
                this.setState({pavadinimas: "Knyga neperskaityta"})
                this.setState({autorius: "--------------"})
                this.setState({metai: "--------------"})
                this.setState({puslapiai: "--------------"})
            }else{
                this.setState({pavadinimas: infoIskaidyta.pavadinimas})
                this.setState({autorius: infoIskaidyta.autorius})
                this.setState({metai: infoIskaidyta.metai})
                this.setState({puslapiai: infoIskaidyta.metai})
            }
        }
        catch(err){
            alert(err);
        }
    }
}
