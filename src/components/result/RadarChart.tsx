'use client'

import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

interface RadarChartProps {
  dimensions: {
    [key: string]: {
      self: number
      ideal: number
    }
  }
}

export function RadarChart({ dimensions }: RadarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    const labels = Object.keys(dimensions)
    const selfData = labels.map(label => dimensions[label].self)
    const idealData = labels.map(label => dimensions[label].ideal)

    const chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label: '你的特质',
            data: selfData,
            backgroundColor: 'rgba(167, 139, 250, 0.2)',
            borderColor: 'rgb(167, 139, 250)',
            pointBackgroundColor: 'rgb(167, 139, 250)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(167, 139, 250)'
          },
          {
            label: '理想匹配',
            data: idealData,
            backgroundColor: 'rgba(244, 114, 182, 0.2)',
            borderColor: 'rgb(244, 114, 182)',
            pointBackgroundColor: 'rgb(244, 114, 182)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(244, 114, 182)'
          }
        ]
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })

    return () => chart.destroy()
  }, [dimensions])

  return <canvas ref={chartRef} />
} 