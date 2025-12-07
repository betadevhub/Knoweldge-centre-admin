

import { BiSearch } from 'react-icons/bi';
import QueryCardWrapper from '../../wrappers/QueryCardWrapper';
import classes from './QueryCard.module.css';
import type { INPUT_CARD } from './types';
import { useEffect, useState } from 'react';


export default function SearchCard(params: INPUT_CARD) {
    const [value, setValue] = useState(params.value);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        params.handleFilterChange('search', String(value))
    }

    useEffect(() => {
        if (!value) {
            params.handleFilterChange('search', String(value))
        }
    }, [value])


    return (
        <QueryCardWrapper>
            <form className={classes.form}>
                <input name={params.name} value={value} onChange={handleChange} inputMode={params?.inputMode ? params.inputMode : 'none'} className={classes.input} placeholder={params.placeholder} type='text' />
                <div className={classes.formSeparator} />

                <button onClick={handleSearch} className={classes.formSearchButton}>
                    <BiSearch className={classes.formSearch} />
                </button>
            </form>
        </QueryCardWrapper>
    )
}