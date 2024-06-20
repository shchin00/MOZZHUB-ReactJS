import React from 'react'
import {Button,Grid,Form,Divider,Segment, Progress, Header,Popup,Icon} from 'semantic-ui-react'
import {DateInput} from 'semantic-ui-calendar-react';
class ReferenceForm extends React.Component{
    constructor(props){
        super(props);

    }

    state={}


    render(){
        if(this.props.currentStep !==5){
            return null
        }
        const { values } = this.props;

        return(
            <div>
                <Header as='h2'textAlign='center'>Reference</Header>
                <Segment basic>
                    <Progress value='4' total='6' progress='ratio' color='orange'/>
                </Segment>
                    <Grid>
                        <Grid.Row centered columns={1}>
                            <Grid.Column textAlign='right'>
                                <Popup 
                                    trigger={<Icon circular color='teal' name='help' />} 
                                    position='bottom right'
                                    wide='very'>
                                    <img src={ require('../img/referInfo.PNG')}/>
                                </Popup>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered columns={2}>
                            <Grid.Column>
                                <Form widths='equal'>
                                        <Form.Input
                                            name={'refer_party'}
                                            value={values.refer_party}
                                            label='Is this Case a case referred to any party?:'
                                            placeholder='Please Key In'
                                            onChange={this.props.handleInput}
                                        />
                                        <Form.Input
                                            name={'refer_partyName'}
                                            value={values.refer_partyName}
                                            label='If yes, please state the name of institution referred:'
                                            placeholder='Please Key In'
                                            onChange={this.props.handleInput}
                                        />
                                        <Form.Group>
                                        <DateInput
                                            label='Refer Date'
                                            name='refer_date'
                                            placeholder="Date"
                                            value={values.refer_date}
                                            iconPosition="left"
                                            closable={true}
                                            popupPosition='bottom right'
                                            closeOnMouseLeave={false}
                                            onChange={this.props.handleDate}
                                             />
                                        <Form.Input
                                            name={'refer_dig'}
                                            label='Diagnosis when referred:'
                                            placeholder='Please Key In'
                                            onChange={this.props.handleInput}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Input
                                            name={'receiver_name'}
                                            label='Receive Officer Name:'
                                            value={values.receiver_name}
                                            placeholder='Please Key In'
                                            onChange={this.props.handleInput}
                                        />
                                        <DateInput
                                            label='Receive Date'
                                            name='receive_date'
                                            placeholder="Date"
                                            value={values.receive_date}
                                            iconPosition="left"
                                            closable={true}
                                            popupPosition='bottom right'
                                            closeOnMouseLeave={false}
                                            onChange={this.props.handleDate}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Input
                                            name={'investigator_name'}
                                            label='Investigation Officer Name:'
                                            value={values.investigator_name}
                                            placeholder='Please Key In'
                                            onChange={this.props.handleInput}
                                        />
                                        <DateInput
                                            label='Investigation Date'
                                            name='investigate_date'
                                            placeholder="Date"
                                            value={values.investigate_date}
                                            iconPosition="left"
                                            closable={true}
                                            popupPosition='bottom right'
                                            closeOnMouseLeave={false}
                                            onChange={this.props.handleDate}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Input
                                            name={'reportor_name'}
                                            label='Report Officer Name:'
                                            value={values.reportor_name}
                                            placeholder='Please Key In'
                                            onChange={this.props.handleInput}
                                        />
                                        <DateInput
                                            label='Report Date'
                                            name='report_date'
                                            placeholder="Date"
                                            value={values.report_date}
                                            iconPosition="left"
                                            closable={true}
                                            popupPosition='bottom right'
                                            closeOnMouseLeave={false}
                                            onChange={this.props.handleDate}
                                             />
                                    </Form.Group>  
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
            </div>
        )
    }
}
export default ReferenceForm