import React from 'react'
import MenuBar from './MenuBar'
import {Button,Grid,Modal,Header,Icon} from 'semantic-ui-react'
import CaseForm from './CaseForm'
import PatientForm from './PatientForm'
import NotificationForm from './NotificationForm'
import PrimeClinicForm from './PrimeClinicForm'
import ReferenceForm from './ReferenceForm'
import MobilityForm from './MobilityForm';
import config from '../config'

class MasterForm extends React.Component{
    constructor(props){
        super(props)
        let area = sessionStorage.getItem('area');
        let newSelectionArray=[]
        let tempWarn = []
        let str = sessionStorage.getItem('area');
        let acronym = str.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')+Math.round((parseInt(Date.now() * Math.random()))/1000000000)
        //let id = parseInt(Date.now() * Math.random())
        this.state={
            open:false,
            httpCode:0,
            currentStep:1,
            className:'caseInfo',
            caseInfo:{
                case_no:acronym,
                case_note:'',
                case_area:area,
                case_type:'',
                eweek:'',
                outbreaks_loc:'',
                outbreaks_first:''},
            patientData:{
                pat_name:'',
                race:'',
                nationality:'',
                age:'',
                gender:'',
                occp:'',
                esc_name:'',
                ic_num:'',
                ic_type:'',
                curr_add:'',
                curr_add_type:'',
                curr_add_tel:'',
                curr_add_hp:'',
                oth_add:'',
                oth_add_type:'',
                oth_add_tel:'',
                oth_add_hp:''},
            NotifData:{
                clhos_name:'',
                ward_name:'',
                reg_no:'',
                date:'',
                onset_date: '',
                enter_date:'',
                diag_date:'',
                not_date:'',
                ser_date:'',
                hess_test:'',
                test_data:'',
                pcv_hem:'',
                wbc:'',
                plt_count:'',
                hb:'',
                other:'',
                reason_report:'',
                dia_officer:'',
                rep_officer:'',
                def_meet:'',
                symInfo:'',
                symptoms:newSelectionArray,
                warning:tempWarn},
            PriCliData:{
                clinicP_name:'',
                clinicP_sym:'',
                clinicP_creat:'', 
                clinicP_RPPD:'',
                visit_date:'',
                dig_note:''
            },
            ReferData:{
                refer_party:'',
                refer_partyName:'',
                refer_dig:'', 
                refer_date:'',
                receiver_name:'',
                investigator_name:'',
                reportor_name:'',
                receive_date:'',
                investigate_date:'',
                report_date:''
            }
        }
        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
        this._save = this._save.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleDropdown = this.handleDropdown.bind(this)
        this.handleTick = this.handleTick.bind(this)
        this.handleDate = this.handleDate.bind(this)

    }


    _next(){
        let currentStep = this.state.currentStep
        let className = this.state.className
        currentStep = currentStep >= 1?currentStep+1:null
        switch(currentStep){
            case 1:
                className = 'caseInfo';
            break;    
            case 2:
                className = 'patientData';
            break;
            case 3:
                className = 'NotifData';
            break;
            case 4:
                className = 'PriCliData';
            break;
            case 5:
                className = 'ReferData';
            break;
            case 6:
                className = 'MobData';
            break;

        }
        this.setState({
            currentStep:currentStep,
            className:className
        })
    }

