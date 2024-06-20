 import React from 'react'
import {Button,Grid,Form,Divider,Segment, Input, Progress,Header} from 'semantic-ui-react'

const CaseFormReview2 = ({dataC={},dataP={},dataN={},data={}}) =>(
    <Grid stackable columns={'equal'}>
        <Grid.Row> 
        <Grid.Column>
                <Form>
                    <Form.Field inline>
                        <Header as ='h3'>NOTIFICATION</Header>
                        <Segment color='yellow' basic>
                        <Form.Input label={'Reporting Agent'}value={dataN.clhos_name} readOnly/>
                        <Form.Input label={'Ward Name'}value={dataN.ward_name} readOnly />
                        <Form.Input label={'Registration Number'} value={dataN.reg_no} readOnly/>
                        <Form.Input label={'Onset Date'} value={dataN.onset_date} readOnly/>
                        <Form.Input label={'Enter Date'} value={dataN.enter_date} readOnly/>
                        <Form.Input label={'Diagnosis Date'} value={dataN.diag_date} readOnly/>
                        <Form.Input label={'Notification Date'} value={dataN.not_date} readOnly/>
                        </Segment>
                    </Form.Field>
                </Form>
            </Grid.Column>
            <Grid.Column>
                <Form>
                    <Form.Field inline>
                        <Header as ='h3'>&nbsp;</Header>
                        <Segment color='yellow' basic>
                        <Form.Input label={'Serology test Date'} name={'case_no'} value={dataN.ser_date} readOnly/>
                        <Form.Input label={'Symtomps'} name={'case_no'} value={dataN.symptoms} readOnly/>
                        <Form.Input label={'hess_test'} name={'case_note'} value={dataN.hess_test} readOnly />
                        <Form.Input label={'Warning Sign'} value={dataN.warning} readOnly/>
                        <Form.Input label={'PCV/Hematocrit'} value={dataN.pcv_hem} readOnly/>
                        <Form.Input label={'WBC'} value={dataN.wbc} readOnly/>
                        <Form.Input label={'Platelet Count'} value={dataN.plt_count} readOnly/>
                        </Segment>
                    </Form.Field>
                </Form>
            </Grid.Column>
            <Grid.Column>
                <Form>
                    <Form.Field inline>
                        <Header as ='h3'>&nbsp;</Header>
                        <Segment color='yellow' basic>
                        <Form.Input label={'HB'} value={dataN.hb} readOnly/>
                        <Form.Input label={'Other Clinical Symptoms'} name={'case_no'} value={dataN.other} readOnly/>
                        <Form.Input label={'--'} name={'case_note'} value={'--'} readOnly />
                        <Form.Input label={'Dengue?'} value={dataN.def_meet} readOnly/>
                        <Form.Input label={'Reason'} value={dataN.reason_report} readOnly/>
                        <Form.Input label={'Diagnosis Officer'} value={dataN.dia_officer} readOnly/>
                        <Form.Input label={'Report Officer'} value={dataN.rep_officer} readOnly/>
                        </Segment>
                    </Form.Field>
                </Form>
            </Grid.Column>
           
        </Grid.Row>
    </Grid>               
)

export default CaseFormReview2
 