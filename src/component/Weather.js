  
import React from 'react';
// import axios from 'axios';


class weather extends React.Component {


  
    render() {
console.log(this.props.weather);
        return(
            this.props.weather.map((item)=>(

                <>
                <p>Date : {item.dateTime}</p>
                
                <p>Description : {item.description}</p>
                </>
            )
            )
        )
        }


    }

export default weather;