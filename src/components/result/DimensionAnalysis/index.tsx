'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radar, Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from 'chart.js'

// 注册 Chart.js 组件
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
)

export function DimensionAnalysis() {
  const [activeTab, setActiveTab] = useState('personality')
  
  const tabs = [
    { id: 'personality', name: '性格匹配度', Chart: Radar },
    { id: 'values', name: '价值观契合度', Chart: Bar },
    { id: 'lifestyle', name: '生活方式兼容度', Chart: Pie }
  ]

  // 添加图表数据
  const chartData = {
    personality: {
      labels: ['外向性', '开放性', '尽责性', '宜人性', '情绪稳定性'],
      datasets: [
        {
          label: '你的特征',
          data: [65, 75, 80, 85, 70],
          backgroundColor: 'rgba(62, 152, 199, 0.2)',
          borderColor: 'rgba(62, 152, 199, 1)',
          borderWidth: 2,
        },
        {
          label: '理想匹配',
          data: [70, 80, 75, 80, 75],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        },
      ],
    },
    values: {
      labels: ['家庭观', '事业观', '消费观', '教育观', '生活目标'],
      datasets: [
        {
          label: '契合度',
          data: [85, 75, 90, 80, 85],
          backgroundColor: 'rgba(62, 152, 199, 0.8)',
        },
      ],
    },
    lifestyle: {
      labels: ['作息时间', '兴趣爱好', '社交方式', '生活习惯'],
      datasets: [
        {
          data: [30, 25, 25, 20],
          backgroundColor: [
            'rgba(62, 152, 199, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
          ],
        },
      ],
    },
  }

  // 图表配置
  const chartOptions = {
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  const getChartComponent = () => {
    const tab = tabs.find(t => t.id === activeTab)
    if (!tab) return null
    
    const ChartComponent = tab.Chart
    return (
      <ChartComponent
        data={chartData[activeTab as keyof typeof chartData]}
        options={chartOptions}
      />
    )
  }

  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">维度分析</h2>
      
      {/* 标签切换 */}
      <div className="flex space-x-4 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      
      {/* 图表展示区域 */}
      <div className="h-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {getChartComponent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
} 