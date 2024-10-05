import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PieChart } from 'react-native-svg-charts';
import { G, Text as SVGText } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const BASE_URL = 'http://172.17.185.199:8080/api';

// Get current year and month
const getCurrentMonth = () => {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
};

// Function to generate random colors for PieChart
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};

// Fetch consumption data filtered by type (CONSUMED or DISCARDED)
const fetchConsumptionDataByType = async (month, consumptionType, deviceId, setFilteredData, setLoading, setError) => {
  setLoading(true);
  setError(null);

  try {
    const response = await axios.get(`${BASE_URL}/consumption-records/${deviceId}/month/type`, {
      params: { year: getCurrentMonth().year, month, consumptionType }
    });

    console.log("API Response:", response.data); // API javobini konsolga chiqaramiz

    const transformedData = response.data.map(item => ({
      key: item[0],
      value: item[1],
      price: item[2] || 0,
      svg: { fill: getRandomColor() }
    }));
    
    setFilteredData(transformedData);
  } catch (error) {
    setError('Failed to fetch filtered data. Please try again.');
  } finally {
    setLoading(false);
  }
};

export default function InquiryScreen({ route }) {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth().month);
  const [selectedType, setSelectedType] = useState('CONSUMED');
  const [selectedTab, setSelectedTab] = useState('소비');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const deviceId = 'SM_N986NZNEKTC';
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchConsumptionDataByType(selectedMonth, selectedType, deviceId, setFilteredData, setLoading, setError);
  }, [selectedMonth, selectedType]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === '소비') {
      setSelectedType('CONSUMED');
    } else if (tab === '폐기') {
      setSelectedType('DISCARDED');
    }
  };

  const Labels = ({ slices }) => slices.map((slice, index) => {
    const { pieCentroid, data } = slice;
    return (
      <G key={index}>
        <SVGText
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="white"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={12}
          fontWeight="bold"
          stroke="black"
          strokeWidth={0.5}
        >
          {data.key}
        </SVGText>
      </G>
    );
  });

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={(
        <View>
          <Text style={styles.header}>통계 및 조회</Text>

          {/* Month Picker */}
          <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>월을 선택하세요:</Text>
            <Picker
              selectedValue={selectedMonth}
              style={styles.picker}
              onValueChange={setSelectedMonth}
            >
              {[...Array(12).keys()].map(i => (
                <Picker.Item key={i} label={`${i + 1}월`} value={i + 1} />
              ))}
            </Picker>
          </View>

          {/* Tab Selection */}
          <View style={styles.tabContainer}>
            {['소비', '폐기'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
                onPress={() => handleTabChange(tab)}
              >
                <Text style={styles.tabText}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : filteredData.length === 0 ? (
            <>
            {/* Terminalga ma'lumot yo'q degan habarni chiqaramiz */}
            {console.log('데이터가 없습니다')}
            <Text style={styles.noDataText}>데이터가 없습니다</Text>
          </>
          ) : (
            <View>
              {/* PieChart */}
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>{selectedTab} 차트</Text>
                <PieChart
                  style={{ height: 250 }}
                  data={filteredData}
                  innerRadius="50%"
                  outerRadius="90%"
                  labelRadius="110%"
                >
                  <Labels />
                </PieChart>
              </View>
            </View>
          )}
        </View>
      )}
      data={filteredData}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            {item.key}: {item.value} 개
          </Text>
          <Text style={styles.listItemCost}>가격: {item.price || 0}원</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  filterContainer: { marginBottom: 20 },
  filterLabel: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  picker: { height: 50, width: '100%' },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tabButton: { padding: 10, borderRadius: 8, backgroundColor: '#ddd' },
  activeTabButton: { backgroundColor: '#888' },
  tabText: { fontSize: 16, color: '#fff' },
  chartContainer: { marginBottom: 20, padding: 10, backgroundColor: '#fff', borderRadius: 10 },
  chartTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  noDataText: { fontSize: 18, color: '#FF6347', textAlign: 'center', marginVertical: 20 },
  listItem: { padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10 },
  listItemText: { fontSize: 16, fontWeight: '600' },
  listItemCost: { fontSize: 14, color: '#444', marginTop: 5 },
  errorText: { color: 'red', textAlign: 'center', marginVertical: 20 },
});
