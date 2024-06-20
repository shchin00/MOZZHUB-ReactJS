import React from 'react'
import {Button,Grid,Form,Divider,Segment, Checkbox, Progress, Header,Popup,Icon} from 'semantic-ui-react'
import {DateInput} from 'semantic-ui-calendar-react';
class NotificationForm extends React.Component{
    reason(x){
        if(x==='NO')
        return(
            <div>
                <Form.Input 
                    name={'reason_report'}
                    label='If NO, please state the reason why this case been reported as dengue case'
                    placeholder='Please key in...'
                    onChange={this.props.handleInput}/>
            </div>
            )
    }

    state={}

    render(){
        if(this.props.currentStep !==3){
            return null
        }
        const { values } = this.props;

        return(
            <div>
                <Header as='h2'textAlign='center'>New Notification Information</Header>
                <Segment basic>
                    <Progress value='2' total='6' progress='ratio' color='orange'/>
                </Segment>
                    <Grid>
                    <Grid.Row centered columns={1}>
                        <Grid.Column textAlign='right'>
                            <Popup 
                                trigger={<Icon circular color='teal' name='help' />} 
                                position='bottom right'
                                wide='very'>
                                <img src={ require('../img/notifInfo1.PNG')}/>
                                <img src={ require('../img/notifInfo2.PNG')}/>
                            </Popup>
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered columns={2}>
                            <Grid.Column>
                                <Form widths='equal'>
                                    <Form.Input 
                                        name={'clhos_name'}
                                        value={values.clhos_name} 
                                        label='Name of Clinic/Hospital that reporting this notification'
                                        placeholder='Please key in...'
                                        onChange={this.props.handleInput}/>
                                <Form.Group>
                                    <Form.Input name={'ward_name'} value={values.ward_name} label='Ward Name' placeholder='Please key in...' onChange={this.props.handleInput}/>
                                    <Form.Input name={'reg_no'} value={values.reg_no} label='Registration Number' placeholder='Please key in...' onChange={this.props.handleInput}/>
                                </Form.Group>
                                <label><strong>Case Notofication Note</strong></label>
                                    <Button.Group compact size={"tiny"} inverted color='orange' fluid>
                                        <Button active={values.case_note==='DF'} name={'case_note'} value={'DF'} content='DF' onClick={this.props.handleClick2}/>
                                        <Button active={values.case_note==='DHF'}  name={'case_note'} value={'DHF'} content='DHF' onClick={this.props.handleClick2}/>
                                        <Button active={values.case_note==='DSS'}  name={'case_note'} value={'DSS'} content='DSS' onClick={this.props.handleClick2}/>
                                        <Button active={values.case_note==='SEVERE DENGUE'}  name={'case_note'} value={'SEVERE DENGUE'} content='SEVERE DENGUE' onClick={this.props.handleClick2}/>
                                    </Button.Group>
                                    <Divider hidden/>
                                    <Form.Group>
                                        <DateInput
                                            label='Onset Date'
                                            required
                                            name="onset_date"
                                            placeholder="Date"
                                            value={values.onset_date}
                                            dateFormat="YYYY-MM-DD"
                                            iconPosition="left"
                                            closable={true}
                                            closeOnMouseLeave={false}
                                            onChange={this.props.handleDate}/>
                                        <DateInput
                                            label='Enter Date'
                                            name="enter_date"
                                            placeholder="Date"
                                            value={values.enter_date}
                                            dateFormat="YYYY-MM-DD"
                                            iconPosition="left"
                                            closable={true}
                                            closeOnMouseLeave={false}
                                            onChange={this.props.handleDate} />
                                    </Form.Group>
                                    <Form.Group>
                                        <DateInput
                                            label='Diagnosis Date'
                                            name="diag_date"
                                            placeholder="Date"
                                            value={values.diag_date}
                                            iconPosition="left"
                                            dateFormat="YYYY-MM-DD"
                                            closable={true}
                                            closeOnMouseLeave={false}
                                            popupPosition={'right center'}
                                            onChange={this.props.handleDate} />
                                        <DateInput
                                            label='Notification Date'
                                            name="not_date"
                                            placeholder="Date"
                                            value={values.not_date}
                                            dateFormat="YYYY-MM-DD"
                                            iconPosition="left"
                                            closable={true}
                                            closeOnMouseLeave={false}
                                            popupPosition={'right center'}
                                            onChange={this.props.handleDate} />
                                        <DateInput
                                            label='Serology test Date'
                                            name="ser_date"
                                            placeholder="Date"
                                            value={values.ser_date}
                                            dateFormat="YYYY-MM-DD"
                                            iconPosition="left"
                                            closable={true}
                                            closeOnMouseLeave={false}
                                            popupPosition={'right center'}
                                            onChange={this.props.handleDate} />    
                                    </Form.Group>
                                    <Divider hidden/>
                                    <label><strong>Clinical symptoms:</strong></label>
                                    <Form.Input value={values.symptoms} readOnly />
                                    <Divider hidden/>
                                    <Form.Group>
                                        <Form.Field name='symptoms' label='Fever' value={'Fever'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Joint Pain' value={'Joint Pain'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Vomitting' value={'Vomitting'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Altered Conciousness' value={'Altered Conciousness'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Haemetesis' value={'Haemetesis' } control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Fit' value={'Fit'} control={Checkbox} onChange={this.props.handleTick}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Field name='symptoms' label='Headache' value={'Headache'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Myalgia / Muscle Ache' value={'Myalgia / Muscle Ache'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Gum Bleeding' value={'Gum Bleeding'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Ecchymosis' value={'Ecchymosis'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Purpura' value={'Purpura'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Nauseated' value={'Nauseated'} control={Checkbox} onChange={this.props.handleTick}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Field name='symptoms' label='Retroorbital Pain' value={'Retroorbital Pain'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Backache' value={'Backache'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Rash' value={'Rash'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Petechiae' value={'Petechiae'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Leukopenia' value={'Leukopenia'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='symptoms' label='Malaena' value={'Malaena'} control={Checkbox} onChange={this.props.handleTick}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Input name={'hess_test'} value={values.hess_test} inline label='Hess&#39;s Test ' onChange={this.props.handleInput} />
                                    </Form.Group>
                                    <Divider hidden/>
                                    <label><strong>Warning Sign:</strong></label>
                                    <Form.Input value={values.warning} readOnly />
                                    <Divider hidden/>
                                    <Form.Group>
                                        <Form.Field name='warning' label='Mucosal Bleed' value={'Mucosal Bleed'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='warning' label='Enlarged Liver (>2cm)' value={'Enlarged Liver (>2cm)'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='warning' label='Presistent Vomitting' value={'Presistent Vomitting'} control={Checkbox} onChange={this.props.handleTick}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Field name='warning' label='Abdominal Pain/Tenderness' value={'Abdominal Pain/Tenderness'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='warning' label='Clinical Fluid Accumulation' value={'Clinical Fluid Accumulation'} control={Checkbox} onChange={this.props.handleTick}/>
                                        <Form.Field name='warning' label='Lethargy/Restless' value={'Lethargy/Restless'} control={Checkbox} onChange={this.props.handleTick}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Input name={'pcv_hem'} value={values.pcv_hem} label='PCV/Hematocrit' onChange={this.props.handleInput}/>
                                        <Form.Input name={'wbc'} label='WBC' value={values.wbc} onChange={this.props.handleInput}/>
                                        <Form.Input name={'plt_count'} value={values.plt_count} label='Platelet Count' onChange={this.props.handleInput}/>
                                        <Form.Input name={'hb'} value={values.hb} label='HB' onChange={this.props.handleInput}/>
                                    </Form.Group>
                                    <Divider hidden/>
                                    <label><strong>Other Clinical symptoms:</strong></label>
                                    <Form.Input value={values.other} readOnly />
                                    <Divider hidden fitted/>
                                    <Form.Group>
                                        <Form.Field name={'other'} label='Epidemiological Link' value={'Epidemiological Link'} control={Checkbox} onChange={this.props.handleTick}/>
                                    </Form.Group>
                                    <label><strong>Does this case meet the definition of dengue case:&nbsp;&nbsp;&nbsp;</strong></label>
                                    <Button.Group compact size={"tiny"} inverted color='red'>
                                        <Button active={values.def_meet==='YES'?true:false} name={'def_meet'} value={'YES'} content='YES' onClick={this.props.handleClick1}/>
                                        <Button active={values.def_meet==='NO'?true:false}  name={'def_meet'} value={'NO'} content='NO' onClick={this.props.handleClick1}/>
                                    </Button.Group>
                                    {this.reason(values.def_meet)}
                                    <Form.Group>
                                        <Form.Input name={'dia_officer'} value={values.dia_officer} label='Name of the officer who diagnosising this case' onChange={this.props.handleInput}/>
                                        <Form.Input name={'rep_officer'} value={values.rep_officer} label='Name of the officer who reporting this case' onChange={this.props.handleInput}/>
                                    </Form.Group>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

            </div>
        )
    }

}
export default NotificationForm