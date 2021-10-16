import { useEffect, useState } from "react"
import "./quiz.css"
import useSound from "use-sound";
import play from "../assets/play.mp3"
import correct from "../assets/correct.mp3"
import wrong from "../assets/wrong.mp3"
import wait from "../assets/wait.mp3"

export default function Quiz({data, stop, setStop, setQuestionNum, questionNum}) {
    
    const [question, setQuestion] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [className, setClassName] = useState("choice")
    const [letsPlay] = useSound(play)
    const [correctSound] = useSound(correct)
    const [wrongSound] = useSound(wrong)

    // useEffect(()=>{
    //     letsPlay()
    // }, [letsPlay])
    
    useEffect(()=> {
        setQuestion(data[questionNum - 1])
    }, [data, questionNum])

    const delay = (duration, callback) =>{
        setTimeout(() => {
           callback()
        }, duration);
    }

    const handleClick = (e)=> {
        setSelectedAnswer(e)
        setClassName("choice active")
        delay(3000, ()=> setClassName(e.correct ? "choice correct" : "choice wrong"))
        delay(5000, ()=>{
            if(e.correct) {
                correctSound()
                delay(1000, ()=>{
                    setQuestionNum((prev) => prev + 1)
                    setSelectedAnswer(null) 
                })      
            } else{
                wrongSound()
                delay(1000, ()=> {
                    setStop(true);
                })            
            }
        })
    }

    return (

        <div className="quiz">
            <div className="soal"> {question?.question} </div>
            <div className="jwbn">
                {question?.answers.map((e)=> 
                <div className={selectedAnswer === e ? className : "choice"} onClick={()=> handleClick(e)}> {e.text} </div>
                )}
                
            </div>
        </div>
    )
}
