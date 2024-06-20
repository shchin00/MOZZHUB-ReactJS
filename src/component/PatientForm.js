import React from 'react'
import {Button,Grid,Form,Divider,Segment,Progress,Header,Popup,Icon} from 'semantic-ui-react'

class PatientForm extends React.Component{
    constructor(props){
        super(props);
        /* this.state={
            //caseData:'',
            patientData:{
                pat_name:'Alan Chia',
                race:'NON BUMIPUTERA',
                nationality:'Citizen',
                age:'23',
                gender:'Male',
                occp:'Sales Man',
                esc_name:'-',
                ic_num:'970211016877',
                ic_type:'Own',
                curr_add:'20,Jalan ABC, TAMAN EDF, 82600 Kuala Lumpur',
                curr_add_type:'Town',
                curr_add_tel:'03-9543621',
                curr_add_hp:'012-7775555',
                oth_add:'12, Jalan UM, Taman UM,82600 Kuala Lumpur',
                oth_add_type:'Town',
                oth_add_tel:'03-9543621',
                oth_add_hp:'03-9543621'
                }
            } */
            //this.props.handleInput = this.props.handleInput.bind(this)
           /*  this.handleSave = this.handleSave.bind(this)
            this.handleNext = this.handleNext.bind(this)
            this.handleBack = this.handleBack.bind(this) */
            //this.props.handleDropdown = this.props.handleDropdown.bind(this)
        }

    state = {}
    
    /* componentWillMount(){
        let url = 'http://localhost:8080/patientData'
        fetch(url)
        .then(res =>res.json())
        .then(data =>//console.log(data.patientData)
            this.setState({
                patientData:{
                    pat_name:data.patientData.pat_name,
                    race:data.patientData.race,
                    nationality:data.patientData.nationality,
                    age:data.patientData.age,
                    gender:data.patientData.gender,
                    occp:data.patientData.occp,
                    esc_name:data.patientData.esc_name,
                    ic_num:data.patientData.ic_num,
                    ic_type:data.patientData.ic_type,
                    curr_add:data.patientData.curr_add,
                    curr_add_type:data.patientData.curr_add_type,
                    curr_add_tel:data.patientData.curr_add_tel,
                    curr_add_hp:data.patientData.curr_add_hp,
                    oth_add:data.patientData.oth_add,
                    oth_add_type:data.patientData.oth_add_type,
                    oth_add_tel:data.patientData.curr_add_tel,
                    oth_add_hp:data.patientData.curr_add_hp
                    }
            })
            )
        .catch(error =>console.error(error))    
    } */
    
   /*  handleSave(e){
        let patientData=values
        let urlp = 'http://localhost:8080/patientData'
        console.log(patientData)
            fetch(urlp,{
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({patientData}),
            }) 
             
          } */
    /* handleChange=(e,{value,name})=>{
        console.log(name);
        console.log(value);
        this.setState(prevState=>{
            return{
                patientData:{
                    ...prevState.patientData, [name]:value
                }
            }
        })} */
    /* handleInput(e){
        let value = e.target.value;
        let name = e.target.name;
        console.log(e.target)
        this.setState(prevState =>{
            return{
                patientData:{
                    ...prevState.patientData, [name]:value,
                },
            }
        },()=>console.log(values)
        )
    } */

    /* handleNext(){
        this.props.history.push("/new/notif");
    }

    handleBack(){
        this.props.history.push("/new/case");
    } */

