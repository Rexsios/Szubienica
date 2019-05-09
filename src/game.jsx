import * as React from 'react';
import { Letter } from './Letter';
import { Text } from './Text';
import { Hangman } from './Hangman';
import {EndPart} from './EndPart';


export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mistake: 0,
            text: 'Ala ma kota',
            hash: '--- -- ----',
            win:false
        }
    }

    renderStatus() {
        if(this.state.mistake!==9)
        return (
            <Text classinfo={'text'} text={this.state.hash} />
        )
        return(
            <>
            <div className="text">Poprawne haslo</div>
            <Text classinfo='textlose' text={this.state.text} />
            </>
        )
    }

    renderLetters() {
        if(this.state.mistake>=9 ||this.state.win===true) return null;
        let a = [];
        for (let i = 65; i < 90; i++) {
            let x = <Letter key={i} value={i} onClick={() => this.handleLetter(i)} />;
            a.push(x);
        }
        
        return (
            
            <div className='checktext'>
            {a}
            </div>
        )
    }

    handleLetter = (i) => {
        const text = this.state.text.toLowerCase();
        let hash = this.state.hash;
        let letter = String.fromCharCode(i).toLowerCase();
        if (text.includes(letter)) {
            for (let i = 0; i < text.length; i++) {
                if (i === 1) letter = letter.toLowerCase();
                if (text[i] === letter) {
                    if (i === 0) letter = letter.toUpperCase();
                    hash = hash.substr(0, i) + letter + hash.substr(i + 1);
                }
            }
            let win=false;
            if(hash===this.state.text){win=true;} 
            this.setState({ hash: hash, win:win})
        } else {
            this.setState({ mistake: this.state.mistake + 1 })
        }
    }

    renderEnd()
    {
        let win= "Gratulacje! Udalo Ci sie odgadnac haslo!"; 
        let lose= "Zginales. Beznadzieja";
        if(this.state.win===false){
        if(this.state.mistake!==9) return null;
        }
        let info= this.state.win ? win: lose;
        let classinfo= this.state.win ? "endpartwin": "endpartlose";
        return(
            <EndPart win={info} classinfo={classinfo} onClick={()=>this.handleButton()}/>
        )
    }
    
    handleButton=()=>{
        this.setState({
            mistake: 0,
            text: 'Ala ma kota',
            hash: '--- -- ----',
            win:false
        })
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
                {this.renderLetters()}
                {this.renderEnd()}
                {this.renderHMan()}
            </div>
        )
    }
}