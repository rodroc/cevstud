// Ported exactly from cev.studio.dc.html — do not simplify the math

export type DrawFn = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: number,
  t: number,
) => void

function rr(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  r = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

export function drawWeb(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: number,
  _t: number,
) {
  const L = '#b3e611', O = '#333f00'
  const a = (th: number, sp = 0.14) => Math.max(0, Math.min(1, (p - th) / sp))
  const m = Math.min(w, h) * 0.11
  const x = m, y = m, ww = w - 2 * m, wh = h - 2 * m
  ctx.lineWidth = 1.5
  ctx.globalAlpha = a(0); ctx.strokeStyle = 'rgba(255,255,255,0.28)'
  rr(ctx, x, y, ww, wh, 7); ctx.stroke()
  const bar = 28
  ctx.globalAlpha = a(0.05); ctx.strokeStyle = 'rgba(255,255,255,0.16)'
  ctx.beginPath(); ctx.moveTo(x, y + bar); ctx.lineTo(x + ww, y + bar); ctx.stroke()
  for (let i = 0; i < 3; i++) {
    ctx.globalAlpha = a(0.07)
    ctx.fillStyle = i === 2 ? L : 'rgba(255,255,255,0.32)'
    ctx.beginPath(); ctx.arc(x + 16 + i * 15, y + bar / 2, 3.6, 0, 7); ctx.fill()
  }
  const cx = x + 20, cy = y + bar + 20, cw = ww - 40
  const ha = a(0.18)
  ctx.globalAlpha = ha * 0.85; ctx.fillStyle = O
  const hh = wh * 0.30; rr(ctx, cx, cy + (1 - ha) * 18, cw, hh, 5); ctx.fill()
  ctx.globalAlpha = ha; ctx.fillStyle = L; rr(ctx, cx + 20, cy + hh * 0.46, cw * 0.34, 9, 4); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.4)'; rr(ctx, cx + 20, cy + hh * 0.46 + 18, cw * 0.52, 6, 3); ctx.fill()
  const ry = cy + hh + 20, gap = 16, cwid = (cw - 2 * gap) / 3, chh = wh * 0.27
  for (let i = 0; i < 3; i++) {
    const ca = a(0.4 + i * 0.07)
    ctx.globalAlpha = ca; ctx.strokeStyle = 'rgba(255,255,255,0.22)'
    rr(ctx, cx + i * (cwid + gap), ry + (1 - ca) * 16, cwid, chh, 5); ctx.stroke()
    ctx.fillStyle = L; ctx.globalAlpha = ca * 0.85
    rr(ctx, cx + i * (cwid + gap) + 13, ry + 14 + (1 - ca) * 16, cwid * 0.42, 6, 3); ctx.fill()
  }
  const ty = ry + chh + 22
  for (let i = 0; i < 3; i++) {
    const la = a(0.62 + i * 0.06); ctx.globalAlpha = la * 0.8
    ctx.fillStyle = 'rgba(255,255,255,0.32)'
    rr(ctx, cx, ty + i * 13, cw * (0.92 - i * 0.16), 5, 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

export function drawMobile(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: number,
  _t: number,
) {
  const L = '#b3e611', O = '#333f00'
  const a = (th: number, sp = 0.14) => Math.max(0, Math.min(1, (p - th) / sp))
  const ph = Math.min(h * 0.82, 440), pw = ph * 0.49
  const px = (w - pw) / 2, py = (h - ph) / 2
  ctx.lineWidth = 1.6
  ctx.globalAlpha = a(0); ctx.strokeStyle = 'rgba(255,255,255,0.3)'
  rr(ctx, px, py, pw, ph, 30); ctx.stroke()
  ctx.globalAlpha = a(0.04); ctx.fillStyle = 'rgba(255,255,255,0.3)'
  rr(ctx, px + pw / 2 - 22, py + 11, 44, 7, 4); ctx.fill()
  ctx.save()
  rr(ctx, px + 7, py + 26, pw - 14, ph - 46, 22); ctx.clip()
  const sx = px + 20, sw = pw - 40; let yy = py + 46
  const ha = a(0.12)
  ctx.globalAlpha = ha; ctx.fillStyle = L
  rr(ctx, sx, yy + (1 - ha) * 14, sw * 0.52, 14, 4); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  rr(ctx, sx, yy + 24, sw * 0.8, 7, 3); ctx.fill()
  yy += 50
  const ba = a(0.3)
  ctx.globalAlpha = ba * 0.85; ctx.fillStyle = O
  rr(ctx, sx, yy + (1 - ba) * 22, sw, ph * 0.2, 11); ctx.fill()
  yy += ph * 0.2 + 18
  const rowH = ph * 0.088
  for (let i = 0; i < 3; i++) {
    const ra = a(0.45 + i * 0.1), oy = (1 - ra) * 20
    ctx.globalAlpha = ra; ctx.fillStyle = 'rgba(255,255,255,0.07)'
    rr(ctx, sx, yy + oy, sw, rowH, 9); ctx.fill()
    ctx.fillStyle = i === 0 ? L : 'rgba(255,255,255,0.28)'
    ctx.beginPath(); ctx.arc(sx + 19, yy + oy + rowH / 2, 9, 0, 7); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.32)'
    rr(ctx, sx + 38, yy + oy + rowH / 2 - 8, sw * 0.5, 6, 3); ctx.fill()
    rr(ctx, sx + 38, yy + oy + rowH / 2 + 3, sw * 0.32, 5, 2); ctx.fill()
    yy += rowH + 13
  }
  ctx.restore()
  const na = a(0.7); ctx.globalAlpha = na
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = i === 0 ? L : 'rgba(255,255,255,0.3)'
    ctx.beginPath(); ctx.arc(px + pw * (0.2 + i * 0.2), py + ph - 24, 4.2, 0, 7); ctx.fill()
  }
  ctx.globalAlpha = 1
}

export function drawBrand(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: number,
  _t: number,
) {
  const L = '#b3e611', O = '#333f00'
  const a = (th: number, sp = 0.14) => Math.max(0, Math.min(1, (p - th) / sp))
  const cx = w / 2, cy = h / 2, u = Math.min(w, h)
  const r = u * 0.065, gap = r * 3.1, topY = cy - u * 0.27
  const xs = [cx - gap, cx, cx + gap]
  let f: number
  ctx.lineWidth = 2
  f = a(0.1); ctx.globalAlpha = Math.min(1, f + 0.25); ctx.strokeStyle = 'rgba(255,255,255,0.4)'
  ctx.beginPath(); ctx.arc(xs[0], topY, r, 0, 7); ctx.stroke()
  ctx.globalAlpha = f; ctx.fillStyle = L; ctx.beginPath(); ctx.arc(xs[0], topY, r, 0, 7); ctx.fill()
  f = a(0.22); ctx.globalAlpha = Math.min(1, f + 0.25); ctx.strokeStyle = 'rgba(255,255,255,0.4)'
  ctx.strokeRect(xs[1] - r, topY - r, 2 * r, 2 * r)
  ctx.globalAlpha = f; ctx.fillStyle = L; ctx.fillRect(xs[1] - r, topY - r, 2 * r, 2 * r)
  f = a(0.34); ctx.globalAlpha = Math.min(1, f + 0.25)
  ctx.beginPath(); ctx.moveTo(xs[2], topY - r); ctx.lineTo(xs[2] + r, topY + r); ctx.lineTo(xs[2] - r, topY + r); ctx.closePath()
  ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.stroke()
  ctx.globalAlpha = f; ctx.fillStyle = L; ctx.fill()
  const wa = a(0.45)
  ctx.globalAlpha = wa; ctx.fillStyle = L
  ctx.font = '800 ' + (u * 0.27) + 'px "Bricolage Grotesque", sans-serif'
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.save(); ctx.translate(cx, cy); const sc = 0.82 + wa * 0.18; ctx.scale(sc, sc)
  ctx.fillText('cev', 0, 0); ctx.restore()
  const by = cy + u * 0.28, sw = u * 0.5, sh = u * 0.045, sx0 = cx - sw / 2
  const cols = [O, '#6f8f00', L]; const seg = sw / 3
  cols.forEach((c, i) => {
    const sa = a(0.6 + i * 0.07); ctx.globalAlpha = 1; ctx.fillStyle = c
    ctx.fillRect(sx0 + i * seg, by, seg * sa, sh)
  })
  ctx.globalAlpha = 1; ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic'
}

export function draw3D(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: number,
  t: number,
) {
  const L = '#b3e611'
  const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.3
  const phi = (1 + Math.sqrt(5)) / 2
  const V: [number, number, number][] = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
  ]
  const E: [number, number][] = [
    [0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],
    [2,3],[2,4],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],
    [4,5],[4,9],[4,11],[5,9],[5,11],[6,7],[6,8],[6,10],[7,8],[7,10],[8,9],[10,11],
  ]
  const nrm = Math.sqrt(1 + phi * phi)
  const ay = t * 0.0003 + p * Math.PI * 2.2
  const ax = 0.45 + p * 1.2
  const cyA = Math.cos(ay), syA = Math.sin(ay), cxA = Math.cos(ax), sxA = Math.sin(ax)
  const pts = V.map((v) => {
    const x = v[0] / nrm, y = v[1] / nrm, z = v[2] / nrm
    const x1 = x * cyA - z * syA, z1 = x * syA + z * cyA
    const y2 = y * cxA - z1 * sxA, z2 = y * sxA + z1 * cxA
    const persp = 2 / (2 - z2)
    return { x: cx + x1 * R * persp, y: cy + y2 * R * persp, z: z2 }
  })
  ctx.lineWidth = 1.4
  E.forEach((e) => {
    const A = pts[e[0]], B = pts[e[1]], za = (A.z + B.z) / 2
    ctx.globalAlpha = Math.min(1, 0.22 + 0.6 * ((za + 1) / 2))
    ctx.strokeStyle = L
    ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke()
  })
  pts.forEach((pt) => {
    ctx.globalAlpha = 0.3 + 0.7 * ((pt.z + 1) / 2)
    ctx.fillStyle = pt.z > 0 ? '#fff' : L
    ctx.beginPath(); ctx.arc(pt.x, pt.y, 2 + 1.6 * ((pt.z + 1) / 2), 0, 7); ctx.fill()
  })
  ctx.globalAlpha = 1
}
