import React, { Component } from 'react';
import { CheckBox, Button } from 'react-native-elements';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

export default class PerskaitytosScreen extends Component{


    componentDidMount() {
        this.displayData
      }

    constructor(props) {
        super(props);
        this.state = {
            pavadinimas: 'ttt',
            checked: false,
        };
      }

    static navigationOptions = {
        drawerLabel: 'Perskaitytos knygos',
    };
    render(){
        return(
            <View>

                <Text style={{color:'red',}}>
                {this.state.pavadinimas}
                </Text>
                <Text style={{color:'red',}}>
                xxxxxxxxxxxxxxxxxxx
                </Text>
                <Text style={{color:'red',}}>
                xxxxxxxxxxxxxxxx
                </Text>

                

                 <Button
                 onPress={this.displayData}
                    raised
                    icon={{name: 'plus', type: 'font-awesome'}}
                    title='LARGE WITH RIGHT ICON' />
            </View>
        );
    }

    displayData = async () => {
        try{
            let info = await AsyncStorage.getItem('knyga');
            let infoIskaidyta = JSON.parse(info);
            if(infoIskaidyta.skaityta != true){
                this.setState({pavadinimas: 'Knygos neperskaitytos'})
            }else{
                this.setState({pavadinimas: infoIskaidyta.pavadinimas})
                alert(infoIskaidyta.pavadinimas + '' + infoIskaidyta.skaityta);
            }
        }
        catch(err){
            alert(err);
        }
    }

    // changeData = async () => {
    //     let info = await AsyncStorage.getItem('knyga');
    //     let infoIskaidyta = JSON.parse(info);
    //     let knygosInfo = {
    //         pavadinimas: infoIskaidyta.pavadinimas,
    //         skaityta: true
    //     }
    //     AsyncStorage.setItem('knyga',JSON.stringify(knygosInfo));
    //     this.setState({pavadinimas: 'Knygos perskaitytos'})
    // }

}
