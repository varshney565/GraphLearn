"use strict";

const sourceRoot =
  "https://github.com/varshney565/Graph/tree/main/RajneeshSirGraph";

const lessons = [
  {
    id: "graph-basics",
    title: "What A Graph Is",
    shortTitle: "Graph Basics",
    source: "Lecture1.cpp",
    stage: "Start here",
    summary:
      "A graph is a set of things and connections between those things. In code, the things are vertices, the connections are edges, and the question decides whether direction or weight matters.",
    mentalModel:
      "Think of a graph as a city map. Intersections are vertices, roads are edges, and road length is the weight. If a road is one-way, the graph is directed.",
    keyIdeas: [
      "Vertex: one item in the graph.",
      "Edge: a relationship between two vertices.",
      "Weight: a number stored on an edge, often cost, distance, time, or effort.",
      "Undirected edge: both endpoints can reach each other.",
      "Directed edge: the connection has an arrow."
    ],
    codeLabel: "Adjacency list with weights",
    code: `vector<vector<pair<int,int>>> graph(n);

void addEdge(int u, int v, int w) {
  graph[u].push_back({v, w});
  graph[v].push_back({u, w}); // skip this line for directed graphs
}`,
    checklist: [
      "Can I name the vertices?",
      "Are edges one-way or two-way?",
      "Do I need weights?",
      "Can one graph have multiple disconnected parts?"
    ],
    practice: ["lc200", "lc463", "lc684"],
    quiz: {
      question: "When should an edge be stored twice in an adjacency list?",
      options: [
        "When the graph is undirected.",
        "When the edge has a large weight.",
        "Only when the graph has a cycle."
      ],
      answer: 0,
      feedback:
        "For an undirected edge u-v, u must list v and v must list u because travel works both ways."
    }
  },
  {
    id: "adjacency-operations",
    title: "Build, Display, Remove",
    shortTitle: "Graph Storage",
    source: "Lecture1.cpp",
    stage: "Representation",
    summary:
      "Before solving graph problems, get comfortable changing the graph itself. Adding edges, printing neighbors, removing an edge, and removing a vertex teach how adjacency lists really behave.",
    mentalModel:
      "Each vertex owns a small contact list. Adding an edge adds a contact. Removing a vertex means asking each neighbor to delete that contact too.",
    keyIdeas: [
      "Displaying a graph is just looping over every vertex and every neighbor.",
      "Removing one undirected edge must update two neighbor lists.",
      "Removing a vertex is repeated edge removal.",
      "The total display cost is proportional to the number of stored edges."
    ],
    codeLabel: "Display the graph",
    code: `for (int u = 0; u < n; u++) {
  cout << u << " -> ";
  for (auto [v, w] : graph[u]) {
    cout << "(" << v << ", " << w << ") ";
  }
  cout << "\\n";
}`,
    checklist: [
      "If I remove u-v, did I also remove v-u?",
      "Am I looping over neighbors, not all vertices, when possible?",
      "Does my display show enough information to debug the graph?"
    ],
    practice: ["lc684", "lc990", "lc1061"],
    quiz: {
      question: "Why is an adjacency list usually better than a matrix for sparse graphs?",
      options: [
        "It stores only existing edges.",
        "It automatically sorts neighbors.",
        "It makes every algorithm constant time."
      ],
      answer: 0,
      feedback:
        "Sparse graphs have far fewer edges than V*V, so storing only real neighbors saves memory and scanning time."
    }
  },
  {
    id: "dfs-backtracking",
    title: "DFS And Backtracking",
    shortTitle: "DFS Paths",
    source: "Lecture1.cpp",
    stage: "Traversal",
    summary:
      "Depth-first search explores one road as far as possible before trying the next road. Backtracking lets one path finish, then restores the state so another path can be tried.",
    mentalModel:
      "DFS is like walking through a maze with chalk. Mark a room before entering. If a path finishes, erase temporary chalk when the question needs all possible paths.",
    keyIdeas: [
      "Use a visited array to avoid infinite loops.",
      "For hasPath, stop as soon as the destination is found.",
      "For all paths, unmark during backtracking.",
      "Heaviest path and Hamiltonian path are path-search questions, not shortest path questions."
    ],
    codeLabel: "Find whether a path exists",
    code: `bool hasPath(int src, int dest) {
  if (src == dest) return true;
  visited[src] = true;

  for (auto [nbr, wt] : graph[src]) {
    if (!visited[nbr] && hasPath(nbr, dest)) {
      return true;
    }
  }
  return false;
}`,
    checklist: [
      "What is my base case?",
      "Should I stop at the first answer or collect every answer?",
      "Should visited remain marked, or should I unmark while returning?"
    ],
    practice: ["lc797", "lc1129", "lc1192"],
    quiz: {
      question: "Why do all-path DFS solutions often unmark visited while returning?",
      options: [
        "So the same vertex can appear in a different candidate path.",
        "So the graph becomes directed.",
        "So the recursion becomes iterative."
      ],
      answer: 0,
      feedback:
        "A vertex cannot repeat inside one path, but it may be valid inside a different path."
    }
  },
  {
    id: "grid-graphs",
    title: "Grids Are Graphs Too",
    shortTitle: "Grid DFS",
    source: "Lecture2.cpp, Lecture3.cpp, Lecture6.cpp",
    stage: "Matrix patterns",
    summary:
      "A cell in a matrix can be treated as a vertex. The four neighboring cells are edges. That one idea explains islands, perimeter, surrounded regions, enclaves, and sub-islands.",
    mentalModel:
      "A grid problem hides the graph. Instead of graph[u], you compute neighbors by moving up, down, left, and right.",
    keyIdeas: [
      "A land cell can be a graph vertex.",
      "The direction array replaces an adjacency list.",
      "Marking a cell as water is a common visited trick.",
      "Boundary DFS is useful when the outside region matters."
    ],
    codeLabel: "Four-direction traversal",
    code: `int dir[4][2] = {{1,0}, {-1,0}, {0,1}, {0,-1}};

for (auto [dx, dy] : dir) {
  int r = x + dx;
  int c = y + dy;
  if (inside(r, c) && grid[r][c] == 1) {
    dfs(r, c);
  }
}`,
    checklist: [
      "What counts as a valid cell?",
      "Do diagonal cells connect or only four directions?",
      "Am I allowed to modify the grid as my visited array?"
    ],
    practice: ["lc200", "lc695", "lc463", "lc130", "lc694", "lc1020", "lc1905"],
    quiz: {
      question: "In island problems, what usually plays the role of graph neighbors?",
      options: [
        "The valid cells reached by direction moves.",
        "Every cell in the same row.",
        "Only cells on the boundary."
      ],
      answer: 0,
      feedback:
        "The direction array generates the neighbors for each cell, so the matrix becomes a graph."
    }
  },
  {
    id: "bfs-levels",
    title: "BFS, Levels, And Minutes",
    shortTitle: "BFS Levels",
    source: "Lecture3.cpp",
    stage: "Shortest unweighted",
    summary:
      "Breadth-first search expands evenly. That makes it perfect when every move costs the same and the answer is the minimum number of moves, levels, or minutes.",
    mentalModel:
      "BFS is a wave. Everything at distance 1 is handled before distance 2, so the first time you reach a node is the shortest unweighted distance.",
    keyIdeas: [
      "A queue stores the current frontier.",
      "Processing by queue size gives level numbers.",
      "Mark on push when you do not need cycle detection later.",
      "Rotting oranges, binary matrix shortest path, and 01 matrix are BFS patterns."
    ],
    codeLabel: "Level order BFS",
    code: `queue<int> q;
q.push(src);
visited[src] = true;

for (int level = 0; !q.empty(); level++) {
  int size = q.size();
  while (size--) {
    int u = q.front();
    q.pop();
    for (int v : graph[u]) {
      if (!visited[v]) {
        visited[v] = true;
        q.push(v);
      }
    }
  }
}`,
    checklist: [
      "Do all moves have equal cost?",
      "Do I need the level number as the answer?",
      "Should I start from one source or many sources?"
    ],
    practice: ["lc994", "lc1091", "lc542", "lc815"],
    quiz: {
      question: "Why does BFS give shortest distance in an unweighted graph?",
      options: [
        "It visits nodes in increasing number of edges from the source.",
        "It tries heavier edges first.",
        "It visits vertices alphabetically."
      ],
      answer: 0,
      feedback:
        "The queue expands one level at a time, so fewer-edge paths are completed first."
    }
  },
  {
    id: "directed-order",
    title: "Directed Graphs And Order",
    shortTitle: "Topo Sort",
    source: "Lecture4.cpp, Lecture5.cpp",
    stage: "DAG thinking",
    summary:
      "Some graphs describe prerequisites. Topological sort gives a valid order only when the directed graph has no cycle.",
    mentalModel:
      "A course schedule is a graph of dependencies. A task with indegree 0 has no unfinished prerequisite and can be taken now.",
    keyIdeas: [
      "Directed cycle detection needs states: unvisited, visiting, done.",
      "DFS topological sort appends a node after its children finish.",
      "Kahn's algorithm repeatedly removes indegree-0 nodes.",
      "If Kahn cannot remove every node, a cycle blocked the schedule."
    ],
    codeLabel: "Kahn's algorithm",
    code: `queue<int> q;
for (int i = 0; i < n; i++) {
  if (indegree[i] == 0) q.push(i);
}

while (!q.empty()) {
  int u = q.front();
  q.pop();
  order.push_back(u);
  for (int v : graph[u]) {
    if (--indegree[v] == 0) q.push(v);
  }
}`,
    checklist: [
      "Is this graph directed?",
      "Does the problem ask for an order or just whether an order exists?",
      "What should happen if a cycle exists?"
    ],
    practice: ["lc207", "lc210", "lc1136"],
    quiz: {
      question: "What does indegree mean in prerequisite problems?",
      options: [
        "How many prerequisites are still pointing into a task.",
        "How many outgoing edges a task has.",
        "The total number of connected components."
      ],
      answer: 0,
      feedback:
        "Indegree counts incoming prerequisite edges. When it becomes 0, that item is available."
    }
  },
  {
    id: "dsu",
    title: "Disjoint Set Union",
    shortTitle: "DSU",
    source: "Lecture4.cpp, Lecture5.cpp, Lecture6.cpp, Lecture8.cpp",
    stage: "Components",
    summary:
      "DSU keeps track of which vertices currently belong to the same group. It shines when edges arrive one by one and the question is about components or cycles.",
    mentalModel:
      "Every group has a representative. find asks for the representative. union merges two groups if their representatives differ.",
    keyIdeas: [
      "find with path compression makes future lookups faster.",
      "union returns false when an edge connects vertices already in the same component.",
      "That false result often means a cycle was detected.",
      "DSU can track extra component data like size or infected count."
    ],
    codeLabel: "DSU core",
    code: `int find(int x) {
  if (parent[x] == x) return x;
  return parent[x] = find(parent[x]);
}

bool unite(int a, int b) {
  int pa = find(a);
  int pb = find(b);
  if (pa == pb) return false;
  parent[pb] = pa;
  return true;
}`,
    checklist: [
      "Are edges being added over time?",
      "Do I need to know whether two nodes are already connected?",
      "Should each component store size, rank, or another value?"
    ],
    practice: ["lc684", "lc1061", "lc839", "lc305", "lc990", "lc959"],
    quiz: {
      question: "What does union returning false usually tell us?",
      options: [
        "The two vertices were already in the same component.",
        "The graph has no edges.",
        "The edge weight is negative."
      ],
      answer: 0,
      feedback:
        "If both vertices already have the same representative, adding that edge does not merge anything."
    }
  },
  {
    id: "mst",
    title: "Minimum Spanning Tree",
    shortTitle: "MST",
    source: "Lecture7.cpp, Lecture8.cpp",
    stage: "Connect cheaply",
    summary:
      "A minimum spanning tree connects every vertex with the smallest possible total weight and without cycles.",
    mentalModel:
      "Imagine connecting towns with cables. You want all towns connected, but any cycle is extra cable you do not need.",
    keyIdeas: [
      "Kruskal sorts all edges by weight and uses DSU to skip cycle-forming edges.",
      "Prim grows from a node using the cheapest edge leaving the current tree.",
      "Use Kruskal when edges are easy to list or the graph is sparse.",
      "Use Prim when the graph is already in adjacency-list form or dense."
    ],
    codeLabel: "Kruskal in one pass",
    code: `sort(edges.begin(), edges.end(), byWeight);

for (auto [u, v, w] : edges) {
  if (dsu.unite(u, v)) {
    mst.push_back({u, v, w});
    total += w;
  }
}`,
    checklist: [
      "Do I need to connect all nodes?",
      "Would a cycle ever help the answer?",
      "Are all candidate edges known?"
    ],
    practice: ["lc1168", "lc1584", "mr-president"],
    quiz: {
      question: "Why does Kruskal skip an edge whose endpoints are already connected?",
      options: [
        "It would create a cycle.",
        "It must be the heaviest edge in the graph.",
        "It would make the graph directed."
      ],
      answer: 0,
      feedback:
        "If two endpoints are already connected inside the growing tree, another edge between them creates a cycle."
    }
  },
  {
    id: "shortest-paths",
    title: "Weighted Shortest Paths",
    shortTitle: "Shortest Paths",
    source: "Lecture8.cpp, Lecture9.cpp, Lecture10.cpp, Lecture11.cpp, Lecture12LastClass.cpp",
    stage: "Weights",
    summary:
      "When edge cost matters, BFS is no longer enough. Dijkstra handles non-negative weights, Bellman-Ford handles limited relaxations and negative edges, and maze variants combine graph search with movement rules.",
    mentalModel:
      "Dijkstra always finalizes the closest unfinished vertex. Relaxing an edge means asking whether going through this vertex improves a known distance.",
    keyIdeas: [
      "Use BFS only when every move has equal cost.",
      "Use Dijkstra when weights are non-negative.",
      "Use Bellman-Ford style relaxation when stops or negative edges matter.",
      "For rolling maze problems, each move may travel until a wall, so neighbors are not just adjacent cells."
    ],
    codeLabel: "Dijkstra relaxation",
    code: `set<pair<int,int>> pq; // {distance, node}
dist[src] = 0;
pq.insert({0, src});

while (!pq.empty()) {
  auto [d, u] = *pq.begin();
  pq.erase(pq.begin());
  if (d != dist[u]) continue;

  for (auto [v, w] : graph[u]) {
    if (dist[u] + w < dist[v]) {
      dist[v] = dist[u] + w;
      pq.insert({dist[v], v});
    }
  }
}`,
    checklist: [
      "Are all edge weights equal?",
      "Can any edge be negative?",
      "Does the problem limit the number of stops or moves?"
    ],
    practice: ["lc743", "lc787", "lc505", "lc499", "lc1631"],
    quiz: {
      question: "What does edge relaxation mean?",
      options: [
        "Trying to improve a neighbor's distance through the current node.",
        "Deleting the most expensive edge.",
        "Changing an undirected graph into a directed graph."
      ],
      answer: 0,
      feedback:
        "Relaxation is the core update: if dist[u] + weight is smaller than dist[v], replace dist[v]."
    }
  },
  {
    id: "advanced-map",
    title: "Advanced Pattern Map",
    shortTitle: "Advanced",
    source: "Lecture11.cpp, Lecture12LastClass.cpp, PremiumQuestions",
    stage: "Next steps",
    summary:
      "Once traversal, DSU, topological sort, MST, and shortest paths feel natural, advanced graph questions become pattern matching plus careful state design.",
    mentalModel:
      "Most advanced graph problems still ask one of a few questions: who is connected, what order is valid, what route is cheapest, or which edge is critical.",
    keyIdeas: [
      "Kosaraju finds strongly connected components in directed graphs.",
      "Bridge-finding locates edges whose removal increases components.",
      "Multi-source shortest paths start the queue or priority set with many sources.",
      "Premium problems often combine two known ideas rather than inventing a new one."
    ],
    codeLabel: "Bridge intuition",
    code: `// A tree edge u-v is a bridge when the child subtree
// cannot reach u or any ancestor of u by a back edge.
if (low[v] > disc[u]) {
  bridges.push_back({u, v});
}`,
    checklist: [
      "Can I reduce this to components, order, MST, or shortest path?",
      "Does removing an edge or vertex change connectivity?",
      "Can I solve from many sources at once?"
    ],
    practice: ["lc1192", "mother-vertex", "lc1136", "malware"],
    quiz: {
      question: "What is a bridge in an undirected graph?",
      options: [
        "An edge whose removal increases the number of connected components.",
        "Any edge with the smallest weight.",
        "A directed edge with indegree 0."
      ],
      answer: 0,
      feedback:
        "A bridge is structurally important. Remove it, and at least one part of the graph becomes disconnected."
    }
  }
];

