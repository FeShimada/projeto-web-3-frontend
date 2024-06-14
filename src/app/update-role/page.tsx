"use client";

import withTokenProtection from "@/components/hoc/withtokenprotection";
import { Box, Grid, TextField, FormControl, Select, InputLabel, MenuItem, Button } from '@mui/material';
import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { UserRole } from "@/models/user";
import AuthService from "@/services/auth/storetoken";
import { useRouter } from "next/navigation";


const UpdateRole = () => {

    const [updateRole, setUpdateRole] = useState({
        email: '',
        role: ''
    });

    const router = useRouter();

    const handleSubmitFormik = async () => {
        try {
            const token = AuthService.getAccessToken();

            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values)
            };

            const response = await fetch("http://localhost:8000/user/role", requestOptions).then(
                reponse => reponse.json()
            );

            if (response.statusCode === 401) {
                alert('Acesso não autorizado.');
                throw new Error(JSON.stringify(response));
            }

            alert('sucesso!');
            router.push('/');

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
        setFieldValue
    } = useFormik({
        validateOnBlur: true,
        validateOnChange: true,
        enableReinitialize: true,
        initialValues: updateRole,
        validationSchema: Yup.object({
            email: Yup.string().required("Campo obrigatório!"),
            role: Yup.string().required("Campo obrigatório!"),
        }),
        onSubmit: handleSubmitFormik,
    });

    return (
        <Box sx={{
            padding: '24px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            isolation: 'isolate'
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '17px', width: '800px',
            }}>
                <Box sx={{
                    width: '100%',
                    background: '#FFFFFF',
                    borderRadius: '8px'
                }}>
                    <Grid container sx={{
                        overflow: 'hidden',
                        flex: 1,
                        padding: '24px 16px'
                    }}>
                        <Grid item xs={12} sx={{ height: '88px' }}>
                            <TextField
                                fullWidth
                                label={'Email *'}
                                variant='outlined'
                                error={(touched.email && errors.email !== undefined)}
                                helperText={(touched.email && errors.email)}
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name='email'
                                type="email"
                                size='small'
                                color="primary"
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.role}
                                    label="Role"
                                    onChange={(e) => setFieldValue('role', e.target.value)}
                                >
                                    <MenuItem value={UserRole.MASTER}>Master</MenuItem>
                                    <MenuItem value={UserRole.ASSIGNER}>Visualizar</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Button onClick={() => handleSubmit()} sx={{
                        padding: '8px',
                        border: '1px solid black',
                        width: '30%',
                        margin: '10px'
                    }}>Salvar</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default withTokenProtection(UpdateRole);
