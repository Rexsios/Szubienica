import * as React from 'react';
import { Letter } from './Letter';
import { Text } from './Text';
import { Hangman } from './Hangman';
import { EndPart } from './EndPart';
import PostData from './List.json'


export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mistake: 0,
            text: null,
            hash: null,
            win: false,
            tab: null,
            lettersgood: Array(36).fill(null),
            lettersbad: Array(36).fill(null)
        }
    }

    componentDidMount() {
        const tab = PostData.map((postDetail) => {
            return postDetail.text;
        }
        )
        let random = Math.floor(Math.random() * (tab.length));
        let hash = this.hashname(tab[random]);
        this.setState({ text: tab[random], hash: hash, tab: tab })

        for(let i=0;i<10;i++){
            
        }
    }

    hashname(text) {
        let hash = '';
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') { hash = hash + ' '; }
            else hash = hash + "-";
        }
        return hash;
    }

    renderStatus() {
        if (this.state.mistake !== 9)
            return (
                <Text classinfo={'textstatus'} text={this.state.hash} />
            )
        return (
            <>
                <div className="text">Poprawne haslo</div>
                <Text classinfo='textlose' text={this.state.text} />
            </>
        )
    }

    renderLetters() {
        if (this.state.mistake >= 9 || this.state.win === true) return null;
        let a = [];
        let x = null;
        let className=null;
        for (let i = 65; i < 91; i++) {
            if(this.state.lettersgood.includes(i)) className='lettergreen'
            else if(this.state.lettersbad.includes(i)) className='letterred'
            else className='letter'
                x = <Letter key={i} className={className} value={i} onClick={() => this.handleLetter(i)} />;
            a.push(x);
        }

        return (
            <div className='checktext'>
                {a}
            </div>
        )
    }

    handleLetter = (i) => {
        let lettersgood = this.state.lettersgood;
        let lettersbad = this.state.lettersbad;
        if (!lettersgood.includes(i) && !lettersbad.includes(i)) {
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
                let win = false;
                if (hash === this.state.text) { win = true; }
                lettersgood.push(i);
                this.setState({ hash: hash, win: win, lettersgood: lettersgood })
            } else {
                lettersbad.push(i);
                this.setState({ mistake: this.state.mistake + 1, lettersbad: lettersbad })
            }
        }
    }

    renderEnd() {
        let win = "Gratulacje! Udalo Ci sie odgadnac haslo!";
        let lose = "Zginales. Beznadzieja";
        if (this.state.win === false) {
            if (this.state.mistake !== 9) return null;
        }
        let info = this.state.win ? win : lose;
        let classinfo = this.state.win ? "endpartwin" : "endpartlose";
        return (
            <EndPart win={info} classinfo={classinfo} onClick={() => this.handleButton()} />
        )
    }
    //reset!!!
    handleButton = () => {
        let number = Math.floor(Math.random() * (this.state.tab.length))
        let hash = this.hashname(this.state.tab[number]);
        this.setState({
            mistake: 0,
            hash: hash,
            text: this.state.tab[number],
            win: false,
            lettersgood: Array(35).fill(null),
            lettersbad: Array(35).fill(null)
        })
    }

    renderHMan() {
        let imgs = './images/s' + this.state.mistake + '.jpg';
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