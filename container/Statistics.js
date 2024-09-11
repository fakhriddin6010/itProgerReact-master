import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PieChart } from 'react-native-svg-charts';
import { G, Text as SVGText } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';

// Get current year and month
const getCurrentMonth = () => {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
};

// Mock API response as per the screenshot, now with prices included
const getMockConsumptionRecords = (deviceId, year, month) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = [
        { consumptionType: 'CONSUMED', foodName: 'Apple', quantity: 5, price: 1000 },
        { consumptionType: 'DISCARDED', foodName: 'Banana', quantity: 3, price: 1500 },
        { consumptionType: 'CONSUMED', foodName: 'Milk', quantity: 2, price: 2000 },
        { consumptionType: 'DISCARDED', foodName: 'Bread', quantity: 1, price: 800 },
        { consumptionType: 'DISCARDED', foodName: 'Melon', quantity: 17, price: 500 },
        { consumptionType: 'CONSUMED', foodName: 'Orange', quantity: 2, price: 1200 }
      ];
      resolve(mockData);
    }, 1000);
  });
};

// Function to generate random colors for PieChart
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Filter records based on consumption type (소비, 폐기)
const filterRecords = (data, selectedType) => {
  return data.filter(item => (selectedType ? item.consumptionType === selectedType : true));
};

export default function InquiryScreen({ route }) {
  const [consumptionData, setConsumptionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth().month);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTab, setSelectedTab] = useState('전제');  // Default tab to 전제 (Total)
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchData(selectedMonth, selectedType);
  }, [selectedMonth, selectedType, selectedTab]);

  const fetchData = async (month, consumptionType) => {
    const { year } = getCurrentMonth();
    const data = await getMockConsumptionRecords('device123', year, month);
    setConsumptionData(data);
    const filtered = filterRecords(data, consumptionType);
    setFilteredData(filtered);
    console.log("API response: ", data); // Log the API response in the console
  };

  const handleFilterChange = (newMonth) => {
    setSelectedMonth(newMonth);
    fetchData(newMonth, selectedType);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === '전제') {
      setSelectedType(null);
    } else if (tab === '소비') {
      setSelectedType('CONSUMED');
    } else if (tab === '폐기') {
      setSelectedType('DISCARDED');
    }
  };

  const getCurrentTabData = () => {
    return filteredData;
  };

  // PieChart Labels
  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
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
  };

  const currentTabData = getCurrentTabData();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>통계 및 조회</Text>

      {/* Month Picker */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>월을 선택하세요:</Text>
        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={(itemValue) => handleFilterChange(itemValue)}
        >
          {[...Array(12).keys()].map(i => (
            <Picker.Item key={i} label={`${i + 1}월`} value={i + 1} />
          ))}
        </Picker>
      </View>

      {/* Tab Selection */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === '전제' && styles.activeTabButton]}
          onPress={() => handleTabChange('전제')}
        >
          <Text style={styles.tabText}>전제</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === '소비' && styles.activeTabButton]}
          onPress={() => handleTabChange('소비')}
        >
          <Text style={styles.tabText}>소비</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === '폐기' && styles.activeTabButton]}
          onPress={() => handleTabChange('폐기')}
        >
          <Text style={styles.tabText}>폐기</Text>
        </TouchableOpacity>
      </View>

      {/* If no data available */}
      {currentTabData.length === 0 ? (
        <Text style={styles.noDataText}>데이터가 없습니다</Text>
      ) : (
        <View>
          {/* PieChart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>{selectedTab} 차트</Text>
            <PieChart
              style={{ height: 250 }}
              data={currentTabData.map(item => ({
                key: item.foodName,
                value: item.quantity,
                svg: { fill: getRandomColor() }
              }))}
              innerRadius="50%"
              outerRadius="90%"
              labelRadius="110%"
            >
              <Labels />
            </PieChart>
          </View>

          {/* Styled List of items with quantity and price */}
          <Text style={styles.chartTitle}>{selectedTab} 목록</Text>
          <FlatList
            data={currentTabData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>
                  {item.foodName}: {item.quantity} 단위
                </Text>
                <Text style={styles.listItemCost}>가격: {item.price}원</Text>
              </View>
            )}
            ListFooterComponent={<View style={{ height: 100 }} />}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  activeTabButton: {
    backgroundColor: '#888',
  },
  tabText: {
    fontSize: 16,
    color: '#fff',
  },
  chartContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#FF6347',
    textAlign: 'center',
    marginVertical: 20,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  listItemCost: {
    fontSize: 14,
    fontWeight: '400',
    color: '#444',
    marginTop: 5,
  },
});
