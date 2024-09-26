import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SearchBar, Button, Image, Text } from '@rneui/themed';
import { useSalesmanSelection } from '../../../../hooks/useSalesmanSelection';
import Salesman from './Salesman';
import View from '../../../components/View';
const art = require('../../../../assets/art_salesperson.jpg');

const SalesmanSelection = () => {
    const { salesmen, loading, selectSalesman } = useSalesmanSelection();
    const [enteredSalesmanName, setEnteredSalesmanName] = useState('');

    const filteredSalesmen = enteredSalesmanName ? salesmen.filter(salesman => salesman.name.toUpperCase().includes(enteredSalesmanName.toUpperCase())) : salesmen;

    return (
        <View>
            <Image source={art} />
            <Text h4>Are you a Salesperson?</Text>
            <SearchBar
                placeholder="Search"
                onChangeText={setEnteredSalesmanName}
                value={enteredSalesmanName}
                disabled={loading}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}
            />
            <FlatList
                data={filteredSalesmen}
                renderItem={(salesman) => <Salesman salesman={salesman} selectSalesman={selectSalesman} />}
                keyExtractor={(item) => item.SalesmanCode}
            />
            <Button title='No' onPress={() => selectSalesman('SKIPPED')} disabled={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginBottom: 10
    },
    searchBarInputContainer: {
        backgroundColor: '#e8e8e8'
    },
});

export default SalesmanSelection;
