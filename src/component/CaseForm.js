import React from 'react'
import {Button,Grid,Form,Segment, Input, Progress,Header, Popup, Icon,Radio} from 'semantic-ui-react'

class CaseForm extends React.Component{
    constructor(props){
        super(props);
    };

    state={}
        
    render(){
        if(this.props.currentStep !==1){
            return null
        }
        const { values } = this.props;

        return(
            <div>
                <Header as='h2'textAlign='center'>New Case Details</Header>
                <Segment basic>
                    <Progress value='0' total='6' progress='ratio' color='orange'/>
                </Segment>
                    <Grid stackable>
                        <Grid.Row centered columns={1}>
                        <Grid.Column textAlign='right'>
                            <Popup 
                                trigger={<Icon circular color='teal' name='help' />} 
                                position='bottom right'
                                wide='very'>
                                <img src={ require('../img/caseInfo.PNG')}/>
                            </Popup>
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered columns={3}>
                            <Grid.Column textAlign='center'>
                                <Form>
                                    <Form.Field inline>
                                        <Form.Input name={'case_no'} readOnly required label={'Case ID'} value={values.case_no} onChange={this.props.handleInput} placeholder='Case ID' />
                                        <label><strong>Case Notification Note</strong></label>
                                        <Button.Group compact size={"tiny"} inverted color='orange' fluid>
                                            <Button active={values.case_note==='DF'?true:false} name={'case_note'} value={'DF'} content='DF' onClick={this.props.handleClick1}/>
                                            <Button active={values.case_note==='DHF'?true:false}  name={'case_note'} value={'DHF'} content='DHF' onClick={this.props.handleClick1}/>
                                            <Button active={values.case_note==='DSS'?true:false}  name={'case_note'} value={'DSS'} content='DSS' onClick={this.props.handleClick1}/>
                                            <Button active={values.case_note==='SEVERE DENGUE'?true:false}  name={'case_note'} value={'SEVERE DENGUE'} content='SEVERE DENGUE' onClick={this.props.handleClick1}/>
                                        </Button.Group>
                                    </Form.Field>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered columns={3}>
                            <Grid.Column></Grid.Column>
                            <Grid.Column>
                                <Form>
                                    <Form.Group widths='equal'>
                                        <Form.Input  fluid name={'eweek'} autoFocus required value={values.eweek} placeholder={'Epid Week Number without year'}  label='Epid Week Number' onChange={this.props.handleInput}/>
                                        <Form.Input  fluid name={'case_area'} readOnly required value={values.case_area} placeholder={'Area'}  label='Area' onChange={this.props.handleInput}/>
                                    </Form.Group>
                                    <Button.Group inverted color='blue' fluid>
                                        <Button active={values.case_type==='Sporatic Case'?true:false} name={'case_type'} value={'Sporatic Case'}  content='Sporatic Case' onClick={this.props.handleClick1}/>
                                        <Button active={values.case_type==='WB'?true:false}  name={'case_type'} value={'WB'}  onClick={this.props.handleClick1}>WB</Button>
                                        <Button active={values.case_type==='WT'?true:false}  name={'case_type'} value={'WT'}  onClick={this.props.handleClick1}>WT</Button>
                                        <Button active={values.case_type==='WTK'?true:false}  name={'case_type'} value={'WTK'}  onClick={this.props.handleClick1}>WTK</Button>
                                    </Button.Group>
                                </Form>
                            </Grid.Column>
                            <Grid.Column></Grid.Column>  
                        </Grid.Row>
                        <Grid.Row centered columns={2}>
                            <Grid.Column>
                                <Form>
                                    <Form.Field inline>
                                        <label>If the case at outbreaks location, please state the name of the location :</label>
                                        <Input name={'outbreaks_loc'} value={values.outbreaks_loc} onChange={this.props.handleInput} />
                                    </Form.Field>
                                    <Form.Field inline>
                                        <label>Please state the FIRST CASE at the outbreaks locations metioned above:</label>
                                        <Input name={'outbreaks_first'} value={values.outbreaks_first} onChange={this.props.handleInput} />
                                    </Form.Field>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                   
            </div>
        )
    }
}
export default CaseForm