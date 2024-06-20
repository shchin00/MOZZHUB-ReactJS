import React from 'react'
import {Button,Grid,Divider,Segment,Form,Input,Container, Progress, Modal,Radio,Header,Icon, Dropdown} from 'semantic-ui-react'
import moment from 'moment'
import config from '../config'

function dateConvert(x,i) {
    let d = i-1
    let date = moment(x).subtract((14-d),'days').format('YYYY-MM-DD')
    //console.log(date)
    return date
}
class MobilityForm extends React.Component{

    constructor(props){
        super(props);
        this.state={
            open:false,
            def:1
            }
            this.handleChange = this.handleChange.bind(this);
            this.addClick = this.addClick.bind(this);
            this.handleNext = this.handleNext.bind(this);
            this.removeClick = this.removeClick.bind(this);
            //this.handleClick1 = this.handleClick1.bind(this);
            }

    componentWillReceiveProps(props) {
        this.setState({
        d1:[{startTime:'',endTime:'',location:'',type:1}],
        d2:[{startTime:'',endTime:'',location:'',type:1}],
        d3:[{startTime:'',endTime:'',location:'',type:1}],
        d4:[{startTime:'',endTime:'',location:'',type:1}],
        d5:[{startTime:'',endTime:'',location:'',type:1}],
        d6:[{startTime:'',endTime:'',location:'',type:1}],
        d7:[{startTime:'',endTime:'',location:'',type:1}],
        d8:[{startTime:'',endTime:'',location:'',type:1}],
        d9:[{startTime:'',endTime:'',location:'',type:1}],
        d10:[{startTime:'',endTime:'',location:'',type:1}],
        d11:[{startTime:'',endTime:'',location:'',type:1}],
        d12:[{startTime:'',endTime:'',location:'',type:1}],
        d13:[{startTime:'',endTime:'',location:'',type:1}],
        d14:[{startTime:'',endTime:'',location:'',type:1}],
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
    /* handleClick1(e){
        let value = e.target.value;
        console.log(value)
        this.setState({
            def:value,
            d1:[{startTime:'',endTime:'',location:'',type:value}],
            d2:[{startTime:'',endTime:'',location:'',type:value}],
            d3:[{startTime:'',endTime:'',location:'',type:value}],
            d4:[{startTime:'',endTime:'',location:'',type:value}],
            d5:[{startTime:'',endTime:'',location:'',type:value}],
            d6:[{startTime:'',endTime:'',location:'',type:value}],
            d7:[{startTime:'',endTime:'',location:'',type:value}],
            d8:[{startTime:'',endTime:'',location:'',type:value}],
            d9:[{startTime:'',endTime:'',location:'',type:value}],
            d10:[{startTime:'',endTime:'',location:'',type:value}],
            d11:[{startTime:'',endTime:'',location:'',type:value}],
            d12:[{startTime:'',endTime:'',location:'',type:value}],
            d13:[{startTime:'',endTime:'',location:'',type:value}],
            d14:[{startTime:'',endTime:'',location:'',type:value}],
            })
    } */
    handleNext(){
        let mobData = {d1:this.state.d1,d2:this.state.d2,d3:this.state.d3,
            d4:this.state.d4,d5:this.state.d5,d6:this.state.d6,
            d7:this.state.d7,d8:this.state.d8,d9:this.state.d9,
            d10:this.state.d10,d11:this.state.d11,d12:this.state.d12,
            d13:this.state.d13,d14:this.state.d14,}
        let info = [this.props.caseID,this.props.onset,this.props.area,0]
        let url = `${config.url}/mobData`
        //console.log(mobData)
        fetch(url,{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({mobData,info})}) 
        this.props.history.push('/record');
    }

    removeClick(i,dx){
        let d = [...this.state[dx]];
        d.splice(i,1);
        this.setState({ [dx]:d });
    }

    createForm(x){
        var dx = 'd'+x
        const optionsLocInput = [
            { key: '1', text: 'Address', value: 1 },
            { key: '2', text: 'LatLong', value: 2 },
          ]
        if(x>9){
            var day = 'DAY'+x+' ('+dateConvert(this.props.onset,x)+')'
        }else{  
            var day = 'DAY '+x+' ('+dateConvert(this.props.onset,x)+')'}
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
                                name='location' 
                                placeholder='Location'
                                label={<Dropdown compact name='type' defaultValue={el.type ||1} options={optionsLocInput} onChange={this.handleDropdown.bind(this,i,dx)} />}
                                value={el.location ||''} 
                                onChange={this.handleChange.bind(this,i,dx)}
                            />
                            <datalist id='Address'>
                            <option value={this.props.address}>House</option>
                            <option value={this.props.other_add}>Other Address</option>   
                            </datalist>
                            <Button icon='plus' inverted color='green' onClick={this.addClick.bind(this,i,dx)}/>
                            {this.showMinus(i,dx)}
                        </Form.Field>
                    </Form.Group>
                </Form>
            </div>
        )
    }
    
    render(){
        //const currentStep = this.props.history.location.state.currentStep || this.props.currentStep
        if(this.props.currentStep !==6){
            return null
        }
        return(
            <div>
                <Header as='h2'textAlign='center'>Patient Movement Record</Header>
                <Segment basic>
                    <Progress value='5' total='6' progress='ratio' color='orange'/>
                </Segment>
                <Divider hidden/>
                <Grid stackable textAlign='center'>
                <Form widths='equal'>
                    <Form.Group>
                        <Form.Input label='Case ID: ' readOnly value={this.props.caseID}/>
                        <Form.Input label='Onset Date: ' readOnly value={this.props.onset}/>
                        <Form.Input label='House Address: ' readOnly value={this.props.address}/>
                        <Form.Input label='Other Address: ' readOnly value={this.props.other_add}/>
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
                {/* <Button primary content='Save' onClick={this.handleSave}/> */}
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
export default MobilityForm