import { FcFile, FcFolder } from 'react-icons/fc';
import classes from './SpaceHeader.module.css';
import SpaceHeaderText from './SpaceHeaderText';
import type { SPACE_HEADER } from './types';
import { useError } from '../../stateManagement/useError';
import axios from 'axios';
import { routes, URL, withCredentials } from '../../constants/utils';
import { useToast } from '../../stateManagement/useToast';
import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';


export default function SpaceHeader(params: SPACE_HEADER) {

    const { handleAPIError } = useError();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const { id, categoryName, } = useParams() || {};

    const [searchParams] = useSearchParams() || {};
    const postId = searchParams.get('postId')

    const [loading, setLoading] = useState('');
    const [publishedId, setPublishedId] = useState(postId || '');

    const [values, setValues] = useState({
        name: params.existingName || 'Untilled Post',
        videoDuration: 0,
        readDuration: 0
    });

    const handleValueChange = (name: string, value: string) => {
        setValues((prev) => ({ ...prev, [name]: value }))
    }


    const publish = async (published: boolean) => {
        const payload = {
            name: values.name,
            videoDuration: values.videoDuration,
            readDuration: values.readDuration,
            published: String(published),
            blocks: params.blocks
        }

        setLoading(published ? 'Publishing...' : 'Saving')

        try {
            const res = await axios.post(`${URL}/post/${id}`, payload, withCredentials);
            addToast('success', 'Success', 'Post & contents published successfully')
            console.log(res.data?.data?.post?._id)
            console.log(res.data?.data?.post)
            setPublishedId(res.data?.data?.post._id);

            params.setBlocks(res.data?.data?.contents)
        } catch (error) {
            handleAPIError(error);
            console.log(error)
        } finally {
            setLoading('')
        }
    }

    const publishAsEdit = async (published: boolean) => {
        const payload = {
            name: values.name,
            videoDuration: values.videoDuration,
            readDuration: values.readDuration,
            published: String(published),
            blocks: params.blocks
        }

        setLoading(published ? 'Publishing...' : 'Saving')

        try {
            await axios.patch(`${URL}/post/edit/${publishedId}`, payload, withCredentials);
            addToast('success', 'Success', 'Post & contents published successfully')

        } catch (error) {
            handleAPIError(error)
        } finally {
            setLoading('')
        }
    }



    return (
        <div className={classes.container}>
            <SpaceHeaderText
                icon={<FcFolder className={classes.icon} />}
                text={categoryName!}
                func={() => { navigate(`${routes.categories}/${id}`) }}

            />
            <p>/</p>
            <SpaceHeaderText
                icon={<FcFile className={classes.icon} />}
                text={values.name}
                editable={true}
                func={handleValueChange}
            />

            <div className={classes.right}>
                <p className={classes.lastPublished}>Last Published: 45m ago</p>
                {
                    loading ? loading :
                        <>
                            <button onClick={() => publishedId ? publishAsEdit(false) : publish(false)} className={classes.save}>Save to Draft</button>
                            <button onClick={() => publishedId ? publishAsEdit(true) : publish(true)} className={classes.publishButton}>Publish</button>
                        </>
                }

            </div>
        </div>
    )
}