"use client"
import { persistor, store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";



persistStore(store);
const Providers = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <Provider store={store}>{children}</Provider>;
}

export default Providers;