import { addPropertyControls, ControlType } from "framer"
import { useState, useEffect } from "react"

interface Props {
    defaultLanguage?: "en" | "pt"
    whatsappNumber?: string
    calComLink?: string
}

const translations = {
    pt: {
        title: "Calculadora de ROI do Sistema ThriveFlows",
        subtitle1:
            "Descubra quanta receita mensal nossas automações de email podem gerar para sua loja online.",
        subtitle2:
            "Sem anúncios pagos. Apenas um sistema de automação de email inteligente.",
        storeDataTitle: "Dados da Sua Loja Online",
        monthlyRevenueLabel: "Qual o faturamento mensal da sua loja online?",
        emailPackageLabel: "Pacote de Automações de Email",
        salesIncreaseLabel: "Aumento de Vendas via Automações de Email:",
        essential: "Essencial",
        professional: "Profissional",
        complete: "Completo",
        popular: "POPULAR",
        basicFlows: "Flows Básicos",
        completeSystem: "Sistema Completo",
        additionalRevenue: "Receita Adicional no Piloto Automático",
        perMonth: "por mês",
        roiResultsTitle: "ROI do Sistema ThriveFlows",
        enterRevenue: "Insira o faturamento da sua loja",
        discoverExtra:
            "E descubra quanto dinheiro extra o sistema pode gerar em piloto automático!",
        oneMonth: "1 mês",
        sixMonths: "6 meses",
        oneYear: "1 ano",
        twoYears: "2 anos",
        profit: "Lucro",
        investment: "Investimento",
        setupOnly: "Setup único do sistema",
        returnOneYear: "Retorno em 1 Ano",
        roiOf: "ROI de",
        payback: "Payback",
        totalReturn: "Retorno total do investimento",
        months: "meses",
        month: "mês",
        scheduleConsultation: "Agende uma Consulta Gratuita",
        preferWhatsApp: "Prefere conversar pelo WhatsApp?",
        contactWhatsApp: "Falar no WhatsApp",
    },
    en: {
        title: "ThriveFlows System ROI Calculator",
        subtitle1:
            "Discover how much monthly revenue our email automations can generate for your online store.",
        subtitle2: "No paid ads. Just an intelligent email automation system.",
        storeDataTitle: "Your Online Store Data",
        monthlyRevenueLabel: "What is your online store's monthly revenue?",
        emailPackageLabel: "Email Automation Package",
        salesIncreaseLabel: "Sales Increase via Email Automations:",
        essential: "Essential",
        professional: "Professional",
        complete: "Complete",
        popular: "POPULAR",
        basicFlows: "Basic Flows",
        completeSystem: "Complete System",
        additionalRevenue: "Additional Revenue on Autopilot",
        perMonth: "per month",
        roiResultsTitle: "ThriveFlows System ROI",
        enterRevenue: "Enter your store's revenue",
        discoverExtra:
            "And discover how much extra money the system can generate on autopilot!",
        oneMonth: "1 month",
        sixMonths: "6 months",
        oneYear: "1 year",
        twoYears: "2 years",
        profit: "Profit",
        investment: "Investment",
        setupOnly: "One-time system setup",
        returnOneYear: "Return in 1 Year",
        roiOf: "ROI of",
        payback: "Payback",
        totalReturn: "Total return on investment",
        months: "months",
        month: "month",
        scheduleConsultation: "Schedule a Free Consultation",
        preferWhatsApp: "Prefer to chat on WhatsApp?",
        contactWhatsApp: "Contact on WhatsApp",
    },
}