const lessonDeepDives = {
  "graph-basics": {
    walkthrough: [
      "Read any graph question by first translating nouns into vertices and relationships into edges. In Number of Islands, cells are vertices and neighboring land cells are edges. In Course Schedule, courses are vertices and prerequisites are directed edges.",
      "After that, decide the graph type: undirected or directed, weighted or unweighted, connected or possibly disconnected. This one decision usually tells you whether DFS, BFS, DSU, topological sort, MST, or shortest path is the correct family.",
      "The adjacency list is the most common competitive-programming representation because it lets each vertex store only the neighbors it actually has."
    ],
    dryRun:
      "For edge 0-1 with weight 10 in an undirected graph, graph[0] stores (1,10) and graph[1] stores (0,10). If it is directed 0->1, only graph[0] stores 1.",
    mistakes: [
      "Storing an undirected edge only once.",
      "Using a matrix when the graph is sparse and an adjacency list is simpler.",
      "Forgetting that disconnected graphs need a loop over every vertex, not only one DFS from 0."
    ]
  },
  "adjacency-operations": {
    walkthrough: [
      "Displaying the graph is not just for output. It is the fastest way to debug whether edges were inserted in the right direction and whether weights are attached to the correct neighbor.",
      "Remove edge means delete the neighbor entry from both sides in an undirected graph. Remove vertex means repeatedly remove every edge touching that vertex.",
      "When the graph stores pairs, do not compare the full pair unless the weight matters. Usually removal finds by neighbor vertex."
    ],
    dryRun:
      "If vertex 2 has neighbors (1,10), (3,40), (7,2), removing edge 2-7 means erase 7 from graph[2] and erase 2 from graph[7].",
    mistakes: [
      "Deleting from one side only.",
      "Skipping bounds checks while manually searching neighbor lists.",
      "Assuming display order is sorted when insertion order controls it."
    ]
  },
  "dfs-backtracking": {
    walkthrough: [
      "DFS answers reachability by going deep. Mark the current node before exploring neighbors so a cycle cannot trap recursion forever.",
      "For one answer, return immediately when the destination is found. For all answers, keep exploring every unvisited neighbor and collect the path at the base case.",
      "Backtracking is the part that restores state. If a vertex was marked only for the current path, unmark it before returning so another path can reuse it."
    ],
    dryRun:
      "From 0, DFS may try 1, then 2, then 7, then 8. When 8 has no new neighbor, the call returns and DFS tries the next pending neighbor from the previous node.",
    mistakes: [
      "Not marking visited before recursive calls.",
      "Unmarking visited in a normal connected-component DFS where nodes should stay done.",
      "Using DFS for shortest path in an unweighted graph when BFS is the safer tool."
    ]
  },
  "grid-graphs": {
    walkthrough: [
      "A grid graph usually avoids building an adjacency list. The neighbors are computed by direction arrays at runtime.",
      "DFS/BFS starts from a valid cell, marks it visited, and expands to valid neighboring cells. The marking can be a separate visited matrix or an in-place grid change.",
      "Boundary-based questions often flip the thinking: first mark everything connected to the boundary, then process what remains."
    ],
    dryRun:
      "For a land cell (2,3), four-direction neighbors are (3,3), (1,3), (2,4), and (2,2). Only inside-grid land cells continue the DFS.",
    mistakes: [
      "Mixing up row and column bounds.",
      "Using four directions when the problem allows eight directions, or the reverse.",
      "Counting an island before marking it, which can double-count cells."
    ]
  },
  "bfs-levels": {
    walkthrough: [
      "BFS is the natural choice when each move costs exactly one. The queue processes all nodes at distance d before any node at distance d+1.",
      "If the answer is minutes, moves, semesters, or buses, think in levels. Store the queue size at the start of each level and process exactly that many entries.",
      "For multi-source BFS, push every starting source first. This makes all sources distance 0 and lets the wave expand from all of them together."
    ],
    dryRun:
      "If queue starts with all rotten oranges, level 1 rots every fresh orange adjacent to any rotten one. Level 2 rots the next ring.",
    mistakes: [
      "Marking visited only when popped, which can push the same cell many times.",
      "Incrementing level after every node instead of after every queue layer.",
      "Using BFS on weighted edges where one edge can cost more than another."
    ]
  },
  "directed-order": {
    walkthrough: [
      "A directed graph can encode dependency: u -> v means u must happen before v, or v depends on u depending on how you build it. Be consistent.",
      "Kahn's algorithm starts with all indegree-0 nodes. Removing a node means its outgoing edges no longer block children, so their indegree decreases.",
      "If the final order has fewer than n nodes, some nodes were locked inside a cycle and no valid ordering exists."
    ],
    dryRun:
      "If 4 points to 0 and 1, and 4 has indegree 0, process 4 first. That decreases indegree of 0 and 1 by one.",
    mistakes: [
      "Building prerequisite edges backward and then interpreting the order incorrectly.",
      "Forgetting to detect cycles by comparing order size to n.",
      "Using undirected visited logic on a directed cycle problem."
    ]
  },
  dsu: {
    walkthrough: [
      "DSU does not explore the graph like DFS. It maintains groups while edges are added.",
      "find(x) returns the representative of x's group. union(a,b) merges two groups only if their representatives differ.",
      "When union fails, a and b were already connected. In an undirected graph edge stream, that is exactly the cycle signal."
    ],
    dryRun:
      "Edges 1-2 and 2-3 merge {1,2,3}. If edge 1-3 arrives later, both endpoints already have the same representative, so the edge is redundant.",
    mistakes: [
      "Forgetting path compression, which makes repeated find calls slower.",
      "Not initializing parent[i] = i.",
      "Using DSU for directed reachability, where it usually loses direction information."
    ]
  },
  mst: {
    walkthrough: [
      "MST problems ask for the cheapest way to connect everything. Cycles are wasteful because one edge in a cycle can be removed while the graph stays connected.",
      "Kruskal sees all candidate edges, sorts by weight, and accepts an edge only when DSU says it connects two different components.",
      "Prim starts from a node and repeatedly chooses the cheapest edge leaving the growing connected set."
    ],
    dryRun:
      "If edges of weight 2 connect new components, Kruskal takes them first. A later weight-4 edge is skipped if its endpoints are already connected.",
    mistakes: [
      "Stopping before selecting n-1 edges.",
      "Not handling disconnected graphs.",
      "Using shortest path logic when the task asks to connect all nodes cheaply."
    ]
  },
  "shortest-paths": {
    walkthrough: [
      "Weighted shortest path questions are about distance values, not just visited/unvisited. Relaxation is the central move: can current distance plus edge weight improve the neighbor?",
      "Dijkstra works when all weights are non-negative. The priority set always picks the current smallest unfinished distance.",
      "Bellman-Ford style loops are useful when the question limits stops or when negative edges appear. Each round represents one more edge allowed."
    ],
    dryRun:
      "If dist[2] is 20 and edge 2-7 has weight 2, then candidate distance for 7 is 22. If dist[7] was infinity, update it to 22.",
    mistakes: [
      "Using normal BFS on non-equal weights.",
      "Marking a node final too early when using the wrong data structure.",
      "For maze rolling problems, treating one step as one cell instead of rolling until a wall."
    ]
  },
  "advanced-map": {
    walkthrough: [
      "Advanced graph problems are usually combinations of simpler patterns. First classify the hidden ask: component, order, shortest route, cheap connection, or critical edge.",
      "Kosaraju uses finish order and a reversed graph to group strongly connected components.",
      "Bridge logic tracks discovery time and low-link values. A child subtree that cannot reach an ancestor makes the parent-child edge critical."
    ],
    dryRun:
      "If DFS reaches child v from u and low[v] stays greater than disc[u], then v's subtree has no back edge to u or above. Edge u-v is a bridge.",
    mistakes: [
      "Trying to memorize every hard problem separately.",
      "Not carrying enough state in BFS or Dijkstra.",
      "Using an undirected bridge formula directly on directed SCC problems."
    ]
  }
};

