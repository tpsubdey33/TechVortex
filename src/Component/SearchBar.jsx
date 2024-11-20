import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = 'https://dummyjson.com/products';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}`);
      setData(response.data.products); // Assuming data is in products
      setFilteredData(response.data.products);
    } catch (error) {
      console.log('fetchDataError::', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (Array.isArray(data)) {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <View style={styles.searchView}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#000'}
          onChangeText={handleSearch}
          value={searchText}
          style={{ flex: 1, padding: 5, height: 50 }}
        />
        <AntDesign name="search1" size={24} color="#000" />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.itemText}>{item.title}</Text>}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    width: '90%',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
