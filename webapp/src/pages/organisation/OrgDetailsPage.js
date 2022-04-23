import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import OrgDetailsCard from "../../components/orgs/OrgDetailsCard";
import ReviewContainer from "../../components/orgs/ReviewContainer";
import APIHelper from "../../utilities/APIHelper.js";

function OrgDetailsPage() {
  const [org, setOrg] = useState({});
  const params = useParams();
  const org_id = params.org_id;

  useEffect(() => {
    APIHelper.getItemById("organizations", org_id).then((res) =>
      setOrg(res.data)
    );
  }, []);

  return (
    <div className="prbg ht-full-viewport py-1">
      <div className="flex-horizontal">
        <div className="ly-1-3-1-bd-sec-left">
          {/*HERE IS WHERE YOUR NAVBAR/LEFTSIDEBAR SHOULD GO*/}
          <Navbar />
        </div>
        <div className="ly-1-3-1-bd-sec-right">
          <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
            <div className="ly-1-3-1-bd-sec-right-main">
              {/*HERE IS WHERE YOUR CENTRAL CONTENT SHOULD GO*/}
              {org && (
                <OrgDetailsCard
                  key={org_id}
                  organizationName={org.organizationName}
                  organizationLogo={org.organizationLogo}
                  aboutUs={org.aboutUs}
                  sponsorship={org.sponsorship}
                />
              )}
            </div>
            <div className="ly-1-3-1-bd-sec-right-sidebar">
              {/*HERE IS WHERE YOUR RIGHT CONTENT SHOULD GO*/}
              <ReviewContainer key={org_id} organizationId={org_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgDetailsPage;
