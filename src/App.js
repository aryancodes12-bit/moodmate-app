import React, { useState, useEffect, useRef } from 'react';

// --- Helper Components ---

const Spinner = () => (
    <div className="flex justify-center items-center p-4">
        <div className="w-6 h-6 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
);

const Icons = {
    'bot': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 5V3m0 18v-2M4.219 4.219l1.414 1.414m12.728 12.728l1.414 1.414M4.219 19.781l1.414-1.414M18.364 5.636l1.414-1.414" /></svg>,
    'steps': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    'summary': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    'video': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 001.553.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>,
    'pdf': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>,
    'play': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l8.315-5.9a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>,
    'pause': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4h3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm7 0h3a2 2 0 012 2v10a2 2 0 01-2 2h-3a2 2 0 01-2-2V6a2 2 0 012-2z"/></svg>,
    'volume': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>,
    'check': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    'trophy': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" transform="rotate(180 12 12)" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" transform="rotate(180 12 12)" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8" /></svg>,
    'star': ({ className = "" }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
    'sparkle': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM3 9a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm-1 4a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm14 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" clipRule="evenodd" /></svg>,
    'heart': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>,
    'sun': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    'moon': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
    'menu': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    'close': () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
};

const moodMap = {
    1: { label: 'Awful', color: '#f87171', textColor: 'text-red-600', darkTextColor: 'dark:text-red-400' },
    2: { label: 'Bad', color: '#fb923c', textColor: 'text-orange-600', darkTextColor: 'dark:text-orange-400' },
    3: { label: 'Okay', color: '#facc15', textColor: 'text-yellow-600', darkTextColor: 'dark:text-yellow-400' },
    4: { label: 'Good', color: '#4ade80', textColor: 'text-green-600', darkTextColor: 'dark:text-green-400' },
    5: { label: 'Great', color: '#2dd4bf', textColor: 'text-teal-600', darkTextColor: 'dark:text-teal-400' },
};

// --- Sub-Components ---

const ApiKeyBanner = ({ apiKey, setApiKey }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSave = () => {
        if (inputValue.trim()) {
            setApiKey(inputValue.trim());
        }
    };

    if (apiKey) return null;

    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md" role="alert">
            <p className="font-bold">Action Required</p>
            <p>To enable AI features, please enter your Gemini API key. You can get a free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>.</p>
            <div className="flex mt-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full p-2 border border-yellow-300 rounded-l-md"
                    placeholder="Enter your API key..."
                />
                <button onClick={handleSave} className="bg-yellow-500 text-white p-2 rounded-r-md font-semibold">Save Key</button>
            </div>
        </div>
    );
};

