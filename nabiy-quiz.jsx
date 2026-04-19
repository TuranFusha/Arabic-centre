import { useState, useEffect, useRef } from "react";

const PROPHETS = [
  { id: "adam", name: "Адам", arabic: "آدم", emoji: "🌿", color: "#2d6a4f" },
  { id: "nuh", name: "Нух", arabic: "نوح", emoji: "🚢", color: "#1a4a7a" },
  { id: "ibrahim", name: "Ибрахим", arabic: "إبراهيم", emoji: "🔥", color: "#7a3a1a" },
  { id: "musa", name: "Муса", arabic: "موسى", emoji: "⚡", color: "#4a1a7a" },
  { id: "isa", name: "Иса", arabic: "عيسى", emoji: "✨", color: "#1a6a7a" },
  { id: "muhammad", name: "Мухаммад ﷺ", arabic: "محمد", emoji: "🌙", color: "#7a6a1a" },
  { id: "yusuf", name: "Юсуф", arabic: "يوسف", emoji: "👑", color: "#6a1a4a" },
  { id: "dawud", name: "Давуд", arabic: "داود", emoji: "🎵", color: "#1a7a4a" },
];

const GEO_PATTERN = `
  <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="rgba(212,175,55,0.15)" stroke-width="0.5">
      <polygon points="30,5 55,20 55,50 30,65 5,50 5,20"/>
      <polygon points="30,15 45,23 45,45 30,53 15,45 15,23"/>
      <line x1="30" y1="5" x2="30" y2="15"/>
      <line x1="55" y1="20" x2="45" y2="23"/>
      <line x1="55" y1="50" x2="45" y2="45"/>
      <line x1="30" y1="65" x2="30" y2="53"/>
      <line x1="5" y1="50" x2="15" y2="45"/>
      <line x1="5" y1="20" x2="15" y2="23"/>
    </g>
  </svg>
`;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Amiri:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Nunito', sans-serif;
    background: #0a0e1a;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0e1a 0%, #0d1628 40%, #0e1a22 100%);
    position: relative;
    overflow: hidden;
  }

  .geo-bg {
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,${encodeURIComponent(GEO_PATTERN)}");
    background-size: 60px 60px;
    opacity: 0.6;
    pointer-events: none;
  }

  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.12;
    pointer-events: none;
  }
  .orb-1 { width: 400px; height: 400px; background: #d4af37; top: -100px; right: -100px; }
  .orb-2 { width: 300px; height: 300px; background: #1a6a8a; bottom: -50px; left: -50px; }

  /* HEADER */
  .header {
    text-align: center;
    padding: 32px 20px 16px;
    position: relative;
    z-index: 10;
  }
  .logo-line {
    font-family: 'Amiri', serif;
    font-size: 13px;
    color: #d4af37;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 8px;
    opacity: 0.8;
  }
  .logo-main {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(22px, 5vw, 34px);
    color: #fff;
    font-weight: 700;
    text-shadow: 0 0 40px rgba(212,175,55,0.4);
  }
  .logo-main span { color: #d4af37; }
  .logo-arabic {
    font-family: 'Amiri', serif;
    font-size: 20px;
    color: rgba(212,175,55,0.7);
    margin-top: 4px;
  }

  /* STREAK BAR */
  .streak-bar {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 12px 20px;
    position: relative;
    z-index: 10;
  }
  .stat-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(212,175,55,0.1);
    border: 1px solid rgba(212,175,55,0.25);
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 700;
    color: #d4af37;
    font-family: 'Nunito', sans-serif;
  }

  /* PROPHET GRID */
  .prophet-grid {
    padding: 24px 16px;
    position: relative;
    z-index: 10;
  }
  .section-title {
    font-family: 'Amiri', serif;
    font-size: 16px;
    color: rgba(255,255,255,0.5);
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    max-width: 480px;
    margin: 0 auto;
  }
  .prophet-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(212,175,55,0.2);
    border-radius: 16px;
    padding: 18px 14px;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .prophet-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212,175,55,0.08), transparent);
    opacity: 0;
    transition: opacity 0.25s;
  }
  .prophet-card:hover { border-color: #d4af37; transform: translateY(-2px); }
  .prophet-card:hover::before { opacity: 1; }
  .prophet-emoji { font-size: 32px; margin-bottom: 8px; display: block; }
  .prophet-arabic {
    font-family: 'Amiri', serif;
    font-size: 20px;
    color: #d4af37;
    display: block;
    margin-bottom: 4px;
  }
  .prophet-name { font-size: 14px; color: rgba(255,255,255,0.8); font-weight: 600; }

  /* QUIZ SCREEN */
  .quiz-screen {
    max-width: 600px;
    margin: 0 auto;
    padding: 16px;
    position: relative;
    z-index: 10;
  }

  .prophet-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(212,175,55,0.2);
    border-radius: 16px;
    padding: 14px 18px;
  }
  .prophet-header-emoji { font-size: 36px; }
  .prophet-header-info {}
  .prophet-header-arabic {
    font-family: 'Amiri', serif;
    font-size: 22px;
    color: #d4af37;
    line-height: 1;
  }
  .prophet-header-name { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 2px; }
  .back-btn {
    margin-left: auto;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 8px 14px;
    color: rgba(255,255,255,0.5);
    cursor: pointer;
    font-size: 12px;
    font-family: 'Nunito', sans-serif;
    transition: all 0.2s;
  }
  .back-btn:hover { color: #fff; border-color: rgba(255,255,255,0.3); }

  /* LOADING */
  .loading-box {
    text-align: center;
    padding: 60px 20px;
  }
  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(212,175,55,0.2);
    border-top-color: #d4af37;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { color: rgba(255,255,255,0.5); font-size: 14px; }
  .loading-arabic {
    font-family: 'Amiri', serif;
    font-size: 20px;
    color: rgba(212,175,55,0.5);
    margin-top: 8px;
  }

  /* QUESTION CARD */
  .q-number {
    font-size: 11px;
    font-weight: 700;
    color: rgba(212,175,55,0.6);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 16px;
    text-align: center;
  }
  .q-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(212,175,55,0.25);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }
  .q-card::after {
    content: '؟';
    position: absolute;
    right: 16px;
    top: 8px;
    font-family: 'Amiri', serif;
    font-size: 80px;
    color: rgba(212,175,55,0.06);
    line-height: 1;
  }
  .q-text {
    font-size: clamp(15px, 3vw, 18px);
    color: #fff;
    line-height: 1.6;
    font-weight: 600;
    position: relative;
    z-index: 1;
  }

  /* OPTIONS */
  .options { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
  .option-btn {
    background: rgba(255,255,255,0.04);
    border: 1.5px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    padding: 14px 18px;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    color: rgba(255,255,255,0.85);
    font-weight: 600;
    position: relative;
    overflow: hidden;
  }
  .option-btn:hover:not(:disabled) {
    border-color: rgba(212,175,55,0.5);
    background: rgba(212,175,55,0.06);
    transform: translateX(4px);
  }
  .option-btn:disabled { cursor: not-allowed; }
  .option-btn.correct {
    border-color: #4ade80;
    background: rgba(74,222,128,0.1);
    color: #4ade80;
    animation: pulse-green 0.5s ease;
  }
  .option-btn.wrong {
    border-color: #f87171;
    background: rgba(248,113,113,0.1);
    color: #f87171;
  }
  @keyframes pulse-green {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  .option-letter {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(212,175,55,0.15);
    border: 1px solid rgba(212,175,55,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    color: #d4af37;
    flex-shrink: 0;
    font-family: 'Cinzel Decorative', serif;
  }
  .option-btn.correct .option-letter { background: rgba(74,222,128,0.2); border-color: #4ade80; color: #4ade80; }
  .option-btn.wrong .option-letter { background: rgba(248,113,113,0.2); border-color: #f87171; color: #f87171; }

  /* EXPLANATION */
  .explanation-box {
    background: linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03));
    border: 1px solid rgba(212,175,55,0.35);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    animation: slideUp 0.4s ease;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .exp-label {
    font-size: 10px;
    font-weight: 700;
    color: #d4af37;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .exp-text { font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.7; }
  .exp-ayah {
    margin-top: 12px;
    padding: 10px 14px;
    background: rgba(0,0,0,0.2);
    border-radius: 10px;
    border-left: 3px solid #d4af37;
  }
  .exp-ayah-arabic {
    font-family: 'Amiri', serif;
    font-size: 18px;
    color: #d4af37;
    text-align: right;
    direction: rtl;
    line-height: 1.8;
  }
  .exp-ayah-ref { font-size: 11px; color: rgba(212,175,55,0.6); margin-top: 4px; }

  /* NEXT BTN */
  .next-btn {
    width: 100%;
    background: linear-gradient(135deg, #d4af37, #b8960c);
    border: none;
    border-radius: 14px;
    padding: 16px;
    font-family: 'Cinzel Decorative', serif;
    font-size: 14px;
    font-weight: 700;
    color: #0a0e1a;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 1px;
  }
  .next-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,175,55,0.3); }

  /* RESULT SCREEN */
  .result-screen {
    max-width: 480px;
    margin: 0 auto;
    padding: 24px 16px;
    text-align: center;
    position: relative;
    z-index: 10;
  }
  .result-badge {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05));
    border: 2px solid rgba(212,175,55,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    margin: 0 auto 24px;
    animation: pulse-badge 2s ease infinite;
  }
  @keyframes pulse-badge {
    0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.3); }
    50% { box-shadow: 0 0 0 16px rgba(212,175,55,0); }
  }
  .result-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: 22px;
    color: #fff;
    margin-bottom: 8px;
  }
  .result-title span { color: #d4af37; }
  .result-score {
    font-family: 'Amiri', serif;
    font-size: 52px;
    color: #d4af37;
    line-height: 1;
    margin: 16px 0;
  }
  .result-score small { font-size: 22px; color: rgba(212,175,55,0.5); }
  .result-msg { font-size: 15px; color: rgba(255,255,255,0.6); margin-bottom: 28px; line-height: 1.6; }
  .result-btns { display: flex; flex-direction: column; gap: 10px; }
  .btn-primary {
    background: linear-gradient(135deg, #d4af37, #b8960c);
    border: none;
    border-radius: 14px;
    padding: 15px;
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #0a0e1a;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,175,55,0.3); }
  .btn-secondary {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    padding: 15px;
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: rgba(255,255,255,0.3); color: #fff; }

  /* ERROR */
  .error-box {
    background: rgba(248,113,113,0.1);
    border: 1px solid rgba(248,113,113,0.3);
    border-radius: 14px;
    padding: 16px;
    margin: 12px 0;
    font-size: 13px;
    color: #f87171;
    text-align: center;
  }

  .progress-bar {
    height: 3px;
    background: rgba(255,255,255,0.08);
    border-radius: 2px;
    margin-bottom: 20px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #d4af37, #f0c040);
    border-radius: 2px;
    transition: width 0.5s ease;
  }
`;

const LETTERS = ["А", "Б", "В", "Г"];

function parseQuestion(text) {
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    const start = clean.indexOf("{");
    const end = clean.lastIndexOf("}");
    return JSON.parse(clean.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function fetchQuestion(prophetId, prophetName, questionIndex) {
  const systemPrompt = `Ты исламский педагог. Генерируй вопросы викторины о пророках для детей и взрослых.
Отвечай ТОЛЬКО валидным JSON без каких-либо других символов. Формат:
{
  "question": "текст вопроса на русском языке",
  "options": ["вариант1", "вариант2", "вариант3", "вариант4"],
  "correct": 0,
  "explanation": "объяснение на русском (2-3 предложения, интересно и познавательно)",
  "ayah_arabic": "аят из Корана на арабском (если есть)",
  "ayah_ref": "Сура:Аят (например, Аль-Бакара 2:30)"
}`;

  const userPrompt = `Создай вопрос #${questionIndex + 1} о пророке ${prophetName} (${prophetId}).
Вопрос должен быть интересным, основанным на достоверных источниках (Коран, Сунна).
Уровень: не слишком простой, но понятный. Не повторяй базовые вопросы типа "кто первый человек".`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  const data = await response.json();
  const text = data.content?.map((b) => b.text || "").join("") || "";
  return parseQuestion(text);
}

const TOTAL_QUESTIONS = 5;

export default function NabiyQuiz() {
  const [screen, setScreen] = useState("home"); // home | quiz | result
  const [selectedProphet, setSelectedProphet] = useState(null);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [score, setScore] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalStreak, setTotalStreak] = useState(0);

  const loadQuestion = async (prophet, index) => {
    setLoading(true);
    setError(null);
    setQuestion(null);
    setChosen(null);
    setShowExp(false);
    try {
      const q = await fetchQuestion(prophet.id, prophet.name, index);
      if (!q) throw new Error("Не удалось загрузить вопрос");
      setQuestion(q);
    } catch (e) {
      setError("Ошибка загрузки. Проверьте соединение и попробуйте снова.");
    }
    setLoading(false);
  };

  const selectProphet = (p) => {
    setSelectedProphet(p);
    setScore(0);
    setQIndex(0);
    setScreen("quiz");
    loadQuestion(p, 0);
  };

  const handleAnswer = (idx) => {
    if (chosen !== null) return;
    setChosen(idx);
    setShowExp(true);
    const correct = idx === question.correct;
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      setTotalStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    const next = qIndex + 1;
    if (next >= TOTAL_QUESTIONS) {
      setScreen("result");
    } else {
      setQIndex(next);
      loadQuestion(selectedProphet, next);
    }
  };

  const restart = () => {
    setScreen("home");
    setSelectedProphet(null);
    setQuestion(null);
    setChosen(null);
    setShowExp(false);
    setScore(0);
    setQIndex(0);
  };

  const getResultEmoji = () => {
    if (score === TOTAL_QUESTIONS) return "🏆";
    if (score >= 4) return "⭐";
    if (score >= 3) return "📖";
    return "🌱";
  };

  const getResultMsg = () => {
    if (score === TOTAL_QUESTIONS) return "Машааллах! Отличный результат! Вы настоящий знаток историй пророков!";
    if (score >= 4) return "Субханаллах! Очень хорошо! Продолжайте изучать историю пророков!";
    if (score >= 3) return "Хороший результат! Знания о пророках — это нур (свет) для сердца.";
    return "Аль-хамдулиллях за старание! Повторите ещё раз — знания приходят с практикой.";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="geo-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="header">
          <div className="logo-line">أنبياء الله</div>
          <div className="logo-main">
            NABIY <span>QUIZ</span>
          </div>
          <div className="logo-arabic">قصص الأنبياء</div>
        </div>

        <div className="streak-bar">
          <div className="stat-chip">🔥 Серия: {totalStreak}</div>
          <div className="stat-chip">✨ Пройдено: {Math.floor(totalStreak / TOTAL_QUESTIONS)} игр</div>
        </div>

        {screen === "home" && (
          <div className="prophet-grid">
            <div className="section-title">Выберите Пророка</div>
            <div className="grid">
              {PROPHETS.map((p) => (
                <div key={p.id} className="prophet-card" onClick={() => selectProphet(p)}>
                  <span className="prophet-emoji">{p.emoji}</span>
                  <span className="prophet-arabic">{p.arabic}</span>
                  <span className="prophet-name">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {screen === "quiz" && selectedProphet && (
          <div className="quiz-screen">
            <div className="prophet-header">
              <span className="prophet-header-emoji">{selectedProphet.emoji}</span>
              <div className="prophet-header-info">
                <div className="prophet-header-arabic">{selectedProphet.arabic}</div>
                <div className="prophet-header-name">Пророк {selectedProphet.name}</div>
              </div>
              <button className="back-btn" onClick={restart}>← Назад</button>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(qIndex / TOTAL_QUESTIONS) * 100}%` }}
              />
            </div>

            <div className="q-number">
              Вопрос {qIndex + 1} из {TOTAL_QUESTIONS} · Счёт: {score} ✨
            </div>

            {loading && (
              <div className="loading-box">
                <div className="spinner" />
                <div className="loading-text">Загружаем знания...</div>
                <div className="loading-arabic">بسم الله الرحمن الرحيم</div>
              </div>
            )}

            {error && (
              <div className="error-box">
                {error}
                <br />
                <button
                  className="next-btn"
                  style={{ marginTop: 12 }}
                  onClick={() => loadQuestion(selectedProphet, qIndex)}
                >
                  Повторить
                </button>
              </div>
            )}

            {question && !loading && (
              <>
                <div className="q-card">
                  <div className="q-text">{question.question}</div>
                </div>

                <div className="options">
                  {question.options.map((opt, i) => (
                    <button
                      key={i}
                      className={`option-btn ${
                        chosen !== null
                          ? i === question.correct
                            ? "correct"
                            : i === chosen && chosen !== question.correct
                            ? "wrong"
                            : ""
                          : ""
                      }`}
                      onClick={() => handleAnswer(i)}
                      disabled={chosen !== null}
                    >
                      <span className="option-letter">{LETTERS[i]}</span>
                      {opt}
                    </button>
                  ))}
                </div>

                {showExp && question.explanation && (
                  <div className="explanation-box">
                    <div className="exp-label">
                      📖 Объяснение
                    </div>
                    <div className="exp-text">{question.explanation}</div>
                    {question.ayah_arabic && (
                      <div className="exp-ayah">
                        <div className="exp-ayah-arabic">{question.ayah_arabic}</div>
                        <div className="exp-ayah-ref">— {question.ayah_ref}</div>
                      </div>
                    )}
                  </div>
                )}

                {chosen !== null && (
                  <button className="next-btn" onClick={handleNext}>
                    {qIndex + 1 >= TOTAL_QUESTIONS ? "Посмотреть результат →" : "Следующий вопрос →"}
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {screen === "result" && (
          <div className="result-screen">
            <div className="result-badge">{getResultEmoji()}</div>
            <div className="result-title">
              Результат <span>Викторины</span>
            </div>
            <div className="result-score">
              {score} <small>/ {TOTAL_QUESTIONS}</small>
            </div>
            <div className="result-msg">{getResultMsg()}</div>

            <div
              style={{
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: 14,
                padding: "14px 18px",
                marginBottom: 24,
                fontFamily: "'Amiri', serif",
                fontSize: 16,
                color: "rgba(212,175,55,0.8)",
                direction: "rtl",
              }}
            >
              طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
              <div style={{ direction: "ltr", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
                «Стремление к знаниям — обязанность каждого мусульманина» (Ибн Маджа)
              </div>
            </div>

            <div className="result-btns">
              <button className="btn-primary" onClick={() => selectProphet(selectedProphet)}>
                🔄 Ещё раз — {selectedProphet?.name}
              </button>
              <button className="btn-secondary" onClick={restart}>
                🕌 Выбрать другого Пророка
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
