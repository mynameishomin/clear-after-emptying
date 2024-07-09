import { AuthContext } from "@/context/auth";
import { ComponentType, JSX, useContext } from "react";

const authWrapper = (WrapperComponenet: ComponentType) => {
    return (props: JSX.IntrinsicAttributes) => {
        const isLogin = useContext(AuthContext);

        if(isLogin) {
            return <WrapperComponenet {...props} />
        } else {
            return null
        }
    };
}

export default authWrapper;