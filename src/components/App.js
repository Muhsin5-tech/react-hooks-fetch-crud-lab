import React, { useEffect, useState } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function App() {
    const [questions, setQuestions] = useState([]);
    const [view, setView] = useState("viewQuestions");
    const [editingQuestion, setEditingQuestion] = useState(null);

    const url = "http://localhost:4000/questions";

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleAddQuestion = (newQuestion) => {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newQuestion),
        })
        .then(response => response.json())
        .then(data => setQuestions([...questions, data]))
        .catch(error => console.error('Error adding question:', error));
    };

    const handleDeleteQuestion = (id) => {
        fetch(`${url}/${id}`, {
            method: "DELETE",
        })
        .then(() => setQuestions(questions.filter(q => q.id !== id)))
        .catch(error => console.error('Error deleting question:', error));
    };

    const handleEditQuestion = (question) => {
        setEditingQuestion(question);
        setView("addQuestion");
    };

    const handleUpdateQuestion = (updatedQuestion) => {
        fetch(`${url}/${updatedQuestion.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedQuestion),
        })
        .then(response => response.json())
        .then(data => {
            setQuestions(questions.map(q => (q.id === data.id ? data : q)));
            setEditingQuestion(null);
            setView("viewQuestions");
        })
        .catch(error => console.error('Error updating question:', error));
    };

    const handleUpdateAnswer = (questionId, selectedIndex) => {
        const updatedQuestions = questions.map((question) => {
            if (question.id === questionId) {
                return { ...question, correctIndex: selectedIndex };
            }
            return question;
        });
        setQuestions(updatedQuestions);

        fetch(`${url}/${questionId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correctIndex: selectedIndex }),
        })
        .catch(error => console.error('Error updating answer:', error));
    };

    return (
        <div className="App">
            <h1>Quiz Manager</h1>
            <div className="buttons-container">
                <button onClick={() => setView("viewQuestions")}>View Questions</button>
                <button onClick={() => setView("addQuestion")}>Create New Question</button>
            </div>
            {view === "viewQuestions" ? (
                <QuestionList 
                    questions={questions} 
                    onDeleteQuestion={handleDeleteQuestion} 
                    onEditQuestion={handleEditQuestion} 
                    onUpdateAnswer={handleUpdateAnswer}
                />
            ) : (
                <QuestionForm 
                    onAddQuestion={handleAddQuestion} 
                    onUpdateQuestion={handleUpdateQuestion} 
                    question={editingQuestion}
                />
            )}
        </div>
    );
}

export default App;
