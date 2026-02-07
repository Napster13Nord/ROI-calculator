import { addPropertyControls, ControlType } from "framer"
import { useState, useEffect } from "react"

interface Props {
    language?: "en" | "pt"
}

const translations = {
    pt: {
        storeData: "Dados da Sua Loja Online",
        monthlyRevenue: "Faturamento Mensal",
        placeholder: "€50,000",
        emailPackage: "Pacote de Automações",
        essential: "Essencial",
        professional: "Profissional",
        complete: "Completo",
        salesIncrease: "Aumento de Vendas",
        basicFlows: "Flows Básicos",
        completeSystem: "Sistema Completo",
        roiResults: "ROI do Sistema ThriveFlows",
        oneMonth: "1 mês",
        sixMonths: "6 meses",
        oneYear: "1 ano",
        twoYears: "2 anos",
        profit: "Lucro",
        investment: "Investimento",
        setupOnly: "Setup único",
        returnYear: "Retorno 1 Ano",
        payback: "Payback",
        months: "meses",
        month: "mês",
        enterRevenue: "Insira o faturamento da sua loja",
        discover: "Descubra quanto você pode ganhar!",
    },
    en: {
        storeData: "Your Online Store Data",
        monthlyRevenue: "Monthly Revenue",
        placeholder: "€50,000",
        emailPackage: "Email Package",
        essential: "Essential",
        professional: "Professional",
        complete: "Complete",
        salesIncrease: "Sales Increase",
        basicFlows: "Basic Flows",
        completeSystem: "Complete System",
        roiResults: "ThriveFlows System ROI",
        oneMonth: "1 month",
        sixMonths: "6 months",
        oneYear: "1 year",
        twoYears: "2 years",
        profit: "Profit",
        investment: "Investment",
        setupOnly: "One-time setup",
        returnYear: "Return 1 Year",
        payback: "Payback",
        months: "months",
        month: "month",
        enterRevenue: "Enter your store's revenue",
        discover: "Discover how much you could earn!",
    },
}

