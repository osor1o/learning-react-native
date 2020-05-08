import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import params from './src/params';
import Field from './src/components/Field';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Start Minefield!</Text>
      <Text style={styles.instructions}>
        Grid Dimension
        {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>
      <Field />
      <Field opened />
      <Field opened nearMines={1} />
      <Field opened nearMines={2} />
      <Field opened nearMines={3} />
      <Field opened nearMines={6} />
      <Field mined />
      <Field opened mined />
      <Field opened mined exploded />
      <Field flagged />
      <Field flagged opened />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  }
});

export default App;
