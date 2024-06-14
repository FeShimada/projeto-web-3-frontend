"use client";
import withTokenProtection from '@/components/hoc/withtokenprotection';
import Activity from '@/models/activity';
import AuthService from '@/services/auth/storetoken';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';

const Dashboard = () => {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${AuthService.getAccessToken() ?? ''}`
                }
            };

            try {
                const response = await fetch("http://localhost:8000/activity", requestOptions);
                const data = await response.json();

                if (Array.isArray(data)) {
                    setActivities(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                    setActivities([]);
                }
            } catch (error) {
                console.error("Error fetching activities:", error);
                setActivities([]);
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={2} sx={{ width: '800px' }}>
                {activities.map(activity => (
                    <Grid item xs={12} md={6} lg={4} key={activity.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {activity.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {activity.description}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ marginTop: 1 }}>
                                    Criado por: {activity.createdBy?.name}
                                </Typography>
                                {activity.assignedTo && (
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Atribuído a: {activity.assignedTo.name}
                                    </Typography>
                                )}
                                {(activity.artifacts !== undefined ? activity.artifacts.length : 0) > 0 && (
                                    <>
                                        <Typography variant="subtitle2" sx={{ marginTop: 2 }}>
                                            Artefatos:
                                        </Typography>
                                        <List dense>
                                            {activity.artifacts?.map(artifact => (
                                                <ListItem key={artifact.id}>
                                                    <ListItemText
                                                        primary={artifact.name}
                                                        secondary={artifact.description}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default withTokenProtection(Dashboard);
