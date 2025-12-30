"use client";
import AllPosts from "./navigation/AllPosts";
import { BoxGrid } from "../ui/lugs";
// const BoxGrid = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   max-width: 100%;
//   flex-wrap: wrap;
// `;
const HomeBoxes = ({ props, locale }) => {
  return (
    <>
      <BoxGrid>
        {props.posts.map(
          ({
            slug,
            id,
            date,
            title,
            author,
            excerpt,
            doctype,
            webThumbnail,
            coverImageAlt,
          }) => (
            <AllPosts
              key={id}
              title={title}
              slug={slug}
              date={date}
              excerpt={excerpt}
              author={author}
              doctype={doctype}
              coverImage={webThumbnail}
              coverImageAlt={coverImageAlt}
              locale={locale}
            />
          )
        )}
      </BoxGrid>
    </>
  );
};

export default HomeBoxes;