const practiceProblems = {
  lc200: {
    name: "LeetCode 200 - Number of Islands",
    idea: "Count connected land components with DFS or BFS.",
    level: "easy"
  },
  lc463: {
    name: "LeetCode 463 - Island Perimeter",
    idea: "For each land cell, count sides that touch water or boundary.",
    level: "easy"
  },
  lc684: {
    name: "LeetCode 684 - Redundant Connection",
    idea: "Use DSU; the first union failure reveals the cycle edge.",
    level: "medium"
  },
  lc990: {
    name: "LeetCode 990 - Satisfiability of Equality Equations",
    idea: "Union equal variables first, then test inequalities.",
    level: "medium"
  },
  lc1061: {
    name: "LeetCode 1061 - Smallest Equivalent String",
    idea: "Union equivalent letters and keep the smallest representative.",
    level: "medium"
  },
  lc797: {
    name: "LeetCode 797 - All Paths From Source to Target",
    idea: "Backtrack through every path in a DAG.",
    level: "medium"
  },
  lc1129: {
    name: "LeetCode 1129 - Alternating Color Paths",
    idea: "BFS with state that includes last edge color.",
    level: "medium"
  },
  lc1192: {
    name: "LeetCode 1192 - Critical Connections",
    idea: "Use discovery and low-link values to find bridges.",
    level: "hard"
  },
  lc695: {
    name: "LeetCode 695 - Max Area of Island",
    idea: "DFS each island and return the largest component size.",
    level: "medium"
  },
  lc130: {
    name: "LeetCode 130 - Surrounded Regions",
    idea: "Keep boundary-connected O cells, flip the rest.",
    level: "medium"
  },
  lc694: {
    name: "LeetCode 694 - Number of Distinct Islands",
    idea: "Record traversal shape signatures.",
    level: "medium"
  },
  lc1020: {
    name: "LeetCode 1020 - Number of Enclaves",
    idea: "Remove boundary-connected land first.",
    level: "medium"
  },
  lc1905: {
    name: "LeetCode 1905 - Count Sub Islands",
    idea: "DFS island in grid2 while validating against grid1.",
    level: "medium"
  },
  lc994: {
    name: "LeetCode 994 - Rotting Oranges",
    idea: "Multi-source BFS where each level is one minute.",
    level: "medium"
  },
  lc1091: {
    name: "LeetCode 1091 - Shortest Path in Binary Matrix",
    idea: "BFS on eight directions with equal move cost.",
    level: "medium"
  },
  lc542: {
    name: "LeetCode 542 - 01 Matrix",
    idea: "Multi-source BFS from all zero cells.",
    level: "medium"
  },
  lc815: {
    name: "LeetCode 815 - Bus Routes",
    idea: "BFS over routes and stops with visited route tracking.",
    level: "hard"
  },
  lc207: {
    name: "LeetCode 207 - Course Schedule",
    idea: "Detect whether every course can be removed by indegree 0.",
    level: "medium"
  },
  lc210: {
    name: "LeetCode 210 - Course Schedule II",
    idea: "Return the topological order if it exists.",
    level: "medium"
  },
  lc1136: {
    name: "LeetCode 1136 - Parallel Courses",
    idea: "Kahn levels represent semesters.",
    level: "medium"
  },
  lc839: {
    name: "LeetCode 839 - Similar String Groups",
    idea: "Union strings that differ in at most two positions.",
    level: "hard"
  },
  lc305: {
    name: "LeetCode 305 - Number of Islands II",
    idea: "Add land over time and update DSU component count.",
    level: "hard"
  },
  lc959: {
    name: "LeetCode 959 - Regions Cut By Slashes",
    idea: "Model boundaries with DSU and count failed unions.",
    level: "medium"
  },
  lc1168: {
    name: "LeetCode 1168 - Optimize Water Distribution",
    idea: "Add a virtual well node and solve MST.",
    level: "hard"
  },
  lc1584: {
    name: "LeetCode 1584 - Min Cost to Connect Points",
    idea: "Build weighted edges using Manhattan distance and run MST.",
    level: "medium"
  },
  "mr-president": {
    name: "HackerEarth - Mr. President",
    idea: "Build MST, then reduce expensive roads until under budget.",
    level: "hard"
  },
  lc743: {
    name: "LeetCode 743 - Network Delay Time",
    idea: "Dijkstra from the source and take the largest final distance.",
    level: "medium"
  },
  lc787: {
    name: "LeetCode 787 - Cheapest Flights Within K Stops",
    idea: "Bellman-Ford style relaxation for exactly bounded layers.",
    level: "medium"
  },
  lc505: {
    name: "LeetCode 505 - The Maze II",
    idea: "Dijkstra where each move rolls until a wall.",
    level: "medium"
  },
  lc499: {
    name: "LeetCode 499 - The Maze III",
    idea: "Dijkstra plus lexicographic tie-breaking.",
    level: "hard"
  },
  lc1631: {
    name: "LeetCode 1631 - Path With Minimum Effort",
    idea: "Use Dijkstra where path cost is the maximum edge effort so far.",
    level: "medium"
  },
  "mother-vertex": {
    name: "GFG - Mother Vertex",
    idea: "Find a candidate by DFS finish behavior, then verify reachability.",
    level: "medium"
  },
  malware: {
    name: "LeetCode 924 - Minimize Malware Spread",
    idea: "Track component size and infection count with DSU.",
    level: "hard"
  }
};

