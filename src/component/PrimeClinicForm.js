import React from 'react'
import {Button,Grid,Form,Divider,Segment, Progress, Header, Popup,Icon} from 'semantic-ui-react'
import {DateInput} from 'semantic-ui-calendar-react';
class PrimeClinicForm extends React.Component{
    constructor(props){
        super(props);
        /* values={
            clinicP_name:'Klinik UNIMAS',
            clinicP_sym:'Fever',
            clinicP_creat:'No', 
            clinicP_RPPD:'Yes',
            visit_date:'2020-02-04',
            dig_note:'DF',
            dig_note:'DF',
        };
        this.handleDate = this.handleDate.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleClick1 = this.handleClick1.bind(this) */
        /* this.handleSave = this.handleSave.bind(this)
        this.handleNext = this.handleNext.bind(this) */

    }
    state={}


    /* componentWillMount(){
        let url = 'http://localhost:8080/primecData'
        fetch(url)
        .then(res =>res.json()
        )
        .then(data =>
            this.setState({
                clinicP_name:data.primecData.clinicP_name,
                clinicP_sym:data.primecData.clinicP_sym,
                clinicP_creat:data.primecData.clinicP_creat, 
                clinicP_RPPD:data.primecData.clinicP_RPPD,
                visit_date:data.primecData.visit_date,
                dig_note:data.primecData.dig_note,
                dig_note:data.primecData.dig_note
            })
            )
        .catch(error =>console.error(error))    
    } */

    /* handleClick1(e){
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState =>{
            return{
                    ...prevState, [name]:value,
                                  dig_note:value
            }})
    }
    handleDate = (event, {name, value}) => {
        if (values.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }
    handleInput(e){
        let value = e.target.value;
        let name = e.target.name;
        this.setState(prevState =>{
            return{
                ...prevState, [name]:value,}},)
                
    } */
    /* handleSave(e){
        this.setState({
            clinicP:{
                clinicP_name:values.clinicP_name,
                clinicP_sym:values.clinicP_sym,
                clinicP_creat:values.clinicP_creat, 
                clinicP_RPPD:values.clinicP_RPPD,
                visit_date:values.visit_date,
                dig_note:values.dig_note,    
            }
        })
    }

    handleNext(){
        let primecData=values.clinicP
        let url = 'http://localhost:8080/primecData'
        console.log(primecData)
            fetch(url,{
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({primecData}),
            })
        this.props.history.push("/new/ref");
    } */

    render(){
        if(this.props.currentStep !==4){
            return null
        }
        const { values } = this.props;

        return(
            <div>
                <Header as='h2'textAlign='center'>Primary Clinic Information</Header>
                <Segment basic>
                    <Progress value='3' total='6' progress='ratio' color='orange'/>
                </Segment>
                    <Grid>
                    <Grid.Row centered columns={1}>
                        <Grid.Column textAlign='right'>
                            <Popup 
                                trigger={<Icon circular color='teal' name='help' />} 
                                position='bottom right'
                                wide='very'>
                                <img src={ require('../img/prInfo1.PNG')}/>
                                <img src={ require('../img/prInfo2.PNG')}/>
                            </Popup>
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered columns={2}>
                            <Grid.Column>
                                <Form widths='equal'>
                                    <Form.Group>
                                        <Form.Input
                                            name={'clinicP_name'}
                                            label='Primary clinic patient been visited before this notification:'
                                            value={values.clinicP_name}
                                            placeholder='If Yes'
                                            onChange={this.props.handleInput}
                                        />
                                        
                                    </Form.Group>
                                    <DateInput
                                            label='Visit Date:'
                                            name="visit_date"
                                            placeholder="Date"
                                            value={values.visit_date}
                                            iconPosition="left"
                                            closable={true}
                                            popupPosition='bottom right'
                                            closeOnMouseLeave={false}
                                            onChange={this.props.handleDate}
                                             />
                                    <label><strong>Diagnosa oleh Klink Primer yang dilawati oleh pesakit</strong></label>
                                    <Button.Group compact size={"tiny"} inverted color='orange' fluid>
                                        <Button active={values.dig_note==='DF'?true:false} name={'dig_note'} value={'DF'} content='DF' onClick={this.props.handleClick1}/>
                                        <Button active={values.dig_note==='DHF'?true:false}  name={'dig_note'} value={'DHF'} content='DHF' onClick={this.props.handleClick1}/>
                                        <Button active={values.dig_note==='DSS'?true:false}  name={'dig_note'} value={'DSS'} content='DSS' onClick={this.props.handleClick1}/>
                                        <Button active={values.dig_note==='SEVERE DENGUE'?true:false}  name={'dig_note'} value={'SEVERE DENGUE'} content='SEVERE DENGUE' onClick={this.props.handleClick1}/>
                                        <Button active={values.dig_note==='TRO DENGUE'?true:false}  name={'dig_note'} value={'TRO DENGUE'} content='TRO DENGUE' onClick={this.props.handleClick1}/>
                                        <Button active={values.dig_note==='OTHER'?true:false}  name={'dig_note'} value={'OTHER'} content='OTHER' onClick={this.props.handleClick1}/>
                                    </Button.Group>
                                    <Form.Input
                                            name={'clinicP_sym'}
                                            label='Clinical Symtomps during patiet visit primary clinic:'
                                            value={values.clinicP_sym}
                                            placeholder='If Yes'
                                            onChange={this.props.handleInput}
                                    />
                                    <Form.Input
                                            name={'clinicP_RPPD'}
                                            label='If the dignosis is Dengue, REKOD PEMANTUAN PESAKIT DENGGI been delivered?'
                                            value={values.clinicP_RPPD}
                                            placeholder='If Yes'
                                            onChange={this.props.handleInput}
                                    />
                                    <Form.Input
                                            name={'clinicP_creat'}
                                            label='This is the notification been created from primary clinical of patient visited?'
                                            value={values.clinicP_creat}
                                            placeholder='If Yes'
                                            onChange={this.props.handleInput}
                                    />  
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
            </div>
        )
    }
}
export default PrimeClinicForm 