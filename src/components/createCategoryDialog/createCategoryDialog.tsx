import { useCategories } from '../../stateManagement/useCategories';
import CardWrapper from '../../wrappers/CardWrapper';
import InputList from '../../wrappers/InputListWrapper';
import DialogOverlay from '../DialogOverlay/DialogOverlay';
import Input from '../Input/Input';
import classes from './createCategoryDialog.module.css';
import Button from '../Button/Button';
import { useMemo, useState, type FormEvent } from 'react';
import axios from 'axios';
import { URL, withCredentials } from '../../constants/utils';
import { useToast } from '../../stateManagement/useToast';
import { useError } from '../../stateManagement/useError';
import type { USE_CATEGORIES } from '../../stateManagement/types';

export default function CreateCategoryDialog() {
    const { showCategoryCreationDialog, toggleCategoryCreationDialog } = useCategories();
    const { addToast } = useToast();
    const { handleAPIError } = useError();

    const [values, setValues] = useState('');
    const [loading, setLoading] = useState(false)

    const disabled = useMemo(() => {
        return !values
    }, [values])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true);
            const res = await axios.post(`${URL}/category`, { name: values }, withCredentials);
            addToast('success', 'Success', 'Created successfully');
            const newItem = res.data.data.category;

            useCategories.setState((state) => ({
                ...state,
                firstFiveCategoriesResult: {
                    ...state.firstFiveCategoriesResult,
                    categories: [
                        newItem,
                        ...(state.firstFiveCategoriesResult?.categories || []).slice(0, 4)
                    ] // newItem + first 4 existing = max 5 items
                },
                categoriesResult: {
                    ...state.categoriesResult,
                    categories: [newItem, ...(state.categoriesResult?.categories || [])]
                }
            } as Partial<USE_CATEGORIES>));

            toggleCategoryCreationDialog()
        } catch (error) {
            handleAPIError(error)
        } finally {
            setLoading(false)
        }
    }

    if (!showCategoryCreationDialog) return null;

    return (
        <div className={classes.container}>
            <DialogOverlay />
            <CardWrapper title='Create a category'>
                <InputList cta={handleSubmit}>
                    <Input value={values} name='name' handleChange={(e) => setValues(e.target.value)} label='Category name' placeholder='Ticket management' type='text' size='large' />
                    <Button loading={loading} disabled={disabled} title="Create" />
                </InputList>
            </CardWrapper>
        </div>
    )
}