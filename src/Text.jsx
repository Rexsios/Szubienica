import * as React from 'react';

export class Text extends React.Component
{
    render(){
        return(
            <div className={this.props.classinfo}>{this.props.text}</div>
        )
    }
}