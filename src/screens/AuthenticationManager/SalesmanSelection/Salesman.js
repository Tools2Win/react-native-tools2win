import React from 'react';
import { ListItem } from '@rneui/themed';

const Salesman = ({ salesman, selectSalesman }) => {
    const handleSalesmanSelection = async (SalesmanCode) => {
        await selectSalesman(SalesmanCode);
    };

    return (
        <ListItem key={salesman.index} bottomDivider onPress={() => handleSalesmanSelection(salesman.item.id)}>
            <ListItem.Content>
                <ListItem.Title>{salesman.item.name}</ListItem.Title>
                <ListItem.Subtitle>{salesman.item.id}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )
};

export default Salesman;