import sys
from dct_compress import compress_dct_huffman

def main():
    if len(sys.argv) < 4:
        print("Usage: python compress.py <input_image> <output_image> <compression_percent>")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]
    try:
        percent = int(sys.argv[3])
        if percent not in [25, 50, 75]:
            raise ValueError
        keep_fraction = percent / 100.0
    except:
        print("Please provide compression percent as 25, 50 or 75")
        sys.exit(1)

    compress_dct_huffman(input_path, output_path, keep_fraction)

if __name__ == "__main__":
    main()
