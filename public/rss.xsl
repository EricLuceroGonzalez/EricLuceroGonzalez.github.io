<?xml version="1.0" encoding="UTF-8"?>
<!--
  Presentación del feed RSS en el navegador.
  Los lectores RSS ignoran este archivo; solo lo usan los navegadores
  cuando alguien abre /es/feed.xml o /en/feed.xml directamente.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="<http://www.w3.org/1999/XSL/Transform>"
  xmlns:atom="<http://www.w3.org/2005/Atom>">

  <xsl:output method="html" encoding="UTF-8" indent="yes"
    doctype-system="about:legacy-compat"/>

  <xsl:variable name="lang" select="/rss/channel/language"/>
  <xsl:variable name="es" select="$lang = 'es'"/>
  <xsl:variable name="feedUrl" select="/rss/channel/atom:link[@rel='self']/@href"/>

  <xsl:template match="/">
    <html lang="{$lang}">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>
          <xsl:value-of select="/rss/channel/title"/> · RSS
        </title>
        <style>
          :root {
            --bg: #F8F9FA; --fg: #1A1A1A; --muted: #5A6470; --card: #FFFFFF;
            --border: #DEE2E6; --accent: #0062D1; --on-accent: #FFFFFF; --soft: rgba(0, 119, 255, 0.08);
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #002332; --fg: #E0E6ED; --muted: #9FB0BC; --card: #002B3D;
              --border: #004966; --accent: #FF6B8E; --on-accent: #00222F; --soft: rgba(255, 51, 102, 0.12);
            }
          }
          * { box-sizing: border-box; }
          body {
            margin: 0; background: var(--bg); color: var(--fg);
            font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif;
          }
          main { max-width: 46rem; margin: 0 auto; padding: 2.5rem 1rem 4rem; }
          a { color: var(--accent); }
          .intro {
            background: var(--soft); border: 1px solid var(--border);
            border-radius: 16px; padding: 1.25rem 1.4rem; margin-bottom: 2rem;
          }
          .intro h1 { margin: 0 0 0.4rem; font-size: 1.35rem; line-height: 1.25; }
          .intro p { margin: 0.4rem 0; }
          .row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
          .url {
            flex: 1 1 18rem; min-width: 0; padding: 0.6rem 0.8rem;
            border: 1px solid var(--border); border-radius: 10px;
            background: var(--card); color: var(--fg);
            font: 0.85rem ui-monospace, SFMono-Regular, Menlo, monospace;
          }
          .btn {
            display: inline-flex; align-items: center; min-height: 44px;
            padding: 0 1rem; border-radius: 10px; border: 1px solid var(--accent);
            background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700;
            text-decoration: none; cursor: pointer;
          }
          .btn.ghost { background: transparent; color: var(--accent); }
          h2 {
            font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase;
            color: var(--muted); margin: 0 0 1rem;
          }
          ol { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.9rem; }
          li {
            background: var(--card); border: 1px solid var(--border);
            border-radius: 14px; padding: 1rem 1.2rem;
          }
          li h3 { margin: 0 0 0.3rem; font-size: 1.1rem; line-height: 1.3; }
          li h3 a { text-decoration: none; }
          li h3 a:hover { text-decoration: underline; }
          .meta { font-size: 0.85rem; color: var(--muted); margin: 0 0 0.4rem; }
          .desc { margin: 0; }
          .back { display: inline-block; margin-top: 2rem; font-weight: 600; }
        </style>
      </head>
      <body>
        <main>
          <section class="intro" aria-labelledby="what">
            <h1 id="what">
              <xsl:choose>
                <xsl:when test="$es">Este es el feed RSS de <xsl:value-of select="/rss/channel/title"/></xsl:when>
                <xsl:otherwise>This is the RSS feed of <xsl:value-of select="/rss/channel/title"/></xsl:otherwise>
              </xsl:choose>
            </h1>
            <p>
              <xsl:choose>
                <xsl:when test="$es">Un feed RSS avisa de cada artículo nuevo sin redes sociales ni correo. Copia esta dirección en tu lector de RSS (Feedly, Inoreader, NetNewsWire, Thunderbird…) y te llegarán las novedades.</xsl:when>
                <xsl:otherwise>An RSS feed tells you about every new article, no social media or email needed. Paste this address into your RSS reader (Feedly, Inoreader, NetNewsWire, Thunderbird…) to get updates.</xsl:otherwise>
              </xsl:choose>
            </p>
            <div class="row">
              <input class="url" id="feed-url" type="text" readonly="readonly" value="{$feedUrl}">
                <xsl:attribute name="aria-label">
                  <xsl:choose>
                    <xsl:when test="$es">Dirección del feed</xsl:when>
                    <xsl:otherwise>Feed address</xsl:otherwise>
                  </xsl:choose>
                </xsl:attribute>
              </input>
              <button class="btn" type="button" id="copy">
                <xsl:choose>
                  <xsl:when test="$es">Copiar</xsl:when>
                  <xsl:otherwise>Copy</xsl:otherwise>
                </xsl:choose>
              </button>
              <a class="btn ghost" rel="noopener" target="_blank"
                 href="<https://feedly.com/i/subscription/feed/{$feedUrl}>">
                <xsl:choose>
                  <xsl:when test="$es">Seguir en Feedly</xsl:when>
                  <xsl:otherwise>Follow on Feedly</xsl:otherwise>
                </xsl:choose>
              </a>
            </div>
          </section>

          <h2>
            <xsl:choose>
              <xsl:when test="$es">Últimas publicaciones</xsl:when>
              <xsl:otherwise>Latest posts</xsl:otherwise>
            </xsl:choose>
          </h2>
          <ol>
            <xsl:for-each select="/rss/channel/item">
              <li>
                <h3><a href="{link}"><xsl:value-of select="title"/></a></h3>
                <p class="meta">
                  <xsl:value-of select="substring(pubDate, 6, 11)"/>
                  <xsl:if test="category"> · <xsl:value-of select="category"/></xsl:if>
                </p>
                <p class="desc"><xsl:value-of select="description"/></p>
              </li>
            </xsl:for-each>
          </ol>

          <a class="back" href="{/rss/channel/link}">
            <xsl:choose>
              <xsl:when test="$es">← Volver a la web</xsl:when>
              <xsl:otherwise>← Back to the website</xsl:otherwise>
            </xsl:choose>
          </a>
        </main>
        <script>
          (function () {
            var btn = document.getElementById("copy");
            var input = document.getElementById("feed-url");
            var done = btn.textContent.trim() === "Copiar" ? "¡Copiado!" : "Copied!";
            var label = btn.textContent;
            btn.addEventListener("click", function () {
              var ok = function () { btn.textContent = done; setTimeout(function () { btn.textContent = label; }, 2000); };
              if (navigator.clipboard) {
                navigator.clipboard.writeText(input.value).then(ok, function () { input.select(); });
              } else { input.select(); }
            });
          })();
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>