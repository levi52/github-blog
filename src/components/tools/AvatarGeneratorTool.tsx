"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const GRID = 5;
const PALETTE = [
  '#bf5b5b', '#d68741', '#c9a23b', '#6fa84f', '#4fa89c',
  '#4f8aa8', '#7b6bb0', '#b86b9a', '#e0558a', '#58a6ff',
  '#3fb950', '#d29922', '#f78166', '#a371f7', '#8b949e',
];
const PRESET_SIZES = [120, 240, 420, 840];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

function deriveGrid(seed: string): boolean[][] {
  const h = hash(seed);
  const cells: boolean[][] = [];
  for (let row = 0; row < GRID; row++) {
    cells[row] = [];
    for (let col = 0; col < 3; col++) {
      const bit = (h >> (row * 3 + col)) & 1;
      cells[row][col] = bit === 1;
    }
    cells[row][3] = cells[row][1];
    cells[row][4] = cells[row][0];
  }
  return cells;
}

function deriveColor(seed: string, mode: string): string {
  if (mode !== 'auto') return mode;
  const h = hash(seed);
  return PALETTE[h % PALETTE.length];
}

function deriveBgColor(fg: string, tint: boolean): string {
  if (!tint) return '#f0f0f0';
  const r = parseInt(fg.slice(1, 3), 16);
  const g = parseInt(fg.slice(3, 5), 16);
  const b = parseInt(fg.slice(5, 7), 16);
  const mix = (c: number) => Math.round(c * 0.12 + 255 * 0.88);
  return '#' + [mix(r), mix(g), mix(b)].map(v => v.toString(16).padStart(2, '0')).join('');
}

function drawOnCanvas(
  ctx: CanvasRenderingContext2D,
  seed: string,
  colorMode: string,
  canvasSize: number,
  showGap: boolean,
  tintedBg: boolean
) {
  if (!seed || seed.trim() === '') {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = '#8b949e';
    ctx.font = Math.max(12, canvasSize * 0.04) + 'px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('输入文字生成头像', canvasSize / 2, canvasSize / 2);
    return;
  }

  const grid = deriveGrid(seed);
  const fg = deriveColor(seed, colorMode);
  const bg = deriveBgColor(fg, tintedBg);

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  const padding = showGap ? 0.08 * canvasSize : 0;
  const drawSize = canvasSize - padding * 2;
  const cellSize = drawSize / GRID;
  const radius = showGap ? cellSize * 0.18 : 0;

  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      if (!grid[row][col]) continue;

      if (showGap) {
        const x = padding + col * cellSize + cellSize * 0.08;
        const y = padding + row * cellSize + cellSize * 0.08;
        const w = cellSize * 0.84;
        const h = cellSize * 0.84;
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.arcTo(x + w, y, x + w, y + radius, radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
        ctx.lineTo(x + radius, y + h);
        ctx.arcTo(x, y + h, x, y + h - radius, radius);
        ctx.lineTo(x, y + radius);
        ctx.arcTo(x, y, x + radius, y, radius);
        ctx.closePath();
        ctx.fill();
      } else {
        const x = col * cellSize - 0.5;
        const y = row * cellSize - 0.5;
        ctx.fillStyle = fg;
        ctx.fillRect(x, y, cellSize + 1, cellSize + 1);
      }
    }
  }
}

function sanitizeFilename(str: string): string {
  return str.replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_').slice(0, 80);
}

