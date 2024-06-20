import React from 'react'
import {Button,Grid,Form,Divider,Segment, Input, Progress,Header} from 'semantic-ui-react'

const CaseFormReview = ({dataC={},dataP={},dataN={},data={}}) =>(
    <Grid stackable columns={'equal'}>
        <Grid.Row> 
            <Grid.Column>
                <Form >
                    <Form.Field inline>
                        <Header as ='h3'>CASE</Header>
                        <Segment color='green' basic>
                            <Form.Input label={'eDengue Case No'} name={'case_no'} value={dataC.case_no} readOnly/>
                            <Form.Input label={'Case Notification Note'} name={'case_note'} value={dataC.case_note} readOnly />
                            <Form.Input label={'Epid Week Number'} value={dataC.eWeek} readOnly/>
                            <Form.Input label={'Area'} value={dataC.case_area} readOnly/>
                            <Form.Input label={'Case Type'} value={dataC.case_type} readOnly/>
                            <Form.Input label={'Outbreak Location'} value={dataC.outbreaks_loc} readOnly/>
                            <Form.Input label={'Outbreaks First Case'} value={dataC.outbreaks_first} readOnly/>
                        </Segment>
                    </Form.Field>
                </Form>
            </Grid.Column>
            <Grid.Column>
                <Form>
                    <Form.Field inline >
                        <Header as ='h3'>PATIENT</Header>
                        <Segment color='teal' basic>
                            <Form.Input label={'Patient Name'} name={'pat_name'} value={dataP.pat_name} readOnly/>
                            <Form.Input label={'Race'} name={'race'} value={dataP.race} readOnly />
                            <Form.Input label={'Nationality'} value={dataP.nationality} readOnly/>
                            <Form.Input label={'Age'} value={dataP.age} readOnly/>
                            <Form.Input label={'Gender'} value={dataP.gender} readOnly/>
                            <Form.Input label={'Occupation'} value={dataP.occp} readOnly/>
                            <Form.Input label={'IC Number'} value={dataP.ic_num} readOnly/>
                        </Segment>
                    </Form.Field>
                </Form>
            </Grid.Column>
            <Grid.Column>
                <Form>
                    <Form.Field inline>
                        <Header as ='h3'>&nbsp;</Header>
                        <Segment color='teal' basic>
                        <Form.Input label={'IC Type'} name={'case_no'} value={dataP.ic_type} readOnly/>
                        <Form.Input label={'Escort Name'} name={'case_note'} value={dataP.esc_name} readOnly />
                        <Form.Input label={'Current Address'} value={dataP.curr_add} readOnly/>
                        <Form.Input label={'Current Addressge Type'} value={dataP.curr_add_type} readOnly/>
                        <Form.Input label={'Current Telephone Number'} value={dataP.curr_add_tel} readOnly/>
                        <Form.Input label={'Current HP Number'} value={dataP.curr_add_hp} readOnly/>
                        <Form.Input label={'Other Address'} value={dataP.oth_add} readOnly/>
                        </Segment>
                    </Form.Field>
                </Form>
            </Grid.Column>
           
        </Grid.Row>
    </Grid>               
)

export default CaseFormReview