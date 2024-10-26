import {useEffect, useState} from "react";

// eslint-disable-next-line react/prop-types
function QuestionCard({question, options, selectedAnswer, onAnswerSelect}) {
    const [localSelectedAnswer, setLocalSelectedAnswer] = useState(selectedAnswer || {});

    // Update the local state when selectedAnswer changes (when moving between questions)
    useEffect(() => {
        setLocalSelectedAnswer(selectedAnswer || {});
    }, [selectedAnswer]);

    const handleAnswerChange = (answerKey) => {
        const newAnswer = { [answerKey]: true };
        setLocalSelectedAnswer(newAnswer);
        onAnswerSelect(newAnswer); // Pass the selected answer back to the parent component:(handleAnswerSelect)
    };

    return <div className={'pl-9'}>
        <div className={'py-4'}>
            Q{question}
        </div>
        <div className={'pl-3 text-2xl'}>
            <form>
              <ul>
                {Object.entries(options).map(([key, option]) => (  // It displays all the options with the radio checkbox.
                  option && ( //A conditional rendering pattern. It ensures, <li> is rendered iff a non-falsy answer (i.e., the answer exists and is not null or undefined).
                    <li key={key}>
                      <label className={'flex gap-2 hover:cursor-pointer'}>
                        <input
                          type={'radio'}
                          name="answer"
                          value={key}
                          checked={localSelectedAnswer[key] || false} // Ensure the right answer is selected
                          onChange={() => handleAnswerChange(key)}/>
                          {option}
                      </label>
                    </li>
                  )
                ))}
              </ul>
            </form>
        </div>
    </div>
}

export default QuestionCard;