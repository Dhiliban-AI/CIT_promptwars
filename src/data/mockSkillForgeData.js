export const INITIAL_VALUE1 = {
  totalLessonsCompleted: 24,
  totalPracticeQuestionsSolved: 148,
  learningHours: 36.5,
  currentSkillLevel: 'Level 4 - Placement Ready',
  readinessPercentage: 84,
  streakDays: 7,
  weeklyProgress: [
    { day: 'Mon', hours: 2.5, questions: 15 },
    { day: 'Tue', hours: 3.8, questions: 24 },
    { day: 'Wed', hours: 4.2, questions: 30 },
    { day: 'Thu', hours: 3.0, questions: 18 },
    { day: 'Fri', hours: 5.1, questions: 35 },
    { day: 'Sat', hours: 4.0, questions: 26 },
    { day: 'Sun', hours: 2.0, questions: 10 }
  ]
};

export const INITIAL_VALUE2 = {
  topicsStudied: [
    'Python OOP & Classes',
    'Binary Search Trees',
    'DBMS: SQL Basics',
    'Verbal: PREP Framework',
    'Quantitative: Time & Work',
    'HR Interview: Behavioral Questions'
  ],
  difficultyLevelsMastered: {
    Easy: 92,
    Medium: 78,
    Hard: 58
  },
  weakAreas: ['SQL Joins & Indexing', 'Dynamic Programming', 'Grammar: Complex Prepositions'],
  strongAreas: ['Binary Trees', 'Time & Work Problems', 'Python OOP', 'Self Introduction'],
  frequentlyIncorrectConcepts: [
    'Left Outer Join vs Subqueries',
    'Knapsack Space Optimization',
    'Subject-Verb Agreement in Relative Clauses'
  ],
  accuracyPercentage: 81,
  practiceHistory: [
    { id: 'ph1', topic: 'Binary Search Trees', category: 'Data Structures', difficulty: 'Medium', correct: 4, total: 5, timeTaken: '6m 10s', date: '2026-09-25T10:30:00Z' },
    { id: 'ph2', topic: 'SQL Joins & Indexing', category: 'DBMS', difficulty: 'Hard', correct: 2, total: 5, timeTaken: '8m 45s', date: '2026-09-25T14:15:00Z' },
    { id: 'ph3', topic: 'Time & Work', category: 'Aptitude', difficulty: 'Easy', correct: 5, total: 5, timeTaken: '4m 20s', date: '2026-09-26T09:00:00Z' }
  ],
  testHistory: [
    {
      id: 'th1',
      title: 'TCS & Infosys Placement Diagnostic Test',
      scorePct: 76,
      accuracyPct: 79,
      timeTaken: '18m 40s',
      rankPrediction: '#38 / 1,450 Candidates',
      strengths: ['Quantitative Aptitude', 'Binary Tree Traversal'],
      weaknesses: ['SQL Subqueries', 'Pointers'],
      date: '2026-09-25T16:00:00Z'
    }
  ],
  communicationLogs: [
    {
      id: 'cl1',
      type: 'Mock HR Interview',
      fluencyScore: 86,
      grammarScore: 82,
      vocabularyScore: 88,
      confidenceScore: 85,
      date: '2026-09-25T18:30:00Z'
    }
  ]
};