function randomString(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const len = 5 + Math.floor(Math.random() * 8);
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export default function AvatarGeneratorTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seed, setSeed] = useState('github');
  const [canvasSize, setCanvasSize] = useState(420);
  const [showGap, setShowGap] = useState(true);
  const [tintedBg, setTintedBg] = useState(true);
  const [colorMode, setColorMode] = useState('auto');
  const [customColor, setCustomColor] = useState('#888888');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawOnCanvas(ctx, seed, colorMode, canvasSize, showGap, tintedBg);
  }, [seed, colorMode, canvasSize, showGap, tintedBg]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvasSize;
      canvas.height = canvasSize;
    }
  }, [canvasSize]);

  const handleRandom = () => {
    setSeed(randomString());
  };

  const handleDownload = (format: string = 'png') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    const filename = sanitizeFilename(seed || 'github') + '_' + canvasSize + '×' + canvasSize;

    if (format === 'svg') {
      downloadSVG(filename);
      return;
    }

    switch (format) {
      case 'jpg':
      case 'jpeg':
        link.download = filename + '.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.92);
        break;
      case 'webp':
        link.download = filename + '.webp';
        link.href = canvas.toDataURL('image/webp', 0.92);
        break;
      default:
        link.download = filename + '.png';
        link.href = canvas.toDataURL('image/png');
    }
    link.click();
  };

  const downloadSVG = (filename: string) => {
    const grid = deriveGrid(seed);
    const fg = deriveColor(seed, colorMode);
    const bg = deriveBgColor(fg, tintedBg);

    const padding = showGap ? 0.08 * canvasSize : 0;
    const drawSize = canvasSize - padding * 2;
    const cellSize = drawSize / GRID;
    const radius = showGap ? cellSize * 0.18 : 0;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasSize}" height="${canvasSize}" viewBox="0 0 ${canvasSize} ${canvasSize}">`;
    svgContent += `<rect width="${canvasSize}" height="${canvasSize}" fill="${bg}"/>`;

    for (let row = 0; row < GRID; row++) {
      for (let col = 0; col < GRID; col++) {
        if (!grid[row][col]) continue;

        if (showGap) {
          const x = padding + col * cellSize + cellSize * 0.08;
          const y = padding + row * cellSize + cellSize * 0.08;
          const w = cellSize * 0.84;
          const h = cellSize * 0.84;
          svgContent += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fg}"/>`;
        } else {
          const x = col * cellSize;
          const y = row * cellSize;
          svgContent += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${fg}"/>`;
        }
      }
    }

    svgContent += '</svg>';

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename + '.svg';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            style={{
              width: canvasSize > 280 ? '280px' : canvasSize + 'px',
              height: canvasSize > 280 ? '280px' : canvasSize + 'px',
              imageRendering: 'pixelated',
            }}
            className="rounded-lg border border-border"
          />
          <div className="flex gap-2 justify-center mt-2">
            <span className="text-xs px-2 py-0.5 bg-bg border border-border rounded text-text-muted">
              {canvasSize}×{canvasSize}
            </span>
            <span className="text-xs px-2 py-0.5 bg-bg border border-border rounded text-text-muted">
              PNG
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-text mb-2 block">用户名 / 种子文字</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="输入任意文字…"
            maxLength={100}
            className="flex-1 px-3 py-2 bg-bg border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 placeholder:text-text-muted"
          />
          <button
            onClick={handleRandom}
            className="px-3 py-2 bg-bg border border-border text-text text-sm rounded-lg hover:bg-border/30 transition-all duration-200 btn-click cursor-pointer"
            title="随机生成"
          >
            🎲
          </button>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-text mb-2 block">画布尺寸</label>
        <div className="flex flex-wrap gap-2 items-center">
          {PRESET_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setCanvasSize(size)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 btn-click cursor-pointer ${
                canvasSize === size
                  ? 'bg-accent text-white border-accent'
                  : 'bg-bg border-border text-text hover:border-border-hover'
              }`}
            >
              {size}
            </button>
          ))}
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={32}
              max={4096}
              step={1}
              value={PRESET_SIZES.includes(canvasSize) ? '' : canvasSize}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val >= 32 && val <= 4096) {
                  setCanvasSize(val);
                }
              }}
              placeholder="自定义"
              className="w-20 px-2 py-1.5 bg-bg border border-border rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 placeholder:text-text-muted"
            />
            <span className="text-xs text-text-muted">px</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="text-sm font-medium text-text mb-2 block">点之间间隙</label>
          <button
            onClick={() => setShowGap(!showGap)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer ${
              showGap ? 'bg-accent' : 'bg-border'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                showGap ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="ml-2 text-sm text-text-muted">{showGap ? '有间隙' : '无间隙'}</span>
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-2 block">背景融入头像色</label>
          <button
            onClick={() => setTintedBg(!tintedBg)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer ${
              tintedBg ? 'bg-accent' : 'bg-border'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                tintedBg ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="ml-2 text-sm text-text-muted">{tintedBg ? '融入' : '纯色'}</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-text mb-2 block">背景颜色</label>
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setColorMode('auto')}
            className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-xs font-bold cursor-pointer ${
              colorMode === 'auto'
                ? 'border-accent shadow-sm scale-110'
                : 'border-transparent hover:border-border-hover'
            }`}
            style={{ background: '#f0f0f0' }}
          >
            A
          </button>
          {PALETTE.map((color) => (
            <button
              key={color}
              onClick={() => setColorMode(color)}
              className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                colorMode === color
                  ? 'border-accent shadow-sm scale-110'
                  : 'border-transparent hover:border-border-hover'
              }`}
              style={{ background: color }}
              title={color}
            />
          ))}
          <input
            type="color"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              setColorMode(e.target.value);
            }}
            className="w-8 h-8 rounded-lg border border-border cursor-pointer"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleDownload('png')}
          className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover hover:shadow-[var(--shadow-accent)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          下载 PNG
        </button>
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="px-4 py-2 bg-bg border border-border text-text text-sm font-medium rounded-lg hover:bg-border/30 transition-all duration-200 btn-click cursor-pointer"
          >
            更多格式 ▾
          </button>
          {showExportMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowExportMenu(false)}
              />
              <div className="absolute left-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                <button
                  onClick={() => { handleDownload('jpg'); setShowExportMenu(false); }}
                  className="block w-full px-4 py-2 text-sm text-text hover:bg-bg transition-colors duration-200 cursor-pointer"
                >
                  JPG
                </button>
                <button
                  onClick={() => { handleDownload('webp'); setShowExportMenu(false); }}
                  className="block w-full px-4 py-2 text-sm text-text hover:bg-bg transition-colors duration-200 cursor-pointer"
                >
                  WebP
                </button>
                <button
                  onClick={() => { handleDownload('svg'); setShowExportMenu(false); }}
                  className="block w-full px-4 py-2 text-sm text-text hover:bg-bg transition-colors duration-200 cursor-pointer"
                >
                  SVG
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <p className="text-xs text-text-muted text-center">
        基于哈希算法生成 5×5 对称像素图案，类似 GitHub Identicon
      </p>
    </div>
  );
}
