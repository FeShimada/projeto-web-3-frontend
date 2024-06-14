"use client";
import User, { UserRole } from '@/models/user';
import AuthService from '@/services/auth/storetoken';
import { Box, Typography, TextField, Grid, Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from "yup";

import CloseIcon from '@mui/icons-material/Close';


export default function Signup() {

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

            const response = await fetch("http://localhost:8000/auth/signup", requestOptions).then(
                reponse => reponse.json()
            );

            if (response.statusCode === 409) {
                alert('Email duplicado');
                throw new Error(JSON.stringify(response));
            }

            alert('sucesso!');
            router.push("/login");

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
            name: "",
            email: "",
            password: "",
            role: UserRole.ASSIGNER
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email inválido!").required("Campo obrigatório!"),
            password: Yup.string().required("Campo obrigatório!"),
            name: Yup.string().required("Campo obrigatório!"),
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
                <Box sx={{ position: 'absolute', top: 5, left: 5 }}>
                    <IconButton onClick={() => router.back()}><CloseIcon color='primary' /></IconButton>
                </Box>
                <Typography fontWeight={700} fontSize={20}>Faça seu cadastro</Typography>
                <Grid container sx={{ gap: '32px', display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            label={'Nome'}
                            variant='outlined'
                            error={(touched.name && errors.name !== undefined)}
                            helperText={(touched.name && errors.name)}
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name='name'
                            size='small'
                        />
                    </Grid>
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
                }}>Registrar</Button>
            </Box>
        </Box>
    );
}
