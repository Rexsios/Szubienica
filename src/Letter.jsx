import * as React from 'react';

export class Letter extends React.Component
{
    render(){
        let letter = String.fromCharCode(this.props.value);
        return(
            <div className={this.props.className}
            onClick={this.props.onClick} name={this.props.value}>{letter}</div>
        )
    }
}