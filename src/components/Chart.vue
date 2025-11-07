<template>
  <div class="chart-container">
    <div v-if="title" class="chart-header">
      <h3 class="chart-title">{{ title }}</h3>
      <span v-if="subtitle" class="chart-subtitle">{{ subtitle }}</span>
    </div>
    <div class="chart-canvas" :style="{ height: `${height}px` }">
      <svg
        :width="svgWidth"
        :height="svgHeight"
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
        preserveAspectRatio="none"
        class="chart-svg"
      >
        <!-- Grid lines -->
        <g v-if="showGrid" class="chart-grid">
          <line
            v-for="i in gridLines"
            :key="`h-${i}`"
            :x1="padding"
            :y1="padding + (i * (chartHeight / gridLines))"
            :x2="svgWidth - padding"
            :y2="padding + (i * (chartHeight / gridLines))"
            class="grid-line"
          />
        </g>

        <!-- Gradient definitions -->
        <defs>
          <linearGradient :id="`gradient-${uid}`" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" :stop-color="gradientStart" :stop-opacity="gradientOpacity" />
            <stop offset="100%" :stop-color="gradientEnd" stop-opacity="0" />
          </linearGradient>
        </defs>

        <!-- Area chart fill -->
        <path
          v-if="type === 'area'"
          :d="areaPath"
          :fill="`url(#gradient-${uid})`"
          class="chart-area"
        />

        <!-- Line chart path -->
        <path
          v-if="type === 'line' || type === 'area'"
          :d="linePath"
          :stroke="lineColor"
          fill="none"
          class="chart-line"
        />

        <!-- Bar chart -->
        <g v-if="type === 'bar'">
          <rect
            v-for="(point, index) in normalizedData"
            :key="index"
            :x="padding + (index * barWidth) + (barWidth * 0.1)"
            :y="padding + chartHeight - (point.y * chartHeight)"
            :width="barWidth * 0.8"
            :height="point.y * chartHeight"
            :fill="`url(#gradient-${uid})`"
            class="chart-bar"
          />
        </g>

        <!-- Data points -->
        <g v-if="showPoints">
          <circle
            v-for="(point, index) in normalizedData"
            :key="index"
            :cx="padding + (index * (chartWidth / (normalizedData.length - 1)))"
            :cy="padding + chartHeight - (point.y * chartHeight)"
            :r="pointRadius"
            :fill="pointColor"
            class="chart-point"
          />
        </g>
      </svg>
    </div>
    <div v-if="labels.length" class="chart-labels">
      <span
        v-for="(label, index) in labels"
        :key="index"
        class="chart-label"
      >
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

/**
 * Chart component with glassmorphism and gradient support
 * Supports bar, line, and area charts
 *
 * @param {Array} data - Array of numbers or objects with y values
 * @param {Array} labels - Optional labels for x-axis
 * @param {string} type - Chart type (bar, line, area)
 * @param {string} title - Chart title
 * @param {string} subtitle - Chart subtitle
 * @param {number} height - Chart height in pixels
 * @param {boolean} showGrid - Show grid lines
 * @param {boolean} showPoints - Show data points (line/area charts)
 * @param {string} gradientStart - Gradient start color
 * @param {string} gradientEnd - Gradient end color
 */
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  labels: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'bar',
    validator: v => ['bar', 'line', 'area'].includes(v)
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 300
  },
  showGrid: {
    type: Boolean,
    default: true
  },
  showPoints: {
    type: Boolean,
    default: false
  },
  gradientStart: {
    type: String,
    default: '#FFCA28'
  },
  gradientEnd: {
    type: String,
    default: '#FF6F00'
  },
  gradientOpacity: {
    type: Number,
    default: 0.6
  }
})

const uid = ref(Math.random().toString(36).substr(2, 9))

const padding = 20
const svgWidth = 800
const svgHeight = computed(() => props.height)
const chartWidth = computed(() => svgWidth - (padding * 2))
const chartHeight = computed(() => svgHeight.value - (padding * 2))
const gridLines = 5

// Normalize data to 0-1 range
const normalizedData = computed(() => {
  const values = props.data.map(d => typeof d === 'number' ? d : d.y)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1

  return values.map(v => ({
    y: (v - min) / range
  }))
})

// Line chart path
const linePath = computed(() => {
  if (normalizedData.value.length === 0) return ''

  const points = normalizedData.value.map((point, index) => {
    const x = padding + (index * (chartWidth.value / (normalizedData.value.length - 1)))
    const y = padding + chartHeight.value - (point.y * chartHeight.value)
    return `${x},${y}`
  })

  return `M ${points.join(' L ')}`
})

// Area chart path (includes baseline)
const areaPath = computed(() => {
  if (normalizedData.value.length === 0) return ''

  const points = normalizedData.value.map((point, index) => {
    const x = padding + (index * (chartWidth.value / (normalizedData.value.length - 1)))
    const y = padding + chartHeight.value - (point.y * chartHeight.value)
    return { x, y }
  })

  const topPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ')
  const bottomPath = [
    `L ${points[points.length - 1].x},${padding + chartHeight.value}`,
    `L ${points[0].x},${padding + chartHeight.value}`,
    'Z'
  ].join(' ')

  return topPath + bottomPath
})

const barWidth = computed(() => chartWidth.value / normalizedData.value.length)
const lineColor = computed(() => props.gradientStart)
const pointColor = computed(() => props.gradientStart)
const pointRadius = 4
</script>

<style scoped>
.chart-container {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}

.chart-header {
  margin-bottom: var(--spacing-md);
}

.chart-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-xs) 0;
}

.chart-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.chart-canvas {
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
}

.chart-svg {
  width: 100%;
  height: 100%;
}

.grid-line {
  stroke: var(--glass-border);
  stroke-width: 1;
  stroke-dasharray: 4 4;
  opacity: 0.3;
}

.chart-line {
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.chart-area {
  opacity: 0.8;
}

.chart-bar {
  transition: opacity var(--transition-fast);
}

.chart-bar:hover {
  opacity: 0.8;
}

.chart-point {
  stroke: var(--color-bg-primary);
  stroke-width: 2;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  transition: r var(--transition-fast);
}

.chart-point:hover {
  r: 6;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-sm);
  padding: 0 var(--spacing-md);
}

.chart-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-align: center;
  flex: 1;
}
</style>
