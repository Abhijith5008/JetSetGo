import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const airlinesData = [
  { id: 1, name: 'AirAsia' },
  { id: 2, name: 'Air India' },
  { id: 3, name: 'IndiGo' },
  { id: 4, name: 'GoAir' },
  { id: 5, name: 'SpiceJet' },
  { id: 6, name: 'Vistara' },
];

const { height, width } = Dimensions.get('screen');

const AirlinePickerModal = ({ visible, onSelect, onClose }) => {

  const bottomSheetRef = useRef(null);
  const [selectedAirline, setSelectedAirline] = useState(null);

  const handleReset = () => {
    onSelect('Reset');
    setTimeout(() => onClose(), 100);
  };

  const handleAirline = (name) => {
    setSelectedAirline(name);
  };

  const handleFilter = () => {
    onSelect(selectedAirline.name);
    setTimeout(() => onClose(), 100);
  };

  const closeModal = () => {
    bottomSheetRef.current.close();
    setTimeout(() => onClose(), 100);
  };

  return (
    <BottomSheet
      handleIndicatorStyle={{ backgroundColor: "#fff" }}
      animateOnMount={true}
      enablePanDownToClose={true}
      ref={bottomSheetRef}
      onClose={closeModal}
      backgroundStyle={{ backgroundColor: "#1e2659" }}
      containerStyle={{
        backgroundColor: "#1e2659",
        marginLeft: 16,
        marginTop: height / 2.05,
        height: height / 2.2,
        width: width / 1.1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 5,
      }}
      index={visible ? 0 : 1}
      snapPoints={["100%"]}
      visibility={visible ? 'visible' : 'hidden'}
    >
      <Text style={styles.header}>Filter</Text>
      <View
        style={{
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: '#ddeaf1',
          margin: -1,
          height: 0,
          marginBottom: 0,
        }}>
        <View style={{ width: 60 }}></View>
      </View>
      <View style={styles.rowContainer}>
        {airlinesData.map((airline, index) => (
          <TouchableOpacity key={airline.id} style={styles.itemContainer} onPress={() => handleAirline(airline)}>
            <Text style={selectedAirline && selectedAirline.id === airline.id ? styles.selectedItem : styles.item}>{airline.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleFilter} disabled={!selectedAirline} style={[styles.touch]}>
          <Text style={{ color: "#1e2659", marginTop: 3, fontSize: 16, fontWeight: 500 }}>Apply Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset} style={[styles.touch]}>
          <Text style={{ color: "#1e2659", marginTop: 3, fontSize: 16, fontWeight: 500 }}>Reset</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 20,
    width: '100%',
  },
  itemContainer: {
    width: '30%',
    aspectRatio: 1,
  },
  modalContent: {
    backgroundColor: '#ddeaf1',
    borderRadius: 30,
    padding: 20,
  },
  header: {
    color: '#ddeaf1',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center",
    marginVertical: 10,
  },
  item: {
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 18,
    color: '#fff'
  },
  selectedItem: {
    textAlign: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#ddeaf1',
    color: '#1e2659'
  },
  touch: {
    alignItems: "center",
    justifyContent: 'center',
    width: width / 3.5,
    height: height / 20,
    backgroundColor: '#ddeaf1',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
});

export default AirlinePickerModal;
