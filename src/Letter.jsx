import * as React from 'react';

export class Letter extends React.Component
{
    render(){
        let letter = String.fromCharCode(this.props.value);
        return(
            <div className='letter' key={this.props.value}>{letter}</div>
        )
    }
}