const practiceGuides = {
  lc200: {
    pattern: "Grid DFS or BFS component counting",
    steps: [
      "Loop over every cell.",
      "When you find land, count one island and flood-fill all connected land.",
      "During flood-fill, mark visited by changing land to water or using a visited matrix.",
      "Return the number of flood-fill starts."
    ],
    stuck: "If you are stuck, ask: what is one vertex? It is a land cell. What are its edges? Four-direction land neighbors.",
    code: "if grid[r][c] == '1': islands++, dfs(r,c)"
  },
  lc463: {
    pattern: "Grid edge contribution",
    steps: [
      "Visit every land cell.",
      "Each land cell starts with 4 sides.",
      "For every land neighbor, subtract one side.",
      "Add the remaining sides to the answer."
    ],
    stuck: "Do not try to draw the whole island. Count exposed sides cell by cell.",
    code: "if land: for 4 dirs, if outside or water: perimeter++"
  },
  lc684: {
    pattern: "DSU cycle detection",
    steps: [
      "Initialize every node as its own parent.",
      "Process edges in input order.",
      "If union succeeds, the edge connected two components.",
      "If union fails, both endpoints were already connected; return that edge."
    ],
    stuck: "The redundant edge is the first edge that tries to connect vertices already in the same component.",
    code: "for edge in edges: if !unite(u,v) return edge"
  },
  lc990: {
    pattern: "DSU with two passes",
    steps: [
      "Union all equations using == first.",
      "Then scan all != equations.",
      "If two unequal variables have the same parent, the equations contradict.",
      "Otherwise all constraints are satisfiable."
    ],
    stuck: "Equalities build groups. Inequalities only validate after the groups are fully built.",
    code: "union equals; then if find(a)==find(b) for a!=b return false"
  },
  lc1061: {
    pattern: "DSU with smallest representative",
    steps: [
      "Create 26 DSU nodes for letters.",
      "Union each pair from s1 and s2.",
      "When merging two groups, keep the lexicographically smaller root as parent.",
      "For each baseStr character, append its root character."
    ],
    stuck: "The DSU representative is not arbitrary here; it must be the smallest letter in the equivalence class.",
    code: "parent[max(rootA,rootB)] = min(rootA,rootB)"
  },
  lc797: {
    pattern: "DFS backtracking in a DAG",
    steps: [
      "Start path with source 0.",
      "DFS each outgoing neighbor.",
      "When node n-1 is reached, copy the current path into answers.",
      "Pop the node while returning so another path can reuse the prefix."
    ],
    stuck: "Because the graph is a DAG, you do not need complicated cycle handling; focus on path push and pop.",
    code: "path.push(u); if u==target save; for v dfs(v); path.pop()"
  },
  lc1129: {
    pattern: "BFS with state",
    steps: [
      "Build separate red and blue adjacency lists.",
      "Queue state should include node and last edge color.",
      "From a state, only take edges of the opposite color.",
      "Track distance per node per last color."
    ],
    stuck: "A node alone is not enough state. Reaching node 3 by red is different from reaching node 3 by blue.",
    code: "queue.push({0, RED}); queue.push({0, BLUE})"
  },
  lc1192: {
    pattern: "Tarjan bridge finding",
    steps: [
      "Run DFS with discovery time disc[u] and low[u].",
      "For a tree edge u-v, DFS into v first.",
      "After returning, update low[u] with low[v].",
      "If low[v] > disc[u], edge u-v is a bridge."
    ],
    stuck: "low[v] means the oldest ancestor v's subtree can reach without using the parent edge.",
    code: "if low[child] > disc[u]: bridges.push({u, child})"
  },
  lc695: {
    pattern: "Grid DFS area counting",
    steps: [
      "Loop over every cell.",
      "When land is found, DFS it and return the component size.",
      "Mark each visited land cell.",
      "Keep the maximum size across all DFS calls."
    ],
    stuck: "This is Number of Islands, but instead of count++, your DFS returns area.",
    code: "area = 1 + dfs(neighbor land cells)"
  },
  lc130: {
    pattern: "Boundary DFS",
    steps: [
      "Only O cells connected to the boundary survive.",
      "DFS/BFS from boundary O cells and mark them safe.",
      "Flip every unmarked O to X.",
      "Turn safe marks back into O."
    ],
    stuck: "Do not search for surrounded regions directly. Search for unsurrounded boundary-connected regions.",
    code: "mark boundary O as safe; flip remaining O"
  },
  lc694: {
    pattern: "Shape signature DFS",
    steps: [
      "DFS each island from its first cell.",
      "Record moves such as U, D, L, R while traversing.",
      "Record a backtrack marker too, so different shapes do not collide.",
      "Insert the signature into a set."
    ],
    stuck: "Absolute position does not matter. The traversal shape relative to the start matters.",
    code: "signature += dir; dfs(next); signature += backtrack"
  },
  lc1020: {
    pattern: "Boundary removal",
    steps: [
      "Any land connected to the boundary can walk off the grid.",
      "DFS/BFS all boundary land and mark it water or safe.",
      "Count the remaining land cells.",
      "Those remaining cells are enclaves."
    ],
    stuck: "Like Surrounded Regions, solve the outside-connected part first.",
    code: "remove boundary-connected land; count leftover land"
  },
  lc1905: {
    pattern: "DFS with validity flag",
    steps: [
      "DFS each island in grid2.",
      "During DFS, check whether every visited grid2 land cell is also land in grid1.",
      "Still finish the full DFS even if one cell is invalid.",
      "Count the island only if the validity flag stays true."
    ],
    stuck: "Do not return early on the first invalid cell; you must still mark the whole grid2 island visited.",
    code: "valid &= grid1[r][c] == 1 while flooding grid2 island"
  },
  lc994: {
    pattern: "Multi-source BFS levels",
    steps: [
      "Push all initially rotten oranges into the queue.",
      "Count fresh oranges.",
      "Each BFS level represents one minute.",
      "When a fresh orange rots, decrement fresh count."
    ],
    stuck: "All rotten oranges spread at the same time, so start BFS from all of them together.",
    code: "while queue and fresh>0: minutes++; process one level"
  },
  lc1091: {
    pattern: "Eight-direction BFS",
    steps: [
      "Reject immediately if start or end is blocked.",
      "BFS from (0,0) using eight directions.",
      "Store distance as level or inside the queue.",
      "Return distance when the bottom-right cell is reached."
    ],
    stuck: "Because every move costs one, the first time BFS reaches the target is optimal.",
    code: "dirs = 8 moves; BFS level count"
  },
  lc542: {
    pattern: "Multi-source BFS from zeroes",
    steps: [
      "Push every 0 cell into the queue with distance 0.",
      "Treat every 1 as initially unvisited.",
      "BFS outward from all zeroes.",
      "The first distance assigned to a 1 is its nearest-zero distance."
    ],
    stuck: "Do not run BFS from every 1. Reverse the thinking and run one BFS from all 0 cells.",
    code: "queue = all zero cells; expand into ones"
  },
  lc815: {
    pattern: "BFS over bus routes",
    steps: [
      "Map each stop to all buses/routes that visit it.",
      "BFS starts from the source stop.",
      "Taking one unvisited bus adds all stops on that route to the queue.",
      "Each BFS level is one more bus taken."
    ],
    stuck: "The important visited array is often visited buses, not just visited stops.",
    code: "for bus in stopToBuses[stop]: push every stop on that bus"
  },
  lc207: {
    pattern: "Topological cycle check",
    steps: [
      "Build graph and indegree from prerequisites.",
      "Push indegree-0 courses.",
      "Remove courses one by one and reduce neighbors' indegree.",
      "If processed count equals n, all courses can finish."
    ],
    stuck: "A cycle means no course inside the cycle ever becomes indegree 0.",
    code: "return processed == numCourses"
  },
  lc210: {
    pattern: "Topological order",
    steps: [
      "Use the same Kahn setup as Course Schedule.",
      "Append each popped course to answer.",
      "Reduce indegree of dependent courses.",
      "Return answer only if it contains all courses."
    ],
    stuck: "This problem asks for the order, not just true/false. Store the pop order.",
    code: "if order.size()!=n return {}; else return order"
  },
  lc1136: {
    pattern: "Kahn BFS levels",
    steps: [
      "Build indegree and graph.",
      "Start with all indegree-0 courses.",
      "Each queue level is one semester of parallel courses.",
      "If all courses are processed, return semester count; otherwise -1."
    ],
    stuck: "Semester is a level number. Process the queue by size.",
    code: "semesters++; process all currently available courses"
  },
  lc839: {
    pattern: "DSU on strings",
    steps: [
      "Compare each pair of strings.",
      "Two strings are similar if they differ in 0 or 2 positions.",
      "Union similar strings.",
      "The number of DSU components is the answer."
    ],
    stuck: "The graph is not explicit. Strings are vertices; similarity creates an edge.",
    code: "if diffCount(a,b) <= 2: unite(i,j)"
  },
  lc305: {
    pattern: "Dynamic DSU components",
    steps: [
      "Start with water everywhere and component count 0.",
      "When land is added for the first time, count++.",
      "Union it with neighboring land cells.",
      "Every successful union reduces count by one."
    ],
    stuck: "The count changes only on new land and successful merges.",
    code: "add land: count++; for land neighbor if unite count--"
  },
  lc959: {
    pattern: "DSU geometry modeling",
    steps: [
      "Model grid corner points as DSU nodes.",
      "Union all boundary points with the outside.",
      "For each slash, union the two corner points it connects.",
      "If union fails, a new region is formed."
    ],
    stuck: "A slash closes a loop when its endpoints are already connected.",
    code: "if slash edge union fails: regions++"
  },
  lc1168: {
    pattern: "MST with virtual node",
    steps: [
      "Create a virtual node 0 representing building a well.",
      "Connect 0 to every house with edge weight wells[i].",
      "Add all pipe edges normally.",
      "Run Kruskal MST over this combined edge list."
    ],
    stuck: "Choosing a well is just another edge choice when you add the virtual source.",
    code: "edges.push({0, house, wellCost}); run MST"
  },
  lc1584: {
    pattern: "Complete graph MST",
    steps: [
      "Treat each point as a vertex.",
      "Build every pair edge with Manhattan distance.",
      "Sort edges by weight.",
      "Use Kruskal until n-1 edges are selected."
    ],
    stuck: "The problem is not asking for a path. It asks for the cheapest network connecting all points.",
    code: "for i<j: edges.push({i,j,manhattan}); kruskal"
  },
  "mr-president": {
    pattern: "MST plus budget reduction",
    steps: [
      "Build an MST first; if graph is disconnected, answer is -1.",
      "Store selected MST edge weights.",
      "If total cost is above budget, replace largest selected roads with cost 1.",
      "Count replacements until cost fits or no edge remains."
    ],
    stuck: "You must start from an MST; replacing roads before minimizing can waste upgrades.",
    code: "sort selected weights descending; while cost>k cost -= w-1"
  },
  lc743: {
    pattern: "Dijkstra from source",
    steps: [
      "Build directed weighted adjacency list.",
      "Run Dijkstra from k.",
      "If any node remains unreachable, return -1.",
      "Otherwise return the maximum shortest distance."
    ],
    stuck: "Network delay is the time for the slowest reachable node to receive the signal.",
    code: "answer = max(dist[1..n]) after dijkstra"
  },
  lc787: {
    pattern: "Layered Bellman-Ford",
    steps: [
      "dist[src] starts at 0.",
      "Run k+1 relaxation rounds because k stops means at most k+1 flights.",
      "Use a copy array each round so one round uses one more edge only.",
      "Return dist[dst] or -1."
    ],
    stuck: "A plain Dijkstra can ignore the stop limit. The number of edges used is part of the state.",
    code: "for round in 1..k+1: relax all flights into copy"
  },
  lc505: {
    pattern: "Dijkstra on rolling maze",
    steps: [
      "From each cell, roll in a direction until hitting a wall.",
      "The rolled distance is the edge weight.",
      "Use Dijkstra because different rolls have different lengths.",
      "Return distance when destination is finalized."
    ],
    stuck: "The neighbor is not the adjacent cell. It is the stopping cell after rolling.",
    code: "roll until wall; relax stopping cell with traveled steps"
  },
  lc499: {
    pattern: "Dijkstra with lexicographic tie",
    steps: [
      "Use the same rolling-neighbor logic as Maze II.",
      "Track both distance and path string.",
      "Prefer smaller distance; if tied, prefer lexicographically smaller path.",
      "Stop when the hole is reached by the best state."
    ],
    stuck: "Distance is primary. Lexicographic order only decides ties.",
    code: "if newDist<dist or tie and newPath<path: update"
  },
  lc1631: {
    pattern: "Dijkstra with max-edge path cost",
    steps: [
      "Moving between cells has effort abs(height difference).",
      "Path cost is the maximum effort used so far.",
      "Dijkstra state distance is min possible maximum effort to each cell.",
      "Relax neighbor with max(currentEffort, edgeEffort)."
    ],
    stuck: "You are minimizing the worst jump, not the sum of jumps.",
    code: "next = max(cost, abs(h1-h2)); relax if next is smaller"
  },
  "mother-vertex": {
    pattern: "DFS finish candidate plus verification",
    steps: [
      "Run DFS over all vertices.",
      "The last start vertex that begins a DFS is the only possible mother vertex.",
      "Run one more DFS from that candidate.",
      "If it reaches all vertices, return it; otherwise no mother vertex exists."
    ],
    stuck: "The first pass only finds a candidate. The second pass proves it.",
    code: "candidate = last DFS root; verify reachability(candidate)"
  },
  malware: {
    pattern: "DSU with component infection counts",
    steps: [
      "Union connected clean/infected nodes into components.",
      "For each component, track size and how many initial infected nodes it has.",
      "Removing an infected node helps only if its component has exactly one infection.",
      "Choose the infected node that saves the largest component; tie by smaller index."
    ],
    stuck: "If a component has two infected nodes, removing one still leaves the component infected.",
    code: "if infectedCount[root] == 1: saved = size[root]"
  }
};

