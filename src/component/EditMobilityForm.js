import React from 'react'
import {Button,Grid,Divider,Segment,Form,Input,Message, Progress, Modal,Radio,Header,Icon, Dropdown} from 'semantic-ui-react'
import moment from 'moment'
import config from '../config'
import MenuBar from './MenuBar'

function dateConvert(x,i) {
    let d = i-1
    let date = moment(x).subtract((14-d),'days').format('YYYY-MM-DD')
    //console.log(date)
    return date
}
class EditMobilityForm extends React.Component{

    constructor(props){
        super(props);
        this.state={
            open:false,
            def:1,
            onset:this.props.history.location.state.data.onset,
            address:this.props.history.location.state.data.address,
            other_add:this.props.history.location.state.data.other_add,
            caseID:this.props.history.location.state.data.caseID,
            area:this.props.history.location.state.data.area,
            }
            this.handleChange = this.handleChange.bind(this);
            this.addClick = this.addClick.bind(this);
            this.handleNext = this.handleNext.bind(this);
            this.removeClick = this.removeClick.bind(this);
            //this.handleClick1 = this.handleClick1.bind(this);
            }

    componentWillMount() {
        console.log(this.props.history.location.state.data.status)
        this.setState({
            d1:this.props.history.location.state.data.mob.d1,
            d2:this.props.history.location.state.data.mob.d2,
            d3:this.props.history.location.state.data.mob.d3,
            d4:this.props.history.location.state.data.mob.d4,
            d5:this.props.history.location.state.data.mob.d5,
            d6:this.props.history.location.state.data.mob.d6,
            d7:this.props.history.location.state.data.mob.d7,
            d8:this.props.history.location.state.data.mob.d8,
            d9:this.props.history.location.state.data.mob.d9,
            d10:this.props.history.location.state.data.mob.d10,
            d11:this.props.history.location.state.data.mob.d11,
            d12:this.props.history.location.state.data.mob.d12,
            d13:this.props.history.location.state.data.mob.d13,
            d14:this.props.history.location.state.data.mob.d14
        });
    }
    
    showMinus(i,dx){
        if(i>=1){
            return(<Button icon='minus' inverted color='red' onClick={this.removeClick.bind(this,i,dx)}/>)
        }
        else{ 
            return(<Button icon='minus' disabled onClick={this.removeClick.bind(this,i,dx)}/>)
        }
    }

    handleChange(i,dx, e) {
        const { name, value } = e.target;
        let d = [...this.state[dx]]
        d[i] = {...d[i], [name]: value};
        //console.log(d)
        this.setState({ [dx]:d });
    }

    handleDropdown(i,dx,e,{value,name}){
    let d = [...this.state[dx]]
    d[i] = {...d[i], [name]: value};
    this.setState({ [dx]:d });
    //console.log(d)
}

    addClick(i,dx){
        this.setState(prevState => ({
            [dx]:[...prevState[dx], { startTime:'', endTime:'',location:'',type:1}]
        }))
    }
    
    handleNext(){
        let status = this.props.history.location.state.data.status
        let mobData = {d1:this.state.d1,d2:this.state.d2,d3:this.state.d3,
            d4:this.state.d4,d5:this.state.d5,d6:this.state.d6,
            d7:this.state.d7,d8:this.state.d8,d9:this.state.d9,
            d10:this.state.d10,d11:this.state.d11,d12:this.state.d12,
            d13:this.state.d13,d14:this.state.d14,}
        let info = [this.state.caseID,this.state.onset,this.state.area,status]
        let url1 = `${config.url}/deletePrevData/`+encodeURIComponent(this.state.caseID)
        fetch(url1)
            .then((response) =>{
                if(response.status==400){
                    console.log("Error 400")
                }
                else if(response.status==200){
                    let url = `${config.url}/mobData`
                    fetch(url,{
                        method:"POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({mobData,info})
                    })
                    .then((response)=>{
                        if(response.status==200){
                            this.props.history.push('/record');
                        }
                    })
                }
            })
    }

    removeClick(i,dx){
        let d = [...this.state[dx]];
        d.splice(i,1);
        this.setState({ [dx]:d });
    }