export const LEARN_MODULES = [
  {
    id: 'dbms_joins',
    category: 'DBMS',
    title: 'SQL Joins, Indexing & Subqueries',
    duration: '45 mins',
    level: 'Medium',
    videoUrl: 'https://www.youtube.com/embed/9yeOJ0ZMUxy', // Demonstration video container
    videoThumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    summary: 'Master INNER, LEFT, RIGHT, and FULL OUTER joins alongside B-Tree indexing strategies used in relational database placement evaluations.',
    notes: [
      'INNER JOIN returns records that have matching values in both tables.',
      'LEFT JOIN returns all records from the left table, and matched records from the right table.',
      'B-Tree Indexes reduce search time from O(N) to O(log N) for large tables.',
      'Correlated subqueries evaluate once for each row processed by the outer query statement.'
    ],
    interactiveSnippet: `SELECT e.employee_id, e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
WHERE e.salary > 75000;`
  },
  {
    id: 'dsa_trees',
    category: 'Data Structures',
    title: 'Binary Trees & BST Traversals',
    duration: '50 mins',
    level: 'Medium',
    videoUrl: 'https://www.youtube.com/embed/fAAZixBzVSc',
    videoThumbnail: 'https://images.unsplash.com/photo-1516116211223-48a12725222e?auto=format&fit=crop&w=800&q=80',
    summary: 'Learn Inorder, Preorder, Postorder traversals, Level-order BFS, and Binary Search Tree insertion and deletion algorithms.',
    notes: [
      'Inorder traversal of BST yields sorted elements in ascending order.',
      'Preorder traversal (Root, Left, Right) is ideal for copying a tree structure.',
      'Height of a balanced BST is O(log N), guaranteeing fast search operations.'
    ],
    interactiveSnippet: `class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}`
  },
  {
    id: 'aptitude_time_work',
    category: 'Aptitude',
    title: 'Time, Work & Pipes Efficiency',
    duration: '35 mins',
    level: 'Easy',
    videoUrl: 'https://www.youtube.com/embed/6e409xJ334',
    videoThumbnail: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
    summary: 'Essential placement aptitude shortcuts for calculating individual vs joint work rates and pipe inlet/outlet capacities.',
    notes: [
      'If A can do a job in X days, A\'s 1-day work = 1/X.',
      'If A and B work together, combined 1-day work = (1/X + 1/Y).',
      'Total days to complete job = (X * Y) / (X + Y).'
    ],
    interactiveSnippet: `// Quick Formula Demonstration:
const daysA = 10, daysB = 15;
const combinedDays = (daysA * daysB) / (daysA + daysB);
console.log("Combined Days:", combinedDays); // 6 days`
  },
  {
    id: 'prog_python_oop',
    category: 'Programming',
    title: 'Python Object-Oriented Programming',
    duration: '40 mins',
    level: 'Medium',
    videoUrl: 'https://www.youtube.com/embed/JeznW_7DlB0',
    videoThumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    summary: 'Inheritance, Polymorphism, Encapsulation, Abstract Base Classes, and Dunder methods (__init__, __str__, __repr__).',
    notes: [
      'Encapsulation hides internal implementation using single leading or double leading underscores.',
      'Polymorphism enables methods to have identical names across different subclass implementations.'
    ],
    interactiveSnippet: `class PlacementCandidate:
    def __init__(self, name, target_company):
        self.name = name
        self.target_company = target_company
        
    def announce(self):
        return f"{self.name} is preparing for {self.target_company}!"`
  },
  {
    id: 'comm_prep_speaking',
    category: 'Communication Skills',
    title: 'The PREP Framework for Placement Interviews',
    duration: '30 mins',
    level: 'Easy',
    videoUrl: 'https://www.youtube.com/embed/comm12345',
    videoThumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    summary: 'Structuring interview responses with Point, Reason, Example, and Point to deliver concise, compelling answers.',
    notes: [
      'Point: State your primary takeaway clearly in the first 5 seconds.',
      'Reason: Provide the logical justification or core principle.',
      'Example: Share a concrete 30-second story or technical scenario.',
      'Point: Reiterate your main conclusion.'
    ],
    interactiveSnippet: `Sample Response:
Point: "I specialize in backend optimization using Node.js."
Reason: "Because asynchronous non-blocking I/O scales gracefully."
Example: "In my college project, I reduced endpoint latency by 40% using Redis caching."
Point: "That is why I am eager to contribute to your cloud team."`
  },
  {
    id: 'hr_interview_prep',
    category: 'Interview Preparation',
    title: 'Cracking HR & Behavioral Placement Rounds',
    duration: '45 mins',
    level: 'Advanced',
    videoUrl: 'https://www.youtube.com/embed/hr998877',
    videoThumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
    summary: 'Mastering "Tell Me About Yourself", salary expectations, handling weakness questions, and company research.',
    notes: [
      'Use the Past-Present-Future structure for "Tell Me About Yourself".',
      'When stating a weakness, mention the active steps you are taking to overcome it.'
    ],
    interactiveSnippet: `Key Checklist:
1. Past: Computer Science Academic Background
2. Present: Mastery of DSA, Web Technologies & Communication
3. Future: Excited to build scalable systems at your company`
  }
];

