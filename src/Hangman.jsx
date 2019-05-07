import * as React from 'react';
export class Hangman extends React.Component {
    render() {
        return (
            <div className='hangman'>
            <img src={this.props.img} alt='img' className='images'></img>
            </div>
    )
    }
}