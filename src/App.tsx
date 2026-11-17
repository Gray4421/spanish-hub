/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Clock,
  Hash,
  Award,
  Sparkles,
  Volume2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  BookmarkCheck,
  FileText,
  ArrowRight,
  Check,
  Layers,
  GraduationCap,
  Shuffle
} from 'lucide-react';
import {
  VocabItem,
  VerbConjugation,
  Question,
  CHAPTER_4_VOCAB,
  CHAPTER_4_VERBS,
  CHAPTER_4_QUIZ,
  CHAPTER_5_VOCAB,
  CHAPTER_5_VERBS,
  CHAPTER_5_QUIZ
} from './data/chapters';

// Helper to convert number 0-100 to Spanish word
function numberToSpanish(n: number): string {
  if (n === 0) return 'cero';
  if (n === 100) return 'cien';
  if (n <= 15) {
    return ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince'][n - 1];
  }
  if (n < 20) {
    return 'dieci' + numberToSpanish(n - 10);
  }
  if (n === 20) return 'veinte';
  if (n < 30) {
    return n === 21 ? 'veintiún' : 'veinti' + numberToSpanish(n - 20);
  }
  const tensMap: Record<number, string> = {
    30: 'treinta', 40: 'cuarenta', 50: 'cincuenta',
    60: 'sesenta', 70: 'setenta', 80: 'ochenta', 90: 'noventa'
  };
  const ten = Math.floor(n / 10) * 10;
  const rem = n % 10;
  if (rem === 0) return tensMap[ten];
  return `${tensMap[ten]} y ${numberToSpanish(rem)}`;
}

function speakSpanish(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<'chapter4' | 'chapter5'>('chapter5');
  const [activeTab, setActiveTab] = useState<'overview' | 'vocab' | 'numbers' | 'clocks' | 'verbs' | 'grammar' | 'quiz'>('overview');

  const vocabData = currentChapter === 'chapter4' ? CHAPTER_4_VOCAB : CHAPTER_5_VOCAB;
  const verbData = currentChapter === 'chapter4' ? CHAPTER_4_VERBS : CHAPTER_5_VERBS;
  const quizData = currentChapter === 'chapter4' ? CHAPTER_4_QUIZ : CHAPTER_5_QUIZ;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center justify-between md:justify-start space-x-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white flex items-center gap-2">
                Español Study Hub <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {currentChapter === 'chapter4' ? 'Capítulo 4' : 'Capítulo 5'}
                </span>
              </h1>
              <p className="text-xs text-slate-400">Switch chapters instantly to study vocab, verbs & quizzes</p>
            </div>
          </div>

          {/* Chapter Selector */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentChapter('chapter4')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                currentChapter === 'chapter4'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Chapter 4
            </button>
            <button
              onClick={() => setCurrentChapter('chapter5')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                currentChapter === 'chapter5'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Chapter 5
            </button>
          </div>
        </div>

        {/* Quick Nav Tabs */}
        <nav className="hidden xl:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
          <NavLink active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<BookOpen className="w-4 h-4" />} label="Overview" />
          <NavLink active={activeTab === 'vocab'} onClick={() => setActiveTab('vocab')} icon={<Layers className="w-4 h-4" />} label="Vocab" />
          <NavLink active={activeTab === 'numbers'} onClick={() => setActiveTab('numbers')} icon={<Hash className="w-4 h-4" />} label="Numbers" />
          <NavLink active={activeTab === 'clocks'} onClick={() => setActiveTab('clocks')} icon={<Clock className="w-4 h-4" />} label="Clocks" />
          <NavLink active={activeTab === 'verbs'} onClick={() => setActiveTab('verbs')} icon={<BookmarkCheck className="w-4 h-4" />} label="Verb Charts" />
          <NavLink active={activeTab === 'grammar'} onClick={() => setActiveTab('grammar')} icon={<FileText className="w-4 h-4" />} label="Grammar" />
          <NavLink active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} icon={<Award className="w-4 h-4" />} label="Vocab Quizzes" highlight />
        </nav>
      </header>

      {/* Mobile Subheader Nav */}
      <div className="xl:hidden flex overflow-x-auto space-x-2 bg-slate-900 border-b border-slate-800 p-2 scrollbar-none">
        <MobileNavLink active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Overview" />
        <MobileNavLink active={activeTab === 'vocab'} onClick={() => setActiveTab('vocab')} label="Vocab" />
        <MobileNavLink active={activeTab === 'numbers'} onClick={() => setActiveTab('numbers')} label="Numbers" />
        <MobileNavLink active={activeTab === 'clocks'} onClick={() => setActiveTab('clocks')} label="Clocks" />
        <MobileNavLink active={activeTab === 'verbs'} onClick={() => setActiveTab('verbs')} label="Verbs" />
        <MobileNavLink active={activeTab === 'grammar'} onClick={() => setActiveTab('grammar')} label="Grammar" />
        <MobileNavLink active={activeTab === 'quiz'} onClick={() => setActiveTab('quiz')} label="Vocab Quizzes" />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'overview' && <OverviewTab currentChapter={currentChapter} setActiveTab={setActiveTab} vocabCount={vocabData.length} />}
        {activeTab === 'vocab' && <VocabTab currentChapter={currentChapter} vocabData={vocabData} />}
        {activeTab === 'numbers' && <NumbersTab />}
        {activeTab === 'clocks' && <ClocksTab />}
        {activeTab === 'verbs' && <VerbsTab verbData={verbData} />}
        {activeTab === 'grammar' && <GrammarTab currentChapter={currentChapter} />}
        {activeTab === 'quiz' && <QuizTab currentChapter={currentChapter} quizData={quizData} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/50 py-4 text-center text-xs text-slate-500">
        Español Study Hub • {currentChapter === 'chapter4' ? 'Capítulo 4 Profile Active' : 'Capítulo 5 Profile Active'} • Built with audio & quizzes
      </footer>
    </div>
  );
}

