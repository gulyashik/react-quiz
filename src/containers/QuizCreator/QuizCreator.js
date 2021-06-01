import React, {Component} from 'react'
import classes from './QuizCreator.module.css'
import Button from "../../components/Button/Button";
import Input from "../../components/UI/Input/Input";
import {createControl, validate, validateForm } from "../../form/formFramework"
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import axios from '../../axios/axios-quiz';
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

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
class QuizCreator extends Component {
    state = {
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId:1
    }

    submitHandler = event =>{
        event.preventDefault()
    }
    addQuestionHandler = event =>{
        event.preventDefault()

        const {question,option1,option2,option3,option4} =  this.state.formControls
        const questionItem = {
            question : question.value,
            rightAnswerId : this.state.rightAnswerId,
            id : this.props.quiz.length +1,
            answers : [
                {text : option1.value , id : option1.id},
                {text : option2.value , id : option2.id},
                {text : option3.value , id : option3.id},
                {text : option4.value , id : option4.id}
            ]
        }
        this.props.createQuizQuestion(questionItem)
        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId:1
        })

    }
    createQuiz = event =>{
        this.props.finishCreateQuiz()
        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId:1
        })
    }
    onChangeHandler (value, controlName){
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.value = value
        control.touched = true
        control.valid = validate(control.value, control.validation)
        formControls[controlName] = control
        this.setState({
            formControls,
            isFormValid : validateForm(formControls)
        })

    }
    selectHandler = event =>{
        this.setState({
            rightAnswerId : +event.target.value
        })
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
        const select = <Select
        label = "Выберите правильный ответ"
        value = {this.state.rightAnswerId}
        onChange = {this.selectHandler}
        options = {[
            {text : "1",value :"1"},
            {text : "2",value :"2"},
            {text : "3",value :"3"},
            {text : "4",value :"4"}
        ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                <h1> Создание теста </h1>
                <form onSubmit={this.submitHandler}>
                    {this.renderControls()}
                    {select}
                    <Button
                        type = "primary"
                        onClick = {this.addQuestionHandler}
                        disabled = {!this.state.isFormValid}
                    >
                        Добавить вопрос
                    </Button>
                    <Button
                        type = "success"
                        onClick = {this.createQuiz}
                        disabled = {this.props.quiz.length ===0}
                    >
                        Создать тест
                    </Button>
                </form>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}
function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion : item => dispatch (createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)