const JournalView = ({ journalText, setJournalText, selectedMood, setSelectedMood, handleSubmit, isLoading, aiResponse, getJournalPrompt, isFetchingPrompt }) => {
    const currentMood = moodMap[selectedMood];

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">How are you feeling today?</h2>
                    <button onClick={getJournalPrompt} disabled={isFetchingPrompt} className="flex items-center space-x-2 text-sm text-blue-500 font-semibold hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors disabled:text-gray-400">
                        <Icons.sparkle />
                        <span>{isFetchingPrompt ? 'Getting prompt...' : 'Get a Prompt'}</span>
                    </button>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Let it all out. Your thoughts are safe here.</p>
                <textarea value={journalText} onChange={(e) => setJournalText(e.target.value)} className="w-full h-40 p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 transition-shadow duration-200 resize-none" placeholder="Tell me about your day..." />
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <label htmlFor="mood-slider" className="block text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 text-center">
                    Select your mood: <span className={`font-bold ${currentMood.textColor} ${currentMood.darkTextColor}`}>{currentMood.label}</span>
                </label>
                <div className="relative pt-1">
                    <input
                        id="mood-slider"
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={selectedMood}
                        onChange={(e) => setSelectedMood(Number(e.target.value))}
                        className="mood-slider w-full h-2 rounded-lg appearance-none cursor-pointer"
                        style={{'--thumb-color': currentMood.color}}
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <span>Awful</span>
                        <span>Great</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center"><button onClick={handleSubmit} disabled={isLoading || !journalText.trim()} className="w-full max-w-xs bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none">{isLoading ? 'Saving...' : '✨ Save & Get Guidance'}</button></div>
            {isLoading && <Spinner />}
            {aiResponse.reflection && !isLoading && (<div className="space-y-4 animate-fade-in"><div className="bg-blue-50 dark:bg-blue-900/50 border-l-4 border-blue-400 p-5 rounded-r-lg shadow-md"><div className="flex items-start space-x-4"><div className="flex-shrink-0 text-blue-500 dark:text-blue-400 mt-1"><Icons.bot /></div><div><h4 className="font-bold text-blue-800 dark:text-blue-200">Aura's Reflection</h4><p className="text-blue-700 dark:text-blue-300 mt-1">{aiResponse.reflection}</p></div></div></div>{aiResponse.actionableSteps?.length > 0 && (<div className="bg-green-50 dark:bg-green-900/50 border-l-4 border-green-400 p-5 rounded-r-lg shadow-md"><div className="flex items-start space-x-4"><div className="flex-shrink-0 text-green-500 dark:text-green-400 mt-1"><Icons.steps /></div><div><h4 className="font-bold text-green-800 dark:text-green-200">✨ Gentle Next Steps</h4><ul className="list-disc list-inside mt-2 text-green-700 dark:text-green-300 space-y-1">{aiResponse.actionableSteps.map((step, index) => <li key={index}>{step}</li>)}</ul></div></div></div>)}</div>)}
        </div>
    );
};

const HistoryView = ({ journalHistory, handleGenerateSummary, isGeneratingSummary, weeklySummary }) => (
    <div className="w-full max-w-2xl mx-auto space-y-4">
        <div className="text-center mb-6"><h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Your Journal History</h2><button onClick={handleGenerateSummary} disabled={isGeneratingSummary || journalHistory.length < 2} className="bg-purple-600 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:bg-purple-700 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed">{isGeneratingSummary ? 'Analyzing...' : '✨ Summarize My Week'}</button>{journalHistory.length < 2 && <p className="text-xs text-gray-400 mt-1">Write at least 2 entries to enable summary.</p>}</div>
        {isGeneratingSummary && <Spinner />}
        {weeklySummary && !isGeneratingSummary && (<div className="bg-purple-50 dark:bg-purple-900/50 border-l-4 border-purple-400 p-5 rounded-r-lg shadow-md animate-fade-in mb-6"><div className="flex items-start space-x-4"><div className="flex-shrink-0 text-purple-500 dark:text-purple-400 mt-1"><Icons.summary /></div><div><h4 className="font-bold text-purple-800 dark:text-purple-200">Your Weekly Summary</h4><p className="text-purple-700 dark:text-purple-300 mt-1">{weeklySummary}</p></div></div></div>)}
        {journalHistory.length > 0 ? (journalHistory.map(entry => {
            const moodInfo = moodMap[entry.mood] || moodMap[3];
            return (<div key={entry.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg animate-fade-in"><div className="flex justify-between items-start mb-3"><p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{new Date(entry.timestamp).toLocaleString()}</p><div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium bg-opacity-50 ${moodInfo.color} ${moodInfo.textColor}`}><span>{moodInfo.label}</span></div></div><p className="text-gray-700 dark:text-gray-300 mb-4">{entry.text}</p>{entry.aiReflection && (<div className="bg-gray-50 dark:bg-gray-700/50 border-l-4 border-gray-300 dark:border-gray-600 p-3 rounded-r-lg space-y-3"><p className="text-sm text-gray-600 dark:text-gray-400 italic"><span className="font-semibold text-gray-700 dark:text-gray-300">Aura's Reflection:</span> {entry.aiReflection}</p>{entry.aiActionableSteps?.length > 0 && (<div><p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Suggested Steps:</p><ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">{entry.aiActionableSteps.map((step, i) => <li key={i}>{step}</li>)}</ul></div>)}</div>)}</div>);
        })) : (<div className="text-center py-10"><p className="text-gray-500 dark:text-gray-400">You haven't written any entries yet.</p></div>)}
    </div>
);

