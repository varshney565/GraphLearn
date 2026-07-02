# Source Map

This project uses the public `RajneeshSirGraph` folder as the source syllabus:

<https://github.com/varshney565/Graph/tree/main/RajneeshSirGraph>

## Lesson Mapping

| GraphLearn lesson | Original source | Main ideas |
| --- | --- | --- |
| What A Graph Is | `Lecture1.cpp` | weighted adjacency list, add edge, display graph |
| Build, Display, Remove | `Lecture1.cpp` | remove edge, remove vertex, graph debugging output |
| DFS And Backtracking | `Lecture1.cpp` | has path, all paths, preorder, heaviest path, Hamiltonian paths |
| Grids Are Graphs Too | `Lecture2.cpp`, `Lecture3.cpp`, `Lecture6.cpp` | islands, max area, perimeter, surrounded regions, distinct islands, sub-islands |
| BFS, Levels, And Minutes | `Lecture3.cpp` | BFS with and without cycle checks, bipartite graph, rotting oranges, shortest binary matrix, 01 matrix |
| Directed Graphs And Order | `Lecture4.cpp`, `Lecture5.cpp` | directed cycle detection, topological sort, Kahn's algorithm, course schedule |
| Disjoint Set Union | `Lecture4.cpp`, `Lecture5.cpp`, `Lecture6.cpp`, `Lecture8.cpp` | union-find, components, redundant connection, smallest equivalent string, dynamic islands, regions by slashes |
| Minimum Spanning Tree | `Lecture7.cpp`, `Lecture8.cpp` | Kruskal, Prim intuition, water distribution, connect points, budgeted MST |
| Weighted Shortest Paths | `Lecture8.cpp`, `Lecture9.cpp`, `Lecture10.cpp`, `Lecture11.cpp`, `Lecture12LastClass.cpp` | Dijkstra, Bellman-Ford relaxation, network delay, cheapest flights, maze variants, minimum effort path |
| Advanced Pattern Map | `Lecture11.cpp`, `Lecture12LastClass.cpp`, `PremiumQuestions` | Kosaraju SCC, bridges, mother vertex, critical connections, premium graph practice |

## Teaching Choices

The source code is lecture-style C++ and assumes the learner already has some
graph comfort. GraphLearn keeps the same topic progression, but rewrites it as a
beginner course with:

- plain-language mental models before code,
- small C++ code shapes rather than full lecture files,
- a visual stepper for DFS, BFS, Dijkstra, Kahn, and Kruskal,
- lesson-specific quizzes,
- practice problem cards grouped by topic,
- expandable solution-path guidance for each practice problem.
