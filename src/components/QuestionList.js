import React from 'react';
import QuestionItem from './QuestionItem';

const QuestionList = ({ questions, onDelete, onUpdate }) => {
  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