    render(){
        if(this.props.currentStep !==2){
            return null
        }
        const { values } = this.props;
        const addType = [
            {text:'Town',value:'Town'},
            {text:'Rural',value:'Rural'}]
        const icType = [
            {text:'Own',value:'Own'},
            {text:'Escort',value:'Escort'}]
        const gender = [    
            {text:'Male',value:'Male'},
            {text:'Female',value:'Female'}]
        const race = [
            {text:'BUMIPUTERA',value:'BUMIPUTERA'},
            {text:'NON BUMIPUTERA',value:'NON BUMIPUTERA'}]
        const natio=[
            {text:'Citizen',value:'Citizen'},
            {text:'Non-Citizen',value:'Non-Citizen'},
        ]
        return(
            <div>
                <Header as='h2'textAlign='center'>New Patient Information</Header>
                <Segment basic>
                    <Progress value='1' total='6' progress='ratio' color='orange'/>
                </Segment>
                    <Grid>
                    <Grid.Row centered columns={1}>
                        <Grid.Column textAlign='right'>
                            <Popup 
                                trigger={<Icon circular color='teal' name='help' />} 
                                position='bottom right'
                                wide='very'>
                                <img src={ require('../img/patientInfo.PNG')}/>
                            </Popup>
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered columns={2} >
                        <Grid.Column>
                            <Form widths='equal'>
                                <Form.Group>
                                    <Form.Input name={'pat_name'} label='Patient Name: ' placeholder='Please key in...' value={values.pat_name} onChange={this.props.handleInput}/>
                                    <Form.Select name={'race'} label='Race:' placeholder='Please choose...' options={race} value={values.race} onChange={this.props.handleDropdown}/>
                                    <Form.Select name={'nationality'} label='Nationality:' placeholder='Please choose...' options={natio} value={values.nationality} onChange={this.props.handleDropdown}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input name={'age'} label= 'Age: ' placeholder='Please key in...' value={values.age}  onChange={this.props.handleInput}/>
                                    <Form.Select name={'gender'} label='Gender:' placeholder='Please choose...' options={gender} value={values.gender} onChange={this.props.handleDropdown}/>
                                    <Form.Input name={'occp'} label='Occupation:' placeholder='Please key in...' value={values.occp}  onChange={this.props.handleInput}/>
                                </Form.Group>
                                <Form.Group > 
                                    <Form.Input name={'ic_num'} label='IC Number: ' placeholder='Please key in...' value={values.ic_num}  onChange={this.props.handleInput}/>
                                    <Form.Select name={'ic_type'} label='IC Type:' placeholder='Please choose...' options={icType} value={values.ic_type} onChange={this.props.handleDropdown}/>
                                    <Form.Input name={'esc_name'} label= 'Escort Name: ' placeholder='Please key in...' value={values.esc_name}  onChange={this.props.handleInput}/>
                                </Form.Group>
                                <label><strong>Residential Address</strong></label>
                                <Form.Group>
                                    <Form.Input name={'curr_add'} required label='Current:' placeholder='Please key in...' value={values.curr_add}  onChange={this.props.handleInput}/>
                                    <Form.Select name={'curr_add_type'} width={5} label='Please Choose:' placeholder='Please choose...' value={values.curr_add_type} options={addType} onChange={this.props.handleDropdown}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input name={'curr_add_tel'} label='Telephone Number:' placeholder='Please key in...' value={values.curr_add_tel} onChange={this.props.handleInput}/>
                                    <Form.Input name={'curr_add_hp'} label='Handphone Number:' placeholder='Please key in...' value={values.curr_add_hp}  onChange={this.props.handleInput}/>
                                </Form.Group>
                                <label><strong>Other Address</strong></label>
                                <Form.Group>
                                    <Form.Input name={'oth_add'} label='Other Address:' placeholder='Please key in...' value={values.oth_add}  onChange={this.props.handleInput}/>
                                    <Form.Select name={'oth_add_type'}  width={5} label='Please Choose:' placeholder='Please choose...' options={addType} value={values.oth_add_type} onChange={this.props.handleDropdown}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input name={'oth_add_tel'} label='Telephone Number:' placeholder='Please key in...' value={values.oth_add_tel} onChange={this.props.handleInput}/>
                                    <Form.Input name={'oth_add_hp'} label='Handphone Number:' placeholder='Please key in...' value={values.oth_add_hp}  onChange={this.props.handleInput}/>
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                        </Grid.Row> 
                    </Grid>
            </div>
        )
    }
}
export default PatientForm