
import Activity from "@/models/activity";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Box, Grid, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import Artifact from "@/models/artifact";
import AuthService from "@/services/auth/storetoken";


type ArtifactPropType = {
    setStepperTittle: React.Dispatch<React.SetStateAction<string>>;
    handleIncreaseButtonClick: () => void;
    handleDecreaseButtonClick: () => void;
    activityId: number | undefined;
    setActivity: React.Dispatch<React.SetStateAction<Activity>>;
    activity: Activity;
};

export default function ArtifactPage(props: ArtifactPropType) {

    const { setStepperTittle, handleDecreaseButtonClick, handleIncreaseButtonClick, activityId, setActivity, activity } = props;
    if (activityId === undefined) redirect('/');

    const [artifact, setArtifact] = useState<Artifact>({
        name: "",
        description: "",
        activityId: activityId
    });

    useEffect(() => {
        setStepperTittle("Artefatos");
    }, []);

    const handleSubmitFormik = async () => {
        try {
            const token = AuthService.getAccessToken();

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values)
            };

            const response = await fetch("http://localhost:8000/artifact/create", requestOptions).then(
                reponse => reponse.json()
            );

            if (response.statusCode === 401) {
                alert('Acesso não autorizado.');
                throw new Error(JSON.stringify(response));
            }

            setActivity((prev) => ({
                ...prev,
                artifacts: prev.artifacts ? [...prev.artifacts, values] : [values]
            }));

            resetForm();
            setArtifact({ name: "", description: "", activityId: activityId });


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
        resetForm
    } = useFormik<Artifact>({
        validateOnBlur: true,
        validateOnChange: true,
        enableReinitialize: true,
        initialValues: artifact,
        validationSchema: Yup.object({
            name: Yup.string().required("Campo obrigatório!"),
            description: Yup.string().required("Campo obrigatório!"),
        }),
        onSubmit: handleSubmitFormik,
    });

    return (
        <Box sx={{
            width: '100%',
            background: '#FFFFFF',
            borderRadius: '8px',
            maxHeight: '80vh',
            overflow: 'auto'
        }}>
            <Grid container sx={{
                overflow: 'hidden',
                flex: 1,
                padding: '24px 16px'
            }}>
                <Grid item xs={12} sx={{ height: '88px' }}>
                    <TextField
                        fullWidth
                        label={'Título *'}
                        variant='outlined'
                        error={(touched.name && errors.name !== undefined)}
                        helperText={(touched.name && errors.name)}
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name='name'
                        size='small'
                        color="primary"
                    />
                </Grid>
                <Grid item xs={12} sx={{ height: '150px' }}>
                    <TextField
                        fullWidth
                        label={'Descrição *'}
                        variant='outlined'
                        error={(touched.description && errors.description !== undefined)}
                        helperText={(touched.description && errors.description)}
                        value={values.description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name='description'
                        size='small'
                        color="primary"
                        multiline
                        rows={4}
                    />
                </Grid>
            </Grid>

            <Button onClick={() => handleSubmit()} sx={{
                padding: '8px',
                border: '1px solid black',
                width: '30%',
                margin: '10px'
            }}>Adicionar</Button>

            <List>
                {activity.artifacts?.map((artifact, index) => {
                    return (

                        <ListItem key={index}>
                            <ListItemText
                                primary={artifact.name}
                                secondary={artifact.description}
                            />
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '15px'
            }}>
                <Button onClick={handleDecreaseButtonClick} sx={{
                    padding: '8px',
                    border: '1px solid black',
                    width: '30%',
                    margin: '10px'
                }}>Voltar</Button>
                <Button onClick={handleIncreaseButtonClick} sx={{
                    padding: '8px',
                    border: '1px solid black',
                    width: '30%',
                    margin: '10px'
                }}>Próximo</Button>
            </Box>
        </Box>
    );
}
