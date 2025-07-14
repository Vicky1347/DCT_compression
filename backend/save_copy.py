# import sys
# from PIL import Image

# input_path = sys.argv[1]
# lossy_path = sys.argv[2]
# lossless_path = sys.argv[3]

# try:
#     img = Image.open(input_path)

#     # Save lossy JPEG
#     img.convert("RGB").save(lossy_path, "JPEG", quality=40)

#     # Save lossless PNG
#     img.save(lossless_path, "PNG", optimize=True)

#     print("Compression done")
# except Exception as e:
#     print("Error:", e)
#     sys.exit(1)
