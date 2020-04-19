import React, { useState, useEffect } from 'react';
import { List, ListItem,  Divider, ListItemText, Typography } from '@material-ui/core';

import { fetchTopTenCountries } from '../../api';

import styles from './List.module.css';

const ListCountries = () => {
    const [dataCountries, setDataCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTopTenCountries();
            setDataCountries(data);
        };

        fetchData();
    }, [])
    return (
        <div className={styles.container}>
            <h1>Top 10 countries</h1>
            <List>
                {dataCountries.map((data) => {
                    var nf = new Intl.NumberFormat();

                    return (
                        <div>
                            <ListItem>
                                <ListItemText primary={data.country} secondary={`${nf.format(data.confirmed)} active cases`}/>
                            </ListItem>
                            <Divider />
                        </div>

                    )
                })}

            </List>
        </div>
    )
}

export default ListCountries;