import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

const INITIAL_STATE = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  state = { ...INITIAL_STATE }

  addDigit = (n) => {
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return;
    }
    
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;
    
    this.setState({ displayValue, clearDisplay: false });

    if (n !== '.') {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[this.state.current] = newValue;
      this.setState({ values });
    }
  }

  clearMemory = (n) => {
    this.setState({ ...INITIAL_STATE });
  }

  setOperation = (operation) => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === '=';
      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      })
    }
  }

  render() {
    const { displayValue } = this.state;
    const { clearMemory, setOperation, addDigit } = this;

    return (
      <>
        <View style={styles.container}>
          <Display value={displayValue} />
          <View style={styles.buttons}>
            <Button label="AC" triple onClick={clearMemory} />
            <Button label="/" operation onClick={setOperation} />
            <Button label="7" onClick={addDigit} />
            <Button label="8" onClick={addDigit} />
            <Button label="9" onClick={addDigit} />
            <Button label="*" operation onClick={setOperation} />
            <Button label="4" onClick={addDigit} />
            <Button label="5" onClick={addDigit} />
            <Button label="6" onClick={addDigit} />
            <Button label="-" operation onClick={setOperation} />
            <Button label="1" onClick={addDigit} />
            <Button label="2" onClick={addDigit} />
            <Button label="3" onClick={addDigit} />
            <Button label="+" operation onClick={setOperation} />
            <Button label="0" double onClick={addDigit} />
            <Button label="." onClick={addDigit} />
            <Button label="=" operation onClick={setOperation} />
          </View>
        </View>
      </>
    );
  }
}
