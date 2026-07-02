# GraphLearn

GraphLearn is a beginner-first graph learning UI based on the
`RajneeshSirGraph` material from
[varshney565/Graph](https://github.com/varshney565/Graph/tree/main/RajneeshSirGraph).

The app is intentionally dependency-free. Open `index.html` directly in a
browser, or serve the folder with any static server.

## What It Teaches

- Graph representation: adjacency list, add edge, display, remove edge, remove vertex
- DFS on graph: mark visited, visit unvisited neighbours, backtrack when needed
- DFS on grid: islands, surrounded regions, distinct islands, enclaves, sub-islands
- BFS and levels: normal BFS, multi-source BFS, shortest unweighted grid paths
- Cycle detection: BFS repeated pop, directed DFS states, DSU failed union, Kahn count
- Topological sort: DFS topo, Kahn's algorithm, course schedule, course order
- DSU for components, cycle detection, and dynamic connectivity
- MST with Kruskal and Prim intuition
- Weighted shortest paths with Dijkstra and Bellman-Ford style relaxation
- Advanced map: SCC, bridges, maze variants, and premium problem patterns
- Source-faithful RajneeshSirGraph recipes for the lecture functions
- Expandable "Stuck? Show solution path" guides for every practice card

## Files

- `index.html` - app shell
- `src/styles.css` - responsive UI styling
- `src/app.js` - lesson data, quizzes, graph rendering, algorithm steppers
- `docs/source-map.md` - how the lessons map back to the original lectures

## Local Run

Open:

```text
index.html
```

Optional static server:

```bash
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

## GitHub Pages

Because this is a static app, it can be published from the repository root with
GitHub Pages.
