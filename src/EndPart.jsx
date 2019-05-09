import React from 'react';

export class EndPart extends React.Component{
    render(){
        return(
            <div className='endpart'>
            <div className={this.props.classinfo}>{this.props.win}</div>
            <button className='btnend' onClick={this.props.onClick}>Chcesz zagrac jeszcze raz? :></button>
            </div>
        )
    }
}