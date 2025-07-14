from collections import Counter
import heapq

class Node:
    def __init__(self, symbol, freq):
        self.symbol = symbol
        self.freq = freq
        self.left = None
        self.right = None

    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(data):
    freq = Counter(data)
    heap = [Node(symbol, freq) for symbol, freq in freq.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        a = heapq.heappop(heap)
        b = heapq.heappop(heap)
        merged = Node(None, a.freq + b.freq)
        merged.left = a
        merged.right = b
        heapq.heappush(heap, merged)

    return heap[0]

def build_codes(root):
    codes = {}
    def dfs(node, code=""):
        if node is None:
            return
        if node.symbol is not None:
            codes[node.symbol] = code
            return
        dfs(node.left, code + "0")
        dfs(node.right, code + "1")
    dfs(root)
    return codes

def huffman_encode(data):
    root = build_huffman_tree(data)
    codes = build_codes(root)
    encoded = ''.join([codes[symbol] for symbol in data])
    return encoded, codes