const weightedNodes = [
  { id: 0, x: 86, y: 92 },
  { id: 1, x: 230, y: 70 },
  { id: 2, x: 338, y: 148 },
  { id: 3, x: 160, y: 238 },
  { id: 4, x: 320, y: 296 },
  { id: 5, x: 488, y: 326 },
  { id: 6, x: 598, y: 244 },
  { id: 7, x: 438, y: 70 },
  { id: 8, x: 552, y: 112 }
];

const weightedEdges = [
  { id: "0-1", u: 0, v: 1, w: 10 },
  { id: "0-3", u: 0, v: 3, w: 10 },
  { id: "1-2", u: 1, v: 2, w: 10 },
  { id: "3-2", u: 3, v: 2, w: 40 },
  { id: "2-7", u: 2, v: 7, w: 2 },
  { id: "2-8", u: 2, v: 8, w: 4 },
  { id: "7-8", u: 7, v: 8, w: 3 },
  { id: "3-4", u: 3, v: 4, w: 2 },
  { id: "4-5", u: 4, v: 5, w: 2 },
  { id: "5-6", u: 5, v: 6, w: 3 },
  { id: "4-6", u: 4, v: 6, w: 8 }
];

const dagNodes = [
  { id: 0, label: "0", x: 120, y: 96 },
  { id: 1, label: "1", x: 550, y: 104 },
  { id: 2, label: "2", x: 250, y: 188 },
  { id: 3, label: "3", x: 420, y: 188 },
  { id: 4, label: "4", x: 120, y: 310 },
  { id: 5, label: "5", x: 550, y: 310 }
];

const dagEdges = [
  { id: "5-2", u: 5, v: 2, w: 1 },
  { id: "5-0", u: 5, v: 0, w: 1 },
  { id: "4-0", u: 4, v: 0, w: 1 },
  { id: "4-1", u: 4, v: 1, w: 1 },
  { id: "2-3", u: 2, v: 3, w: 1 },
  { id: "3-1", u: 3, v: 1, w: 1 }
];

