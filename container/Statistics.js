import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Line, Circle, Text as SVGText } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';

export default function StatisticsScreen({ route }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [consumptionData, setConsumptionData] = useState([]);
  const [disposalData, setDisposalData] = useState([]);
  const [costData, setCostData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const fetchData = () => {
    const consumption = [
      { key: 1, amount: 66.9, svg: { fill: '#600080' }, label: '채소' },
      { key: 2, amount: 19.8, svg: { fill: '#9900cc' }, label: '과일' },
      { key: 3, amount: 9.5, svg: { fill: '#c61aff' }, label: '유제품' },
      { key: 4, amount: 3.8, svg: { fill: '#d966ff' }, label: '기타' },
    ];

    const disposal = [
      { key: 1, amount: 45.3, svg: { fill: '#ff0000' }, label: '채소' },
      { key: 2, amount: 30.5, svg: { fill: '#ff6666' }, label: '과일' },
      { key: 3, amount: 15.2, svg: { fill: '#ff9999' }, label: '유제품' },
      { key: 4, amount: 9.0, svg: { fill: '#ffcccc' }, label: '기타' },
    ];

    const cost = [
      { key: 1, amount: 50.0, svg: { fill: '#008080' }, label: '채소' },
      { key: 2, amount: 25.0, svg: { fill: '#66b2b2' }, label: '과일' },
      { key: 3, amount: 15.0, svg: { fill: '#99cccc' }, label: '유제품' },
      { key: 4, amount: 10.0, svg: { fill: '#cce6e6' }, label: '기타' },
    ];

    setConsumptionData(consumption);
    setDisposalData(disposal);
    setCostData(cost);
  };

  const data = [consumptionData, disposalData, costData][selectedIndex];

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, data } = slice;
      return (
        <G key={index}>
          <Line
            x1={labelCentroid[0]}
            y1={labelCentroid[1]}
            x2={labelCentroid[0]}
            y2={labelCentroid[1]}
            stroke={data.svg.fill}
          />
          <Circle
            cx={labelCentroid[0]}
            cy={labelCentroid[1]}
            r={15}
            fill="white"
          />
          <SVGText
            x={labelCentroid[0]}
            y={labelCentroid[1]}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={10}
            stroke={data.svg.fill}
            fill={data.svg.fill}
          >
            {data.amount}%
          </SVGText>
        </G>
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>통계</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="소비"
          onPress={() => setSelectedIndex(0)}
          color={selectedIndex === 0 ? '#ff6347' : '#ccc'}
        />
        <Button
          title="배출"
          onPress={() => setSelectedIndex(1)}
          color={selectedIndex === 1 ? '#6a1b9a' : '#ccc'}
        />
        <Button
          title="비용"
          onPress={() => setSelectedIndex(2)}
          color={selectedIndex === 2 ? '#1e88e5' : '#ccc'}
        />
      </View>
      <PieChart
        style={{ height: 200 }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        spacing={0}
        outerRadius={'95%'}
      >
        <Labels />
      </PieChart>
      <View style={styles.legendContainer}>
        {data.map((item) => (
          <View key={item.key} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.svg.fill }]} />
            <Text style={styles.legendLabel}>{item.amount}% {item.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  legendContainer: {
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 16,
    color: '#555',
  },
});
