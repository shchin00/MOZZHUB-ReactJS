import React from 'react'
import MenuBar from './MenuBar'
import Heatmap from './Heatmap'
import TestFunc from './test'
import BarChart from './BarChart'
import Footer from './Footer'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import config from '../config'
import {Table,Grid,Divider, Segment,Statistic,List,Loader,Dimmer} from 'semantic-ui-react'
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            wait:false,
            dateGen:'',
            ranking2:[],
            center:'',
            monthData:[],
            barLabel:[],
            barData:[],
            sub_loc:'',
            total_case:'',
            update_date:'',
            user:''
        };
        this.handleDate = this.handleDate.bind(this)
    }
    componentWillMount(){
        const {user} = this.props
        //console.log(user.area)
    }

    componentDidMount() {
        const { dispatch, ranking } = this.props
        //console.log(ranking)
        const auth_token = sessionStorage.getItem('token');
        const user = sessionStorage.getItem('user');
        const area = sessionStorage.getItem('area');
        const level = sessionStorage.getItem('level');
        if (auth_token) {
            if(level==1){
                let url2 = `${config.url}/monthData`
                let url3 = `${config.url}/ranking/`+area
                try{
                    fetch(url3)
                    .then(res=>res.json())
                    //.then(data => console.log(data))
                    .then(result => this.setState({
                        wait:false,
                        ranking2:JSON.parse(result.data[0].ranking),
                        update_date:(result.data[0].gen_Date).split(' ')[0],
                        sub_loc:result.sub_loc,
                        total_case:result.num_case,
                        })
                    )
                }
                catch(err){
                    console.log(err)
                    this.setState({
                        wait:false
                    })
                }
                try{
                    fetch(url2)
                    .then(res => res.json())
                    .then(data => this.setState({barLabel:data[0],barData:data[1]}))
                }
                catch(err){
                    console.log(err)
                }
            }
        } 
        else {
            sessionStorage.setItem('lat',3.14056039883967)
            sessionStorage.setItem('lng',101.59909644810003)
            dispatch(push('/login'))
        }

    }

    handleDate = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    createList(){
        var ranking =this.state.ranking2
        var sub_loc = this.state.sub_loc
        return ranking.map((el,i) => (
            <Table inverted>
                <Table.Body>
                    <Table.Row key={i}>
                    <Table.Cell>
                        <h3>#{i+1}</h3>
                        <List bulleted>
                                { sub_loc[i].sub_loc_name.map((el,j)=>
                                    <List.Item key ={j}>{sub_loc[i].sub_loc_name[j]}</List.Item>)}
                        </List>
                    </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        ))}

    render(){
        const divStyle ={
            backgroundColor : 'black',
            height: '100vh',
            width: '100%'
        }
        const area = sessionStorage.getItem('area');
        var lat = sessionStorage.getItem('lat');
        var lng = sessionStorage.getItem('lng');
        if(lat==null&&lng==null){
            lat = 3.14056039883967
            lng = 101.59909644810003
            
        }
        return(
            <div style={divStyle}>
                <MenuBar activeItem='dashboard' name={this.props.user.name}/>
                <Grid stackable>
                <Dimmer active={this.state.wait}>
                                <Loader active={this.state.wait}>Preparing Data</Loader>
                            </Dimmer>
                    <Grid.Row columns={2}>
                        <Grid.Column textAlign='left' width={3}>
                            <Segment style={{height: 60,textAlign:'center' }} inverted><h1>{area}</h1></Segment>
                            <Segment inverted style={{overflow: 'auto', maxHeight: 530 }}>
                                <h2 style={{textAlign:'center' }}> Source of Infection </h2>
                                {this.createList()}
                            </Segment>
                            <Segment style={{height: 100,textAlign:'center' }} inverted>
                                <Statistic color='orange'>
                                    <Statistic.Value>{this.state.total_case}</Statistic.Value>
                                    <Statistic.Label style={{color:'white'}}>Total Cases</Statistic.Label>
                                </Statistic>
                            </Segment>
                            {/* <Segment style={{height: 100,textAlign:'center' }} inverted>
                                <Statistic color='orange'>
                                    <Statistic.Value>10</Statistic.Value>
                                    <Statistic.Label style={{color:'white'}}>Total Locations</Statistic.Label>
                                </Statistic>
                            </Segment> */}
                            <Segment style={{height: 90,textAlign:'center' }} inverted>
                                <Statistic color='green' size='small'>
                                    <Statistic.Value>{this.state.update_date}</Statistic.Value>
                                    <Statistic.Label style={{color:'white'}}>Last Updated On</Statistic.Label>
                                </Statistic>
                            </Segment>
                            <Divider hidden/>
                            <Grid.Row >
                            </Grid.Row>
                            
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Grid.Row>
                                {/* <h1>Dengue Source of Infection Heatmap</h1>
                                <br/>
                                    {<img
                                    src={require('../img/indicator.png')}
                                    alt='indicator of the heatmap color'
                                    width={400}
                                    />
                                    } */}
                                    <Heatmap lat = {lat} lng={lng} ranking={this.state.ranking2} height='620px'/>
                                    {/* <TestFunc lat = {lat} lng={lng} ranking={this.state.ranking2} height='690px'/> */}
                            </Grid.Row>
                            <Divider hidden/>
                            <Grid.Row>
                            {/* <Grid>
                                <Grid.Row centered columns={2}>
                                    <Grid.Column>
                                        <Segment inverted color='black'>
                                            <BarChart
                                                data={this.state.barData}
                                                labels={this.state.barLabel}
                                                label='Case Number'
                                            />
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid> */}
                            </Grid.Row>
                            <Divider hidden />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            <Footer/>
            </div>
        )
    }
}
const mapState = state => ({
    user: state.user
})

const mapDispatch = dispatch => ({
    dispatch,
    getNodes: dispatch.nodes.getNodes()

})
export default connect(mapState,mapDispatch)(Dashboard)