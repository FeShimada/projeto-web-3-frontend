"use client";
import { UserRole } from '@/models/user';
import AuthService from '@/services/auth/storetoken';
import { Box, Typography, Button } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';


export default function Header() {

    const router = useRouter();
    const pathname = usePathname();
    const user = AuthService.getUser();

    return (
        <Box sx={{
            padding: '15px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: (theme) => theme.palette.primary.main,
        }}>
            <Typography color={'white'} fontWeight={700} variant='h4'>
                Olá {user?.name}. Você é: {user?.role}
            </Typography>
            {(pathname !== '/create-activity' && user?.role === UserRole.MASTER) && (
                <>
                    <Button sx={{ color: 'white', fontSize: 20, fontWeight: 700 }} onClick={() => {
                        router.push("/create-activity");
                    }}>CRIAR NOVA ATIVIDADE</Button>
                    <Button sx={{ color: 'white', fontSize: 20, fontWeight: 700 }} onClick={() => {
                        router.push("/update-role");
                    }}>ALTERAR ROLE DE USER</Button>
                </>
            )}
            <Button sx={{ color: 'white', fontSize: 20, fontWeight: 700 }} onClick={() => {
                AuthService.clearAuthData();
                router.push("/");
            }}>Sair</Button>
        </Box>
    );
}