    createForm(x){
        var dx = 'd'+x
        const onset = this.props.history.location.state.data.onset
        const address = this.props.history.location.state.data.address
        const other_add = this.props.history.location.state.data.other_add
        const status = this.props.history.location.state.data.status
        const optionsLocInput = [
            { key: '1', text: 'Address', value: 1 },
            { key: '2', text: 'LatLong', value: 2 },
          ]
        if(x>9){
            var day = 'DAY'+x+' ('+dateConvert(onset,x)+')'
        }else{  
            var day = 'DAY '+x+' ('+dateConvert(onset,x)+')'}
        return this.state[dx].map((el,i)=>
            <div key={i}>
                <Form>
                    <Form.Group inline>
                        <Form.Field>
                        <label><h4>{day}</h4></label>
                            <Input label='Start Time' placeholder='HHMM Example 1430' name='startTime' value={el.startTime ||''} onChange={this.handleChange.bind(this,i,dx)}/>
                        </Form.Field>
                        <Form.Field>
                            <Input label='End Time' placeholder='HHMM Example 1500'  name='endTime' value={el.endTime ||''} onChange={this.handleChange.bind(this,i,dx)}/>
                        </Form.Field>
                        <Form.Field>
                            <Input 
                                list="Address"
                                readOnly = {status==1?true:false}
                                name='location' 
                                placeholder='Location'
                                label={<Dropdown disabled = {status==1?true:false} compact name='type' defaultValue={el.type ||1} options={optionsLocInput} onChange={this.handleDropdown.bind(this,i,dx)} />}
                                value={el.location ||''} 
                                onChange={this.handleChange.bind(this,i,dx)}
                            />
                            <datalist id='Address'>
                            <option value={address}>House</option>
                            <option value={other_add}>Other Address</option>   
                            </datalist>
                            <Button disabled={status==1?true:false} icon='plus' inverted color='green' onClick={this.addClick.bind(this,i,dx)}/>
                            {this.showMinus(i,dx)}
                        </Form.Field>
                    </Form.Group>
                </Form>
            </div>
        )
    }
    
    render(){
        const caseID = this.props.history.location.state.data.caseID
        const onset = this.props.history.location.state.data.onset
        const address = this.props.history.location.state.data.address
        const other_add = this.props.history.location.state.data.other_add
        const status = this.props.history.location.state.data.status
        return(
            <div>
                <MenuBar/>
                <Grid textAlign='center'>
                    <Divider hidden/>
                    <Message 
                        warning 
                        hidden = {status==0?true:false}
                        header = 'Location are Not Editable'
                        list = {[
                            'You are allowed to edit the Start Time and End Time for each location',
                            'Adding new location is not allowed '
                        ]}
                        />
                </Grid>
                <Header as='h2'textAlign='center'>Patient Movement Record</Header>
                <Divider hidden/>
                <Grid stackable textAlign='center'>
                <Form widths='equal'>
                    <Form.Group>
                        <Form.Input label='Case ID: ' readOnly value={caseID}/>
                        <Form.Input label='Onset Date: ' readOnly value={onset}/>
                        <Form.Input label='House Address: ' readOnly value={address}/>
                        <Form.Input label='Other Address: ' readOnly value={other_add}/>
                    </Form.Group>
                    {/* <Button.Group inverted color='blue' fluid>
                        <Button active={this.state.def==1?true:false} name={'def'} value={1}  content='Address' onClick={this.handleClick1}/>
                        <Button active={this.state.def==2?true:false}  name={'def'} value={2} content='LatLng'  onClick={this.handleClick1}/>
                    </Button.Group> */}
                </Form> 
                </Grid>
                <Grid stackable textAlign='center'>
                {}
                {this.createForm(1)}{this.createForm(2)}{this.createForm(3)}{this.createForm(4)}
                {this.createForm(5)}{this.createForm(6)}{this.createForm(7)}{this.createForm(8)}{this.createForm(9)}
                {this.createForm(10)}{this.createForm(11)}{this.createForm(12)}{this.createForm(13)}{this.createForm(14)}
                </Grid>
                
                <Grid stackable textAlign='center'>
                <Modal
                    basic
                    open={this.state.open}
                    size='small'
                    //trigger={<Button onClick={()=>this.setState({open:true})}>Basic Modal</Button>}
                    trigger={<Button primary content='Save' onClick={()=>this.setState({open:true})}></Button>}
                    >
                    <Header icon color='orange'>
                        <Icon name='exclamation'/>
                        <h1>Non Editable After Save</h1>
                    </Header>
                    <Modal.Content>
                        <div style={{textAlign:'center'}}>
                            <p> Please make sure all input are non empty</p>
                        </div>
                    </Modal.Content>
                    <Modal.Actions style={{textAlign:'center'}}>
                        <Button color='red' inverted onClick={() => this.setState({open:false})}>
                        <Icon name='remove'/> Go Back
                        </Button>
                        <Button color='green' inverted onClick={this.handleNext}>
                        <Icon name='checkmark'/> Cofirm and Save
                        </Button>
                    </Modal.Actions>
                    </Modal>
                </Grid>
            </div>
        )
    }
}
export default EditMobilityForm