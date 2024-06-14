
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number, totalsteps: number; },
) {
    const calculateFraction = (value: number) => {
        const numerator = Math.round(value / (100 / props.totalsteps));
        const denominator = props.totalsteps;
        return `${numerator}/${denominator}`;
    };

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'inline-flex',
                transform: 'scale(1.2)',
                '@media (min-width: 828px)': {
                    transform: 'scale(1.6)',
                    marginRight: '20px'
                }
            }}
        >
            <CircularProgress variant="determinate" {...props}
                sx={{
                    borderRadius: '50%',
                    boxShadow: 'inset 0px 0px 0px 4px #CED4DA',
                }} thickness={4}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    variant="caption"
                    color={(theme) => theme.palette.primary.main}
                    sx={{
                        fontSize: '12px',
                        fontWeight: 700
                    }}
                >
                    {`${calculateFraction(props.value)}`}
                </Typography>
            </Box>
        </Box>
    );
}