const algorithms = {
  dfs: { label: "DFS", title: "Depth First Search", build: buildDfsSteps },
  bfs: { label: "BFS", title: "Breadth First Search", build: buildBfsSteps },
  dijkstra: { label: "Dijkstra", title: "Weighted Shortest Path", build: buildDijkstraSteps },
  kahn: { label: "Kahn", title: "Topological Order", build: buildKahnSteps },
  kruskal: { label: "Kruskal", title: "Minimum Spanning Tree", build: buildKruskalSteps }
};

const state = {
  lessonIndex: 0,
  algorithm: "dfs",
  stepIndex: 0,
  steps: [],
  completed: new Set(JSON.parse(localStorage.getItem("graphlearn.completed") || "[]")),
  quizAnswers: {},
  playTimer: null
};

const els = {
  lessonNav: document.getElementById("lessonNav"),
  lessonTitle: document.getElementById("lessonTitle"),
  lessonContent: document.getElementById("lessonContent"),
  sourceLink: document.getElementById("sourceLink"),
  progressText: document.getElementById("progressText"),
  progressBar: document.getElementById("progressBar"),
  algorithmTabs: document.getElementById("algorithmTabs"),
  algorithmTitle: document.getElementById("algorithmTitle"),
  graphSvg: document.getElementById("graphSvg"),
  stepCounter: document.getElementById("stepCounter"),
  stepTitle: document.getElementById("stepTitle"),
  stepDetail: document.getElementById("stepDetail"),
  algorithmData: document.getElementById("algorithmData"),
  resetStep: document.getElementById("resetStep"),
  prevStep: document.getElementById("prevStep"),
  playStep: document.getElementById("playStep"),
  playIcon: document.getElementById("playIcon"),
  nextStep: document.getElementById("nextStep"),
  practiceList: document.getElementById("practiceList"),
  quizBox: document.getElementById("quizBox")
};

function init() {
  renderLessonNav();
  renderAlgorithmTabs();
  bindControls();
  selectLesson(0);
  selectAlgorithm("dfs");
}

function bindControls() {
  els.resetStep.addEventListener("click", () => {
    stopPlayback();
    state.stepIndex = 0;
    renderStep();
  });
  els.prevStep.addEventListener("click", () => {
    stopPlayback();
    state.stepIndex = Math.max(0, state.stepIndex - 1);
    renderStep();
  });
  els.nextStep.addEventListener("click", () => {
    stopPlayback();
    goNextStep();
  });
  els.playStep.addEventListener("click", () => {
    if (state.playTimer) {
      stopPlayback();
      return;
    }
    state.playTimer = window.setInterval(() => {
      if (state.stepIndex >= state.steps.length - 1) {
        stopPlayback();
        return;
      }
      goNextStep();
    }, 1100);
    renderPlayIcon(true);
  });
}

function goNextStep() {
  state.stepIndex = Math.min(state.steps.length - 1, state.stepIndex + 1);
  renderStep();
}

function stopPlayback() {
  if (state.playTimer) {
    window.clearInterval(state.playTimer);
    state.playTimer = null;
  }
  renderPlayIcon(false);
}

function renderPlayIcon(isPlaying) {
  els.playIcon.innerHTML = isPlaying
    ? '<path d="M8 6h3v12H8z"></path><path d="M13 6h3v12h-3z"></path>'
    : '<path d="M8 5v14l11-7z"></path>';
}

function selectLesson(index) {
  state.lessonIndex = index;
  stopPlayback();
  renderLessonNav();
  renderLesson();
  renderPractice();
  renderQuiz();
}

function selectAlgorithm(key) {
  state.algorithm = key;
  state.stepIndex = 0;
  stopPlayback();
  state.steps = algorithms[key].build();
  els.algorithmTitle.textContent = algorithms[key].title;
  renderAlgorithmTabs();
  renderStep();
}

function renderLessonNav() {
  els.lessonNav.innerHTML = lessons
    .map((lesson, index) => {
      const complete = state.completed.has(lesson.id);
      return `
        <button class="lesson-button ${index === state.lessonIndex ? "active" : ""} ${complete ? "complete" : ""}" data-lesson="${index}" type="button">
          <span class="lesson-number">${complete ? "✓" : index + 1}</span>
          <span class="lesson-label">
            <strong>${escapeHtml(lesson.shortTitle)}</strong>
            <span>${escapeHtml(lesson.stage)}</span>
          </span>
        </button>
      `;
    })
    .join("");

  els.lessonNav.querySelectorAll("[data-lesson]").forEach((button) => {
    button.addEventListener("click", () => selectLesson(Number(button.dataset.lesson)));
  });

  const done = state.completed.size;
  els.progressText.textContent = `${done} of ${lessons.length} lessons`;
  els.progressBar.style.width = `${Math.round((done / lessons.length) * 100)}%`;
}

function renderLesson() {
  const lesson = lessons[state.lessonIndex];
  els.lessonTitle.textContent = lesson.title;
  els.sourceLink.href = `${sourceRoot}/${lesson.source.split(",")[0].trim()}`;

  els.lessonContent.innerHTML = `
    <div class="lesson-intro">
      <div class="source-pill-row">
        ${lesson.source
          .split(",")
          .map((item) => `<span class="source-pill">${escapeHtml(item.trim())}</span>`)
          .join("")}
      </div>
      <p class="lesson-summary">${escapeHtml(lesson.summary)}</p>
    </div>

    <div class="concept-block">
      <h4>Mental model</h4>
      <p>${escapeHtml(lesson.mentalModel)}</p>
    </div>

    <div class="concept-block">
      <h4>Core ideas</h4>
      <ul class="concept-list">
        ${lesson.keyIdeas.map((idea) => `<li>${escapeHtml(idea)}</li>`).join("")}
      </ul>
    </div>

    ${renderLessonDeepDive(lesson)}

    <div class="code-card">
      <header>
        <span>${escapeHtml(lesson.codeLabel)}</span>
        <span>C++ shape</span>
      </header>
      <pre><code>${escapeHtml(lesson.code)}</code></pre>
    </div>

    <div class="concept-block">
      <h4>Before coding, ask</h4>
      <ul class="check-list">
        ${lesson.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </div>

    <button class="mark-complete" type="button" id="completeLesson">
      ${state.completed.has(lesson.id) ? "Completed" : "Mark complete"}
    </button>
  `;

  document.getElementById("completeLesson").addEventListener("click", () => {
    if (state.completed.has(lesson.id)) {
      state.completed.delete(lesson.id);
    } else {
      state.completed.add(lesson.id);
    }
    localStorage.setItem("graphlearn.completed", JSON.stringify([...state.completed]));
    renderLessonNav();
    renderLesson();
  });
}

function renderLessonDeepDive(lesson) {
  const dive = lessonDeepDives[lesson.id];
  if (!dive) return "";
  return `
    <div class="concept-block">
      <h4>Detailed walkthrough</h4>
      <div class="deep-dive-grid">
        ${dive.walkthrough
          .map(
            (item, index) => `
              <article class="walkthrough-card">
                <span>${index + 1}</span>
                <p>${escapeHtml(item)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>

    <div class="concept-block">
      <h4>Tiny dry run</h4>
      <p>${escapeHtml(dive.dryRun)}</p>
    </div>

    <div class="concept-block">
      <h4>Common mistakes</h4>
      <ul class="check-list">
        ${dive.mistakes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderAlgorithmTabs() {
  els.algorithmTabs.innerHTML = Object.entries(algorithms)
    .map(
      ([key, algo]) => `
        <button class="segment-button ${state.algorithm === key ? "active" : ""}" data-algorithm="${key}" type="button" role="tab">
          ${escapeHtml(algo.label)}
        </button>
      `
    )
    .join("");

  els.algorithmTabs.querySelectorAll("[data-algorithm]").forEach((button) => {
    button.addEventListener("click", () => selectAlgorithm(button.dataset.algorithm));
  });
}

function renderPractice() {
  const lesson = lessons[state.lessonIndex];
  const cards = lesson.practice
    .map((id) => ({ id, problem: practiceProblems[id], guide: practiceGuides[id] }))
    .filter((item) => item.problem);
  els.practiceList.innerHTML = cards.length
    ? cards
        .map(
          ({ id, problem, guide }) => `
            <article class="practice-card">
              <strong>${escapeHtml(problem.name)}</strong>
              <p>${escapeHtml(problem.idea)}</p>
              ${renderProblemGuide(id, guide)}
              <div class="tag-row">
                <span class="tag ${problem.level}">${escapeHtml(problem.level)}</span>
              </div>
            </article>
          `
        )
        .join("")
    : '<p class="empty-note">Practice problems will appear here for each lesson.</p>';
}

function renderProblemGuide(id, guide) {
  const fallback = {
    pattern: "Graph pattern",
    steps: [
      "Identify vertices and edges.",
      "Choose traversal, DSU, ordering, MST, or shortest path based on the question.",
      "Dry run on a small example before coding."
    ],
    stuck: "When stuck, reduce the problem to graph type plus answer type.",
    code: "classify graph -> choose pattern -> implement carefully"
  };
  const data = guide || fallback;
  return `
    <details class="solution-guide">
      <summary>Stuck? Show solution path</summary>
      <div class="guide-body">
        <div>
          <span class="guide-label">Pattern</span>
          <p>${escapeHtml(data.pattern)}</p>
        </div>
        <div>
          <span class="guide-label">Steps</span>
          <ol class="guide-steps">
            ${data.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
          </ol>
        </div>
        <div>
          <span class="guide-label">When stuck</span>
          <p>${escapeHtml(data.stuck)}</p>
        </div>
        <pre class="guide-code"><code>${escapeHtml(data.code)}</code></pre>
      </div>
    </details>
  `;
}

function renderQuiz() {
  const lesson = lessons[state.lessonIndex];
  const selected = state.quizAnswers[lesson.id];
  els.quizBox.innerHTML = `
    <p><strong>${escapeHtml(lesson.quiz.question)}</strong></p>
    <div class="quiz-options">
      ${lesson.quiz.options
        .map((option, index) => {
          let cls = "";
          if (selected !== undefined && index === lesson.quiz.answer) cls = "correct";
          if (selected === index && selected !== lesson.quiz.answer) cls = "wrong";
          return `<button class="quiz-option ${cls}" type="button" data-answer="${index}">${escapeHtml(option)}</button>`;
        })
        .join("")}
    </div>
    <p class="quiz-feedback">
      ${selected === undefined ? "Pick the answer that matches the mental model." : escapeHtml(lesson.quiz.feedback)}
    </p>
  `;

  els.quizBox.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.quizAnswers[lesson.id] = Number(button.dataset.answer);
      renderQuiz();
    });
  });
}

