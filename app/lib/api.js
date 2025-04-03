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
function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.mdx?$/, ""); // Soporta .md y .mdx
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug: realSlug,
    content,
    date: {
      iso: data.date, // Conserva el formato original 'YYYY-MM-DD'
      formatted: formatDateForSSR(data.date), // Formateado inicial en español
    },
  };
}

// Obtener un post por su slug
function getBlogPostBySlug(slug) {
  const realSlug = slug.replace(/\.mdx?$/, ""); // Soporta .md y .mdx
  const fullPath = join(postsBlogDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug: realSlug,
    content,
    date: {
      iso: data.date, // Conserva el formato original 'YYYY-MM-DD'
      formatted: formatDateForSSR(data.date), // Formateado inicial en español
    },
  };
}

// Obtener todos los posts, ordenados por fecha
function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort(
      (post1, post2) => new Date(post2.date.iso) - new Date(post1.date.iso)
    );

  return posts;
}

// Función genérica para obtener posts filtrados por tipo
function getPostsByType(types = [], orderNum = 0) {
  const slugs = getPostSlugs();

  const filteredPosts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post.isPublic) // Filtra solo los publicados
    .filter((post) => types.every((type) => post.doctype.includes(type))) // Filtra por tipos
    .sort((post1, post2) => post1.order - post2.order); // Ordena por el campo 'order'

  // Encuentra el índice del post actual
  const currentIndex = filteredPosts.findIndex(
    (post) => post.order === orderNum
  );

  // Lógica para next y previous posts
  const previousPost =
    currentIndex > 0 ? filteredPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < filteredPosts.length - 1
      ? filteredPosts[currentIndex + 1]
      : null;

  return {
    posts: filteredPosts,
    previousPost: previousPost || null, // Devuelve el post o null
    nextPost: nextPost || null, // Devuelve el post o null
  };
}

// Funciones específicas para tipos de posts
function getLatexPosts(orderNum = 0) {
  return getPostsByType(["latex"], orderNum);
}

function getBlogPosts(orderNum = 0) {
  return getPostsByType(["blog"], orderNum);
}

// Exportar funciones
module.exports = {
  getPostSlugs,
  getPostBySlug,
  getAllPosts,
  getLatexPosts,
  getBlogPosts,
  getPostsByType,
};
