import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var tertiary = ['Cancel', 'Forgot Password'];
    var secondary = ['Create New Account'];
    var primary = ['Log In'];
    if (tertiary.indexOf(this.props.label) !== -1) {
      return (
        <View style={styles.button}>
          <TouchableHighlight
            underlayColor='#dddddd'
            onPress={ this.props.onPress }
            style={ styles.tertiary }>
            <Text style={ styles.tertiaryText }>{ this.props.label }</Text>
          </TouchableHighlight>
        </View>
      )
    } else if (secondary.indexOf(this.props.label) !== -1) {
      return (
        <View style={styles.button}>
          <TouchableHighlight
            underlayColor='#FF9D81'
            onPress={ this.props.onPress }
            style={ styles.secondary }>
            <Text style={ styles.secondaryText }>{ this.props.label }</Text>
          </TouchableHighlight>
        </View>
      )
    } else {
      return (
        <View style={styles.button}>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={ this.props.onPress }
            style={ styles.primary }>
            <Text style={ styles.primaryText }>{ this.props.label }</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }
};

var styles = StyleSheet.create({
  primary: {
    flex: 1,
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF3F4E',
    backgroundColor: '#FF3F4E'
  },
  secondary: {
    flex: 1,
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF3F4E',
    backgroundColor: 'transparent'
  },
  tertiary: {
    flex: 1,
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#aaaaaa',
    backgroundColor: 'transparent'
  },
  button: {
    height: 50,
    alignItems: 'center',
  },
  primaryText: {
    color: 'white'
  },
  secondaryText: {
    color: '#FF3F4E'
  },
  tertiaryText: {
    color: '#484848'
  }
});

export default Button;

// export default ({ label, onPress }) => (
//   <View style={{ alignItems: 'center'}}>
//     <ButtonComponent
//       style={{width: 200, height: 50}}
//       type="primary"
//       shape="round"
//       backgroundColors={['#a30180', '#f80046']}
//       gradientStart={{ x: 0.5, y: 1 }}
//       gradientEnd={{ x: 1, y: 1 }}
//       height={80}
//       onPress={ this.props.onPress }
//       text={ this.props.label }
//     >
//     </ButtonComponent>
//   </View>
// );
