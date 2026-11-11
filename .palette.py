from PIL import Image
from collections import Counter

im = Image.open("assets/img/logo.png").convert("RGBA")
px = [p for p in im.getdata() if p[3] > 200]
c = Counter([(r // 16 * 16, g // 16 * 16, b // 16 * 16) for r, g, b, a in px])
for col, n in c.most_common(14):
    print("#%02x%02x%02x" % col, n)
