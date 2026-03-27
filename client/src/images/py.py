from PIL import Image
import os
# الامتدادات اللي هيتحولوا
extensions = (".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".gif",".jfif")
# فولدر التحويل
output_folder = "converted"
os.makedirs(output_folder, exist_ok=True)

for file in os.listdir():
    if file.lower().endswith(extensions):
        try:
            img = Image.open(file).convert("RGB")

            new_name = os.path.splitext(file)[0] + ".webp"
            output_path = os.path.join(output_folder, new_name)

            img.save(output_path, "webp", quality=90)

            os.remove(file)  # حذف الملف الأصلي
            print(f"Converted and moved: {file} -> {output_path}")
        except Exception as e:
            print(f"Error with {file}: {e}")

print("Done ✅")