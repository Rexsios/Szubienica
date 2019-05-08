import * as React from 'react';
import { Letter } from './Letter';
import { Text } from './Text';
import { Hangman } from './Hangman';


export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mistake: 0,
            text: 'Ala ma kota',
            hash: '--- -- ----'
        }
    }

    renderStatus() {
        return (
            <Text text={this.state.hash} />
        )
    }

    renderLetters() {
        let a = [];
        for (let i = 65; i < 90; i++) {
            let x = <Letter key={i} value={i} onClick={() => this.handleLetter(i)} />;
            a.push(x);
        }
        return (
            a
        )
    }

    handleLetter = (i) => {
        const text = this.state.text.toLowerCase();
        let hash = this.state.hash;
        let letter = String.fromCharCode(i).toLowerCase();
        if (text.includes(letter)) {
            console.log('dziala');
            for (let i = 0; i < text.length; i++) {
                if(i===1)letter=letter.toLowerCase();
                if (text[i]===letter)
                {
                    if(i===0)letter=letter.toUpperCase();
                    hash=hash.substr(0,i)+ letter+ hash.substr(i+1);
                }
            }
             this.setState({hash:hash})
        } else {
            this.setState({ mistake: this.state.mistake + 1 })
        }
    }

    renderHMan() {
        let imgs = '/images/s' + this.state.mistake + '.jpg';
        return (
            <Hangman img={imgs} />
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