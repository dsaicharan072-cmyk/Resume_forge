module.exports = {
  technical: [
    {
      topic: 'Node.js Event Loop & Non-blocking I/O',
      question: 'Explain how Node.js handles asynchronous non-blocking I/O operations despite being single-threaded.',
      hint: 'Focus on libuv thread pool, event loop phases (timers, poll, check), and microtask queue vs macrotask queue.'
    },
    {
      topic: 'React Virtual DOM & Reconciliation',
      question: 'How does React Virtual DOM diffing algorithm work, and why are keys important in lists?',
      hint: 'Mention heuristic O(N) diffing algorithm, element type comparisons, and key-based reconciliation across renders.'
    },
    {
      topic: 'Docker Container Isolation',
      question: 'What kernel features enable Docker container isolation on Linux?',
      hint: 'Discuss Linux Namespaces for process/network isolation and Cgroups for resource limit constraints.'
    }
  ],
  behavioral: [
    {
      topic: 'Conflict Resolution',
      question: 'Describe a situation where you disagreed with a technical design decision. How did you resolve it?',
      hint: 'Use STAR method (Situation, Task, Action, Result). Highlight objective benchmark metrics and respectful communication.'
    },
    {
      topic: 'Handling Production Outages',
      question: 'Tell me about a time you managed a critical production outage or urgent bug fix.',
      hint: 'Detail root cause analysis (RCA), emergency mitigation steps, clear stakeholder communication, and blameless post-mortem.'
    }
  ],
  codingTopics: [
    'Sliding Window & Two Pointer Techniques',
    'Dynamic Programming & Knapsack Variants',
    'Graph Traversal (BFS / DFS & Topological Sort)',
    'Trie Data Structures for Prefix Auto-complete'
  ],
  systemDesignTopics: [
    'Designing a High-Scale Distributed Rate Limiter',
    'Designing a Real-Time Collaborative Document Editor (Operational Transformation / CRDTs)',
    'Database Sharding & Consistent Hashing for Distributed Caches'
  ]
};
