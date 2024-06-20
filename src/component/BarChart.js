import React from 'react'
import { Bar } from 'react-chartjs-2'

const BarChart =({data=[],labels=[],label=''})=>(

        <Bar width={200} height={70} 
            data={
                {
                    datasets:[
                        {
                            label:label,
                            data:data,
                            backgroundColor: "rgba(255, 255, 0,0.5)",
                        }],
                    labels:labels}}
            options={{
                responsive:true,
                scales: {
                    xAxes:[{
                        scaleLabel:{
                            labelString:'month',
                            display:true,
                        }
                    }],
                    yAxes: [{
                        scaleLabel:{
                            labelString:'number of case ',
                            display:true,
                        },
                        ticks: {
                            beginAtZero:true,
                        }
                    }]
                }
            }}
            
        />
)


export default BarChart