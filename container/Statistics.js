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

// API orqali ma'lumotni olish uchun funksiya
const fetchConsumptionDataByType = async (month, consumptionType, deviceId, setFilteredData, setLoading, setError) => {
  setLoading(true);
  setError(null);

  try {
    const response = await axios.get(`${API_BASE_URL}/api/consumption-records/${deviceId}/month/type`, {
      params: { year: 2024, month, consumptionType }
    });

    console.log('Consumption Type:', selectedType);

    const transformedData = response.data.map((item, index) => ({
      key: `${item[0]}_${index}`, 
      productName: item[0], // Noyob key: mahsulot nomi + indeks
      value: item[1],
      price: item[2], 
      svg: { fill: getRandomColor() }
    }));

    // sortedData ni tartiblaymiz
    const sortedData = [...transformedData].sort((a, b) => b.value - a.value);

    setFilteredData(sortedData); // Tartiblangan ma'lumotlar filteredData ga yuklanadi
  } catch (error) {
    console.log("Xatolik:", error); 
    setError('Ma\'lumotlarni olishda xatolik. Iltimos, qaytadan urinib ko\'ring.');
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

  // Pie chart uchun yorliq yaratish (nomlar chart ichida)
const Labels = ({ slices }) =>
  slices.map((slice, index) => {
    const { pieCentroid, data } = slice;

    // Segment hajmiga qarab shrift o'lchamini sozlash
    const fontSize = data.value < 10 ? 14 : 12; // Agar qiymat 10% dan kam bo'lsa, shriftni kattaroq qilamiz

    return (
      <G key={index}>
        <SVGText
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="white"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={fontSize} // Mahsulot nomlari segment kattaligiga qarab ko'rsatiladi
          fontWeight="bold"
        >
          {data.productName} {/* Mahsulot nomini ko'rsatish */}
        </SVGText>
      </G>
    );
  });

    const totalValue = filteredData.reduce((acc, item) => acc + item.value, 0); // Umumiy qiymat
    const PercentageList = ({ data }) => (
      <View style={{ marginLeft: 20 }}>
        {data.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: item.svg.fill, // Har bir mahsulot uchun rang
                marginRight: 10,
              }}
            />
            <Text style={{ fontSize: 14 }}>
              {item.productName} {/* Mahsulot nomi */}
            </Text>
            <Text style={{ fontSize: 14, marginLeft: 5 }}>
              {(item.value / totalValue * 100).toFixed(1)}% {/* To'g'ri foiz hisoblash */}
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
          <Text style={styles.header}>통계 및 조회</Text>
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
  analysisContainer: { marginTop: 20, padding: 10, backgroundColor: '#fff', borderRadius: 10, marginBottom: 20 },
  analysisTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  analysisText: { fontSize: 16, color: '#333' },
});

