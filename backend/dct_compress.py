import cv2
import numpy as np
from huffman_utils import huffman_encode

ZIGZAG_INDEX = [
    (0, 0), (0, 1), (1, 0), (2, 0), (1, 1), (0, 2), (0, 3), (1, 2),
    (2, 1), (3, 0), (4, 0), (3, 1), (2, 2), (1, 3), (0, 4), (0, 5),
    (1, 4), (2, 3), (3, 2), (4, 1), (5, 0), (6, 0), (5, 1), (4, 2),
    (3, 3), (2, 4), (1, 5), (0, 6), (0, 7), (1, 6), (2, 5), (3, 4),
    (4, 3), (5, 2), (6, 1), (7, 0), (7, 1), (6, 2), (5, 3), (4, 4),
    (3, 5), (2, 6), (1, 7), (2, 7), (3, 6), (4, 5), (5, 4), (6, 3),
    (7, 2), (7, 3), (6, 4), (5, 5), (4, 6), (3, 7), (4, 7), (5, 6),
    (6, 5), (7, 4), (7, 5), (6, 6), (5, 7), (6, 7), (7, 6), (7, 7)
]

def zigzag(block):
    return [block[i, j] for i, j in ZIGZAG_INDEX]

def rle_encode(arr):
    result = []
    zeros = 0
    for val in arr:
        if val == 0:
            zeros += 1
        else:
            result.append((zeros, val))
            zeros = 0
    result.append((0, 0))  # End of Block
    return result

def compress_channel(channel, quant_table):
    h, w = channel.shape
    padded = cv2.copyMakeBorder(channel, 0, (8 - h % 8) % 8, 0, (8 - w % 8) % 8, cv2.BORDER_CONSTANT, value=0)
    h, w = padded.shape
    compressed = np.zeros_like(padded)
    symbols = []

    for i in range(0, h, 8):
        for j in range(0, w, 8):
            block = padded[i:i+8, j:j+8].astype(np.float32) - 128
            dct = cv2.dct(block)
            quantized = np.round(dct / (quant_table+100)).astype(np.int32)

            zz = zigzag(quantized)
            rle = rle_encode(zz)
            symbols.extend(rle)

            dequant = quantized * (quant_table+100)
            idct = cv2.idct(dequant) + 128
            compressed[i:i+8, j:j+8] = np.uint8(np.clip(idct, 0, 255))

    return compressed[:channel.shape[0], :channel.shape[1]], symbols

def compress_dct_huffman(input_path, output_path, keep_fraction=0.5):
    img = cv2.imread(input_path)
    if img is None:
        print("Error: image not found")
        return

    # Convert to YCrCb
    ycrcb = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)
    Y, Cr, Cb = cv2.split(ycrcb)

    scale = 1.0 / keep_fraction
    
    quant_table = np.array([
    [16, 11, 10, 16, 24, 40, 51, 61],
    [12, 12, 14, 19, 26, 58, 60, 55],
    [14, 13, 16, 24, 40, 57, 69, 56],
    [14, 17, 22, 29, 51, 87, 80, 62],
    [18, 22, 37, 56, 68,109,103, 77],
    [24, 35, 55, 64, 81,104,113, 92],
    [49, 64, 78, 87,103,121,120,101],
    [72, 92, 95, 98,112,100,103, 99]
    ], dtype=np.float32)
    
    print(keep_fraction)
    

    # Scale the standard table for quality control
    quant_table = quant_table * (1.0 / keep_fraction)

    Y_compressed, Y_symbols = compress_channel(Y, quant_table)
    Cr_compressed, Cr_symbols = compress_channel(Cr, quant_table)
    Cb_compressed, Cb_symbols = compress_channel(Cb, quant_table)

    encoded_bits_Y, _ = huffman_encode(Y_symbols)
    encoded_bits_Cr, _ = huffman_encode(Cr_symbols)
    encoded_bits_Cb, _ = huffman_encode(Cb_symbols)

    final_ycrcb = cv2.merge([Y_compressed, Cr_compressed, Cb_compressed])
    final_bgr = cv2.cvtColor(final_ycrcb, cv2.COLOR_YCrCb2BGR)
    cv2.imwrite(output_path, final_bgr)

    print("✅ DCT Huffman applied to all channels")
    print("📦 Bitstream length (Y):", len(encoded_bits_Y))
    print("📦 Bitstream length (Cr):", len(encoded_bits_Cr))
    print("📦 Bitstream length (Cb):", len(encoded_bits_Cb))
