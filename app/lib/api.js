const fs = require("fs");
// import { promises as fs } from "fs";
const { join } = require("path");
const matter = require("gray-matter");
const { formatDateForSSR } = require("./DateUtils");

const postsDirectory = join(process.cwd(), "/app/_posts/");
const postsBlogDirectory = join(process.cwd(), "/app/_posts/blog/");
// Obtener todos los slugs de los posts
function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

// Obtener un post por su slug
function getPostBySlug(slug, fields = [], locale = "es") {
  const fullPath = join(postsDirectory, `${slug}.${locale}.mdx`);
  // Verificamos si existe (por seguridad)
  if (!fs.existsSync(fullPath)) {
    console.warn(`\n⚠️ Post not found: ${fullPath}`);
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug: slug,
    content,
    date: {
      iso: data.date, // Conserva el formato original 'YYYY-MM-DD'
      formatted: formatDateForSSR(data.date), // Formateado inicial en español
    },
  };
}

// Obtener todos los posts, ordenados por fecha
function getAllPosts(fields = [], locale = "es") {
  const slugs = getPostSlugs();
  const posts = slugs
    .filter((slug) => slug.endsWith(`.${locale}.mdx`))
    .map((slug) => {
      // Limpiamos el slug para quitarle el .es.mdx y dejar solo el nombre base
      const cleanSlug = slug.replace(`.${locale}.mdx`, "");
      return getPostBySlug(cleanSlug, fields, locale);
    })
    .filter((post) => post && post.isPublic == true)
    .sort(
      (post1, post2) => new Date(post2.date.iso) - new Date(post1.date.iso)
    );

  return posts;
}

function getPostsByType(types = [], orderNum = 0, locale = "es") {
  // 1. Obtener todos los archivos físicos
  const allFiles = getPostSlugs();

  // 2. FILTRO CRÍTICO: Nos quedamos SOLO con los archivos del idioma actual
  // Esto elimina automáticamente los archivos del otro idioma
  const localeFiles = allFiles.filter((file) =>
    file.endsWith(`.${locale}.mdx`)
  );

  // 3. Procesamos esos archivos
  const filteredPosts = localeFiles
    .map((file) => {
      // Limpiamos el nombre para obtener el slug base
      const cleanSlug = file.replace(`.${locale}.mdx`, "");

      // Llamamos a la función pasando explícitamente el locale
      // Nota: Pasamos un array vacío [] para los fields si no los necesitas específicos,
      // se puede pasar ['title', 'date', 'slug', 'doctype', 'isPublic', 'order']
      return getPostBySlug(cleanSlug, [], locale);
    })
    // 4. Filtros de Seguridad y Lógica
    .filter((post) => post !== null) // Evitamos nulos
    .filter((post) => post.isPublic === true) // Solo public true
    .filter((post) => {
      // Validación de tipos (blog vs latex)
      if (!post.doctype) return false;
      // Si types está vacío, devuelve todo, si no, busca coincidencia
      return types.length === 0 || types.some((t) => post.doctype.includes(t));
    })
    .sort((post1, post2) => (post1.order || 99) - (post2.order || 99)); // Orden ascendente

  // --- Lógica de Paginación (Next/Prev) ---
  // Si orderNum es 0, asumimos que es el landing y no buscamos next/prev específico por ID
  // Si esta función se usa para un post individual, entonces sí buscamos el índice.
  let previousPost = null;
  let nextPost = null;
  // console.log(filteredPosts);
  // console.log(`orderNum: ${orderNum}`);
  if (orderNum > 0) {
    const currentIndex = filteredPosts.findIndex(
      (post) => post.order === orderNum
    );
    if (currentIndex !== -1) {
      previousPost = currentIndex > 0 ? filteredPosts[currentIndex - 1] : null;
      nextPost =
        currentIndex < filteredPosts.length - 1
          ? filteredPosts[currentIndex + 1]
          : null;
    }
  }

  return {
    posts: filteredPosts,
    previousPost,
    nextPost,
  };
}

// Funciones específicas para tipos de posts
function getLatexPosts(orderNum = 0) {
  return getPostsByType(["latex"], orderNum);
}

function getBlogPosts(orderNum = 0) {
  return getPostsByType(["blog"], orderNum);
}
function getSurroundingPosts(type, currentOrder, locale = "es") {
  const allFiles = getPostSlugs();

  const orderedPosts = allFiles
    // 2. FILTRO VITAL: Nos quedamos solo con los archivos del idioma actual
    // Ejemplo: Si locale es 'es', solo pasan 'que-es-tex.es.mdx'
    .filter((filename) => filename.endsWith(`.${locale}.mdx`))

    .map((filename) => {
      // 3. LIMPIEZA: Quitamos ".es.mdx" para obtener el slug real ("que-es-tex")
      // Esto es necesario porque getPostBySlug suele esperar el slug limpio
      const cleanSlug = filename.replace(new RegExp(`\\.${locale}\\.mdx$`), "");

      // 4. Obtenemos los datos (Asegúrate de pasar 'locale' si tu getPostBySlug lo pide)
      // Solicitamos solo los campos necesarios para no cargar todo el contenido
      return getPostBySlug(
        cleanSlug,
        ["title", "slug", "order", "doctype", "isPublic", "excerpt"],
        locale
      );
    })

    // 5. FILTRO POR TIPO: Nos aseguramos que sea 'latex', público y tenga orden
    .filter((post) => {
      return (
        post.doctype &&
        post.doctype.includes(type) &&
        post.isPublic &&
        typeof post.order === "number"
      );
    })

    // 6. ORDENAR: Ascendente (1, 2, 3...)
    .sort((a, b) => a.order - b.order);

  // 7. ENCONTRAR VECINOS
  const currentIndex = orderedPosts.findIndex(
    (post) => post.order === currentOrder
  );

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previous = currentIndex > 0 ? orderedPosts[currentIndex - 1] : "null";
  const next =
    currentIndex < orderedPosts.length - 1
      ? orderedPosts[currentIndex + 1]
      : "null";
  return { previous, next };
}
// Exportar funciones
module.exports = {
  getPostSlugs,
  getPostBySlug,
  getAllPosts,
  getLatexPosts,
  getBlogPosts,
  getPostsByType,
  getSurroundingPosts,
};
