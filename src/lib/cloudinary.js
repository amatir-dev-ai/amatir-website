/**
 * Cloudinary URL helpers
 *
 * Cloudinary stores URLs like:
 *   https://res.cloudinary.com/<cloud>/image/upload/v1234/<folder>/<public_id>.jpg
 *
 * We inject delivery transformations right after "/upload/" so the CDN
 * serves the optimal format and quality without touching the stored asset.
 */

/**
 * Inject f_auto,q_auto (and optional extra transforms) into a Cloudinary URL.
 *
 * @param {string} url        - Raw Cloudinary secure_url from the database.
 * @param {Object} [opts]
 * @param {number} [opts.w]   - Resize width (e.g. 800). Omit for natural size.
 * @param {number} [opts.h]   - Resize height. Combined with w uses c_fill.
 * @param {string} [opts.extra] - Any additional raw transform string e.g. "c_fill,g_auto".
 * @returns {string}          - Optimized URL, or the original if not a Cloudinary URL.
 */
export function cldUrl(url, { w, h, extra } = {}) {
  if (!url || !url.includes('res.cloudinary.com')) return url;

  const transforms = ['f_auto', 'q_auto'];

  if (w && h) {
    transforms.push(`w_${w}`, `h_${h}`, 'c_fill', 'g_auto');
  } else if (w) {
    transforms.push(`w_${w}`, 'c_limit');
  }

  if (extra) transforms.push(extra);

  return url.replace('/upload/', `/upload/${transforms.join(',')}/`);
}

/**
 * Derive a slug-safe Cloudinary public_id from a blog title or slug string.
 * Strips everything except lowercase letters, digits, and hyphens.
 *
 * @param {string} str - Blog title or slug.
 * @returns {string}
 */
export function toCloudinaryId(str = '') {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100); // Cloudinary public_id limit is 255 chars; 100 is safe
}
