export interface VocabItem {
  id: string;
  spanish: string;
  english: string;
  category: string;
}

export interface VerbConjugation {
  verb: string;
  meaning: string;
  type: string;
  forms: {
    yo: string;
    tu: string;
    el: string;
    nosotros: string;
    ellos: string;
  };
}

export interface Question {
  id: number;
  type: 'easy' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// --- CHAPTER 4 VOCAB (Page 105 + Notes) ---
export const CHAPTER_4_VOCAB: VocabItem[] = [
  // Time & Schedule
  { id: '4v1', spanish: '¿A qué hora es...?', english: 'At what time is...?', category: 'Time & Schedule' },
  { id: '4v2', spanish: '¿Qué hora es?', english: 'What time is it?', category: 'Time & Schedule' },
  { id: '4v3', spanish: 'A la(s)...', english: 'At... o\'clock', category: 'Time & Schedule' },
  { id: '4v4', spanish: 'Es la... / Son las...', english: 'It is... o\'clock', category: 'Time & Schedule' },
  { id: '4v5', spanish: 'de la mañana', english: 'in the morning (with a time)', category: 'Time & Schedule' },
  { id: '4v6', spanish: 'de la tarde', english: 'in the afternoon (with a time)', category: 'Time & Schedule' },
  { id: '4v7', spanish: 'de la noche', english: 'at night (with a time)', category: 'Time & Schedule' },
  { id: '4v8', spanish: 'la hora', english: 'hour; time', category: 'Time & Schedule' },
  { id: '4v9', spanish: 'el horario', english: 'schedule', category: 'Time & Schedule' },
  { id: '4v10', spanish: 'menos', english: 'to, before (telling time)', category: 'Time & Schedule' },
  { id: '4v11', spanish: 'el minuto', english: 'minute', category: 'Time & Schedule' },
  { id: '4v12', spanish: '...y cuarto', english: 'quarter past (:15)', category: 'Time & Schedule' },
  { id: '4v13', spanish: '...y (diez)', english: '(ten) past (:10)', category: 'Time & Schedule' },
  { id: '4v14', spanish: '...y media', english: 'half past (:30)', category: 'Time & Schedule' },
  // Frequency
  { id: '4f1', spanish: 'de vez en cuando', english: 'once in a while', category: 'Frequency' },
  { id: '4f2', spanish: 'muchas veces', english: 'often, many times', category: 'Frequency' },
  { id: '4f3', spanish: 'mucho', english: 'a lot', category: 'Frequency' },
  { id: '4f4', spanish: 'nunca', english: 'never', category: 'Frequency' },
  { id: '4f5', spanish: 'siempre', english: 'always', category: 'Frequency' },
  { id: '4f6', spanish: 'todos los días', english: 'every day', category: 'Frequency' },
  // School Subjects
  { id: '4s1', spanish: 'el arte', english: 'art', category: 'School Subjects' },
  { id: '4s2', spanish: 'las ciencias', english: 'science', category: 'School Subjects' },
  { id: '4s3', spanish: 'el español', english: 'Spanish', category: 'School Subjects' },
  { id: '4s4', spanish: 'la historia', english: 'history', category: 'School Subjects' },
  { id: '4s5', spanish: 'el inglés', english: 'English', category: 'School Subjects' },
  { id: '4s6', spanish: 'las matemáticas', english: 'math', category: 'School Subjects' },
  // Classroom Activities
  { id: '4c1', spanish: 'contestar', english: 'to answer', category: 'Activities' },
  { id: '4c2', spanish: 'enseñar', english: 'to teach', category: 'Activities' },
  { id: '4c3', spanish: 'llegar', english: 'to arrive', category: 'Activities' },
  { id: '4c4', spanish: 'necesitar', english: 'to need', category: 'Activities' },
  { id: '4c5', spanish: 'sacar una buena / mala nota', english: 'to get a good / bad grade', category: 'Activities' },
  { id: '4c6', spanish: 'tomar apuntes', english: 'to take notes', category: 'Activities' },
  { id: '4c7', spanish: 'usar la computadora', english: 'to use the computer', category: 'Activities' },
  // Other Words and Phrases
  { id: '4o1', spanish: 'casi', english: 'almost', category: 'Other Words' },
  { id: '4o2', spanish: '¿Cuántos(as)...?', english: 'How many...?', category: 'Other Words' },
  { id: '4o3', spanish: 'difícil', english: 'difficult', category: 'Other Words' },
  { id: '4o4', spanish: 'en', english: 'in', category: 'Other Words' },
  { id: '4o5', spanish: 'el examen (pl. los exámenes)', english: 'exam, test', category: 'Other Words' },
  { id: '4o6', spanish: 'fácil', english: 'easy', category: 'Other Words' },
  { id: '4o7', spanish: 'hay...', english: 'there is, there are...', category: 'Other Words' },
  { id: '4o8', spanish: 'muchos(as)', english: 'many', category: 'Other Words' },
  { id: '4o9', spanish: 'tarde', english: 'late', category: 'Other Words' },
  { id: '4o10', spanish: 'temprano', english: 'early', category: 'Other Words' },
  { id: '4o11', spanish: 'tener que', english: 'to have to', category: 'Other Words' },
];

export const CHAPTER_4_VERBS: VerbConjugation[] = [
  { verb: 'ser', meaning: 'to be (permanent, identity)', type: 'Irregular', forms: { yo: 'soy', tu: 'eres', el: 'es', nosotros: 'somos', ellos: 'son' } },
  { verb: 'estar', meaning: 'to be (location, condition)', type: 'Irregular', forms: { yo: 'estoy', tu: 'estás', el: 'está', nosotros: 'estamos', ellos: 'están' } },
  { verb: 'tener', meaning: 'to have (stem-changer e->ie)', type: 'Stem-changer', forms: { yo: 'tengo', tu: 'tienes', el: 'tiene', nosotros: 'tenemos', ellos: 'tienen' } },
  { verb: 'comer', meaning: 'to eat', type: 'Regular -er', forms: { yo: 'como', tu: 'comes', el: 'come', nosotros: 'comemos', ellos: 'comen' } },
  { verb: 'escribir', meaning: 'to write', type: 'Regular -ir', forms: { yo: 'escribo', tu: 'escribes', el: 'escribe', nosotros: 'escribimos', ellos: 'escriben' } }
];

export const CHAPTER_4_QUIZ: Question[] = [
  // 25 EASY VOCAB
  { id: 401, type: 'easy', question: 'What does "las matemáticas" mean?', options: ['art', 'science', 'math', 'history'], correctAnswer: 2, explanation: '"las matemáticas" means math.' },
  { id: 402, type: 'easy', question: 'What does "siempre" mean?', options: ['never', 'always', 'once in a while', 'a lot'], correctAnswer: 1, explanation: '"siempre" means always.' },
  { id: 403, type: 'easy', question: 'What does "el examen" mean?', options: ['schedule', 'exam, test', 'hour', 'minute'], correctAnswer: 1, explanation: '"el examen" means exam or test.' },
  { id: 404, type: 'easy', question: 'What does "el arte" mean?', options: ['art', 'English', 'Spanish', 'history'], correctAnswer: 0, explanation: '"el arte" means art.' },
  { id: 405, type: 'easy', question: 'What does "las ciencias" mean?', options: ['math', 'history', 'science', 'English'], correctAnswer: 2, explanation: '"las ciencias" means science.' },
  { id: 406, type: 'easy', question: 'What does "la historia" mean?', options: ['Spanish', 'history', 'art', 'science'], correctAnswer: 1, explanation: '"la historia" means history.' },
  { id: 407, type: 'easy', question: 'What does "el inglés" mean?', options: ['Spanish', 'English', 'art', 'math'], correctAnswer: 1, explanation: '"el inglés" means English.' },
  { id: 408, type: 'easy', question: 'What does "el español" mean?', options: ['English', 'history', 'Spanish', 'science'], correctAnswer: 2, explanation: '"el español" means Spanish.' },
  { id: 409, type: 'easy', question: 'What does "fácil" mean?', options: ['difficult', 'late', 'easy', 'early'], correctAnswer: 2, explanation: '"fácil" means easy.' },
  { id: 410, type: 'easy', question: 'What does "difícil" mean?', options: ['easy', 'difficult', 'almost', 'many'], correctAnswer: 1, explanation: '"difícil" means difficult.' },
  { id: 411, type: 'easy', question: 'What does "nunca" mean?', options: ['always', 'often', 'every day', 'never'], correctAnswer: 3, explanation: '"nunca" means never.' },
  { id: 412, type: 'easy', question: 'What does "mucho" mean?', options: ['a lot', 'never', 'almost', 'early'], correctAnswer: 0, explanation: '"mucho" means a lot.' },
  { id: 413, type: 'easy', question: 'What does "todos los días" mean?', options: ['once in a while', 'in the morning', 'every day', 'at night'], correctAnswer: 2, explanation: '"todos los días" means every day.' },
  { id: 414, type: 'easy', question: 'What does "el horario" mean?', options: ['minute', 'schedule', 'hour', 'exam'], correctAnswer: 1, explanation: '"el horario" means schedule.' },
  { id: 415, type: 'easy', question: 'What does "la hora" mean?', options: ['schedule', 'minute', 'hour; time', 'morning'], correctAnswer: 2, explanation: '"la hora" means hour or time.' },
  { id: 416, type: 'easy', question: 'What does "el minuto" mean?', options: ['hour', 'minute', 'afternoon', 'night'], correctAnswer: 1, explanation: '"el minuto" means minute.' },
  { id: 417, type: 'easy', question: 'What does "de la mañana" mean?', options: ['in the afternoon', 'at night', 'in the morning', 'every day'], correctAnswer: 2, explanation: '"de la mañana" means in the morning (with a time).' },
  { id: 418, type: 'easy', question: 'What does "de la tarde" mean?', options: ['in the morning', 'in the afternoon', 'at night', 'once in a while'], correctAnswer: 1, explanation: '"de la tarde" means in the afternoon (with a time).' },
  { id: 419, type: 'easy', question: 'What does "de la noche" mean?', options: ['at night', 'in the morning', 'in the afternoon', 'every day'], correctAnswer: 0, explanation: '"de la noche" means at night (with a time).' },
  { id: 420, type: 'easy', question: 'What does "escribir" mean?', options: ['to eat', 'to write', 'to teach', 'to arrive'], correctAnswer: 1, explanation: '"escribir" means to write.' },
  { id: 421, type: 'easy', question: 'What does "comer" mean?', options: ['to write', 'to need', 'to eat', 'to answer'], correctAnswer: 2, explanation: '"comer" means to eat.' },
  { id: 422, type: 'easy', question: 'What does "contestar" mean?', options: ['to answer', 'to arrive', 'to teach', 'to need'], correctAnswer: 0, explanation: '"contestar" means to answer.' },
  { id: 423, type: 'easy', question: 'What does "enseñar" mean?', options: ['to learn', 'to teach', 'to arrive', 'to write'], correctAnswer: 1, explanation: '"enseñar" means to teach.' },
  { id: 424, type: 'easy', question: 'What does "llegar" mean?', options: ['to need', 'to answer', 'to arrive', 'to take notes'], correctAnswer: 2, explanation: '"llegar" means to arrive.' },
  { id: 425, type: 'easy', question: 'What does "necesitar" mean?', options: ['to have to', 'to need', 'to use', 'to teach'], correctAnswer: 1, explanation: '"necesitar" means to need.' },

  // 25 HARD VOCAB
  { id: 426, type: 'hard', question: 'How do you say "once in a while" in Spanish?', options: ['todos los días', 'muchas veces', 'de vez en cuando', 'casi nunca'], correctAnswer: 2, explanation: '"de vez en cuando" means once in a while.' },
  { id: 427, type: 'hard', question: 'How do you say "often, many times" in Spanish?', options: ['muchas veces', 'muchos días', 'de vez en cuando', 'siempre'], correctAnswer: 0, explanation: '"muchas veces" means often or many times.' },
  { id: 428, type: 'hard', question: 'How do you say "to get a good grade" in Spanish?', options: ['tomar apuntes', 'sacar una buena nota', 'sacar una mala nota', 'tener un examen'], correctAnswer: 1, explanation: '"sacar una buena nota" means to get a good grade.' },
  { id: 429, type: 'hard', question: 'How do you say "to get a bad grade" in Spanish?', options: ['sacar una mala nota', 'sacar una buena nota', 'llegar tarde', 'tomar apuntes'], correctAnswer: 0, explanation: '"sacar una mala nota" means to get a bad grade.' },
  { id: 430, type: 'hard', question: 'How do you say "to take notes" in Spanish?', options: ['contestar preguntas', 'tomar apuntes', 'usar la computadora', 'sacar una nota'], correctAnswer: 1, explanation: '"tomar apuntes" means to take notes.' },
  { id: 431, type: 'hard', question: 'How do you say "to use the computer" in Spanish?', options: ['usar el horario', 'necesitar la computadora', 'usar la computadora', 'escribir en clase'], correctAnswer: 2, explanation: '"usar la computadora" means to use the computer.' },
  { id: 432, type: 'hard', question: 'How do you say "to have to" in Spanish?', options: ['hay que', 'tener que', 'hay', 'necesitar'], correctAnswer: 1, explanation: '"tener que" means to have to (+ infinitive).' },
  { id: 433, type: 'hard', question: 'What is the Spanish word for "almost"?', options: ['casi', 'tarde', 'temprano', 'mucho'], correctAnswer: 0, explanation: '"casi" means almost.' },
  { id: 434, type: 'hard', question: 'How do you ask "How many...?" in Spanish?', options: ['¿Qué hora es?', '¿A qué hora es?', '¿Cuántos(as)...?', '¿Cuál es...?'], correctAnswer: 2, explanation: '"¿Cuántos(as)...?" means How many...?' },
  { id: 435, type: 'hard', question: 'How do you say "there is / there are" in Spanish?', options: ['es', 'son', 'hay...', 'tener'], correctAnswer: 2, explanation: '"hay..." means there is or there are.' },
  { id: 436, type: 'hard', question: 'Which Spanish word is the opposite of "tarde" (late)?', options: ['casi', 'temprano', 'fácil', 'nunca'], correctAnswer: 1, explanation: '"temprano" means early, the opposite of "tarde" (late).' },
  { id: 437, type: 'hard', question: 'How do you say "late" in Spanish?', options: ['temprano', 'de la tarde', 'tarde', 'menos'], correctAnswer: 2, explanation: '"tarde" means late (while "de la tarde" means in the afternoon).' },
  { id: 438, type: 'hard', question: 'How do you ask "At what time is...?" in Spanish?', options: ['¿Qué hora es?', '¿A qué hora es...?', '¿Cuántos minutos?', '¿A la una?'], correctAnswer: 1, explanation: '"¿A qué hora es...?" asks at what time an event takes place.' },
  { id: 439, type: 'hard', question: 'How do you ask "What time is it?" in Spanish?', options: ['¿A qué hora es?', '¿Cuántas horas?', '¿Qué hora es?', '¿Es la hora?'], correctAnswer: 2, explanation: '"¿Qué hora es?" asks what time it is right now.' },
  { id: 440, type: 'hard', question: 'How do you say "At... o\'clock" (for an event)?', options: ['Es la(s)...', 'Son las...', 'A la(s)...', 'De la(s)...'], correctAnswer: 2, explanation: '"A la(s)..." means at... o\'clock.' },
  { id: 441, type: 'hard', question: 'Which time phrase means "quarter past (:15)"?', options: ['...y media', '...y diez', '...y cuarto', 'menos cuarto'], correctAnswer: 2, explanation: '"...y cuarto" means quarter past (:15).' },
  { id: 442, type: 'hard', question: 'Which time phrase means "half past (:30)"?', options: ['...y cuarto', '...y media', '...y diez', 'en punto'], correctAnswer: 1, explanation: '"...y media" means half past (:30).' },
  { id: 443, type: 'hard', question: 'Which word means "to, before" when telling time (e.g., 10 before 4)?', options: ['y', 'en', 'menos', 'casi'], correctAnswer: 2, explanation: '"menos" means to/before when telling time (e.g., las cuatro menos diez).' },
  { id: 444, type: 'hard', question: 'What is the plural of "el examen"?', options: ['los examenes', 'los exámenes', 'las exámenes', 'los exámen'], correctAnswer: 1, explanation: '"el examen" becomes "los exámenes" (accent moves to retain stress).' },
  { id: 445, type: 'hard', question: 'Which Spanish word means "many" (adjective before a noun)?', options: ['mucho', 'muchos(as)', 'muchas veces', 'casi'], correctAnswer: 1, explanation: '"muchos(as)" means many (agreeing in gender with the noun).' },
  { id: 446, type: 'hard', question: 'What does the preposition "en" mean in Chapter 4 vocab?', options: ['to', 'in', 'from', 'with'], correctAnswer: 1, explanation: '"en" means in (or on).' },
  { id: 447, type: 'hard', question: 'How do you say "It is 1:00" in Spanish?', options: ['Son las una', 'Es la una', 'A la una', 'Es las una'], correctAnswer: 1, explanation: '1:00 is singular, so it uses "Es la una".' },
  { id: 448, type: 'hard', question: 'How do you say "It is 2:10" in Spanish?', options: ['Es las dos y diez', 'Son las dos menos diez', 'Son las dos y diez', 'A las dos y diez'], correctAnswer: 2, explanation: '"Son las dos y diez" means It is 2:10.' },
  { id: 449, type: 'hard', question: 'Which expression means "one must / it is necessary to" (impersonal)?', options: ['tener que', 'hay que', 'hay...', 'necesitar'], correctAnswer: 1, explanation: '"hay que + infinitive" states what one must do in general.' },
  { id: 450, type: 'hard', question: 'Which phrase means "It is 9:45" (quarter to ten)?', options: ['Son las nueve menos cuarto', 'Son las diez menos cuarto', 'Son las diez y cuarto', 'Es las diez menos cuarto'], correctAnswer: 1, explanation: '9:45 is 10 minus a quarter: "Son las diez menos cuarto".' }
];

// --- CHAPTER 5 VOCAB (Page 129 + Composition Book Notes) ---
export const CHAPTER_5_VOCAB: VocabItem[] = [
  // Classroom Objects (p. 129)
  { id: '5v1', spanish: 'el borrador', english: 'eraser', category: 'Classroom Objects' },
  { id: '5v2', spanish: 'la calculadora', english: 'calculator', category: 'Classroom Objects' },
  { id: '5v3', spanish: 'el cuaderno', english: 'notebook', category: 'Classroom Objects' },
  { id: '5v4', spanish: 'el escritorio', english: 'desk', category: 'Classroom Objects' },
  { id: '5v5', spanish: 'el lápiz (pl. los lápices)', english: 'pencil', category: 'Classroom Objects' },
  { id: '5v6', spanish: 'el mapa', english: 'map', category: 'Classroom Objects' },
  { id: '5v7', spanish: 'la mochila', english: 'backpack', category: 'Classroom Objects' },
  { id: '5v8', spanish: 'el papel', english: 'paper', category: 'Classroom Objects' },
  { id: '5v9', spanish: 'el pizarrón (pl. los pizarrones)', english: 'board, chalkboard', category: 'Classroom Objects' },
  { id: '5v10', spanish: 'la pluma', english: 'pen', category: 'Classroom Objects' },
  { id: '5v11', spanish: 'la puerta', english: 'door', category: 'Classroom Objects' },
  { id: '5v12', spanish: 'el reloj', english: 'clock; watch', category: 'Classroom Objects' },
  { id: '5v13', spanish: 'la silla', english: 'chair', category: 'Classroom Objects' },
  { id: '5v14', spanish: 'la tiza', english: 'chalk', category: 'Classroom Objects' },
  { id: '5v15', spanish: 'la ventana', english: 'window', category: 'Classroom Objects' },
  // Describe Classes (p. 129)
  { id: '5c1', spanish: 'aburrido(a)', english: 'boring', category: 'Describe Classes' },
  { id: '5c2', spanish: 'divertido(a)', english: 'fun', category: 'Describe Classes' },
  { id: '5c3', spanish: 'interesante', english: 'interesting', category: 'Describe Classes' },
  // Places in School (p. 129)
  { id: '5p1', spanish: 'el baño', english: 'bathroom', category: 'Places in School' },
  { id: '5p2', spanish: 'la biblioteca', english: 'library', category: 'Places in School' },
  { id: '5p3', spanish: 'la cafetería', english: 'cafeteria', category: 'Places in School' },
  { id: '5p4', spanish: 'el gimnasio', english: 'gymnasium', category: 'Places in School' },
  { id: '5p5', spanish: 'la oficina del (de la) director(a)', english: 'principal\'s office', category: 'Places in School' },
  { id: '5p6', spanish: 'el pasillo', english: 'hall', category: 'Places in School' },
  // Locations / Where Things Are Located (p. 129)
  { id: '5l1', spanish: 'al lado (de)', english: 'next to', category: 'Locations' },
  { id: '5l2', spanish: 'cerca (de)', english: 'near (to)', category: 'Locations' },
  { id: '5l3', spanish: 'debajo (de)', english: 'underneath, under', category: 'Locations' },
  { id: '5l4', spanish: 'delante (de)', english: 'in front (of)', category: 'Locations' },
  { id: '5l5', spanish: 'dentro (de)', english: 'inside (of)', category: 'Locations' },
  { id: '5l6', spanish: 'detrás (de)', english: 'behind', category: 'Locations' },
  { id: '5l7', spanish: 'encima (de)', english: 'on top (of)', category: 'Locations' },
  { id: '5l8', spanish: 'lejos (de)', english: 'far (from)', category: 'Locations' },
  // Feelings / Moods (p. 129)
  { id: '5f1', spanish: 'cansado(a)', english: 'tired', category: 'Feelings' },
  { id: '5f2', spanish: 'contento(a)', english: 'content, happy', category: 'Feelings' },
  { id: '5f3', spanish: 'deprimido(a)', english: 'depressed', category: 'Feelings' },
  { id: '5f4', spanish: 'emocionado(a)', english: 'excited', category: 'Feelings' },
  { id: '5f5', spanish: 'enojado(a)', english: 'angry', category: 'Feelings' },
  { id: '5f6', spanish: 'nervioso(a)', english: 'nervous', category: 'Feelings' },
  { id: '5f7', spanish: 'ocupado(a)', english: 'busy', category: 'Feelings' },
  { id: '5f8', spanish: 'tranquilo(a)', english: 'calm', category: 'Feelings' },
  { id: '5f9', spanish: 'triste', english: 'sad', category: 'Feelings' },
  // Interrogative Words & Other Phrases (p. 129 + Composition Book)
  { id: '5i1', spanish: '¿Qué? / que', english: 'What? / that', category: 'Interrogatives & Other' },
  { id: '5i2', spanish: '¿Cuándo? / cuando', english: 'When? / when', category: 'Interrogatives & Other' },
  { id: '5i3', spanish: '¿(A)dónde?', english: '(To) Where?', category: 'Interrogatives & Other' },
  { id: '5i4', spanish: '¿Quién?', english: 'Who?', category: 'Interrogatives & Other' },
  { id: '5i5', spanish: '¿Cómo?', english: 'How?', category: 'Interrogatives & Other' },
  { id: '5i6', spanish: '¿Por qué? / porque', english: 'Why? / Because', category: 'Interrogatives & Other' },
  { id: '5i7', spanish: '¿Cuál?', english: 'Which?', category: 'Interrogatives & Other' },
  { id: '5i8', spanish: '¿Cuántos(as)?', english: 'How many? / How much?', category: 'Interrogatives & Other' },
  { id: '5i9', spanish: 'el problema', english: 'problem', category: 'Interrogatives & Other' },
  // Regular & Key Verbs (Composition Book)
  { id: '5vb1', spanish: 'enseñar', english: 'to teach', category: 'Verbs (Notes)' },
  { id: '5vb2', spanish: 'necesitar', english: 'to need', category: 'Verbs (Notes)' },
  { id: '5vb3', spanish: 'llegar', english: 'to arrive', category: 'Verbs (Notes)' },
  { id: '5vb4', spanish: 'usar', english: 'to use', category: 'Verbs (Notes)' },
  { id: '5vb5', spanish: 'organizar', english: 'to organize', category: 'Verbs (Notes)' },
  { id: '5vb6', spanish: 'gustar', english: 'to like', category: 'Verbs (Notes)' },
  { id: '5vb7', spanish: 'beber', english: 'to drink', category: 'Verbs (Notes)' },
  { id: '5vb8', spanish: 'ayudar', english: 'to help', category: 'Verbs (Notes)' },
  { id: '5vb9', spanish: 'contestar', english: 'to answer', category: 'Verbs (Notes)' },
  { id: '5vb10', spanish: 'vivir', english: 'to live', category: 'Verbs (Notes)' },
  { id: '5vb11', spanish: 'ir', english: 'to go', category: 'Verbs (Notes)' },
  // Months & Days (Composition Book)
  { id: '5m1', spanish: 'enero', english: 'January', category: 'Months & Days' },
  { id: '5m2', spanish: 'febrero', english: 'February', category: 'Months & Days' },
  { id: '5m3', spanish: 'marzo', english: 'March', category: 'Months & Days' },
  { id: '5m4', spanish: 'abril', english: 'April', category: 'Months & Days' },
  { id: '5m5', spanish: 'mayo', english: 'May', category: 'Months & Days' },
  { id: '5m6', spanish: 'junio', english: 'June', category: 'Months & Days' },
  { id: '5m7', spanish: 'julio', english: 'July', category: 'Months & Days' },
  { id: '5m8', spanish: 'agosto', english: 'August', category: 'Months & Days' },
  { id: '5m9', spanish: 'septiembre', english: 'September', category: 'Months & Days' },
  { id: '5m10', spanish: 'octubre', english: 'October', category: 'Months & Days' },
  { id: '5m11', spanish: 'noviembre', english: 'November', category: 'Months & Days' },
  { id: '5m12', spanish: 'diciembre', english: 'December', category: 'Months & Days' },
  { id: '5d1', spanish: 'lunes', english: 'Monday', category: 'Months & Days' },
  { id: '5d2', spanish: 'martes', english: 'Tuesday', category: 'Months & Days' },
  { id: '5d3', spanish: 'miércoles', english: 'Wednesday', category: 'Months & Days' },
  { id: '5d4', spanish: 'jueves', english: 'Thursday', category: 'Months & Days' },
  { id: '5d5', spanish: 'viernes', english: 'Friday', category: 'Months & Days' },
  { id: '5d6', spanish: 'sábado', english: 'Saturday', category: 'Months & Days' },
  { id: '5d7', spanish: 'domingo', english: 'Sunday', category: 'Months & Days' },
];

export const CHAPTER_5_VERBS: VerbConjugation[] = [
  { verb: 'ir', meaning: 'to go (ir + a + infinitive)', type: 'Irregular', forms: { yo: 'voy', tu: 'vas', el: 'va', nosotros: 'vamos', ellos: 'van' } },
  { verb: 'estar', meaning: 'to be (location, condition, feeling)', type: 'Irregular', forms: { yo: 'estoy', tu: 'estás', el: 'está', nosotros: 'estamos', ellos: 'están' } },
  { verb: 'contestar', meaning: 'to answer', type: 'Regular -ar', forms: { yo: 'contesto', tu: 'contestas', el: 'contesta', nosotros: 'contestamos', ellos: 'contestan' } },
  { verb: 'beber', meaning: 'to drink', type: 'Regular -er', forms: { yo: 'bebo', tu: 'bebes', el: 'bebe', nosotros: 'bebemos', ellos: 'beben' } },
  { verb: 'vivir', meaning: 'to live', type: 'Regular -ir', forms: { yo: 'vivo', tu: 'vives', el: 'vive', nosotros: 'vivimos', ellos: 'viven' } }
];

export const CHAPTER_5_QUIZ: Question[] = [
  // 25 EASY VOCAB
  { id: 501, type: 'easy', question: 'What does "el borrador" mean?', options: ['eraser', 'calculator', 'notebook', 'clock'], correctAnswer: 0, explanation: '"el borrador" means eraser.' },
  { id: 502, type: 'easy', question: 'What does "la calculadora" mean?', options: ['backpack', 'calculator', 'desk', 'pen'], correctAnswer: 1, explanation: '"la calculadora" means calculator.' },
  { id: 503, type: 'easy', question: 'What does "el cuaderno" mean?', options: ['paper', 'pencil', 'notebook', 'chair'], correctAnswer: 2, explanation: '"el cuaderno" means notebook.' },
  { id: 504, type: 'easy', question: 'What does "el escritorio" mean?', options: ['window', 'door', 'desk', 'map'], correctAnswer: 2, explanation: '"el escritorio" means desk.' },
  { id: 505, type: 'easy', question: 'What does "el lápiz" mean?', options: ['pen', 'pencil', 'chalk', 'eraser'], correctAnswer: 1, explanation: '"el lápiz" means pencil.' },
  { id: 506, type: 'easy', question: 'What does "la mochila" mean?', options: ['map', 'desk', 'backpack', 'window'], correctAnswer: 2, explanation: '"la mochila" means backpack.' },
  { id: 507, type: 'easy', question: 'What does "el papel" mean?', options: ['paper', 'pen', 'chair', 'door'], correctAnswer: 0, explanation: '"el papel" means paper.' },
  { id: 508, type: 'easy', question: 'What does "la pluma" mean?', options: ['pencil', 'pen', 'eraser', 'chalk'], correctAnswer: 1, explanation: '"la pluma" means pen.' },
  { id: 509, type: 'easy', question: 'What does "la puerta" mean?', options: ['window', 'chair', 'door', 'wall'], correctAnswer: 2, explanation: '"la puerta" means door.' },
  { id: 510, type: 'easy', question: 'What does "el reloj" mean?', options: ['map', 'clock; watch', 'chalkboard', 'hall'], correctAnswer: 1, explanation: '"el reloj" means clock or watch.' },
  { id: 511, type: 'easy', question: 'What does "la silla" mean?', options: ['desk', 'chair', 'window', 'door'], correctAnswer: 1, explanation: '"la silla" means chair.' },
  { id: 512, type: 'easy', question: 'What does "la ventana" mean?', options: ['door', 'hall', 'window', 'library'], correctAnswer: 2, explanation: '"la ventana" means window.' },
  { id: 513, type: 'easy', question: 'What does "cansado(a)" mean?', options: ['tired', 'happy', 'sad', 'excited'], correctAnswer: 0, explanation: '"cansado(a)" means tired.' },
  { id: 514, type: 'easy', question: 'What does "contento(a)" mean?', options: ['angry', 'nervous', 'content, happy', 'tired'], correctAnswer: 2, explanation: '"contento(a)" means content or happy.' },
  { id: 515, type: 'easy', question: 'What does "triste" mean?', options: ['calm', 'sad', 'busy', 'happy'], correctAnswer: 1, explanation: '"triste" means sad.' },
  { id: 516, type: 'easy', question: 'What does "enojado(a)" mean?', options: ['excited', 'tired', 'angry', 'calm'], correctAnswer: 2, explanation: '"enojado(a)" means angry.' },
  { id: 517, type: 'easy', question: 'What does "nervioso(a)" mean?', options: ['nervous', 'busy', 'depressed', 'happy'], correctAnswer: 0, explanation: '"nervioso(a)" means nervous.' },
  { id: 518, type: 'easy', question: 'What does "el baño" mean?', options: ['library', 'cafeteria', 'bathroom', 'gymnasium'], correctAnswer: 2, explanation: '"el baño" means bathroom.' },
  { id: 519, type: 'easy', question: 'What does "la biblioteca" mean?', options: ['cafeteria', 'library', 'hall', 'office'], correctAnswer: 1, explanation: '"la biblioteca" means library.' },
  { id: 520, type: 'easy', question: 'What does "el gimnasio" mean?', options: ['cafeteria', 'bathroom', 'gymnasium', 'hall'], correctAnswer: 2, explanation: '"el gimnasio" means gymnasium.' },
  { id: 521, type: 'easy', question: 'What does "¿Dónde?" mean?', options: ['When?', 'Where?', 'Who?', 'What?'], correctAnswer: 1, explanation: '"¿Dónde?" means Where?' },
  { id: 522, type: 'easy', question: 'What does "¿Cuándo?" mean?', options: ['Where?', 'Who?', 'When?', 'How?'], correctAnswer: 2, explanation: '"¿Cuándo?" means When?' },
  { id: 523, type: 'easy', question: 'What is "enero" in English?', options: ['February', 'January', 'March', 'December'], correctAnswer: 1, explanation: '"enero" is January.' },
  { id: 524, type: 'easy', question: 'What is "viernes" in English?', options: ['Thursday', 'Friday', 'Saturday', 'Monday'], correctAnswer: 1, explanation: '"viernes" is Friday.' },
  { id: 525, type: 'easy', question: 'Which verb means "to live"?', options: ['beber', 'vivir', 'contestar', 'ir'], correctAnswer: 1, explanation: '"vivir" means to live.' },

  // 25 HARD VOCAB
  { id: 526, type: 'hard', question: 'What is the Spanish word for "board, chalkboard"?', options: ['el borrador', 'el pizarrón', 'la tiza', 'el mapa'], correctAnswer: 1, explanation: '"el pizarrón" means board or chalkboard.' },
  { id: 527, type: 'hard', question: 'What does "la tiza" mean?', options: ['eraser', 'chalk', 'pen', 'paper'], correctAnswer: 1, explanation: '"la tiza" means chalk.' },
  { id: 528, type: 'hard', question: 'What does "aburrido(a)" mean?', options: ['fun', 'interesting', 'boring', 'busy'], correctAnswer: 2, explanation: '"aburrido(a)" means boring.' },
  { id: 529, type: 'hard', question: 'What does "divertido(a)" mean?', options: ['boring', 'fun', 'sad', 'calm'], correctAnswer: 1, explanation: '"divertido(a)" means fun.' },
  { id: 530, type: 'hard', question: 'How do you say "interesting" in Spanish?', options: ['aburrido', 'divertido', 'interesante', 'emocionado'], correctAnswer: 2, explanation: '"interesante" means interesting.' },
  { id: 531, type: 'hard', question: 'How do you say "next to" in Spanish?', options: ['cerca de', 'al lado (de)', 'detrás de', 'lejos de'], correctAnswer: 1, explanation: '"al lado (de)" means next to.' },
  { id: 532, type: 'hard', question: 'Which phrase means "near (to)"?', options: ['lejos (de)', 'cerca (de)', 'dentro (de)', 'encima (de)'], correctAnswer: 1, explanation: '"cerca (de)" means near (to).' },
  { id: 533, type: 'hard', question: 'Which phrase means "far (from)"?', options: ['cerca (de)', 'al lado (de)', 'lejos (de)', 'delante (de)'], correctAnswer: 2, explanation: '"lejos (de)" means far (from).' },
  { id: 534, type: 'hard', question: 'How do you say "underneath, under" in Spanish?', options: ['encima (de)', 'debajo (de)', 'detrás (de)', 'dentro (de)'], correctAnswer: 1, explanation: '"debajo (de)" means underneath or under.' },
  { id: 535, type: 'hard', question: 'How do you say "on top (of)" in Spanish?', options: ['debajo (de)', 'dentro (de)', 'encima (de)', 'delante (de)'], correctAnswer: 2, explanation: '"encima (de)" means on top (of).' },
  { id: 536, type: 'hard', question: 'What is the opposite of "detrás (de)" (behind)?', options: ['delante (de)', 'debajo (de)', 'dentro (de)', 'lejos (de)'], correctAnswer: 0, explanation: '"delante (de)" means in front (of), the opposite of "detrás (de)" (behind).' },
  { id: 537, type: 'hard', question: 'What does "detrás (de)" mean?', options: ['in front of', 'inside', 'behind', 'next to'], correctAnswer: 2, explanation: '"detrás (de)" means behind.' },
  { id: 538, type: 'hard', question: 'How do you say "inside (of)" in Spanish?', options: ['encima (de)', 'dentro (de)', 'debajo (de)', 'al lado (de)'], correctAnswer: 1, explanation: '"dentro (de)" means inside (of).' },
  { id: 539, type: 'hard', question: 'What does "deprimido(a)" mean?', options: ['nervous', 'excited', 'depressed', 'angry'], correctAnswer: 2, explanation: '"deprimido(a)" means depressed.' },
  { id: 540, type: 'hard', question: 'How do you say "excited" in Spanish?', options: ['enojado(a)', 'emocionado(a)', 'ocupado(a)', 'tranquilo(a)'], correctAnswer: 1, explanation: '"emocionado(a)" means excited.' },
  { id: 541, type: 'hard', question: 'What does "ocupado(a)" mean?', options: ['calm', 'tired', 'busy', 'bored'], correctAnswer: 2, explanation: '"ocupado(a)" means busy.' },
  { id: 542, type: 'hard', question: 'How do you say "calm" in Spanish?', options: ['tranquilo(a)', 'contento(a)', 'triste', 'cansado(a)'], correctAnswer: 0, explanation: '"tranquilo(a)" means calm.' },
  { id: 543, type: 'hard', question: 'What does "el pasillo" mean?', options: ['bathroom', 'principal\'s office', 'hall', 'cafeteria'], correctAnswer: 2, explanation: '"el pasillo" means hall (hallway).' },
  { id: 544, type: 'hard', question: 'How do you say "the principal\'s office" in Spanish?', options: ['la biblioteca', 'el pasillo', 'la oficina del director', 'el escritorio'], correctAnswer: 2, explanation: '"la oficina del (de la) director(a)" means the principal\'s office.' },
  { id: 545, type: 'hard', question: 'What is the difference between "¿Por qué?" and "porque"?', options: ['Where vs There', 'Why vs Because', 'What vs That', 'When vs Then'], correctAnswer: 1, explanation: '"¿Por qué?" (two words with accent) means Why?; "porque" (one word) means because.' },
  { id: 546, type: 'hard', question: 'How do you ask "Which?" in Spanish?', options: ['¿Quién?', '¿Cómo?', '¿Cuál?', '¿Qué?'], correctAnswer: 2, explanation: '"¿Cuál?" means Which?' },
  { id: 547, type: 'hard', question: 'How do you ask "How many / How much?" in Spanish?', options: ['¿Cuántos(as)?', '¿Cuándo?', '¿Cómo?', '¿Cuál?'], correctAnswer: 0, explanation: '"¿Cuántos(as)?" means How many? (or ¿Cuánto(a)? for How much?).' },
  { id: 548, type: 'hard', question: 'What is the plural of "el lápiz"?', options: ['los lápizes', 'los lápices', 'las lápices', 'los lápiz'], correctAnswer: 1, explanation: 'Nouns ending in -z change z to c before adding -es: "los lápices".' },
  { id: 549, type: 'hard', question: 'What does the regular verb "ayudar" mean (from your notes)?', options: ['to drink', 'to organize', 'to help', 'to answer'], correctAnswer: 2, explanation: '"ayudar" means to help.' },
  { id: 550, type: 'hard', question: 'What does the regular verb "organizar" mean (from your notes)?', options: ['to use', 'to organize', 'to arrive', 'to like'], correctAnswer: 1, explanation: '"organizar" means to organize.' }
];
