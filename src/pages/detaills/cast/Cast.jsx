import React from "react";
import useFetch from "../../../hooks/useFetch";

const Cast = ({ mediaType, id }) => {
  const { data: credits } = useFetch(`/${mediaType}/${id}/credits`);
  console.log(credits);
  return <></>;
};

export default Cast;
