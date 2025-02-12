import React from 'react';
import DisplayTextBox from './TextBox';
import { Stack, Box, Button } from '@mui/material';
import MenuBar from './MenuBar';
import { withRouter } from 'react-router-dom';

const UserProfile = (props) => {
    const handleClick = () => {
        props.history.goBack();
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <MenuBar />
            <Box sx={{ flex: 1, overflow: 'auto', padding: 2 }}>
                <Box sx={{ width: '100%', height: '80vh', padding: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'white', display: 'flex' }}>
                    <Box sx={{ marginRight: 2, width: '25rem', borderRight: '1px solid grey'}}>
                        <Box 
                            sx={{ 
                                width: '10rem', 
                                height: '13.33rem', // Maintain 4:3 aspect ratio (10 / 4 * 3 = 13.33)
                                backgroundColor: '#e0e0e0', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                marginBottom: 2 
                            }}
                        >
                            <img 
                                src="/mnt/data/profile.jpg" 
                                alt="Profile" 
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover',
                                    borderRadius: '4px' // Optional: to add rounded corners to the image
                                }} 
                            />
                        </Box>
                    </Box>
                    <Stack spacing={4} sx={{ flex: 2, height: '100%' }}>
                        <DisplayTextBox label='Name' sx={{ flex: 1 }} />
                        <DisplayTextBox label='Email' sx={{ flex: 1 }} />
                        <DisplayTextBox label='Phone' sx={{ flex: 1 }} />
                        <DisplayTextBox label='Postcode' sx={{ flex: 1 }} />
                        <DisplayTextBox label='Address' multiline rows={3} sx={{ flex: 1 }} />
                        <DisplayTextBox label='City' sx={{ flex: 1 }} />
                        <Button
                            variant='contained'
                            sx={{ width: '100px', alignSelf: 'flex-end', mt: 2 }}
                            onClick={handleClick}
                        >Back</Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}

export default withRouter(UserProfile);
