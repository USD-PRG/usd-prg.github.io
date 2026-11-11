from PIL import Image, ImageDraw, ImageFilter
import random, math

W, H = 1600, 1000
NAVY_TOP = (8, 15, 34)
NAVY_BOT = (20, 36, 74)

CYAN = (86, 196, 255)
SAND = (246, 190, 96)
VIOLET = (150, 130, 255)
MINT = (110, 231, 183)
CORAL = (255, 138, 128)


def base(tint=(0, 0, 0)):
    img = Image.new("RGB", (W, H), NAVY_TOP)
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        c = tuple(int(a + (b - a) * t) for a, b in zip(NAVY_TOP, NAVY_BOT))
        c = tuple(min(255, int(v + t_ * 0.10)) for v, t_ in zip(c, tint))
        d.line([(0, y), (W, y)], fill=c)
    return img.convert("RGBA")


def grid(img, color, step=80, alpha=24):
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    for x in range(0, W, step):
        d.line([(x, 0), (x, H)], fill=color + (alpha,))
    for y in range(0, H, step):
        d.line([(0, y), (W, y)], fill=color + (alpha,))
    return Image.alpha_composite(img, ov)


def glow(img, pts, color, r=3, blur=9):
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    for (x, y) in pts:
        d.ellipse([x - r, y - r, x + r, y + r], fill=color + (255,))
    out = Image.alpha_composite(img, ov.filter(ImageFilter.GaussianBlur(blur)))
    return Image.alpha_composite(out, ov)


def bezier(p0, p1, p2, n=220):
    return [(
        (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
        (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1],
    ) for t in (i / n for i in range(n + 1))]


def lines(img, paths, color, width=3, alpha=210, blur=0):
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    for p in paths:
        d.line(p, fill=color + (alpha,), width=width, joint="curve")
    if blur:
        ov = ov.filter(ImageFilter.GaussianBlur(blur))
    return Image.alpha_composite(img, ov)


def save(img, name):
    img.convert("RGB").save(name, quality=86, optimize=True, progressive=True)
    print("wrote", name)


random.seed(7)

# 1 — SLAM / 3D mapping: sparse cloud + estimated trajectory
img = grid(base((10, 14, 20)), CYAN, 80, 20)
pts = [(random.uniform(80, W - 80), random.uniform(80, H - 60)) for _ in range(1400)]
img = glow(img, pts, CYAN, 1, 5)
traj = bezier((90, H - 120), (W * 0.52, H * 0.10), (W - 90, H - 190))
img = lines(img, [traj], (255, 255, 255), 3, 175)
img = glow(img, traj[::16], SAND, 6, 13)
save(img, "assets/img/research-slam.jpg")

# 2 — Aerial robotics: top-down terrain contours + flight path
img = base((4, 16, 12))
cx, cy = W * 0.60, H * 0.50
ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(ov)
for i in range(30):
    r = 40 + i * 30
    a = max(12, 130 - i * 4)
    d.ellipse([cx - r * 1.3, cy - r * 0.8, cx + r * 1.3, cy + r * 0.8],
              outline=MINT + (a,), width=2)
img = Image.alpha_composite(img, ov)
img = grid(img, MINT, 70, 14)
path = [(120 + i * 21, H * 0.5 + math.sin(i / 7) * 190 - i * 4) for i in range(60)]
img = lines(img, [path], (255, 255, 255), 2, 150)
img = glow(img, [path[-1]], SAND, 7, 14)
save(img, "assets/img/research-aerial.jpg")

# 3 — Legged locomotion / manipulation: kinematic skeleton
img = grid(base((8, 6, 18)), VIOLET, 90, 18)
j = [(W*0.28, H*0.74), (W*0.37, H*0.52), (W*0.51, H*0.44), (W*0.63, H*0.57),
     (W*0.71, H*0.34), (W*0.80, H*0.60), (W*0.57, H*0.74), (W*0.45, H*0.80)]
edges = [(0, 1), (1, 2), (2, 3), (1, 6), (6, 7), (3, 4), (4, 5), (3, 7)]
img = lines(img, [[j[a], j[b]] for a, b in edges], VIOLET, 5, 190)
img = glow(img, j[::2], SAND, 9, 15)
img = glow(img, j[1::2], VIOLET, 8, 14)
img = lines(img, [bezier((W*0.12, H*0.28), (W*0.5, H*0.04), (W*0.92, H*0.20))],
            (255, 255, 255), 2, 80)
save(img, "assets/img/research-legged.jpg")

# 4 — Perception / deep learning: layered network
img = grid(base((14, 6, 10)), CORAL, 100, 14)
layers = [[(320, 150 + i * 120) for i in range(5)],
          [(740, 100 + i * 100) for i in range(7)],
          [(1160, 150 + i * 120) for i in range(5)]]
paths = []
for a in layers[0]:
    for b in layers[1]:
        if random.random() < 0.5:
            paths.append([a, b])
for b in layers[1]:
    for c in layers[2]:
        if random.random() < 0.5:
            paths.append([b, c])
img = lines(img, paths, CYAN, 2, 60)
img = glow(img, layers[0], CORAL, 6, 10)
img = glow(img, layers[1], SAND, 6, 10)
img = glow(img, layers[2], CYAN, 6, 10)
save(img, "assets/img/research-perception.jpg")

# 5 — Field robotics: radial LiDAR sweep
img = base((12, 10, 4))
cx, cy = W * 0.34, H * 0.60
ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(ov)
for i in range(90):
    ang = math.radians(i * 4)
    r = random.uniform(150, 560)
    d.line([(cx, cy), (cx + math.cos(ang) * r, cy + math.sin(ang) * r)],
           fill=SAND + (58,), width=2)
img = Image.alpha_composite(img, ov.filter(ImageFilter.GaussianBlur(0.5)))
img = grid(img, SAND, 80, 10)
hits = [(cx + math.cos(math.radians(i * 9)) * random.uniform(260, 540),
         cy + math.sin(math.radians(i * 9)) * random.uniform(150, 340)) for i in range(40)]
img = glow(img, hits, CYAN, 3, 8)
img = glow(img, [(cx, cy)], (255, 255, 255), 8, 16)
save(img, "assets/img/research-field.jpg")

# 6 — Hero backdrop: wide motion field
img = grid(base((6, 10, 26)), CYAN, 110, 14)
paths = []
for k in range(26):
    y0 = 120 + k * 34
    paths.append(bezier((-80, y0), (W * 0.45, y0 - 230 + k * 8), (W + 80, y0 + 120)))
img = lines(img, paths, CYAN, 2, 34)
img = lines(img, paths[::4], SAND, 2, 60)
img = glow(img, [(random.uniform(0, W), random.uniform(0, H)) for _ in range(140)], CYAN, 2, 10)
save(img, "assets/img/hero-field.jpg")
