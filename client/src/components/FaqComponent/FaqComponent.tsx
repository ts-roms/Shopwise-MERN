import { useState } from "react";
import { IQuestion } from "../../Interface";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import style from "../../styles/style";

interface IProps {
  questions: IQuestion[];
}

function FaqComponent({ questions }: IProps) {
  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState<
    number | null
  >(null);

  const handleQuestionClick = (index: number) => {
    if (expandedQuestionIndex === index) {
      setExpandedQuestionIndex(null);
    } else {
      setExpandedQuestionIndex(index);
    }
  };

  return (
    <div className={`${style.section} min-h-[70vh] my-12`}>
      <div className="mx-auto max-w-5xl space-y-6">
        {questions.map((q, index) => (
          <div key={index} className="py-3 px-9 shadow rounded-md bg-white">
            <div
              className={`${style.flex_normal} justify-between cursor-pointer`}
              onClick={() => handleQuestionClick(index)}
            >
              <h2 className="font-medium text-xl">{q.question}</h2>
              <span>
                {expandedQuestionIndex !== index ? (
                  <MdOutlineKeyboardArrowDown size={23} />
                ) : (
                  <MdOutlineKeyboardArrowUp size={23} />
                )}
              </span>
            </div>
            {expandedQuestionIndex === index && (
              <div className="mt-2 font-light text-gray-800">{q.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaqComponent;
