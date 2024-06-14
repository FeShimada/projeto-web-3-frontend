"use client";
import { UserContext } from '@/context/user';
import User from '@/models/user';
import AuthService from '@/services/auth/storetoken';
import { Box, Typography, TextField, Grid, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from "yup";


export default function Login() {

    const router = useRouter();

    const handleSubmitFormik = async () => {
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            };

            const response = await fetch("http://localhost:8000/auth/login", requestOptions).then(
                reponse => reponse.json()
            );


            if (response.statusCode === 401) {
                alert('Acesso não autorizado.');
                throw new Error(JSON.stringify(response));
            }

            AuthService.saveTokens(response.backendTokens.accessToken, response.backendTokens.refreshToken);
            AuthService.saveUser(response.user);

            router.push("/dashboard");

        } catch (error) {
        }
    };

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
    } = useFormik<User>({
        validateOnBlur: true,
        validateOnChange: true,
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email inválido!").required("Campo obrigatório!"),
            password: Yup.string().required("Campo obrigatório!"),
        }),
        onSubmit: handleSubmitFormik,
    });

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
        }}>
            <Box sx={{
                width: '50%',
                height: '50%',
                background: 'white',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <Typography fontWeight={700} fontSize={20}>Realize o login</Typography>
                <Grid container sx={{ gap: '32px', display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            label={'Email'}
                            variant='outlined'
                            error={(touched.email && errors.email !== undefined)}
                            helperText={(touched.email && errors.email)}
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name='email'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            label={'Senha'}
                            variant='outlined'
                            error={(touched.password && errors.password !== undefined)}
                            helperText={(touched.password && errors.password)}
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name='password'
                            type='password'
                            size='small'
                        />
                    </Grid>
                </Grid>

                <Button onClick={() => handleSubmit()} sx={{
                    padding: '15px',
                    border: '1px solid black',
                    width: '30%'
                }}>Entrar</Button>
                <Typography
                    onClick={() => router.push('/signup')}
                    color={'black'}
                    fontSize={10}
                    sx={{ cursor: 'pointer' }}
                >Ainda não tem cadastro? Clique aqui</Typography>
            </Box>
        </Box>
    );
}
