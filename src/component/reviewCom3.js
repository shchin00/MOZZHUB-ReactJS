 import React from 'react'
import {Button,Grid,Form,Divider,Segment, Input, Progress,Header} from 'semantic-ui-react'

const CaseFormReview3 = (dataPC={},dataR={}) =>(
    <Grid stackable columns={'equal'}>
        <Grid.Row> 
        <Grid.Column>
                <Form>
                    <Form.Field inline>
                        <Header as ='h3'>Primary Clinic</Header>
                        <Segment color='blue' basic>
                        <Form.Input label={'Primary clinic visited'}value={dataPC.clinicP_name} readOnly/>
                        <Form.Input label={'Visit Date'}value={dataPC.visit_date} readOnly />
                        <Form.Input label={'Dignosis'} value={dataPC.dig_note} readOnly/>
                        <Form.Input label={'Symptopms'} value={dataPC.clinicP_sym} readOnly/>
                        <Form.Input label={'Create Date'} value={dataPC.clinicP_creat} readOnly/>
                        </Segment>
                    </Form.Field>
                </Form>
            </Grid.Column>
            <Grid.Column>
                <Form>
                    <Form.Field inline>
                        <Header as ='h3'>Reference</Header>
                        <Segment color='purple' basic>
                        <Form.Input label={'Referred To'}value={dataR.refer_partyName} readOnly/>
                        <Form.Input label={'Referred Date'}value={dataR.refer_date} readOnly />
                        <Form.Input label={'Receiver Officer Name'} value={dataR.receiver_name} readOnly/>
                        <Form.Input label={'Receive Date'} value={dataR.receive_date} readOnly/>
                        <Form.Input label={'Investigation Officer Name'} value={dataR.investigator_name} readOnly/>
                        <Form.Input label={'Investigation Date'} value={dataR.investigate_date} readOnly/>
                        <Form.Input label={'Report Officer Name'} value={dataR.reportor_name} readOnly/>
                        <Form.Input label={'Report Date'} value={dataR.report_date} readOnly/>
                        </Segment>
                    </Form.Field>
                </Form>
            </Grid.Column>
           
        </Grid.Row>
    </Grid>               
)

export default CaseFormReview3
 