import React from 'react';
import nextId from "react-id-generator";
import { Dialog } from "./dialog.js";

class Choice extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    handleClickChoice = (e) => {
        this.props.changeChoice(e.target.dataset.index);

    }

    createVarList = () => {
        let items = [];
        let vl = this.props.variants;        
        for (var i in vl){
            let idRadio  = nextId("chBtn_");            
            let check = (Number(i) === this.props.numVar) ? true : false;
            let elem = (
                <div className="form-check" key={i}>
                    <input className="form-check-input" type="radio" data-index={i} onChange={this.handleClickChoice} name="check_choice" id={idRadio} checked={check}/>
                    <label className="form-check-label" htmlFor={idRadio}> {vl[i]} </label>
                </div>
            );
            items.push(elem);
        }
        return items;
    }

    render() {
        let varList = this.createVarList();
        return (
            <form style={{overflow: "auto"}}>
                <h3 className="mb-2"> {this.props.textChoice} </h3>
                <div className="form-floating mb-2">
                    {varList}
                </div>
            </form>
        )

    }
}

export class ChoiceDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numVariant: 0
        };

    }

    handleCancel = () => {
        this.props.screenOut.setState({
            choice_prm: [],
            choice: -1,
        });
        this.props.promise.ctrl.resolve();
    }

    handleClickChoose = () => {
        let num = this.state.numVariant;
        this.props.screenOut.setState({
            choice_prm: [],
            choice: num,
        });
        //console.log("handleClickChoose index >>", this.state.numVariant);
        this.props.promise.ctrl.resolve(num);
    }

    changeChoice(index) {
        //console.log("changeChoice index >>", index);
        this.setState({
            numVariant: index - 0
        });

    }

    render() {
        //let display = 'flex';

        return (
            <Dialog handleOk={this.handleClickChoose} handleCancel={this.handleCancel}
                title={this.props.title} textOk='Выбрать' styleBox = {{height: '50vh', width: '65vh'}}     >

                <div style={{display: 'flex'}}>
                    <Choice variants = {this.props.variants}  numVar = {this.state.numVariant}
                        changeChoice = {(index) => this.changeChoice(index)}
                        textChoice = {this.props.textChoice}
                    />
                </div>

            </Dialog>
        );
    }
}