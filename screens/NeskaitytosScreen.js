import React, { Component } from 'react';
import { CheckBox, Button } from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
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

export default class NeskaitytosScreen extends React.Component{

    static navigationOptions = {
        alignItems: 'center',
        title: 'Knygu app'
    };

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
        drawerLabel: 'Neskaitytos knygos',
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
                    title='PARODYTI NESKAITYTA' />

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
                
                <Button
                 onPress={this.changeData}
                    raised
                    paddingBottom = '25'
                    backgroundColor= '#51ff68'
                    icon={{name: 'plus', type: 'font-awesome'}}
                    title='Jau perskaiciau' />

            </View>
            </ScrollView>
        );
    }

    displayData = async () => {
        try{
            let info = await AsyncStorage.getItem('knyga');
            let infoIskaidyta = JSON.parse(info);
            if(infoIskaidyta.skaityta == true){
                this.setState({pavadinimas: "Knyga perskaityta"})
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

    changeData = async () => {
        let info = await AsyncStorage.getItem('knyga');
        let infoIskaidyta = JSON.parse(info);
        let knygosInfo = {
            pavadinimas: infoIskaidyta.pavadinimas,
            autorius: infoIskaidyta.autorius,
            metai: infoIskaidyta.metai,
            puslapiai: infoIskaidyta.metai,
            skaityta: true
        }
        AsyncStorage.setItem('knyga',JSON.stringify(knygosInfo));
        this.setState({pavadinimas: "Knyga perskaityta"})
        this.setState({autorius: "--------------"})
        this.setState({metai: "--------------"})
        this.setState({puslapiai: "--------------"})
        const {navigate} = this.props.navigation;
        Alert.alert(
            'Perskaityta!',
            'Knyga pavadinimu: ' + '"'+ knygosInfo.pavadinimas + '"' + ' perkelta i skilti "Perskaitytos knygos"',
            [
              {text: 'OK', onPress: () => navigate('PerskaitytosScreen')},
            ],
            { cancelable: false }
          )
    }

}
