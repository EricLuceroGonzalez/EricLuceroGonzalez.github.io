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
  const theProps = props.map((post) => {
    return post.metadata;
  });

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
            imageThumbnail,
            coverImageAlt = "excerpt",
          }) => (
            <AllPosts
              key={id}
              title={title}
              slug={slug}
              date={date}
              excerpt={excerpt}
              author={author}
              doctype={doctype}
              coverImage={imageThumbnail}
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