function NavLink({ active, onClick, icon, label, highlight }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; highlight?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
        active
          ? highlight
            ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/30'
            : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
          : highlight
          ? 'text-rose-400 hover:bg-rose-950/40 hover:text-rose-300'
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MobileNavLink({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
        active ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
      }`}
    >
      {label}
    </button>
  );
}

// --- OVERVIEW TAB ---
function OverviewTab({ currentChapter, setActiveTab, vocabCount }: { currentChapter: 'chapter4' | 'chapter5'; setActiveTab: (tab: any) => void; vocabCount: number }) {
  const isCh4 = currentChapter === 'chapter4';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className={`relative overflow-hidden rounded-3xl p-8 border shadow-2xl ${
        isCh4
          ? 'bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border-indigo-500/30'
          : 'bg-gradient-to-r from-rose-950 via-pink-950 to-slate-900 border-rose-500/30'
      }`}>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Active Profile: {isCh4 ? 'Capítulo 4' : 'Capítulo 5'}
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isCh4 ? '¡Hola! Ready to master Chapter 4?' : '¡Hola! Ready to master Chapter 5?'}
          </h2>
          <p className="text-slate-300 text-sm lg:text-base leading-relaxed mb-6">
            {isCh4
              ? 'Covering Vocab page 105, numbers 0–100, clocks, verb crosses (Ser, Estar, Tener, Comer, Escribir), Tener que vs Hay que, and 25 Easy + 25 Hard Vocab Quizzes.'
              : 'Covering Vocab page 129 (Classroom objects, places, locations, feelings), Interrogative words, months & days, contractions (al, del), Verbs (Ir, Estar, Contestar, Beber, Vivir), and 25 Easy + 25 Hard Vocab Quizzes.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm text-white shadow-lg transition flex items-center gap-2 ${
                isCh4 ? 'bg-gradient-to-r from-rose-600 to-pink-600 shadow-rose-600/30' : 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-600/30'
              }`}
            >
              <Award className="w-4 h-4" /> Take Vocab Quizzes (25 Easy & 25 Hard)
            </button>
            <button
              onClick={() => setActiveTab('verbs')}
              className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm hover:bg-slate-700 transition flex items-center gap-2"
            >
              <BookmarkCheck className="w-4 h-4" /> Practice Verb Charts
            </button>
          </div>
        </div>
      </div>

      {/* Checklist Grid */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BookmarkCheck className="w-5 h-5 text-indigo-400" /> {isCh4 ? 'Chapter 4' : 'Chapter 5'} Study Checklist
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ChecklistCard
            title={isCh4 ? "Vocabulary (Page 105)" : "Vocabulary (Page 129)"}
            desc={isCh4 ? "Time, frequency, school subjects, classroom activities & other words." : "Classroom objects, places, locations, feelings, interrogatives, months & days."}
            icon={<BookOpen className="w-5 h-5 text-indigo-400" />}
            onClick={() => setActiveTab('vocab')}
            count={`${vocabCount} Terms`}
          />
          <ChecklistCard
            title="Numbers 0 to 100"
            desc="Practice Spanish numbers, spelling, and digit-to-word conversions."
            icon={<Hash className="w-5 h-5 text-emerald-400" />}
            onClick={() => setActiveTab('numbers')}
            count="0 - 100 Trainer"
          />
          <ChecklistCard
            title="Telling Time & Clocks"
            desc="Practice random clock times (y cuarto, y media, menos) and schedules."
            icon={<Clock className="w-5 h-5 text-amber-400" />}
            onClick={() => setActiveTab('clocks')}
            count="Interactive Clock"
          />
          <ChecklistCard
            title="Verb Crosses & Chart Quiz"
            desc={isCh4 ? "Ser, Estar, Tener, Comer, Escribir." : "Ir, Estar, Contestar, Beber, Vivir with chart quiz."}
            icon={<BookmarkCheck className="w-5 h-5 text-rose-400" />}
            onClick={() => setActiveTab('verbs')}
            count="Chart Quiz Mode"
          />
          <ChecklistCard
            title={isCh4 ? "Grammar: Tener que vs Hay que" : "Grammar: Interrogatives & Contractions"}
            desc={isCh4 ? "Tener que vs Hay que rules." : "Interrogative words (¿dónde?, ¿cuándo?) and al / del contractions."}
            icon={<FileText className="w-5 h-5 text-purple-400" />}
            onClick={() => setActiveTab('grammar')}
            count="Rules & Practice"
          />
          <ChecklistCard
            title="2 Vocab Quizzes (25 Easy & 25 Hard)"
            desc="Quiz 1: 25 Easy Vocab and Quiz 2: 25 Hard Vocab with explanations."
            icon={<Award className="w-5 h-5 text-pink-400" />}
            onClick={() => setActiveTab('quiz')}
            count="2 Quizzes • 25 Each"
            highlight
          />
        </div>
      </div>
    </div>
  );
}

