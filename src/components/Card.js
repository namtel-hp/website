import React, {Component} from 'react';
import '../css/Card.scss';
import '../css/Home.scss';

export class Card extends Component {
    constructor(props) {
        super(props);

        this.toggleExpand = this.toggleExpand.bind(this);

        this.state = {
            isExpanded: false
        };

        this.maxChars = this.props.maxChars ? this.props.maxChars : 230;
        this.isExpandable = false;
        this.first = [];
        this.rest = [];

        if (typeof this.props.children === "string" && this.props.children.length > this.maxChars) {
            this.isExpandable = true;
            this.first = this.props.children.substring(0, this.maxChars);
            this.rest = this.props.children.substring(this.maxChars);
        } else if (Array.isArray(this.props.children)) {
            let charCount = 0;
            for (const el of this.props.children) {
                if (typeof el === "string") {
                    charCount += el.length;
                }
            }
            if (charCount > this.maxChars) {
                this.isExpandable = true;

                charCount = 0;
                let insideElement = false;
                for (let i = 0; i < this.props.children.length; i++) {
                    const el = this.props.children[i];
                    if (typeof el === "string") {
                        charCount += el.length;
                    } else {
                        insideElement = !insideElement;
                    }

                    if (!insideElement && charCount > this.maxChars) {
                        this.first = [...this.props.children];
                        this.rest = this.first.splice(i);
                        break;
                    }
                }
            }
        }
    }

    toggleExpand() {
        const expanded = this.state.isExpanded;
        this.setState({isExpanded: !expanded});
    }

    render() {
        if (this.isExpandable) {
            return (
                <div className={this.props.isMobile ? 'card card-mobile' : 'card'}>
                    <div className={'card-header'}>
                        <h3 style={{color: 'white'}}>{this.props.title}</h3>
                        <button className={'plus-btn'} onClick={this.toggleExpand}>
                            <div className={this.state.isExpanded ? 'plus x' : 'plus'}/>
                        </button>
                    </div>
                    <p>
                        {this.first}
                        {this.state.isExpanded ? this.rest : '...'}
                    </p>
                </div>
            );
        } else {
            return (
                <div className={this.props.isMobile ? 'card card-mobile' : 'card'}>
                    <h3 style={{color: 'white'}}>{this.props.title}</h3>
                    <p>
                        {this.props.children}
                    </p>
                </div>
            );
        }
    }
}
