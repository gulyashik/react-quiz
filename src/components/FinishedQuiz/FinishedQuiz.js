import React from 'react';
import classes from './FinishedQuiz.module.css';
import Button from '../Button/Button'
import {Link} from "react-router-dom";

const FinishedQuiz = (props) => {
    const successCount = Object.keys(props.results).reduce((total,current)=>{
        if(props.results[current] ==='success') {
            total++;
        }
        return total;
    },0)
    return(
    <div className={classes.FinishedQuiz}>
        <ul>
            {props.quiz.map((item,index)=>{
                const cls =[
                    'fa',
                    props.results[item.id] ==='success' ? 'fa-check': 'fa-times',
                    classes[props.results[item.id]]
                ];
                return(
                    <li key = {index}>
                        <strong>{item.id +1 }. </strong>
                        {item.question}
                        <i className={cls.join(' ')}></i>
                    </li>
                )

            })}
        </ul>
        <p> Правильно {successCount} из {props.quiz.length}</p>
        <div>
            <Button retryHandler={props.retryHandler} type = "primary">
                Повторить
            </Button>
            <Link to = "/">
                <Button type = "success">
                    Перейти в список тестов
                </Button>
            </Link>
        </div>
    </div>
    );

}
export default FinishedQuiz;