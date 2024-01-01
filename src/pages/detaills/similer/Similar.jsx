import React from "react";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import Crousel from "../../../componets/crousel/Crousel";
const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
  return (
    <div className="similar">
      <div className="head">
        <span className="title">Similar</span>
      </div>
      <div className="crousel">
        {!loading && mediaType == "person" && (
          <center
            style={{
              color: "azure",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px",
              marginTop: "100px",
            }}
          >
            No Similar Available....
          </center>
        )}
        <Crousel data={data?.results} loading={loading} endpoint={mediaType} />
      </div>
    </div>
  );
};

export default Similar;