export default function SimpleROICalculator(props: Props) {
    const { language = "en" } = props
    const t = translations[language]

    const [monthlyRevenue, setMonthlyRevenue] = useState("")
    const [systemPrice, setSystemPrice] = useState(500)
    const [growthPercentage, setGrowthPercentage] = useState(15)
    const [roiData, setRoiData] = useState<any>(null)

    useEffect(() => {
        if (monthlyRevenue) {
            const revenue = parseFloat(
                monthlyRevenue.replace(/[^\d.,]/g, "").replace(",", ".")
            )
            if (revenue && revenue > 0) {
                const monthlyIncrease = (revenue * growthPercentage) / 100

                const results = {
                    oneMonth: {
                        totalGain: monthlyIncrease,
                        roi:
                            ((monthlyIncrease - systemPrice) / systemPrice) *
                            100,
                        profit: monthlyIncrease - systemPrice,
                        monthsToBreakEven: Math.ceil(
                            systemPrice / monthlyIncrease
                        ),
                    },
                    sixMonths: {
                        totalGain: monthlyIncrease * 6,
                        roi:
                            ((monthlyIncrease * 6 - systemPrice) /
                                systemPrice) *
                            100,
                        profit: monthlyIncrease * 6 - systemPrice,
                    },
                    oneYear: {
                        totalGain: monthlyIncrease * 12,
                        roi:
                            ((monthlyIncrease * 12 - systemPrice) /
                                systemPrice) *
                            100,
                        profit: monthlyIncrease * 12 - systemPrice,
                    },
                    twoYears: {
                        totalGain: monthlyIncrease * 24,
                        roi:
                            ((monthlyIncrease * 24 - systemPrice) /
                                systemPrice) *
                            100,
                        profit: monthlyIncrease * 24 - systemPrice,
                    },
                }

                setRoiData(results)
            }
        }
    }, [monthlyRevenue, systemPrice, growthPercentage])

    const formatNumber = (num: number) => {
        return Math.round(num)
            .toLocaleString("pt-PT")
            .replace(/\s/g, "")
    }

    const formatPercentage = (value: number) => {
        return (value > 0 ? "+" : "") + value.toFixed(0) + "%"
    }

    const getROIColor = (roi: number) => {
        if (roi >= 1000) return "#10b981"
        if (roi >= 500) return "#22c55e"
        if (roi >= 200) return "#8b5cf6"
        if (roi >= 0) return "#a855f7"
        return "#ef4444"
    }

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 1rem",
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
        >
            <style>
                {`
                    @media (max-width: 1024px) {
                        .calc-grid {
                            grid-template-columns: 1fr !important;
                            gap: 2rem !important;
                        }
                    }
                    @media (max-width: 768px) {
                        .packages-grid {
                            grid-template-columns: 1fr !important;
                            gap: 0.75rem !important;
                        }
                        .summary-cards-grid {
                            grid-template-columns: 1fr !important;
                            gap: 1rem !important;
                        }
                        .package-btn {
                            padding: 1.25rem !important;
                        }
                    }
                `}
            </style>

            <div
                className="calc-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "3rem",
                }}
            >
                {/* Input Section */}
                <div
                    style={{
                        background: "linear-gradient(135deg, rgba(20, 20, 30, 0.9), rgba(30, 30, 40, 0.8))",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                        borderRadius: "20px",
                        padding: "2rem",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "2rem",
                            paddingBottom: "1rem",
                            borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
                        }}
                    >
                        <div
                            style={{
                                width: "8px",
                                height: "32px",
                                background: "linear-gradient(180deg, #8b5cf6, #a855f7)",
                                borderRadius: "4px",
                            }}
                        />
                        <h3
                            style={{
                                fontSize: "18px",
                                fontWeight: 700,
                                color: "#fff",
                                margin: 0,
                            }}
                        >
                            {t.storeData}
                        </h3>
                    </div>

                    {/* Revenue Input */}
                    <div style={{ marginBottom: "1.75rem" }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#fff",
                                marginBottom: "8px",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                            }}
                        >
                            {t.monthlyRevenue}
                        </label>
                        <div style={{ position: "relative" }}>
                            <span
                                style={{
                                    position: "absolute",
                                    left: "18px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    color: "#fff",
                                }}
                            >
                                €
                            </span>
                            <input
                                type="text"
                                value={monthlyRevenue}
                                onChange={(e) =>
                                    setMonthlyRevenue(e.target.value)
                                }
                                placeholder={t.placeholder}
                                style={{
                                    width: "100%",
                                    maxWidth: "100%",
                                    padding: "18px 18px 18px 50px",
                                    background: "rgba(0, 0, 0, 0.4)",
                                    border: "1px solid rgba(139, 92, 246, 0.4)",
                                    borderRadius: "12px",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#fff",
                                    outline: "none",
                                    transition: "all 0.3s",
                                    boxSizing: "border-box",
                                    minWidth: 0,
                                }}
                                onFocus={(e) => {
                                    e.target.style.border = "1px solid #8b5cf6"
                                    e.target.style.boxShadow =
                                        "0 0 0 3px rgba(139, 92, 246, 0.1)"
                                }}
                                onBlur={(e) => {
                                    e.target.style.border =
                                        "1px solid rgba(139, 92, 246, 0.4)"
                                    e.target.style.boxShadow = "none"
                                }}
                            />
                        </div>
                    </div>

                    {/* Package Selection */}
                    <div style={{ marginBottom: "1.75rem" }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#fff",
                                marginBottom: "8px",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                            }}
                        >
                            {t.emailPackage}
                        </label>
                        <div
                            className="packages-grid"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "0.75rem",
                            }}
                        >
                            {[
                                { price: 300, name: t.essential, automations: 3 },
                                { price: 500, name: t.professional, automations: 5 },
                                { price: 700, name: t.complete, automations: 8 },
                            ].map(({ price, name, automations }) => (
                                <button
                                    key={price}
                                    onClick={() => setSystemPrice(price)}
                                    className="package-btn"
                                    style={{
                                        position: "relative",
                                        padding: "1rem",
                                        background:
                                            systemPrice === price
                                                ? "linear-gradient(135deg, #8b5cf6, #a855f7)"
                                                : "rgba(0, 0, 0, 0.3)",
                                        border:
                                            systemPrice === price
                                                ? "2px solid #a855f7"
                                                : "1px solid rgba(139, 92, 246, 0.2)",
                                        borderRadius: "12px",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        transition: "all 0.3s",
                                        overflow: "hidden",
                                    }}
                                >
                                    {systemPrice === price && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                background: "rgba(255, 255, 255, 0.2)",
                                                color: "#fff",
                                                fontSize: "10px",
                                                fontWeight: 700,
                                                padding: "4px 8px",
                                                borderBottomLeftRadius: "8px",
                                            }}
                                        >
                                            ✓
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            color: "#fff",
                                            marginBottom: "6px",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        {automations} Automations
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "24px",
                                            fontWeight: 700,
                                            color: "#fff",
                                            marginBottom: "2px",
                                        }}
                                    >
                                        €{price}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            color:
                                                systemPrice === price
                                                    ? "rgba(255, 255, 255, 0.8)"
                                                    : "rgba(255, 255, 255, 0.5)",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Slider */}
                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "12px",
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#fff",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                {t.salesIncrease}
                            </label>
                            <div
                                style={{
                                    background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                                    padding: "6px 16px",
                                    borderRadius: "20px",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        color: "#fff",
                                    }}
                                >
                                    {growthPercentage}%
                                </span>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="20"
                            value={growthPercentage}
                            onChange={(e) =>
                                setGrowthPercentage(parseInt(e.target.value))
                            }
                            style={{
                                width: "100%",
                                height: "6px",
                                borderRadius: "3px",
                                background:
                                    "linear-gradient(90deg, #8b5cf6, #a855f7)",
                                outline: "none",
                                cursor: "pointer",
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "11px",
                                color: "rgba(255, 255, 255, 0.4)",
                                marginTop: "8px",
                                fontWeight: 500,
                            }}
                        >
                            <span>10%</span>
                            <span>15%</span>
                            <span>20%</span>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div
                    style={{
                        background: "linear-gradient(135deg, rgba(20, 20, 30, 0.9), rgba(30, 30, 40, 0.8))",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                        borderRadius: "20px",
                        padding: "2rem",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "2rem",
                            paddingBottom: "1rem",
                            borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
                        }}
                    >
                        <div
                            style={{
                                width: "8px",
                                height: "32px",
                                background: "linear-gradient(180deg, #8b5cf6, #a855f7)",
                                borderRadius: "4px",
                            }}
                        />
                        <h3
                            style={{
                                fontSize: "18px",
                                fontWeight: 700,
                                color: "#fff",
                                margin: 0,
                            }}
                        >
                            {t.roiResults}
                        </h3>
                    </div>

                    {!roiData ? (
                        <div
                            style={{
                                textAlign: "center",
                                padding: "3rem 1rem",
                            }}
                        >
                            <h4
                                style={{
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "rgba(255, 255, 255, 0.7)",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                {t.enterRevenue}
                            </h4>
                            <p
                                style={{
                                    color: "rgba(255, 255, 255, 0.5)",
                                    fontSize: "14px",
                                }}
                            >
                                {t.discover}
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* ROI Cards Grid */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: "1rem",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                {[
                                    { period: t.oneMonth, data: roiData.oneMonth },
                                    {
                                        period: t.sixMonths,
                                        data: roiData.sixMonths,
                                    },
                                    { period: t.oneYear, data: roiData.oneYear },
                                    {
                                        period: t.twoYears,
                                        data: roiData.twoYears,
                                    },
                                ].map(({ period, data }) => (
                                    <div
                                        key={period}
                                        style={{
                                            background: "rgba(0, 0, 0, 0.3)",
                                            padding: "1.5rem",
                                            borderRadius: "12px",
                                            border:
                                                "1px solid rgba(139, 92, 246, 0.2)",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                color: "rgba(255, 255, 255, 0.7)",
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            {period}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "28px",
                                                fontWeight: 700,
                                                color: getROIColor(data.roi),
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            {formatPercentage(data.roi)}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "13px",
                                                color: "rgba(255, 255, 255, 0.6)",
                                            }}
                                        >
                                            {t.profit}: €{formatNumber(data.profit)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary Cards */}
                            <div
                                className="summary-cards-grid"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: "1rem",
                                }}
                            >
                                {/* Investment */}
                                <div
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))",
                                        padding: "1.25rem",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(16, 185, 129, 0.3)",
                                        textAlign: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#10b981",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        {t.investment}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "22px",
                                            fontWeight: 700,
                                            color: "#10b981",
                                            marginBottom: "0.25rem",
                                        }}
                                    >
                                        €{systemPrice}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            color: "rgba(16, 185, 129, 0.8)",
                                        }}
                                    >
                                        {t.setupOnly}
                                    </div>
                                </div>

                                {/* Return */}
                                <div
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1))",
                                        padding: "1.25rem",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(139, 92, 246, 0.3)",
                                        textAlign: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#8b5cf6",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        {t.returnYear}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "22px",
                                            fontWeight: 700,
                                            color: "#8b5cf6",
                                            marginBottom: "0.25rem",
                                        }}
                                    >
                                        €{formatNumber(roiData.oneYear.profit)}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            color: "rgba(139, 92, 246, 0.8)",
                                        }}
                                    >
                                        {formatPercentage(roiData.oneYear.roi)}
                                    </div>
                                </div>

                                {/* Payback */}
                                <div
                                    style={{
                                        background:
                                            "linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(192, 132, 252, 0.1))",
                                        padding: "1.25rem",
                                        borderRadius: "12px",
                                        border: "1px solid rgba(168, 85, 247, 0.3)",
                                        textAlign: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#a855f7",
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        {t.payback}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "22px",
                                            fontWeight: 700,
                                            color: "#a855f7",
                                            marginBottom: "0.25rem",
                                        }}
                                    >
                                        {roiData.oneMonth.monthsToBreakEven}{" "}
                                        {roiData.oneMonth.monthsToBreakEven === 1
                                            ? t.month
                                            : t.months}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            color: "rgba(168, 85, 247, 0.8)",
                                        }}
                                    >
                                        {t.month}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
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
