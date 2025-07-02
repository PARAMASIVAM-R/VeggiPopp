import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const App = () => {
  const customDataPoint = () => (
    <View
      style={{
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#07BAD1',
      }}
    />
  );

  const customLabel = val => (
    <View style={{ width: 70, marginLeft: 7 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{val}</Text>
    </View>
  );

  const data = [
    { value: 100, labelComponent: () => customLabel('22 Nov'), customDataPoint },
    { value: 140, hideDataPoint: true },
    { value: 250, customDataPoint },
    { value: 290, hideDataPoint: true },
    {
      value: 410,
      labelComponent: () => customLabel('24 Nov'),
      customDataPoint,
      showStrip: true,
      stripHeight: 190,
      stripColor: 'black',
      dataPointLabelComponent: () => (
        <View style={styles.dataLabel}>
          <Text style={{ color: 'white' }}>410</Text>
        </View>
      ),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: -4,
    },
    { value: 440, hideDataPoint: true },
    { value: 300, customDataPoint },
    { value: 280, hideDataPoint: true },
    { value: 180, labelComponent: () => customLabel('26 Nov'), customDataPoint },
    { value: 150, hideDataPoint: true },
    { value: 150, customDataPoint },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <LineChart
          data={data}
          thickness={6}
          color="#07BAD1"
          maxValue={600}
          noOfSections={3}
          curved
          areaChart
          yAxisTextStyle={{ color: 'lightgray' }}
          startFillColor="rgb(84,219,234)"
          endFillColor="rgb(84,219,234)"
          startOpacity={0.4}
          endOpacity={0.4}
          spacing={50}
          initialSpacing={20}
          yAxisColor="lightgray"
          xAxisColor="lightgray"
          backgroundColor="#414141"
          rulesColor="gray"
          rulesType="solid"
          dataPointsHeight={20}
          dataPointsWidth={20}
          width={data.length * 60} // key for scrollable width
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#414141',
    paddingTop: 100,
    paddingBottom: 50,
  },
  dataLabel: {
    backgroundColor: 'black',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
  },
});

export default App;
