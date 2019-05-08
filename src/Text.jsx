import * as React from 'react';

export class Text extends React.Component
{
    render(){
        return(
            <div className='text' >{this.props.text}</div>
        )
    }
}