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
    'Quantitative: Time & Work'
  ],
  difficultyLevelsMastered: {
    Easy: 92,
    Medium: 78,
    Hard: 58
  },
  weakAreas: ['SQL Joins & Indexing', 'Dynamic Programming', 'Grammar: Complex Prepositions'],
  strongAreas: ['Binary Trees', 'Time & Work Problems', 'Python OOP', 'Hash Tables'],
  frequentlyIncorrectConcepts: [
    'Left Outer Join vs Subqueries',
    'Knapsack Space Optimization'
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
  communicationLogs: [],
  leetCodeSolvedCases: ['lc_1', 'lc_206', 'lc_175']
};

export const LEETCODE_STUDY_CASES = [
  {
    id: 'lc_1',
    title: '1. Two Sum',
    difficulty: 'Easy',
    status: 'Completed', // Completed LeetCode Problem
    tags: ['Array', 'Hash Table'],
    learnedTopicRef: 'Python OOP & Classes',
    acceptance: '52.4%',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    solutionSnippet: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) return [map.get(diff), i];
        map.set(nums[i], i);
    }
    return [];
}`
  },
  {
    id: 'lc_206',
    title: '206. Reverse Linked List',
    difficulty: 'Easy',
    status: 'Completed', // Completed LeetCode Problem
    tags: ['Linked List', 'Recursion'],
    learnedTopicRef: 'Binary Search Trees',
    acceptance: '75.8%',
    description: 'Given the head of a singly linked list, reverse the list and return the reversed list.',
    solutionSnippet: `function reverseList(head) {
    let prev = null, curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
  },
  {
    id: 'lc_175',
    title: '175. Combine Two Tables (SQL)',
    difficulty: 'Easy',
    status: 'Completed', // Completed LeetCode Problem
    tags: ['Database', 'SQL Joins'],
    learnedTopicRef: 'DBMS: SQL Basics',
    acceptance: '76.1%',
    description: 'Write a solution to report the first name, last name, city, and state of each person in the Person table using LEFT JOIN.',
    solutionSnippet: `SELECT p.firstName, p.lastName, a.city, a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId;`
  },
  {
    id: 'lc_98',
    title: '98. Validate Binary Search Tree',
    difficulty: 'Medium',
    status: 'Unsolved', // NOT DONE in LeetCode -> Helps to Learn
    tags: ['Tree', 'Depth-First Search', 'BST'],
    learnedTopicRef: 'Binary Search Trees',
    acceptance: '32.9%',
    description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    recommendationReason: 'Not completed on LeetCode. Review BST traversal in Learn module before taking tests!',
    solutionSnippet: `function isValidBST(root, min = null, max = null) {
    if (!root) return true;
    if ((min !== null && root.val <= min) || (max !== null && root.val >= max)) return false;
    return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}`
  },
  {
    id: 'lc_322',
    title: '322. Coin Change (DP)',
    difficulty: 'Medium',
    status: 'Unsolved', // NOT DONE in LeetCode -> Helps to Learn
    tags: ['Dynamic Programming', 'Breadth-First Search'],
    learnedTopicRef: 'SQL Joins, Indexing & Subqueries',
    acceptance: '44.1%',
    description: 'Return the fewest number of coins that you need to make up a given amount using DP state transitions.',
    recommendationReason: 'Not completed on LeetCode. Study Dynamic Programming memoization tables to learn!',
    solutionSnippet: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`
  }
];

export const LEARN_MODULES = [
  {
    id: 'dbms_joins',
    category: 'DBMS',
    title: 'SQL Joins, Indexing & Subqueries',
    duration: '45 mins',
    level: 'Medium',
    videoUrl: 'https://www.youtube.com/embed/9yeOJ0ZMUxy',
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
    title: 'Binary Search Trees',
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
    title: 'Quantitative: Time & Work',
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
    title: 'Python OOP & Classes',
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
    category: 'Data Structures',
    type: 'MCQ',
    title: 'BST Inorder Traversal',
    question: 'In a Binary Search Tree (BST), which traversal algorithm visits nodes in strictly ascending sorted order?',
    options: ['Preorder Traversal', 'Inorder Traversal', 'Postorder Traversal', 'Level-order BFS'],
    correctIndex: 1,
    difficulty: 'Medium',
    explanation: 'Inorder Traversal (Left, Root, Right) processes nodes in ascending order in a Binary Search Tree.'
  }
];

export const COMMUNICATION_SCENARIOS = [];
