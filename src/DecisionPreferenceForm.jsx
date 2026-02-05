import React, { useState } from 'react';

const DecisionPreferenceForm = ({ onStart, totalAvailableQuestions }) => {
    const [numQuestions, setNumQuestions] = useState(5);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        onStart({ numQuestions, soundEnabled });
    };

    return (
        <div className="card config-card">
            <h2 className="title">Game Settings</h2>
            <p className="purpose">Customize the game for your child</p>

            <form onSubmit={handleSubmit} className="preference-form">
                <div className="form-group">
                    <label htmlFor="numQuestions">
                        Number of Questions: <strong>{numQuestions}</strong>
                    </label>
                    <input
                        id="numQuestions"
                        type="range"
                        min="1"
                        max={totalAvailableQuestions}
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                        className="range-input"
                    />
                    <div className="range-labels">
                        <span>1</span>
                        <span>{totalAvailableQuestions}</span>
                    </div>
                </div>

                <div className="form-group">
                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={soundEnabled}
                            onChange={(e) => setSoundEnabled(e.target.checked)}
                            className="toggle-checkbox"
                        />
                        <span>Enable Sound Effects</span>
                    </label>
                </div>

                <button type="submit" className="restart-btn">
                    Start Game ▶
                </button>

            </form>
        </div>
    );
};

export default DecisionPreferenceForm;
