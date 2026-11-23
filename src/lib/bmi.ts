export type BmiKey = 'under' | 'normal' | 'over' | 'obese'

export interface BmiResult {
  bmi: number
  key: BmiKey
  /** 0 – 1 position on the gauge arc */
  position: number
}

export const BMI_RANGES: { key: BmiKey; max: number }[] = [
  { key: 'under', max: 18.5 },
  { key: 'normal', max: 25 },
  { key: 'over', max: 30 },
  { key: 'obese', max: Infinity },
]

/** BMI = weight (kg) / height (m)^2 — a screening measure only. */
export function computeBmi(heightCm: number, weightKg: number): BmiResult | null {
  if (!heightCm || !weightKg || heightCm < 80 || heightCm > 250 || weightKg < 20 || weightKg > 300) return null
  const h = heightCm / 100
  const bmi = weightKg / (h * h)
  const rounded = Math.round(bmi * 10) / 10
  const key = BMI_RANGES.find((r) => rounded < r.max)?.key ?? 'obese'
  const position = Math.min(1, Math.max(0, (rounded - 13) / (38 - 13)))
  return { bmi: rounded, key, position }
}
