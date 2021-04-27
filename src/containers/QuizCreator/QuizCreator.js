import React, {Component} from 'react'
import classes from './QuizCreator.module.css'
import Button from "../../components/Button/Button";
import Input from "../../components/UI/Input/Input";
import {createControl} from "../../form/formFramework"
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

function createControlOption(number) {
    return(
        createControl({
            label: `Вaриант ${number}`,
            errorMessage : "Вопрос не может быть пустым",
            id : number
        }, {required : true})
    )
}

function createFormControls() {
    return (
        {
            question : createControl({
                label: "Введите вопрос",
                errorMessage : "Вопрос не может быть пустым"
            }, {required : true}),
            option1 : createControlOption(1),
            option2 : createControlOption(2),
            option3 : createControlOption(3),
            option4 : createControlOption(4)
        }
    )
}
export default class QuizCreator extends Component {
    state = {
        quiz:[],
        formControls: createFormControls()
    }

    submitHandler = event =>{
        event.preventDefault()
    }
    addQuestionHandler(){}
    createQuiz(){}
    onChangeHandler (value, controlName){

    }
    renderControls(){
        return Object.keys(this.state.formControls).map((controlName,index)=>{
            const control = this.state.formControls[controlName];
            return(
                <Auxiliary key = {controlName + index}>
                    <Input
                        key = {controlName + index}
                        value = {control.value}
                        label = {control.label}
                        errorMessage ={control.errorMessage}
                        valid = {control.valid}
                        touched = {control.touched}
                        shouldValidate = {!!control.validation}
                        onChange = {event => this.onChangeHandler(event.target.value, controlName)}
                    />
                    {index ===0 ? <hr/> : null }
                </Auxiliary>
            )
        })
    }
    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                <h1> Создание теста </h1>
                <form onSubmit={this.submitHandler}>
                    {this.renderControls()}
                    <select></select>
                    <Button
                        type = "primary"
                        onClick = {this.addQuestionHandler}
                    >
                        Добавить вопрос
                    </Button>
                    <Button
                        type = "success"
                        onClick = {this.createQuiz}
                    >
                        Создать тест
                    </Button>
                </form>
                </div>
            </div>
        )
    }
}