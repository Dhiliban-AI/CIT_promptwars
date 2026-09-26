export const INITIAL_TOPICS = [
  {
    id: 'dsa_basics',
    category: 'Technical',
    title: 'Data Structures & Algorithms',
    description: 'Arrays, Linked Lists, Trees, Search Algorithms, and Big-O Complexity.',
    icon: 'Code',
    level: 'Intermediate',
    totalLessons: 8,
    flashcards: [
      { id: 'f1', question: 'What is the average time complexity of QuickSort?', answer: 'O(n log n) on average, O(n²) worst case.' },
      { id: 'f2', question: 'What is the primary difference between Stack and Queue?', answer: 'Stack is LIFO (Last In First Out), Queue is FIFO (First In First Out).' },
      { id: 'f3', question: 'When is a Hash Table lookup O(n)?', answer: 'When all keys hash to the same bucket resulting in hash collisions.' }
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'Which data structure is best suited for implementing a Breadth-First Search (BFS) algorithm?',
        options: ['Stack', 'Queue', 'Binary Search Tree', 'Priority Queue'],
        correctIndex: 1,
        explanation: 'BFS uses a Queue to explore vertices layer-by-layer in First-In-First-Out order.'
      },
      {
        id: 'q2',
        question: 'What is the space complexity of a recursive Fibonacci implementation without memoization?',
        options: ['O(1)', 'O(n)', 'O(2^n)', 'O(log n)'],
        correctIndex: 1,
        explanation: 'The space complexity is O(n) due to the maximum depth of the recursive call stack.'
      },
      {
        id: 'q3',
        question: 'Which sorting algorithm has a guaranteed worst-case time complexity of O(n log n)?',
        options: ['QuickSort', 'MergeSort', 'BubbleSort', 'SelectionSort'],
        correctIndex: 1,
        explanation: 'MergeSort always divides the array into halves and merges them, guaranteeing O(n log n).'
      }
    ]
  },
  {
    id: 'web_architecture',
    category: 'Technical',
    title: 'Modern Web & Systems Architecture',
    description: 'REST APIs, Microservices, Client-State, Caching, and Async Pipelines.',
    icon: 'Layers',
    level: 'Advanced',
    totalLessons: 6,
    flashcards: [
      { id: 'f4', question: 'What is idempotency in REST APIs?', answer: 'An operation is idempotent if making multiple identical requests has the same effect as a single request (e.g. GET, PUT, DELETE).' },
      { id: 'f5', question: 'What does CORS stand for?', answer: 'Cross-Origin Resource Sharing, a browser mechanism allowing restricted resources to be requested from another domain.' }
    ],
    practiceQuestions: [
      {
        id: 'q4',
        question: 'Which HTTP header is used by browsers to handle cached responses with ETags?',
        options: ['If-None-Match', 'Cache-Control', 'Authorization', 'X-Forwarded-For'],
        correctIndex: 0,
        explanation: 'If-None-Match allows servers to send 304 Not Modified if the ETag has not changed.'
      },
      {
        id: 'q5',
        question: 'What is the main advantage of WebSockets over HTTP polling?',
        options: ['Lower CPU usage on frontend', 'Full-duplex, low-latency persistent connection', 'Automatic SQL query caching', 'Strict cross-domain isolation'],
        correctIndex: 1,
        explanation: 'WebSockets maintain a single open TCP connection allowing instantaneous server push.'
      }
    ]
  },
  {
    id: 'comm_verbal',
    category: 'Communication',
    title: 'Verbal Fluency & Articulation',
    description: 'Structure ideas using PREP framework, clarity, pace control, and vocabulary.',
    icon: 'MessageSquare',
    level: 'Beginner',
    totalLessons: 5,
    flashcards: [
      { id: 'f6', question: 'What is the PREP framework in communication?', answer: 'Point, Reason, Example, Point - a structured model for clear concise answers.' },
      { id: 'f7', question: 'How do you reduce vocal fillers (um, ah, like)?', answer: 'Pause deliberately before answering to gather thoughts instead of filling silence.' }
    ],
    practiceQuestions: [
      {
        id: 'q6',
        question: 'When asked a complex question in an interview, what is the best immediate strategy?',
        options: ['Start speaking instantly to sound smart', 'Pause 2-3 seconds to structure your thoughts using a model like PREP', 'Ask the interviewer to answer first', 'Memorize a script word for word'],
        correctIndex: 1,
        explanation: 'A brief pause demonstrates poise and lets you structure your response logically.'
      },
      {
        id: 'q7',
        question: 'What is the optimal speaking rate for professional presentations?',
        options: ['80-100 WPM', '130-160 WPM', '200-240 WPM', 'As fast as possible'],
        correctIndex: 1,
        explanation: '130-160 Words Per Minute provides optimal clarity and audience comprehension.'
      }
    ]
  },
  {
    id: 'aptitude_logic',
    category: 'Aptitude',
    title: 'Logical Reasoning & Problem Solving',
    description: 'Pattern detection, syllogisms, data interpretation, and quantitative logic.',
    icon: 'BrainCircuit',
    level: 'Intermediate',
    totalLessons: 7,
    flashcards: [
      { id: 'f8', question: 'What is a syllogism?', answer: 'A logical argument where a conclusion is drawn from two given or assumed premises.' }
    ],
    practiceQuestions: [
      {
        id: 'q8',
        question: 'If all A are B, and some B are C, which statement is DEFINITELY true?',
        options: ['All A are C', 'Some A might be C', 'No A is C', 'All C are A'],
        correctIndex: 1,
        explanation: 'Overlap between A and C is possible but not guaranteed, so "Some A might be C" is logically true.'
      },
      {
        id: 'q9',
        question: 'Complete the sequence: 2, 6, 12, 20, 30, (?)',
        options: ['38', '42', '44', '48'],
        correctIndex: 1,
        explanation: 'The pattern adds +4, +6, +8, +10, +12. 30 + 12 = 42.'
      }
    ]
  }
];

