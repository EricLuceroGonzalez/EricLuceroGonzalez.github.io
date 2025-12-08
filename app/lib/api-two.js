// /app/lib/api-two.js
// const fs = require("fs");
const { join } = require("path");
const matter = require("gray-matter");
const { formatDateForSSR } = require("./DateUtils");
// const { default: next } = require("next");

const postsDirectory = join(process.cwd(), "/app/_posts");

function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

const fs = require("fs");
const path = require("path");

function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  // Make reading time estimation
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

function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort(
      (post1, post2) => new Date(post2.date.iso) - new Date(post1.date.iso)
    ); // Ordenación más precisa
  // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

function getLatexPosts(orderNum = 0) {
  const slugs = getPostSlugs();

  const latexPosts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => {
      return post.doctype[0] === "latex";
    })
    .sort((post1, post2) => (post1.order > post2.order ? 1 : -1));
  // /Next and previous posts

  if (orderNum >= latexPosts.length - 1) {
    const nextPost = 0;
    const previousPost = latexPosts.filter((post) => {
      return post.order === orderNum - 1;
    });
    return { posts: latexPosts, previousPost, nextPost: [0] };
  }

  if (orderNum <= 0) {
    const nextPost = latexPosts.filter((post) => {
      return post.order === orderNum + 1;
    });
    return { posts: latexPosts, previousPost: [0], nextPost };
  }

  const nextPost = latexPosts.filter((post) => {
    return post.order === orderNum + 1;
  });

  const previousPost = latexPosts.filter((post) => {
    return post.order === orderNum - 1;
  });

  return { posts: latexPosts, previousPost, nextPost };
}

function getBlogPosts(orderNum = 0) {
  const slugs = getPostSlugs();

  const blogPosts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => {
      return post.doctype[0] === "blog";
    })
    .sort((post1, post2) => (post1.date.iso > post2.date.iso ? -1 : 1));
  // /Next and previous posts
  if (orderNum >= blogPosts.length - 1) {
    const nextPost = 0;
    const previousPost = blogPosts.filter((post) => {
      return post.order === orderNum - 1;
    });
    return { posts: blogPosts, previousPost, nextPost: [0] };
  }

  if (orderNum <= 0) {
    const nextPost = blogPosts.filter((post) => {
      return post.order === orderNum + 1;
    });
    return { posts: blogPosts, previousPost: [0], nextPost };
  }

  const nextPost = blogPosts.filter((post) => {
    return post.order === orderNum + 1;
  });

  const previousPost = blogPosts.filter((post) => {
    return post.order === orderNum - 1;
  });

  return { posts: blogPosts, previousPost, nextPost };
}

function getPostsByType(types, orderNum = 0) {
  const slugs = getPostSlugs();

  const filteredPosts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => {
      // Verifica si el post tiene todos los tipos especificados
      return types.every((type) => post.doctype.includes(type));
    })
    .sort((post1, post2) => (post1.iso > post2.date.iso ? -1 : 1));

  // Lógica para next y previous posts
  if (orderNum >= filteredPosts.length - 1) {
    const nextPost = 0;
    const previousPost = filteredPosts.filter((post) => {
      return post.order === orderNum - 1;
    });
    return { posts: filteredPosts, previousPost, nextPost: [0] };
  }

  if (orderNum <= 0) {
    const nextPost = filteredPosts.filter((post) => {
      return post.order === orderNum + 1;
    });
    return { posts: filteredPosts, previousPost: [0], nextPost };
  }

  const nextPost = filteredPosts.filter((post) => {
    return post.order === orderNum + 1;
  });

  const previousPost = filteredPosts.filter((post) => {
    return post.order === orderNum - 1;
  });

  return { posts: filteredPosts, previousPost, nextPost };
}
module.exports = {
  getPostSlugs,
  getPostBySlug,
  getAllPosts,
  getLatexPosts,
  getBlogPosts,
  getPostsByType,
};
