const units = [
  "B",
  "KiB",
  "MiB",
  "GiB",
  "TiB",
  "PiB",
  "EiB",
  "ZiB",
  "YiB",
]

export function humanFileSize(size: number, showFull = false) {
  const exponent = Math.min(
    Math.floor(Math.log(size) / Math.log(1024)),
    units.length - 1,
  )
  if (exponent === 0) return `${size} B`

  const approx = size / 1024 ** exponent
  const fullSize = showFull ? ` (${size} B)` : ""
  return `${approx.toFixed(2)} ${units[exponent]}${fullSize}`
}

const baseNameRE = /[^\\/]+$/
const extRE = /\.[^.]*$/
const trailNumberRE = /(?<=[\W_])\d+$/
const trailingSeparatorRE = /[\W_]$/

/**
 * Parse the path into `{ baseName, ext }`.
 * E.g., "/home/rom/asdf.txt" => { baseName: "asdf.txt", ext: ".txt" }
 */
export function parsePath(path: string) {
  const baseName = (baseNameRE.exec(path) ?? [""])[0]
  const ext = (extRE.exec(baseName) ?? [""])[0]
  return { baseName, ext }
}

/**
 * Suggest (potentially) unique name from given one by adding an incremental suffix:
 *   - "asdf.txt"     => "asdf_1.txt"
 *   - "asdf_1.txt"   => "asdf_2.txt"
 * and so on.
 */
export function deduplicateFileName(filepath: string) {
  const { baseName, ext } = parsePath(filepath)
  const dirPath = filepath.substring(0, filepath.length - baseName.length)

  const nameOnly: string = baseName.substring(0, baseName.length - ext.length)
  const [trailNumber] = trailNumberRE.exec(nameOnly) ?? [null]

  if (trailNumber) {
    const newTrailNumber = Number(trailNumber) + 1
    return `${dirPath}${nameOnly.replace(trailNumberRE, newTrailNumber.toString())}${ext}`
  } else {
    if (!nameOnly) return `${dirPath}1${ext}`
    if (trailingSeparatorRE.test(nameOnly)) return `${dirPath}${nameOnly}1${ext}`
    return `${dirPath}${nameOnly}_1${ext}`
  }
}

/**
 * Rename the dotfile if any given.
 */
export function safeFileName(filepath: string) {
  const { baseName, ext } = parsePath(filepath)
  if (!baseName.startsWith(".")) return filepath

  const dirPath = filepath.substring(0, filepath.length - baseName.length)
  return dirPath + "_" + baseName.substring(1)
}
