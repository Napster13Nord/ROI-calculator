import { addPropertyControls, ControlType } from "framer"
import { useState, useMemo } from "react"

interface Props {
    language?: "en" | "pt"
}

const translations = {
    pt: {
        title: "Calculadora de Receita",
        resultsTitle: "O Seu Potencial de",
        resultsHighlight: "Crescimento",
        monthlyRevenue: "Faturamento Mensal",
        emailPackage: "Pacote de Automações",
        salesIncrease: "Aumento de Vendas",
        increase: "Aumento Estimado",
        monthlyGain: "Ganho Mensal",
        monthlyInvestment: "Investimento",
        returnYear: "Retorno em 1 Ano",
        payback: "Payback",
        paybackSub: "Retorno total sobre investimento",
        roiYear: "ROI em 1 Ano",
        automations: "Automações",
        months: "meses",
        month: "mês",
    },
    en: {
        title: "Revenue Calculator",
        resultsTitle: "Your Growth",
        resultsHighlight: "Potential",
        monthlyRevenue: "Monthly Revenue",
        emailPackage: "Automation Package",
        salesIncrease: "Sales Increase",
        increase: "Estimated Increase",
        monthlyGain: "Monthly Gain",
        monthlyInvestment: "Investment",
        returnYear: "Return in 1 Year",
        payback: "Payback",
        paybackSub: "Total return on investment",
        roiYear: "ROI in 1 Year",
        automations: "Automations",
        months: "months",
        month: "month",
    },
}

const PACKAGES = [
    { price: 300, automations: 3, key: "essential" },
    { price: 500, automations: 5, key: "professional" },
    { price: 700, automations: 8, key: "complete" },
]

