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



// import {
//     MDBCol,
//     MDBContainer,
//     MDBRow,
//     MDBCard,
//     MDBCardText,
//     MDBCardBody,
//     MDBCardImage,
//     MDBBtn,
//     MDBBreadcrumb,
//     MDBBreadcrumbItem,
//     MDBProgress,
//     MDBProgressBar,
//     MDBIcon,
//     MDBListGroup,
//     MDBListGroupItem
// } from 'mdb-react-ui-kit';

// export default function UserProfile() {
//     return (
//         <section style={{ backgroundColor: '#eee' }}>
//             <MDBContainer className="py-5">
//                 <MDBRow>
//                     <MDBCol>
//                         <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
//                             <MDBBreadcrumbItem>
//                                 <a href='#'>Home</a>
//                             </MDBBreadcrumbItem>
//                             <MDBBreadcrumbItem>
//                                 <a href="#">User</a>
//                             </MDBBreadcrumbItem>
//                             <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
//                         </MDBBreadcrumb>
//                     </MDBCol>
//                 </MDBRow>

//                 <MDBRow>
//                     <MDBCol lg="4">
//                         <MDBCard className="mb-4">
//                             <MDBCardBody className="text-center">
//                                 <MDBCardImage
//                                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
//                                     alt="avatar"
//                                     className="rounded-circle"
//                                     style={{ width: '150px' }}
//                                     fluid />
//                                 <p className="text-muted mb-1">Full Stack Developer</p>
//                                 <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
//                                 <div className="d-flex justify-content-center mb-2">
//                                     <MDBBtn>Follow</MDBBtn>
//                                     <MDBBtn outline className="ms-1">Message</MDBBtn>
//                                 </div>
//                             </MDBCardBody>
//                         </MDBCard>

//                         <MDBCard className="mb-4 mb-lg-0">
//                             <MDBCardBody className="p-0">
//                                 <MDBListGroup flush className="rounded-3">
//                                     <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
//                                         <MDBIcon fas icon="globe fa-lg text-warning" />
//                                         <MDBCardText>https://mdbootstrap.com</MDBCardText>
//                                     </MDBListGroupItem>
//                                     <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
//                                         <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
//                                         <MDBCardText>mdbootstrap</MDBCardText>
//                                     </MDBListGroupItem>
//                                     <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
//                                         <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
//                                         <MDBCardText>@mdbootstrap</MDBCardText>
//                                     </MDBListGroupItem>
//                                     <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
//                                         <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
//                                         <MDBCardText>mdbootstrap</MDBCardText>
//                                     </MDBListGroupItem>
//                                     <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
//                                         <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
//                                         <MDBCardText>mdbootstrap</MDBCardText>
//                                     </MDBListGroupItem>
//                                 </MDBListGroup>
//                             </MDBCardBody>
//                         </MDBCard>
//                     </MDBCol>
//                     <MDBCol lg="8">
//                         <MDBCard className="mb-4">
//                             <MDBCardBody>
//                                 <MDBRow>
//                                     <MDBCol sm="3">
//                                         <MDBCardText>Full Name</MDBCardText>
//                                     </MDBCol>
//                                     <MDBCol sm="9">
//                                         <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
//                                     </MDBCol>
//                                 </MDBRow>
//                                 <hr />
//                                 <MDBRow>
//                                     <MDBCol sm="3">
//                                         <MDBCardText>Email</MDBCardText>
//                                     </MDBCol>
//                                     <MDBCol sm="9">
//                                         <MDBCardText className="text-muted">example@example.com</MDBCardText>
//                                     </MDBCol>
//                                 </MDBRow>
//                                 <hr />
//                                 <MDBRow>
//                                     <MDBCol sm="3">
//                                         <MDBCardText>Phone</MDBCardText>
//                                     </MDBCol>
//                                     <MDBCol sm="9">
//                                         <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
//                                     </MDBCol>
//                                 </MDBRow>
//                                 <hr />
//                                 <MDBRow>
//                                     <MDBCol sm="3">
//                                         <MDBCardText>Mobile</MDBCardText>
//                                     </MDBCol>
//                                     <MDBCol sm="9">
//                                         <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
//                                     </MDBCol>
//                                 </MDBRow>
//                                 <hr />
//                                 <MDBRow>
//                                     <MDBCol sm="3">
//                                         <MDBCardText>Address</MDBCardText>
//                                     </MDBCol>
//                                     <MDBCol sm="9">
//                                         <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
//                                     </MDBCol>
//                                 </MDBRow>
//                             </MDBCardBody>
//                         </MDBCard>

//                         <MDBRow>
//                             <MDBCol md="6">
//                                 <MDBCard className="mb-4 mb-md-0">
//                                     <MDBCardBody>
//                                         <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
//                                         <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
//                                         <MDBProgress className="rounded">
//                                             <MDBProgressBar width={80} valuemin={0} valuemax={100} />
//                                         </MDBProgress>

//                                         <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
//                                         <MDBProgress className="rounded">
//                                             <MDBProgressBar width={72} valuemin={0} valuemax={100} />
//                                         </MDBProgress>

//                                         <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
//                                         <MDBProgress className="rounded">
//                                             <MDBProgressBar width={89} valuemin={0} valuemax={100} />
//                                         </MDBProgress>

//                                         <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
//                                         <MDBProgress className="rounded">
//                                             <MDBProgressBar width={55} valuemin={0} valuemax={100} />
//                                         </MDBProgress>

//                                         <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
//                                         <MDBProgress className="rounded">
//                                             <MDBProgressBar width={66} valuemin={0} valuemax={100} />
//                                         </MDBProgress>
//                                     </MDBCardBody>
//                                 </MDBCard>
//                             </MDBCol>

//                             <MDBCol md="6">
//                                 <MDBCard className="mb-4 mb-md-0">
//                                     <MDBCardBody>
//                                         <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
//                                         <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
//                                         <MDBProgress className="rounded">
//                                             <MDBProgressBar width={80} valuemin={0} valuemax={100} />
//                                         </MDBProgress>

//                                         <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
//                                         <MDBProgress className="rounded">
//                                             <MDBProgressBar width={72} valuemin={0} valuemax={100} />
//                                         </MDBProgress>

//                                         <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
//                                         <MDBProgress className="rounded">
//                                             <MDBProgressBar width={89} valuemin={0} valuemax={100} />
//                                         </MDBProgress>

//                                         <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
//                                         <MDBProgress className="rounded">
//                                             <MDBProgressBar width={55} valuemin={0} valuemax={100} />
//                                         </MDBProgress>

//                                         <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
//                                         <MDBProgress className="rounded">
//                                             <MDBProgressBar width={66} valuemin={0} valuemax={100} />
//                                         </MDBProgress>
//                                     </MDBCardBody>
//                                 </MDBCard>
//                             </MDBCol>
//                         </MDBRow>
//                     </MDBCol>
//                 </MDBRow>
//             </MDBContainer>
//         </section>
//     );
// }


