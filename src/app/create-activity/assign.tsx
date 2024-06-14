
import { ReactNode, useEffect, useState } from "react";
import { Box, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { redirect } from "next/navigation";
import AuthService from "@/services/auth/storetoken";
import User from "@/models/user";
import Activity from "@/models/activity";


type AssignPropType = {
    setStepperTittle: React.Dispatch<React.SetStateAction<string>>;
    handleIncreaseButtonClick: () => void;
    handleDecreaseButtonClick: () => void;
    activityId: number | undefined;
    setActivity: React.Dispatch<React.SetStateAction<Activity>>;
    activity: Activity;
};

export default function Assign(props: AssignPropType) {

    const { setStepperTittle, handleDecreaseButtonClick, handleIncreaseButtonClick, activityId, setActivity, activity } = props;
    const [userList, setUserList] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | string>(activity.assignedTo ? activity.assignedTo.id! : "");

    if (activityId === undefined) redirect('/');

    useEffect(() => {
        setStepperTittle("Assinalar");

        const fetchData = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${AuthService.getAccessToken() ?? ''}`
                }
            };

            try {
                const response = await fetch("http://localhost:8000/user", requestOptions);
                const data = await response.json();

                if (Array.isArray(data)) {
                    setUserList(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                    setUserList([]);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                setUserList([]);
            }
        };

        fetchData();

    }, []);

    const handleUserChange = (event: SelectChangeEvent<number | string>, child: ReactNode) => {
        setSelectedUser(event.target.value as number);
    };

    const handleSubmit = async () => {
        try {
            const token = AuthService.getAccessToken();

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    activityId: activityId,
                    userId: selectedUser
                })
            };

            const response = await fetch("http://localhost:8000/activity/assign", requestOptions).then(
                reponse => reponse.json()
            );

            setActivity((prev) => ({ ...prev, assignedTo: response }));

            if (response.statusCode === 401) {
                alert('Acesso não autorizado.');
                throw new Error(JSON.stringify(response));
            }

            handleIncreaseButtonClick();

        } catch (error) {
        }
    };

    return (
        <Box sx={{
            width: '100%',
            background: '#FFFFFF',
            borderRadius: '8px'
        }}>

            <Box sx={{
                overflow: 'hidden',
                flex: 1,
                padding: '24px 16px'
            }}>
                <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
                    <InputLabel id="user-select-label">Select User</InputLabel>
                    <Select
                        labelId="user-select-label"
                        value={selectedUser}
                        onChange={handleUserChange}
                        label="Select User"
                    >
                        {userList.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

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
                <Button onClick={() => handleSubmit()} sx={{
                    padding: '8px',
                    border: '1px solid black',
                    width: '30%',
                    margin: '10px'
                }}>Próximo</Button>
            </Box>
        </Box>
    );
}
