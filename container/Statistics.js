import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PieChart } from 'react-native-svg-charts';
import { G, Text as SVGText } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';
import * as Device from 'expo-device';
import axios from 'axios';
import API_BASE_URL from './config';

const getCurrentMonth = () => {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
};

export default function InquiryScreen({ route }) {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth().month);
  const [selectedType, setSelectedType] = useState('CONSUMED');
  const [selectedTab, setSelectedTab] = useState('소비');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [consumptionAnalysis, setConsumptionAnalysis] = useState('');
  const [wasteAnalysis, setWasteAnalysis] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const getDeviceId = () => {
      const id = Device.modelId || Device.osInternalBuildId || 'unknown-device';
      setDeviceId(id);
    };
    getDeviceId();
  }, []);

  useEffect(() => {
    if ((route.params?.refresh || isFocused) && deviceId) {
      fetchConsumptionDataByType(selectedMonth, selectedType, deviceId, setFilteredData, setLoading, setError);
      if (selectedType === 'CONSUMED') {
        fetchConsumptionAnalysis(selectedMonth, deviceId);
      } else if (selectedType === 'DISCARDED') {
        fetchWasteAnalysis(selectedMonth, deviceId);
      }
    }
  }, [route.params?.refresh, isFocused, selectedMonth, selectedType, deviceId]);

  const fetchConsumptionAnalysis = async (month, deviceId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/consumption-records/${deviceId}/month/consumption-analysis`, {
        params: { year: 2024, month }
      });
      setConsumptionAnalysis(response.data);
    } catch (error) {
      console.error('소비 분석 오류:', error);
    }
  };

  const fetchWasteAnalysis = async (month, deviceId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/consumption-records/${deviceId}/month/waste-analysis`, {
        params: { year: 2024, month }
      });
      setWasteAnalysis(response.data);
    } catch (error) {
      console.error('폐기 분석 오류:', error);
    }
  };

  const fetchConsumptionDataByType = async (month, consumptionType, deviceId, setFilteredData, setLoading, setError) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/api/consumption-records/${deviceId}/month/type`, {
        params: { year: 2024, month, consumptionType }
      });

      console.log('소비 유형:', selectedType);

      const transformedData = response.data.map((item, index) => ({
        key: `${item[0]}_${index}`,
        productName: item[0], // 고유 key: 제품명 + 인덱스
        value: item[1],
        price: item[2],
        svg: { fill: getRandomColor() }
      }));

      const sortedData = [...transformedData].sort((a, b) => b.value - a.value);

      setFilteredData(sortedData);
    } catch (error) {
      console.log("데이터 가져오는 중 오류:", error);
      setError('데이터를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === '소비') {
      setSelectedType('CONSUMED');
    } else if (tab === '폐기') {
      setSelectedType('DISCARDED');
    }
  };

  const Labels = ({ slices }) =>
    slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      const fontSize = data.value < 10 ? 11 : 12;

      return (
        <G key={index}>
          <SVGText
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={fontSize}
            fontWeight="bold"
          >
            {data.productName}
          </SVGText>
        </G>
      );
    });

  const totalValue = filteredData.reduce((acc, item) => acc + item.value, 0);

  const PercentageList = ({ data }) => (
    <View style={{ marginLeft: 20 }}>
      {data.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: item.svg.fill,
              marginRight: 10,
            }}
          />
          <Text style={{ fontSize: 14 }}>
            {item.productName}
          </Text>
          <Text style={{ fontSize: 14, marginLeft: 5 }}>
            {(item.value / totalValue * 100).toFixed(1)}%
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
      ListHeaderComponent={(
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>통계 및 조회</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.filterLabel }>월을 선택하세요:</Text>
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
            <Text style={styles.noDataText}>데이터가 없습니다</Text>
          ) : (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <PieChart
                  style={{ height: 250, flex: 1 }}
                  data={filteredData}
                  innerRadius="50%"
                  outerRadius="90%"
                  labelRadius="110%"
                >
                  <Labels />
                </PieChart>
                <PercentageList data={filteredData} />
              </View>
              {selectedType === 'CONSUMED' && consumptionAnalysis && (
                <View style={styles.analysisContainer}>
                  <Text style={styles.analysisTitle}>소비 분석</Text>
                  <Text style={styles.analysisText}>{consumptionAnalysis}</Text>
                </View>
              )}
              {selectedType === 'DISCARDED' && wasteAnalysis && (
                <View style={styles.analysisContainer}>
                  <Text style={styles.analysisTitle}>폐기 분석</Text>
                  <Text style={styles.analysisText}>{wasteAnalysis}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      )}
      data={filteredData}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            {item.productName}: {item.value} 개
          </Text>
          <Text style={styles.listItemCost}>가격: {item.price || 0}원</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 20, backgroundColor: '#f5f5f5' },
  headerContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  pickerContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center'
  },
  filterLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 5},
  picker: { height: 30, width: '60%', marginBottom:9 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tabButton: { padding: 10, borderRadius: 8, backgroundColor: '#ddd' },
  activeTabButton: { backgroundColor: '#888' },
  tabText: { fontSize: 16, color: '#fff' },
  analysisContainer: { marginTop: 20, padding: 10, backgroundColor: '#fff', borderRadius: 10, marginBottom: 20 },
  analysisTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  analysisText: { fontSize: 16, color: '#333' },
  noDataText: { fontSize: 18, color: '#FF6347', textAlign: 'center', marginVertical: 20 },
  listItem: { padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10 },
  listItemText: { fontSize: 16, fontWeight: '600' },
  listItemCost: { fontSize: 14, color: '#444', marginTop: 5 },
  errorText: { color: 'red', textAlign: 'center', marginVertical: 20 },
});