export default function ROICalculator(props: Props) {
    const {
        defaultLanguage = "en",
        whatsappNumber = "3584578337530",
        calComLink = "andre-lopes/revenue-recovery-potential",
    } = props

    const [language, setLanguage] = useState<"en" | "pt">(defaultLanguage)
    const [monthlyRevenue, setMonthlyRevenue] = useState("")
    const [systemPrice, setSystemPrice] = useState(500)
    const [growthPercentage, setGrowthPercentage] = useState(15)
    const [roiData, setRoiData] = useState<any>(null)

    const t = translations[language]

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

    useEffect(() => {
        // Load Cal.com script
        const script = document.createElement("script")
        script.innerHTML = `
            (function (C, A, L) {
                let p = function (a, ar) { a.q.push(ar); };
                let d = C.document;
                C.Cal = C.Cal || function () {
                    let cal = C.Cal;
                    let ar = arguments;
                    if (!cal.loaded) {
                        cal.ns = {};
                        cal.q = cal.q || [];
                        d.head.appendChild(d.createElement("script")).src = A;
                        cal.loaded = true;
                    }
                    if (ar[0] === L) {
                        const api = function () { p(api, arguments); };
                        const namespace = ar[1];
                        api.q = api.q || [];
                        if(typeof namespace === "string"){
                            cal.ns[namespace] = cal.ns[namespace] || api;
                            p(cal.ns[namespace], ar);
                            p(cal, ["initNamespace", namespace]);
                        } else p(cal, ar);
                        return;
                    }
                    p(cal, ar);
                };
            })(window, "https://app.cal.com/embed/embed.js", "init");

            Cal("init", "revenue-recovery-potential", {origin:"https://app.cal.com"});
            Cal.ns["revenue-recovery-potential"]("inline", {
                elementOrSelector:"#my-cal-inline",
                config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
                calLink: "${calComLink}",
            });
            Cal.ns["revenue-recovery-potential"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        `
        document.body.appendChild(script)

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script)
            }
        }
    }, [calComLink])

    const formatNumber = (num: number) => {
        return Math.round(num)
            .toLocaleString("pt-PT")
            .replace(/\s/g, "")
    }

    const formatPercentage = (value: number) => {
        return (value > 0 ? "+" : "") + value.toFixed(0) + "%"
    }

    const getROIColor = (roi: number) => {
        if (roi >= 1000) return "#059669"
        if (roi >= 500) return "#16a34a"
        if (roi >= 200) return "#2563eb"
        if (roi >= 0) return "#9333ea"
        return "#dc2626"
    }

    return (
        <div
            style={{
                width: "100%",
                background:
                    "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #dbeafe 100%)",
                minHeight: "100vh",
                padding: "2rem 1rem",
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <style>
                {`
                    @media (max-width: 1024px) {
                        .roi-grid {
                            grid-template-columns: 1fr !important;
                            gap: 2rem !important;
                        }
                    }
                    @media (max-width: 768px) {
                        .packages-grid {
                            gap: 0.5rem !important;
                        }
                        .package-btn {
                            padding: 0.75rem !important;
                        }
                        .package-price {
                            font-size: 18px !important;
                        }
                        .package-name {
                            font-size: 12px !important;
                        }
                    }
                `}
            </style>

            {/* Language Switcher */}
            <div
                style={{
                    position: "fixed",
                    top: "12px",
                    right: "12px",
                    zIndex: 50,
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(226, 232, 240, 0.6)",
                    borderRadius: "12px",
                    padding: "4px",
                    display: "flex",
                    gap: "4px",
                }}
            >
                <button
                    onClick={() => setLanguage("pt")}
                    style={{
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        background: language === "pt" ? "#2563eb" : "transparent",
                        color: language === "pt" ? "white" : "#64748b",
                        transition: "all 0.3s",
                    }}
                >
                    🇵🇹 PT
                </button>
                <button
                    onClick={() => setLanguage("en")}
                    style={{
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        background: language === "en" ? "#2563eb" : "transparent",
                        color: language === "en" ? "white" : "#64748b",
                        transition: "all 0.3s",
                    }}
                >
                    🇺🇸 EN
                </button>
            </div>

            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h1
                        style={{
                            fontSize: "clamp(24px, 5vw, 36px)",
                            fontWeight: 700,
                            color: "#0f172a",
                            marginBottom: "1.5rem",
                        }}
                    >
                        {t.title}
                    </h1>
                    <p
                        style={{
                            fontSize: "clamp(16px, 3vw, 20px)",
                            color: "#475569",
                            maxWidth: "768px",
                            margin: "0 auto",
                            lineHeight: 1.6,
                        }}
                    >
                        {t.subtitle1}
                        <br />
                        {t.subtitle2}
                    </p>
                </div>

                {/* Main Grid */}
                <div
                    className="roi-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "3rem",
                        marginBottom: "3rem",
                    }}
                >
                    {/* Input Section */}
                    <div
                        style={{
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(226, 232, 240, 0.6)",
                            borderRadius: "16px",
                            padding: "2rem",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "20px",
                                fontWeight: 700,
                                marginBottom: "1.5rem",
                            }}
                        >
                            💰 {t.storeDataTitle}
                        </h2>

                        {/* Revenue Input */}
                        <div style={{ marginBottom: "1.5rem" }}>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    marginBottom: "0.5rem",
                                }}
                            >
                                {t.monthlyRevenueLabel}
                            </label>
                            <div style={{ position: "relative" }}>
                                <span
                                    style={{
                                        position: "absolute",
                                        left: "16px",
                                        top: "16px",
                                        fontSize: "20px",
                                        fontWeight: 700,
                                        color: "#94a3b8",
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
                                    placeholder="Ex: €50,000"
                                    style={{
                                        width: "100%",
                                        padding: "16px 16px 16px 48px",
                                        border: "2px solid #cbd5e1",
                                        borderRadius: "12px",
                                        fontSize: "20px",
                                        fontWeight: 600,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Package Selection */}
                        <div style={{ marginBottom: "1.5rem" }}>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    marginBottom: "0.5rem",
                                }}
                            >
                                📧 {t.emailPackageLabel}
                            </label>
                            <div
                                className="packages-grid"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: "1rem",
                                }}
                            >
                                {[
                                    {
                                        price: 300,
                                        name: t.essential,
                                        popular: false,
                                    },
                                    {
                                        price: 500,
                                        name: t.professional,
                                        popular: true,
                                    },
                                    {
                                        price: 700,
                                        name: t.complete,
                                        popular: false,
                                    },
                                ].map(({ price, name, popular }) => (
                                    <button
                                        key={price}
                                        className="package-btn"
                                        onClick={() => setSystemPrice(price)}
                                        style={{
                                            position: "relative",
                                            padding: "1.5rem",
                                            border: `2px solid ${
                                                systemPrice === price
                                                    ? "#2563eb"
                                                    : "#cbd5e1"
                                            }`,
                                            borderRadius: "12px",
                                            background:
                                                systemPrice === price
                                                    ? "#eff6ff"
                                                    : "white",
                                            cursor: "pointer",
                                            textAlign: "center",
                                            transition: "all 0.3s",
                                        }}
                                    >
                                        {popular && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "-8px",
                                                    left: "50%",
                                                    transform:
                                                        "translateX(-50%)",
                                                    background:
                                                        "linear-gradient(135deg, #f97316, #ef4444)",
                                                    color: "white",
                                                    fontSize: "10px",
                                                    fontWeight: 700,
                                                    padding: "4px 12px",
                                                    borderRadius: "12px",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {t.popular}
                                            </div>
                                        )}
                                        <div
                                            className="package-price"
                                            style={{
                                                fontSize: "24px",
                                                fontWeight: 700,
                                                marginBottom: "4px",
                                            }}
                                        >
                                            €{price}
                                        </div>
                                        <div
                                            className="package-name"
                                            style={{
                                                fontSize: "14px",
                                                color: "#64748b",
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
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    marginBottom: "0.5rem",
                                }}
                            >
                                📈 {t.salesIncreaseLabel}{" "}
                                <span
                                    style={{
                                        fontSize: "24px",
                                        fontWeight: 700,
                                        color: "#2563eb",
                                    }}
                                >
                                    {growthPercentage}%
                                </span>
                            </label>
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
                                    height: "12px",
                                    borderRadius: "6px",
                                    background:
                                        "linear-gradient(90deg, #86efac, #22c55e)",
                                }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "12px",
                                    color: "#64748b",
                                    marginTop: "0.5rem",
                                }}
                            >
                                <span>10% ({t.basicFlows})</span>
                                <span>20% ({t.completeSystem})</span>
                            </div>
                        </div>

                        {monthlyRevenue && roiData && (
                            <div
                                style={{
                                    marginTop: "1.5rem",
                                    background:
                                        "linear-gradient(135deg, #eff6ff, #e0e7ff)",
                                    padding: "1rem",
                                    borderRadius: "12px",
                                    border: "1px solid #bfdbfe",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "14px",
                                        color: "#1e40af",
                                        fontWeight: 500,
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    📧 {t.additionalRevenue}
                                </div>
                                <div
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        color: "#1e3a8a",
                                    }}
                                >
                                    +€
                                    {formatNumber(roiData.oneMonth.totalGain)}{" "}
                                    {t.perMonth}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Section */}
                    <div
                        style={{
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(226, 232, 240, 0.6)",
                            borderRadius: "16px",
                            padding: "2rem",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "20px",
                                fontWeight: 700,
                                marginBottom: "1.5rem",
                            }}
                        >
                            📊 {t.roiResultsTitle}
                        </h2>

                        {!roiData ? (
                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "3rem 1rem",
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: 600,
                                        color: "#64748b",
                                    }}
                                >
                                    👆 {t.enterRevenue}
                                </h3>
                                <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
                                    {t.discoverExtra}
                                </p>
                            </div>
                        ) : (
                            <>
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(2, 1fr)",
                                        gap: "1rem",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    {[
                                        {
                                            period: t.oneMonth,
                                            data: roiData.oneMonth,
                                        },
                                        {
                                            period: t.sixMonths,
                                            data: roiData.sixMonths,
                                        },
                                        {
                                            period: t.oneYear,
                                            data: roiData.oneYear,
                                        },
                                        {
                                            period: t.twoYears,
                                            data: roiData.twoYears,
                                        },
                                    ].map(({ period, data }) => (
                                        <div
                                            key={period}
                                            style={{
                                                background: "white",
                                                padding: "1.5rem",
                                                borderRadius: "12px",
                                                border: "1px solid #e2e8f0",
                                                textAlign: "center",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: "16px",
                                                    fontWeight: 600,
                                                    marginBottom: "0.75rem",
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
                                            <div style={{ fontSize: "14px", color: "#64748b" }}>
                                                {t.profit}: €{formatNumber(data.profit)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gap: "1rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                                            padding: "1.5rem",
                                            borderRadius: "12px",
                                            border: "2px solid #bbf7d0",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: 700,
                                                color: "#15803d",
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            {t.investment}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "32px",
                                                fontWeight: 700,
                                                color: "#16a34a",
                                            }}
                                        >
                                            €{systemPrice}
                                        </div>
                                        <div style={{ fontSize: "14px", color: "#22c55e" }}>
                                            {t.setupOnly}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #eff6ff, #dbeafe)",
                                            padding: "1.5rem",
                                            borderRadius: "12px",
                                            border: "2px solid #bfdbfe",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: 700,
                                                color: "#1e40af",
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            {t.returnOneYear}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "32px",
                                                fontWeight: 700,
                                                color: "#2563eb",
                                            }}
                                        >
                                            €{formatNumber(roiData.oneYear.profit)}
                                        </div>
                                        <div style={{ fontSize: "14px", color: "#3b82f6" }}>
                                            {t.roiOf}{" "}
                                            {formatPercentage(roiData.oneYear.roi)}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #fdf4ff, #fae8ff)",
                                            padding: "1.5rem",
                                            borderRadius: "12px",
                                            border: "2px solid #f0abfc",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: 700,
                                                color: "#7e22ce",
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            {t.payback}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "32px",
                                                fontWeight: 700,
                                                color: "#9333ea",
                                            }}
                                        >
                                            {roiData.oneMonth.monthsToBreakEven}{" "}
                                            {roiData.oneMonth.monthsToBreakEven === 1
                                                ? t.month
                                                : t.months}
                                        </div>
                                        <div style={{ fontSize: "14px", color: "#a855f7" }}>
                                            {t.totalReturn}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Calendar Section */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(226, 232, 240, 0.6)",
                        borderRadius: "16px",
                        padding: "2rem",
                        marginBottom: "3rem",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "24px",
                            fontWeight: 700,
                            textAlign: "center",
                            marginBottom: "1.5rem",
                        }}
                    >
                        📅 {t.scheduleConsultation}
                    </h3>
                    <div
                        id="my-cal-inline"
                        style={{
                            width: "100%",
                            height: "600px",
                            overflow: "auto",
                            borderRadius: "12px",
                        }}
                    />

                    <div
                        style={{
                            marginTop: "2rem",
                            paddingTop: "2rem",
                            borderTop: "1px solid #e2e8f0",
                            textAlign: "center",
                        }}
                    >
                        <p
                            style={{
                                color: "#64748b",
                                marginBottom: "1rem",
                            }}
                        >
                            {t.preferWhatsApp}
                        </p>
                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "12px",
                                background:
                                    "linear-gradient(135deg, #22c55e, #16a34a)",
                                color: "white",
                                fontWeight: 700,
                                padding: "16px 32px",
                                borderRadius: "12px",
                                textDecoration: "none",
                                boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
                            }}
                        >
                            <span style={{ fontSize: "24px" }}>💬</span>
                            {t.contactWhatsApp}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

addPropertyControls(ROICalculator, {
    defaultLanguage: {
        type: ControlType.Enum,
        options: ["en", "pt"],
        defaultValue: "en",
        title: "Default Language",
    },
    whatsappNumber: {
        type: ControlType.String,
        defaultValue: "3584578337530",
        title: "WhatsApp Number",
    },
    calComLink: {
        type: ControlType.String,
        defaultValue: "andre-lopes/revenue-recovery-potential",
        title: "Cal.com Link",
    },
})
