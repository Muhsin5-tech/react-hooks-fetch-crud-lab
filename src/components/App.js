import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [isViewing, setIsViewing] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:4000/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  const addQuestion = async (newQuestion) => {
    try {
      const response = await fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });
      const data = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, data]);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'DELETE',
      });
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const updateCorrectAnswer = async (id, newIndex) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correctIndex: newIndex }),
      });
      const updatedQuestion = await response.json();
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === updatedQuestion.id ? updatedQuestion : q
        )
      );
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div className='App'>
      <div>
      <button onClick={() => setIsViewing(true)}>View Questions</button>
      <button onClick={() => setIsViewing(false)}>New Question</button>
      </div>
      {isViewing ? (
        <QuestionList
          questions={questions}
          onDelete={deleteQuestion}
          onUpdate={updateCorrectAnswer}
        />
      ) : (
        <QuestionForm onAdd={addQuestion} />
      )}
    </div>
  );
};

export default App;
