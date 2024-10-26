import QuestionCard from "../../cards/QuestionCard.jsx";
import {QuestionSet} from "../../QuestionSet.jsx";
import {useState} from "react";

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);

    // Handle when user selects an answer for the current question
    const handleAnswerSelect = (answer) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestion]: answer // Save answer for the current question
        }));
    };

    const handleNext = () => {
        if (currentQuestion < QuestionSet.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateScore(); // End of quiz, calculate score
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    // Calculate the final score based on user's answers
    const calculateScore = () => {
        let totalScore = 0;

        QuestionSet.forEach((question, num) => {
            const correctAnswers = question.correct;
            const userAnswer = selectedAnswers[num];  // selected answer by user of (num)th index question.

            // Check if the user's selected answer(s) match the correct answer(s)
            let isCorrect = false;
            if (userAnswer) {
                for (const i in userAnswer) {
                    if (userAnswer[i] === correctAnswers[i]) {
                        isCorrect = true;
                        break;
                    }
                }
                if (isCorrect) {
                    totalScore += 1; // Increment score for each correct answer
                }
            }
        });
        setScore(totalScore);
    };

    return <div>
        {score === null ? (
            <div className={'w-full text-3xl bg-blue-200 h-screen'}>
                <h2 className={'flex justify-center py-8 text-4xl text-center font-serif'}>
                    Here are 5 Sample Questions, answer them correctly.</h2>
                {QuestionSet.length > 0 && (
                    <QuestionCard question={QuestionSet[currentQuestion].question}
                                  options={QuestionSet[currentQuestion].options}
                                  selectedAnswer={selectedAnswers[currentQuestion]}
                                  onAnswerSelect={handleAnswerSelect}/>
                )}
                <div className="inline-flex text-sm navigation-button ml-9 py-7">
                    {currentQuestion !== 0 ? (
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                onClick={handlePrev}>
                                Prev
                        </button>) : <></>
                    }
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            onClick={handleNext}>
                            {currentQuestion === QuestionSet.length - 1 ? 'Finish Quiz' : 'Next'}
                    </button>
                </div>
            </div>
        ) : (
            <div className="score-section bg-blue-200 h-screen">
                <h1 className="py-8 text-4xl text-center font-serif">You have completed the Quiz</h1>
                <h1 className="text-2xl text-center mt-10"> Here is Your Score</h1>
                <h2 className="text-2xl text-center mt-10">Your Score: {score} / {QuestionSet.length}</h2>
                <button className="mt-10 ml-5 px-4 py-1.5 pb-2 bg-blue-500 text-white transition-transform transform hover:scale-105
                                   shadow-sm rounded-md"
                        onClick={() => window.location.reload()}>
                        Restart Quiz
                </button>
            </div>
        )}
    </div>
}

export default Quiz;