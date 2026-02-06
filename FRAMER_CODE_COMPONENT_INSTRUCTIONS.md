# Como Usar o ROI Calculator no Framer (Code Component)

## 📋 Passos para Adicionar ao Framer

### 1. Copiar o Código

Abra o arquivo `ROICalculatorFramer.tsx` e copie **TODO** o conteúdo (Ctrl+A, Ctrl+C)

### 2. Criar Code Component no Framer

1. Abra seu projeto no Framer
2. No painel esquerdo, clique no ícone **"+"** para adicionar
3. Selecione **"Code"** ou **"Code Component"**
4. Nomeie o component como `ROICalculator`

### 3. Colar o Código

1. Delete qualquer código de exemplo que aparecer
2. Cole o código copiado (Ctrl+V)
3. O Framer irá automaticamente compilar o componente

### 4. Usar no Canvas

1. Procure `ROICalculator` no painel de componentes
2. Arraste para o canvas
3. Ajuste o tamanho conforme necessário (recomendado: largura total, altura mínima 2000px)

## ⚙️ Configurações Disponíveis

Quando você seleciona o componente no canvas, verá estas propriedades no painel direito:

### **Default Language**
- `en` (Inglês) - Padrão
- `pt` (Português)
- Define qual idioma aparece quando a página carrega

### **WhatsApp Number**
- Padrão: `3584578337530`
- Formato: número internacional sem `+` ou espaços
- Exemplo: `351912345678`

### **Cal.com Link**
- Padrão: `andre-lopes/revenue-recovery-potential`
- Insira o seu link do Cal.com
- Formato: `seu-usuario/nome-evento`

## 🎨 Personalização

### Mudar Cores

No código, procure e substitua:

**Cor Principal (Azul):**
```
#2563eb → SUA_COR
```

**Cor de Sucesso (Verde):**
```
#22c55e → SUA_COR
```

**Cor de ROI Alto (Roxo):**
```
#9333ea → SUA_COR
```

### Mudar Valores dos Pacotes

Procure esta seção no código:
```typescript
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
}
```

Altere os valores de `price` conforme necessário.

### Adicionar/Remover Idiomas

Para adicionar mais idiomas, expanda o objeto `translations`:

```typescript
const translations = {
    pt: { ... },
    en: { ... },
    es: { // Espanhol
        title: "Calculadora de ROI",
        // ... resto das traduções
    }
}
```

## 📱 Responsividade

O componente é **totalmente responsivo** e funciona em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## ✅ Funcionalidades Incluídas

- ✅ Calculadora de ROI em tempo real
- ✅ 3 pacotes de preços (€300, €500, €700)
- ✅ Slider de crescimento (10-20%)
- ✅ Resultados para 1 mês, 6 meses, 1 ano, 2 anos
- ✅ Cartões de resumo (Investimento, Retorno, Payback)
- ✅ Calendário Cal.com integrado
- ✅ Botão WhatsApp
- ✅ Suporte bilíngue (PT/EN)
- ✅ Troca de idioma em tempo real
- ✅ Design premium com animações

## 🐛 Troubleshooting

### Erro: "Cannot find module 'framer'"
- Certifique-se de estar criando um **Code Component** dentro do Framer (não um arquivo TypeScript externo)

### Calendário não aparece
- Verifique se o link do Cal.com está correto
- Formato correto: `usuario/nome-evento` (sem https://)

### Botão WhatsApp não funciona
- Verifique se o número está no formato internacional sem `+`
- Exemplo: `351912345678` (não `+351 912 345 678`)

## 💡 Dicas

1. **Altura Mínima**: Defina altura mínima de 2000px para o componente
2. **Largura Total**: Use 100% da largura para melhor experiência
3. **Performance**: O componente é otimizado e carrega rápido
4. **SEO**: Todo o texto é renderizado (bom para SEO)

## 📚 Recursos Adicionais

- [Framer Code Components](https://www.framer.com/docs/code-components/)
- [Cal.com Documentation](https://cal.com/docs)
- [WhatsApp Click to Chat](https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat)
