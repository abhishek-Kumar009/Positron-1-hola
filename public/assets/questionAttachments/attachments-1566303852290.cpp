#include <stdio.h>
#include <iostream>
#include <list>
#include <queue>
#include <iterator>

using namespace std;

class Graph{
	
	int V;//number of vertices

	list<int> *adj;
	
	public:
		Graph(int v);

		void addEdge(int u,int v);

		void BFS(int s);
};

Graph:: Graph(int v){
	this->V=v;
	this->adj=new list<int>[v];
}

void Graph:: addEdge(int u,int v){
	this->adj[u].push_back(v);
}

void Graph::BFS(int s) 
{ 
    // Mark all the vertices as not visited 
    bool *visited = new bool[V]; 
    for(int i = 0; i < V; i++) 
        visited[i] = false; 
  
    // Create a queue for BFS 
    list<int> queue; 
  
    // Mark the current node as visited and enqueue it 
    visited[s] = true; 
    queue.push_back(s); 
  
    // 'i' will be used to get all adjacent 
    // vertices of a vertex 
    list<int>::iterator i; 
  
    while(!queue.empty()) 
    { 
        // Dequeue a vertex from queue and print it 
        s = queue.front(); 
        cout << s << " "; 
        queue.pop_front(); 
  
        // Get all adjacent vertices of the dequeued 
        // vertex s. If a adjacent has not been visited,  
        // then mark it visited and enqueue it 
        for (i = adj[s].begin(); i != adj[s].end(); ++i) 
        { 
            if (!visited[*i]) 
            { 
                visited[*i] = true; 
                queue.push_back(*i); 
            } 
        } 
    } 
} 

/*
void Graph:: BFS(int s){
	
	bool *visited= new bool[V];
	
	for(int i=0;i<V;i++)
		visited[i]=false;

	queue<int> q;

	q.push(s);
	
	visited[s]=true;

	int k;

	while(!q.empty())
	{
		k=q.front();
		q.pop();

		cout<<k<<" ";

		list<int> ::iterator i=adj[k].begin();
		
		while(i!=adj[k].end())
		{
			if(visited[*i]==false){
				q.push(*i);
				visited[*i]=true;
			}
	
			i++;
		}

	}	
}
*/

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
    g.BFS(2); 
  
    return 0; 
} 

