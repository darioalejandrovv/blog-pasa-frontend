import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { fetchAPI } from "../lib/api";

const Home = ({ articles, categories, homepage }) => {
  console.log(homepage)
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.seo} />
      <div className="titulo">
        <img src="https://blog-pasa-backend.herokuapp.com/uploads/default_image_2f1ff8dbda.png"/>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Articles articles={articles} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articles, categories, homepage] = await Promise.all([
    fetchAPI("/articles?status=published"),
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
  ]);

  return {
    props: { articles, categories, homepage },
    revalidate: 1,
  };
}

export default Home;
