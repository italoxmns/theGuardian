import React from 'react';
import { Text } from 'react-native';

export class MonoText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono', fontSize: 20, fontWeight:'600' , alignContent: 'center', paddingTop: 10}]} />;
  }
}
