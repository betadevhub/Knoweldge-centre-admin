import classes from './Table.module.css';
import type { FILTER } from './types';
import { getInputName, getInputPlaceholder } from './helper';
import { useState, type FormEvent } from 'react';
import type { BUILD_FILTER } from '../../types';

export default function Filter(params: FILTER) {

    if (!params.filterDialogState) return null;

    const [values, setValues] = useState<BUILD_FILTER>(params.filter);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }))
    };


    const handleSave = (e:FormEvent) => {
        e.preventDefault()
        params.handleMultiFilterChange(values)
        params.toggleFilterDialog?.()
    };





    return (
        <div onSubmit={handleSave} className={classes.filterParent}>
            <div className={`${classes.filterIndividualContainer} ${classes.ctaGroup}`}>
                <button onClick={params.toggleFilterDialog} className={classes.closeFilterButton}>
                    Close
                </button>

                <button onClick={handleSave} className={`${classes.closeFilterButton} ${classes.saveButton}`}>
                    Find
                </button>
            </div>

            <div className={classes.filterIndividualContainer}>
                <div className={classes.titleContainer}>
                    <p className={classes.filterTitle}>Filter</p>
                    <button className={classes.filterCta}>Clear All</button>
                </div>
            </div>
            <div className={classes.filterContainer}>
                {
                    params.filterList.map((p, i) => (
                        <div className={classes.filterIndividualContainer} key={i}>
                            <div className={classes.titleContainer}>
                                <p className={classes.filterTitle}>{p.title}</p>

                            </div>
                            <div className={classes.filterInputGroup}>
                                {
                                    Array.from({ length: p.c }).map((_, index) => {
                                        const placeholderObj = getInputPlaceholder(p.c);
                                        const placeholder = placeholderObj?.[(index + 1) as 1 | 2];
                                        const name = getInputName(p.c, index, p.name) || ''
                                        return <input
                                            name={name}
                                            value={String(values?.[name])}
                                            onChange={handleChange}
                                            inputMode={p.type === 'number' ? 'numeric' : 'none'} placeholder={placeholder} type={p.type} className={classes.filterInput} key={index} />
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}