"use strict";

window.lessonTeachingGuides = {
  "graph-basics": {
    coverage: ["Lecture1.cpp: addEdge", "Lecture1.cpp: display", "Lecture1.cpp: removeEdge"],
    blocks: [
      {
        title: "Adjacency list",
        source: "Lecture1.cpp",
        intuition:
          "Every vertex stores only its direct neighbours. If the graph is weighted, store neighbour and weight together.",
        code: `// graph[u] stores all direct neighbours of u
vector<vector<pair<int, int>>> graph(n);

void addEdge(int u, int v, int w) {
    graph[u].push_back({v, w}); // u -> v
    graph[v].push_back({u, w}); // v -> u because graph is undirected
}`
      },
      {
        title: "Display graph",
        source: "Lecture1.cpp",
        intuition:
          "Display is a debugging step. Use it to check whether every neighbour and weight was inserted correctly.",
        code: `void display() {
    for (int u = 0; u < n; u++) {
        cout << u << " -> ";

        for (auto edge : graph[u]) {
            int v = edge.first;   // neighbour
            int w = edge.second;  // weight
            cout << "(" << v << ", " << w << ") ";
        }

        cout << "\\n";
    }
}`
      },
      {
        title: "Remove edge",
        source: "Lecture1.cpp",
        intuition:
          "In an undirected graph one edge is stored twice, so deletion also happens twice.",
        code: `void removeEdge(int u, int v) {
    // remove v from u's list
    erase neighbour v from graph[u];

    // remove u from v's list
    erase neighbour u from graph[v];
}`
      }
    ]
  },
  "dfs-backtracking": {
    coverage: ["Lecture1.cpp: hasPathHelper", "Lecture1.cpp: TotalPaths", "Lecture2.cpp: GetConnectedComponents"],
    blocks: [
      {
        title: "DFS for hasPath",
        source: "Lecture1.cpp",
        intuition:
          "DFS goes as deep as possible from the current vertex. For hasPath, the moment destination is found, return true.",
        code: `bool hasPath(int src, int dest) {
    if (src == dest) return true; // base case

    visited[src] = true; // mark current vertex

    for (auto edge : graph[src]) {
        int nbr = edge.first;

        // call DFS only on unvisited neighbours
        if (!visited[nbr]) {
            if (hasPath(nbr, dest)) {
                return true;
            }
        }
    }

    return false; // no path found from this side
}`
      },
      {
        title: "DFS for all paths",
        source: "Lecture1.cpp",
        intuition:
          "For all paths, one vertex can be part of many different candidate paths. That is why we unmark while returning.",
        code: `void allPaths(int src, int dest) {
    if (src == dest) {
        ans++;
        return;
    }

    visited[src] = true;

    for (auto edge : graph[src]) {
        int nbr = edge.first;
        if (!visited[nbr]) {
            allPaths(nbr, dest);
        }
    }

    // backtracking: allow src in another path
    visited[src] = false;
}`
      },
      {
        title: "Connected components",
        source: "Lecture2.cpp",
        intuition:
          "One DFS covers one connected component. If the graph is disconnected, loop over every vertex and start DFS from each unvisited one.",
        code: `int connectedComponents() {
    int components = 0;

    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i);       // marks one full component
            components++; // count that component
        }
    }

    return components;
}`
      }
    ]
  },
  "grid-graphs": {
    coverage: ["Lecture2.cpp: grid DFS", "Lecture3.cpp: distinct island DFS", "Lecture6.cpp: sub-island DFS"],
    blocks: [
      {
        title: "DFS on grid",
        source: "Lecture2.cpp",
        intuition:
          "A grid cell is a vertex. Its neighbours are generated with direction arrays instead of an adjacency list.",
        code: `int dir[4][2] = {{1,0}, {-1,0}, {0,1}, {0,-1}};

void dfs(int r, int c) {
    grid[r][c] = 0; // mark visited

    for (int k = 0; k < 4; k++) {
        int nr = r + dir[k][0];
        int nc = c + dir[k][1];

        // valid unvisited neighbour
        if (inside(nr, nc) && grid[nr][nc] == 1) {
            dfs(nr, nc);
        }
    }
}`
      },
      {
        title: "Boundary DFS",
        source: "Lecture2.cpp",
        intuition:
          "When outside-connected cells matter, start from the boundary. Anything not reached from boundary is trapped inside.",
        code: `for (each boundary cell) {
    if (grid[cell] == 'O') {
        dfs(cell); // mark safe cells as T
    }
}

for (each cell) {
    if (grid[cell] == 'O') grid[cell] = 'X'; // trapped
    if (grid[cell] == 'T') grid[cell] = 'O'; // safe
}`
      },
      {
        title: "Shape DFS",
        source: "Lecture3.cpp",
        intuition:
          "To compare island shapes, record DFS movement. Add a backtrack marker so different shapes do not look the same.",
        code: `void dfs(int r, int c, string &shape) {
    grid[r][c] = 0;

    for (int k = 0; k < 4; k++) {
        int nr = r + dir[k][0];
        int nc = c + dir[k][1];

        if (inside(nr, nc) && grid[nr][nc] == 1) {
            shape += to_string(k); // move direction
            dfs(nr, nc, shape);
        }
    }

    shape += "b"; // backtrack marker
}`
      }
    ]
  },
  "bfs-levels": {
    coverage: ["Lecture3.cpp: BFS", "Lecture3.cpp: multi-source BFS", "Lecture8.cpp: bus routes BFS"],
    blocks: [
      {
        title: "BFS level order",
        source: "Lecture3.cpp",
        intuition:
          "BFS processes nearest vertices first. The current queue size is one full level.",
        code: `void bfs(int src) {
    queue<int> q;
    q.push(src);
    visited[src] = true; // mark on push

    int level = 0;

    while (!q.empty()) {
        int size = q.size(); // current level count

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

        level++;
    }
}`
      },
      {
        title: "Multi-source BFS",
        source: "Lecture3.cpp",
        intuition:
          "If many cells or nodes start together, push all of them first. They all belong to level 0.",
        code: `queue<Cell> q;

for (each cell) {
    if (cell is source) {
        q.push(cell);
        mark visited;
    }
}

while (!q.empty()) {
    int size = q.size();

    while (size--) {
        Cell cur = q.front();
        q.pop();

        // push valid neighbours for next level
    }
}`
      }
    ]
  },
  "adjacency-operations": {
    coverage: ["Lecture3.cpp: BFS cycle", "Lecture5.cpp: directed cycle", "Lecture5.cpp: DSU cycle", "Lecture4.cpp: Kahn cycle"],
    blocks: [
      {
        title: "Undirected cycle using BFS",
        source: "Lecture3.cpp",
        intuition:
          "This version marks on pop. If a vertex comes out of the queue already visited, another path reached it.",
        code: `void bfsCycle(int src) {
    queue<int> q;
    q.push(src);

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        if (visited[u]) {
            // cycle detected
            continue;
        }

        visited[u] = true;

        for (int v : graph[u]) {
            if (!visited[v]) q.push(v);
        }
    }
}`
      },
      {
        title: "Directed cycle using states",
        source: "Lecture5.cpp",
        intuition:
          "In directed graphs, cycle means reaching a node already present in the current recursion path.",
        code: `// 0 = unvisited, 1 = in current path, 2 = done
bool dfs(int u) {
    state[u] = 1;

    for (int v : graph[u]) {
        if (state[v] == 1) return true; // back edge
        if (state[v] == 0 && dfs(v)) return true;
    }

    state[u] = 2;
    return false;
}`
      },
      {
        title: "Cycle using DSU",
        source: "Lecture5.cpp",
        intuition:
          "If union fails, both endpoints were already connected. Adding this edge creates an undirected cycle.",
        code: `for (auto edge : edges) {
    int u = edge[0];
    int v = edge[1];

    if (unite(u, v) == false) {
        return edge; // redundant edge
    }
}`
      }
    ]
  },
  "directed-order": {
    coverage: ["Lecture4.cpp: topologicalSort", "Lecture4.cpp: KahnsAlgo"],
    blocks: [
      {
        title: "DFS topological sort",
        source: "Lecture4.cpp",
        intuition:
          "Add a node to the answer only after all nodes reachable from it are finished.",
        code: `void topoDfs(int u) {
    visited[u] = true;

    for (int v : graph[u]) {
        if (!visited[v]) topoDfs(v);
    }

    order.push_back(u); // postorder
}`
      },
      {
        title: "Kahn algorithm",
        source: "Lecture4.cpp",
        intuition:
          "A node with indegree 0 has no pending dependency. Remove it, then reduce indegree of its children.",
        code: `queue<int> q;

for (int i = 0; i < n; i++) {
    if (indegree[i] == 0) q.push(i);
}

while (!q.empty()) {
    int u = q.front();
    q.pop();
    order.push_back(u);

    for (int v : graph[u]) {
        indegree[v]--;
        if (indegree[v] == 0) q.push(v);
    }
}`
      }
    ]
  },
  dsu: {
    coverage: ["Lecture4.cpp: dsu", "Lecture5.cpp: dsu", "Lecture6.cpp: dsu"],
    blocks: [
      {
        title: "find",
        source: "Lecture4.cpp",
        intuition:
          "find returns the leader of a set. Path compression makes future find calls faster.",
        code: `int find(int x) {
    if (parent[x] == x) return x;

    parent[x] = find(parent[x]); // path compression
    return parent[x];
}`
      },
      {
        title: "union",
        source: "Lecture4.cpp",
        intuition:
          "Union merges two sets only when their leaders are different.",
        code: `bool unite(int a, int b) {
    int pa = find(a);
    int pb = find(b);

    if (pa == pb) return false; // already connected

    parent[pa] = pb;
    size[pb] += size[pa]; // optional
    return true;
}`
      }
    ]
  },
  mst: {
    coverage: ["Lecture7.cpp: Krushkal"],
    blocks: [
      {
        title: "Kruskal",
        source: "Lecture7.cpp",
        intuition:
          "Sort edges by weight. Add an edge only if DSU says it connects two different components.",
        code: `sort(edges by weight);

for (auto edge : edges) {
    if (unite(edge.u, edge.v)) {
        // accepted edge, no cycle formed
        mstCost += edge.w;
    }
}`
      }
    ]
  },
  "shortest-paths": {
    coverage: ["Lecture8.cpp: Dijkstra", "Lecture9.cpp: Bellman Ford"],
    blocks: [
      {
        title: "Dijkstra",
        source: "Lecture8.cpp",
        intuition:
          "When weights are non-negative, the smallest pending distance is safe to process first.",
        code: `set<pair<int, int>> pq; // {distance, node}
pq.insert({0, source});
dist[source] = 0;

while (!pq.empty()) {
    auto [cost, u] = *pq.begin();
    pq.erase(pq.begin());

    if (visited[u]) continue;
    visited[u] = true;

    for (auto edge : graph[u]) {
        int v = edge.first;
        int w = edge.second;

        if (cost + w < dist[v]) {
            dist[v] = cost + w;
            pq.insert({dist[v], v});
        }
    }
}`
      },
      {
        title: "Bellman Ford style",
        source: "Lecture9.cpp",
        intuition:
          "Relax all edges round by round. With limited stops, each round allows one more edge.",
        code: `dist[src] = 0;

for (int round = 1; round <= allowedEdges; round++) {
    vector<int> next = dist; // copy old distances

    for (auto edge : edges) {
        if (dist[edge.u] != INF) {
            next[edge.v] = min(next[edge.v], dist[edge.u] + edge.w);
        }
    }

    dist = next;
}`
      }
    ]
  },
  "advanced-map": {
    coverage: ["Lecture11.cpp: Kosaraju", "Lecture12LastClass.cpp: criticalConnections"],
    blocks: [
      {
        title: "Kosaraju",
        source: "Lecture11.cpp",
        intuition:
          "First DFS creates finish order. Reverse the graph, then process nodes in reverse finish order to get SCCs.",
        code: `// pass 1
dfs on original graph;
push node after children finish;

reverse all edges;
clear visited;

// pass 2
for (node in reverse(finishOrder)) {
    if (!visited[node]) {
        dfs on reversed graph; // one SCC
    }
}`
      },
      {
        title: "Bridge",
        source: "Lecture12LastClass.cpp",
        intuition:
          "If child subtree cannot reach u or any ancestor of u, edge u-child is a bridge.",
        code: `void dfs(int u, int parent) {
    disc[u] = low[u] = time++;

    for (int child : graph[u]) {
        if (child == parent) continue;

        if (!visited[child]) {
            dfs(child, u);
            low[u] = min(low[u], low[child]);

            if (low[child] > disc[u]) {
                // u-child is a bridge
            }
        } else {
            low[u] = min(low[u], disc[child]);
        }
    }
}`
      }
    ]
  }
};
