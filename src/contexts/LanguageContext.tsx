import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Header
    title: 'Calculadora de ROI do Sistema ThriveFlows',
    subtitle: 'Descubra quanta receita mensal nossas automações de email podem gerar para sua loja online.',
    subtitleSecond: 'Sem anúncios pagos. Apenas um sistema de automação de email inteligente.',

    // Form Labels
    monthlyRevenueLabel: 'Qual o faturamento mensal da sua loja online?',
    monthlyRevenuePlaceholder: 'Ex: €50.000',
    emailPackageLabel: 'Pacote de Automações de Email',
    salesIncreaseLabel: 'Aumento de Vendas via Automações de Email:',

    // Package Names
    essential: 'Essencial',
    professional: 'Profissional',
    complete: 'Completo',

    // Form Section
    storeDataTitle: 'Dados da Sua Loja Online',
    roiResultsTitle: 'ROI do Sistema ThriveFlows',

    // ROI Periods
    oneMonth: '1 mês',
    sixMonths: '6 meses',
    oneYear: '1 ano',
    twoYears: '2 anos',

    // Results
    profit: 'Lucro',
    paybackTime: 'Payback em apenas',
    months: 'meses',
    month: 'mês',

    // Summary Cards
    investment: 'Investimento',
    setupOnly: 'Setup único do sistema',
    returnOneYear: 'Retorno em 1 Ano',
    payback: 'Payback',
    totalReturn: 'Retorno total do investimento',

    // Cost of Inaction
    costOfInactionTitle: 'Custo de NÃO Agir Agora',
    costSubtitle: 'Cada mês sem automações de email = dinheiro deixado na mesa',
    lostPerMonth: 'Perdido por mês',
    withoutAutomation: 'Sem automação de email',
    lostThisYear: 'Já perdeu este ano',
    ifNotActNow: 'Se não agir agora',
    competitorsEarn: 'Concorrentes faturam',
    moreThanYou: 'Mais que você',
    timeWarning: 'Quanto mais tempo esperar, mais dinheiro perde',
    competitorWarning: 'Seus concorrentes já estão usando automações. Não fique para trás!',

    // Guarantees
    guaranteesTitle: 'Garantias ThriveFlows',
    freeTrialDays: 'Teste grátis por 30 dias',
    doneForYouSetup: 'Setup 100% done-for-you',
    payIfResults: 'Só paga se gerar resultados',

    // Calendar
    scheduleConsultation: 'Agende uma Consulta Gratuita',

    // Footer
    footerText: 'Mais de 100+ lojas online já aumentaram suas vendas com nossos email flows',

    // Quick Stats
    additionalRevenue: 'Receita Adicional no Piloto Automático',
    perMonth: 'por mês',

    // Slider Labels
    basicFlows: 'Flows Básicos',
    completeSystem: 'Sistema Completo',

    // Placeholder text
    enterRevenue: 'Insira o faturamento da sua loja',
    discoverExtra: 'E descubra quanto dinheiro extra o sistema pode gerar em piloto automático!',
    calculating: 'Calculando seu ROI...',
    surpriseMessage: 'Prepare-se para se surpreender! 🚀',

    // ROI Display
    roiOf: 'ROI de',

    // Badges
    popular: 'POPULAR'
  },
  en: {
    // Header
    title: 'ThriveFlows System ROI Calculator',
    subtitle: 'Discover how much monthly revenue our email automations can generate for your online store.',
    subtitleSecond: 'No paid ads. Just an intelligent email automation system.',

    // Form Labels
    monthlyRevenueLabel: 'What is your online store\'s monthly revenue?',
    monthlyRevenuePlaceholder: 'Ex: €50,000',
    emailPackageLabel: 'Email Automation Package',
    salesIncreaseLabel: 'Sales Increase via Email Automations:',

    // Package Names
    essential: 'Essential',
    professional: 'Professional',
    complete: 'Complete',

    // Form Section
    storeDataTitle: 'Your Online Store Data',
    roiResultsTitle: 'ThriveFlows System ROI',

    // ROI Periods
    oneMonth: '1 month',
    sixMonths: '6 months',
    oneYear: '1 year',
    twoYears: '2 years',

    // Results
    profit: 'Profit',
    paybackTime: 'Payback in just',
    months: 'months',
    month: 'month',

    // Summary Cards
    investment: 'Investment',
    setupOnly: 'One-time system setup',
    returnOneYear: 'Return in 1 Year',
    payback: 'Payback',
    totalReturn: 'Total return on investment',

    // Cost of Inaction
    costOfInactionTitle: 'Cost of NOT Acting Now',
    costSubtitle: 'Every month without email automations = money left on the table',
    lostPerMonth: 'Lost per month',
    withoutAutomation: 'Without email automation',
    lostThisYear: 'Already lost this year',
    ifNotActNow: 'If you don\'t act now',
    competitorsEarn: 'Competitors earn',
    moreThanYou: 'More than you',
    timeWarning: 'The longer you wait, the more money you lose',
    competitorWarning: 'Your competitors are already using automations. Don\'t fall behind!',

    // Guarantees
    guaranteesTitle: 'ThriveFlows Guarantees',
    freeTrialDays: '30-day free trial',
    doneForYouSetup: '100% done-for-you setup',
    payIfResults: 'Only pay if it generates results',

    // Calendar
    scheduleConsultation: 'Schedule a Free Consultation',

    // Footer
    footerText: 'Over 100+ online stores have already increased their sales with our email flows',

    // Quick Stats
    additionalRevenue: 'Additional Revenue on Autopilot',
    perMonth: 'per month',

    // Slider Labels
    basicFlows: 'Basic Flows',
    completeSystem: 'Complete System',

    // Placeholder text
    enterRevenue: 'Enter your store\'s revenue',
    discoverExtra: 'And discover how much extra money the system can generate on autopilot!',
    calculating: 'Calculating your ROI...',
    surpriseMessage: 'Get ready to be amazed! 🚀',

    // ROI Display
    roiOf: 'ROI of',

    // Badges
    popular: 'POPULAR'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 