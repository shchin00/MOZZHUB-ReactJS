import React from 'react'
import MenuBar from './MenuBar'
import CaseFormReview from './reviewCom'
import CaseFormReview2 from './reviewCom2'
import CaseFormReview3 from './reviewCom3'
import MobilityFormReview from './MobilityFormReview'
import moment from 'moment'
import { push } from 'react-router-redux'
import {interactiveMap} from './interactiveMap'

import config from '../config'
import {Button,Grid,Divider,Segment,Icon,Table,Pagination,Modal,Dimmer,Loader} from 'semantic-ui-react'

class CaseRecord extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open:false,
            pageSize:10,
            wait:false,
            data:[],
            data2:[],
            id:'',
            view:false,
            cData:{},
            pData:{},
            nData:{},
            pcData:{},
            rData:{},
            begin:1,
            end:'',
            totalPage:[],
            pageData:[],
            activePage:1,
            mob_status:false
        };
        this.handleSearch = this.handleSearch.bind(this)
        this.triggerButton = this.triggerButton.bind(this)
        this.createPagination = this.createPagination.bind(this)

    }

    componentDidMount(){
        const area = sessionStorage.getItem('area');
        let url = `${config.url}/genList/`+area
            fetch(url)
            .then (res =>res.json())
            .then (data => this.setState({
                    data:data[0],
                    data2:data[1],
                    wait:false}))
            .catch((err)=>console.log(err))
            
    }

    handleSearch(id){
        this.setState({wait:true})
        let url = `${config.url}/view/`+encodeURIComponent(id)
        fetch(url)
            .then (res =>res.json())
            .then (data =>this.setState({
                id:id,
                view:true,
                currentSec:1,
                cData:data.cData,
                pData:data.pData,
                nData:data.nData,
                pcData:data.cpData,
                rData:data.rData,
                mData:data.mData,
                mob_status:data.mStatus,
                mob_ProSta:'',
                open:true,
                wait:false
            })
        )
    }

    numberRow(activePage){
        let pageSize = this.state.pageSize
        let lower = (activePage*pageSize)-pageSize
        let upper = (activePage*pageSize)
        let pageData = (this.state.data2).slice(lower,upper)
        return pageData.map((el,i)=>
               <Table.Row key={pageData[i].case_no}>
                <Table.Cell>{(activePage*pageSize)-10+i+1}</Table.Cell>
                <Table.Cell>{pageData[i].case_no}</Table.Cell>
                <Table.Cell compact><Icon name={pageData[i].status==null?'times':'check'} color={pageData[i].status==null?'red':'green'}/></Table.Cell>
                <Table.Cell compact><Icon name={pageData[i].status==2?'times':'check'} color={pageData[i].status==2?'red':'green'}/></Table.Cell>
                <Table.Cell>
                    <Modal
                        open={this.state.open}
                        size='large'
                        trigger={<Button circular icon='search' color='blue' size={'small'} onClick={this.handleSearch.bind(this,pageData[i].case_no)} content={'view'}/>}>
                        <Modal.Content scrolling>
                            {this.createFormView()}
                        </Modal.Content>
                        <Modal.Actions style={{textAlign:'center'}}>
                            <Button color='red' inverted onClick={() => this.setState({open:false})}>
                                <Icon name='remove'/> Close
                            </Button>
                            {this.addMobButton()}
                            {this.editMobButton()}
                            {this.interactiveMap()}
                        </Modal.Actions>
                    </Modal>
                </Table.Cell>
            </Table.Row>
        )
    }

    addMobButton(){
        if(this.state.mob_status==false){
            let c = this.state.cData
            let p = this.state.pData
            let n = this.state.nData
            //console.log(c.case_no)
            let data = {
                caseID:c.case_no,
                onset:moment(n.onset_date).format('YYYY-MM-DD'),
                address:p.curr_add,
                other_add:p.oth_add,
                area:c.case_area
            }
            return(
                <Button color='orange' inverted onClick={() =>  this.props.history.push('/addMob',{data:data})}>
                    <Icon name='add'/> Add Mobility
                </Button>
            )
        }
    }

    editMobButton(){
        if(this.state.mob_status==true && this.state.mData.status!=2){
            let c = this.state.cData
            let p = this.state.pData
            let n = this.state.nData
            let m = this.state.mData
            let pat_mob = JSON.parse(m.pat_mob)
            // console.log(c.case_no)
            let data = {
                caseID:c.case_no,
                onset:moment(n.onset_date).format('YYYY-MM-DD'),
                address:p.curr_add,
                other_add:p.oth_add,
                area:c.case_area,
                mob:pat_mob,
                status: this.state.mData.status
            }
            return(
                <Button color='blue' inverted onClick={() =>  this.props.history.push('/editMob',{data:data})}>
                    <Icon name='edit'/> Edit Mobility
                </Button>
            )
        }
    }

    interactiveMap(){
        if(this.state.mob_status==true){
           // let case_id = this.state.cData.case_no
            let case_id = 'T1578'
            return(
                <Button color='blue' inverted onClick={() => this.props.history.push('/interactiveMap',{case_id})}>
                    <Icon name="map"/> Interactive Map
                </Button>
            )
        }

    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({activePage})
    }

    createPagination(){
        let total = (this.state.data).length
        let page = Math.ceil(total/this.state.pageSize)
        var pageList =[]
        for (var i = 0; i<page;i++){
            pageList.push(i)
        }
        return (
            <Pagination 
                activePage={this.state.activePage}
                ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                prevItem={{ content: <Icon name='angle left' />, icon: true }}
                nextItem={{ content: <Icon name='angle right' />, icon: true }} 
                siblingRange={1}
                pointing
                secondary
                boundaryRange={1}
                onPageChange={this.handlePaginationChange}
                totalPages={page}
            />
        )
    }

    triggerButton(id){
        return(
            <Button circular icon='search' color='blue' size={'small'} onClick={this.handleSearch.bind(id)} content={'view'}/>
        )
    }
    
    createFormView(){
        let c = this.state.cData
        let p = this.state.pData
        let n = this.state.nData
        let pc = this.state.pcData
        let r = this.state.rData
        //let m = this.state.mData
        if(this.state.mob_status==true){
            let m = this.state.mData
            let pat_mob = JSON.parse(m.pat_mob)
            //console.log(pat_mob.d1)
            return(
                <div>
                    <Segment>
                        <CaseFormReview dataC={c} dataP={p} dataN={n}/>
                    </Segment>
                    <Segment>
                        <CaseFormReview2 dataC={c} dataP={p} dataN={n}/>
                    </Segment>
                    <Segment>
                        <CaseFormReview3 dataPC={pc} dataR = {r}/>
                    </Segment>
                    <Segment>
                        <MobilityFormReview dataM={m}/>
                    </Segment>
                </div>
            ) 
        }
        else{
            return(
                <div>
                    <Segment>
                        <CaseFormReview dataC={c} dataP={p} dataN={n}/>
                    </Segment>
                    <Segment>
                        <CaseFormReview2 dataC={c} dataP={p} dataN={n}/>
                    </Segment>
                    <Segment>
                        <CaseFormReview3 dataPC={pc} dataR = {r}/>
                    </Segment>
                </div>
            )
        }
        
    }

    render(){
        return(
            <div>
                <MenuBar activeItem='record'/>
                <Divider hidden/>
                <Grid centered>
                <h3>Historical Record</h3>
                <Grid.Row>
                <Dimmer active={this.state.wait}>
                    <Loader active={this.state.wait}>Preparing Data</Loader>
                </Dimmer>
                        <Table celled size='medium' stackable collapsing compact>
                            <Table.Header>
                                <Table.Row>
                                <Table.HeaderCell>No.</Table.HeaderCell>
                                <Table.HeaderCell>Case ID</Table.HeaderCell>
                                <Table.HeaderCell>Mobility</Table.HeaderCell>
                                <Table.HeaderCell>Editable</Table.HeaderCell>
                                <Table.HeaderCell>Report</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>{this.numberRow(this.state.activePage)}</Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='5'>
                                     {this.createPagination()}
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                        </Grid.Row>
                </Grid>
            </div>
        )
    }

}
export default CaseRecord