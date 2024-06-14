"use client";

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from '@mui/material';
import AuthService from '@/services/auth/storetoken';


const withTokenProtection = (WrappedComponent: any) => {
    const WithTokenProtection = (props: any) => {
        const [loading, setLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const checkAdmin = async () => {
                if (!AuthService.getAccessToken()) {
                    router.replace("/");
                } else {
                    setLoading(false);
                }
            };

            checkAdmin();
        }, []);

        if (loading) {
            return <Box
                sx={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress sx={{ width: "100%" }} color="primary" />
            </Box>;
        }

        return <WrappedComponent {...props} />;
    };

    return WithTokenProtection;
};

export default withTokenProtection;