function renderStep() {
  const step = state.steps[state.stepIndex] || emptyStep();
  els.stepCounter.textContent = `Step ${state.stepIndex + 1} of ${state.steps.length}`;
  els.stepTitle.textContent = step.title;
  els.stepDetail.textContent = step.detail;
  drawGraph(step);
  renderAlgorithmData(step);
}

function drawGraph(step) {
  const graph = step.graph || "weighted";
  const nodes = graph === "dag" ? dagNodes : weightedNodes;
  const edges = graph === "dag" ? dagEdges : weightedEdges;
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const activeNodes = new Set(step.activeNodes || []);
  const visitedNodes = new Set(step.visitedNodes || []);
  const frontierNodes = new Set(step.frontierNodes || []);
  const selectedNodes = new Set(step.selectedNodes || []);
  const activeEdges = new Set(step.activeEdges || []);
  const selectedEdges = new Set(step.selectedEdges || []);
  const rejectedEdges = new Set(step.rejectedEdges || []);
  const mutedEdges = new Set(step.mutedEdges || []);

  els.graphSvg.innerHTML = `
    <defs>
      <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#4f5b53"></path>
      </marker>
    </defs>
  `;

  for (const edge of edges) {
    const a = nodeById.get(edge.u);
    const b = nodeById.get(edge.v);
    const line = svgEl("line", {
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      class: [
        "edge-line",
        graph === "dag" ? "directed" : "",
        activeEdges.has(edge.id) ? "active" : "",
        selectedEdges.has(edge.id) ? "selected" : "",
        rejectedEdges.has(edge.id) ? "rejected" : "",
        mutedEdges.has(edge.id) ? "muted" : ""
      ]
        .filter(Boolean)
        .join(" ")
    });
    els.graphSvg.appendChild(line);

    if (graph !== "dag") {
      const label = svgEl("text", {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2 - 8,
        class: "edge-label"
      });
      label.textContent = edge.w;
      els.graphSvg.appendChild(label);
    }
  }

  for (const node of nodes) {
    const circle = svgEl("circle", {
      cx: node.x,
      cy: node.y,
      r: 24,
      class: [
        "node-ring",
        visitedNodes.has(node.id) ? "visited" : "",
        frontierNodes.has(node.id) ? "frontier" : "",
        activeNodes.has(node.id) ? "active" : "",
        selectedNodes.has(node.id) ? "selected" : ""
      ]
        .filter(Boolean)
        .join(" ")
    });
    els.graphSvg.appendChild(circle);

    const label = svgEl("text", {
      x: node.x,
      y: node.y + 1,
      class: "node-label"
    });
    label.textContent = node.label || node.id;
    els.graphSvg.appendChild(label);
  }
}

function renderAlgorithmData(step) {
  const data = step.data || [];
  els.algorithmData.innerHTML = data
    .map(
      (item) => `
        <div class="data-box">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.value)}</span>
        </div>
      `
    )
    .join("");
}

function buildDfsSteps() {
  const adj = makeAdjacency(weightedEdges, false);
  const steps = [
    {
      graph: "weighted",
      title: "Start at 0",
      detail: "DFS commits to one path before trying the next neighbor.",
      activeNodes: [0],
      frontierNodes: adj.get(0).map((edge) => edge.v),
      data: [
        { label: "Call stack", value: "0" },
        { label: "Visited", value: "-" },
        { label: "Goal", value: "Explore all reachable nodes" }
      ]
    }
  ];
  const visited = new Set();
  const stack = [];

  function visit(u, fromEdge) {
    visited.add(u);
    stack.push(u);
    steps.push({
      graph: "weighted",
      title: `Visit ${u}`,
      detail: `Mark ${u} visited, then inspect each unvisited neighbor.`,
      activeNodes: [u],
      visitedNodes: [...visited],
      activeEdges: fromEdge ? [fromEdge] : [],
      data: [
        { label: "Call stack", value: stack.join(" -> ") },
        { label: "Visited", value: formatSet(visited) },
        { label: "Next check", value: adj.get(u).map((edge) => edge.v).join(", ") || "-" }
      ]
    });

    for (const edge of adj.get(u)) {
      if (!visited.has(edge.v)) {
        steps.push({
          graph: "weighted",
          title: `Try ${u}-${edge.v}`,
          detail: `${edge.v} is unvisited, so DFS goes deeper through this edge.`,
          activeNodes: [u, edge.v],
          visitedNodes: [...visited],
          activeEdges: [edge.id],
          data: [
            { label: "Call stack", value: stack.join(" -> ") },
            { label: "Edge", value: `${u}-${edge.v}` },
            { label: "Weight", value: String(edge.w) }
          ]
        });
        visit(edge.v, edge.id);
      }
    }

    stack.pop();
    if (stack.length) {
      steps.push({
        graph: "weighted",
        title: `Return from ${u}`,
        detail: `All neighbors of ${u} are done, so control returns to ${stack[stack.length - 1]}.`,
        activeNodes: [stack[stack.length - 1]],
        visitedNodes: [...visited],
        data: [
          { label: "Call stack", value: stack.join(" -> ") },
          { label: "Visited", value: formatSet(visited) },
          { label: "Status", value: `${u} finished` }
        ]
      });
    }
  }

  visit(0);
  steps.push({
    graph: "weighted",
    title: "DFS complete",
    detail: "Every node reachable from 0 has been marked.",
    visitedNodes: [...visited],
    selectedNodes: [...visited],
    data: [
      { label: "Visited", value: formatSet(visited) },
      { label: "Call stack", value: "-" },
      { label: "Component size", value: String(visited.size) }
    ]
  });
  return limitSteps(steps, 30);
}

function buildBfsSteps() {
  const adj = makeAdjacency(weightedEdges, false);
  const steps = [];
  const queue = [0];
  const visited = new Set([0]);
  let level = 0;

  steps.push({
    graph: "weighted",
    title: "Queue starts with 0",
    detail: "BFS keeps a queue, so older discoveries are processed first.",
    activeNodes: [0],
    frontierNodes: queue,
    data: [
      { label: "Queue", value: queue.join(", ") },
      { label: "Level", value: String(level) },
      { label: "Visited", value: formatSet(visited) }
    ]
  });

  while (queue.length) {
    const size = queue.length;
    const thisLevel = queue.slice(0, size);
    steps.push({
      graph: "weighted",
      title: `Process level ${level}`,
      detail: `Nodes ${thisLevel.join(", ")} are all ${level} edge(s) away from the source.`,
      activeNodes: thisLevel,
      frontierNodes: queue,
      visitedNodes: [...visited],
      data: [
        { label: "Queue", value: queue.join(", ") },
        { label: "Level", value: String(level) },
        { label: "Level size", value: String(size) }
      ]
    });

    for (let i = 0; i < size; i++) {
      const u = queue.shift();
      for (const edge of adj.get(u)) {
        if (!visited.has(edge.v)) {
          visited.add(edge.v);
          queue.push(edge.v);
          steps.push({
            graph: "weighted",
            title: `Discover ${edge.v}`,
            detail: `${edge.v} is reached from ${u}, so it is placed at the back of the queue.`,
            activeNodes: [u, edge.v],
            frontierNodes: [...queue],
            visitedNodes: [...visited],
            activeEdges: [edge.id],
            data: [
              { label: "Queue", value: queue.join(", ") || "-" },
              { label: "Visited", value: formatSet(visited) },
              { label: "New edge", value: `${u}-${edge.v}` }
            ]
          });
        }
      }
    }
    level++;
  }

  steps.push({
    graph: "weighted",
    title: "BFS complete",
    detail: "The first level where a node appears is its shortest unweighted distance from 0.",
    selectedNodes: [...visited],
    visitedNodes: [...visited],
    data: [
      { label: "Visited", value: formatSet(visited) },
      { label: "Queue", value: "-" },
      { label: "Levels", value: String(level) }
    ]
  });
  return limitSteps(steps, 30);
}

