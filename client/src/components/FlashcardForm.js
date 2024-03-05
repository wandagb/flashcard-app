import { useState } from 'react'
import '../components/submitButton.css';
import '../components/create.css';

const FlashcardForm = ({ id, onAddFlashcard, closeForm}) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const flashcard = {question, answer}

        const response = await fetch(`/api/flashcard`, {
            method: 'POST',
            body: JSON.stringify(flashcard),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const newFlashcard = await response.json()

        if(!response.ok){
            setError(newFlashcard.error)
        }

        if (response.ok){
            const update = await fetch(`/api/set/${id}/flashcard`, {
                method: 'PATCH',
                body: JSON.stringify({cardID: newFlashcard._id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok){
                setError(update.error)
            }
            if(response.ok){
                onAddFlashcard(newFlashcard);
                setAnswer('')
                setQuestion('')
                setError(null)
            }
        }
    }
    return ( 
        <div className='create-container'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <button className="toggle-button" onClick ={() => closeForm(false)}><i class="fa fa-close"></i></button>
        <form className="Create" onSubmit={handleSubmit}>
        
            <h3>Add flashcard</h3>

            <label>Question:</label>
            <input className = 'search-box'
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                />

            <label>Answer:</label>
            <input className = 'search-box'
                type="text"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                />
                
            <button className='submit-button'>Add Flashcard</button>
            {error && <div className="error"> {error} </div>}
        </form>
        </div>
    )
}

export default FlashcardForm