function ChecklistCard({ title, desc, icon, onClick, count, highlight }: { title: string; desc: string; icon: React.ReactNode; onClick: () => void; count: string; highlight?: boolean }) {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl p-6 bg-slate-900 border transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl ${
        highlight
          ? 'border-rose-500/40 hover:border-rose-500 bg-gradient-to-b from-slate-900 to-rose-950/20'
          : 'border-slate-800 hover:border-indigo-500/50'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:scale-110 transition">
          {icon}
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          {count}
        </span>
      </div>
      <h4 className="font-bold text-white text-base mb-1 group-hover:text-indigo-300 transition">{title}</h4>
      <p className="text-xs text-slate-400 leading-relaxed mb-4">{desc}</p>
      <div className="flex items-center text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
        Study now <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </div>
    </div>
  );
}

// --- VOCABULARY TAB ---
function VocabTab({ currentChapter, vocabData }: { currentChapter: 'chapter4' | 'chapter5'; vocabData: VocabItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Reset category filter & search when switching chapters
  useEffect(() => {
    setSelectedCategory('All');
    setSearchTerm('');
    setFlippedCards({});
  }, [currentChapter]);

  const categories = ['All', ...Array.from(new Set(vocabData.map(v => v.category)))];

  const filteredVocab = vocabData.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.spanish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.english.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {currentChapter === 'chapter4' ? 'Chapter 4 Vocabulary (Page 105)' : 'Chapter 5 Vocabulary (Page 129 & Notes)'}
          </h2>
          <p className="text-xs text-slate-400">Click any card to flip between Spanish and English, or click the speaker to hear pronunciation.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search vocab..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 w-full md:w-64"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vocab Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVocab.map((item) => {
          const isFlipped = flippedCards[item.id] || false;
          return (
            <div
              key={item.id}
              onClick={() => toggleFlip(item.id)}
              className="relative h-48 rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between cursor-pointer hover:border-indigo-500/50 transition group shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                  {item.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakSpanish(item.spanish);
                  }}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition"
                  title="Listen pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center my-auto">
                {!isFlipped ? (
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition mb-1">{item.spanish}</h3>
                    <span className="text-xs text-slate-500">(Click to reveal English)</span>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold text-emerald-400 mb-1">{item.english}</h3>
                    <span className="text-xs text-slate-500">(Click to flip back)</span>
                  </div>
                )}
              </div>

              <div className="text-center text-[11px] text-slate-500">
                Tap card to flip
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- NUMBERS TAB ---
function NumbersTab() {
  const [testMode, setTestMode] = useState<boolean>(false);
  const [currentNum, setCurrentNum] = useState<number>(Math.floor(Math.random() * 100) + 1);
  const [userGuess, setUserGuess] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const handleCheckNumber = (e: React.FormEvent) => {
    e.preventDefault();
    const correctWord = numberToSpanish(currentNum).toLowerCase().trim();
    const cleanUser = userGuess.toLowerCase().trim();

    if (cleanUser === correctWord) {
      setFeedback('correct');
      setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }));
      speakSpanish(numberToSpanish(currentNum));
      setTimeout(() => {
        setFeedback(null);
        setUserGuess('');
        setCurrentNum(Math.floor(Math.random() * 100) + 1);
      }, 1500);
    } else {
      setFeedback('incorrect');
      setScore(s => ({ ...s, total: s.total + 1 }));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Spanish Numbers 0 to 100</h2>
          <p className="text-xs text-slate-400">Master spelling and pronunciation for counting, prices, and time.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTestMode(false)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${!testMode ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
          >
            Reference Table
          </button>
          <button
            onClick={() => setTestMode(true)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${testMode ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
          >
            Number Quiz Mode
          </button>
        </div>
      </div>

      {!testMode ? (
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-3">Quick Number Lookup & Audio</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100].map((n) => (
                <div
                  key={n}
                  onClick={() => speakSpanish(numberToSpanish(n))}
                  className="bg-slate-800 hover:bg-indigo-600/30 border border-slate-700 hover:border-indigo-500 rounded-xl p-3 text-center cursor-pointer transition group"
                >
                  <div className="text-xl font-extrabold text-indigo-400 group-hover:text-white">{n}</div>
                  <div className="text-xs text-slate-300 capitalize">{numberToSpanish(n)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <h4 className="font-bold text-white mb-2 text-sm flex items-center gap-2">
                <Hash className="w-4 h-4 text-emerald-400" /> Rules for Numbers 16–29
              </h4>
              <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <li>• <strong>16–19</strong>: dieciséis, diecisiete, dieciocho, diecinueve</li>
                <li>• <strong>21–29</strong>: veintiuno, veintidós, veintitrés... (single word!)</li>
                <li>• Note: 21 before masculine noun is <span className="text-indigo-300 font-semibold">veintiún</span>.</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <h4 className="font-bold text-white mb-2 text-sm flex items-center gap-2">
                <Hash className="w-4 h-4 text-emerald-400" /> Rules for 31–99
              </h4>
              <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <li>• Tens use <span className="text-indigo-300 font-semibold">y</span> (and): e.g., 31 = treinta y uno.</li>
                <li>• 42 = cuarenta y dos.</li>
                <li>• 100 = cien.</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 max-w-xl mx-auto text-center shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
              Score: {score.correct} / {score.total}
            </span>
            <button
              onClick={() => { setCurrentNum(Math.floor(Math.random() * 100) + 1); setUserGuess(''); setFeedback(null); }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Skip
            </button>
          </div>

          <div className="mb-8">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Spell this number in Spanish:</span>
            <div className="text-6xl font-black text-indigo-400 my-4">{currentNum}</div>
            <button
              onClick={() => speakSpanish(numberToSpanish(currentNum))}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition"
            >
              <Volume2 className="w-4 h-4 text-indigo-400" /> Listen to pronunciation
            </button>
          </div>

          <form onSubmit={handleCheckNumber} className="space-y-4">
            <input
              type="text"
              placeholder="e.g. cuarenta y cinco"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              disabled={feedback === 'correct'}
              className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-center text-lg font-medium text-white focus:outline-none transition ${
                feedback === 'correct' ? 'border-emerald-500 bg-emerald-950/20' :
                feedback === 'incorrect' ? 'border-rose-500 bg-rose-950/20' : 'border-slate-700 focus:border-indigo-500'
              }`}
              autoFocus
            />

            {feedback === 'correct' && (
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-semibold animate-bounce">
                <CheckCircle2 className="w-5 h-5" /> ¡Correcto! ({numberToSpanish(currentNum)})
              </div>
            )}
            {feedback === 'incorrect' && (
              <div className="flex items-center justify-center gap-2 text-rose-400 text-sm font-semibold">
                <XCircle className="w-5 h-5" /> Incorrect. Try again! (Correct: {numberToSpanish(currentNum)})
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition"
            >
              Check Answer
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// --- CLOCKS TAB ---
function ClocksTab() {
  const [hour, setHour] = useState<number>(3);
  const [minute, setMinute] = useState<number>(15);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [quizMode, setQuizMode] = useState<boolean>(true);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateRandomClock = () => {
    const randomH = Math.floor(Math.random() * 12) + 1;
    const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const randomM = mins[Math.floor(Math.random() * mins.length)];
    setHour(randomH);
    setMinute(randomM);
    setUserAnswer('');
    setFeedback(null);
  };

  useEffect(() => {
    if (quizMode) generateRandomClock();
  }, [quizMode]);

  const getSpanishTimes = (h: number, m: number): string[] => {
    const results: string[] = [];
    if (m === 0) {
      results.push(h === 1 ? 'es la una en punto' : `son las ${numberToSpanish(h)} en punto`);
      results.push(h === 1 ? 'es la una' : `son las ${numberToSpanish(h)}`);
    } else if (m === 15) {
      results.push(h === 1 ? 'es la una y cuarto' : `son las ${numberToSpanish(h)} y cuarto`);
      results.push(h === 1 ? 'es la una y quince' : `son las ${numberToSpanish(h)} y quince`);
    } else if (m === 30) {
      results.push(h === 1 ? 'es la una y media' : `son las ${numberToSpanish(h)} y media`);
      results.push(h === 1 ? 'es la una y treinta' : `son las ${numberToSpanish(h)} y treinta`);
    } else if (m > 30) {
      const nextH = h === 12 ? 1 : h + 1;
      const diff = 60 - m;
      if (diff === 15) {
        results.push(nextH === 1 ? 'es la una menos cuarto' : `son las ${numberToSpanish(nextH)} menos cuarto`);
      } else {
        results.push(nextH === 1 ? `es la una menos ${numberToSpanish(diff)}` : `son las ${numberToSpanish(nextH)} menos ${numberToSpanish(diff)}`);
      }
      results.push(h === 1 ? `es la una y ${numberToSpanish(m)}` : `son las ${numberToSpanish(h)} y ${numberToSpanish(m)}`);
    } else {
      results.push(h === 1 ? `es la una y ${numberToSpanish(m)}` : `son las ${numberToSpanish(h)} y ${numberToSpanish(m)}`);
    }
    return results;
  };

  const handleCheckClock = (e: React.FormEvent) => {
    e.preventDefault();
    const possibleAnswers = getSpanishTimes(hour, minute).map(s => s.toLowerCase().trim());
    const cleanUser = userAnswer.toLowerCase().trim().replace(/\s+/g, ' ');
    const isMatch = possibleAnswers.some(ans => cleanUser === ans || cleanUser.includes(ans));

    if (isMatch) {
      setFeedback('correct');
      setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }));
      speakSpanish(getSpanishTimes(hour, minute)[0]);
      setTimeout(() => {
        generateRandomClock();
      }, 1800);
    } else {
      setFeedback('incorrect');
      setScore(s => ({ ...s, total: s.total + 1 }));
    }
  };

  const minuteAngle = minute * 6;
  const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Interactive Clock & Time Quiz</h2>
          <p className="text-xs text-slate-400">Practice telling time in Spanish (e.g. "Son las tres y cuarto").</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setQuizMode(false)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${!quizMode ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
          >
            Clock Explorer
          </button>
          <button
            onClick={() => setQuizMode(true)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${quizMode ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
          >
            Random Clock Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 flex flex-col items-center justify-center shadow-xl">
          <div className="relative w-64 h-64 rounded-full bg-slate-950 border-4 border-indigo-500/40 shadow-inner flex items-center justify-center">
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
              const angle = (num * 30) * (Math.PI / 180);
              const r = 90;
              const x = 128 + r * Math.sin(angle) - 12;
              const y = 128 - r * Math.cos(angle) - 12;
              return (
                <div
                  key={num}
                  className="absolute w-6 h-6 flex items-center justify-center text-xs font-bold text-indigo-300"
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  {num}
                </div>
              );
            })}
            <div
              className="absolute w-1.5 h-16 bg-indigo-400 rounded-full origin-bottom bottom-1/2 left-[125px] transition-transform duration-500 shadow-md"
              style={{ transform: `rotate(${hourAngle}deg)` }}
            ></div>
            <div
              className="absolute w-1 h-22 bg-rose-400 rounded-full origin-bottom bottom-1/2 left-[127px] transition-transform duration-500 shadow-md"
              style={{ transform: `rotate(${minuteAngle}deg)` }}
            ></div>
            <div className="absolute w-4 h-4 rounded-full bg-white border-2 border-slate-900 shadow"></div>
          </div>
          <div className="mt-6 text-center">
            <span className="text-sm font-bold text-slate-300">
              Digital Time: <span className="text-indigo-400">{String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}</span>
            </span>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-xl flex flex-col justify-between">
          {quizMode ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                  Score: {score.correct} / {score.total}
                </span>
                <button
                  onClick={generateRandomClock}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> New Clock
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">What time is shown on the clock in Spanish?</h3>
              <p className="text-xs text-slate-400 mb-6">Type "Es la una..." or "Son las...".</p>

              <form onSubmit={handleCheckClock} className="space-y-4">
                <input
                  type="text"
                  placeholder="e.g. son las tres y cuarto"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={feedback === 'correct'}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white text-sm font-medium focus:outline-none transition ${
                    feedback === 'correct' ? 'border-emerald-500 bg-emerald-950/20' :
                    feedback === 'incorrect' ? 'border-rose-500 bg-rose-950/20' : 'border-slate-700 focus:border-indigo-500'
                  }`}
                  autoFocus
                />
                {feedback === 'correct' && (
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> ¡Correcto! ({getSpanishTimes(hour, minute)[0]})
                  </div>
                )}
                {feedback === 'incorrect' && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
                    <XCircle className="w-4 h-4" /> Incorrect. Correct answer: <span className="text-white">{getSpanishTimes(hour, minute)[0]}</span>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30"
                >
                  Check Spanish Time
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Manual Time Explorer</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Hour ({hour}):</label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={hour}
                    onChange={(e) => setHour(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Minute ({minute}):</label>
                  <input
                    type="range"
                    min="0"
                    max="55"
                    step="5"
                    value={minute}
                    onChange={(e) => setMinute(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block mb-1">Spanish Translation:</span>
                <span className="text-lg font-bold text-indigo-300 capitalize">{getSpanishTimes(hour, minute)[0]}</span>
                <button
                  onClick={() => speakSpanish(getSpanishTimes(hour, minute)[0])}
                  className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-xs text-slate-200 transition mx-auto block"
                >
                  <Volume2 className="w-4 h-4" /> Listen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- VERBS & CHART QUIZ TAB ---
function VerbsTab({ verbData }: { verbData: VerbConjugation[] }) {
  const [selectedVerb, setSelectedVerb] = useState<string>(verbData[0].verb);
  const [chartQuizMode, setChartQuizMode] = useState<boolean>(false);
  const [userChartInputs, setUserChartInputs] = useState<Record<string, string>>({});
  const [chartChecked, setChartChecked] = useState<boolean>(false);
  const [chartScore, setChartScore] = useState<number>(0);

  useEffect(() => {
    setSelectedVerb(verbData[0].verb);
    resetChartQuiz();
  }, [verbData]);

  const verb = verbData.find(v => v.verb === selectedVerb) || verbData[0];

  const pronounsList = [
    { key: 'yo', label: 'yo (I)' },
    { key: 'tu', label: 'tú (you informal)' },
    { key: 'el', label: 'él / ella / usted' },
    { key: 'nosotros', label: 'nosotros / nosotras' },
    { key: 'ellos', label: 'ellos / ellas / ustedes' }
  ];

  const handleChartInputChange = (key: string, val: string) => {
    setUserChartInputs(prev => ({ ...prev, [key]: val }));
  };

  const handleCheckChart = (e: React.FormEvent) => {
    e.preventDefault();
    let correctCount = 0;
    pronounsList.forEach(p => {
      const userVal = (userChartInputs[p.key] || '').toLowerCase().trim();
      const expectedVal = (verb.forms as any)[p.key].toLowerCase().trim();
      if (userVal === expectedVal) {
        correctCount++;
      }
    });
    setChartScore(correctCount);
    setChartChecked(true);
  };

  const resetChartQuiz = () => {
    setUserChartInputs({});
    setChartChecked(false);
    setChartScore(0);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Verb Crosses & Chart Quiz</h2>
          <p className="text-xs text-slate-400">Study conjugation charts or test yourself by filling out the chart for each verb.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setChartQuizMode(false); resetChartQuiz(); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${!chartQuizMode ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
          >
            Study Chart Table
          </button>
          <button
            onClick={() => { setChartQuizMode(true); resetChartQuiz(); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${chartQuizMode ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
          >
            Quiz This Chart
          </button>
        </div>
      </div>

      {/* Verb Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {verbData.map((v) => (
          <button
            key={v.verb}
            onClick={() => { setSelectedVerb(v.verb); resetChartQuiz(); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition ${
              selectedVerb === v.verb
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {v.verb} <span className="text-xs font-normal opacity-75">({v.type})</span>
          </button>
        ))}
      </div>

      {!chartQuizMode ? (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-2xl font-extrabold text-white capitalize flex items-center gap-3">
                Verb Chart: {verb.verb}
                <button
                  onClick={() => speakSpanish(`${verb.verb}, yo ${verb.forms.yo}, tú ${verb.forms.tu}, él ${verb.forms.el}, nosotros ${verb.forms.nosotros}, ellos ${verb.forms.ellos}`)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition text-xs"
                  title="Pronounce all forms"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </h3>
              <p className="text-sm text-indigo-400 font-medium mt-1">{verb.meaning}</p>
            </div>
            <span className="mt-2 md:mt-0 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {verb.type}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ConjugationRow pronoun="yo (I)" form={verb.forms.yo} />
            <ConjugationRow pronoun="tú (you informal)" form={verb.forms.tu} />
            <ConjugationRow pronoun="él / ella / usted" form={verb.forms.el} />
            <ConjugationRow pronoun="nosotros / nosotras" form={verb.forms.nosotros} />
            <ConjugationRow pronoun="ellos / ellas / ustedes" form={verb.forms.ellos} />
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white capitalize">
                Quiz Chart: <span className="text-indigo-400">{verb.verb}</span> ({verb.meaning})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Fill in all 5 pronoun conjugation forms (capitalization is accepted).</p>
            </div>
            {chartChecked && (
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${chartScore === 5 ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40' : 'bg-amber-950/40 text-amber-400 border-amber-500/40'}`}>
                Score: {chartScore} / 5 {chartScore === 5 ? '🎉 Perfect!' : ''}
              </span>
            )}
          </div>

          <form onSubmit={handleCheckChart} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pronounsList.map((p) => {
                const userVal = userChartInputs[p.key] || '';
                const expectedVal = (verb.forms as any)[p.key];
                const isCorrect = chartChecked && userVal.toLowerCase().trim() === expectedVal.toLowerCase();

                return (
                  <div key={p.key} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <label className="text-xs text-slate-400 mb-1.5 font-medium">{p.label}</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="conjugation..."
                        value={userVal}
                        onChange={(e) => handleChartInputChange(p.key, e.target.value)}
                        disabled={chartChecked}
                        className={`w-full px-3 py-2 rounded-lg bg-slate-900 border text-sm text-white focus:outline-none transition ${
                          chartChecked
                            ? isCorrect ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300' : 'border-rose-500 bg-rose-950/20 text-rose-300'
                            : 'border-slate-700 focus:border-indigo-500'
                        }`}
                      />
                      {chartChecked && (
                        <div className="absolute right-3 top-2.5">
                          {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}
                        </div>
                      )}
                    </div>
                    {chartChecked && !isCorrect && (
                      <span className="text-[11px] text-emerald-400 mt-1">Correct: {expectedVal}</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-2">
              {!chartChecked ? (
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30"
                >
                  Check Chart Answers
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetChartQuiz}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Try Again
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function ConjugationRow({ pronoun, form }: { pronoun: string; form: string }) {
  return (
    <div className="bg-slate-950 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
      <span className="text-xs text-slate-400">{pronoun}</span>
      <span className="text-base font-extrabold text-indigo-300">{form}</span>
    </div>
  );
}

// --- GRAMMAR TAB ---
function GrammarTab({ currentChapter }: { currentChapter: 'chapter4' | 'chapter5' }) {
  const isCh4 = currentChapter === 'chapter4';

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white">{isCh4 ? 'Chapter 4 Grammar Focus' : 'Chapter 5 Grammar Focus'}</h2>
        <p className="text-xs text-slate-400">
          {isCh4 ? 'Tener que vs Hay que, telling time & Telehistorias.' : 'Interrogative words, contractions (al, del), and locations.'}
        </p>
      </div>

      {isCh4 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">VS</div>
              <h3 className="text-lg font-bold text-white">Tener que vs. Hay que</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong className="text-indigo-400 text-sm block mb-1">1. Tener que + [infinitive]</strong>
                <p>Used for a <em>specific person</em> having to do something.</p>
                <p className="text-slate-400 mt-1 italic">Example: Yo <strong>tengo que</strong> estudiar.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong className="text-emerald-400 text-sm block mb-1">2. Hay que + [infinitive]</strong>
                <p>Used impersonally for general rules (one must).</p>
                <p className="text-slate-400 mt-1 italic">Example: <strong>Hay que</strong> tomar apuntes.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">📚</div>
              <h3 className="text-lg font-bold text-white">Telehistorias & Key Notes</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong className="text-rose-400 text-sm block mb-1">Telehistorias (Pages 89, 94, 99)</strong>
                <p>Review conversations involving class schedules and teacher interactions.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">?</div>
              <h3 className="text-lg font-bold text-white">Interrogative Words (Preguntas)</h3>
            </div>
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between"><span>¿Qué? / que</span><span className="text-indigo-400 font-semibold">What / that</span></div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between"><span>¿Cuándo?</span><span className="text-indigo-400 font-semibold">When</span></div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between"><span>¿(A)dónde?</span><span className="text-indigo-400 font-semibold">(To) Where</span></div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between"><span>¿Quién?</span><span className="text-indigo-400 font-semibold">Who</span></div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between"><span>¿Cómo?</span><span className="text-indigo-400 font-semibold">How</span></div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between"><span>¿Por qué? / Porque</span><span className="text-indigo-400 font-semibold">Why / Because</span></div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between"><span>¿Cuál?</span><span className="text-indigo-400 font-semibold">Which</span></div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between"><span>¿Cuántos(as)?</span><span className="text-indigo-400 font-semibold">How many / How much</span></div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">+</div>
              <h3 className="text-lg font-bold text-white">Contractions: al & del</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong className="text-emerald-400 text-sm block mb-1">1. al (to the)</strong>
                <p>When <span className="text-white font-bold">a</span> is followed by <span className="text-white font-bold">el</span>, they combine into <span className="text-indigo-300 font-bold">al</span>.</p>
                <p className="text-slate-400 mt-1 italic">Example: Voy <strong>al</strong> gimnasio. (I go to the gym.)</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong className="text-indigo-400 text-sm block mb-1">2. del (of / from the)</strong>
                <p>When <span className="text-white font-bold">de</span> is followed by <span className="text-white font-bold">el</span>, they combine into <span className="text-indigo-300 font-bold">del</span>.</p>
                <p className="text-slate-400 mt-1 italic">Example: La oficina <strong>del</strong> director.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong className="text-rose-400 text-sm block mb-1">3. Nota gramatical (p. 117)</strong>
                <p>Put the conjugated verb before the subject to ask a question.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- QUIZ TAB (2 Quizzes: 25 Easy Vocab & 25 Hard Vocab) ---
function QuizTab({ currentChapter, quizData }: { currentChapter: 'chapter4' | 'chapter5'; quizData: Question[] }) {
  const [mode, setMode] = useState<'select' | 'active' | 'results'>('select');
  const [quizType, setQuizType] = useState<'easy' | 'hard'>('easy');
  const [shuffleOrder, setShuffleOrder] = useState<boolean>(false);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    setMode('select');
  }, [currentChapter]);

  const easyCount = quizData.filter(q => q.type === 'easy').length;
  const hardCount = quizData.filter(q => q.type === 'hard').length;

  const startQuiz = (type: 'easy' | 'hard') => {
    const filtered = quizData.filter(q => q.type === type);
    const ordered = shuffleOrder
      ? [...filtered].sort(() => Math.random() - 0.5)
      : filtered;
    setQuizType(type);
    setActiveQuestions(ordered);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setMode('active');
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    activeQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setMode('results');
  };

  const answeredCount = activeQuestions.filter(q => selectedAnswers[q.id] !== undefined).length;
  const progressPct = activeQuestions.length > 0 ? ((currentIndex + 1) / activeQuestions.length) * 100 : 0;

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">
          {currentChapter === 'chapter4' ? 'Chapter 4 Vocab Quizzes' : 'Chapter 5 Vocab Quizzes'}
        </h2>
        <p className="text-xs text-slate-400">2 Vocab Quizzes: 25 Easy Vocab and 25 Hard Vocab.</p>
      </div>

      {mode === 'select' && (
        <div className="space-y-5 mt-6">
          <div className="flex justify-center">
            <button
              onClick={() => setShuffleOrder(prev => !prev)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                shuffleOrder
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              {shuffleOrder ? 'Randomize Order: ON' : 'Randomize Order: OFF'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div
              onClick={() => startQuiz('easy')}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-7 text-center cursor-pointer hover:border-emerald-500/60 transition shadow-xl group"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 text-lg font-extrabold flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                {easyCount}
              </div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 mb-1">Quiz 1</div>
              <h3 className="text-xl font-bold text-white mb-2">25 Easy Vocab</h3>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Core chapter vocabulary recognition — classroom items, subjects, feelings, months, days, and key verbs.
              </p>
              <span className="inline-block px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-md shadow-emerald-600/30">
                Start Easy Vocab Quiz
              </span>
            </div>

            <div
              onClick={() => startQuiz('hard')}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-7 text-center cursor-pointer hover:border-rose-500/60 transition shadow-xl group"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 text-lg font-extrabold flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                {hardCount}
              </div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-rose-400 mb-1">Quiz 2</div>
              <h3 className="text-xl font-bold text-white mb-2">25 Hard Vocab</h3>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                English-to-Spanish recall, location prepositions, multi-word phrases, tricky pairs, and irregular plurals.
              </p>
              <span className="inline-block px-5 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-xs shadow-md shadow-rose-600/30">
                Start Hard Vocab Quiz
              </span>
            </div>
          </div>
        </div>
      )}

      {mode === 'active' && activeQuestions.length > 0 && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl space-y-6">
          <div className="space-y-3 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-400">
                Question {currentIndex + 1} of {activeQuestions.length} ({answeredCount} answered)
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full capitalize border font-semibold ${
                quizType === 'easy'
                  ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-950/50 text-rose-300 border-rose-500/30'
              }`}>
                {quizType === 'easy' ? '25 Easy Vocab' : '25 Hard Vocab'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${quizType === 'easy' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              {activeQuestions[currentIndex].question}
            </h3>
            <div className="space-y-3">
              {activeQuestions[currentIndex].options.map((opt, idx) => {
                const isSelected = selectedAnswers[activeQuestions[currentIndex].id] === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(activeQuestions[currentIndex].id, idx)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/40 text-white font-medium'
                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${isSelected ? 'border-indigo-400 bg-indigo-600 text-white' : 'border-slate-700 text-slate-500'}`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs font-semibold text-slate-200 transition"
            >
              Previous
            </button>
            <button
              onClick={() => setMode('select')}
              className="text-xs text-slate-500 hover:text-slate-300 transition"
            >
              Exit Quiz
            </button>
            {currentIndex < activeQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition shadow-md shadow-indigo-600/30"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-xs font-semibold text-white transition shadow-md shadow-emerald-600/30 flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}

      {mode === 'results' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center shadow-2xl space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center mx-auto shadow-xl">
            <Award className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white mb-2">
              {quizType === 'easy' ? 'Easy Vocab Quiz Complete!' : 'Hard Vocab Quiz Complete!'}
            </h3>
            <p className="text-sm text-slate-400">
              You scored <span className="text-indigo-400 font-bold">{score}</span> out of <span className="text-white font-bold">{activeQuestions.length}</span> ({Math.round((score / activeQuestions.length) * 100)}%)
            </p>
          </div>
          <div className="text-left space-y-4 max-h-96 overflow-y-auto pr-2">
            <h4 className="font-bold text-white text-sm">Question Review & Explanations:</h4>
            {activeQuestions.map((q, i) => {
              const userAns = selectedAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;
              return (
                <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-rose-500/40 bg-rose-950/10'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                    <span className="text-xs font-bold text-white">Q{i + 1}: {q.question}</span>
                  </div>
                  <p className="text-xs text-slate-300 ml-6">
                    Your answer: <span className={isCorrect ? 'text-emerald-300 font-semibold' : 'text-rose-300 font-semibold'}>{userAns !== undefined ? q.options[userAns] : 'None'}</span>
                    {!isCorrect && <span className="block text-emerald-400 mt-1">Correct answer: {q.options[q.correctAnswer]}</span>}
                  </p>
                  <p className="text-[11px] text-slate-400 ml-6 mt-1 italic">Explanation: {q.explanation}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => startQuiz(quizType)}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Retake This Quiz
            </button>
            <button
              onClick={() => setMode('select')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition inline-flex items-center gap-2"
            >
              Choose Other Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
