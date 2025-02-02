from collections import deque

# Create a function that has a decorator in it
def my_decorator(func):
  def wrapper():
    print("Something is happening before the function is called.")
    func()
    print("Something is happening after the function is called.")

  return wrapper

@my_decorator

def add(a: int, b: int) -> int:
    return a + b

def topo(G, ind=None, Q=[1]):
    if ind == None:
        ind = [0] * (len(G) + 1)  # this is a comment
        for u in G:
            for v in G[u]:
                ind[v] += 1
        Q = deque()
        for i in G:
            if ind[i] == 0:
                Q.append(i)
    if len(Q) == 0:
        return
    v = Q.popleft()
    print(v)
    for w in G[v]:
        ind[w] -= 1
        if ind[w] == 0:
            Q.append(w)
    topo(G, ind, Q)

class SomeClass:
    def create_arr(self): # An instance method
        self.arr = []

    def insert_to_arr(self, value):  #An instance method
        self.arr.append(value)

    @classmethod
    def class_method(cls):
        print("the class method was called")

