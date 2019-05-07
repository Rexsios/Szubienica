import * as React from 'react';
import { Letter } from './Letter';
import { Text } from './Text';
import { Hangman } from './Hangman';


export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state={image: 's0'}
    }

    renderStatus() {
        return (
            <Text />
        )
    }

    renderLetters() {
        let a=[];
        for (let i = 65; i < 90; i++) {
            let x= <Letter value={i} />;
            a.push(x);
        }
        return (
            a  
        )
    }

    renderHMan() {
        let imgs='/images/'+this.state.image+'.jpg';
        console.log(imgs);
        return (
            <Hangman img={imgs}/>
        )
    }

    render() {
        return (
            <div className='game'>
                {this.renderStatus()}
                <div className='checktext'>
                {this.renderLetters()}
                </div>
                {this.renderHMan()}
            </div>
        )
    }
}