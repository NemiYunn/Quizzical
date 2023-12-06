import React from 'react';
import Question from './Question';

export default function Quiz() {
    //getting questions from db
    const [quiz, setQuiz] = React.useState([]);
    //maintaing questions with its user selected answers
    const [answers, setAnswers] = React.useState([])

    const [result, setResult] = React.useState([])
    //to add some styles after checking(whether check button clicked)
    const [answersChecked, setAnswersChecked] = React.useState(false)
    //to track no of correct answers
    const [count, setCount] = React.useState(0)
    //to track best score
    const [bestScore, setBestScore] = React.useState(
        localStorage.getItem('bestScore') !== null ?
            //10 is for saying this integer is base 10 value
            parseInt(localStorage.getItem('bestScore'), 10) :
            0
    );

    React.useEffect(() => {
        // Make API call when component mounts
        fetch("https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => setQuiz(data.results))
            .catch(error => console.error('Error fetching quiz data:', error.message));
    }, []); // Empty dependency array ensures this effect runs only once

    // console.log(quiz.length > 0 ? quiz : 'Loading...');

    //  this will pass to the quiz component and again calling it from there
    // with selectedAnswers
    const handleAnswer = (questionNumber, selectedAnswer) => {
        // console.log(questionNumber,selectedAnswer)
        //should set this inside the answer array
        setAnswers((prevAnswers) => {
            // filter out answers that doesnt have same question number to an new array
            const distinctAnswers = prevAnswers.filter(answer => answer.questionNumber !== questionNumber)
            // add new question and selected answer to the distinctAnswers
            return [...distinctAnswers, { questionNumber, selectedAnswer }]
        })
    }

    // console.log(answers)

    const checkAnswers = () => {
        //map throgh quiz
        const result = quiz.map((question, index) => {
            //whether that questions answer match with selected answer
            // Find the selected answer for the current question in the answers array
            const selectedAnswer = answers.find((answer) => answer.questionNumber === index + 1)

            // Check if a selected answer exists and if it matches the correct answer
            //because this selected answer is an object with 2 propertis {questionNumber,selectedAnswer}
            const isCorrect = selectedAnswer && selectedAnswer.selectedAnswer === question.correct_answer
            // Increment the count if the answer is correct
            if (isCorrect) {
                setCount((prevCount) => prevCount + 1);
            }

            // Return an object with the question number and its correctness status
            return { questionNumber: index + 1, isCorrect }

        })

        // Use a callback function to log the correct count 
        //after the state has been updated
        setCount((prevCount) => {
            console.log(prevCount);
            return prevCount;
        });

        setResult(result)
        //this result state is an obj array with question number and isCorrect
        setAnswersChecked(true)


    }

    // This ensures that the bestScore is updated 
    //after the count has been updated.
    React.useEffect(() => {
        // Update new best score (compare with current count)
        setBestScore((prevBestScore) => {
            const updatedBestScore = Math.max(prevBestScore, count);
            localStorage.setItem('bestScore', updatedBestScore);
            return updatedBestScore;
        });
    }, [count]);

    React.useEffect(() => {
        console.log("bestScore", bestScore);
    }, [bestScore]);


    return (
        <>
            <svg className='random--shape1' xmlns="http://www.w3.org/2000/svg" width="260" height="241" viewBox="0 0 160 141" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z" fill="#FFFAD1" />
            </svg>
            <svg className='random--shape2' xmlns="http://www.w3.org/2000/svg" width="148" height="118" viewBox="0 0 148 118" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8" />
            </svg>
            {quiz.map((question, index) => (
                <Question
                    key={index}
                    questionNumber={index + 1}
                    {...question}
                    handleAnswer={handleAnswer}
                    isCorrect={result[index]?.isCorrect}
                    answersChecked={answersChecked}
                />
            )

            )}
            {answersChecked ? <h5>No of Correct answers - {count} </h5> : ""}
            {answersChecked ? <h4>Your Best Score - {bestScore} </h4> : ""}
            <button className="check-answers-button" onClick={checkAnswers} >Check answers</button>
        </>
    )
}

