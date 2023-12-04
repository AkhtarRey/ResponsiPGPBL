import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const Listdata = () => {
  const jsonUrl =
    'https://script.google.com/macros/s/AKfycbzuAepyI2PRwqprHwO2L2NJu1PPgD4GmE2AbkfnhK3Dqj8z7D2FMwt6CLHEnLZrBA4XLQ/exec';
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setDataUser(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function refreshPage() {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setDataUser(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  return (
    <SafeAreaView>
      {isLoading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={dataUser}
            onRefresh={() => {
              refreshPage();
            }}
            refreshing={refresh}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <View>
                <View style={styles.card}>
                  <View>
                    <Text style={styles.cardtitle}>{item.jenis}</Text>
                    <Text>{item.ukuran}</Text>
                    <Text></Text>
                    <Text>Kondisi Cuaca: {item.cuaca}</Text>
                    <Text></Text>
                    <Text>Jumlah Korban:</Text>
                    <Text>{item.jumlah}</Text>
                    <Text></Text>
                    <Text>Tanggal: {item.tanggal}</Text>
                    <Text>Pukul: {item.waktu}</Text>
                    <Text>
                      {item.latitude}, {item.longitude}
                    </Text>
                    <Text></Text>
                    <Text> Ancaman: {item.ancaman}</Text>
                    <Text></Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          styles.flexButton,
                          {backgroundColor: '#2ecc71'},
                        ]}
                        onPress={() =>
                          Linking.openURL(
                            'https://api.whatsapp.com/send/?phone=' +
                              item.nomor,
                          )
                        }>
                        <Icon name="phone" size={20} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.button,
                          styles.flexButton,
                          {backgroundColor: '#3498db'},
                        ]}
                        onPress={() =>
                          Linking.openURL(
                            'google.navigation:q=' +
                              item.latitude +
                              ',' +
                              item.longitude,
                          )
                        }>
                        <Icon name="map-marker" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Listdata;

const styles = StyleSheet.create({
  flexButton: {
    marginLeft: 0, // Remove left margin between buttons
  },
  button: {
    backgroundColor: '#952323',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  title: {
    paddingVertical: 12,
    backgroundColor: '#952323',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    borderRadius: 100,
    width: 80,
    borderColor: '#dad4b5',
    borderWidth: 2,
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#952323',
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f2e8c6',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginHorizontal: 20,
    marginVertical: 7,
  },
  form: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
