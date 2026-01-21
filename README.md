# 🌐 ericlucero.dev: Personal Portfolio & Digital Garden

[![Project Status](https://img.shields.io/badge/Status-Production%20%26%20Active-brightgreen)](https://ericlucero.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Author](https://img.shields.io/badge/Author-Eric%20Lucero%20Gonz%C3%A1lez-informational)](https://github.com/EricLuceroGonzalez)

---

## 🌟 Overview

This repository contains the **source code** for **Eric Lucero González's** personal website and professional portfolio.

The site serves as a **digital business card** and a **content playground**, showcasing my professional experience, **technical stack**, and a curated selection of engineering projects. It is also a medium to document technical deep-dives into topics that interest me, ranging from Web Development to Algorithms.

### 🔗 Live Deployment

The application is deployed on **Vercel** for optimal performance:

**Live URL:** [https://ericlucero.dev/](https://ericlucero.dev/)

---

## 🧪 Laboratory & Roadmap

This portfolio is a living product. Here is what I am currently engineering or planning to ship soon:

- [ ] **Blog posts:** Implementing **Metaheuristic Algorithms** to solve the problem of the Tetonor game.
- [ ] **Blog posts:** Part 2 of TeX history.
- [ ] **Blog posts:** LaTeX history.
- [ ] **Blog posts:** The stackoverflow questions.
- [ ] **Performance:** Achieving 100/100 Core Web Vitals score.

*Last update: January 2026*

---

## 🚀 Tech Stack

This project uses a modern, component-driven architecture focused on performance and developer experience.

### Frontend & Styling
* **Next.js (App Router):** Main framework for Server-Side Rendering (SSR) and Static Site Generation (SSG).
* **JavaScript (ES6+):** Core logic and component interactivity.
* **Styled Components:** CSS-in-JS library for building modular, scoped, and dynamic UI components.
* **Vercel:** Hosting, CI/CD, and Edge Network deployment.

### Content Engineering (MDX)
The blog engine powers advanced technical writing, supporting extended syntax and mathematical formulas:

| Library | Function |
| :--- | :--- |
| `remark-gfm` | Adds support for **GitHub Flavored Markdown** (tables, strikethrough, etc.). |
| `remark-math` | Enables **$\LaTeX$** syntax parsing for mathematical equations. |
| `rehype-mathjax` | Renders the parsed $\LaTeX$ into accessible HTML using **MathJax**. |
| `supersub` | Extends syntax for superscripts and subscripts. |
| `rehype-highlight` | Provides syntax highlighting for code blocks within posts. |

---

## 📂 Project Structure

A quick look at the top-level architecture:

```text
.
├── app/             # Next.js App Router (Pages, Layouts, API)
├── components/      # Reusable UI Atoms (Styled Components)
├── lib/             # Business logic (Algorithms, Constants, Utils)
├── posts/           # MDX Content Files (Blog posts)
├── public/          # Static assets (Images, Robots.txt)
└── messages/        # i18n JSON strings
```

---

## ⚙️ Local Development

Follow these steps to clone and run the application locally.

### Prerequisites

* **Git** installed.
* **Node.js** (LTS version recommended) and **npm** or **yarn**.

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/EricLuceroGonzalez/EricLuceroGonzalez.github.io.git
    cd EricLuceroGonzalez.github.io
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or if using yarn: yarn install
    ```

3.  **Environment Setup:**
    Rename `.env.example` to `.env.local` (if applicable) or ensure you have the necessary keys.

### Running the Server

Start the local development server:
```bash
npm run dev
```

### Preview

Open your browser and navigate to:
**http://localhost:3000**

---

## 🤝 Contribution

Feedback and contributions are welcome. If you find a bug or have a suggestion:

1.  Open an **Issue** to describe the problem (typos, bugs, accessibility).
2.  Create a **Pull Request** with your proposed solution.

---

## 📄 License

This project is distributed under the **MIT License**.

### Rights Granted

This open-source license is highly permissive and allows:

| Permissions | Description |
| :--- | :--- |
| **Commercial Use** | You can use, copy, and distribute this for commercial projects. |
| **Modification** | You can modify the source code. |
| **Distribution** | You can redistribute the code. |
| **Sublicense** | You can grant licenses to others. |

### Condition (Mandatory)

The only condition is that the **original copyright notice** and the MIT License permission notice **must be included** in all copies or substantial portions of the Software.

* **Copyright © 2026 Eric Lucero González.**
* **Author:** Eric Lucero González - [GitHub](https://github.com/EricLuceroGonzalez)

For full terms, please refer to the **`LICENSE`** file in the root directory.