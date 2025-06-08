import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, BarChart } from 'lucide-react';

interface ROIChartProps {
  monthlyRevenue: number;
  systemPrice: number;
  growthPercentage: number;
}

export const ROIChart: React.FC<ROIChartProps> = ({ monthlyRevenue, systemPrice, growthPercentage }) => {
  const monthlyIncrease = (monthlyRevenue * growthPercentage) / 100;
  
  // Gerar dados para 24 meses
  const chartData = Array.from({ length: 24 }, (_, index) => {
    const month = index + 1;
    const totalGain = monthlyIncrease * month;
    const profit = totalGain - systemPrice;
    const roi = ((totalGain - systemPrice) / systemPrice) * 100;
    
    return {
      month: `${month}m`,
      monthNumber: month,
      roi: Math.max(roi, -100), // Limitar ROI mínimo
      profit: profit,
      totalGain: totalGain,
      breakEven: profit > 0
    };
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatROI = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(0)}%`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-600">
          <p className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Mês {data.monthNumber}
          </p>
          <div className="space-y-1 text-sm">
            <p className="text-blue-600 dark:text-blue-400">
              <span className="font-medium">ROI:</span> {formatROI(data.roi)}
            </p>
            <p className="text-green-600 dark:text-green-400">
              <span className="font-medium">Lucro:</span> {formatCurrency(data.profit)}
            </p>
            <p className="text-purple-600 dark:text-purple-400">
              <span className="font-medium">Ganho Total:</span> {formatCurrency(data.totalGain)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const breakEvenMonth = chartData.find(data => data.breakEven)?.monthNumber || 1;
  const oneYearROI = chartData[11]?.roi || 0;
  const twoYearROI = chartData[23]?.roi || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="premium-card p-8 rounded-2xl shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <BarChart className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Projeção de ROI
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Evolução do retorno ao longo do tempo
            </p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="text-sm text-slate-500 dark:text-slate-400">Break-even</div>
            <div className="text-lg font-bold text-blue-600">{breakEvenMonth}m</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-500 dark:text-slate-400">ROI 1 ano</div>
            <div className="text-lg font-bold text-green-600">{formatROI(oneYearROI)}</div>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="25%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="roiStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B82F6"/>
                <stop offset="50%" stopColor="#8B5CF6"/>
                <stop offset="100%" stopColor="#10B981"/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0" 
              className="dark:stroke-slate-600"
            />
            
            <XAxis 
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              interval={2}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={formatROI}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Area
              type="monotone"
              dataKey="roi"
              stroke="url(#roiStroke)"
              strokeWidth={3}
              fill="url(#roiGradient)"
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ 
                r: 6, 
                fill: '#3B82F6',
                stroke: '#ffffff',
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl"
        >
          <div className="flex items-center justify-center mb-2">
            <Calendar className="h-4 w-4 text-blue-600 mr-1" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Payback
            </span>
          </div>
          <div className="text-xl font-bold text-blue-800 dark:text-blue-200">
            {breakEvenMonth} {breakEvenMonth === 1 ? 'mês' : 'meses'}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl"
        >
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              ROI 2 anos
            </span>
          </div>
          <div className="text-xl font-bold text-green-800 dark:text-green-200">
            {formatROI(twoYearROI)}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl"
        >
          <div className="flex items-center justify-center mb-2">
            <BarChart className="h-4 w-4 text-purple-600 mr-1" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Crescimento
            </span>
          </div>
          <div className="text-xl font-bold text-purple-800 dark:text-purple-200">
            +{growthPercentage}%/mês
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}; 