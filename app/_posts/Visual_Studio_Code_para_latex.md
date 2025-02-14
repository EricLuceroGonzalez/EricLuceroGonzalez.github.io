---
slug: 'Visual_Studio_Code_para_latex'
id: 'latex-003'
date: "2024-07-01"
order: 4
author: "Eric Lucero"
authorAvatar: https://avatar.iran.liara.run/public/boy
doctype: "latex"
title: "Visual Studio Code para LaTeX"
shortTitle: "Editores de texto"
entryType: "latex"
excerpt: "Explora cómo usar Visual Studio Code como editor principal para LaTeX, destacando su integración con GitHub, extensiones y la preferencia por TeX Live."
---

En este tutorial, recomendamos usar **Visual Studio Code (VS Code)** como el editor principal para trabajar con LaTeX. VS Code es un editor de código fuente gratuito, ligero y altamente extensible que, con las configuraciones adecuadas, es ideal para la escritura de documentos en LaTeX.

## ¿Por qué usar Visual Studio Code?

VS Code no solo es poderoso, sino que también ofrece una excelente integración con **GitHub** para controlar versiones de tus proyectos, muchas extensiones útiles y soporte para múltiples lenguajes de programación, incluyendo LaTeX. 

Algunas de las razones para usar VS Code son:

1. **Extensiones poderosas**: VS Code cuenta con una amplia gama de extensiones para facilitar la escritura y compilación de documentos en LaTeX.
2. **Integración con GitHub**: Puedes gestionar fácilmente tus repositorios de GitHub, hacer commits, ver el historial de cambios, y trabajar de manera colaborativa con otros usuarios.
3. **Soporte multiplataforma**: Funciona perfectamente en **Windows**, **macOS** y **Linux**.
4. **Formatters**: VS Code ofrece autoformato para diferentes lenguajes, permitiendo mantener tu código limpio y estructurado.

## Instalación de TeX Live

Recomendamos usar **TeX Live** como la distribución preferida para LaTeX en todos los sistemas operativos, debido a su amplia compatibilidad y paquete completo.

### Instalación de TeX Live en Windows

1. **Descarga TeX Live** desde su [página oficial](https://www.tug.org/texlive/).
2. Ejecuta el instalador y sigue las instrucciones en pantalla.
3. Añade el directorio de TeX Live a las variables de entorno del sistema para poder ejecutar comandos como `pdflatex` desde la terminal.

### Instalación de TeX Live en macOS

1. Abre la terminal y ejecuta el siguiente comando para instalar **Homebrew** si no lo tienes instalado:

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
2. Luego, instala TeX Live con Homebrew:
    ```bash
    brew install --cask mactex
# Instalación de Visual Studio Code

Puedes descargar **VS Code** desde su [sitio oficial](https://code.visualstudio.com/). Está disponible para **Windows**, **macOS** y **Linux**.

## Extensiones recomendadas para LaTeX

Para convertir **Visual Studio Code** en un potente editor de **LaTeX**, te recomendamos instalar las siguientes extensiones:

### 1. LaTeX Workshop

La extensión **LaTeX Workshop** es la más completa y poderosa para trabajar con LaTeX en VS Code. Facilita la compilación de documentos, previsualización en tiempo real y autocompletado de comandos de LaTeX.

**Instalación**:  
Abre VS Code, ve a la sección de extensiones (ícono de cuadrito en la barra lateral) y busca "LaTeX Workshop". Instálala.

**Características**:
- Compilación automática y manual de archivos `.tex`.
- Vista previa de los documentos PDF generados.
- Autocompletado de comandos y referencias cruzadas.

### 2. GitLens

Para aprovechar la integración con **GitHub**, **GitLens** es una extensión imprescindible. Te permite visualizar el historial de cambios, hacer commits directamente desde el editor, y comparar versiones.

**Instalación**:  
En la sección de extensiones, busca "GitLens" e instálala.

**Características**:
- Visualiza los cambios realizados por cada colaborador.
- Compara versiones anteriores del código.
- Gestiona tus repositorios de GitHub sin salir del editor.

### 3. Prettier - Code Formatter

Para mantener tu código limpio y bien formateado, puedes usar **Prettier**. Aunque esta extensión está diseñada para varios lenguajes, es útil para mantener la consistencia en la escritura de código LaTeX también.

**Instalación**:  
Busca "Prettier - Code Formatter" en la sección de extensiones.

**Características**:
- Autoformateo de tu código para mantener una estructura limpia y clara.
- Personalización de las reglas de formateo.

## Configuración de VS Code para LaTeX

Una vez instaladas las extensiones, realiza algunas configuraciones adicionales para optimizar tu experiencia con LaTeX:

### Configura la compilación automática

En el archivo `settings.json` de VS Code, agrega la siguiente configuración para que **LaTeX Workshop** compile automáticamente al guardar un archivo `.tex`:

```json
"latex-workshop.latex.autoBuild.run": "onSave"
