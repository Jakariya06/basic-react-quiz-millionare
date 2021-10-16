import { useEffect, useState , useMemo} from "react";
import Quiz from "./component/Quiz";
import Timer from "./component/Timer";
import "./styles.css";
import Start from "./component/Start"

function App() {

  const [username, setUsername] = useState(null)
  const[questionNum, setQuestionNum] = useState(1)
  const [stop, setStop] = useState(false)
  const [earned, setEarned] = useState("$ 0")

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  

  const money = useMemo(() => 
    [
      { id: 1, amount: "Rp 10000" },
      { id: 2, amount: "Rp 50000" },
      { id: 3, amount: "Rp 75000" },
      { id: 4, amount: "Rp 100000" },
      { id: 5, amount: "Rp 150000" },
      { id: 6, amount: "Rp 200000" },
      { id: 7, amount: "Rp 250000" },
      { id: 8, amount: "Rp 500000" },
      { id: 9, amount: "Rp 1000000" },
      { id: 10, amount: "Rp 5000000" },
      { id: 11, amount: "Rp 7500000" },
      { id: 12, amount: "Rp 10000000" },
      { id: 13, amount: "Rp 500000000" },
      { id: 14, amount: "Rp 750000000" },
      { id: 15, amount: "Rp 1000000000" },
    ].reverse() ,[]) 

  useEffect(()=>{
    questionNum > 1 && setEarned(money.find((el)=>el.id === questionNum -1).amount)
  }, [money,questionNum])

  return (
    <div className="App">
      {username ? (
        <>
        <div className="main">
        {stop ? (<h1 className="endText">Kamu dapat : {earned}</h1>) 
        :(
      <>
        <div className="top">
          <div className="timer">
             <Timer setStop={setStop} questionNum={questionNum}/> 
            </div>
        </div>
        <div className="bottom">
          <Quiz data={data} setStop={setStop} 
          questionNum={questionNum}
          setQuestionNum={setQuestionNum}/>
        </div>
        </>
        )}
      </div>

      <div className="money">
        <ul className="moneyList">
          {money.map((el) => (
            <li className={questionNum === el.id ? "moneyItem active" : "moneyItem"}>
              <span className="moneyNum">{el.id}</span>
              <span className="moneyAmount"> {el.amount} </span>
            </li>
          ))}
        </ul>
      </div>
        </>
      ) : <Start setUsername={setUsername}/>}

    </div>
  );
}

export default App;
