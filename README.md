# GraphLearn

GraphLearn is a beginner-first graph learning UI based on the
`RajneeshSirGraph` material from
[varshney565/Graph](https://github.com/varshney565/Graph/tree/main/RajneeshSirGraph).

The app is intentionally dependency-free. Open `index.html` directly in a
browser, or serve the folder with any static server.

## What It Teaches

- Graph vocabulary: vertices, edges, weights, direction, components
- Adjacency-list operations: add, display, remove edge, remove vertex
- DFS, path search, backtracking, heaviest path, Hamiltonian path intuition
- Grid-as-graph patterns for island-style problems
- BFS levels for unweighted shortest paths and multi-source searches
- Directed graphs, cycle detection, topological sort, and Kahn's algorithm
- DSU for components, cycle detection, and dynamic connectivity
- MST with Kruskal and Prim intuition
- Weighted shortest paths with Dijkstra and Bellman-Ford style relaxation
- Advanced map: SCC, bridges, maze variants, and premium problem patterns
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