export const INITIAL_VALUE2_DATA = {
  learnedTopics: ['dsa_basics', 'comm_verbal'],
  conceptMastery: {
    'dsa_basics': 75,
    'web_architecture': 40,
    'comm_verbal': 82,
    'aptitude_logic': 55
  },
  weakAreas: ['QuickSort Complexity', 'HTTP Caching / ETags', 'Quantitative Sequences'],
  practiceHistory: [
    { id: 'p1', topicId: 'dsa_basics', score: 80, total: 5, date: '2026-09-25T14:30:00Z' },
    { id: 'p2', topicId: 'comm_verbal', score: 90, total: 4, date: '2026-09-25T16:10:00Z' },
    { id: 'p3', topicId: 'web_architecture', score: 40, total: 5, date: '2026-09-26T08:15:00Z' }
  ],
  testHistory: [
    { id: 't1', title: 'Diagnostic Assessment', scorePercentage: 68, totalQuestions: 10, correctAnswers: 7, timeSpentSec: 240, date: '2026-09-25T17:00:00Z' }
  ],
  communicationLogs: [
    { id: 'c1', prompt: 'Elevator Pitch: Explain your top engineering skill in 60 seconds', wpm: 142, fluencyScore: 84, fillersDetected: 2, clarityRating: 'High', date: '2026-09-25T18:00:00Z' }
  ]
};

export const COMMUNICATION_PROMPTS = [
  {
    id: 'cp1',
    title: 'Behavioral: Overcoming a Technical Challenge',
    scenario: 'Describe a situation where you encountered a tough bug or system failure and how you solved it.',
    targetDuration: 60,
    tips: ['Use STAR method (Situation, Task, Action, Result)', 'Keep pace around 140 WPM', 'Avoid saying "um" or "like"']
  },
  {
    id: 'cp2',
    title: 'Elevator Pitch: Software Project Intro',
    scenario: 'Explain your latest full-stack application to a non-technical manager in 45 seconds.',
    targetDuration: 45,
    tips: ['Focus on business value & user benefit', 'Use clear simple language', 'End with a strong summary statement']
  },
  {
    id: 'cp3',
    title: 'Technical Discussion: Explain REST vs GraphQL',
    scenario: 'Compare REST APIs with GraphQL to a fellow developer during a code review session.',
    targetDuration: 60,
    tips: ['Highlight over-fetching & under-fetching', 'Mention schema definitions', 'Maintain confident tone']
  }
];
