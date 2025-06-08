import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Target, Crown, ArrowUp, CheckCircle, Timer, TrendingDown } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageSwitch } from './components/LanguageSwitch';

interface ROIResult {
  totalGain: number;
  roi: number;
  breakEven: boolean;
  monthsToBreakEven: number;
  profit: number;
}

const App = () => {
  const { t } = useLanguage();
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>('');
  const [systemPrice, setSystemPrice] = useState<number>(500);
  const [growthPercentage, setGrowthPercentage] = useState<number>(15);
  const [roiData, setRoiData] = useState<Record<string, ROIResult> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateROI = () => {
    const revenue = parseFloat(monthlyRevenue.replace(/[^\d.,]/g, '').replace(',', '.'));
    if (!revenue || revenue <= 0) return;

    setIsCalculating(true);
    
    setTimeout(() => {
      const monthlyIncrease = (revenue * growthPercentage) / 100;
      
      const results: Record<string, ROIResult> = {
        [t('oneMonth')]: {
          totalGain: monthlyIncrease,
          roi: ((monthlyIncrease - systemPrice) / systemPrice) * 100,
          breakEven: systemPrice <= monthlyIncrease,
          monthsToBreakEven: Math.ceil(systemPrice / monthlyIncrease),
          profit: monthlyIncrease - systemPrice
        },
        [t('sixMonths')]: {
          totalGain: monthlyIncrease * 6,
          roi: ((monthlyIncrease * 6 - systemPrice) / systemPrice) * 100,
          breakEven: true,
          monthsToBreakEven: Math.ceil(systemPrice / monthlyIncrease),
          profit: (monthlyIncrease * 6) - systemPrice
        },
        [t('oneYear')]: {
          totalGain: monthlyIncrease * 12,
          roi: ((monthlyIncrease * 12 - systemPrice) / systemPrice) * 100,
          breakEven: true,
          monthsToBreakEven: Math.ceil(systemPrice / monthlyIncrease),
          profit: (monthlyIncrease * 12) - systemPrice
        },
        [t('twoYears')]: {
          totalGain: monthlyIncrease * 24,
          roi: ((monthlyIncrease * 24 - systemPrice) / systemPrice) * 100,
          breakEven: true,
          monthsToBreakEven: Math.ceil(systemPrice / monthlyIncrease),
          profit: (monthlyIncrease * 24) - systemPrice
        }
      };

      setRoiData(results);
      setIsCalculating(false);
    }, 1000);
  };

  useEffect(() => {
    if (monthlyRevenue) {
      calculateROI();
    }
  }, [monthlyRevenue, systemPrice, growthPercentage]);



  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(0)}%`;
  };

  const getROIColor = (roi: number) => {
    if (roi >= 1000) return 'text-emerald-600';
    if (roi >= 500) return 'text-green-600';
    if (roi >= 200) return 'text-blue-600';
    if (roi >= 0) return 'text-purple-600';
    return 'text-red-600';
  };

  const getCardGradient = (roi: number) => {
    if (roi >= 1000) return 'neon-gradient-green';
    if (roi >= 500) return 'neon-gradient-blue';
    if (roi >= 200) return 'neon-gradient-purple';
    if (roi >= 0) return 'neon-gradient-orange';
    return 'neon-gradient-orange';
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Language Switch */}
      <LanguageSwitch />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl floating" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full blur-3xl floating" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img 
                src="/ThriveFlows-Logo.png" 
                alt="ThriveFlows" 
                className="h-12 md:h-14 w-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl glow-pulse">
              <Calculator className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#0f172a' }}>
            {t('title')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#475569' }}>
            {t('subtitle')} 
            <br />{t('subtitleSecond')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="premium-card p-8 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <Target className="mr-3 h-6 w-6 text-blue-600" />
                {t('storeDataTitle')}
              </h2>

              {/* Monthly Revenue Input */}
              <div className="mb-8">
                <label className="block text-base font-medium text-slate-700 dark:text-slate-300 mb-3">
                  💰 {t('monthlyRevenueLabel')}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 h-6 w-6 text-slate-400 flex items-center justify-center text-xl font-bold">€</span>
                  <input
                    type="text"
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(e.target.value)}
                    placeholder={t('monthlyRevenuePlaceholder')}
                    className="w-full pl-12 pr-6 py-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white text-xl font-semibold transition-all duration-300"
                  />
                  {monthlyRevenue && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-4 top-4"
                    >
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* System Price Selection */}
              <div className="mb-8">
                <label className="block text-base font-medium text-slate-700 dark:text-slate-300 mb-4">
                  📧 {t('emailPackageLabel')}
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { price: 300, name: t('essential'), popular: false },
                    { price: 500, name: t('professional'), popular: true },
                    { price: 700, name: t('complete'), popular: false }
                  ].map(({ price, name, popular }) => (
                    <motion.button
                      key={price}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSystemPrice(price)}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                        systemPrice === price
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-xl transform scale-105'
                          : 'border-slate-300 dark:border-slate-600 hover:border-blue-300 hover:shadow-lg'
                      }`}
                    >
                      {popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {t('popular')}
                          </span>
                        </div>
                      )}
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        €{price}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {name}
                      </div>
                      {systemPrice === price && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute top-2 right-2"
                        >
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Growth Percentage Slider */}
              <div className="mb-6">
                <label className="block text-base font-medium text-slate-700 dark:text-slate-300 mb-3">
                  📈 {t('salesIncreaseLabel')} 
                  <span className="ml-2 text-2xl font-bold text-blue-600">{growthPercentage}%</span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="20"
                    value={growthPercentage}
                    onChange={(e) => setGrowthPercentage(Number(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-green-200 to-green-500 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-slate-500 mt-2">
                    <span className="flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      10% ({t('basicFlows')})
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      20% ({t('completeSystem')})
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              {monthlyRevenue && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700"
                >
                  <div className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-2">
                    📧 {t('additionalRevenue')}
                  </div>
                  <div className="text-lg font-bold text-blue-800 dark:text-blue-200">
                    +€{Math.round((parseFloat(monthlyRevenue.replace(/[^\d.,]/g, '').replace(',', '.')) * growthPercentage) / 100).toLocaleString('pt-PT').replace(/\s/g, '')} {t('perMonth')}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {isCalculating ? (
              <div className="premium-card p-12 rounded-2xl shadow-2xl text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Calculator className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
                  {t('calculating')}
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {t('surpriseMessage')}
                </p>
              </div>
            ) : roiData ? (
              <>
                {/* Main Results Grid */}
                <div className="premium-card p-8 rounded-2xl shadow-2xl">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                    <TrendingUp className="mr-3 h-6 w-6 text-green-600" />
                    {t('roiResultsTitle')}
                  </h2>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(roiData).map(([period, data]: [string, ROIResult]) => (
                      <motion.div
                        key={period}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="premium-card p-6 rounded-xl relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 glow-pulse shimmer"
                      >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className={`absolute inset-0 ${getCardGradient(data.roi)}`}></div>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full blur-2xl floating"></div>
                        </div>



                        <div className="relative text-center">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                            {period}
                          </h3>
                          <motion.div 
                            className={`text-3xl font-bold mb-3 ${getROIColor(data.roi)}`}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {formatPercentage(data.roi)}
                          </motion.div>
                          <div className="text-sm text-slate-600 dark:text-slate-300">
                            <div>{t('profit')}: <strong>€{Math.round(data.profit).toLocaleString('pt-PT').replace(/\s/g, '')}</strong></div>
                          </div>
                        </div>


                      </motion.div>
                    ))}
                  </div>


                </div>



                                {/* Bottom Summary Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Investment Summary */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="premium-card p-6 rounded-2xl shadow-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 relative overflow-hidden flex flex-col justify-center min-h-[200px]"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-green-400/20 rounded-full blur-xl"></div>
                    <div className="relative text-center">
                      <Crown className="h-10 w-10 text-green-600 mx-auto mb-3" />
                      <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                        {t('investment')}
                      </h3>
                      <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
                        €{systemPrice}
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {t('setupOnly')}
                      </p>
                    </div>
                  </motion.div>

                  {/* Return Summary */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="premium-card p-6 rounded-2xl shadow-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700 relative overflow-hidden flex flex-col justify-center min-h-[200px]"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
                    <div className="relative text-center">
                      <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                      <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">
                        {t('returnOneYear')}
                      </h3>
                      <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                        €{Math.round(roiData[t('oneYear')].profit).toLocaleString('pt-PT').replace(/\s/g, '')}
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {t('roiOf')} {formatPercentage(roiData[t('oneYear')].roi)}
                      </p>
                    </div>
                  </motion.div>

                  {/* Payback Info */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="premium-card p-6 rounded-2xl shadow-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700 relative overflow-hidden flex flex-col justify-center min-h-[200px]"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400/20 rounded-full blur-xl"></div>
                    <div className="relative text-center">
                      <Timer className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                                             <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">
                         {t('payback')}
                       </h3>
                      <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-2">
                        {roiData[t('oneMonth')].monthsToBreakEven}{roiData[t('oneMonth')].monthsToBreakEven === 1 ? ` ${t('month')}` : ` ${t('months')}`}
                      </div>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        {t('totalReturn')}
                      </p>
                    </div>
                  </motion.div>
                </div>


              </>
            ) : (
              <div className="premium-card p-12 rounded-2xl shadow-2xl text-center">
                <Calculator className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
                  👆 {t('enterRevenue')}
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {t('discoverExtra')}
                </p>
              </div>
            )}
          </motion.div>
        </div>


        {/* Cost of Inaction */}
        {roiData && monthlyRevenue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 max-w-7xl mx-auto"
          >
            <div className="premium-card p-8 rounded-2xl shadow-2xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-700">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-2">
                  ⚠️ {t('costOfInactionTitle')}
                </h3>
                <p className="text-red-600 dark:text-red-400">
                  {t('costSubtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Monthly Loss */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-red-300 dark:border-red-600"
                >
                  <div className="text-red-600 mb-2">
                    <TrendingDown className="h-8 w-8 mx-auto" />
                  </div>
                                     <div className="text-2xl font-bold text-red-700 dark:text-red-300 mb-1">
                     -€{Math.round((parseFloat(monthlyRevenue.replace(/[^\d.,]/g, '').replace(',', '.')) * growthPercentage) / 100).toLocaleString('pt-PT').replace(/\s/g, '')}
                   </div>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    {t('lostPerMonth')}
                  </p>
                  <p className="text-xs text-red-500 mt-1">
                    {t('withoutAutomation')}
                  </p>
                </motion.div>

                {/* Yearly Loss */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-orange-300 dark:border-orange-600"
                >
                  <div className="text-orange-600 mb-2">
                    <Timer className="h-8 w-8 mx-auto" />
                  </div>
                                     <div className="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-1">
                     -€{Math.round(((parseFloat(monthlyRevenue.replace(/[^\d.,]/g, '').replace(',', '.')) * growthPercentage) / 100) * 12).toLocaleString('pt-PT').replace(/\s/g, '')}
                   </div>
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                    {t('lostThisYear')}
                  </p>
                  <p className="text-xs text-orange-500 mt-1">
                    {t('ifNotActNow')}
                  </p>
                </motion.div>

                {/* Competition */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-purple-300 dark:border-purple-600"
                >
                  <div className="text-purple-600 mb-2">
                    <ArrowUp className="h-8 w-8 mx-auto" />
                  </div>
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-1">
                    +20%
                  </div>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    {t('competitorsEarn')}
                  </p>
                  <p className="text-xs text-purple-500 mt-1">
                    {t('moreThanYou')}
                  </p>
                </motion.div>
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center mt-6 p-4 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl border border-red-300 dark:border-red-600"
              >
                <p className="text-red-800 dark:text-red-300 font-semibold mb-2">
                  🔥 {t('timeWarning')}
                </p>
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {t('competitorWarning')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Guarantees Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12 max-w-7xl mx-auto"
        >
          <div className="premium-card p-6 rounded-2xl shadow-lg">
                         <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 text-center mb-4">
               ✨ {t('guaranteesTitle')}
             </h4>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  {t('freeTrialDays')}
                </span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700"
              >
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  {t('doneForYouSetup')}
                </span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700"
              >
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                  {t('payIfResults')}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16 text-slate-500 dark:text-slate-400"
        >
          <p className="text-lg">
            ✨ <strong>{t('footerText')}</strong> ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default App; 