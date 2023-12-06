import React from 'react';

export default function Question({ questionNumber, question, correct_answer, incorrect_answers, handleAnswer, isCorrect, answersChecked }) {

    const [shuffledArray, setShuffledArray] = React.useState([])
    const [userSelectedAnswer, setUserSelectedAnswer] = React.useState()


    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (4));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    //every time correct and incorrect answers changes
    React.useEffect(() => {
        //adding correct and incorrect answers to the original array
        const originalArray = [
            correct_answer,
            ...incorrect_answers
        ]
        //then shuffle
        const newArray = shuffleArray(originalArray)
        setShuffledArray(newArray)
    }, [correct_answer, incorrect_answers])

    const clickedAnswer = (selectedAnswer) => {
        //set userSelectedAnswer to track for add styling
        setUserSelectedAnswer(selectedAnswer)
        handleAnswer(questionNumber, selectedAnswer)
    }

    return (
        <>
            <div className="question-container">
                <h3>{question}</h3>
                <div className="answer-options">
                    {shuffledArray.map((answer, index) => (
                        <div key={index}
                            onClick={() => clickedAnswer(answer)}
                            className={` 
                            ${userSelectedAnswer === answer ? 'selected-answer' : ''} 
                            ${answersChecked && userSelectedAnswer !== answer && answer === correct_answer ? 'correct-match' : ''}
                            ${userSelectedAnswer === answer && isCorrect === true ? 'correct' : ''}
                            ${userSelectedAnswer === answer && isCorrect === false ? 'incorrect' : ''}
                        `}
                        >
                            {answer}
                        </div>
                    ))}
                </div>
            </div>
            <hr />
        </>
    );
}
