import { useLocation } from "react-router-dom";
import { restricted } from "../components/SidePane/constant";
import AuthWrapper from "./AuthWrapper";
import type { MAIN_WRAPPER } from "./types";
import classes from './wrapper.module.css'
import { useEffect } from "react";
import { useUser } from "../stateManagement/useUser";

export default function MainWrapper(params: MAIN_WRAPPER) {
    const { pathname: path } = useLocation();
    const { user, getUser } = useUser()

    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [user])

    const fullscreen = restricted.includes(path);

    if (fullscreen) return <AuthWrapper>{params.children}</AuthWrapper>;

    return <div className={classes.container}>{params.children}</div>
}