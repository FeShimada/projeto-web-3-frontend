"use client";

import withTokenProtection from "@/components/hoc/withtokenprotection";
import { useState } from "react";
import { Box, Typography } from '@mui/material';
import ActivityPage from "./activity";
import CircularProgressWithLabel from "@/components/circularprogress";
import Assign from "./assign";
import Activity from "@/models/activity";
import ArtifactPage from "./artifact";
import { useRouter } from "next/navigation";


const CreateActivity = () => {

    const TOTAL_STEPS = 3;
    const INITIAL_STEP = 100;
    const [progress, setProgress] = useState(INITIAL_STEP / TOTAL_STEPS);
    const [stepperTittle, setStepperTittle] = useState("");
    const [activityId, setActivityId] = useState<number | undefined>();
    const [activity, setActivity] = useState<Activity>({
        title: "",
        description: "",
        createdById: undefined,
    });
    const router = useRouter();

    const handleIncreaseButtonClick = () => {

        if (progress === 100) {
            router.push('/');
            return;
        }

        setProgress(progress + INITIAL_STEP / TOTAL_STEPS);
    };

    const handleDecreaseButtonClick = () => {
        setProgress(progress - INITIAL_STEP / TOTAL_STEPS);
    };

    const renderStepComponent = () => {
        switch (Math.floor((progress * TOTAL_STEPS) / INITIAL_STEP)) {
            case 1:
                return (
                    <ActivityPage
                        setStepperTittle={setStepperTittle}
                        handleIncreaseButtonClick={handleIncreaseButtonClick}
                        setActivityId={setActivityId}
                        setActivity={setActivity}
                        activity={activity}
                    />
                );
            case 2:
                return (
                    <Assign
                        setStepperTittle={setStepperTittle}
                        handleIncreaseButtonClick={handleIncreaseButtonClick}
                        handleDecreaseButtonClick={handleDecreaseButtonClick}
                        activityId={activityId}
                        setActivity={setActivity}
                        activity={activity}
                    />
                );
            case 3:
                return (
                    <ArtifactPage
                        setStepperTittle={setStepperTittle}
                        handleIncreaseButtonClick={handleIncreaseButtonClick}
                        handleDecreaseButtonClick={handleDecreaseButtonClick}
                        activityId={activityId}
                        setActivity={setActivity}
                        activity={activity}
                    />
                );
            default:
                return null;
        }
    };

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
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <Box
                        sx={{
                            marginRight: "15px",
                            "@media (min-width: 828px)": {
                                marginRight: "20px",
                            },
                        }}
                    >
                        <CircularProgressWithLabel
                            value={progress}
                            totalsteps={TOTAL_STEPS}
                        />
                    </Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: "20px",
                            "@media (min-width: 828px)": {
                                fontSize: "25.8171px",
                                lineHeight: "150%",
                            },
                            fontWeight: 700,
                        }}
                        color={(theme) => theme.palette.primary.main}
                    >
                        {stepperTittle}
                    </Typography>
                </Box>
                {renderStepComponent()}
            </Box>
        </Box>
    );
};

export default withTokenProtection(CreateActivity);