export const PRACTICE_QUESTIONS = [
  {
    id: 'pq1',
    category: 'DBMS',
    type: 'MCQ',
    title: 'SQL Join Types',
    question: 'Which SQL Join clause returns all records from the left table even if there are no matching records in the right table?',
    options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
    correctIndex: 1,
    difficulty: 'Medium',
    explanation: 'LEFT JOIN returns all rows from the left table with matching rows from the right table (or NULL if no match exists).'
  },
  {
    id: 'pq2',
    category: 'Programming',
    type: 'Coding Problem',
    title: 'Reverse a Linked List',
    question: 'Given the head of a singly linked list, reverse the list in O(N) time and O(1) auxiliary space.',
    initialCode: `function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr !== null) {\n    let nextTemp = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = nextTemp;\n  }\n  return prev;\n}`,
    difficulty: 'Hard',
    explanation: 'Using three pointers (prev, curr, next) allows reversing pointers in-place in a single pass.'
  },
  {
    id: 'pq3',
    category: 'Aptitude',
    type: 'Aptitude Questions',
    title: 'Speed & Distance',
    question: 'A train 150 meters long passes a telegraph post in 12 seconds. What is the speed of the train in km/h?',
    options: ['45 km/h', '50 km/h', '60 km/h', '72 km/h'],
    correctIndex: 0,
    difficulty: 'Easy',
    explanation: 'Speed = Distance / Time = 150m / 12s = 12.5 m/s. Convert to km/h: 12.5 * (18 / 5) = 45 km/h.'
  },
  {
    id: 'pq4',
    category: 'Interview Questions',
    type: 'Interview Questions',
    title: 'Microservices vs Monolith',
    question: 'In a campus recruitment technical interview, how would you justify choosing Microservices over a Monolithic architecture?',
    options: [
      'Microservices are always simpler to deploy than monoliths.',
      'Independent scalability, fault isolation, and technology flexibility for team sub-domains.',
      'Microservices require zero database configuration.',
      'Monoliths cannot be written in Python.'
    ],
    correctIndex: 1,
    difficulty: 'Medium',
    explanation: 'Microservices allow independent deployment cycles and fault isolation, though they add distributed network complexity.'
  }
];

export const COMMUNICATION_SCENARIOS = [
  {
    id: 'cs1',
    title: 'Mock HR Interview: Tell Me About Yourself',
    section: 'Mock HR Interview',
    prompt: 'Introduce yourself to the HR panel in 60 seconds highlighting your technical skills and academic background.',
    tips: ['Keep duration between 45-60 seconds', 'Maintain confident pitch & eye contact', 'Structure: Past -> Present -> Future']
  },
  {
    id: 'cs2',
    title: 'Group Discussion: AI in Placements',
    section: 'Group Discussion',
    prompt: 'Present an opening statement on: "Will AI replace software engineering jobs or enhance developer productivity?"',
    tips: ['Start with a balanced definition', 'Use transitional phrases like "In my perspective..."', 'Avoid extreme statements']
  },
  {
    id: 'cs3',
    title: 'Vocabulary & Grammar: Corporate Acumen',
    section: 'Vocabulary Builder',
    prompt: 'Pronounce and construct a business sentence using the word "Synergy" and "Pivotal".',
    tips: ['Emphasize crisp enunciation', 'Ensure correct subject-verb agreement']
  }
];