    _prev(){
        let currentStep = this.state.currentStep
        let className = this.state.className
        currentStep = currentStep <= 1?1: currentStep-1
        switch(currentStep){
            case 1:
                className = 'caseInfo';
            break;    
            case 2:
                className = 'patientData';
            break;
            case 3:
                className = 'NotifData';
            break;
            case 4:
                className = 'PriCliData';
            break;
            case 5:
                className = 'ReferData';
            break;
        }
        this.setState({
            currentStep:currentStep,
            className:className
        })
    }
    _save(){
        let url = `${config.url}/save`
        const {caseInfo,patientData,NotifData,PriCliData,ReferData}=this.state
        const data = {caseInfo,patientData,NotifData,PriCliData,ReferData} 
        //console.log(data)
        fetch(url,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data})
            
        })
        .then(response=>response.json())
        .then(this.setState({currentStep:6}))
    }

    handleTick(e){
        let className = this.state.className;
        let name = e.target.previousElementSibling.name
        //console.log(name)
        const newSelection = e.target.previousElementSibling.value;
        let newSelectionArray;
        if(this.state[className][name].indexOf(newSelection)>-1){
            newSelectionArray = this.state[className][name].filter(s => s!== newSelection)
        }else{
            newSelectionArray=[...this.state[className][name],newSelection];
        }
        //console.log(newSelectionArray)
        this.setState(prevState =>{
            return{
                [className]:{
                    ...prevState[className],[name]:newSelectionArray
                }
                /* ...prevState, symptoms:newSelectionArray, */}},)
    }

    handleDate = (event, {name, value}) => {
        let className = this.state.className;
            this.setState(prevState=>{
                return{
                    [className]:{
                        ...prevState[className], [name]:value
                    }
                }
            }
            )
        
    }

    handleInput(e){
        let className = this.state.className;
        let value = e.target.value;
        let name = e.target.name;
        //console.log(e.target)
        this.setState(prevState =>{
            return{
                [className]:{
                    ...prevState[className], [name]:value
                },
            }
        }
        )
    }

    handleClick1(e){
        let className = this.state.className;
        let value = e.target.value;
        //console.log(value)
        let name = e.target.name;
        this.setState(prevState =>{
            return{
                [className]:{
                    ...prevState[className], [name]:value,
                },
            }
        }
        )
    }

    handleDropdown(e,{value,name}){
        let className = this.state.className;
        this.setState(prevState=>{
            return{
                [className]:{
                    ...prevState[className], [name]:value
                }
            }
        }
        )
    } 

    get previousButton(){
        let currentStep = this.state.currentStep;
        if(currentStep !==1&&currentStep<6){
            return(
                <Button primary content='Prev' onClick={this._prev}/>
            )
        }
        return null;
    }

    get nextButton(){
        let currentStep = this.state.currentStep;
        if(currentStep <5){
            return(
                <Button primary content='Next' onClick={this._next}/>
            )
        }
        else if (currentStep===5){
            return(
                <Modal
                    basic
                    open={this.state.open}
                    size='small'
                    //trigger={<Button onClick={()=>this.setState({open:true})}>Basic Modal</Button>}
                    trigger={<Button primary content='Save and Next to Mobility Form' onClick={()=>this.setState({open:true})}></Button>}
                    >
                    <Header icon color='orange'>
                    <Icon name='exclamation'/>
                        <h1>Non Editable After Save</h1>
                    </Header>
                    <Modal.Content>
                        <div style={{textAlign:'center'}}>
                            <p> Please make sure the following details are filled before submit:</p>
                            <ul style={{display:'inline-block',textAlign:'left'}}>
                                <li>Case ID</li>
                                <li>Residential Address</li>
                                <li>Onset Date</li>
                            </ul>
                        </div>
                    </Modal.Content>
                    <Modal.Actions style={{textAlign:'center'}}>
                        <Button color='red' inverted onClick={() => this.setState({open:false})}>
                        <Icon name='remove'/> Go Back
                        </Button>
                        <Button color='green' inverted onClick={this._save}>
                        <Icon name='checkmark'/> Cofirm and Save
                        </Button>
                    </Modal.Actions>
                </Modal>
            )
        }
        /* else if (currentStep===6){
            return(
                <Button primary content='Save' onClick={this._save}/>
            )
        } */
        return null;
    }

    render(){
        const {case_no,case_note,case_area,case_type,eweek,outbreaks_loc,outbreaks_first}=this.state.caseInfo;
        const {pat_name,race,nationality,age,gender,occp,esc_name,ic_num,ic_type,curr_add,
                curr_add_hp,curr_add_tel,oth_add,oth_add_hp,oth_add_tel,oth_add_type}=this.state.patientData;
        const {clhos_name, ward_name, reg_no, date, onset_date, enter_date, diag_date, 
                not_date, ser_date, hess_test, test_data, pcv_hem, wbc, plt_count, hb, 
                other, reason_report, dia_officer, rep_officer, def_meet, symInfo, symptoms, warning}=this.state.NotifData
        const {clinicP_name,clinicP_sym,clinicP_creat,clinicP_RPPD,visit_date,dig_note}=this.state.PriCliData
        const {refer_party, refer_partyName, refer_dig, refer_date, 
            receiver_name, investigator_name, reportor_name, receive_date, investigate_date, report_date}=this.state.ReferData
        const values ={case_no,case_note,case_area,case_type,eweek,outbreaks_loc,outbreaks_first,
                pat_name,race,nationality,age,gender,occp,esc_name,ic_num,ic_type,curr_add,
                curr_add_hp,curr_add_tel,oth_add,oth_add_hp,oth_add_tel,oth_add_type,
                clhos_name, ward_name, reg_no, date, onset_date, enter_date, diag_date, not_date, ser_date,
                hess_test, test_data, pcv_hem, wbc, plt_count, hb, other, reason_report, dia_officer, 
                rep_officer,def_meet, symInfo, symptoms, warning,clinicP_name,clinicP_sym,clinicP_creat,
                clinicP_RPPD,visit_date,dig_note,refer_party, refer_partyName, refer_dig, refer_date, 
                receiver_name, investigator_name, reportor_name, receive_date, investigate_date, report_date};
        return(
            <React.Fragment>
                <MenuBar activeItem='new'/>

                <CaseForm 
                    currentStep={this.state.currentStep}
                    handleInput={this.handleInput} 
                    handleClick1={this.handleClick1}
                    values={values}/>
                <PatientForm 
                    currentStep={this.state.currentStep}
                    handleInput={this.handleInput} 
                    handleDropdown={this.handleDropdown}
                    values={values}/>
                <NotificationForm 
                    currentStep={this.state.currentStep}
                    handleInput={this.handleInput} 
                    handleDate={this.handleDate}
                    handleClick1={this.handleClick1}
                    handleTick={this.handleTick}
                    values={values}/>
                <PrimeClinicForm
                    currentStep={this.state.currentStep}
                    handleInput={this.handleInput} 
                    handleDate={this.handleDate}
                    handleClick1={this.handleClick1}
                    values={values}/>
                <ReferenceForm
                    currentStep={this.state.currentStep}
                    handleInput={this.handleInput} 
                    handleDate={this.handleDate}
                    values={values}/>
                <MobilityForm 
                currentStep={this.state.currentStep}
                caseID = {this.state.caseInfo.case_no}
                onset = {this.state.NotifData.onset_date}
                address = {this.state.patientData.curr_add}
                other_add = {this.state.patientData.oth_add}
                area = {this.state.caseInfo.case_area}
                handleClick1={this.handleClick1}
                history = {this.props.history}
                />
                <Grid centered>
                    <Grid.Row>
                        {this.previousButton}
                        {this.nextButton}
                        {this.saveButton}
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        )
    }

}

export default MasterForm