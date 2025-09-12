# Page Transitions Kit

Uma biblioteca **React/Next.js** para criar transições de página suaves e configuráveis, usando **Framer Motion**. Compatível com **TypeScript** e totalmente tipada.

---

## 🔹 Instalação

Com **pnpm**:

```bash
pnpm add page-transitions-kit framer-motion
```

> **Obs:** `framer-motion` é uma dependência peer, então precisa instalar no projeto que usar a lib.

---

## 🔹 Dependências peer

- `react` ≥ 18
- `react-dom` ≥ 18
- `next` ≥ 13
- `framer-motion`

---

## 🔹 Uso com Next.js (App Router)

No **Root Layout** do Next.js:

```tsx
import {
  PageTransitionProvider,
  PageTransitionLayout,
} from 'page-transitions-kit'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PageTransitionProvider
          config={{
            defaultAnimation: 'fade', // fade | slide-left | slide-right | scale
            duration: 0.5, // duração padrão em segundos
            routeAnimations: {
              '/about': {
                initial: { x: 100 },
                animate: { x: 0 },
                exit: { x: -100 },
                duration: 0.6,
              },
            },
            loader: <div>Carregando...</div>, // opcional
          }}
        >
          <PageTransitionLayout>{children}</PageTransitionLayout>
        </PageTransitionProvider>
      </body>
    </html>
  )
}
```

---

## 🔹 Configuração de animações

A lib suporta animações **globais** e **por rota**:

```ts
type AnimationType = 'fade' | 'slide-left' | 'slide-right' | 'scale'

interface AnimationConfig {
  initial?: object
  animate?: object
  exit?: object
  duration?: number
}
```

Exemplo de `routeAnimations`:

```ts
routeAnimations: {
  "/about": {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    duration: 0.6
  },
  "/contact": {
    initial: { scale: 0.9 },
    animate: { scale: 1 },
    exit: { scale: 0.9 },
    duration: 0.5
  }
}
```

---

## 🔹 API

### `<PageTransitionProvider>`

Envolve a aplicação e fornece a configuração global:

```tsx
<PageTransitionProvider config={config}>{children}</PageTransitionProvider>
```

**Props:**

| Prop               | Tipo                              | Descrição                                |
| ------------------ | --------------------------------- | ---------------------------------------- | ------------- | -------- | --------------- |
| `defaultAnimation` | `"fade"                           | "slide-left"                             | "slide-right" | "scale"` | Animação padrão |
| `duration`         | `number`                          | Duração padrão em segundos               |
| `routeAnimations`  | `Record<string, AnimationConfig>` | Animações específicas por rota           |
| `loader`           | `ReactNode`                       | Loader opcional enquanto troca de página |

---

### `<PageTransitionLayout>`

Renderiza as páginas com animações. **Deve envolver `children` no Root Layout**.

```tsx
<PageTransitionLayout>{children}</PageTransitionLayout>
```

---

## 🔹 Dicas de uso

1. **Compatibilidade com Tailwind / CSS**
   - Você pode estilizar normalmente o wrapper ou os elementos filhos.
2. **Animações customizadas**
   - Pode passar qualquer objeto válido do **Framer Motion** em `initial`, `animate` e `exit`.
3. **Loader opcional**
   - Útil para mostrar feedback durante transições lentas.

---

## 🔹 Exemplo completo

```tsx
// app/layout.tsx
import {
  PageTransitionProvider,
  PageTransitionLayout,
} from 'page-transitions-kit'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PageTransitionProvider
          config={{
            defaultAnimation: 'slide-left',
            duration: 0.5,
            loader: <div className="text-center">Carregando...</div>,
          }}
        >
          <PageTransitionLayout>{children}</PageTransitionLayout>
        </PageTransitionProvider>
      </body>
    </html>
  )
}
```

---

## 🔹 Licença

MIT © Ayran Oliveira
