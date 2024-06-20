import React from 'react'
import MenuBar from './MenuBar'
import {Button,Grid} from 'semantic-ui-react'
import CaseForm from './CaseForm'
import PatientForm from './PatientForm'
import NotificationForm from './NotificationForm'
import PrimeClinicForm from './PrimeClinicForm'
import ReferenceForm from './ReferenceForm'
import MobilityForm from './MobilityForm';
class MasterForm extends React.Component{
    constructor(props){
        super(props)
        let newSelectionArray=[]
        let tempWarn = []
        let id = parseInt(Date.now() * Math.random())
        this.state={
            httpCode:0,
            currentStep:1,
            className:'caseInfo',
            caseInfo:{
                case_no:id,
                case_note:'DF ',
                case_area:'Kota Samarahan',
                case_type:'WB',
                eweek:'23',
                outbreaks_loc:'Kota Samarahan',
                outbreaks_first:'e1'},
            patientData:{
                pat_name:'Alan Tan',
                race:'NON BUMIPUTERA',
                nationality:'Citizen',
                age:'23',
                gender:'Male',
                occp:'Student',
                esc_name:'-',
                ic_num:'971212131455',
                ic_type:'Own',
                curr_add:'Unigarden',
                curr_add_type:'Town',
                curr_add_tel:'0123456789',
                curr_add_hp:'0817588855',
                oth_add:'-',
                oth_add_type:'-',
                oth_add_tel:'-',
                oth_add_hp:'-'},
            NotifData:{
                clhos_name:'Clinic 1',
                ward_name:'WD 101',
                reg_no:'10123',
                date:'2020-04-28',
                onset_date: '2020-04-28',
                enter_date:'2020-04-28',
                diag_date:'2020-04-28',
                not_date:'2020-04-28',
                ser_date:'2020-04-28',
                hess_test:'2020-04-28',
                test_data:'2020-04-28',
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
        //this.code200toMob = this.code200toMob.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleClick1 = this.handleClick1.bind(this)
        this.handleDropdown = this.handleDropdown.bind(this)
        this.handleTick = this.handleTick.bind(this)
        this.handleDate = this.handleDate.bind(this)

    }
    /* componentDidMount() {
        axios.get('http://localhost:8080/caseData')
          .then(res => {
            const newID = res.data.newID;
            console.log(newID)
            this.setState({
                caseInfo:{
                    case_no:newID
                }
            });
          })
      } */

    /* componentDidMount(){
        let url = 'http://localhost:8080/caseData'
        fetch(url)
        .then(res =>res.json())      
        .then(res =>
            this.setState({
                caseInfo:{
                    case_no:res.newID
                }
            })
            )
        .catch(error =>console.error(error))    
    } */



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

    /* handleSave(){
        this.setState({
            case_no:this.state.caseInfo.case_no,
            pat_name:this.state.patientData.pat_name,
            onset_date:this.state.NotifData.onset_date,
            mob:{
                d1:this.state.d1,d2:this.state.d2,d3:this.state.d3,
                d4:this.state.d4,d5:this.state.d5,d6:this.state.d6,
                d7:this.state.d7,d8:this.state.d8,d9:this.state.d9,
                d10:this.state.d10,d11:this.state.d11,d12:this.state.d12,
                d13:this.state.d13,d14:this.state.d14,    
            }
        })
    } */

    _save(){
        let url = 'http://localhost:8080/save'
        const {caseInfo,patientData,NotifData,PriCliData,ReferData}=this.state
        const data = {caseInfo,patientData,NotifData,PriCliData,ReferData} 
        console.log(data)
        fetch(url,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data})
            
        })
        .then(response=>response.json())
        .then(data => this.setState({currentStep:6}))
        //code200toMob(this.state.httpCode)
        /* if(this.state.currentStep===6){

        } */
    }

    /* function code200toMob(x){
        if(x==='200'){
            this.setState({
                currentStep:6,
                className:'MobData'
            })
        }
    } */

    handleTick(e){
        let className = this.state.className;
        let name = e.target.previousElementSibling.name
        console.log(name)
        const newSelection = e.target.previousElementSibling.value;
        let newSelectionArray;
        if(this.state[className][name].indexOf(newSelection)>-1){
            newSelectionArray = this.state[className][name].filter(s => s!== newSelection)
        }else{
            newSelectionArray=[...this.state[className][name],newSelection];
        }
        console.log(newSelectionArray)
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
        console.log(e.target)
        this.setState(prevState =>{
            return{
                [className]:{
                    ...prevState[className], [name]:value
                },
            }
        },()=>console.log(this.state[className])
        )
    }

    handleClick1(e){
        let className = this.state.className;
        let value = e.target.value;
        console.log(value)
        let name = e.target.name;
        this.setState(prevState =>{
            return{
                [className]:{
                    ...prevState[className], [name]:value,
                },
            }
        },()=>console.log(this.state[className])
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
                <Button primary content='Save and Next to Mobility Form' onClick={this._save}/>
            )
        }
        /* else if (currentStep===6){
            return(
                <Button primary content='Save' onClick={this._save}/>
            )
        } */
        return null;
    }

    /* get saveButton(){
        let currentStep = this.state.currentStep;
        if(currentStep===6){
            return(
                <Button primary content='Save' onClick={this._save}/>
            )
        }
    } */

    render(){
        console.log(this.state.className)
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

                />
                <Grid centered>
                    {console.log(this.state.currentStep)}
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