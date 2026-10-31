"use client";
import AllPosts from "./navigation/AllPosts";
import { BoxGrid } from "../ui/BasicDivs";

const HomeBoxes = ({ props, locale }) => {
  return (
    <>
      <BoxGrid>
        {props.map(
          ({
            slug,
            id,
            date,
            title,
            author,
            excerpt,
            doctype,
            categories,
            keywords,
            coverImage,
            coverImageAlt,
            readingTime,
          }) => (
            <AllPosts
              key={id}
              title={title}
              slug={slug}
              date={date}
              excerpt={excerpt}
              author={author}
              doctype={doctype}
              categories={categories}
              keywords={keywords}
              coverImage={coverImage}
              coverImageAlt={coverImageAlt}
              readingTime={readingTime}
              locale={locale}
            />
          ),
        )}
      </BoxGrid>
    </>
  );
};

export default HomeBoxes;
