# DCCN Experiments

C programs for Data Communication and Computer Networks (DCCN) practicals, covering Experiments 4 through 10.

## Experiment 4 - IP Address: Dotted Decimal and 32-bit Binary

```c
// Write a program to translate between a 32-bit IP address and dotted decimal notation.


#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void dottedToBinary(char ip[]) {
    int a, b, c, d;

    if (sscanf(ip, "%d.%d.%d.%d", &a, &b, &c, &d) != 4 ||
        a < 0 || a > 255 || b < 0 || b > 255 ||
        c < 0 || c > 255 || d < 0 || d > 255) {
        printf("Invalid IP address!\n");
        return;
    }

    int octets[] = {a, b, c, d};

    printf("32-bit Binary: ");
    for (int i = 0; i < 4; i++) {
        for (int j = 7; j >= 0; j--) {
            printf("%d", (octets[i] >> j) & 1);
        }
    }
    printf("\n");
}

void binaryToDotted(char binary[]) {
    if (strlen(binary) != 32) {
        printf("Invalid binary address! Enter exactly 32 bits.\n");
        return;
    }

    for (int i = 0; i < 32; i++) {
        if (binary[i] != '0' && binary[i] != '1') {
            printf("Invalid binary address!\n");
            return;
        }
    }

    printf("Dotted Decimal: ");

    for (int i = 0; i < 32; i += 8) {
        int value = 0;

        for (int j = 0; j < 8; j++) {
            value = value * 2 + (binary[i + j] - '0');
        }

        printf("%d", value);
        if (i < 24)
            printf(".");
    }
    printf("\n");
}

int main() {
    int choice;
    char address[100];

    printf("1. Dotted Decimal to Binary\n");
    printf("2. Binary to Dotted Decimal\n");
    printf("Enter choice: ");
    scanf("%d", &choice);

    if (choice == 1) {
        printf("Enter IP address: ");
        scanf("%99s", address);
        dottedToBinary(address);
    } else if (choice == 2) {
        printf("Enter 32-bit binary address: ");
        scanf("%99s", address);
        binaryToDotted(address);
    } else {
        printf("Invalid choice!\n");
    }

    return 0;
}
```

## Experiment 5 - Identify Class A, Class B, or Class C

```c
// Write a program that reads an IP address in dotted decimal form and determines whether the address belongs to Class A, Class B, or Class C. 

#include <stdio.h>

int main() {
    int a, b, c, d;

    printf("Enter IP address (e.g., 192.168.1.10): ");
    if (scanf("%d.%d.%d.%d", &a, &b, &c, &d) != 4) {
        printf("Invalid IP address format.\n");
        return 1;
    }

    if (a < 0 || a > 255 || b < 0 || b > 255 ||
        c < 0 || c > 255 || d < 0 || d > 255) {
        printf("Invalid IP address.\n");
    }
    else if (a >= 1 && a <= 126) {
        printf("Class A IP Address\n");
    }
    else if (a >= 128 && a <= 191) {
        printf("Class B IP Address\n");
    }
    else if (a >= 192 && a <= 223) {
        printf("Class C IP Address\n");
    }
    else {
        printf("Not a Class A, B, or C IP address.\n");
    }

    return 0;
}
```

## Experiment 6 - Identify Class D and Class E

```c
// Extend the above program to identify IP addresses belonging to Class D and Class E.

#include <stdio.h>

int main() {
    int a, b, c, d;

    printf("Enter IP address (e.g., 224.0.0.1): ");

    if (scanf("%d.%d.%d.%d", &a, &b, &c, &d) != 4) {
        printf("Invalid IP address format.\n");
        return 1;
    }

    if (a < 0 || a > 255 || b < 0 || b > 255 ||
        c < 0 || c > 255 || d < 0 || d > 255) {
        printf("Invalid IP address.\n");
    }
    else if (a >= 1 && a <= 126) {
        printf("Class A IP Address\n");
    }
    else if (a >= 128 && a <= 191) {
        printf("Class B IP Address\n");
    }
    else if (a >= 192 && a <= 223) {
        printf("Class C IP Address\n");
    }
    else if (a >= 224 && a <= 239) {
        printf("Class D IP Address (Multicast)\n");
    }
    else if (a >= 240 && a <= 255) {
        printf("Class E IP Address (Experimental/Reserved)\n");
    }
    else {
        printf("Special-purpose IP address (Class A/B/C not applicable).\n");
    }

    return 0;
}
```

## Experiment 7 - Dijkstra's Shortest Path Algorithm

```c
// Write a program to find the shortest path using Dijkstra's Algorithm.

#include <stdio.h>

#define MAX 100
#define INF 999999

int main() {
    int n, graph[MAX][MAX];
    int dist[MAX], visited[MAX], parent[MAX];
    int source;

    printf("Enter number of vertices: ");
    scanf("%d", &n);

    printf("Enter the adjacency matrix (0 for no edge):\n");

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &graph[i][j]);

            if (i != j && graph[i][j] == 0)
                graph[i][j] = INF;
        }
    }

    printf("Enter source vertex (0 to %d): ", n - 1);
    scanf("%d", &source);

    for (int i = 0; i < n; i++) {
        dist[i] = INF;
        visited[i] = 0;
        parent[i] = -1;
    }

    dist[source] = 0;

    for (int count = 0; count < n - 1; count++) {
        int min = INF, u = -1;

        for (int i = 0; i < n; i++) {
            if (!visited[i] && dist[i] < min) {
                min = dist[i];
                u = i;
            }
        }

        if (u == -1)
            break;

        visited[u] = 1;

        for (int v = 0; v < n; v++) {
            if (!visited[v] && graph[u][v] != INF &&
                dist[u] != INF &&
                dist[u] + graph[u][v] < dist[v]) {

                dist[v] = dist[u] + graph[u][v];
                parent[v] = u;
            }
        }
    }

    printf("\nShortest distances from vertex %d:\n", source);

    for (int i = 0; i < n; i++) {
        if (dist[i] == INF) {
            printf("Vertex %d: Unreachable\n", i);
        } else {
            printf("Vertex %d: Distance = %d\n", i, dist[i]);
        }
    }

    printf("\nShortest paths:\n");

    for (int i = 0; i < n; i++) {
        if (dist[i] == INF) {
            printf("To vertex %d: No path\n", i);
            continue;
        }

        int path[MAX], length = 0;
        int current = i;

        while (current != -1) {
            path[length++] = current;
            current = parent[current];
        }

        printf("To vertex %d: ", i);

        for (int j = length - 1; j >= 0; j--) {
            printf("%d", path[j]);

            if (j > 0)
                printf(" -> ");
        }

        printf("\n");
    }

    return 0;
}
```

