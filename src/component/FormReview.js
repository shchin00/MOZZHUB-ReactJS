import React from 'react'
import MenuBar from './MenuBar'
import CaseFormReview from './reviewCom'
import {Button,Grid,Form,Divider,Segment, Checkbox, Progress} from 'semantic-ui-react'

class FormReview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            d:'',
            cData:'',
            pData:'',
            nData:'',
            prData:'',
            rData:'',
            mData:''
        };
    }

    componentWillMount(){
        let urlg = "http://localhost:8080/review"
        let urlp = "http://localhost:8080/review"
        fetch(urlg)
            .then (res =>res.json())
            .then (data => //console.log(data)
                this.setState({
                    d:data,
                    cData:data[0],
                    pData:data[1],
                    nData:data[2],
                    prData:data[3],
                    rData:data[4]
                }));
        alert('Complete')
        this.props.history.push("/dashboard")
    }
    render(){
        let c = this.state.rData
        //console.log(this.state.d)
        //console.log(c.refer_dig)
        return(
            <div>
                <MenuBar activeItem='new'/>
                <Segment basic>
                    <Progress value='6' total='6' progress='ratio' color='orange'/>
                </Segment>
            </div>
        )
    }

}
export default FormReview