import ResetPassword from "@/components/authentication/resetPassword/ResetPassword";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

const ResetPasswordPage = () => {
    return (
        <Suspense fallback={<div>Loading reset form...</div>}>
            <ResetPassword />
        </Suspense>
    );
}

export default ResetPasswordPage;