export default function SimpleROICalculator(props: Props) {
    const { language = "en" } = props
    const t = translations[language]

    const [monthlyRevenue, setMonthlyRevenue] = useState(10000)
    const [systemPrice, setSystemPrice] = useState(500)
    const [growthPercentage, setGrowthPercentage] = useState(15)

    const selectedPackage = PACKAGES.find((p) => p.price === systemPrice) || PACKAGES[1]

    const results = useMemo(() => {
        const monthlyIncrease = (monthlyRevenue * growthPercentage) / 100
        const yearlyReturn = monthlyIncrease * 12
        const roi = ((yearlyReturn - systemPrice) / systemPrice) * 100
        const paybackMonths = monthlyIncrease > 0 ? Math.ceil(systemPrice / monthlyIncrease) : 0
        return { monthlyIncrease, yearlyReturn, roi, paybackMonths }
    }, [monthlyRevenue, systemPrice, growthPercentage])

    const formatCurrency = (num: number) => {
        return "$" + Math.round(num).toLocaleString("en-US")
    }

    const formatROI = (value: number) => {
        const absValue = Math.abs(value)
        const sign = value > 0 ? "+" : ""
        if (absValue >= 1000000) return sign + (absValue / 1000000).toFixed(1) + "M%"
        if (absValue >= 1000) return sign + Math.round(value).toLocaleString("en-US") + "%"
        return sign + Math.round(value) + "%"
    }

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "1100px",
                margin: "0 auto",
                fontFamily: "'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                color: "#fff",
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700;800&display=swap');
                .roi-slider {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 100%;
                    height: 4px;
                    border-radius: 2px;
                    background: linear-gradient(90deg, #814ac8, #814ac8);
                    outline: none;
                    cursor: pointer;
                }
                .roi-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #814ac8;
                    cursor: pointer;
                    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3);
                }
                .roi-slider::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #814ac8;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3);
                }
                .roi-result-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }
                .roi-result-row:last-child {
                    border-bottom: none;
                }
                @media (max-width: 768px) {
                    .roi-layout {
                        grid-template-columns: 1fr !important;
                    }
                    .roi-title {
                        text-align: center !important;
                    }
                    .roi-results-title {
                        text-align: center !important;
                    }
                }
            `}</style>

            <div
                className="roi-layout"
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2rem",
                    alignItems: "stretch",
                }}
            >
                {/* Left: Inputs */}
                <div style={{ padding: "0.5rem 0" }}>
                    <h2
                        className="roi-title"
                        style={{
                            fontSize: "28px",
                            fontWeight: 500,
                            color: "#fff",
                            margin: "0 0 2rem 0",
                        }}
                    >
                        {t.title}
                    </h2>

                    {/* Monthly Revenue Slider */}
                    <div style={{ marginBottom: "2rem" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                marginBottom: "4px",
                            }}
                        >
                            <span style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>
                                {t.monthlyRevenue}:
                            </span>
                            <span style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>
                                {formatCurrency(monthlyRevenue)}
                            </span>
                        </div>
                        <input
                            className="roi-slider"
                            type="range"
                            min="1000"
                            max="100000"
                            step="1000"
                            value={monthlyRevenue}
                            onChange={(e) => setMonthlyRevenue(parseInt(e.target.value))}
                        />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "12px",
                                color: "rgba(255,255,255,0.4)",
                                marginTop: "4px",
                            }}
                        >
                            <span>$1,000</span>
                            <span>$100,000</span>
                        </div>
                    </div>

                    {/* Package Selection */}
                    <div style={{ marginBottom: "2rem" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                marginBottom: "4px",
                            }}
                        >
                            <span style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>
                                {t.emailPackage}:
                            </span>
                            <span style={{ fontSize: "16px", fontWeight: 600, color: "#814ac8" }}>
                                {selectedPackage.automations} {t.automations} · ${selectedPackage.price}
                            </span>
                        </div>
                        <input
                            className="roi-slider"
                            type="range"
                            min="0"
                            max="2"
                            step="1"
                            value={PACKAGES.findIndex((p) => p.price === systemPrice)}
                            onChange={(e) => setSystemPrice(PACKAGES[parseInt(e.target.value)].price)}
                        />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "12px",
                                color: "rgba(255,255,255,0.4)",
                                marginTop: "4px",
                            }}
                        >
                            {PACKAGES.map((pkg) => (
                                <span key={pkg.key}>
                                    {pkg.automations} aut.
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Sales Increase Slider */}
                    <div style={{ marginBottom: "2rem" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                marginBottom: "4px",
                            }}
                        >
                            <span style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>
                                {t.salesIncrease}:
                            </span>
                            <span style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>
                                {growthPercentage}%
                            </span>
                        </div>
                        <input
                            className="roi-slider"
                            type="range"
                            min="10"
                            max="20"
                            step="1"
                            value={growthPercentage}
                            onChange={(e) => setGrowthPercentage(parseInt(e.target.value))}
                        />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "12px",
                                color: "rgba(255,255,255,0.4)",
                                marginTop: "4px",
                            }}
                        >
                            <span>10%</span>
                            <span>15%</span>
                            <span>20%</span>
                        </div>
                    </div>
                </div>

                {/* Right: Results */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "16px",
                        padding: "2rem",
                    }}
                >
                    <h2
                        className="roi-results-title"
                        style={{
                            fontSize: "26px",
                            fontWeight: 500,
                            color: "#fff",
                            margin: "0 0 1.5rem 0",
                            lineHeight: 1.3,
                        }}
                    >
                        {t.resultsTitle}{" "}
                        <span style={{ color: "#814ac8" }}>{t.resultsHighlight}</span>
                    </h2>

                    <div className="roi-result-row">
                        <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>
                            {t.emailPackage}:
                        </span>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>
                            {selectedPackage.automations} {t.automations}
                        </span>
                    </div>

                    <div className="roi-result-row">
                        <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>
                            {t.monthlyInvestment}:
                        </span>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: "#f59e0b" }}>
                            ${selectedPackage.price}
                        </span>
                    </div>

                    <div className="roi-result-row">
                        <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>
                            {t.increase}:
                        </span>
                        <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>
                            {growthPercentage}%
                        </span>
                    </div>

                    <div className="roi-result-row">
                        <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>
                            {t.monthlyGain}:
                        </span>
                        <span style={{ fontSize: "16px", fontWeight: 700, color: "#10b981" }}>
                            {formatCurrency(results.monthlyIncrease)}
                        </span>
                    </div>

                    {/* Return in 1 Year — highlighted */}
                    <div className="roi-result-row">
                        <div>
                            <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>
                                {t.returnYear}
                            </div>
                        </div>
                        <span style={{ fontSize: "22px", fontWeight: 800, color: "#10b981" }}>
                            {formatCurrency(results.yearlyReturn)}
                        </span>
                    </div>

                    {/* Payback */}
                    <div className="roi-result-row">
                        <div>
                            <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)" }}>
                                {t.payback}
                            </div>
                            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                                {t.paybackSub}
                            </div>
                        </div>
                        <span style={{ fontSize: "18px", fontWeight: 700, color: "#f59e0b" }}>
                            {results.paybackMonths} {results.paybackMonths === 1 ? t.month : t.months}
                        </span>
                    </div>

                    {/* ROI in 1 Year — most prominent */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "16px 0 4px",
                        }}
                    >
                        <span style={{ fontSize: "18px", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                            {t.roiYear}:
                        </span>
                        <span
                            style={{
                                fontSize: "32px",
                                fontWeight: 800,
                                color: "#814ac8",
                            }}
                        >
                            {formatROI(results.roi)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

addPropertyControls(SimpleROICalculator, {
    language: {
        type: ControlType.Enum,
        options: ["en", "pt"],
        defaultValue: "en",
        title: "Language",
    },
})
