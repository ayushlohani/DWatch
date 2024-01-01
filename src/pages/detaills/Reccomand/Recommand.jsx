import React from "react";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import Crousel from "../../../componets/crousel/Crousel";
const Recommand = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);
  return (
    <div className="similar">
      {!data?.result?.length && (
        <>
          {" "}
          <div className="head">
            <span className="title">Recommandations</span>
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
                No Recommandations Available....
              </center>
            )}
            <Crousel
              data={data?.results}
              loading={loading}
              endpoint={mediaType}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Recommand;
