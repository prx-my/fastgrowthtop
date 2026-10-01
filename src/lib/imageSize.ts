import fs from "fs";

export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Extracts width and height from PNG, JPEG, and WebP image buffers without external dependencies.
 */
export function getImageSize(filePath: string): ImageDimensions | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    const buf = fs.readFileSync(filePath);
    if (!buf || buf.length < 16) return null;

    // PNG
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
      if (buf.length >= 24) {
        return {
          width: buf.readUInt32BE(16),
          height: buf.readUInt32BE(20),
        };
      }
    }

    // JPEG
    if (buf[0] === 0xFF && buf[1] === 0xD8) {
      let offset = 2;
      while (offset < buf.length) {
        if (buf[offset] !== 0xFF) break;
        const marker = buf[offset + 1];
        if (marker === 0xD9 || marker === 0xDA) break; // End of Image or Start of Scan
        if (offset + 4 > buf.length) break;
        const len = buf.readUInt16BE(offset + 2);
        // SOF markers that contain dimensions
        if ([0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF].includes(marker)) {
          if (offset + 9 <= buf.length) {
            return {
              height: buf.readUInt16BE(offset + 5),
              width: buf.readUInt16BE(offset + 7),
            };
          }
        }
        offset += 2 + len;
      }
    }

    // WebP
    if (buf.slice(0, 4).toString() === "RIFF" && buf.slice(8, 12).toString() === "WEBP") {
      const type = buf.slice(12, 16).toString();
      if (type === "VP8 " && buf.length >= 30) {
        return {
          width: buf.readUInt16LE(26) & 0x3fff,
          height: buf.readUInt16LE(28) & 0x3fff,
        };
      } else if (type === "VP8L" && buf.length >= 25) {
        const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
        const width = 1 + (((b1 & 0x3f) << 8) | b0);
        const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
        return { width, height };
      } else if (type === "VP8X" && buf.length >= 30) {
        const width = 1 + buf.readUIntLE(24, 3);
        const height = 1 + buf.readUIntLE(27, 3);
        return { width, height };
      }
    }
  } catch (err) {
    console.error(`Error reading image dimensions for ${filePath}:`, err);
  }

  return null;
}