## Experiment 8 - Bellman-Ford Shortest Path Algorithm

```c
// Write a program to find the shortest path using the Bellman-Ford Algorithm.

#include <stdio.h>

#define MAX 100
#define INF 999999

struct Edge {
    int src, dest, weight;
};

int main() {
    int V, E, source;
    struct Edge edges[MAX * MAX];
    int dist[MAX], parent[MAX];

    printf("Enter number of vertices: ");
    scanf("%d", &V);

    printf("Enter number of edges: ");
    scanf("%d", &E);

    printf("Enter source, destination and weight of each edge:\n");

    for (int i = 0; i < E; i++) {
        scanf("%d %d %d",
              &edges[i].src,
              &edges[i].dest,
              &edges[i].weight);
    }

    printf("Enter source vertex: ");
    scanf("%d", &source);

    for (int i = 0; i < V; i++) {
        dist[i] = INF;
        parent[i] = -1;
    }

    dist[source] = 0;

    // Relax all edges V - 1 times
    for (int i = 1; i < V; i++) {
        int updated = 0;

        for (int j = 0; j < E; j++) {
            int u = edges[j].src;
            int v = edges[j].dest;
            int w = edges[j].weight;

            if (dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
                updated = 1;
            }
        }

        if (!updated)
            break;
    }

    // Check for a reachable negative-weight cycle
    for (int i = 0; i < E; i++) {
        int u = edges[i].src;
        int v = edges[i].dest;
        int w = edges[i].weight;

        if (dist[u] != INF && dist[u] + w < dist[v]) {
            printf("Graph contains a reachable negative-weight cycle.\n");
            return 0;
        }
    }

    printf("\nShortest distances from vertex %d:\n", source);

    for (int i = 0; i < V; i++) {
        if (dist[i] == INF) {
            printf("Vertex %d: Unreachable\n", i);
        } else {
            printf("Vertex %d: Distance = %d\n", i, dist[i]);
        }
    }

    printf("\nShortest paths:\n");

    for (int i = 0; i < V; i++) {
        if (dist[i] == INF) {
            printf("To vertex %d: No path\n", i);
            continue;
        }

        int path[MAX], length = 0;
        int current = i;

        while (current != -1 && length < V) {
            path[length++] = current;
            current = parent[current];
        }

        printf("To vertex %d: ", i);

        for (int j = length - 1; j >= 0; j--) {
            printf("%d", path[j]);

            if (j > 0)
                printf(" -> ");
        }

        printf("\n");
    }

    return 0;
}
```

## Experiment 9 - Pure ALOHA Protocol

```c
// Write a C program to implement the Pure ALOHA protocol.

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    int n, i;
    int success = 0, collision = 0;

    printf("Enter number of stations: ");
    scanf("%d", &n);

    srand((unsigned int)time(NULL));
    printf("\nPure ALOHA Protocol Simulation\n");

    for (i = 1; i <= n; i++) {
        int transmission = rand() % 2;

        if (transmission == 1) {
            printf("Station %d: Frame transmitted successfully\n", i);
            success++;
        } else {
            printf("Station %d: Collision / Frame not transmitted\n", i);
            collision++;
        }
    }

    printf("\nTotal stations: %d\n", n);
    printf("Successful transmissions: %d\n", success);
    printf("Collisions / failed transmissions: %d\n", collision);

    return 0;
}
```

## Experiment 10 - Slotted ALOHA Protocol

```c
// Write a C program to implement the Slotted ALOHA protocol

#include <stdio.h>

int main() {
    int slots, stations;
    int i, j, transmissions;
    int success = 0, collision = 0, idle = 0;

    printf("Enter number of time slots: ");
    scanf("%d", &slots);

    printf("Enter number of stations: ");
    scanf("%d", &stations);

    for (i = 1; i <= slots; i++) {
        transmissions = 0;

        printf("\nTime Slot %d\n", i);

        for (j = 1; j <= stations; j++) {
            int transmit;

            printf("Does Station %d transmit? (1 = Yes, 0 = No): ", j);
            scanf("%d", &transmit);

            if (transmit == 1) {
                transmissions++;
            }
        }

        if (transmissions == 0) {
            printf("Result: Idle slot\n");
            idle++;
        } else if (transmissions == 1) {
            printf("Result: Successful transmission\n");
            success++;
        } else {
            printf("Result: Collision occurred\n");
            collision++;
        }
    }

    printf("\n--- Slotted ALOHA Summary ---\n");
    printf("Total slots: %d\n", slots);
    printf("Successful transmissions: %d\n", success);
    printf("Collisions: %d\n", collision);
    printf("Idle slots: %d\n", idle);

    return 0;
}
```