function buildDijkstraSteps() {
  const adj = makeAdjacency(weightedEdges, false);
  const nodes = weightedNodes.map((node) => node.id);
  const dist = Object.fromEntries(nodes.map((node) => [node, Infinity]));
  const visited = new Set();
  const selectedEdges = [];
  dist[0] = 0;

  const steps = [
    {
      graph: "weighted",
      title: "Distance to 0 is 0",
      detail: "Every other distance starts as infinity.",
      activeNodes: [0],
      data: [
        { label: "Distances", value: formatDistances(dist) },
        { label: "Picked", value: "-" },
        { label: "Rule", value: "Pick smallest unfinished distance" }
      ]
    }
  ];

  while (visited.size < nodes.length) {
    const u = nodes
      .filter((node) => !visited.has(node) && dist[node] < Infinity)
      .sort((a, b) => dist[a] - dist[b])[0];
    if (u === undefined) break;
    visited.add(u);
    steps.push({
      graph: "weighted",
      title: `Finalize ${u}`,
      detail: `${u} has the smallest unfinished distance, so its distance is now fixed.`,
      activeNodes: [u],
      visitedNodes: [...visited],
      selectedEdges: [...selectedEdges],
      data: [
        { label: "Picked", value: `${u} at ${dist[u]}` },
        { label: "Distances", value: formatDistances(dist) },
        { label: "Fixed nodes", value: formatSet(visited) }
      ]
    });

    for (const edge of adj.get(u)) {
      if (visited.has(edge.v)) continue;
      const candidate = dist[u] + edge.w;
      if (candidate < dist[edge.v]) {
        dist[edge.v] = candidate;
        selectedEdges.push(edge.id);
        steps.push({
          graph: "weighted",
          title: `Relax ${u}-${edge.v}`,
          detail: `Going through ${u} improves ${edge.v} to distance ${candidate}.`,
          activeNodes: [u, edge.v],
          visitedNodes: [...visited],
          activeEdges: [edge.id],
          selectedEdges: [...selectedEdges],
          data: [
            { label: "Update", value: `${edge.v} = ${candidate}` },
            { label: "Distances", value: formatDistances(dist) },
            { label: "Edge weight", value: String(edge.w) }
          ]
        });
      }
    }
  }

  steps.push({
    graph: "weighted",
    title: "Shortest distances fixed",
    detail: "Dijkstra is done when every reachable node has been finalized.",
    selectedNodes: [...visited],
    visitedNodes: [...visited],
    selectedEdges,
    data: [
      { label: "Distances", value: formatDistances(dist) },
      { label: "Reachable", value: String(visited.size) },
      { label: "Source", value: "0" }
    ]
  });
  return limitSteps(steps, 32);
}

function buildKahnSteps() {
  const adj = makeAdjacency(dagEdges, true);
  const nodes = dagNodes.map((node) => node.id);
  const indegree = Object.fromEntries(nodes.map((node) => [node, 0]));
  for (const edge of dagEdges) indegree[edge.v]++;

  const queue = nodes.filter((node) => indegree[node] === 0).sort((a, b) => a - b);
  const order = [];
  const selectedEdges = [];
  const steps = [
    {
      graph: "dag",
      title: "Find indegree 0 nodes",
      detail: "Nodes with no incoming prerequisites can be processed now.",
      frontierNodes: [...queue],
      data: [
        { label: "Queue", value: queue.join(", ") },
        { label: "Indegree", value: formatObject(indegree) },
        { label: "Order", value: "-" }
      ]
    }
  ];

  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    steps.push({
      graph: "dag",
      title: `Remove ${u}`,
      detail: `${u} enters the topological order. Its outgoing edges no longer block other nodes.`,
      activeNodes: [u],
      selectedNodes: [...order],
      frontierNodes: [...queue],
      selectedEdges: [...selectedEdges],
      data: [
        { label: "Queue", value: queue.join(", ") || "-" },
        { label: "Order", value: order.join(" -> ") },
        { label: "Indegree", value: formatObject(indegree) }
      ]
    });

    for (const edge of adj.get(u)) {
      indegree[edge.v]--;
      selectedEdges.push(edge.id);
      if (indegree[edge.v] === 0) queue.push(edge.v);
      steps.push({
        graph: "dag",
        title: `Decrease indegree of ${edge.v}`,
        detail:
          indegree[edge.v] === 0
            ? `${edge.v} has no remaining prerequisites, so it joins the queue.`
            : `${edge.v} still has ${indegree[edge.v]} prerequisite(s).`,
        activeNodes: [u, edge.v],
        selectedNodes: [...order],
        frontierNodes: [...queue],
        activeEdges: [edge.id],
        selectedEdges: [...selectedEdges],
        data: [
          { label: "Queue", value: queue.join(", ") || "-" },
          { label: "Order", value: order.join(" -> ") },
          { label: "Indegree", value: formatObject(indegree) }
        ]
      });
    }
    queue.sort((a, b) => a - b);
  }

  steps.push({
    graph: "dag",
    title: "Topological order ready",
    detail: "All nodes were removed, so this directed graph has no cycle.",
    selectedNodes: order,
    selectedEdges,
    data: [
      { label: "Order", value: order.join(" -> ") },
      { label: "Processed", value: `${order.length}/${nodes.length}` },
      { label: "Cycle", value: "No" }
    ]
  });
  return steps;
}

function buildKruskalSteps() {
  const sorted = [...weightedEdges].sort((a, b) => a.w - b.w);
  const parent = Object.fromEntries(weightedNodes.map((node) => [node.id, node.id]));
  const selectedEdges = [];
  const rejectedEdges = [];
  let total = 0;
  const steps = [
    {
      graph: "weighted",
      title: "Sort edges by weight",
      detail: "Kruskal tries the cheapest available edge first.",
      data: [
        { label: "Next edges", value: sorted.map((edge) => `${edge.id}:${edge.w}`).join(", ") },
        { label: "MST cost", value: "0" },
        { label: "Rule", value: "Take edge only if it connects two groups" }
      ]
    }
  ];

  for (const edge of sorted) {
    const ru = find(parent, edge.u);
    const rv = find(parent, edge.v);
    if (ru !== rv) {
      parent[rv] = ru;
      selectedEdges.push(edge.id);
      total += edge.w;
      steps.push({
        graph: "weighted",
        title: `Take ${edge.id}`,
        detail: `${edge.u} and ${edge.v} were in different groups, so this edge is safe.`,
        activeNodes: [edge.u, edge.v],
        activeEdges: [edge.id],
        selectedEdges: [...selectedEdges],
        rejectedEdges: [...rejectedEdges],
        data: [
          { label: "MST edges", value: selectedEdges.join(", ") },
          { label: "MST cost", value: String(total) },
          { label: "Components", value: formatComponents(parent) }
        ]
      });
    } else {
      rejectedEdges.push(edge.id);
      steps.push({
        graph: "weighted",
        title: `Skip ${edge.id}`,
        detail: `${edge.u} and ${edge.v} are already connected, so this edge would create a cycle.`,
        activeNodes: [edge.u, edge.v],
        rejectedEdges: [...rejectedEdges],
        selectedEdges: [...selectedEdges],
        data: [
          { label: "Rejected", value: rejectedEdges.join(", ") },
          { label: "MST cost", value: String(total) },
          { label: "Reason", value: "Cycle" }
        ]
      });
    }
    if (selectedEdges.length === weightedNodes.length - 1) break;
  }

  steps.push({
    graph: "weighted",
    title: "MST complete",
    detail: "Nine vertices need exactly eight selected edges to be connected without cycles.",
    selectedEdges,
    rejectedEdges,
    selectedNodes: weightedNodes.map((node) => node.id),
    data: [
      { label: "MST edges", value: selectedEdges.join(", ") },
      { label: "MST cost", value: String(total) },
      { label: "Edges used", value: `${selectedEdges.length}/8` }
    ]
  });

  return steps;
}

function makeAdjacency(edges, directed) {
  const maxNode = Math.max(...edges.flatMap((edge) => [edge.u, edge.v]));
  const adj = new Map();
  for (let i = 0; i <= maxNode; i++) adj.set(i, []);
  for (const edge of edges) {
    adj.get(edge.u).push({ v: edge.v, w: edge.w, id: edge.id });
    if (!directed) adj.get(edge.v).push({ v: edge.u, w: edge.w, id: edge.id });
  }
  for (const list of adj.values()) list.sort((a, b) => a.v - b.v);
  return adj;
}

function find(parent, x) {
  if (parent[x] === x) return x;
  parent[x] = find(parent, parent[x]);
  return parent[x];
}

function formatSet(set) {
  const values = [...set].sort((a, b) => a - b);
  return values.length ? values.join(", ") : "-";
}

function formatDistances(dist) {
  return Object.entries(dist)
    .map(([node, value]) => `${node}:${value === Infinity ? "inf" : value}`)
    .join(" ");
}

function formatObject(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}:${value}`)
    .join(" ");
}

function formatComponents(parent) {
  const groups = new Map();
  for (const key of Object.keys(parent)) {
    const root = find(parent, Number(key));
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(key);
  }
  return [...groups.values()].map((group) => `{${group.join(",")}}`).join(" ");
}

function limitSteps(steps, max) {
  if (steps.length <= max) return steps;
  const first = steps.slice(0, max - 1);
  first.push(steps[steps.length - 1]);
  return first;
}

function emptyStep() {
  return {
    graph: "weighted",
    title: "Ready",
    detail: "Choose an algorithm to begin.",
    data: []
  };
}

function svgEl(tag, attrs) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  return el;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

init();
