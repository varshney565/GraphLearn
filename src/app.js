"use strict";

const sourceRoot =
  "https://github.com/varshney565/Graph/tree/main/RajneeshSirGraph";

const lessons = [
  {
    id: "graph-basics",
    title: "Graph Representation",
    shortTitle: "Representation",
    source: "Lecture1.cpp",
    stage: "Foundation",
    summary:
      "Before DFS, BFS, DSU, MST, or shortest path, first learn how Rajneesh sir stores a graph: adjacency list, pair(neighbour, weight), add edge, display, remove edge, and remove vertex.",
    mentalModel:
      "Each vertex keeps its own neighbour list. For an undirected road u-v, both u and v must write each other in their lists.",
    keyIdeas: [
      "Use vector<vector<pair<int,int>>> when every edge has a neighbour and weight.",
      "addEdge for an undirected graph pushes the edge on both sides.",
      "display helps verify whether the graph was built correctly.",
      "removeEdge and removeVtx must also clean both sides of an undirected edge."
    ],
    codeLabel: "RajneeshSirGraph adjacency list",
    code: `vector<vector<pair<int,int>>> graph(n);

void addEdge(int u, int v, int w) {
  graph[u].push_back({v, w});
  graph[v].push_back({u, w});
}`,
    checklist: [
      "Did I store both directions for an undirected edge?",
      "Did I print the graph once to check adjacency?",
      "When deleting, did I delete the reverse edge too?",
      "Can my graph have disconnected components?"
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
    title: "Cycle Detection",
    shortTitle: "Cycles",
    source: "Lecture3.cpp, Lecture4.cpp, Lecture5.cpp, Lecture8.cpp",
    stage: "Core pattern",
    summary:
      "Cycle detection appears in many forms: repeated BFS pop, odd-cycle bipartite failure, directed recursion states, DSU union failure, and Kahn's algorithm not processing all nodes.",
    mentalModel:
      "A cycle means you reached something in a way that should not be possible for that algorithm: an already connected DSU group, a currently visiting directed node, or a node that never reaches indegree 0.",
    keyIdeas: [
      "Undirected BFS can detect a cycle when a popped vertex was already visited.",
      "Directed DFS needs states: unvisited, visiting, done.",
      "DSU detects an undirected cycle when union(u,v) fails.",
      "Kahn detects a directed cycle when processed count is less than n.",
      "Bipartite detection fails on odd cycles."
    ],
    codeLabel: "Directed cycle state idea",
    code: `// 0 = unvisited, 1 = currently visiting, 2 = done
bool dfs(int u) {
  state[u] = 1;
  for (int v : graph[u]) {
    if (state[v] == 1) return true;
    if (state[v] == 0 && dfs(v)) return true;
  }
  state[u] = 2;
  return false;
}`,
    checklist: [
      "Is the graph directed or undirected?",
      "Do I need to identify the cycle, or only know it exists?",
      "Can DSU solve it because edges are undirected?",
      "Can Kahn solve it because the graph is a prerequisite/order graph?"
    ],
    practice: ["lc684", "lc207", "lc785", "lc886"],
    quiz: {
      question: "What does a failed DSU union usually mean in an undirected edge stream?",
      options: [
        "The new edge connects vertices already in the same component.",
        "The graph is definitely directed.",
        "The edge has the smallest weight."
      ],
      answer: 0,
      feedback:
        "If both endpoints already have the same DSU parent, adding that edge creates a cycle."
    }
  },
  {
    id: "dfs-backtracking",
    title: "DFS On Graph",
    shortTitle: "DFS",
    source: "Lecture1.cpp",
    stage: "Traversal",
    summary:
      "DFS on a normal graph follows Rajneesh sir's basic recipe: mark visited, go to all unvisited neighbours, and unmark only when the problem needs different candidate paths.",
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
    title: "DFS On Grid",
    shortTitle: "Grid DFS",
    source: "Lecture2.cpp, Lecture3.cpp, Lecture6.cpp",
    stage: "Matrix patterns",
    summary:
      "Grid DFS is the same DFS idea, but neighbours are created with direction arrays instead of an adjacency list.",
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
    title: "BFS And Levels",
    shortTitle: "BFS",
    source: "Lecture3.cpp",
    stage: "Shortest unweighted",
    summary:
      "BFS uses a queue. Rajneesh sir teaches two forms: mark on pop when cycle detection matters, and mark on push when you only need clean level traversal.",
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
    title: "Topological Sort",
    shortTitle: "Topo Sort",
    source: "Lecture4.cpp",
    stage: "DAG thinking",
    summary:
      "Topological sort is for directed order problems. The repo teaches both DFS postorder and Kahn's indegree algorithm.",
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

const lessonOrder = [
  "graph-basics",
  "dfs-backtracking",
  "grid-graphs",
  "bfs-levels",
  "adjacency-operations",
  "directed-order",
  "dsu",
  "mst",
  "shortest-paths",
  "advanced-map"
];

lessons.sort((a, b) => lessonOrder.indexOf(a.id) - lessonOrder.indexOf(b.id));

const lessonSourceGuides = {
  "graph-basics": {
    coverage: [
      "Lecture1.cpp: addEdge",
      "Lecture1.cpp: weighted adjacency list",
      "Lecture1.cpp: display",
      "Lecture1.cpp: removeEdge",
      "Lecture1.cpp: removeVtx"
    ],
    recipes: [
      {
        title: "Build an undirected weighted graph",
        source: "Lecture1.cpp:addEdge",
        steps: [
          "Create adj as vector<vector<pair<int,int>>>.",
          "For edge u-v with weight w, push {v,w} inside adj[u].",
          "Because the graph is undirected, also push {u,w} inside adj[v].",
          "For a directed edge, do only the first push."
        ],
        remember:
          "If one undirected edge is stored only once, DFS/BFS from the other side will behave as if the road does not exist."
      },
      {
        title: "Display the graph for debugging",
        source: "Lecture1.cpp:display",
        steps: [
          "Loop over every vertex u from 0 to V-1.",
          "Print u first.",
          "Loop over every pair stored in adj[u].",
          "Print neighbor and weight as (v,w)."
        ],
        remember:
          "Rajneesh sir uses display after build/remove operations because wrong adjacency is the first bug to catch."
      },
      {
        title: "Remove one undirected edge",
        source: "Lecture1.cpp:removeEdge",
        steps: [
          "Go to adj[u] and find the pair whose first value is v.",
          "Erase that pair from adj[u].",
          "Go to adj[v] and find the pair whose first value is u.",
          "Erase that pair from adj[v]."
        ],
        remember:
          "For undirected graphs, removal is also two-sided, same as insertion."
      },
      {
        title: "Remove a vertex",
        source: "Lecture1.cpp:removeVtx",
        steps: [
          "Look at all neighbours currently stored for vertex u.",
          "Remove the edge u-neighbour from u's list.",
          "Also remove the reverse edge neighbour-u from that neighbour's list.",
          "Repeat until u has no remaining edges."
        ],
        remember:
          "Loop from the back while deleting so index shifting does not skip edges."
      }
    ]
  },
  "adjacency-operations": {
    coverage: [
      "Lecture3.cpp: BFS with cycle detection",
      "Lecture3.cpp: isBipartite",
      "Lecture3.cpp: possibleBipartition",
      "Lecture4.cpp: Kahn cycle check",
      "Lecture5.cpp: directed cycle states",
      "Lecture5.cpp: findRedundantConnection"
    ],
    recipes: [
      {
        title: "Undirected BFS cycle detection",
        source: "Lecture3.cpp:BFS",
        steps: [
          "Push source into queue.",
          "Pop one vertex.",
          "If it is already visited, a cycle reached it again.",
          "Otherwise mark it visited.",
          "Push all unvisited neighbours."
        ],
        remember:
          "This is the BFS version where you mark on pop so a repeated pop can reveal a cycle."
      },
      {
        title: "Directed cycle detection",
        source: "Lecture5.cpp:isCycle",
        steps: [
          "Use 0 for unvisited.",
          "Use 1 for currently visiting in this DFS path.",
          "Use 2 for fully processed.",
          "When DFS sees a neighbour with state 1, a directed cycle exists.",
          "After all children finish, set current state to 2."
        ],
        remember:
          "A directed cycle is about recursion path, not just whether a node was visited sometime before."
      },
      {
        title: "DSU cycle detection",
        source: "Lecture5.cpp:findRedundantConnection",
        steps: [
          "Initialize each node as its own parent.",
          "Process undirected edges one by one.",
          "For each edge u-v, call unite(u,v).",
          "If unite returns false, u and v were already connected.",
          "That edge is creating the cycle."
        ],
        remember:
          "DSU cycle detection is for undirected connectivity, not directed dependency order."
      },
      {
        title: "Kahn cycle detection",
        source: "Lecture4.cpp:KahnsAlgo",
        steps: [
          "Build indegree for every node.",
          "Push all nodes with indegree 0.",
          "Pop nodes and reduce indegree of their children.",
          "Count how many nodes were popped.",
          "If popped count is less than n, the remaining nodes are stuck in a cycle."
        ],
        remember:
          "A directed cycle never becomes indegree 0, so Kahn cannot remove all nodes."
      },
      {
        title: "Odd-cycle detection with bipartite BFS",
        source: "Lecture3.cpp:isBipartite",
        steps: [
          "Color source with color 1.",
          "BFS level by level.",
          "Next level gets color 2.",
          "If a vertex is reached with a conflicting color, return false.",
          "That conflict means an odd cycle exists."
        ],
        remember:
          "A graph with no cycle is bipartite. A graph with only even cycles is also bipartite."
      }
    ]
  },
  "dfs-backtracking": {
    coverage: [
      "Lecture1.cpp: hasPathHelper",
      "Lecture1.cpp: TotalPaths",
      "Lecture1.cpp: preorder",
      "Lecture1.cpp: HeavyPath",
      "Lecture1.cpp: HamiltonPaths",
      "Lecture2.cpp: GetConnectedComponents"
    ],
    recipes: [
      {
        title: "DFS: check whether a path exists",
        source: "Lecture1.cpp:hasPathHelper",
        steps: [
          "If src is dest, return true.",
          "Mark visited[src] = true.",
          "Go to all neighbours of src one by one.",
          "If a neighbour is unvisited, call DFS on that neighbour.",
          "If any recursive call returns true, return true.",
          "If no neighbour works, return false."
        ],
        remember:
          "For simple hasPath, do not unmark while returning. Once a node is fully checked, it can stay visited."
      },
      {
        title: "DFS: count all paths",
        source: "Lecture1.cpp:TotalPaths",
        steps: [
          "If src is dest, increase answer and return.",
          "Mark visited[src] = true.",
          "Call DFS on every unvisited neighbour.",
          "After all neighbours finish, unmark visited[src] = false.",
          "This lets the same vertex appear in a different path later."
        ],
        remember:
          "The unmark step is the backtracking step. Use it for all paths, Hamiltonian path, and path search problems."
      },
      {
        title: "Preorder path printing",
        source: "Lecture1.cpp:preorder",
        steps: [
          "Mark the current vertex.",
          "Add current vertex to the path string.",
          "Print current vertex, full path so far, and cost so far.",
          "Recurse to every unvisited neighbour with cost + edge weight.",
          "Unmark while returning so other paths can be printed."
        ],
        remember:
          "Preorder means print before going deeper."
      },
      {
        title: "Heaviest path",
        source: "Lecture1.cpp:HeavyPath",
        steps: [
          "Carry path string and weight-so-far in recursion.",
          "When src reaches dest, compare weight-so-far with best answer.",
          "If current weight is bigger, update best weight and best path.",
          "Explore all unvisited neighbours.",
          "Unmark while returning because another candidate path may need this vertex."
        ],
        remember:
          "This is not Dijkstra. It searches all simple paths and keeps the maximum weight."
      },
      {
        title: "Hamiltonian path and cycle",
        source: "Lecture1.cpp:HamiltonPaths",
        steps: [
          "Carry count of visited vertices in the current path.",
          "When count becomes graph size, a Hamiltonian path is found.",
          "Check whether the last vertex has an edge back to the original source.",
          "If yes, mark it as a Hamiltonian cycle.",
          "Backtrack by unmarking before returning."
        ],
        remember:
          "Hamiltonian means every vertex is used exactly once in one path."
      },
      {
        title: "Connected components",
        source: "Lecture2.cpp:GetConnectedComponents",
        steps: [
          "Make visited false for every vertex.",
          "Loop i from 0 to n-1.",
          "If i is not visited, start DFS from i.",
          "That one DFS marks one complete component.",
          "Increase component count after that DFS finishes."
        ],
        remember:
          "When the graph may be disconnected, always keep the outer loop over all vertices."
      }
    ]
  },
  "grid-graphs": {
    coverage: [
      "Lecture2.cpp: numIslands",
      "Lecture2.cpp: maxAreaOfIsland",
      "Lecture2.cpp: islandPerimeter",
      "Lecture2.cpp: Surrounded Regions",
      "Lecture3.cpp: numberofDistinctIslands",
      "Lecture3.cpp: numEnclaves",
      "Lecture6.cpp: countSubIslands"
    ],
    recipes: [
      {
        title: "Grid DFS: Number of Islands",
        source: "Lecture2.cpp:numIslands",
        steps: [
          "Treat each land cell as one graph vertex.",
          "Loop over every cell.",
          "When grid[i][j] is land, start DFS and increase island count.",
          "Inside DFS, mark the current land cell as water.",
          "Call DFS on all valid four-direction land neighbours."
        ],
        remember:
          "The grid itself can be the visited array when you are allowed to modify it."
      },
      {
        title: "Grid DFS: Max Area of Island",
        source: "Lecture2.cpp:maxAreaOfIsland",
        steps: [
          "When you find land, reset temp area to 0.",
          "DFS marks current cell as water.",
          "Increase temp for every cell consumed by that DFS.",
          "After DFS finishes, update ans = max(ans, temp)."
        ],
        remember:
          "Same DFS as islands, but now each component returns a size."
      },
      {
        title: "Boundary DFS: Surrounded Regions",
        source: "Lecture2.cpp:solve",
        steps: [
          "Run DFS only from boundary cells that contain O.",
          "Mark safe boundary-connected O cells as T.",
          "After boundary DFS, scan the full board.",
          "Flip remaining O to X.",
          "Turn T back to O."
        ],
        remember:
          "Do not start from the middle first. The safe region is discovered from the boundary."
      },
      {
        title: "Distinct island shape",
        source: "Lecture3.cpp:numberofDistinctIslands",
        steps: [
          "Start DFS for each island.",
          "When moving in direction i, append i to a shape string.",
          "When backtracking, append b.",
          "Insert the final string into a set.",
          "The set size is the number of distinct island shapes."
        ],
        remember:
          "The backtracking marker b is important. Without it, different shapes can create the same string."
      },
      {
        title: "Sub-islands",
        source: "Lecture6.cpp:countSubIslands",
        steps: [
          "DFS each island in grid2.",
          "While visiting grid2 cells, check the same cell in grid1.",
          "If any grid2 land cell sits on grid1 water, mark this island invalid.",
          "After DFS, count it only if it stayed valid."
        ],
        remember:
          "You validate the whole component, not only the starting cell."
      }
    ]
  },
  "bfs-levels": {
    coverage: [
      "Lecture3.cpp: BFS",
      "Lecture3.cpp: BFS_without_cycle",
      "Lecture3.cpp: isBipartite",
      "Lecture3.cpp: orangesRotting",
      "Lecture3.cpp: possibleBipartition",
      "Lecture3.cpp: shortestPathBinaryMatrix",
      "Lecture3.cpp: updateMatrix",
      "Lecture8.cpp: numBusesToDestination"
    ],
    recipes: [
      {
        title: "BFS when cycle detection matters",
        source: "Lecture3.cpp:BFS",
        steps: [
          "Push source into the queue.",
          "Do not mark immediately if you want to detect a repeated pop.",
          "Pop front.",
          "If already visited, a cycle path reached this vertex again.",
          "Otherwise mark it and push all unvisited neighbours."
        ],
        remember:
          "This version can let the same vertex enter the queue more than once, so the queue can grow up to O(E)."
      },
      {
        title: "BFS when cycle detection is not needed",
        source: "Lecture3.cpp:BFS_without_cycle",
        steps: [
          "Push source into queue.",
          "Mark source immediately.",
          "Pop one vertex.",
          "For each unvisited neighbour, mark it immediately and push it.",
          "Use queue size to separate levels."
        ],
        remember:
          "Mark on push when you only need shortest level or visitation, because it avoids duplicate queue entries."
      },
      {
        title: "Rotting oranges",
        source: "Lecture3.cpp:orangesRotting",
        steps: [
          "Push all initially rotten oranges into the queue.",
          "Each BFS level represents one minute.",
          "From every rotten orange, rot fresh four-direction neighbours.",
          "Push newly rotten oranges for the next minute.",
          "After BFS, if any fresh orange remains, return -1."
        ],
        remember:
          "This is multi-source BFS. All rotten oranges start at time 0 together."
      },
      {
        title: "Bipartite graph",
        source: "Lecture3.cpp:isBipartite",
        steps: [
          "Use colors 1 and 2.",
          "Start BFS from every unvisited component.",
          "All vertices in the current level get the current color.",
          "Next level gets 3 - color.",
          "If a visited vertex appears with the wrong color, return false."
        ],
        remember:
          "Odd cycle means not bipartite. Even cycle is okay."
      },
      {
        title: "01 Matrix and shortest binary matrix",
        source: "Lecture3.cpp:updateMatrix / shortestPathBinaryMatrix",
        steps: [
          "For 01 Matrix, push all zero cells first.",
          "For binary matrix shortest path, push only the start cell.",
          "Use BFS levels as distance.",
          "Mark cells as soon as they are pushed or consumed.",
          "Use four directions for 01 Matrix and eight directions for binary matrix."
        ],
        remember:
          "Direction count comes from the problem statement. Do not assume four directions every time."
      }
    ]
  },
  "directed-order": {
    coverage: [
      "Lecture4.cpp: topologicalSort",
      "Lecture4.cpp: KahnsAlgo",
      "Lecture4.cpp: canFinish",
      "Lecture4.cpp: findOrder"
    ],
    recipes: [
      {
        title: "DFS topological sort",
        source: "Lecture4.cpp:topologicalSort",
        steps: [
          "Run DFS from every unvisited vertex.",
          "Inside DFS, mark the current vertex.",
          "Visit all unvisited outgoing neighbours.",
          "Print or push the current vertex after all children finish."
        ],
        remember:
          "Topo DFS works by postorder. A node is added after its dependencies below it are handled."
      },
      {
        title: "Kahn algorithm",
        source: "Lecture4.cpp:KahnsAlgo",
        steps: [
          "Build indegree for every vertex.",
          "Push all vertices with indegree 0.",
          "Pop one vertex and add it to answer.",
          "For each outgoing neighbour, decrease indegree.",
          "When a neighbour indegree becomes 0, push it.",
          "If answer size is less than n, there is a cycle."
        ],
        remember:
          "Indegree 0 means no pending prerequisite."
      },
      {
        title: "Course Schedule",
        source: "Lecture4.cpp:canFinish / findOrder",
        steps: [
          "Convert prerequisites into directed edges.",
          "Run the Kahn algorithm.",
          "For canFinish, return true only if all courses are removed.",
          "For findOrder, return the order; if a cycle remains, return empty.",
          "Reverse only if your edge direction in code requires it."
        ],
        remember:
          "Course problems are mostly topo sort plus careful edge direction."
      }
    ]
  },
  dsu: {
    coverage: [
      "Lecture4.cpp: dsu for Journey to the Moon",
      "Lecture5.cpp: findRedundantConnection",
      "Lecture5.cpp: smallestEquivalentstring",
      "Lecture6.cpp: maxAreaOfIsland DSU",
      "Lecture6.cpp: numSimilarGroups",
      "Lecture6.cpp: numIslands2",
      "Lecture8.cpp: minMalwareSpread",
      "Lecture8.cpp: regionsBySlashes",
      "Lecture8.cpp: equationsPossible"
    ],
    recipes: [
      {
        title: "DSU skeleton",
        source: "Lecture4/5/6/8.cpp:dsu",
        steps: [
          "Initialize parent[i] = i.",
          "find/get returns the final parent of a node.",
          "Use path compression: parent[x] = find(parent[x]).",
          "unite(a,b) finds both parents.",
          "If parents are same, return false.",
          "Otherwise merge one parent into the other and return true."
        ],
        remember:
          "unite returning false usually means this edge tried to create a cycle or connect an already connected group."
      },
      {
        title: "Redundant connection",
        source: "Lecture5.cpp:findRedundantConnection",
        steps: [
          "Create DSU with n+1 nodes.",
          "Process edges in input order.",
          "If unite(u,v) succeeds, keep going.",
          "If unite(u,v) fails, this edge is redundant.",
          "Return that edge."
        ],
        remember:
          "For an undirected graph, the first failed union is the cycle edge."
      },
      {
        title: "Smallest equivalent string",
        source: "Lecture5.cpp:smallestEquivalentstring",
        steps: [
          "Create DSU for 26 letters.",
          "Union matching characters from s1 and s2.",
          "When merging, keep the smaller letter as parent.",
          "For every character in baseStr, append its parent letter."
        ],
        remember:
          "Normal DSU can choose any parent; this problem needs the smallest parent."
      },
      {
        title: "Dynamic islands",
        source: "Lecture6.cpp:numIslands2",
        steps: [
          "Start with all water and component count 0.",
          "When an operator adds new land, increase count by 1.",
          "Check four land neighbours.",
          "For every successful union with a neighbour, decrease count by 1.",
          "Append current count after each operator."
        ],
        remember:
          "Adding duplicate land should not change the count."
      },
      {
        title: "Regions by slashes and malware",
        source: "Lecture8.cpp:regionsBySlashes / minMalwareSpread",
        steps: [
          "For regions by slashes, model grid points as DSU nodes.",
          "Connect the outside boundary to node 0.",
          "Each slash tries to connect two boundary points.",
          "A failed union means one new closed region.",
          "For malware, store component size and infected count in the DSU root."
        ],
        remember:
          "DSU can count more than components if the root also stores size, infection count, or other metadata."
      }
    ]
  },
  mst: {
    coverage: [
      "Lecture7.cpp: Krushkal",
      "Lecture7.cpp: Mr. President",
      "Lecture7.cpp: minCostConnectPoints",
      "Lecture7.cpp: Optimize Water Distribution note",
      "Lecture8.cpp: Prim note"
    ],
    recipes: [
      {
        title: "Kruskal MST",
        source: "Lecture7.cpp:Krushkal",
        steps: [
          "Put every edge as {u, v, weight}.",
          "Sort edges by weight.",
          "Create DSU.",
          "Process edges from smallest to largest.",
          "If unite(u,v) succeeds, take the edge into MST.",
          "If unite fails, skip it because it creates a cycle."
        ],
        remember:
          "Kruskal is sorting plus DSU."
      },
      {
        title: "Min cost to connect points",
        source: "Lecture7.cpp:minCostConnectPoints",
        steps: [
          "Build all possible edges between point pairs.",
          "Weight is Manhattan distance.",
          "Sort all edges by weight.",
          "Run Kruskal.",
          "Add weights of accepted edges."
        ],
        remember:
          "This is MST on a complete graph built from points."
      },
      {
        title: "Mr. President budget MST",
        source: "Lecture7.cpp:solve",
        steps: [
          "Build MST with Kruskal and store the weights used.",
          "If MST cannot connect all nodes, answer is -1.",
          "If cost is already within budget, answer is 0.",
          "Otherwise replace the largest used roads by super roads of cost 1.",
          "Count replacements until cost becomes <= budget."
        ],
        remember:
          "First make the cheapest connected network, then reduce the biggest chosen edges."
      }
    ]
  },
  "shortest-paths": {
    coverage: [
      "Lecture8.cpp: Dj",
      "Lecture9.cpp: networkDelayTime",
      "Lecture9.cpp: Bellman-Ford for cheapest flights",
      "Lecture10.cpp: The Maze II",
      "Lecture11.cpp: two Dijkstra runs for special nodes"
    ],
    recipes: [
      {
        title: "Dijkstra using set",
        source: "Lecture8.cpp:Dj",
        steps: [
          "Insert {0, source} into a set or priority queue.",
          "Pick the entry with smallest distance.",
          "If vertex is already visited, skip it.",
          "Mark vertex visited.",
          "For each neighbour, push distance-so-far + edge weight."
        ],
        remember:
          "Dijkstra is for non-negative weights. The smallest pending distance is processed first."
      },
      {
        title: "Network delay time",
        source: "Lecture9.cpp:networkDelayTime",
        steps: [
          "Build a directed weighted graph from times.",
          "Run Dijkstra from source k.",
          "Keep dist array for best known distance.",
          "After Dijkstra, if any vertex is unvisited, return -1.",
          "Otherwise answer is the maximum distance."
        ],
        remember:
          "All nodes must receive the signal; the slowest final distance is the answer."
      },
      {
        title: "Cheapest flights within K stops",
        source: "Lecture9.cpp:findCheapestPrice",
        steps: [
          "Use Bellman-Ford style relaxation.",
          "Run k+1 rounds because k stops means k+1 edges.",
          "Copy old distances into a temporary array each round.",
          "Relax every flight using only previous-round distances.",
          "Stop early if no distance changes."
        ],
        remember:
          "Use a temporary array so one round does not accidentally use more than one new edge."
      },
      {
        title: "The Maze II",
        source: "Lecture10.cpp:shortestDistance",
        steps: [
          "The ball does not move one cell; it rolls until a wall.",
          "Precompute where each cell stops in left, right, up, and down directions.",
          "Run Dijkstra over stopping cells.",
          "Distance added is the number of cells rolled.",
          "Return when destination cell is popped."
        ],
        remember:
          "Maze II is weighted because one move can roll different distances."
      }
    ]
  },
  "advanced-map": {
    coverage: [
      "Lecture11.cpp: KosaRajuAlgo",
      "Lecture11.cpp: reverse graph",
      "Lecture11.cpp: Dijkstra from two sources",
      "Lecture12LastClass.cpp: criticalConnections",
      "Lecture12LastClass.cpp: disc and low arrays"
    ],
    recipes: [
      {
        title: "Kosaraju SCC",
        source: "Lecture11.cpp:KosaRajuAlgo",
        steps: [
          "Run DFS on original graph and push nodes after their DFS finishes.",
          "Reverse every directed edge.",
          "Process nodes in reverse finish order.",
          "Each DFS on the reversed graph prints one strongly connected component."
        ],
        remember:
          "First pass gives finish order; second pass on reversed graph gives SCC groups."
      },
      {
        title: "Critical connections / bridges",
        source: "Lecture12LastClass.cpp:criticalConnections",
        steps: [
          "Build an undirected graph.",
          "During DFS, assign disc[u] and low[u].",
          "For an unvisited child, DFS first, then update low[u] from low[child].",
          "If disc[u] < low[child], edge u-child is a bridge.",
          "For an already visited non-parent child, update low[u] from disc[child]."
        ],
        remember:
          "low[child] tells whether the child subtree can reach an ancestor without using the parent edge."
      },
      {
        title: "Two-source Dijkstra pattern",
        source: "Lecture11.cpp:solve",
        steps: [
          "Run Dijkstra once from friend's location.",
          "Run Dijkstra once from your location.",
          "Loop over all special nodes.",
          "Keep only special nodes reachable by both sources and within the required limit.",
          "Minimize DistFriend[special] + DistYou[special]."
        ],
        remember:
          "When a problem asks to meet at a special node, precompute distance from each important source."
      }
    ]
  }
};

const lessonPseudoGuides = {
  "graph-basics": {
    coverage: [
      "Lecture1.cpp: addEdge",
      "Lecture1.cpp: display",
      "Lecture1.cpp: removeEdge",
      "Lecture1.cpp: removeVtx"
    ],
    blocks: [
      {
        title: "addEdge for undirected weighted graph",
        source: "Lecture1.cpp:addEdge",
        code: `function addEdge(adj, u, v, w):
    adj[u].push({v, w})
    adj[v].push({u, w})`
      },
      {
        title: "display graph",
        source: "Lecture1.cpp:display",
        code: `function display(adj):
    for u from 0 to V - 1:
        print u
        for each edge in adj[u]:
            print edge.neighbour, edge.weight`
      },
      {
        title: "removeEdge for undirected graph",
        source: "Lecture1.cpp:removeEdge",
        code: `function removeEdge(adj, u, v):
    find v inside adj[u]
    erase v from adj[u]

    find u inside adj[v]
    erase u from adj[v]`
      },
      {
        title: "remove vertex",
        source: "Lecture1.cpp:removeVtx",
        code: `function removeVtx(adj, u):
    while adj[u] is not empty:
        edge = last edge of adj[u]
        remove edge u-edge.neighbour
        remove reverse edge edge.neighbour-u`
      }
    ]
  },
  "dfs-backtracking": {
    coverage: [
      "Lecture1.cpp: hasPathHelper",
      "Lecture1.cpp: TotalPaths",
      "Lecture1.cpp: preorder",
      "Lecture1.cpp: HeavyPath",
      "Lecture1.cpp: HamiltonPaths",
      "Lecture2.cpp: GetConnectedComponents"
    ],
    blocks: [
      {
        title: "hasPath DFS",
        source: "Lecture1.cpp:hasPathHelper",
        code: `function hasPath(src, dest):
    if src == dest:
        return true

    visited[src] = true

    for each edge in adj[src]:
        nbr = edge.neighbour
        if visited[nbr] == false:
            if hasPath(nbr, dest) == true:
                return true

    return false`
      },
      {
        title: "count all paths DFS",
        source: "Lecture1.cpp:TotalPaths",
        code: `function countPaths(src, dest):
    if src == dest:
        ans = ans + 1
        return

    visited[src] = true

    for each edge in adj[src]:
        nbr = edge.neighbour
        if visited[nbr] == false:
            countPaths(nbr, dest)

    visited[src] = false`
      },
      {
        title: "preorder DFS",
        source: "Lecture1.cpp:preorder",
        code: `function preorder(src, path, cost):
    visited[src] = true
    path = path + src
    print src, path, cost

    for each edge in adj[src]:
        nbr = edge.neighbour
        wt = edge.weight
        if visited[nbr] == false:
            preorder(nbr, path, cost + wt)

    visited[src] = false`
      },
      {
        title: "heaviest path",
        source: "Lecture1.cpp:HeavyPath",
        code: `function heaviestPath(src, dest, path, weight):
    if src == dest:
        if weight > bestWeight:
            bestWeight = weight
            bestPath = path
        return

    visited[src] = true

    for each edge in adj[src]:
        nbr = edge.neighbour
        wt = edge.weight
        if visited[nbr] == false:
            heaviestPath(nbr, dest, path + nbr, weight + wt)

    visited[src] = false`
      },
      {
        title: "connected components",
        source: "Lecture2.cpp:GetConnectedComponents",
        code: `function countComponents():
    visited = false for all vertices
    components = 0

    for i from 0 to n - 1:
        if visited[i] == false:
            dfs(i)
            components = components + 1

    return components`
      }
    ]
  },
  "grid-graphs": {
    coverage: [
      "Lecture2.cpp: numIslands",
      "Lecture2.cpp: maxAreaOfIsland",
      "Lecture2.cpp: islandPerimeter",
      "Lecture2.cpp: Surrounded Regions",
      "Lecture3.cpp: numberofDistinctIslands",
      "Lecture6.cpp: countSubIslands"
    ],
    blocks: [
      {
        title: "number of islands",
        source: "Lecture2.cpp:numIslands",
        code: `function numIslands(grid):
    count = 0

    for every cell (i, j):
        if grid[i][j] == '1':
            dfs(i, j)
            count = count + 1

    return count

function dfs(x, y):
    grid[x][y] = '0'

    for each direction:
        nx = x + direction.x
        ny = y + direction.y
        if inside(nx, ny) and grid[nx][ny] == '1':
            dfs(nx, ny)`
      },
      {
        title: "max area of island",
        source: "Lecture2.cpp:maxAreaOfIsland",
        code: `function maxArea(grid):
    ans = 0

    for every cell (i, j):
        if grid[i][j] == 1:
            temp = 0
            dfs(i, j)
            ans = max(ans, temp)

    return ans

function dfs(x, y):
    grid[x][y] = 0
    temp = temp + 1
    call dfs on all valid land neighbours`
      },
      {
        title: "island perimeter",
        source: "Lecture2.cpp:islandPerimeter",
        code: `function islandPerimeter(grid):
    ans = 0

    for every cell (i, j):
        if grid[i][j] == 1:
            if up is outside or water: ans++
            if down is outside or water: ans++
            if left is outside or water: ans++
            if right is outside or water: ans++

    return ans`
      },
      {
        title: "surrounded regions",
        source: "Lecture2.cpp:solve",
        code: `function solve(board):
    for every boundary cell:
        if board[cell] == 'O':
            dfs(cell)

    for every cell:
        if board[cell] == 'O':
            board[cell] = 'X'
        else if board[cell] == 'T':
            board[cell] = 'O'

function dfs(x, y):
    board[x][y] = 'T'
    call dfs on all valid neighbour cells containing 'O'`
      },
      {
        title: "distinct islands",
        source: "Lecture3.cpp:numberofDistinctIslands",
        code: `function distinctIslands(grid):
    set = empty

    for every land cell:
        call = ""
        dfs(cell, call)
        insert call into set

    return set.size

function dfs(x, y, call):
    grid[x][y] = 0
    for direction index i:
        if neighbour is land:
            call += i
            dfs(neighbour, call)
    call += "b"`
      }
    ]
  },
  "bfs-levels": {
    coverage: [
      "Lecture3.cpp: BFS_without_cycle",
      "Lecture3.cpp: orangesRotting",
      "Lecture3.cpp: shortestPathBinaryMatrix",
      "Lecture3.cpp: updateMatrix",
      "Lecture8.cpp: numBusesToDestination"
    ],
    blocks: [
      {
        title: "BFS without cycle detection",
        source: "Lecture3.cpp:BFS_without_cycle",
        code: `function BFS(src):
    queue.push(src)
    visited[src] = true
    level = 0

    while queue is not empty:
        size = queue.size

        repeat size times:
            front = queue.pop()
            print front at current level

            for each nbr of front:
                if visited[nbr] == false:
                    visited[nbr] = true
                    queue.push(nbr)

        level = level + 1`
      },
      {
        title: "rotting oranges",
        source: "Lecture3.cpp:orangesRotting",
        code: `function orangesRotting(grid):
    push all rotten oranges into queue
    time = -1

    while queue is not empty:
        size = queue.size
        time = time + 1

        repeat size times:
            orange = queue.pop()
            for each 4-direction neighbour:
                if neighbour is fresh:
                    neighbour = rotten
                    queue.push(neighbour)

    if any fresh orange remains:
        return -1
    return time`
      },
      {
        title: "shortest path in binary matrix",
        source: "Lecture3.cpp:shortestPathBinaryMatrix",
        code: `function shortestPathBinaryMatrix(grid):
    if start blocked or end blocked:
        return -1

    queue.push(start)
    level = 1

    while queue is not empty:
        size = queue.size

        repeat size times:
            cell = queue.pop()
            if cell is destination:
                return level
            mark cell blocked
            push all valid 8-direction zero neighbours

        level = level + 1

    return -1`
      },
      {
        title: "01 matrix",
        source: "Lecture3.cpp:updateMatrix",
        code: `function updateMatrix(mat):
    push all zero cells into queue
    level = 0

    while queue is not empty:
        size = queue.size

        repeat size times:
            cell = queue.pop()
            for each 4-direction neighbour:
                if neighbour value is 1:
                    neighbour value = 0
                    ans[neighbour] = level + 1
                    queue.push(neighbour)

        level = level + 1`
      }
    ]
  },
  "adjacency-operations": {
    coverage: [
      "Lecture3.cpp: BFS",
      "Lecture3.cpp: isBipartite",
      "Lecture4.cpp: KahnsAlgo",
      "Lecture5.cpp: isCycle",
      "Lecture5.cpp: findRedundantConnection"
    ],
    blocks: [
      {
        title: "cycle detection using BFS pop",
        source: "Lecture3.cpp:BFS",
        code: `function BFS_cycle(src):
    queue.push(src)

    while queue is not empty:
        front = queue.pop()

        if visited[front] == true:
            cycle found
            continue

        visited[front] = true

        for each nbr of front:
            if visited[nbr] == false:
                queue.push(nbr)`
      },
      {
        title: "directed cycle detection",
        source: "Lecture5.cpp:isCycle",
        code: `state values:
    0 = unvisited
    1 = current recursion path
    2 = processed

function dfs(u):
    state[u] = 1

    for each v in graph[u]:
        if state[v] == 0:
            dfs(v)
        else if state[v] == 1:
            cycle found

    state[u] = 2`
      },
      {
        title: "cycle detection using DSU",
        source: "Lecture5.cpp:findRedundantConnection",
        code: `function redundantConnection(edges):
    initialize DSU

    for each edge (u, v):
        if union(u, v) == false:
            return edge`
      },
      {
        title: "cycle detection using Kahn",
        source: "Lecture4.cpp:KahnsAlgo",
        code: `function hasCycleDirected(graph):
    calculate indegree
    push all nodes with indegree 0
    processed = 0

    while queue is not empty:
        u = queue.pop()
        processed++

        for each v in graph[u]:
            indegree[v]--
            if indegree[v] == 0:
                queue.push(v)

    return processed < n`
      },
      {
        title: "bipartite odd cycle check",
        source: "Lecture3.cpp:isBipartite",
        code: `function isBipartite(graph):
    color = 0 for all nodes

    for each uncolored node:
        queue.push(node)
        expectedColor = 1

        BFS level by level:
            if node already colored with different color:
                return false
            color[node] = expectedColor
            push uncolored neighbours
            flip expectedColor between 1 and 2

    return true`
      }
    ]
  },
  "directed-order": {
    coverage: [
      "Lecture4.cpp: topologicalSort",
      "Lecture4.cpp: KahnsAlgo",
      "Lecture4.cpp: canFinish",
      "Lecture4.cpp: findOrder"
    ],
    blocks: [
      {
        title: "DFS topological sort",
        source: "Lecture4.cpp:topologicalSort",
        code: `function topoDFS(u):
    visited[u] = true

    for each v in graph[u]:
        if visited[v] == false:
            topoDFS(v)

    add u to answer`
      },
      {
        title: "Kahn topological sort",
        source: "Lecture4.cpp:KahnsAlgo",
        code: `function kahn(graph):
    calculate indegree
    push all nodes with indegree 0

    while queue is not empty:
        u = queue.pop()
        ans.push(u)

        for each v in graph[u]:
            indegree[v]--
            if indegree[v] == 0:
                queue.push(v)

    if ans.size < n:
        cycle exists`
      },
      {
        title: "course schedule",
        source: "Lecture4.cpp:canFinish",
        code: `function canFinish(n, prerequisites):
    build directed graph
    run Kahn algorithm

    if processed nodes == n:
        return true
    else:
        return false`
      }
    ]
  },
  dsu: {
    coverage: [
      "Lecture4.cpp: dsu",
      "Lecture5.cpp: findRedundantConnection",
      "Lecture5.cpp: smallestEquivalentstring",
      "Lecture6.cpp: numIslands2",
      "Lecture8.cpp: equationsPossible"
    ],
    blocks: [
      {
        title: "DSU parent and find",
        source: "Lecture4/5/6/8.cpp:dsu",
        code: `function init(n):
    for i from 0 to n - 1:
        parent[i] = i
        size[i] = 1

function find(x):
    if parent[x] == x:
        return x
    parent[x] = find(parent[x])
    return parent[x]`
      },
      {
        title: "union",
        source: "Lecture4/5/6/8.cpp:unite",
        code: `function union(a, b):
    pa = find(a)
    pb = find(b)

    if pa == pb:
        return false

    parent[pa] = pb
    size[pb] = size[pb] + size[pa]
    return true`
      },
      {
        title: "smallest equivalent string",
        source: "Lecture5.cpp:smallestEquivalentstring",
        code: `function smallestEquivalentString(s1, s2, baseStr):
    initialize DSU for 26 letters

    for i from 0 to s1.length - 1:
        union(s1[i], s2[i])
        smaller parent must remain root

    ans = ""
    for ch in baseStr:
        ans += find(ch)

    return ans`
      },
      {
        title: "number of islands 2",
        source: "Lecture6.cpp:numIslands2",
        code: `function numIslands2(operators):
    grid = all water
    count = 0

    for each position in operators:
        if position already land:
            ans.push(count)
            continue

        mark position land
        count++

        for each land neighbour:
            if union(position, neighbour) == true:
                count--

        ans.push(count)`
      }
    ]
  },
  mst: {
    coverage: [
      "Lecture7.cpp: Krushkal",
      "Lecture7.cpp: Mr. President",
      "Lecture7.cpp: minCostConnectPoints"
    ],
    blocks: [
      {
        title: "Kruskal MST",
        source: "Lecture7.cpp:Krushkal",
        code: `function kruskal(edges):
    sort edges by weight
    initialize DSU
    mst = empty

    for each edge (u, v, w):
        if union(u, v) == true:
            mst.push(edge)

    return mst`
      },
      {
        title: "min cost connect points",
        source: "Lecture7.cpp:minCostConnectPoints",
        code: `function minCostConnectPoints(points):
    edges = empty

    for every pair of points i, j:
        w = manhattanDistance(i, j)
        edges.push({i, j, w})

    sort edges by weight
    run Kruskal
    return sum of selected weights`
      },
      {
        title: "Mr President",
        source: "Lecture7.cpp:solve",
        code: `function mrPresident(n, edges, budget):
    build MST using Kruskal
    store weights selected in MST

    if graph is not connected:
        return -1

    sort selected weights
    changes = 0

    while cost > budget and weights not empty:
        replace largest selected weight by 1
        changes++

    if cost <= budget:
        return changes
    return -1`
      }
    ]
  },
  "shortest-paths": {
    coverage: [
      "Lecture8.cpp: Dj",
      "Lecture9.cpp: networkDelayTime",
      "Lecture9.cpp: findCheapestPrice",
      "Lecture10.cpp: shortestDistance"
    ],
    blocks: [
      {
        title: "Dijkstra",
        source: "Lecture8.cpp:Dj",
        code: `function dijkstra(source):
    dist[source] = 0
    set.insert({0, source})

    while set is not empty:
        {cost, u} = set.removeSmallest()

        if visited[u]:
            continue

        visited[u] = true

        for each edge u-v with weight w:
            if visited[v] == false:
                set.insert({cost + w, v})`
      },
      {
        title: "Dijkstra with distance array",
        source: "Lecture9.cpp:networkDelayTime",
        code: `function networkDelay(times, source):
    build directed weighted graph
    dist[source] = 0
    set.insert({0, source})

    while set is not empty:
        {cost, u} = set.removeSmallest()
        if visited[u]: continue
        visited[u] = true

        for each edge u-v with weight w:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                set.insert({dist[v], v})

    if any node unvisited: return -1
    return max(dist)`
      },
      {
        title: "Bellman Ford for K stops",
        source: "Lecture9.cpp:findCheapestPrice",
        code: `function cheapestFlight(V, flights, src, dst, k):
    dist[src] = 0

    repeat k + 1 times:
        next = copy of dist

        for each flight u-v with price w:
            if dist[u] is not infinity:
                next[v] = min(next[v], dist[u] + w)

        dist = next

    if dist[dst] is infinity: return -1
    return dist[dst]`
      },
      {
        title: "Maze II",
        source: "Lecture10.cpp:shortestDistance",
        code: `function shortestDistance(maze, start, destination):
    precompute stopping cell for every cell in 4 directions
    set.insert({0, start})

    while set is not empty:
        {dist, cell} = set.removeSmallest()
        if visited[cell]: continue
        visited[cell] = true

        if cell == destination:
            return dist

        for each direction:
            nextCell = precomputedStop[cell][direction]
            steps = distance between cell and nextCell
            set.insert({dist + steps, nextCell})

    return -1`
      }
    ]
  },
  "advanced-map": {
    coverage: [
      "Lecture11.cpp: KosaRajuAlgo",
      "Lecture11.cpp: two Dijkstra runs",
      "Lecture12LastClass.cpp: criticalConnections"
    ],
    blocks: [
      {
        title: "Kosaraju SCC",
        source: "Lecture11.cpp:KosaRajuAlgo",
        code: `function kosaraju(graph):
    visited = false for all nodes
    order = empty

    for each node:
        if not visited:
            dfs1(node)

    reverse all edges
    visited = false for all nodes

    for node in reverse(order):
        if not visited[node]:
            dfs2(node)
            print one SCC

function dfs1(u):
    visited[u] = true
    call dfs1 on unvisited neighbours
    order.push(u)`
      },
      {
        title: "critical connections",
        source: "Lecture12LastClass.cpp:criticalConnections",
        code: `function bridges(graph):
    time = 1
    disc = 0 for all nodes
    low = 0 for all nodes

    for each unvisited node:
        dfs(node, parent = -1)

function dfs(u, parent):
    visited[u] = true
    disc[u] = low[u] = time
    time++

    for each child in graph[u]:
        if child == parent:
            continue

        if child not visited:
            dfs(child, u)
            low[u] = min(low[u], low[child])

            if disc[u] < low[child]:
                edge u-child is bridge
        else:
            low[u] = min(low[u], disc[child])`
      },
      {
        title: "two-source Dijkstra",
        source: "Lecture11.cpp:solve",
        code: `function solve():
    run dijkstra(friendSource)
    run dijkstra(yourSource)

    ans = infinity

    for each special node:
        if both distances exist and yourDistance < limit:
            ans = min(ans, friendDistance + yourDistance)

    if ans is infinity: print -1
    else print ans`
      }
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
  lc785: {
    name: "LeetCode 785 - Is Graph Bipartite?",
    idea: "Use BFS coloring; a color conflict means an odd cycle.",
    level: "medium"
  },
  lc886: {
    name: "LeetCode 886 - Possible Bipartition",
    idea: "Build an undirected dislike graph and run bipartite BFS.",
    level: "medium"
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
  lc785: {
    pattern: "BFS coloring",
    steps: [
      "Start from every unvisited component.",
      "Give the start vertex color 1.",
      "BFS level by level and give neighbours the opposite color.",
      "If a visited vertex appears with a different expected color, return false."
    ],
    stuck: "Think in two sets. Every edge must go from set A to set B, never inside the same set.",
    code: "if color[v] already exists and color[v] != expected: return false"
  },
  lc886: {
    pattern: "Build graph, then bipartite BFS",
    steps: [
      "Convert dislikes into an undirected graph.",
      "Run BFS coloring from every unvisited person.",
      "People at the same BFS level get the same color.",
      "If any dislike edge connects same color, bipartition is impossible."
    ],
    stuck: "The dislikes list is the edge list. The two groups are just bipartite colors.",
    code: "graph[a].push(b); graph[b].push(a); then color BFS"
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
    </div>

    ${renderPseudocodeGuide(lesson)}

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

function renderPseudocodeGuide(lesson) {
  const guide = lessonPseudoGuides[lesson.id];
  if (!guide) return "";

  return `
    <section class="pseudo-guide">
      <div class="coverage-box">
        <strong>RajneeshSirGraph source</strong>
        <div class="coverage-list">
          ${guide.coverage.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </div>

      <div class="pseudo-list">
        ${guide.blocks
          .map(
            (block) => `
              <article class="pseudo-card">
                <header>
                  <span>${escapeHtml(block.source)}</span>
                  <h4>${escapeHtml(block.title)}</h4>
                </header>
                <pre><code>${escapeHtml(block.code)}</code></pre>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
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
