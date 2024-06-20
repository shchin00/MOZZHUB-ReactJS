import React from 'react'
import {Button,Grid,Divider,Segment,Form,Input,Container, Progress, Modal,Header,Icon} from 'semantic-ui-react'
import moment from 'moment'
import config from '../config'



function dateConvert(x,i) {
    let d = i-1
    let date = moment(x).subtract((14-d),'days').format('YYYY-MM-DD')
    //console.log(date)
    return date
}
class MobilityFormReview extends React.Component{

    constructor(props){
        super(props);
        this.state={
            pat_mob :JSON.parse(this.props.dataM.pat_mob),
            d1:JSON.parse(this.props.dataM.pat_mob).d1,
            d2:JSON.parse(this.props.dataM.pat_mob).d2,
            d3:JSON.parse(this.props.dataM.pat_mob).d3,
            d4:JSON.parse(this.props.dataM.pat_mob).d4,
            d5:JSON.parse(this.props.dataM.pat_mob).d5,
            d6:JSON.parse(this.props.dataM.pat_mob).d6,
            d7:JSON.parse(this.props.dataM.pat_mob).d7,
            d8:JSON.parse(this.props.dataM.pat_mob).d8,
            d9:JSON.parse(this.props.dataM.pat_mob).d9,
            d10:JSON.parse(this.props.dataM.pat_mob).d10,
            d11:JSON.parse(this.props.dataM.pat_mob).d11,
            d12:JSON.parse(this.props.dataM.pat_mob).d12,
            d13:JSON.parse(this.props.dataM.pat_mob).d13,
            d14:JSON.parse(this.props.dataM.pat_mob).d14
        }
            }

    /* componentWillReceiveProps(props) {
        this.setState({d1:[{startTime:'1800',endTime:'2359',location:this.props.address}],
        d2:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}],
        d3:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}],
        d4:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}],
        d5:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}],
        d6:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}],
        d7:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}],
        d8:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}],
        d9:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}],
        d10:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}],
        d11:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}],
        d12:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}],
        d13:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}],
        d14:[{startTime:'0000',endTime:'0700',location:this.props.address},{startTime:'1800',endTime:'2359',location:this.props.address}]});
    } */
    /* componentDidMount() {
        this.setState({
        d1:JSON.parse(this.props.dataM.pat_mob).d1,
        d2:JSON.parse(this.props.dataM.pat_mob).d2,
        d3:JSON.parse(this.props.dataM.pat_mob).d3,
        d4:JSON.parse(this.props.dataM.pat_mob).d4,
        d5:JSON.parse(this.props.dataM.pat_mob).d5,
        d6:JSON.parse(this.props.dataM.pat_mob).d6,
        d7:JSON.parse(this.props.dataM.pat_mob).d7,
        d8:JSON.parse(this.props.dataM.pat_mob).d8,
        d9:JSON.parse(this.props.dataM.pat_mob).d9,
        d10:JSON.parse(this.props.dataM.pat_mob).d10,
        d11:JSON.parse(this.props.dataM.pat_mob).d11,
        d12:JSON.parse(this.props.dataM.pat_mob).d12,
        d13:JSON.parse(this.props.dataM.pat_mob).d13,
        d14:JSON.parse(this.props.dataM.pat_mob).d14
        });
    }
     */


    createForm(x){
        var dx = 'd'+x
        
        if(x>9){
            var day = 'DAY'+x
        }else{  
            var day = 'DAY '+x
        }
        return this.state[dx].map((el,i)=>
            <div key={i}>
                <Form>
                    <Form.Group inline>
                        <Form.Field>
                        <label><h4>{day}</h4></label>
                            <Input label='Start Time' name='startTime' value={el.startTime ||''}/>
                        </Form.Field>
                        <Form.Field>
                            <Input label='End Time' name='endTime' value={el.endTime ||''} />
                        </Form.Field>
                        <Form.Field>
                            <Input name='location' label='Location' value={el.location ||''}/>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </div>
        )
    }
    
    render(){
        return(
            <div>
                <Header as='h2'textAlign='center'>Patient Movement Record</Header>
                <Divider hidden/>
                <Container>
                
                <Grid stackable textAlign='center'>
                {this.createForm(1)}{this.createForm(2)}{this.createForm(3)}{this.createForm(4)}
                {this.createForm(5)}{this.createForm(6)}{this.createForm(7)}{this.createForm(8)}{this.createForm(9)}
                {this.createForm(10)}{this.createForm(11)}{this.createForm(12)}{this.createForm(13)}{this.createForm(14)}
                </Grid>
                {/* <Button primary content='Save' onClick={this.handleSave}/> */}
            </Container>
            </div>
        )
    }
}

export default MobilityFormReview