# Source Map

This project uses the public `RajneeshSirGraph` folder as the source syllabus:

<https://github.com/varshney565/Graph/tree/main/RajneeshSirGraph>

## Lesson Mapping

| GraphLearn lesson | Original source | Main ideas |
| --- | --- | --- |
| Graph Representation | `Lecture1.cpp` | weighted adjacency list, add edge, display, remove edge, remove vertex |
| DFS On Graph | `Lecture1.cpp`, `Lecture2.cpp` | mark visited, visit unvisited neighbours, connected components, all paths, preorder, heaviest path, Hamiltonian paths |
| DFS On Grid | `Lecture2.cpp`, `Lecture3.cpp`, `Lecture6.cpp` | islands, max area, perimeter, surrounded regions, distinct islands, sub-islands |
| BFS And Levels | `Lecture3.cpp`, `Lecture8.cpp` | BFS with and without cycle checks, rotting oranges, shortest binary matrix, 01 matrix, bus routes |
| Cycle Detection | `Lecture3.cpp`, `Lecture4.cpp`, `Lecture5.cpp`, `Lecture8.cpp` | BFS repeated pop, bipartite coloring, directed DFS states, DSU union failure, Kahn processed count |
| Topological Sort | `Lecture4.cpp` | DFS topological sort, Kahn's algorithm, course schedule, course order |
| Disjoint Set Union | `Lecture4.cpp`, `Lecture5.cpp`, `Lecture6.cpp`, `Lecture8.cpp` | union-find, components, redundant connection, smallest equivalent string, dynamic islands, regions by slashes |
| Minimum Spanning Tree | `Lecture7.cpp`, `Lecture8.cpp` | Kruskal, Prim intuition, water distribution, connect points, budgeted MST |
| Weighted Shortest Paths | `Lecture8.cpp`, `Lecture9.cpp`, `Lecture10.cpp`, `Lecture11.cpp`, `Lecture12LastClass.cpp` | Dijkstra, Bellman-Ford relaxation, network delay, cheapest flights, maze variants, minimum effort path |
| Advanced Pattern Map | `Lecture11.cpp`, `Lecture12LastClass.cpp`, `PremiumQuestions` | Kosaraju SCC, bridges, mother vertex, critical connections, premium graph practice |

## Teaching Choices

The source code is lecture-style C++ and assumes the learner already has some
graph comfort. GraphLearn keeps the same topic progression, but rewrites it as a
beginner course with:

- short intuition for each algorithm,
- commented C++-style templates for RajneeshSirGraph functions such as
  `hasPathHelper`, `TotalPaths`, `BFS_without_cycle`, `KahnsAlgo`, DSU,
  Kruskal, Dijkstra, Kosaraju, and bridges,
- problem-specific code shapes kept inside expandable practice hints,
- a visual stepper for DFS, BFS, Dijkstra, Kahn, and Kruskal,
- lesson-specific quizzes,
- practice problem cards grouped by topic,
- expandable solution-path guidance for each practice problem.
