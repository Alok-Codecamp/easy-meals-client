"use client"
import { store } from "@/redux/store";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";





persistStore(store);
const Providers = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <Provider store={store}>{children}</Provider>;
}

export default Providers;