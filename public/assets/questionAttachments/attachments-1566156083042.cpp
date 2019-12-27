#include <stdio.h>
#include <iostream>
#include <list>
#include <stack>
#include <iterator>

using namespace std;

class Graph{
	
	int V;//number of vertices

	list<int> *adj;
	
	public:
		Graph(int v);

		void addEdge(int u,int v);

		void DFS(int s);

		void DFSUtil(int v, bool visited[]);
};

Graph:: Graph(int v){
	this->V=v;
	this->adj=new list<int>[v];
}

void Graph:: addEdge(int u,int v){
	this->adj[u].push_back(v);
}

void Graph::DFSUtil(int v, bool visited[]) 
{ 
    // Mark the current node as visited and 
    // print it 
    visited[v] = true; 
    cout << v << " "; 
  
    // Recur for all the vertices adjacent 
    // to this vertex 
    list<int>::iterator i; 
    for (i = adj[v].begin(); i != adj[v].end(); ++i) 
        if (!visited[*i]) 
            DFSUtil(*i, visited); 
} 
  
// DFS traversal of the vertices reachable from v. 
// It uses recursive DFSUtil() 
void Graph::DFS(int v) 
{ 
    // Mark all the vertices as not visited 
    bool *visited = new bool[V]; 
    for (int i = 0; i < V; i++) 
        visited[i] = false; 
  
    // Call the recursive helper function 
    // to print DFS traversal 
    DFSUtil(v, visited); 
} 


int main() 
{ 
    // Create a graph given in the above diagram 
    Graph g(4); 
    g.addEdge(0, 1); 
    g.addEdge(0, 2); 
    g.addEdge(1, 2); 
    g.addEdge(2, 0); 
    g.addEdge(2, 3); 
    g.addEdge(3, 3); 
  
    cout << "Following is Breadth First Traversal "
         << "(starting from vertex 2) \n"; 
    g.DFS(2); 
  
    return 0; 
} 