const ResourcesView = () => {
    const resources = [
        { type: 'video', title: '10-Minute Meditation For Stress', description: 'A guided meditation to help you find a sense of calm and peace.', link: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak', thumbnail: 'https://placehold.co/600x400/a3e635/ffffff?text=Meditation' },
        { type: 'video', title: 'How to make stress your friend', description: 'Psychologist Kelly McGonigal shares a new perspective on stress in this popular TED Talk.', link: 'https://www.youtube.com/watch?v=RcGyVTAoXEU', thumbnail: 'https://placehold.co/600x400/f87171/ffffff?text=TED+Talk' },
        { type: 'pdf', title: 'I\'m So Stressed Out! - Fact Sheet', description: 'A detailed guide from the National Institute of Mental Health (NIMH).', link: 'https://www.nimh.nih.gov/health/publications/so-stressed-out-fact-sheet', thumbnail: 'https://placehold.co/600x400/60a5fa/ffffff?text=Guide' },
        { type: 'video', title: '5-Minute Mindful Breathing', description: 'A quick and effective breathing exercise to calm anxiety and find your center.', link: 'https://www.youtube.com/watch?v=nmFUDY6_v3c', thumbnail: 'https://placehold.co/600x400/f9a8d4/ffffff?text=Breathing' },
    ];
    const ResourceCard = ({ resource }) => { const Icon = resource.type === 'video' ? Icons.video : Icons.pdf; const buttonText = resource.type === 'video' ? 'Watch Video' : 'Read Guide'; const buttonColor = resource.type === 'video' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'; return (<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"><img src={resource.thumbnail} alt={resource.title} className="w-full h-40 object-cover" /><div className="p-5"><h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{resource.title}</h3><p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p><a href={resource.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center w-full px-4 py-2 text-white font-semibold rounded-lg shadow-md transition-colors ${buttonColor}`}><Icon />{buttonText}</a></div></div>); };
    return (<div className="w-full max-w-4xl mx-auto"><div className="text-center mb-8"><h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Helpful Resources</h2><p className="text-gray-500 dark:text-gray-400">A curated list of tools to help you manage stress and find balance.</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{resources.map(res => <ResourceCard key={res.title} resource={res} />)}</div></div>);
};

const MusicPlayer = ({ musicRef }) => {
    const [toneReady, setToneReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    useEffect(() => {
        if (typeof window.Tone !== 'undefined') {
            setToneReady(true);
        } else {
            console.warn("Tone.js not found. Music player will be disabled. Please add <script src=\"https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js\"></script> to your index.html");
        }
    }, []);

    useEffect(() => {
        if (!toneReady) return;
        if (!musicRef.current) {
            const synth = new window.Tone.PolySynth(window.Tone.Synth, { oscillator: { type: 'fmsine' }, envelope: { attack: 0.8, decay: 0.2, sustain: 0.5, release: 4 }, }).toDestination();
            const reverb = new window.Tone.Reverb({ decay: 10, wet: 0.4 }).toDestination();
            synth.connect(reverb);
            const pattern = new window.Tone.Pattern((time, note) => { synth.triggerAttackRelease(note, '2n', time); }, ['C4', 'E4', 'G4', 'B4', 'G4', 'E4'], 'randomWalk');
            pattern.interval = '1n';
            musicRef.current = { synth, pattern, isUserInteracted: false };
        }
    }, [toneReady, musicRef]);
    
    useEffect(() => {
        if (toneReady && musicRef.current) {
            window.Tone.Destination.volume.value = window.Tone.gainToDb(volume);
        }
    }, [volume, toneReady, musicRef]);

    const togglePlay = async () => {
        const music = musicRef.current;
        if (!toneReady || !music) return;
        if (!music.isUserInteracted) {
            await window.Tone.start();
            music.isUserInteracted = true;
        }
        if (isPlaying) {
            window.Tone.Transport.pause();
        } else {
            window.Tone.Transport.start();
            music.pattern.start(0);
        }
        setIsPlaying(!isPlaying);
    };

    if (!toneReady) {
        return (<div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-4 rounded-xl shadow-lg mb-8 flex items-center justify-between"><p className="font-semibold text-gray-500 dark:text-gray-400">Music player unavailable</p><p className="text-xs text-gray-400 dark:text-gray-500">Tone.js library not found</p></div>)
    }

    return (<div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-4 rounded-xl shadow-lg mb-8 flex items-center justify-between"><p className="font-semibold text-gray-700 dark:text-gray-200">Soothing Music</p><div className="flex items-center space-x-3"><button onClick={togglePlay} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">{isPlaying ? <Icons.pause /> : <Icons.play />}</button><Icons.volume className="text-gray-600 dark:text-gray-300" /><input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" /></div></div>);
};

const AnxietyReliefView = ({ musicRef }) => {
    const [activeExercise, setActiveExercise] = useState(null);
    const [completedExercises, setCompletedExercises] = useState(new Set());

    const exercises = [
        { id: 'box-breathing', title: 'Box Breathing', description: 'A simple technique to calm your nervous system and focus your mind.' },
        { id: 'grounding', title: '5-4-3-2-1 Grounding', description: 'An exercise to bring you back to the present moment during times of high anxiety.' },
        { id: 'progressive-muscle-relaxation', title: 'Progressive Muscle Relaxation', description: 'Release physical tension by tensing and relaxing muscle groups.' },
        { id: 'mindful-observation', title: 'Mindful Observation', description: 'Anchor your focus on a single object to quiet a busy mind.' },
    ];

    const handleCompleteExercise = (exerciseId) => {
        setCompletedExercises(prev => new Set(prev).add(exerciseId));
        setActiveExercise(null);
    };

    const allExercisesCompleted = completedExercises.size === exercises.length;

    if (activeExercise) {
        const exercise = exercises.find(e => e.id === activeExercise);
        return <ExercisePlayer exercise={exercise} onBack={() => handleCompleteExercise(exercise.id)} />;
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Relief Exercises</h2>
                <p className="text-gray-500 dark:text-gray-400">Quick, guided exercises to help you find calm and relieve stress.</p>
            </div>
            <MusicPlayer musicRef={musicRef} />
            {allExercisesCompleted ? (
                <RewardView onReset={() => setCompletedExercises(new Set())} />
            ) : (
                <div className="space-y-4">
                    {exercises.map(ex => (
                        <div key={ex.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform transform hover:-translate-y-1">
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{ex.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{ex.description}</p>
                            </div>
                            <div className="ml-4">
                                {completedExercises.has(ex.id) ? (
                                    <Icons.check />
                                ) : (
                                    <button onClick={() => setActiveExercise(ex.id)} className="bg-green-500 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                                        Start
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const RewardView = ({ onReset }) => (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center">
        <Icons.trophy className="mx-auto" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-4">Congratulations!</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">You've completed all the relief exercises. Taking time for yourself is a wonderful achievement. Keep up the great work!</p>
        <button onClick={onReset} className="mt-6 bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors">
            Start Over
        </button>
    </div>
);

const ExercisePlayer = ({ exercise, onBack }) => {
    const components = {
        'box-breathing': BoxBreathingPlayer,
        'grounding': GroundingPlayer,
        'progressive-muscle-relaxation': ProgressiveMuscleRelaxationPlayer,
        'mindful-observation': MindfulObservationPlayer,
    };
    const Component = components[exercise.id];
    return Component ? <Component exercise={exercise} onBack={onBack} /> : null;
};

const BoxBreathingPlayer = ({ exercise, onBack }) => {
    const phases = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'];
    const phaseDuration = 4;
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(phaseDuration);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setPhaseIndex(p => (p + 1) % phases.length);
                        return phaseDuration;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isActive, phases.length]);

    const handleReset = () => {
        setIsActive(false);
        setPhaseIndex(0);
        setTimeLeft(phaseDuration);
    };

    const animationClass = isActive ? `animate-breathing-${phaseIndex}` : '';

    return (<div className="w-full max-w-md mx-auto text-center"><button onClick={onBack} className="text-blue-500 dark:text-blue-400 mb-4 hover:underline">&larr; Back to Exercises</button><div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl"><h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">{exercise.title}</h2><div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center"><div className={`absolute w-full h-full bg-blue-100 dark:bg-blue-900/50 rounded-full transition-transform duration-1000 ease-in-out ${animationClass}`}></div><div className="relative z-10"><p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{phases[phaseIndex]}</p><p className="text-5xl font-mono font-bold text-gray-900 dark:text-gray-100">{timeLeft}</p></div></div><div className="flex justify-center space-x-4"><button onClick={() => setIsActive(!isActive)} className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full w-32 transition-transform transform hover:scale-105">{isActive ? 'Pause' : 'Start'}</button><button onClick={handleReset} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 px-6 rounded-full w-32 transition-transform transform hover:scale-105">Reset</button></div></div></div>);
};

const GroundingPlayer = ({ exercise, onBack }) => {
    const steps = [
        { title: '5 Things You Can See', description: 'Look around and notice five things that you can see. Say them out loud.' },
        { title: '4 Things You Can Touch', description: 'Notice four things you can feel. A table, your clothes, the floor.' },
        { title: '3 Things You Can Hear', description: 'Listen for three sounds. A clock ticking, a car outside, your own breath.' },
        { title: '2 Things You Can Smell', description: 'Notice two different smells around you. Coffee, soap, a flower.' },
        { title: '1 Thing You Can Taste', description: 'Focus on one thing you can taste. Your drink, a piece of gum, or just the inside of your mouth.' },
    ];
    return (<div className="w-full max-w-2xl mx-auto"><button onClick={onBack} className="text-blue-500 dark:text-blue-400 mb-4 hover:underline">&larr; Back to Exercises</button><div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl"><h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">{exercise.title}</h2><div className="space-y-4">{steps.map(step => (<div key={step.title} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700"><h3 className="font-bold text-lg text-gray-700 dark:text-gray-200">{step.title}</h3><p className="text-gray-600 dark:text-gray-400">{step.description}</p></div>))}</div></div></div>);
};

const ProgressiveMuscleRelaxationPlayer = ({ exercise, onBack }) => {
    const steps = [
        "Find a comfortable position, sitting or lying down. Close your eyes if you feel comfortable.",
        "Take a few deep breaths, in through your nose and out through your mouth.",
        "Start with your hands. Clench them into fists, hold for 5 seconds, then release for 10 seconds, noticing the difference.",
        "Move to your arms. Tense your biceps, hold for 5 seconds, then relax for 10 seconds.",
        "Continue with your forehead (raise eyebrows), eyes (squint), jaw (clench), shoulders (shrug), stomach (tighten), legs (tense), and finally your feet (curl toes).",
        "After tensing and relaxing each group, take a moment to enjoy the feeling of relaxation.",
        "End with a few more deep breaths, and open your eyes when you're ready."
    ];
    return (<div className="w-full max-w-2xl mx-auto"><button onClick={onBack} className="text-blue-500 dark:text-blue-400 mb-4 hover:underline">&larr; Back to Exercises</button><div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl"><h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">{exercise.title}</h2><div className="space-y-4">{steps.map((step, index) => (<div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700"><p className="text-gray-700 dark:text-gray-300">{step}</p></div>))}</div></div></div>);
};

const MindfulObservationPlayer = ({ exercise, onBack }) => {
    const steps = [
        "Choose a small, everyday object near you. A pen, a leaf, a coin.",
        "Hold the object in your hand. Notice its weight, texture, and temperature.",
        "Observe it visually. Look at its colors, shapes, shadows, and any imperfections.",
        "Engage your other senses. Does it make a sound when you tap it? Does it have a scent?",
        "Spend a few minutes just observing this object without judgment. If your mind wanders, gently bring your focus back to the object."
    ];
    return (<div className="w-full max-w-2xl mx-auto"><button onClick={onBack} className="text-blue-500 dark:text-blue-400 mb-4 hover:underline">&larr; Back to Exercises</button><div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl"><h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">{exercise.title}</h2><div className="space-y-4">{steps.map((step, index) => (<div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700"><p className="text-gray-700 dark:text-gray-300">{step}</p></div>))}</div></div></div>);
};

const AssessmentView = () => {
    const questions = [
        { id: 1, text: "Have you felt persistently worried or anxious for the past week?" },
        { id: 2, text: "Have you had trouble concentrating on things, such as reading or watching television?" },
        { id: 3, text: "Have you been feeling down, depressed, or hopeless?" },
        { id: 4, text: "Have you had trouble falling or staying asleep, or sleeping too much?" },
        { id: 5, text: "Have you had little interest or pleasure in doing things you normally enjoy?" },
    ];
    const [answers, setAnswers] = useState({});
    const [showScore, setShowScore] = useState(false);
    const score = Object.values(answers).filter(answer => answer === 'yes').length * 2;
    const allAnswered = Object.keys(answers).length === questions.length;

    const handleAnswer = (id, answer) => {
        setAnswers(prev => ({ ...prev, [id]: answer }));
    };

    const getScoreInterpretation = () => {
        if (score <= 2) return { text: "Your stress level appears to be low. Keep up the great self-care habits!", color: "text-green-600 dark:text-green-400" };
        if (score <= 6) return { text: "You might be experiencing mild stress. The exercises and journaling in this app can be very helpful.", color: "text-yellow-600 dark:text-yellow-400" };
        return { text: "Your score indicates you may be experiencing significant stress. It's a great time to explore the Relief and Resources sections. Remember to be kind to yourself.", color: "text-red-600 dark:text-red-400" };
    };

    const handleRetake = () => {
        setAnswers({});
        setShowScore(false);
    };

    return (<div className="w-full max-w-2xl mx-auto"><div className="text-center mb-8"><h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Mental Wellness Check-in</h2><p className="text-gray-500 dark:text-gray-400">A quick check-in to see how you're doing. Answer based on the last week.</p></div><div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">{!showScore ? (<><div className="space-y-6">{questions.map((q, index) => (<div key={q.id}><p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{index + 1}. {q.text}</p><div className="flex space-x-4"><button onClick={() => handleAnswer(q.id, 'yes')} className={`w-full py-2 rounded-full font-semibold transition-colors ${answers[q.id] === 'yes' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>Yes</button><button onClick={() => handleAnswer(q.id, 'no')} className={`w-full py-2 rounded-full font-semibold transition-colors ${answers[q.id] === 'no' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>No</button></div></div>))}</div>{allAnswered && (<div className="text-center mt-8"><button onClick={() => setShowScore(true)} className="bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-105">See Your Score</button></div>)}</>) : (<div className="text-center"><h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Your Score</h3><p className={`text-6xl font-bold ${getScoreInterpretation().color}`}>{score}<span className="text-3xl text-gray-500 dark:text-gray-400">/10</span></p><p className="text-gray-600 dark:text-gray-300 mt-4 max-w-md mx-auto">{getScoreInterpretation().text}</p><p className="text-xs text-gray-400 dark:text-gray-500 mt-2">This is not a diagnosis. It's a tool to help you reflect.</p><button onClick={handleRetake} className="mt-6 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 px-6 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Retake Assessment</button></div>)}</div></div>);
};

const FeedbackView = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const savedReviews = JSON.parse(localStorage.getItem('mindful-journal-feedback')) || [];
        setReviews(savedReviews.sort((a, b) => new Date(b.date) - new Date(a.date))); // Show newest first
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert("Please select a star rating before submitting.");
            return;
        }
        const feedbackData = { rating, review, date: new Date().toISOString() };
        const updatedReviews = [feedbackData, ...reviews];
        localStorage.setItem('mindful-journal-feedback', JSON.stringify(updatedReviews));
        setReviews(updatedReviews);
        setSubmitted(true);
        setRating(0);
        setReview("");
    };
    
    const StarRating = ({ rating }) => (
        <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
                <Icons.star key={star} className={star <= rating ? "text-yellow-400" : "text-gray-300"} />
            ))}
        </div>
    );

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Share Your Feedback</h2>
                <p className="text-gray-500 dark:text-gray-400">We'd love to hear what you think about the app!</p>
            </div>
            {!submitted ? (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3 text-center">Your Rating</label>
                            <div className="flex justify-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(star)}
                                        className="transition-transform transform hover:scale-125 focus:outline-none"
                                    >
                                        <Icons.star className={(hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="review" className="block text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 text-center">Your Review</label>
                            <textarea
                                id="review"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                className="w-full h-32 p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 transition-shadow duration-200 resize-none"
                                placeholder="Tell us about your experience..."
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-105">
                                Submit Feedback
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                 <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center">
                    <Icons.check className="mx-auto h-16 w-16" />
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-4">Thank You!</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Your feedback has been received. We appreciate you taking the time to help us improve.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors">
                        Leave More Feedback
                    </button>
                </div>
            )}
            
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">What Others Are Saying</h3>
                {reviews.length > 0 ? (
                    reviews.map((item, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <StarRating rating={item.rating} />
                                <p className="text-xs text-gray-400 dark:text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 italic">"{item.review}"</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No reviews yet. Be the first!</p>
                )}
            </div>
        </div>
    );
};


// --- Main Application Component ---

function App() {
    const [view, setView] = useState('journal');
    const [journalText, setJournalText] = useState('');
    const [selectedMood, setSelectedMood] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [journalHistory, setJournalHistory] = useState([]);
    const [aiResponse, setAiResponse] = useState({ reflection: '', actionableSteps: [] });
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
    const [weeklySummary, setWeeklySummary] = useState('');
    const musicRef = useRef(null);
    const [isFetchingPrompt, setIsFetchingPrompt] = useState(false);
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini-api-key') || "");
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        if (apiKey) {
            localStorage.setItem('gemini-api-key', apiKey);
        }
    }, [apiKey]);
    
    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem('mindful-journal-history');
            if (savedHistory) setJournalHistory(JSON.parse(savedHistory));
        } catch (err) {
            console.error("Failed to load history from localStorage", err);
            setError("Could not load your previous entries.");
        }
        
        return () => {
            if (musicRef.current) {
                if(musicRef.current.pattern) {
                    musicRef.current.pattern.stop();
                    musicRef.current.pattern.dispose();
                }
                if(musicRef.current.synth) {
                    musicRef.current.synth.dispose();
                }
                musicRef.current = null;
            }
        }
    }, []);

    const getAiGuidance = async (text) => {
        if (!apiKey) {
            setError("Please enter your API key to enable AI features.");
            return { reflection: "AI features disabled. Please add an API key.", actionableSteps: [] };
        }
        const prompt = `You are 'Aura', a compassionate mental wellness guide. A user shared a journal entry. Provide a supportive response in JSON format. The JSON should have two keys: "reflection" (a brief, 2-sentence empathetic validation of their feelings) and "actionableSteps" (an array of 2-3 simple, concrete, and gentle suggestions they can do right now to feel a bit better). Do NOT give medical advice. User's entry: "${text}"`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { "reflection": { "type": "STRING" }, "actionableSteps": { "type": "ARRAY", "items": { "type": "STRING" } } } } } };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
            const result = await response.json();
            if (result.candidates?.[0]?.content?.parts?.[0]?.text) return JSON.parse(result.candidates[0].content.parts[0].text);
            throw new Error("Invalid response structure from API.");
        } catch (error) {
            console.error("Error calling Gemini API for guidance:", error);
            return { reflection: "Thank you for sharing your thoughts.", actionableSteps: ["Take three deep breaths."] };
        }
    };

    const handleGenerateSummary = async () => {
        if (!apiKey) {
            setError("Please enter your API key to enable AI features.");
            return;
        }
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const recentEntries = journalHistory.filter(entry => new Date(entry.timestamp) > oneWeekAgo);
        if (recentEntries.length < 2) { setError("You need at least two entries in the last week to generate a summary."); return; }
        setIsGeneratingSummary(true);
        setWeeklySummary('');
        setError('');
        const entriesText = recentEntries.map(e => `On ${new Date(e.timestamp).toLocaleDateString()}, I felt ${moodMap[e.mood]?.label || 'neutral'} and wrote: "${e.text}"`).join('\n\n');
        const prompt = `You are 'Aura', a compassionate mental wellness guide. Below is a user's journal entries from the past week. Please provide a brief, gentle summary (3-4 sentences). Identify any recurring emotional themes or patterns, and highlight a positive moment or thought you noticed. Frame it as a supportive observation, not a diagnosis. Here are the entries:\n\n${entriesText}`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
            const result = await response.json();
            if (result.candidates?.[0]?.content?.parts?.[0]?.text) setWeeklySummary(result.candidates[0].content.parts[0].text);
            else throw new Error("Invalid summary response from API.");
        } catch (error) {
            console.error("Error getting weekly summary:", error);
            setError("Sorry, we couldn't generate your weekly summary.");
        } finally {
            setIsGeneratingSummary(false);
        }
    };

    const handleSubmit = async () => {
        if (!journalText.trim()) return;
        setIsLoading(true);
        setError('');
        setAiResponse({ reflection: '', actionableSteps: [] });
        try {
            const guidance = await getAiGuidance(journalText);
            setAiResponse(guidance);
            const newEntry = { id: new Date().toISOString(), text: journalText, mood: selectedMood, aiReflection: guidance.reflection, aiActionableSteps: guidance.actionableSteps, timestamp: new Date().toISOString() };
            const updatedHistory = [newEntry, ...journalHistory];
            setJournalHistory(updatedHistory);
            localStorage.setItem('mindful-journal-history', JSON.stringify(updatedHistory));
            setJournalText('');
            setSelectedMood(3);
        } catch (error) {
            console.error("Error saving entry:", error);
            setError("Sorry, we couldn't save your entry. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const getJournalPrompt = async () => {
        if (!apiKey) {
            setError("Please enter your API key to get a prompt.");
            return;
        }
        setIsFetchingPrompt(true);
        setError('');
        const prompt = "You are Aura, a compassionate mental wellness guide. Generate one short, thoughtful, and open-ended journal prompt to encourage self-reflection. The prompt should be a single sentence.";
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
            const result = await response.json();
            if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                setJournalText(result.candidates[0].content.parts[0].text);
            } else {
                 throw new Error("Invalid prompt response from API.");
            }
        } catch (error) {
            console.error("Error getting journal prompt:", error);
            setError("Sorry, I couldn't get a prompt right now. Please try again.");
        } finally {
            setIsFetchingPrompt(false);
        }
    };

    const renderView = () => {
        switch (view) {
            case 'history': return <HistoryView journalHistory={journalHistory} handleGenerateSummary={handleGenerateSummary} isGeneratingSummary={isGeneratingSummary} weeklySummary={weeklySummary} />;
            case 'resources': return <ResourcesView />;
            case 'anxiety-relief': return <AnxietyReliefView musicRef={musicRef} />;
            case 'assessment': return <AssessmentView />;
            case 'feedback': return <FeedbackView />;
            case 'journal': default: return <JournalView journalText={journalText} setJournalText={setJournalText} selectedMood={selectedMood} setSelectedMood={setSelectedMood} handleSubmit={handleSubmit} isLoading={isLoading} aiResponse={aiResponse} getJournalPrompt={getJournalPrompt} isFetchingPrompt={isFetchingPrompt} />;
        }
    };

    const handleNavClick = (viewName) => {
        setView(viewName);
        setIsMenuOpen(false);
    };

    const navLinks = [
        { id: 'journal', name: 'Journal' },
        { id: 'history', name: 'History' },
        { id: 'assessment', name: 'Assessment' },
        { id: 'anxiety-relief', name: 'Relief' },
        { id: 'resources', name: 'Resources' },
        { id: 'feedback', name: 'Feedback' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/30 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-500">
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm sticky top-0 z-20">
                <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                            <Icons.heart />
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">MoodMate</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="hidden sm:flex items-center space-x-1 bg-gray-200/80 dark:bg-gray-700/80 p-1 rounded-full">
                            {navLinks.map(link => (
                                <button key={link.id} onClick={() => setView(link.id)} className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${view === link.id ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>{link.name}</button>
                            ))}
                        </div>
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
                            {theme === 'light' ? <Icons.moon /> : <Icons.sun />}
                        </button>
                        <div className="sm:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full bg-gray-200/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300">
                                {isMenuOpen ? <Icons.close /> : <Icons.menu />}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
            
            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-10 bg-gray-100 dark:bg-gray-900 transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 ease-in-out sm:hidden`}>
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                    {navLinks.map(link => (
                        <button key={link.id} onClick={() => handleNavClick(link.id)} className={`text-2xl font-semibold ${view === link.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>
                            {link.name}
                        </button>
                    ))}
                </div>
            </div>

            <main className="p-4 sm:p-6 md:p-8">
                <ApiKeyBanner apiKey={apiKey} setApiKey={setApiKey} />
                {error && <div className="max-w-2xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6" role="alert" onClick={() => setError('')}>{error}</div>}
                <div key={view} className="animate-page-enter">
                    {renderView()}
                </div>
            </main>
            <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
                <p>This is a prototype for guidance and does not provide medical advice.</p>
                <p>Journal entries are saved locally in your browser.</p>
                <p className="mt-4">Made with ❤️ by Aryan Jaiswal (Developer) and Alok Jha (Designer)</p>
            </footer>
            <style>{`
                @keyframes page-enter {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-page-enter {
                    animation: page-enter 0.5s ease-out forwards;
                }
                @keyframes breathing-0 { from { transform: scale(0.8); } to { transform: scale(1); } }
                @keyframes breathing-1 { from { transform: scale(1); } to { transform: scale(1); } }
                @keyframes breathing-2 { from { transform: scale(1); } to { transform: scale(0.8); } }
                @keyframes breathing-3 { from { transform: scale(0.8); } to { transform: scale(0.8); } }

                .animate-breathing-0 { animation: breathing-0 4s ease-in-out infinite; }
                .animate-breathing-1 { animation: breathing-1 4s ease-in-out infinite; }
                .animate-breathing-2 { animation: breathing-2 4s ease-in-out infinite; }
                .animate-breathing-3 { animation: breathing-3 4s ease-in-out infinite; }

                .mood-slider {
                    -webkit-appearance: none;
                    appearance: none;
                    background: linear-gradient(to right, #f87171, #fb923c, #facc15, #4ade80, #2dd4bf);
                    height: 8px;
                    border-radius: 9999px;
                    outline: none;
                }
                .mood-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    background: var(--thumb-color, #3b82f6);
                    border-radius: 9999px;
                    cursor: pointer;
                    border: 4px solid white;
                    box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
                    transition: background 0.3s ease-in-out;
                }
                .mood-slider::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    background: var(--thumb-color, #3b82f6);
                    border-radius: 9999px;
                    cursor: pointer;
                    border: 4px solid white;
                    box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
                    transition: background 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
}

export default App;
