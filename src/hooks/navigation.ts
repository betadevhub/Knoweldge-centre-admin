import { useNavigate } from "react-router-dom";


export default function useNavigation() {

    const navigate = useNavigate();
    const func = (r: string) => {
        navigate(r)
    }

    return { func }
}